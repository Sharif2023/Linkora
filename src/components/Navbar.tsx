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
      className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-white group-hover:text-[#3b82f6] transition-colors">
              <Link2 size="20" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">Linkora</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-[#888] uppercase tracking-wider">
              Intelligence
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/collections">
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 active:scale-95 transition-all duration-150">
              Explore →
            </button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
