"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Copy, Check, ArrowLeft, Bookmark, Filter, RefreshCw, ChevronDown, ListFilter, Video, BookOpen, BarChart2, Shield, Utensils, Gamepad2, Wrench, HeartHandshake, Archive, Globe } from "lucide-react";
import Link from "next/link";
import { linkCollections, CATEGORIES, LinkItem } from "@/data/links";
import { Robot, Pc, PaintPalette, AnimatedImages, ImageAi, VideoAi, MusicAi } from "@/components/CategoryIcons";

const getCategoryIcon = (id: string, isSelected: boolean) => {
  const colorClass = isSelected ? "text-black" : "text-[#555] group-hover:text-white";
  switch(id) {
    case 'ai-assistants-research': return <div className={`shrink-0 ${colorClass}`}><Robot size="15" /></div>;
    case 'ai-coding-builders': return <div className={`shrink-0 ${colorClass}`}><Pc size="15" /></div>;
    case 'ui-design-frontend': return <div className={`shrink-0 ${colorClass}`}><PaintPalette size="15" /></div>;
    case 'animation-motion': return <div className={`shrink-0 ${colorClass}`}><AnimatedImages size="15" /></div>;
    case 'ai-image-generation': return <div className={`shrink-0 ${colorClass}`}><ImageAi size="15" /></div>;
    case 'ai-video-avatar': return <div className={`shrink-0 ${colorClass}`}><VideoAi size="15" /></div>;
    case 'music-audio': return <div className={`shrink-0 ${colorClass}`}><MusicAi size="15" /></div>;
    case 'video-screen-recording': return <div className={`shrink-0 ${colorClass}`}><Video size={15} /></div>;
    case 'learning-dev-resources': return <div className={`shrink-0 ${colorClass}`}><BookOpen size={15} /></div>;
    case 'productivity-marketing-business': return <div className={`shrink-0 ${colorClass}`}><BarChart2 size={15} /></div>;
    case 'website-security-utilities': return <div className={`shrink-0 ${colorClass}`}><Shield size={15} /></div>;
    case 'food-everyday-utilities': return <div className={`shrink-0 ${colorClass}`}><Utensils size={15} /></div>;
    case 'games-entertainment': return <div className={`shrink-0 ${colorClass}`}><Gamepad2 size={15} /></div>;
    case 'testing-dev-utilities': return <div className={`shrink-0 ${colorClass}`}><Wrench size={15} /></div>;
    case 'ai-companions': return <div className={`shrink-0 ${colorClass}`}><HeartHandshake size={15} /></div>;
    case 'miscellaneous-tools': return <div className={`shrink-0 ${colorClass}`}><Archive size={15} /></div>;
    case 'all': return <div className={`shrink-0 ${colorClass}`}><Globe size={15} /></div>;
    default: return null;
  }
};

const cleanLabel = (id: string, label: string) => {
  if (id === "all") return label;
  return label.replace(/^[^\s]+\s+/, "");
};

