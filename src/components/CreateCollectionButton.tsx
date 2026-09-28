"use client";

import { useState } from "react";
import { FolderPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateCollectionButton({ variant = "primary" }: { variant?: "primary" | "secondary" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || title.trim() === "") return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (res.ok) {
        setTitle("");
        setIsOpen(false);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to create collection");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setError("");
  };

  return (
    <>
      {variant === "secondary" ? (
        <button 
          onClick={openModal} 
          style={{ color: "black" }} 
          className="bg-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors"
        >
          Create Collection
        </button>
      ) : (
        <button 
          onClick={openModal}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <FolderPlus size={16} /> 
          New Collection
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">Create Collection</h2>
            <p className="text-zinc-400 text-sm mb-6">Give your new collection a name to start organizing your workspace.</p>

            <form onSubmit={handleCreate}>
              {error && (
                <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Collection Name</label>
                <input
                  type="text"
                  autoFocus
                  required
                  placeholder="e.g. Frontend Resources"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-5 py-2.5 text-zinc-300 font-semibold hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading || !title.trim()}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2.5 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                >
                  {loading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
