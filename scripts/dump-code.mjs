#!/usr/bin/env node
/**
 * scripts/dump-code.mjs
 *
 * Dumps the entire project into a single .txt file — perfect for sharing with
 * an LLM or reviewing offline. Includes a directory tree and one fenced
 * section per file.
 *
 * Usage:
 *   node scripts/dump-code.mjs
 *   node scripts/dump-code.mjs -o out.txt --max-size 1000
 *   node scripts/dump-code.mjs -i "src/**\/*.ts" -i "prisma/*.prisma"
 *   node scripts/dump-code.mjs --tree-only
 *   node scripts/dump-code.mjs --include-env        # ⚠ include .env files
 *
 * Add to package.json:
 *   "scripts": { "dump": "node scripts/dump-code.mjs" }
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// ───────────────────────── hard-coded safety ignores ─────────────────────────
const IGNORE_DIRS = new Set([
  'node_modules', '.next', '.git', '.turbo', 'dist', 'build', 'out',
  'coverage', '.vercel', '.idea', '.vscode', '.cache', '.nuxt', '.svelte-kit',
  'playwright-report', 'test-results', '.parcel-cache', '.pnp', '.yarn',
]);

const IGNORE_EXTS = new Set([
  '.png','.jpg','.jpeg','.gif','.webp','.svg','.ico','.bmp','.tiff',
  '.woff','.woff2','.ttf','.otf','.eot',
  '.mp3','.mp4','.wav','.mov','.avi','.webm','.flac','.ogg',
  '.zip','.tar','.gz','.tgz','.rar','.7z','.bz2',
  '.pdf','.doc','.docx','.xls','.xlsx','.ppt','.pptx',
  '.map','.log','.lock','.tsbuildinfo',
  '.exe','.dll','.so','.dylib','.bin','.wasm','.db','.sqlite','.sqlite3',
]);

const IGNORE_FILES = new Set([
  'package-lock.json','yarn.lock','pnpm-lock.yaml','.DS_Store',
]);

const IGNORE_ENV_FILES = new Set([
  '.env','.env.local','.env.production','.env.development','.env.test',
]);

const DEFAULT_OUTPUT = 'project-dump.txt';
const DEFAULT_MAX_KB = 500;

// ───────────────────────────────── CLI ───────────────────────────────────────
function usage() {
  console.log(`
Usage: node scripts/dump-code.mjs [options]

  -o, --output <file>     Output file              (default: ${DEFAULT_OUTPUT})
      --max-size <kb>     Skip files larger than N KB (default: ${DEFAULT_MAX_KB})
  -i, --include <glob>    Only include paths matching glob (repeatable)
  -e, --exclude <glob>    Exclude paths matching glob     (repeatable)
      --tree-only         Print the file tree only, no file contents
      --no-gitignore      Ignore .gitignore rules
      --include-env       ⚠  Also dump .env* files (by default they are skipped)
  -h, --help              Show this help

Examples:
  node scripts/dump-code.mjs -o share.txt
  node scripts/dump-code.mjs -i "src/**/*.ts" -i "prisma/*.prisma"
  node scripts/dump-code.mjs -e "tests/**" --max-size 2000
`);
}

function parseArgs(argv) {
  const o = {
    output: DEFAULT_OUTPUT,
    maxSizeKB: DEFAULT_MAX_KB,
    include: [],
    exclude: [],
    treeOnly: false,
    useGitignore: true,
    includeEnv: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      if (i + 1 >= argv.length) { console.error(`Missing value for ${a}`); process.exit(1); }
      return argv[++i];
    };
    switch (a) {
      case '-o': case '--output':      o.output = next(); break;
      case '--max-size':               o.maxSizeKB = Number(next()) || DEFAULT_MAX_KB; break;
      case '-i': case '--include':     o.include.push(next()); break;
      case '-e': case '--exclude':     o.exclude.push(next()); break;
      case '--tree-only':              o.treeOnly = true; break;
      case '--no-gitignore':           o.useGitignore = false; break;
      case '--include-env':            o.includeEnv = true; break;
      case '-h': case '--help':        usage(); process.exit(0);
      default:
        if (a.startsWith('-')) { console.error(`Unknown option: ${a}`); usage(); process.exit(1); }
    }
  }
  return o;
}

// ─────────────────────────────── glob helpers ────────────────────────────────
function globToRegex(glob) {
  let p = glob.replace(/\\/g, '/');
  let body = '';
  for (let i = 0; i < p.length; i++) {
    const c = p[i];
    if (c === '*') {
      if (p[i + 1] === '*') {
        body += '.*';
        i++;
        if (p[i + 1] === '/') i++;
      } else body += '[^/]*';
    } else if (c === '?') body += '[^/]';
    else if ('.+^$(){}|[]\\'.includes(c)) body += '\\' + c;
    else body += c;
  }
  return new RegExp('^' + body + '$');
}

// ──────────────────────────── .gitignore (best effort) ───────────────────────
function compileGitignorePattern(pattern) {
  let p = pattern.replace(/\\/g, '/');
  const leadingDoubleStar = p.startsWith('**/');
  if (leadingDoubleStar) p = p.slice(3);

  const anchored = !leadingDoubleStar && (p.startsWith('/') || p.includes('/'));
  if (p.startsWith('/')) p = p.slice(1);

  const dirOnly = p.endsWith('/');
  if (dirOnly) p = p.slice(0, -1);

  let body = '';
  for (let i = 0; i < p.length; i++) {
    const c = p[i];
    if (c === '*') {
      if (p[i + 1] === '*') {
        body += '.*'; i++;
        if (p[i + 1] === '/') i++;
      } else body += '[^/]*';
    } else if (c === '?') body += '[^/]';
    else if ('.+^$(){}|[]\\'.includes(c)) body += '\\' + c;
    else body += c;
  }

  const prefix = anchored ? '^' : '(?:^|/)';
  const suffix = dirOnly ? '(?:/.*)?$' : '$';
  return new RegExp(prefix + body + suffix);
}

