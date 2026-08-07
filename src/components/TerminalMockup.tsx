"use client";

import { motion } from "framer-motion";

interface TerminalLine {
  time: string;
  text: string;
  color?: string;
  blink?: boolean;
}

interface TerminalMockupProps {
  lines: TerminalLine[];
}

export default function TerminalMockup({ lines }: TerminalMockupProps) {
  return (
    <>
      <div className="bg-[#111] px-4 py-3 border-b border-[#333] flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-[#555] text-xs font-mono">linkora-ingest — terminal</span>
      </div>
      <div className="p-6 font-mono text-sm text-[#a8cc8c] flex flex-col gap-3 flex-1">
        {lines.map((line, i) =>
          line.blink ? (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              className="flex gap-4"
            >
              <span className="text-[#555] shrink-0">{line.time}</span>
              <span style={{ color: line.color ?? "#a8cc8c" }}>{line.text}</span>
            </motion.div>
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="flex gap-4"
            >
              <span className="text-[#555] shrink-0">{line.time}</span>
              <span style={{ color: line.color ?? "#a8cc8c" }}>{line.text}</span>
            </motion.div>
          )
        )}
      </div>
    </>
  );
}
