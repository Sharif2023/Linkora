"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Clock, DollarSign, Layers, Wrench } from "lucide-react";
import { ImplementationIdeaData } from "@/types/implement-ideas";

interface FeaturedIdeaCardProps {
  idea: ImplementationIdeaData;
}

export default function FeaturedIdeaCard({ idea }: FeaturedIdeaCardProps) {
  const totalTools = idea.phases?.reduce(
    (acc, phase) => acc + (phase.resources?.length || 0),
    0
  ) || 0;

  return (
    <div className="relative mb-16 overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-black p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
      {/* Subtle corner light */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>Featured Execution Blueprint</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {idea.title}
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            {idea.outcome}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-emerald-400" />
              <span>{idea.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-emerald-400" />
              <span>{idea.estimatedCost}</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-teal-400" />
              <span>{idea.phases?.length || 5} Chronological Phases</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench size={16} className="text-emerald-400" />
              <span>{totalTools} Handpicked Tools</span>
            </div>
          </div>

          <Link href={`/implement-ideas/${idea.slug}`}>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-base px-8 py-3.5 rounded-full flex items-center gap-3 transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-500/20 group">
              <span>Start This Blueprint</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Visual Roadmap Stepper Preview */}
        <div className="lg:col-span-5 bg-zinc-950/60 border border-zinc-800 rounded-2xl p-6 sm:p-7 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center justify-between">
            <span>Execution Roadmap Preview</span>
            <span className="text-emerald-400">Step-by-Step</span>
          </h3>

          <div className="space-y-3 pt-2">
            {idea.phases?.slice(0, 4).map((phase, idx) => (
              <div
                key={phase.title}
                className="flex items-start gap-3.5 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-xs sm:text-sm text-zinc-300 hover:border-zinc-700 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{phase.title}</div>
                  <div className="text-zinc-500 text-xs truncate">{phase.outcome}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <span className="text-xs text-zinc-500 font-medium">
              + {((idea.phases?.length || 5) - 4)} more phase with curated tools & tasks
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
