"use client";

import { useState } from "react";
import { Bookmark, Trash2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

type SavedItem = {
  id: string;
  title: string;
  url: string;
  description: string | null;
  category: string | null;
};

export default function BookmarkList({ initialItems }: { initialItems: SavedItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/bookmarks/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems(items.filter(item => item.id !== id));
      router.refresh();
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    (item.description && item.description.toLowerCase().includes(search.toLowerCase())) ||
    item.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">Your Bookmarks</h2>
        
        <div className="relative">
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookmarks..." 
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all w-64"
          />
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-64 bg-zinc-950/50 rounded-xl border border-zinc-800/50 border-dashed">
          <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-500">
            <Bookmark size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">No bookmarks found</h3>
          <p className="text-zinc-500 text-sm max-w-sm mb-6">
            {items.length === 0 
              ? "You haven't saved any links yet. Head over to the Explore page to start building your workspace."
              : "No bookmarks match your search."}
          </p>
          {items.length === 0 && (
            <a href="/explore" style={{ color: "black" }} className="bg-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">
              Explore Resources
            </a>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group relative">
              <div className="pr-8">
                <h3 className="font-bold text-white mb-1 truncate flex items-center gap-2">
                  {item.title}
                  {item.category && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-zinc-400 truncate mb-4">{item.description || item.url}</p>
                <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300">
                  <ExternalLink size={12} /> Visit Link
                </a>
              </div>
              
              <button 
                onClick={() => handleDelete(item.id)}
                className="absolute top-4 right-4 text-zinc-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                title="Remove bookmark"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
