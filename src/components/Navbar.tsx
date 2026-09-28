"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Link2 } from "@/components/CategoryIcons";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-white group-hover:text-emerald-500 transform transition-all duration-300 group-hover:rotate-180">
              <Link2 size="24" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">Linkora</span>
            <span className="px-2 py-1 rounded bg-zinc-800 text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Workspace
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/stacks" className="text-zinc-400 hover:text-white font-semibold text-sm transition-colors hidden md:block">
            Curated Stacks
          </Link>
          <Link href="/explore">
            <button className="bg-emerald-500 text-white px-5 py-2.5 rounded-full text-base font-bold hover:bg-emerald-400 active:scale-95 transition-all duration-150">
              Explore →
            </button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
