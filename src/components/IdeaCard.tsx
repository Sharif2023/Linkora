"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Clock, 
  DollarSign, 
  Layers, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Star 
} from "lucide-react";
import { ImplementationIdeaData } from "@/types/implement-ideas";

interface IdeaCardProps {
  idea: ImplementationIdeaData;
  progressPercent?: number;
}

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    case "Intermediate":
      return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    case "Advanced":
      return "text-rose-400 bg-rose-400/10 border-rose-400/20";
    default:
      return "text-zinc-400 bg-zinc-800 border-zinc-700";
  }
};

export default function IdeaCard({ idea, progressPercent }: IdeaCardProps) {
  const difficultyStyle = getDifficultyStyle(idea.difficulty);

  const totalTools = idea.toolGroups && idea.toolGroups.length > 0
    ? idea.toolGroups.reduce((acc, g) => acc + g.tools.length, 0)
    : idea.phases?.reduce(
        (acc, phase) => acc + (phase.resources?.length || 0),
        0
      ) || 0;

  const hasStarted = typeof progressPercent === "number" && progressPercent > 0;
  const isCompleted = typeof progressPercent === "number" && progressPercent >= 100;

  return (
    <Link href={`/implement-ideas/${idea.slug}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-zinc-900/40 border border-zinc-800/80 hover:border-emerald-500/30 rounded-3xl p-6 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5 hover:bg-zinc-900/80"
      >
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* TOP SECTION */}
        <div className="flex-1">
          
          {/* NEW CLEAN HEADER */}
          <div className="flex items-center justify-between gap-3 mb-4">
            {/* 1. Category (Subtle Text, No Border) */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">{idea.category}</span>
            </div>

            {/* 2. Right Side: Difficulty & Featured Icon */}
            <div className="flex items-center gap-2 shrink-0">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${difficultyStyle}`}>
                {idea.difficulty}
              </span>
              
              {idea.featured && (
                <div 
                  className="w-6 h-6 rounded flex items-center justify-center bg-amber-500/10 border border-amber-500/20"
                  title="Featured Blueprint"
                >
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                </div>
              )}
            </div>
          </div>

          {/* Title & Outcome */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
            {idea.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-6">
            {idea.outcome}
          </p>
        </div>

        {/* BOTTOM SECTION - mt-auto pushes this to the bottom perfectly */}
        <div className="mt-auto">
          {/* Execution Specs */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-3 py-4 border-y border-zinc-800/60 mb-5">
            <div className="flex items-start gap-2 text-xs font-medium text-zinc-300">
              <Clock size={14} className="text-emerald-500/70 shrink-0 mt-[2px]" />
              <span className="leading-snug line-clamp-2" title={idea.estimatedTime}>
                {idea.estimatedTime}
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs font-medium text-zinc-300">
              <DollarSign size={14} className="text-emerald-500/70 shrink-0 mt-[2px]" />
              <span className="leading-snug line-clamp-2" title={idea.estimatedCost}>
                {idea.estimatedCost}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
              <Layers size={14} className="text-emerald-500/70 shrink-0" />
              <span>{idea.phases?.length || 5} Phases</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
              <Wrench size={14} className="text-emerald-500/70 shrink-0" />
              <span>{totalTools} Tools</span>
            </div>
          </div>

          {/* Footer Area */}
          <div>
            {hasStarted && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-[11px] mb-2 font-bold tracking-wider uppercase">
                  <span className="text-zinc-400 flex items-center gap-1">
                    {isCompleted ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Completed
                      </span>
                    ) : (
                      "In Progress"
                    )}
                  </span>
                  <span className="text-emerald-400">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-sm font-semibold text-zinc-300 group-hover:text-emerald-400 transition-colors">
              <span>{hasStarted ? "Resume Blueprint" : "View Blueprint"}</span>
              <div className="w-8 h-8 rounded-full bg-zinc-800/80 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border group-hover:border-emerald-500/30 transition-all">
                <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}