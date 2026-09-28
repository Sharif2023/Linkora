"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please ensure both fields are identical.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong while resetting your password.");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="w-full max-w-[440px] bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-2xl p-7 sm:p-9 rounded-3xl shadow-2xl shadow-black/80 text-center relative">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto mb-5">
          <AlertCircle size={24} />
        </div>
        <h1 className="text-2xl font-extrabold text-white mb-2">Invalid Reset Link</h1>
        <p className="text-zinc-400 text-sm mb-6">
          This password reset link is missing required verification parameters or has expired.
        </p>
        <Link
          href="/forgot-password"
          className="inline-flex w-full items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
          style={{ color: "#09090b" }}
        >
          Request a New Link
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-[440px] bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-2xl p-7 sm:p-9 rounded-3xl shadow-2xl shadow-black/80 relative"
    >
      {/* Top glowing accent border */}
      <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent" />

      {/* Brand Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner shadow-emerald-500/10">
          <KeyRound size={22} />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 text-center">
        {success ? "Password Updated" : "Set New Password"}
      </h1>
      <p className="text-zinc-400 text-sm text-center mb-7">
        {success
          ? "Your credentials have been securely updated"
          : `Create a strong new password for ${email}`}
      </p>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rose-500/10 border border-rose-500/40 text-rose-300 p-3.5 rounded-xl text-sm mb-6 flex items-start gap-2.5"
        >
          <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-400" />
          <span>{error}</span>
        </motion.div>
      )}

      {success ? (
        <div className="space-y-6">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-emerald-300 text-xs leading-relaxed flex items-start gap-3">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Reset Complete!</span>
              <p className="text-zinc-400 mt-1">
                Your password has been changed. You can now use your new password to access your Linkora workspace.
              </p>
            </div>
          </div>

          <Link
            href="/login"
            className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-zinc-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm"
            style={{ color: "#09090b" }}
          >
            <span>Proceed to Sign In</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-xl pl-10 pr-11 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-xl pl-10 pr-11 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-zinc-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-sm mt-3"
            style={{ color: "#09090b" }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-zinc-950/30 border-t-zinc-950 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <span>Save New Password</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <div className="mt-6 text-center text-sm">
            <Link
              href="/login"
              className="text-zinc-400 hover:text-white font-medium transition-colors text-xs"
              style={{ color: "#a1a1aa" }}
            >
              Cancel and Return to Sign In
            </Link>
          </div>
        </form>
      )}
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-emerald-500/30 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.07] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-emerald-600/[0.04] rounded-full blur-[100px] pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-24 sm:py-28 relative z-10">
        <Suspense
          fallback={
            <div className="w-full max-w-[440px] bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-12 text-center text-zinc-400">
              <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
              Loading verification details...
            </div>
          }
        >
          <ResetPasswordContent />
        </Suspense>
      </main>

      <footer className="py-6 text-center text-xs text-zinc-600 relative z-10">
        &copy; {new Date().getFullYear()} Linkora Intelligence Workspace. All rights reserved.
      </footer>
    </div>
  );
}
