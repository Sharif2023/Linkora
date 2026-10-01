"use client";

import { useState, useMemo, useEffect } from "react";
import ImplementIdeasHero from "./ImplementIdeasHero";
import IdeaFilterBar from "./IdeaFilterBar";
import IdeaCard from "./IdeaCard";
import FeaturedIdeaCard from "./FeaturedIdeaCard";
import { ImplementationIdeaData } from "@/types/implement-ideas";
import { SearchX } from "lucide-react";

interface ImplementIdeasClientProps {
  ideas: ImplementationIdeaData[];
  totalCollections: number;
}

export default function ImplementIdeasClient({
  ideas,
  totalCollections,
}: ImplementIdeasClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [difficulty, setDifficulty] = useState("ALL");
  const [budget, setBudget] = useState("ALL");
  const [sortBy, setSortBy] = useState("popular");
  const [userProgressMap, setUserProgressMap] = useState<Record<string, number>>({});

  // Load progress from API or localStorage
  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await fetch("/api/ideas/progress");
        if (res.ok) {
          const data = await res.json();
          if (data.startedIdeas && data.startedIdeas.length > 0) {
            const map: Record<string, number> = {};
            data.startedIdeas.forEach((item: { idea: { slug: string; phases: Array<{ tasks: Array<{ id: string }> }> } }) => {
              const allTasks = item.idea.phases.flatMap((p) => p.tasks);
              const completedCount = allTasks.filter((t) =>
                data.completedTaskIds?.includes(t.id)
              ).length;
              const percent = allTasks.length > 0 ? (completedCount / allTasks.length) * 100 : 0;
              map[item.idea.slug] = percent;
            });
            setUserProgressMap(map);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch server progress, falling back to localStorage", err);
      }

      // Guest fallback to localStorage
      try {
        const local = localStorage.getItem("linkora_guest_progress");
        if (local) {
          const parsed = JSON.parse(local);
          const map: Record<string, number> = {};
          ideas.forEach((idea) => {
            const allTasks = idea.phases.flatMap((p) => p.tasks);
            const completedCount = allTasks.filter((t) =>
              parsed.completedTaskIds?.includes(t.title)
            ).length;
            if (completedCount > 0) {
              map[idea.slug] = (completedCount / allTasks.length) * 100;
            }
          });
          setUserProgressMap(map);
        }
      } catch {
        // ignore
      }
    }

    loadProgress();
  }, [ideas]);

  // Compute total tools across all ideas
  const totalTools = useMemo(() => {
    return ideas.reduce((acc, idea) => {
      const ideaTools = idea.phases?.reduce(
        (sum, p) => sum + (p.resources?.length || 0),
        0
      ) || 0;
      return acc + ideaTools;
    }, 0);
  }, [ideas]);

  // Filter & Sort Logic
  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      // Category filter
      if (selectedCategory !== "ALL" && idea.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (difficulty !== "ALL" && idea.difficulty !== difficulty) {
        return false;
      }

      // Budget filter
      if (budget !== "ALL") {
        const costLower = idea.estimatedCost.toLowerCase();
        if (budget === "FREE" && !costLower.includes("$0") && !costLower.includes("free")) {
          return false;
        }
        if (budget === "UNDER_25" && (costLower.includes("$50") || costLower.includes("$100") || costLower.includes("$550"))) {
          return false;
        }
        if (budget === "OVER_100" && !costLower.includes("$550") && !costLower.includes("$100+")) {
          return false;
        }
      }

      // Search Query filter (matches title, outcome, targetAudience, keywords, tools)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = idea.title.toLowerCase().includes(query);
        const matchesOutcome = idea.outcome.toLowerCase().includes(query);
        const matchesAudience = idea.targetAudience?.toLowerCase().includes(query) ?? false;
        const matchesCategory = idea.category.toLowerCase().includes(query);
        const matchesKeywords = idea.keywords?.some((k) => k.toLowerCase().includes(query)) ?? false;
        const matchesTools = idea.phases?.some((p) =>
          p.resources?.some((r) => r.name.toLowerCase().includes(query) || r.purpose?.toLowerCase().includes(query))
        ) ?? false;

        return (
          matchesTitle ||
          matchesOutcome ||
          matchesAudience ||
          matchesCategory ||
          matchesKeywords ||
          matchesTools
        );
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "popular") {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      if (sortBy === "beginner") {
        if (a.difficulty === "Beginner" && b.difficulty !== "Beginner") return -1;
        if (b.difficulty === "Beginner" && a.difficulty !== "Beginner") return 1;
        return 0;
      }
      if (sortBy === "time") {
        return a.estimatedTime.localeCompare(b.estimatedTime);
      }
      if (sortBy === "recent") {
        return (b.title || "").localeCompare(a.title || "");
      }
      return 0;
    });
  }, [ideas, selectedCategory, difficulty, budget, searchQuery, sortBy]);

  const featuredIdea = useMemo(() => {
    return ideas.find((i) => i.featured) || ideas[0];
  }, [ideas]);

  const hasActiveFilters =
    selectedCategory !== "ALL" ||
    difficulty !== "ALL" ||
    budget !== "ALL" ||
    searchQuery.trim() !== "";

  const handleResetFilters = () => {
    setSelectedCategory("ALL");
    setDifficulty("ALL");
    setBudget("ALL");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      {/* Hero Section */}
      <ImplementIdeasHero
        totalIdeas={ideas.length}
        totalCollections={totalCollections}
        totalTools={totalTools}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Discovery Filter Controls */}
        <IdeaFilterBar
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          budget={budget}
          setBudget={setBudget}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalFiltered={filteredIdeas.length}
          onReset={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Featured Idea Spotlight (Shown when no search/category filter active) */}
        {!hasActiveFilters && featuredIdea && (
          <FeaturedIdeaCard idea={featuredIdea} />
        )}

        {/* Results Grid */}
        {filteredIdeas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea.slug}
                idea={idea}
                progressPercent={userProgressMap[idea.slug]}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500">
              <SearchX size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No matching blueprints found</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              We couldn&apos;t find an execution blueprint matching your search criteria. Try loosening your filters or searching for terms like &quot;YouTube&quot;, &quot;SaaS&quot;, or &quot;Freelance&quot;.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
