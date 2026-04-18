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
            <span className="inline-block w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
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
    color: "#8b5cf6",
    span: "col-span-2 row-span-2", // large hero card
    textSize: "text-5xl md:text-7xl",
    detail: true,
  },
  {
    id: "springboot",
    label: "Framework",
    name: "Spring Boot",
    level: "Advanced",
    desc: "Full application framework for building production-ready microservices.",
    color: "#06b6d4",
    span: "col-span-1 row-span-1",
    textSize: "text-3xl md:text-4xl",
    detail: false,
  },
  {
    id: "mysql",
    label: "Database",
    name: "MySQL",
    level: "Advanced",
    desc: "Relational database design, complex queries, and schema optimization.",
    color: "#f59e0b",
    span: "col-span-1 row-span-1",
    textSize: "text-3xl md:text-4xl",
    detail: false,
  },
  {
    id: "jwt",
    label: "Security",
    name: "JWT Auth",
    level: "Advanced",
    desc: "Stateless authentication, RBAC, and secure API gateway patterns.",
    color: "#ec4899",
    span: "col-span-1 row-span-1",
    textSize: "text-2xl md:text-3xl",
    detail: false,
  },
  {
    id: "apis",
    label: "Architecture",
    name: "REST APIs",
    level: "Advanced",
    desc: "Design-first API development with versioning and documentation.",
    color: "#8b5cf6",
    span: "col-span-1 row-span-1",
    textSize: "text-2xl md:text-3xl",
    detail: false,
  },
  {
    id: "unity",
    label: "VR / 3D",
    name: "Unity + C#",
    level: "Intermediate",
    desc: "Immersive first-person VR mechanics with real-time rendering in Unity.",
    color: "#f59e0b",
    span: "col-span-2 row-span-1",
    textSize: "text-3xl md:text-4xl",
    detail: false,
  },
  {
    id: "tools",
    label: "Ecosystem",
    name: "Git · Next.js · Postman",
    level: "Advanced",
    desc: "",
    color: "#06b6d4",
    span: "col-span-2 row-span-1",
    textSize: "text-xl md:text-2xl",
    detail: false,
  },
];

function BentoCard({ item, index }: { item: typeof bentoItems[0]; index: number }) {
  return (
    <motion.div variants={childVariants} className={item.span}>
      <GlassCard
        glowColor={item.color}
        rounded="rounded-2xl"
        className="h-full group"
      >
        {/* Base color tint */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${item.color}12 0%, rgba(8,8,20,0.4) 100%)`,
          }}
        />

        {/* Animated glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, ${item.color}18, transparent 70%)`,
          }}
        />

        <GlassGlare />

        <div className="relative p-6 h-full flex flex-col justify-between z-10" style={{ minHeight: item.id === "java" ? "280px" : "130px" }}>
          {/* Top: label + dot */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
            />
            <span
              className="text-[10px] font-mono uppercase tracking-[0.3em]"
              style={{ color: `${item.color}cc` }}
            >
              {item.label}
            </span>
          </div>

          {/* Skill name */}
          <div className="flex-1 flex items-end">
            <div>
              <div
                className={`${item.textSize} font-black tracking-tight leading-none mb-1 transition-colors duration-300`}
                style={{ color: item.id === "java" ? item.color : "white" }}
              >
                {item.name}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-gray-500">{item.level}</span>
                {item.detail && item.desc && (
                  <p className="hidden md:block text-xs text-gray-500 max-w-[200px] leading-relaxed mt-1">
                    {item.desc}
                  </p>
                )}
              </div>
              {!item.detail && item.desc && (
                <p className="text-xs text-gray-600 mt-2 leading-relaxed line-clamp-2 group-hover:text-gray-400 transition-colors duration-300">
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
        className="mb-16 border-y border-white/5 py-px space-y-px"
      >
        <Ticker items={tickerRow1} />
        <Ticker items={tickerRow2} reverse />
      </motion.div>

      {/* ── Sticky split layout ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

        {/* LEFT: sticky heading */}
        <div className="lg:w-[35%] lg:sticky lg:top-28 shrink-0">
          <motion.div variants={childVariants}>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em] mb-4">
              02. Technical
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-secondary via-white to-primary bg-[length:200%_auto] animate-gradient tracking-tighter leading-none mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              CORE<br />ARSENAL
            </h2>
            <div className="h-px w-16 bg-gradient-to-r from-secondary to-transparent mb-6" />
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
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono"
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