function loadGitignore() {
  const file = path.join(ROOT, '.gitignore');
  if (!fs.existsSync(file)) return [];
  const rules = [];
  for (let line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    let negate = false;
    if (line.startsWith('!')) { negate = true; line = line.slice(1); }
    try { rules.push({ re: compileGitignorePattern(line), negate }); } catch { /* ignore bad pattern */ }
  }
  return rules;
}

function isGitignored(relPath, rules) {
  let ignored = false;
  for (const r of rules) if (r.re.test(relPath)) ignored = !r.negate;
  return ignored;
}

// ─────────────────────────────── walk the tree ───────────────────────────────
function walk(dir, opts, tree, files, depth = 0) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));

  const outPath = path.resolve(ROOT, opts.output);
  const excludes = opts.exclude.map(globToRegex);
  const includes = opts.include.map(globToRegex);

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const relPath = path.relative(ROOT, full).split(path.sep).join('/');

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      if (opts.useGitignore && isGitignored(relPath, opts.gitignore)) continue;
      if (excludes.some(r => r.test(relPath))) continue;
      if (includes.length && !includes.some(r => r.test(relPath) || r.test(relPath + '/x'))) {
        // allow descending into dirs that could contain included files
      }
      tree.push('  '.repeat(depth) + entry.name + '/');
      walk(full, opts, tree, files, depth + 1);
      continue;
    }

    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (IGNORE_EXTS.has(ext)) continue;
    if (IGNORE_FILES.has(entry.name)) continue;
    if (!opts.includeEnv && (IGNORE_ENV_FILES.has(entry.name) || entry.name.startsWith('.env'))) continue;
    if (path.resolve(full) === outPath) continue;
    if (opts.useGitignore && isGitignored(relPath, opts.gitignore)) continue;
    if (excludes.some(r => r.test(relPath))) continue;
    if (includes.length && !includes.some(r => r.test(relPath))) continue;

    const stat = fs.statSync(full);
    if (stat.size > opts.maxSizeKB * 1024) {
      tree.push('  '.repeat(depth) + entry.name + `  (skipped: ${(stat.size / 1024) | 0}KB)`);
      continue;
    }

    tree.push('  '.repeat(depth) + entry.name);
    files.push({ relPath, full, size: stat.size });
  }
}

// ─────────────────────────────── formatting ──────────────────────────────────
function fenceFor(ext) {
  const map = {
    '.ts': 'ts', '.tsx': 'tsx', '.js': 'js', '.jsx': 'jsx', '.mjs': 'js', '.cjs': 'js',
    '.json': 'json', '.css': 'css', '.scss': 'scss', '.md': 'md', '.prisma': 'prisma',
    '.yml': 'yaml', '.yaml': 'yaml', '.html': 'html', '.sql': 'sql', '.sh': 'bash',
    '.toml': 'toml', '.env': 'bash', '.txt': '',
  };
  return map[ext] ?? '';
}

function fmt(n) {
  return n > 1024 * 1024 ? (n / 1024 / 1024).toFixed(1) + 'MB'
       : n > 1024        ? (n / 1024).toFixed(1) + 'KB'
       : n + 'B';
}

// ───────────────────────────────── main ──────────────────────────────────────
function main() {
  const opts = parseArgs(process.argv.slice(2));
  opts.gitignore = opts.useGitignore ? loadGitignore() : [];

  const t0 = Date.now();
  const tree = [];
  const files = [];
  walk(ROOT, opts, tree, files);

  const outPath = path.resolve(ROOT, opts.output);
  const totalSize = files.reduce((s, f) => s + f.size, 0);

  const parts = [];
  parts.push('='.repeat(80));
  parts.push(`PROJECT DUMP: ${path.basename(ROOT)}`);
  parts.push(`Generated:    ${new Date().toISOString()}`);
  parts.push(`Files:        ${files.length}`);
  parts.push(`Total size:   ${fmt(totalSize)}`);
  parts.push('='.repeat(80));
  parts.push('');
  parts.push('--- DIRECTORY TREE ---');
  parts.push(...tree);
  parts.push('');

  if (!opts.treeOnly) {
    for (const f of files) {
      const fence = fenceFor(path.extname(f.relPath).toLowerCase());
      parts.push('');
      parts.push('='.repeat(80));
      parts.push(`FILE: ${f.relPath}  (${fmt(f.size)})`);
      parts.push('='.repeat(80));
      parts.push('```' + fence);
      try {
        parts.push(fs.readFileSync(f.full, 'utf8'));
      } catch (e) {
        parts.push(`[ERROR reading file: ${e.message}]`);
      }
      parts.push('```');
    }
  }

  fs.writeFileSync(outPath, parts.join('\n'), 'utf8');
  const elapsed = Date.now() - t0;
  const written = fs.statSync(outPath).size;

  console.log(`✔ Dumped ${files.length} files → ${opts.output}`);
  console.log(`  content:  ${fmt(totalSize)}`);
  console.log(`  file:     ${fmt(written)}`);
  console.log(`  elapsed:  ${elapsed}ms`);
  console.log(`  path:     ${outPath}`);
}

main();