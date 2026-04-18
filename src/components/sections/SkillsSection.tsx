"use client";

import { motion } from "framer-motion";
import GlassGlare from "@/components/ui/GlassGlare";
import GlassCard from "@/components/ui/GlassCard";
import { sectionVariants, childVariants } from "@/utils/animations";


// ─── Marquee ticker (keeps the dynamic feel at the top) ────────────────────
const tickerRow1 = ["Java", "Spring Boot", "REST APIs", "Microservices", "MySQL", "JWT Auth", "Next.js", "Unity", "C#", "Git", "RBAC", "Postman"];
const tickerRow2 = ["Backend Dev", "VR Engineering", "System Design", "RBAC", "API Architecture", "Desktop Apps", "Real-time Rendering", "Open Source", "Spring Security", "Java Swing"];

function Ticker({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={reverse ? { x: ["-33.33%", "0%"] } : { x: ["0%", "-33.33%"] }}
        transition={{ duration: reverse ? 18 : 14, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-5 text-[11px] font-mono uppercase tracking-[0.3em] text-gray-600 hover:text-gray-300 transition-colors cursor-default">
            {item}
            <span className="inline-block w-1 h-1 rounded-none bg-white/20 flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Bento grid card data ──────────────────────────────────────────────────
const bentoItems = [
  {
    id: "java",
    label: "Primary Language",
    name: "Java",
    level: "Expert",
    desc: "Core language for all backend systems, REST APIs, and enterprise patterns.",
    color: "#10b981", // Emerald
    span: "col-span-2 row-span-2", // large hero card
    textSize: "text-4xl md:text-6xl",
    detail: true,
  },
  {
    id: "springboot",
    label: "Framework",
    name: "Spring Boot",
    level: "Advanced",
    desc: "Full application framework for building production-ready microservices.",
    color: "#ffffff", 
    span: "col-span-1 row-span-1",
    textSize: "text-xl md:text-2xl",
    detail: false,
  },
  {
    id: "mysql",
    label: "Database",
    name: "MySQL",
    level: "Advanced",
    desc: "Relational database design, complex queries, and schema optimization.",
    color: "#10b981", 
    span: "col-span-1 row-span-1",
    textSize: "text-xl md:text-2xl",
    detail: false,
  },
  {
    id: "jwt",
    label: "Security",
    name: "JWT Auth",
    level: "Advanced",
    desc: "Stateless authentication, RBAC, and secure API gateway patterns.",
    color: "#ffffff", 
    span: "col-span-1 row-span-1",
    textSize: "text-lg md:text-xl",
    detail: false,
  },
  {
    id: "apis",
    label: "Architecture",
    name: "REST APIs",
    level: "Advanced",
    desc: "Design-first API development with versioning and documentation.",
    color: "#10b981", 
    span: "col-span-1 row-span-1",
    textSize: "text-lg md:text-xl",
    detail: false,
  },
  {
    id: "unity",
    label: "VR / 3D",
    name: "Unity + C#",
    level: "Intermediate",
    desc: "Immersive first-person VR mechanics with real-time rendering in Unity.",
    color: "#ffffff", 
    span: "col-span-2 row-span-1",
    textSize: "text-2xl md:text-3xl",
    detail: false,
  },
  {
    id: "tools",
    label: "Ecosystem",
    name: "Git · Next.js · Postman",
    level: "Advanced",
    desc: "",
    color: "#10b981", 
    span: "col-span-2 row-span-1",
    textSize: "text-lg md:text-xl",
    detail: false,
  },
];

function BentoCard({ item, index }: { item: typeof bentoItems[0]; index: number }) {
  return (
    <motion.div variants={childVariants} className={item.span}>
      <GlassCard
        glowColor={item.color}
        rounded="rounded-none"
        className="h-full group border-white/5"
      >
        {/* Base color tint */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${item.color === '#ffffff' ? 'rgba(255,255,255,0.03)' : 'rgba(16,185,129,0.05)'} 0%, rgba(8,8,8,0) 100%)`,
          }}
        />

        {/* Animated glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, ${item.color}10, transparent 70%)`,
          }}
        />

        <div className="relative p-6 h-full flex flex-col justify-between z-10" style={{ minHeight: "220px" }}>
          {/* Top: label + dot */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`w-1.5 h-1.5 ${item.color === '#ffffff' ? 'bg-white' : 'bg-primary'}`}
              style={{ boxShadow: `0 0 6px ${item.color}` }}
            />
            <span
              className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/30"
            >
              {item.label}
            </span>
          </div>

          {/* Skill name */}
          <div className="flex-1 flex flex-col justify-end">
            <div
              className={`${item.textSize} font-outfit font-black tracking-tight leading-[0.95] mb-3 transition-colors duration-300 uppercase`}
              style={{ color: item.color }}
            >
              {item.name}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest px-2 py-0.5 border border-white/5 rounded-none">{item.level}</span>
              </div>
              {item.desc && (
                <p className="text-[11px] text-white/40 leading-relaxed line-clamp-2 group-hover:text-white/60 transition-colors duration-300 font-inter">
                  {item.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <motion.section
      className="relative py-24 overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >

      {/* ── Marquee bands — slide up as section enters ─────────────── */}
      <motion.div
        variants={childVariants}
        className="mb-16 border-y border-white/5 py-4 space-y-2 opacity-50"
      >
        <Ticker items={tickerRow1} />
        <Ticker items={tickerRow2} reverse />
      </motion.div>

      {/* ── Sticky split layout ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

        {/* LEFT: sticky heading */}
        <div className="lg:w-[35%] lg:sticky lg:top-28 shrink-0">
          <motion.div variants={childVariants}>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-4">
              02 / TECHNICAL
            </p>
            <h2 className="text-5xl md:text-7xl font-deltha text-white tracking-tight leading-[0.85] mb-6 uppercase">
              Core<br />Arsenal
            </h2>
            <div className="h-[1px] w-24 bg-primary mb-8" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Technologies I deploy with confidence. Backend-first, with a creative
              layer in VR and immersive systems.
            </p>
            {/* Stat pills — staggered individually */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Languages", val: "3" },
                { label: "Frameworks", val: "4" },
                { label: "Years Exp", val: "2+" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={childVariants}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-none bg-white/5 border border-white/10 text-xs font-mono"
                >
                  <span className="text-white font-bold">{s.val}</span>
                  <span className="text-gray-500">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Bento grid — no parallax wrapper, entrance stagger is the ONE motion */}
        <div className="lg:w-[65%]">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-auto gap-3">
            {bentoItems.map((item, i) => (
              <BentoCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}
