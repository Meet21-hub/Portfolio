"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassGlare from "@/components/ui/GlassGlare";

const links = [
  { name: "About",    href: "#about",    id: "about" },
  { name: "Skills",   href: "#skills",   id: "skills" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Contact",  href: "#contact",  id: "contact" },
];

export default function Navbar() {
  const [activeId,   setActiveId]   = useState<string | null>(null);
  const [hoveredId,  setHoveredId]  = useState<string | null>(null);
  const [scrolled,   setScrolled]   = useState(false);
  const [navHovered, setNavHovered] = useState(false);

  const navRef   = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  // ── Scroll detection — more opaque + shadow after 60px ──────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section — IntersectionObserver (no scroll listener) ──────────
  useEffect(() => {
    const map = new Map<Element, string>();
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) map.set(el, id);
    });
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) {
          const id = map.get(best.target);
          if (id) setActiveId(id);
        }
      },
      { threshold: [0.1, 0.3], rootMargin: "-10% 0px -50% 0px" }
    );
    map.forEach((_, el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ── Cursor light sweep — moves radial gradient across the pill ──────────
  const onNavMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el   = navRef.current;
    const glow = lightRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    glow.style.background = `radial-gradient(circle at ${xPct}% 50%,
      rgba(139,92,246,0.25) 0%,
      rgba(6,182,212,0.12) 35%,
      transparent 65%)`;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const displayActive = hoveredId ?? activeId;

  // ── Dynamic container styles based on scroll + hover ────────────────────


  const boxShadow = [
    scrolled
      ? "0 12px 48px rgba(0,0,0,0.6)"
      : "0 4px 20px rgba(0,0,0,0.25)",
    navHovered
      ? "0 0 28px rgba(139,92,246,0.18), 0 0 60px rgba(139,92,246,0.07)"
      : "",
    "inset 0 1px 0 rgba(255,255,255,0.10)",  // top glass highlight — always
  ].filter(Boolean).join(", ");

  return (
    <motion.nav
      initial={{ opacity: 0, y: -28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-6 right-6 md:right-12 z-50"
    >
      {/* ── Outer glow halo — separate layer so it can bleed outside the pill ── */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none -z-10"
        style={{
          boxShadow: navHovered
            ? "0 0 0 1px rgba(139,92,246,0.25), 0 0 40px rgba(139,92,246,0.12)"
            : scrolled
            ? "0 0 0 1px rgba(139,92,246,0.10)"
            : "none",
          transition: "box-shadow 0.45s ease",
        }}
      />

      {/* ── Main pill ─────────────────────────────────────────────────────── */}
      <div
        ref={navRef}
        onMouseMove={onNavMouseMove}
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => { setNavHovered(false); }}
        className={`relative flex items-center gap-1 px-3 py-2.5 rounded-full overflow-hidden backdrop-blur-xl border border-white/10 transition-all duration-500 ${
          scrolled ? "bg-white/[0.08]" : "bg-white/5"
        }`}
        style={{
          boxShadow,
        }}
      >
        {/* Permanent purple→cyan gradient tint across navbar */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background:
              "linear-gradient(108deg, rgba(139,92,246,0.10) 0%, rgba(6,182,212,0.07) 55%, transparent 100%)",
          }}
        />

        {/* Top inner highlight — the glass surface light source */}
        <div
          className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.30), rgba(139,92,246,0.35), rgba(6,182,212,0.22), transparent)",
            borderRadius: "9999px",
          }}
        />

        {/* Cursor-following light sweep — fades in/out with nav hover state */}
        <div
          ref={lightRef}
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            opacity:    navHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Bottom edge shadow — gives depth, like glass resting on a surface */}
        <div
          className="absolute bottom-0 left-[15%] right-[15%] h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(0,0,0,0.4), transparent)",
          }}
        />

        {/* Hyper-realistic moving glass reflection */}
        <GlassGlare />

        {/* ── Nav Links ─────────────────────────────────────────────────── */}
        {links.map((link) => {
          const isActive  = activeId  === link.id;
          const isHovered = hoveredId === link.id;
          const isHighlit = displayActive === link.id;

          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              onMouseEnter={() => setHoveredId(link.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.18em] select-none"
            >
              {/* Sliding active / hover pill (shared layout animation) */}
              <AnimatePresence>
                {isHighlit && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(139,92,246,0.28), rgba(6,182,212,0.14))"
                        : "rgba(255,255,255,0.055)",
                      border: isActive
                        ? "1px solid rgba(139,92,246,0.45)"
                        : "1px solid rgba(255,255,255,0.10)",
                      boxShadow: isActive
                        ? [
                            "inset 0 1px 0 rgba(255,255,255,0.15)",
                            "0 0 16px rgba(139,92,246,0.25)",
                          ].join(", ")
                        : "inset 0 1px 0 rgba(255,255,255,0.07)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 430, damping: 40 }}
                  />
                )}
              </AnimatePresence>

              {/* Label text + glow */}
              <motion.span
                className="relative z-10 block"
                animate={{
                  color: isActive
                    ? "#ffffff"
                    : isHovered
                    ? "rgba(255,255,255,0.88)"
                    : "rgba(156,163,175,1)",
                  textShadow: isActive
                    ? "0 0 14px rgba(139,92,246,0.75), 0 0 30px rgba(139,92,246,0.3)"
                    : isHovered
                    ? "0 0 10px rgba(255,255,255,0.22)"
                    : "none",
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {link.name}
              </motion.span>

              {/* Underline: center-expand, gradient on active */}
              <motion.span
                className="absolute bottom-0.5 left-[20%] right-[20%] h-[1.5px] rounded-full origin-center"
                style={{
                  background: isActive
                    ? "linear-gradient(to right, #8b5cf6, #06b6d4)"
                    : "rgba(255,255,255,0.38)",
                  boxShadow: isActive
                    ? "0 0 8px rgba(139,92,246,0.8), 0 0 16px rgba(6,182,212,0.4)"
                    : "none",
                }}
                animate={{
                  scaleX: isActive ? 1 : isHovered ? 0.6 : 0,
                  opacity: isActive || isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.26, ease: "easeOut" }}
              />
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
