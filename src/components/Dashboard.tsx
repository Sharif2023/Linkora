"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Search, Bell, Folder, Globe } from "lucide-react";
import MetricCard from "./MetricCard";
import Link from "next/link";
import { Link2 } from "@/components/CategoryIcons";

const tabs = [
  { id: "collections", label: "My Collections", icon: Folder },
  { id: "links", label: "Links Directory", icon: Globe },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

import { linkCollections, CATEGORIES } from "@/data/links";

const topCategories = CATEGORIES.slice(1, 5).map((cat, idx) => ({
  name: cat.label.replace(/^[^\s]+\s+/, ""),
  count: linkCollections.filter(l => l.category === cat.id).length,
  access: idx === 1 ? "Private" : "Public",
  date: "Today",
  color: ["#3b82f6", "#a855f7", "#0ea5e9", "#27c93f"][idx % 4]
}));

const topLinks = linkCollections.slice(0, 4).map(link => ({
  name: link.title,
  url: link.url,
  category: CATEGORIES.find(c => c.id === link.category)?.label.replace(/^[^\s]+\s+/, "") || link.category,
  color: "#27c93f"
}));

const tabContent = {
  collections: (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Link Collections</h3>
      <div className="grid grid-cols-2 gap-4">
        {topCategories.map((col, i) => (
          <Link href="/collections" key={col.name} className="block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3, borderColor: col.color }}
              className="bg-[#111] border border-[#333] rounded-lg p-5 cursor-pointer transition-all hover:bg-white/[0.02]"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="font-semibold text-base truncate pr-2" title={col.name}>{col.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#888] uppercase font-bold tracking-wider shrink-0">
                  {col.access}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#888]">
                <span>{col.count} active links</span>
                <span>Updated {col.date}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  ),
  links: (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">AI Tools & Essential Links</h3>
      <div className="space-y-3">
        {topLinks.map((link, i) => (
          <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name} className="block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4, borderColor: "rgba(59,130,246,0.4)" }}
              className="flex items-center justify-between bg-[#111] border border-[#333] rounded-lg p-4 cursor-pointer transition-all hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 overflow-hidden pr-2">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: link.color }} />
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{link.name}</div>
                  <div className="text-xs text-[#555] font-mono truncate">{link.url}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm shrink-0">
                <span className="text-[#888] text-xs bg-white/5 px-2 py-1 rounded max-w-[120px] truncate">{link.category}</span>
              </div>
            </motion.div>
          </a>
        ))}
      </div>
    </div>
  ),
  analytics: (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Access Analytics</h3>
      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Total Saved Links" value={`${linkCollections.length}`} />
        <MetricCard label="Weekly Click-throughs" value="420" />
        <MetricCard label="Avg Response Time" value="142ms" valueColor="text-[#3b82f6]" />
      </div>
      <div className="w-full h-40 bg-[#111] border border-[#333] rounded-lg flex items-end justify-between p-4 gap-1.5">
        {[65, 40, 85, 55, 90, 45, 70, 80, 60, 75, 50, 88, 42, 95, 38, 72, 58, 83, 67, 91, 48, 76, 62, 87].map(
          (h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="flex-1 bg-gradient-to-t from-[#3b82f6]/20 to-[#3b82f6]/80 rounded-t-sm opacity-70 cursor-pointer"
            />
          )
        )}
      </div>
    </div>
  ),
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("collections");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full min-h-[580px] md:h-[580px] bg-[#050505] border border-[#333] rounded-xl shadow-[0_0_80px_rgba(59,130,246,0.12)] flex flex-col md:flex-row overflow-hidden"
    >
      {/* Sidebar */}
      <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-[#1a1a1a] bg-[#0a0a0a] flex flex-col shrink-0">
        <div className="p-5 border-b border-[#1a1a1a] flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="text-[#3b82f6]">
              <Link2 size="18" />
            </div>
            <span className="font-bold text-sm tracking-wide">Workspace</span>
          </div>
        </div>

        <div className="p-3 flex-none md:flex-1 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-2 md:gap-1 scrollbar-hide">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="relative shrink-0 md:w-full flex items-center gap-3 px-4 md:px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all duration-200 text-[#888] hover:text-white hover:bg-white/5 whitespace-nowrap"
            >
              {activeTab === id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={15} />
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-14 border-b border-[#1a1a1a] flex items-center justify-between px-6 shrink-0 bg-[#0a0a0a]/40">
          <div className="flex items-center gap-2 text-[#888] bg-[#111] px-3 py-1.5 rounded-md border border-[#222] w-56">
            <Search size={13} />
            <span className="text-xs">Search collections...</span>
          </div>
        </div>

        {/* Tab content with AnimatePresence */}
        <div className="flex-1 p-7 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {tabContent[activeTab as keyof typeof tabContent]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
