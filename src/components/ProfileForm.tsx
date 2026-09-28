"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function ProfileForm({ initialName, initialEmail }: { initialName: string, initialEmail: string }) {
  const [name, setName] = useState(initialName);
  const [email] = useState(initialEmail); // Email shouldn't be easily mutable without verification, keep it disabled for now
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-3 rounded-lg text-sm flex items-center gap-2">
          <Check size={16} /> Profile updated successfully!
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1.5">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email Address</label>
        <input
          type="email"
          disabled
          value={email}
          className="w-full bg-zinc-950/50 border border-zinc-800/50 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed"
          title="Email cannot be changed right now."
        />
      </div>

      <button
        type="submit"
        disabled={loading || name === initialName}
        className="mt-4 w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-12"
      >
        {loading ? (
          <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
}
