"use client";

import { SlidersHorizontal, ArrowUpDown, DollarSign, Gauge, RotateCcw } from "lucide-react";

interface IdeaFilterBarProps {
  difficulty: string;
  setDifficulty: (diff: string) => void;
  budget: string;
  setBudget: (budget: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  totalFiltered: number;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export default function IdeaFilterBar({
  difficulty,
  setDifficulty,
  budget,
  setBudget,
  sortBy,
  setSortBy,
  totalFiltered,
  onReset,
  hasActiveFilters,
}: IdeaFilterBarProps) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 mb-10 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mr-1">
            <SlidersHorizontal size={14} className="text-emerald-400" />
            <span>Filters:</span>
          </div>

          {/* Difficulty Filter */}
          <div className="relative">
            <select
              value={difficulty}
              aria-label="Filter by difficulty"
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-xs font-semibold text-zinc-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 appearance-none pr-8 cursor-pointer transition-colors"
            >
              <option value="ALL">Difficulty: All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <Gauge size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          {/* Budget Filter */}
          <div className="relative">
            <select
              value={budget}
              aria-label="Filter by budget"
              onChange={(e) => setBudget(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-xs font-semibold text-zinc-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 appearance-none pr-8 cursor-pointer transition-colors"
            >
              <option value="ALL">Budget: All</option>
              <option value="FREE">Free ($0)</option>
              <option value="UNDER_25">Under $25</option>
              <option value="UNDER_100">Under $100</option>
              <option value="OVER_100">$100+</option>
            </select>
            <DollarSign size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 transition-all"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right Sort & Count */}
        <div className="flex items-center gap-4 ml-auto">
          <span className="text-xs text-zinc-500 font-medium hidden sm:inline">
            Showing <strong className="text-zinc-300 font-semibold">{totalFiltered}</strong> results
          </span>

          <div className="relative flex items-center">
            <span className="text-xs text-zinc-400 mr-2 flex items-center gap-1">
              <ArrowUpDown size={12} /> Sort:
            </span>
            <select
              value={sortBy}
              aria-label="Sort ideas"
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-xs font-semibold text-zinc-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 appearance-none pr-7 cursor-pointer transition-colors"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Added</option>
              <option value="time">Shortest Time</option>
              <option value="beginner">Beginner-Friendly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
