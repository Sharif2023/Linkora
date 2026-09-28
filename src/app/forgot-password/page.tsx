"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, KeyRound, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDevResetUrl(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to process request");
      }

      setSubmitted(true);
      setEmailSent(Boolean(data.emailSent));
      if (data.devResetUrl) {
        setDevResetUrl(data.devResetUrl);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-emerald-500/30 relative overflow-hidden">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-emerald-600/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-24 sm:py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-[440px] bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-2xl p-7 sm:p-9 rounded-3xl shadow-2xl shadow-black/80 relative"
        >
          {/* Top glowing accent line */}
          <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent" />

          {/* Top emblem badge */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner shadow-emerald-500/10">
              <KeyRound size={22} />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 text-center">
            {submitted ? "Check your email" : "Reset your password"}
          </h1>
          <p className="text-zinc-400 text-sm text-center mb-7">
            {submitted
              ? `We have dispatched a password reset link to ${email}`
              : "Enter your registered email address and we'll send you instructions to reset your password."}
          </p>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/40 text-rose-300 p-3.5 rounded-xl text-sm mb-6 text-center">
              {error}
            </div>
          )}

          {submitted ? (
            <div className="space-y-5">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-emerald-300 text-xs leading-relaxed flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">
                    {emailSent ? "Email dispatched!" : "Reset link generated!"}
                  </span>
                  <p className="text-zinc-400 mt-1">
                    {emailSent
                      ? `We have dispatched a password reset link to ${email}. Please check your inbox and spam folder.`
                      : `Password reset request registered for ${email}.`}
                  </p>
                </div>
              </div>

              {devResetUrl && (
                <div className="p-3.5 bg-zinc-950/80 border border-amber-500/30 rounded-2xl text-xs space-y-2">
                  <div className="text-amber-400 font-semibold flex items-center gap-1.5 text-xs">
                    <AlertCircle size={14} /> Local Dev Preview (SMTP not configured):
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    To receive real emails in your Gmail inbox, configure your Gmail App Password in <code className="text-zinc-300">.env</code>. You can click below to test the reset flow immediately:
                  </p>
                  <a
                    href={devResetUrl}
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold underline break-all text-xs pt-1"
                    style={{ color: "#34d399" }}
                  >
                    Open Password Reset Link &rarr;
                  </a>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
                >
                  Send to a different email
                </button>
                <Link
                  href="/login"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-zinc-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm"
                  style={{ color: "#09090b" }}
                >
                  <ArrowLeft size={16} />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-zinc-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-sm mt-2"
                style={{ color: "#09090b" }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-zinc-950/30 border-t-zinc-950 animate-spin" />
                    <span>Sending instructions...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                  style={{ color: "#a1a1aa" }}
                >
                  <ArrowLeft size={14} />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </main>

      <footer className="py-6 text-center text-xs text-zinc-600 relative z-10">
        &copy; {new Date().getFullYear()} Linkora Intelligence Workspace. All rights reserved.
      </footer>
    </div>
  );
}
