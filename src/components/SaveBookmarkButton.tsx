"use client";

import { useState } from "react";
import { BookmarkPlus, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SaveBookmarkButtonProps {
  resourceId: string;
}

export default function SaveBookmarkButton({ resourceId }: SaveBookmarkButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId }),
      });

      if (res.ok) {
        setSaved(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (saved) {
    return (
      <button disabled className="inline-flex items-center justify-center bg-zinc-900 border border-zinc-800 text-emerald-400 px-6 py-4 rounded-xl text-lg font-bold transition-all">
        <Check size={20} className="mr-3" /> Saved to Workspace
      </button>
    );
  }

  return (
    <button 
      onClick={handleSave}
      disabled={loading}
      className="inline-flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white px-6 py-4 rounded-xl text-lg font-bold transition-all group"
    >
      {loading ? (
        <div className="w-5 h-5 rounded-full border-2 border-zinc-500 border-t-white animate-spin mr-3"></div>
      ) : (
        <BookmarkPlus size={20} className="mr-3 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
      )}
      Save to Workspace
    </button>
  );
}
