"use client";

import { motion } from "framer-motion";

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
          <span className="font-extrabold text-xl tracking-tight text-white">Linkora</span>
          <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-[#888] uppercase tracking-wider">
            Intelligence
          </span>
        </div>

        {/* <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#888]">
          {["Platform", "Docs", "Pricing", "Blog"].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4 decoration-white/30"
            >
              {link}
            </a>
          ))}
        </nav> */}

        <div className="flex items-center gap-4">
          <a href="#" className="text-sm font-medium text-[#888] hover:text-white transition-colors hidden md:block">
            Sign in
          </a>
          <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 active:scale-95 transition-all duration-150">
            Get Access →
          </button>
        </div>
      </div>
    </motion.header>
  );
}
