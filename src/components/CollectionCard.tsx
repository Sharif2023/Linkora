"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, Wrench, ArrowRight, Sparkles } from "lucide-react";
import { CuratedCollectionData } from "@/types/implement-ideas";

interface CollectionCardProps {
  collection: CuratedCollectionData;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const totalIdeas = collection.items.filter((item) => item.ideaSlug).length;
  const totalTools = collection.items.filter((item) => item.resourceName).length;

  return (
    <Link href={`/collections/${collection.slug}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 rounded-3xl p-7 h-full flex flex-col justify-between transition-all duration-300 group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)] group-hover:bg-zinc-900/90 relative overflow-hidden"
      >
        {/* Top hover highlight */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700/80">
              {collection.category || "Curated"}
            </span>

            {collection.featured && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles size={11} /> Featured
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-snug">
            {collection.title}
          </h3>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
            {collection.description}
          </p>

          <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-400 mb-6">
            <div className="flex items-center gap-1.5 font-medium">
              <Layers size={14} className="text-emerald-400 shrink-0" />
              <span>{totalIdeas} Blueprint{totalIdeas !== 1 ? "s" : ""}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-1.5 font-medium">
              <Wrench size={14} className="text-teal-400 shrink-0" />
              <span>{totalTools} Tool{totalTools !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 pt-2 border-t border-zinc-800/60">
          <span>Explore collection</span>
          <ArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
}
