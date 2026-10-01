"use client";

import { motion } from "framer-motion";
import { Zap, FileText, BrainCircuit } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Link2 } from "@/components/CategoryIcons";
import Navbar from "@/components/Navbar";

const ThreeVisual = dynamic(() => import("@/components/ThreeVisual"), { ssr: false });

import { linkCollections, CATEGORIES } from "@/data/links";
import { IMPLEMENTATION_IDEAS, CURATED_COLLECTIONS } from "@/data/implement-ideas-data";

const heroStats = [
  { value: `${IMPLEMENTATION_IDEAS.length}`, label: "Idea Stacks" },
  { value: `${linkCollections.length}`, label: "Curated Tools" },
  { value: `${CATEGORIES.length - 1}`, label: "Smart Categories" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      <Navbar />
      <section className="min-h-[88vh] flex flex-col items-center justify-center text-center relative z-10 px-8 pt-36 sm:pt-40 pb-20">
        {/* Three.js background */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <ThreeVisual />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 bg-zinc-900 border border-zinc-800 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-bold mb-16 sm:mb-20 text-emerald-500"
        >
          ● Grouped Idea Stacks & Actionable Blueprints
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 text-[clamp(2.4rem,5.2vw,4.5rem)] font-extrabold tracking-tight leading-[1.15] max-w-4xl mb-6 pointer-events-none"
        >
          <span className="block">Turn Great Ideas into Reality</span>
          <span className="text-emerald-500 block mt-2 sm:mt-3">
            with Curated Stacks
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-xl text-zinc-400 max-w-xl leading-relaxed mb-8 pointer-events-none"
        >
          Linkora groups high-impact ideas with the exact tools, blueprints, and roadmaps you need to build and launch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0"
        >
          <Link href="/implement-ideas" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-emerald-500 text-white px-10 py-4 rounded-full text-base font-bold hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20">
              Explore Idea Stacks →
            </button>
          </Link>
          <Link href="/explore" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto border border-zinc-800 text-zinc-300 px-10 py-4 rounded-full text-base font-bold hover:bg-zinc-900 active:scale-95 transition-all">
              Browse Tool Directory
            </button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 grid grid-cols-2 md:flex md:gap-10 gap-x-8 gap-y-8 mt-16 pt-8 border-t border-white/10"
        >
          {heroStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
              <div className="text-[11px] md:text-xs text-[#888] mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── 2. Value Proposition & Step-by-Step ─────────────────────────── */}
      <section className="py-32 px-6 md:px-8 relative z-10 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Stop hoarding bookmarks. <br className="hidden md:block" />
              <span className="text-emerald-500">Start executing idea stacks.</span>
            </h2>
            <p className="text-zinc-400 text-xl leading-relaxed">
              Linkora isn&apos;t another generic AI directory. It&apos;s a curated launchpad grouping the exact tools, architectures, and execution roadmaps you need to build and ship your ideas.
            </p>
          </motion.div>

          {/* 3 Step Dynamic Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-zinc-900 via-emerald-500/30 to-zinc-900 z-0" />

            {[
              {
                step: "01",
                title: "Choose an Idea Stack",
                desc: "Explore blueprints organized by outcome—launching a Micro-SaaS, building a creator channel, or starting a modern agency."
              },
              {
                step: "02",
                title: "Get the Vetted Stack",
                desc: "Every idea is paired with a handpicked cluster of complementary tools with verified pricing, free tiers, and zero fluff."
              },
              {
                step: "03",
                title: "Execute the Roadmap",
                desc: "Follow phase-by-phase action plans with milestones, time estimates, and step-by-step tasks to bring the idea to life."
              }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative z-10 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 hover:border-emerald-500/50 hover:bg-zinc-900/80 transition-all duration-300 group shadow-lg"
              >
                <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-xl font-black text-zinc-500 mb-8 group-hover:text-emerald-500 group-hover:border-emerald-500/50 group-hover:scale-110 transition-all duration-300 shadow-inner">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Premium Features Grid ──────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-8 bg-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Feature 1: Large Banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-10 md:p-14 md:col-span-2 overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-emerald-500/20 transition-all duration-700" />
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950 border border-zinc-800 text-sm font-bold text-zinc-400 mb-8">
                  <BrainCircuit size={16} className="text-emerald-500" /> Complete Idea Blueprints
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Everything your idea needs, organized in one place</h3>
                <p className="text-zinc-400 text-xl mb-10 leading-relaxed">
                  Every idea is backed by phased action plans, vetted tech stacks, difficulty ratings, and progress tracking. Whether building a Micro-SaaS, launching an audience newsletter, or scaling a creator channel, Linkora gives you the exact blueprint.
                </p>
                <Link href="/implement-ideas">
                  <button className="bg-emerald-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20">
                    Explore Implement Ideas →
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Feature 2: Small Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] p-10 overflow-hidden relative group"
            >
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-500 mb-6">
                  <Zap size={24} />
                </div>
                <h4 className="text-2xl font-bold mb-4">Lightning Fast Search</h4>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Find exactly what you need in milliseconds. Our streamlined architecture guarantees instant filtering and layout transitions.
                </p>
              </div>
            </motion.div>

            {/* Feature 3: Small Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] p-10 overflow-hidden relative group"
            >
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-500 mb-6">
                  <FileText size={24} />
                </div>
                <h4 className="text-2xl font-bold mb-4">Pricing Transparency</h4>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Every tool explicitly declares its pricing model and whether it has a real free tier. No more gated surprises.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 4. Footer ───────────────────────────── */}
      <footer className="border-t border-zinc-900 py-12 text-center w-full bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-center gap-2 mb-8">
            <Link2 size="24" className="text-emerald-500" />
            <h2 className="text-2xl font-extrabold tracking-tight">Linkora</h2>
          </div>

          <p className="text-sm text-zinc-500 font-mono mb-4">
            &copy; {new Date().getFullYear()} Linkora - Intelligence Workspace. All links indexed securely.
          </p>

          <p className="text-sm text-zinc-500 font-mono">
            Designed & Built by{" "}
            <a
              href="https://si-sharif.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400 font-bold transition-colors"
            >
              Shariful Islam
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
