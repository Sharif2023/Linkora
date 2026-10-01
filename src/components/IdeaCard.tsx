"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, DollarSign, Layers, Wrench, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { ImplementationIdeaData } from "@/types/implement-ideas";

interface IdeaCardProps {
  idea: ImplementationIdeaData;
  progressPercent?: number; // 0 to 100
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Creator Economy":
      return "from-rose-500/20 to-orange-500/20 text-orange-400 border-orange-500/30";
    case "SaaS & Startups":
      return "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30";
    case "Freelancing & Business":
      return "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30";
    case "Content & Media":
      return "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30";
    case "Digital Products":
      return "from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30";
    default:
      return "from-zinc-800 to-zinc-900 text-zinc-400 border-zinc-700";
  }
};

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Intermediate":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Advanced":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    default:
      return "bg-zinc-800 text-zinc-400 border-zinc-700";
  }
};

export default function IdeaCard({ idea, progressPercent }: IdeaCardProps) {
  const categoryColorClass = getCategoryColor(idea.category);
  const difficultyBadgeClass = getDifficultyBadge(idea.difficulty);

  const totalTools = idea.phases?.reduce(
    (acc, phase) => acc + (phase.resources?.length || 0),
    0
  ) || 0;

  const hasStarted = typeof progressPercent === "number" && progressPercent > 0;
  const isCompleted = typeof progressPercent === "number" && progressPercent >= 100;

  return (
    <Link href={`/implement-ideas/${idea.slug}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 rounded-3xl p-6 sm:p-7 h-full flex flex-col justify-between relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] group-hover:bg-zinc-900/90"
      >
        {/* Top Highlight strip on hover */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          {/* Header Badges */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${categoryColorClass}`}
            >
              {idea.category}
            </span>

            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${difficultyBadgeClass}`}
              >
                {idea.difficulty}
              </span>
              {idea.featured && (
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1">
                  <Zap size={11} /> Featured
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-snug">
            {idea.title}
          </h3>

          {/* Outcome */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
            {idea.outcome}
          </p>

          {/* Execution Specs Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-4 border-y border-zinc-800/80 text-xs text-zinc-400 mb-6 bg-zinc-950/40 rounded-xl px-3">
            <div className="flex items-center gap-1.5" title="Estimated Time">
              <Clock size={14} className="text-zinc-500 shrink-0" />
              <span className="truncate">{idea.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Estimated Budget">
              <DollarSign size={14} className="text-zinc-500 shrink-0" />
              <span className="truncate">{idea.estimatedCost}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Phases">
              <Layers size={14} className="text-zinc-500 shrink-0" />
              <span>{idea.phases?.length || 5} Phases</span>
            </div>
            <div className="flex items-center gap-1.5" title="Curated Tools">
              <Wrench size={14} className="text-zinc-500 shrink-0" />
              <span>{totalTools} Tools</span>
            </div>
          </div>
        </div>

        {/* Footer Area: Progress or CTA */}
        <div className="mt-auto pt-2">
          {hasStarted ? (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
                <span className="text-zinc-400 flex items-center gap-1">
                  {isCompleted ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={13} /> Completed
                    </span>
                  ) : (
                    "Progress"
                  )}
                </span>
                <span className="text-emerald-400">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between text-sm font-semibold text-emerald-400 group-hover:text-emerald-300">
            <span>{hasStarted ? "Resume roadmap" : "Explore roadmap"}</span>
            <ArrowRight
              size={16}
              className="transform group-hover:translate-x-1.5 transition-transform"
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
