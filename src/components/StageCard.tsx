"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StageCardProps {
  stageNum: string;
  labelColor: "cyan" | "purple" | "blue";
  title: string;
  description: string;
  visual: ReactNode;
  direction?: "normal" | "reverse";
}

const labelStyles = {
  cyan: "bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/20",
  purple: "bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20",
  blue: "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20",
};

const borderHoverStyles = {
  cyan: "hover:border-[#0ea5e9]/50",
  purple: "hover:border-[#a855f7]/50",
  blue: "hover:border-[#3b82f6]/50",
};

export default function StageCard({
  stageNum,
  labelColor,
  title,
  description,
  visual,
  direction = "normal",
}: StageCardProps) {
  const isReversed = direction === "reverse";

  return (
    <motion.div
      initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col items-center justify-between mb-24 md:mb-48 relative z-10 gap-8 md:gap-16 md:flex-row ${isReversed ? "md:flex-row-reverse" : ""}`}
    >
      <div className="flex-1 w-full max-w-xl text-center md:text-left">
        <div className={`inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 ${labelStyles[labelColor]}`}>
          {stageNum}
        </div>
        <h2 className="text-4xl font-bold mb-4 tracking-tight">{title}</h2>
        <p className="text-[#888] leading-relaxed text-lg">{description}</p>
      </div>

      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`flex-1 w-full bg-[#0a0a0a] border border-[#333] rounded-2xl h-[350px] flex flex-col overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-colors duration-500 ${borderHoverStyles[labelColor]}`}
      >
        {visual}
      </motion.div>
    </motion.div>
  );
}