export default function CollectionsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(true);
    const t = setTimeout(() => setIsFiltering(false), 350);
    return () => clearTimeout(t);
  }, [selectedCategory]);

  // Copy to clipboard helper
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 1500);
  };

  // Reset all filters
  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  // Dynamically calculate counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: linkCollections.length };
    linkCollections.forEach((link) => {
      counts[link.category] = (counts[link.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered and searched links
  const filteredLinks = useMemo(() => {
    return linkCollections.filter((link) => {
      const matchesCategory = selectedCategory === "all" || link.category === selectedCategory;
      const matchesSearch =
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (link.banglaDescription && link.banglaDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
        link.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Selected category label helper
  const activeCategoryLabel = useMemo(() => {
    const cat = CATEGORIES.find((c) => c.id === selectedCategory);
    return cat ? cat.label : "All Links";
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 selection:text-white">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-semibold text-[#888] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/5"
            >
              <ArrowLeft size={13} />
              Back Home
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">Linkora</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-[#888] uppercase tracking-wider">
                Directory
              </span>
            </div>
          </div>
          <div className="text-xs text-[#888] font-mono hidden sm:block">
            {linkCollections.length} Curated Connections
          </div>
        </div>
      </header>

      {/* Main Directory Body */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Title Section */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Curated Tools & <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Important Web Resources
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[#888] max-w-2xl text-base sm:text-lg leading-relaxed"
          >
            A high-performance interactive repository cataloging the most powerful AI platforms, UI frameworks, development utilities, and productivity bookmarks.
          </motion.p>
        </div>

        {/* Layout Row: Sidebar + Main Content Grid */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* 1. Sidebar - Desktop Only */}
          <aside className="w-80 shrink-0 hidden md:block h-[calc(100vh-12rem)] overflow-y-auto sticky top-24 pr-4 border-r border-white/5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#555] uppercase tracking-wider mb-5">
              <Filter size={13} />
              <span>Categories ({CATEGORIES.length - 1})</span>
            </div>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchQuery("");
                    }}
                    className={`flex items-center justify-between text-left text-xs px-3.5 py-3 rounded-lg font-medium transition-all group ${
                      isSelected
                        ? "bg-white text-black font-bold shadow-md shadow-white/5"
                        : "text-[#888] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {getCategoryIcon(cat.id, isSelected)}
                      <span className="truncate pr-2">{cleanLabel(cat.id, cat.label)}</span>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected 
                        ? "bg-black/10 text-black font-bold" 
                        : "bg-white/5 text-[#555] group-hover:bg-white/10 group-hover:text-[#888]"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* 2. Mobile Category Selector */}
          <div className="md:hidden w-full flex flex-col gap-3 mb-6 relative">
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className="w-full flex items-center justify-between bg-[#0a0a0a] border border-[#222] rounded-xl px-4 py-3.5 text-sm font-medium text-white hover:border-[#333]"
            >
              <div className="flex items-center gap-2">
                <ListFilter size={16} className="text-blue-400" />
                <span>{cleanLabel(selectedCategory, activeCategoryLabel)} ({categoryCounts[selectedCategory] || 0})</span>
              </div>
              <ChevronDown size={16} className={`text-[#888] transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {mobileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-full mt-2 bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden shadow-2xl z-50 max-h-80 overflow-y-auto"
                >
                  {CATEGORIES.map((cat) => {
                    const count = categoryCounts[cat.id] || 0;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSearchQuery("");
                          setMobileDropdownOpen(false);
                        }}
                        className={`group w-full flex items-center justify-between text-left text-xs px-4 py-3 border-b border-white/5 last:border-b-0 ${
                          isSelected ? "bg-white text-black font-bold" : "text-[#888] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          {getCategoryIcon(cat.id, isSelected)}
                          <span className="truncate">{cleanLabel(cat.id, cat.label)}</span>
                        </div>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${isSelected ? "bg-black/10 text-black" : "bg-white/5 text-[#555]"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile horizontal scrolling shortcut pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSearchQuery("");
                  }}
                  className={`text-[10px] shrink-0 px-3 py-1.5 rounded-full font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-blue-500 text-white font-bold"
                      : "bg-[#0a0a0a] border border-[#222] text-[#888]"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(cat.id, selectedCategory === cat.id)}
                    <span>{cleanLabel(cat.id, cat.label).split(" ")[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Main Link List Area */}
          <div className="flex-1 min-w-0">
            
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search across ${cleanLabel(selectedCategory, activeCategoryLabel)}...`}
                className="w-full bg-[#0a0a0a] border border-[#222] focus:border-[#3b82f6]/50 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium placeholder-[#555] focus:outline-none transition-all"
              />
            </div>

            {/* Meta Row */}
            <div className="flex justify-between items-center mb-6 text-xs text-[#888] font-mono">
              <div>
                Showing {filteredLinks.length} of {categoryCounts[selectedCategory] || 0} links
              </div>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <RefreshCw size={12} />
                  Reset all filters
                </button>
              )}
            </div>

            {/* Links Grid */}
            <div className="relative min-h-[400px]">
              <AnimatePresence>
                {isFiltering && (
                  <motion.div
                    key="loader-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex flex-col items-center pt-32 text-[#555] bg-black/60 backdrop-blur-sm rounded-2xl"
                  >
                    <RefreshCw className="animate-spin mb-4 text-[#3b82f6]" size={28} />
                    <span className="text-sm font-medium tracking-wide">Syncing resources...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredLinks.map((link: LinkItem, index: number) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index < 15 ? index * 0.04 : 0 }}
                      key={`${link.category}-${link.url}`}
                      className="group bg-[#060606] border border-[#222] hover:border-blue-500/40 rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.06)] relative overflow-hidden"
                    >
                      {/* Top ambient border decorator */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent group-hover:via-blue-500/40 transition-all duration-500" />
                      
                      {/* Top Info */}
                      <div>
                        <div className="flex justify-between items-start mb-3.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-[#888] group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors duration-300 shrink-0">
                              <Bookmark size={14} />
                            </div>
                            <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors duration-200 truncate">
                              {link.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-xs text-[#888] leading-relaxed mb-4 min-h-[36px]">
                          {link.description}
                        </p>

                        {/* Bengali Translation Block */}
                        {link.banglaDescription && (
                          <div className="mt-3.5 p-3 rounded-lg bg-[#0e0e0e] border border-white/5 text-xs text-blue-400/80 leading-relaxed font-medium">
                            <span className="text-[9px] text-[#555] uppercase tracking-wider block mb-1 font-bold">বিবরণ / Notes:</span>
                            {link.banglaDescription}
                          </div>
                        )}
                      </div>

                      {/* Footer & Actions */}
                      <div className="mt-6 pt-4 border-t border-white/5">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {link.tags.map((tag) => (
                            <span key={tag} className="text-[9px] bg-[#111] border border-[#222] text-[#555] px-2 py-0.5 rounded-md">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Button Links */}
                        <div className="flex gap-2">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-white/5 text-white hover:bg-white/10 hover:text-blue-400 border border-white/5 active:scale-[0.98] transition-all rounded-lg py-2.5 text-xs font-bold"
                          >
                            Visit Website
                            <ExternalLink size={12} />
                          </a>
                          
                          <button
                            onClick={() => handleCopy(link.url)}
                            className="px-3 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/5 active:scale-95 transition-all flex items-center justify-center"
                            title="Copy Website URL"
                          >
                            {copiedUrl === link.url ? (
                              <Check size={14} className="text-green-400" />
                            ) : (
                              <Copy size={14} className="text-[#888] hover:text-white transition-colors" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty Search Result State */}
              {!isFiltering && filteredLinks.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24 border border-dashed border-[#222] rounded-2xl bg-[#030303]"
                >
                  <div className="max-w-xs mx-auto text-[#555]">
                    <Search size={36} className="mx-auto mb-4 opacity-50" />
                    <h3 className="font-bold text-white mb-2">No links found</h3>
                    <p className="text-xs leading-relaxed mb-6">
                      No bookmarks matched your search parameters. Try changing your search query or category filters.
                    </p>
                    <button
                      onClick={handleReset}
                      className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#111] py-8 text-center text-xs text-[#555] font-mono relative z-10 bg-black mt-24">
        <p>&copy; {new Date().getFullYear()} Linkora - Intelligence Workspace. All links indexed securely.</p>
        <p className="mt-2">Designed & Built by <a href="https://si-sharif.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 border-b border-blue-400/30 hover:border-blue-400 font-bold pb-0.5 transition-all">Shariful Islam</a></p>
      </footer>
    </div>
  );
}
