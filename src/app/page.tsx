"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, FileText, BrainCircuit } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/Navbar";
import StageCard from "@/components/StageCard";
import TerminalMockup from "@/components/TerminalMockup";
import MetricCard from "@/components/MetricCard";
import Dashboard from "@/components/Dashboard";

gsap.registerPlugin(ScrollTrigger);

const ThreeVisual = dynamic(() => import("@/components/ThreeVisual"), { ssr: false });

// ─── Dynamic Data for UI ───────────────────────────────────────────────────
const demoLink1 = linkCollections[0] || { url: "https://chatgpt.com", category: "AI_Tools", tags: ["AI", "chat"] };
const demoLink2 = linkCollections[2] || { url: "https://perplexity.ai", category: "Research", tags: ["AI"] };
const uniqueTagsCount = new Set(linkCollections.flatMap((link) => link.tags)).size;

const topCats = CATEGORIES.slice(1, 4).map(c => c.label.replace(/^[^\s]+\s+/, ""));

// ─── Terminal data ──────────────────────────────────────────────────────────
const terminalLines = [
  { time: "[14:02:01]", text: `$ linkora add ${demoLink1.url} --category ${demoLink1.category}` },
  { time: "[14:02:02]", text: "Fetching site metadata... OK", color: "#ffffff" },
  { time: "[14:02:04]", text: `Generating smart tags: [${demoLink1.tags.join(", ")}]...`, color: "#3b82f6" },
  { time: "[14:02:05]", text: "Saved successfully. 120ms total time", color: "#a855f7", blink: true },
];

// ─── Model card ──────────────────────────────────────────────────────────────
function LinkEngineCard() {
  return (
    <>
      <div className="p-5 border-b border-[#333] flex justify-between items-center">
        <div className="font-semibold text-lg flex items-center gap-2">
          <BrainCircuit size={17} />
          engine.tagger_v2
        </div>
        <div className="bg-[#27c93f]/10 text-[#27c93f] px-3 py-1 rounded-full text-xs font-semibold">
          Ready
        </div>
      </div>
      <div className="p-5 grid grid-cols-2 gap-3 flex-1">
        <MetricCard label="Tagging Accuracy" value="99.4%" valueColor="text-[#27c93f]" />
        <MetricCard label="Link Health" value="100%" valueColor="text-[#27c93f]" />
        <MetricCard label="Active Tags" value={uniqueTagsCount.toString()} />
        <MetricCard label="Tagging Speed" value="84ms" />
      </div>
    </>
  );
}

import { linkCollections, CATEGORIES } from "@/data/links";

// ─── Hero stats ──────────────────────────────────────────────────────────────
const heroStats = [
  { value: `${linkCollections.length}`, label: "Curated Links" },
  { value: `${CATEGORIES.length - 1}`, label: "Smart Categories" },
  { value: "140ms", label: "Avg Access Speed" },
  { value: "100%", label: "Cloud Synced" },
];

