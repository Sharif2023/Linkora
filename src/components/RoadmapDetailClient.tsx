"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Bookmark, Check, ChevronDown, ChevronUp,
  Clock, DollarSign, ExternalLink, Layers, Sparkles, Target, Zap, RotateCcw, AlertTriangle
} from "lucide-react";
import { ImplementationIdeaData, IdeaTask } from "@/types/implement-ideas";
import MilestoneCelebration from "./MilestoneCelebration";

interface RoadmapDetailClientProps {
  idea: ImplementationIdeaData;
}

export default function RoadmapDetailClient({ idea }: RoadmapDetailClientProps) {
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [openPhases, setOpenPhases] = useState<Record<number, boolean>>({ 1: true });
  const [celebrationData, setCelebrationData] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isAllCompleted?: boolean;
  }>({ isOpen: false, title: "", message: "", isAllCompleted: false });
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Flatten all tasks
  const allTasks = idea.phases?.flatMap((p) => p.tasks) || [];
  const totalTasksCount = allTasks.length;
  const completedCount = completedTaskIds.length;
  const progressPercent = totalTasksCount > 0 ? (completedCount / totalTasksCount) * 100 : 0;

  // Load progress and bookmark state on mount
  useEffect(() => {
    async function loadData() {
      // Try to load from server
      try {
        const progressRes = await fetch(`/api/ideas/progress?ideaId=${idea.id || idea.slug}`);
        if (progressRes.ok) {
          const pData = await progressRes.json();
          if (pData.completedTaskIds && pData.completedTaskIds.length > 0) {
            setCompletedTaskIds(pData.completedTaskIds);
          }
        }

        const bookmarkRes = await fetch("/api/ideas/bookmark");
        if (bookmarkRes.ok) {
          const bData = await bookmarkRes.json();
          if (bData.bookmarkedIdeaIds?.includes(idea.id || idea.slug)) {
            setIsBookmarked(true);
          }
        }
      } catch (e) {
        console.warn("Server fetch failed, checking guest localStorage", e);
      }

      // Guest localStorage fallback
      try {
        const guestData = localStorage.getItem(`linkora_progress_${idea.slug}`);
        if (guestData) {
          const parsed = JSON.parse(guestData);
          if (Array.isArray(parsed)) {
            setCompletedTaskIds(parsed);
          }
        }
        const guestBookmarks = localStorage.getItem("linkora_guest_bookmarks");
        if (guestBookmarks) {
          const bList = JSON.parse(guestBookmarks);
          if (bList.includes(idea.slug)) {
            setIsBookmarked(true);
          }
        }
      } catch {
        // ignore
      }
    }

    loadData();
  }, [idea]);

  // Toggle Task Completion
  const handleToggleTask = async (task: IdeaTask, phaseIndex: number) => {
    const taskIdOrTitle = task.id || task.title;
    const isCurrentlyDone = completedTaskIds.includes(taskIdOrTitle);
    const newCompleted = isCurrentlyDone
      ? completedTaskIds.filter((id) => id !== taskIdOrTitle)
      : [...completedTaskIds, taskIdOrTitle];

    setCompletedTaskIds(newCompleted);

    // Save to localStorage for guest persistence
    try {
      localStorage.setItem(`linkora_progress_${idea.slug}`, JSON.stringify(newCompleted));
    } catch {}

    // Check if phase was just completed
    const currentPhase = idea.phases[phaseIndex];
    if (!isCurrentlyDone && currentPhase) {
      const phaseTaskIds = currentPhase.tasks.map((t) => t.id || t.title);
      const allPhaseTasksDone = phaseTaskIds.every((id) => newCompleted.includes(id));

      if (allPhaseTasksDone) {
        // Trigger celebration!
        const isRoadmapDone = allTasks.every((t) => newCompleted.includes(t.id || t.title));
        setCelebrationData({
          isOpen: true,
          title: isRoadmapDone ? "Roadmap Fully Completed!" : `Phase Completed: ${currentPhase.title}`,
          message: isRoadmapDone
            ? `Spectacular work! You have finished every task in "${idea.title}". Your foundation is built and ready for real-world execution.`
            : `You've achieved: "${currentPhase.outcome}". All tasks in this phase are complete!`,
          isAllCompleted: isRoadmapDone,
        });

        // Automatically open next phase
        const nextPhasePosition = currentPhase.position + 1;
        setOpenPhases((prev) => ({ ...prev, [nextPhasePosition]: true }));
      }
    }

    // Try server sync if authenticated
    try {
      await fetch("/api/ideas/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: task.id || task.title,
          ideaId: idea.id || idea.slug,
          completed: !isCurrentlyDone,
        }),
      });
    } catch {
      // guest state already preserved locally
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = async () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);

    // Guest fallback
    try {
      const stored = localStorage.getItem("linkora_guest_bookmarks") || "[]";
      let list = JSON.parse(stored);
      if (nextState) {
        if (!list.includes(idea.slug)) list.push(idea.slug);
      } else {
        list = list.filter((s: string) => s !== idea.slug);
      }
      localStorage.setItem("linkora_guest_bookmarks", JSON.stringify(list));
    } catch {}

    // Server call
    try {
      await fetch("/api/ideas/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaId: idea.id || idea.slug }),
      });
    } catch {}
  };

  // Reset Progress
  const handleResetProgress = async () => {
    setCompletedTaskIds([]);
    try {
      localStorage.removeItem(`linkora_progress_${idea.slug}`);
      await fetch("/api/ideas/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset",
          ideaId: idea.id || idea.slug,
        }),
      });
    } catch {}
    setShowResetConfirm(false);
  };

  const togglePhase = (position: number) => {
    setOpenPhases((prev) => ({
      ...prev,
      [position]: !prev[position],
    }));
  };

  const scrollToFirstPhase = () => {
    const el = document.getElementById("roadmap-phases");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 pb-24">
      {/* Milestone Celebration Modal */}
      <MilestoneCelebration
        isOpen={celebrationData.isOpen}
        onClose={() => setCelebrationData((prev) => ({ ...prev, isOpen: false }))}
        title={celebrationData.title}
        message={celebrationData.message}
        isAllCompleted={celebrationData.isAllCompleted}
      />

      {/* Header Section */}
      <section className="pt-28 pb-14 border-b border-zinc-900 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-black relative">
        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link
              href="/implement-ideas"
              className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              <span>Implement Ideas</span>
            </Link>
            <span>/</span>
            <span className="text-zinc-400 truncate max-w-xs">{idea.title}</span>
          </div>

          {/* Category & Difficulty Header */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {idea.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
              {idea.difficulty}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {idea.title}
          </h1>

          {/* Outcome */}
          <p className="text-xl sm:text-2xl text-zinc-300 font-normal leading-relaxed mb-10 max-w-3xl">
            {idea.outcome}
          </p>

          {/* Target Audience Bar */}
          {idea.targetAudience && (
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-300 flex items-start gap-3 mb-10">
              <Target size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-semibold">Target Audience: </strong>
                {idea.targetAudience}
              </div>
            </div>
          )}

          {/* Execution Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-zinc-800/80 text-sm text-zinc-400">
            <div>
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                <Clock size={14} className="text-emerald-400" /> Time to Result
              </div>
              <div className="text-base font-bold text-white">{idea.estimatedTime}</div>
            </div>
            <div>
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                <DollarSign size={14} className="text-emerald-400" /> Est. Cost
              </div>
              <div className="text-base font-bold text-white">{idea.estimatedCost}</div>
            </div>
            <div>
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                <Layers size={14} className="text-teal-400" /> Total Phases
              </div>
              <div className="text-base font-bold text-white">{idea.phases?.length || 5} Phases</div>
            </div>
            <div>
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                <Zap size={14} className="text-emerald-400" /> Total Tasks
              </div>
              <div className="text-base font-bold text-white">{totalTasksCount} Action Items</div>
            </div>
          </div>

          {/* Primary Action Controls */}
          <div className="flex flex-wrap items-center gap-4 pt-8">
            <button
              onClick={scrollToFirstPhase}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-base px-8 py-3.5 rounded-full flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              <Sparkles size={18} />
              <span>{completedCount > 0 ? "Resume Roadmap" : "Start This Roadmap"}</span>
            </button>

            <button
              onClick={handleToggleBookmark}
              className={`px-5 py-3.5 rounded-full text-sm font-semibold border flex items-center gap-2 transition-all active:scale-95 ${
                isBookmarked
                  ? "bg-zinc-800 border-emerald-500/50 text-emerald-400"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <Bookmark size={16} className={isBookmarked ? "fill-emerald-400 text-emerald-400" : ""} />
              <span>{isBookmarked ? "Bookmarked" : "Bookmark Plan"}</span>
            </button>

            {completedCount > 0 && (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-3.5 rounded-full text-xs font-medium text-zinc-500 hover:text-rose-400 transition-colors flex items-center gap-1.5 ml-auto"
                title="Reset all completed tasks"
              >
                <RotateCcw size={14} />
                <span>Reset Progress</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Reset roadmap progress?</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              This will uncheck all your completed action items for this blueprint. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetProgress}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Progress Bar */}
      <div className="sticky top-16 z-30 bg-zinc-950/90 border-b border-zinc-800 backdrop-blur-md py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Roadmap Progress
            </div>
            <span className="text-sm font-bold text-emerald-400">
              {completedCount} / {totalTasksCount} tasks ({Math.round(progressPercent)}%)
            </span>
          </div>
          <div className="w-48 sm:w-72 bg-zinc-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 pt-14">
        {/* Action Plan Overview Box */}
        {idea.actionPlan && idea.actionPlan.length > 0 && (
          <div className="mb-16 bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-8 sm:p-10 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Sparkles size={20} className="text-emerald-400" />
              <span>Chronological Action Plan</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {idea.actionPlan.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4 text-xs text-zinc-300 flex flex-col justify-between"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center mb-2 border border-emerald-500/20">
                    {step.stepNumber}
                  </div>
                  <div className="font-bold text-white text-sm mb-1.5">{step.title}</div>
                  <div className="text-zinc-400 leading-relaxed text-xs">{step.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phases Accordion List */}
        <div id="roadmap-phases" className="space-y-8">
          <h2 className="text-3xl font-extrabold mb-8 text-white flex items-center justify-between">
            <span>Execution Phases & Toolkits</span>
            <span className="text-sm font-normal text-zinc-500">
              Click any phase to expand
            </span>
          </h2>

          {idea.phases?.map((phase, phaseIndex) => {
            const phaseTasks = phase.tasks || [];
            const phaseTaskIds = phaseTasks.map((t) => t.id || t.title);
            const phaseCompletedTasks = phaseTaskIds.filter((id) =>
              completedTaskIds.includes(id)
            );
            const isPhaseDone =
              phaseTaskIds.length > 0 &&
              phaseCompletedTasks.length === phaseTaskIds.length;
            const isOpen = openPhases[phase.position] ?? false;

            return (
              <div
                key={phase.title}
                className={`border rounded-3xl transition-all duration-300 overflow-hidden ${
                  isPhaseDone
                    ? "border-emerald-500/40 bg-zinc-900/60"
                    : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                }`}
              >
                {/* Phase Header Accordion Toggle */}
                <button
                  onClick={() => togglePhase(phase.position)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 select-none focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    {/* Phase Number Badge */}
                    <div
                      className={`w-12 h-12 rounded-2xl font-bold flex items-center justify-center shrink-0 text-base transition-colors ${
                        isPhaseDone
                          ? "bg-emerald-500 text-white"
                          : "bg-zinc-800 text-zinc-300 border border-zinc-700"
                      }`}
                    >
                      {isPhaseDone ? <Check size={24} /> : `0${phase.position}`}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          Phase {phase.position}
                        </span>
                        {phase.estimatedDuration && (
                          <span className="text-xs text-zinc-500">
                            • {phase.estimatedDuration}
                          </span>
                        )}
                        {isPhaseDone && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase">
                            Phase Completed
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {phase.title}
                      </h3>
                      <p className="text-zinc-400 text-sm mt-1 line-clamp-1">
                        {phase.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right text-xs font-semibold text-zinc-400 hidden sm:block">
                      <span>
                        {phaseCompletedTasks.length}/{phaseTasks.length} tasks
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-800/80 text-zinc-400">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </button>

                {/* Expanded Phase Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-zinc-800/80 p-6 sm:p-8 pt-6 space-y-8"
                    >
                      {/* What you'll achieve box */}
                      <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                        <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                          <Target size={14} />
                          <span>What you will achieve</span>
                        </div>
                        <p className="text-zinc-300 text-base font-medium">
                          {phase.outcome}
                        </p>
                      </div>

                      {/* Action Checklist */}
                      <div>
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                          <span>Action Checklist</span>
                          <span className="text-xs font-normal text-zinc-500">
                            Check items to track progress
                          </span>
                        </h4>

                        <div className="space-y-3">
                          {phaseTasks.map((task) => {
                            const taskIdOrTitle = task.id || task.title;
                            const isDone = completedTaskIds.includes(taskIdOrTitle);

                            return (
                              <div
                                key={task.title}
                                onClick={() => handleToggleTask(task, phaseIndex)}
                                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer select-none transition-all duration-200 ${
                                  isDone
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-zinc-300"
                                    : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-300"
                                }`}
                              >
                                <div
                                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                    isDone
                                      ? "bg-emerald-500 border-emerald-500 text-white"
                                      : "border-zinc-600 bg-zinc-900 hover:border-emerald-400"
                                  }`}
                                >
                                  {isDone && <Check size={16} />}
                                </div>
                                <div className="flex-1">
                                  <div
                                    className={`font-semibold text-sm sm:text-base ${
                                      isDone ? "line-through text-zinc-400" : "text-white"
                                    }`}
                                  >
                                    {task.title}
                                  </div>
                                  {task.description && (
                                    <div className="text-zinc-500 text-xs sm:text-sm mt-1 leading-relaxed">
                                      {task.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Curated Resources for this phase */}
                      {phase.resources && phase.resources.length > 0 && (
                        <div>
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                            <span>Handpicked Tools for this Phase</span>
                            <span className="text-xs font-normal text-zinc-500">
                              Direct official links
                            </span>
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {phase.resources.map((res) => (
                              <a
                                key={res.name}
                                href={res.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/res block p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all duration-200 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-2 mb-3">
                                    <div className="font-bold text-base text-white group-hover/res:text-emerald-400 transition-colors flex items-center gap-1.5">
                                      <span>{res.name}</span>
                                    </div>
                                    <ExternalLink
                                      size={15}
                                      className="text-zinc-500 group-hover/res:text-emerald-400 transition-colors shrink-0"
                                    />
                                  </div>

                                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed line-clamp-3">
                                    {res.purpose}
                                  </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-zinc-800/60 text-xs">
                                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold">
                                    {res.pricingModel}
                                  </span>
                                  {res.hasFreeTier && (
                                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                                      Free Tier
                                    </span>
                                  )}
                                  {res.isEssential && (
                                    <span className="text-zinc-500 ml-auto font-medium">
                                      Essential
                                    </span>
                                  )}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
