"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass, Rocket, Layers, CheckCircle2 } from "lucide-react";

interface ImplementIdeasHeroProps {
  totalIdeas: number;
  totalCollections: number;
  totalTools: number;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CATEGORIES: { label: string; value: string; icon: string }[] = [
  { label: "All Ambitions", value: "ALL", icon: "✨" },
  { label: "Creator Economy", value: "Creator Economy", icon: "🎬" },
  { label: "SaaS & Startups", value: "SaaS & Startups", icon: "⚡" },
  { label: "Freelancing & Business", value: "Freelancing & Business", icon: "💼" },
  { label: "Content & Media", value: "Content & Media", icon: "🎙️" },
  { label: "Digital Products", value: "Digital Products", icon: "📦" },
];

export default function ImplementIdeasHero({
  totalIdeas,
  totalCollections,
  totalTools,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: ImplementIdeasHeroProps) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden border-b border-zinc-900 bg-gradient-to-b from-zinc-950 via-black to-black">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span>FROM AMBITION TO EXECUTION</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
        >
          Your next big idea <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
            deserves a plan.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Discover curated tools, proven workflows, and step-by-step blueprints to turn what you want to build into something real.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search an idea, business model or goal (e.g. YouTube, Micro-SaaS, Freelance)..."
              className="w-full bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-base sm:text-lg rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-2xl transition-all"
            />
            <Compass className="absolute left-4 text-zinc-500 pointer-events-none" size={20} />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 px-2 py-1 rounded-md transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105"
                    : "bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Live Counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-3 px-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm text-sm text-zinc-400"
        >
          <div className="flex items-center gap-2">
            <Rocket size={16} className="text-emerald-400" />
            <span><strong className="text-white font-bold">{totalIdeas}</strong> Blueprints</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-teal-400" />
            <span><strong className="text-white font-bold">{totalCollections}</strong> Thematic Stacks</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span><strong className="text-white font-bold">{totalTools}+</strong> Verified Tools</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