export default function Home() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (railRef.current) {
      gsap.fromTo(
        railRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: "#flow-section",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center relative z-10 px-8 pt-32 pb-16">
        {/* Three.js background */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <ThreeVisual />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-8 text-[#888]"
        >
          ● Now in Private Beta — Linkora Workspace
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 text-[clamp(2.8rem,6vw,5rem)] font-extrabold tracking-tight leading-[1.08] max-w-3xl mb-6 pointer-events-none"
        >
          All Your AI Links in{" "}
          <span className="bg-gradient-to-r from-white to-[#aaa] bg-clip-text text-transparent">
            One Smart Workspace
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-lg text-[#888] max-w-xl leading-relaxed mb-12 pointer-events-none"
        >
          Linkora organizes, categorizes, and speed-dials all your AI tools and essential web links
          — giving developers and teams one-click clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="relative z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-6 sm:px-0"
        >
          <Link href="/collections" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white text-black px-8 py-3.5 rounded-full text-sm font-bold hover:bg-gray-200 active:scale-95 transition-all">
              Explore Now →
            </button>
          </Link>
          <button className="w-full sm:w-auto border border-white/20 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/5 active:scale-95 transition-all">
            ▶ Watch Demo
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 grid grid-cols-2 md:flex md:gap-10 gap-x-8 gap-y-8 mt-16 pt-8 border-t border-white/10"
        >
          {heroStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
              <div className="text-[11px] md:text-xs text-[#888] mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── 2. Interactive Insight Flow ──────────────────────────────────── */}
      <section id="flow-section" className="py-20 md:py-32 px-6 md:px-8 max-w-6xl mx-auto relative w-full overflow-hidden">
        {/* Track rail — ghost */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 -translate-x-1/2 z-0" />
        {/* GSAP animated rail */}
        <div
          ref={railRef}
          className="absolute top-0 left-1/2 w-px -translate-x-1/2 z-0"
          style={{
            background: "linear-gradient(to bottom, #3b82f6, #a855f7, #0ea5e9)",
            boxShadow: "0 0 12px rgba(59,130,246,0.5)",
          }}
        />

        <StageCard
          stageNum="Stage 01"
          labelColor="cyan"
          title="Collect & Save Links"
          description="Add links instantly from your browser, slack, or terminal. Our high-performance ingestion engine automatically extracts clean metadata, titles, and descriptions in real-time."
          visual={<TerminalMockup lines={terminalLines} />}
        />

        <StageCard
          stageNum="Stage 02"
          labelColor="purple"
          title="AI-Powered Categorization"
          description="Leverage integrated tagger models to automatically organize saved bookmarks into smart categories, identify dead links, and auto-generate summaries."
          visual={<LinkEngineCard />}
          direction="reverse"
        />

        {/* Stage 03 — centred */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-24 relative z-10"
        >
          <div className="text-center max-w-2xl mb-10">
            <div className="inline-block px-3 py-1 rounded bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 text-xs font-bold tracking-widest uppercase mb-4">
              Stage 03
            </div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Sync, Search & Share</h2>
            <p className="text-[#888] text-lg leading-relaxed">
              Access your bookmark hub securely from any device. Export collections, share curated resource boards, or search your saved links database in real-time.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* API Sync card */}
            <motion.div
              whileHover={{ scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
              transition={{ duration: 0.25 }}
              className="bg-[#0a0a0a] border border-[#333] rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 rounded-lg bg-[#3b82f6]/20 text-[#3b82f6]">
                  <Zap size={22} />
                </div>
                <div>
                  <h3 className="font-bold">Developer API & Sync</h3>
                  <p className="text-sm text-[#888]">Sync links to your own terminal and scripts</p>
                </div>
              </div>
              <div className="font-mono text-xs text-[#888] bg-[#111] p-4 rounded-lg border border-[#222] leading-loose">
                <span className="text-[#3b82f6]">POST</span> /api/v1/links
                <br />
                <span className="text-[#0ea5e9]">{`{ "url": "${demoLink2.url}", "category": "${demoLink2.category}" }`}</span>
              </div>
            </motion.div>

            {/* Curation summaries card */}
            <motion.div
              whileHover={{ scale: 1.02, borderColor: "rgba(168,85,247,0.5)" }}
              transition={{ duration: 0.25 }}
              className="bg-[#0a0a0a] border border-[#333] rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 rounded-lg bg-[#a855f7]/20 text-[#a855f7]">
                  <FileText size={22} />
                </div>
                <div>
                  <h3 className="font-bold">Weekly Curated Digest</h3>
                  <p className="text-sm text-[#888]">AI-generated summaries of saved topics</p>
                </div>
              </div>
              <div className="text-sm text-[#888] bg-[#111] p-4 rounded-lg border border-[#222] leading-relaxed">
                "This week, you saved <strong className="text-white">{linkCollections.length} new resources</strong>. Your focus was primarily on {topCats.join(", ").toLowerCase()}."
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── 3. Intelligence Dashboard Preview ───────────────────────────── */}
      <section className="py-28 px-8 border-t border-[#111] w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Intelligence Dashboard</h2>
            <p className="text-[#888] text-lg">
              A unified, calm interface built for decision-makers.
            </p>
          </div>
          <Dashboard />
        </div>
      </section>
      
      {/* ── 4. Footer ───────────────────────────── */}
      <footer className="border-t border-[#111] py-8 text-center text-xs text-[#555] font-mono w-full">
        <p>&copy; {new Date().getFullYear()} Linkora - Intelligence Workspace. All links indexed securely.</p>
        <p className="mt-2">Designed & Built by <a href="https://si-sharif.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 border-b border-blue-400/30 hover:border-blue-400 font-bold pb-0.5 transition-all">Shariful Islam</a></p>
      </footer>
    </div>
  );
}
