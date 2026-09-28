"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Link2 } from "@/components/CategoryIcons";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  KeyRound,
  X,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password. Please check your credentials.");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    setDevResetUrl(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      setForgotSubmitted(true);
      setEmailSent(Boolean(data.emailSent));
      if (data.devResetUrl) {
        setDevResetUrl(data.devResetUrl);
      }
    } catch (err: any) {
      setForgotError(err.message || "Something went wrong. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-emerald-500/30 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.07] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-emerald-600/[0.04] rounded-full blur-[100px] pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-24 sm:py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-[440px] bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-2xl p-7 sm:p-9 rounded-3xl shadow-2xl shadow-black/80 relative"
        >
          {/* Top glowing accent border */}
          <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent" />

          {/* Brand Emblem */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner shadow-emerald-500/10">
              <Link2 size="24" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 text-center">
            Welcome back
          </h1>
          <p className="text-zinc-400 text-sm text-center mb-7">
            Sign in to your Linkora workspace
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

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setForgotSubmitted(false);
                    setForgotError("");
                    setShowForgotModal(true);
                  }}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors cursor-pointer"
                  style={{ color: "#34d399" }}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-xl pl-10 pr-11 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
                  placeholder="••••••••"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-zinc-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-sm mt-3"
              style={{ color: "#09090b" }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-zinc-950/30 border-t-zinc-950 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-7 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-emerald-400 hover:text-emerald-300 font-semibold hover:underline transition-colors"
              style={{ color: "#34d399" }}
            >
              Sign up
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="py-6 text-center text-xs text-zinc-600 relative z-10">
        &copy; {new Date().getFullYear()} Linkora Intelligence Workspace. All rights reserved.
      </footer>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForgotModal(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-7 sm:p-8 shadow-2xl shadow-black z-10"
            >
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <KeyRound size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Reset password</h2>
                  <p className="text-xs text-zinc-400">We'll email you reset instructions</p>
                </div>
              </div>

              {forgotSubmitted ? (
                <div className="space-y-4 pt-2">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-emerald-300 text-xs leading-relaxed flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">
                        {emailSent ? "Email dispatched!" : "Reset link generated!"}
                      </span>
                      <p className="text-zinc-400 mt-1">
                        {emailSent
                          ? `We've sent a password reset link to ${forgotEmail}. Please check your inbox and spam folder.`
                          : `Password reset request registered for ${forgotEmail}.`}
                      </p>
                    </div>
                  </div>

                  {devResetUrl && (
                    <div className="p-3 bg-zinc-950/80 border border-amber-500/30 rounded-xl text-xs space-y-2">
                      <div className="text-amber-400 font-semibold flex items-center gap-1.5 text-xs">
                        <AlertCircle size={14} /> Dev Preview (SMTP not set):
                      </div>
                      <p className="text-zinc-400 text-[11px] leading-relaxed">
                        To receive emails in your real Gmail inbox, add your Gmail App Password to <code className="text-zinc-300">.env</code>. You can test the reset flow immediately below:
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

                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
                    style={{ color: "#09090b" }}
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
                  {forgotError && (
                    <div className="bg-rose-500/10 border border-rose-500/40 text-rose-300 p-3 rounded-xl text-xs">
                      {forgotError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Registered Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-1.5"
                      style={{ color: "#09090b" }}
                    >
                      {forgotLoading ? (
                        <div className="w-4 h-4 rounded-full border-2 border-zinc-950/30 border-t-zinc-950 animate-spin" />
                      ) : (
                        "Send Link"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
