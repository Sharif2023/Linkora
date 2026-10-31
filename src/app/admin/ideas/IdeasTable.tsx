"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Search, ExternalLink, Layers } from "lucide-react";

type Idea = {
  id: string; slug: string; title: string; outcome: string; category: string;
  difficulty: string; status: string; featured: boolean;
  _count: { phases: number; savedItems: number; progress: number };
};

export default function IdeasTable({ initialIdeas }: { initialIdeas: Idea[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialIdeas);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.title} ${i.slug} ${i.category}`.toLowerCase().includes(q));
  }, [items, query]);

  async function remove(id: string) {
    if (!confirm("Delete this idea? This permanently removes its phases, tasks, resources, action plans, and user progress for this idea.")) return;
    const res = await fetch(`/api/admin/ideas/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems(items.filter((i) => i.id !== id));
      router.refresh();
    } else {
      alert("Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ideas..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-sm" />
        </div>
        <Link href="/admin/ideas/new"
          className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
          <Plus size={16} /> New Idea
        </Link>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Idea</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Phases</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i.id} className="border-t border-zinc-800/70 hover:bg-zinc-900/70">
                <td className="px-4 py-3">
                  <div className="font-semibold">{i.title}</div>
                  <div className="text-xs text-zinc-500 font-mono">/{i.slug}</div>
                </td>
                <td className="px-4 py-3 text-zinc-400">{i.category}</td>
                <td className="px-4 py-3 text-zinc-400">
                  <span className="inline-flex items-center gap-1"><Layers size={12} /> {i._count.phases}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    i.status === "PUBLISHED" ? "bg-emerald-500/10 text-emerald-400" :
                    i.status === "DRAFT" ? "bg-amber-500/10 text-amber-400" : "bg-zinc-800 text-zinc-400"
                  }`}>{i.status}</span>
                  {i.featured && <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400">FEATURED</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/implement-ideas/${i.slug}`} target="_blank" className="inline-block p-2 hover:text-emerald-400 text-zinc-400"><ExternalLink size={14} /></Link>
                  <Link href={`/admin/ideas/${i.id}`} className="inline-block p-2 hover:text-emerald-400 text-zinc-400"><Pencil size={14} /></Link>
                  <button onClick={() => remove(i.id)} className="p-2 hover:text-rose-400 text-zinc-400"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="text-center py-12 text-zinc-500">No ideas match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}