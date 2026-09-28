"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Eye, EyeOff, Lock, AlertCircle } from "lucide-react";

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update password");

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update password. Please check your current password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/40 text-rose-300 p-3.5 rounded-xl text-sm flex items-start gap-2.5">
          <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-400" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3.5 rounded-xl text-sm flex items-center gap-2.5">
          <Check size={18} className="text-emerald-400" />
          <span>Password updated successfully!</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
          Current Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type={showCurrent ? "text" : "password"}
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-10 pr-11 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label={showCurrent ? "Hide current password" : "Show current password"}
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            New Password
          </label>
          <span className="text-[11px] text-zinc-500">Min. 6 characters</span>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type={showNew ? "text" : "password"}
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-10 pr-11 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label={showNew ? "Hide new password" : "Show new password"}
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !currentPassword || !newPassword}
        className="mt-2 w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-zinc-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-12 text-sm"
        style={{ color: "#09090b" }}
      >
        {loading ? (
          <div className="w-5 h-5 rounded-full border-2 border-zinc-950/30 border-t-zinc-950 animate-spin" />
        ) : (
          "Update Password"
        )}
      </button>

      <div className="text-center mt-4">
        <Link
          href="/forgot-password"
          className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
          style={{ color: "#34d399" }}
        >
          Forgot your password? Reset via email &rarr;
        </Link>
      </div>
    </form>
  );
}
