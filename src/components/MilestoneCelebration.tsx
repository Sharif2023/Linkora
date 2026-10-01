"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle, Sparkles, X, ArrowRight } from "lucide-react";

interface MilestoneCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  isAllCompleted?: boolean;
}

export default function MilestoneCelebration({
  isOpen,
  onClose,
  title,
  message,
  isAllCompleted = false,
}: MilestoneCelebrationProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-zinc-900 border border-emerald-500/40 rounded-3xl p-8 sm:p-10 text-center shadow-2xl overflow-hidden"
        >
          {/* Top glowing ambient effect */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Icon Badge */}
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400">
            {isAllCompleted ? (
              <Award size={40} className="animate-bounce" />
            ) : (
              <CheckCircle size={40} className="animate-pulse" />
            )}
          </div>

          {/* Celebration Header */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles size={13} />
            <span>{isAllCompleted ? "ROADMAP COMPLETED" : "PHASE MILESTONE REACHED"}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
            {title}
          </h3>

          <p className="text-zinc-300 text-base leading-relaxed mb-8">
            {message}
          </p>

          <button
            onClick={onClose}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 text-base"
          >
            <span>{isAllCompleted ? "Celebrate & Explore More" : "Continue to Next Phase"}</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
