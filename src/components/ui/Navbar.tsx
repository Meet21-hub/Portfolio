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
      rgba(16,185,129,0.15) 0%,
      rgba(255,255,255,0.05) 35%,
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
      ? "0 12px 48px rgba(0,0,0,0.8)"
      : "0 4px 20px rgba(0,0,0,0.4)",
    navHovered
      ? "0 0 28px rgba(16,185,129,0.1), 0 0 60px rgba(16,185,129,0.05)"
      : "",
    "inset 0 1px 0 rgba(255,255,255,0.05)",  // top glass highlight — always
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
        className="absolute inset-0 rounded-none pointer-events-none -z-10"
        style={{
          boxShadow: navHovered
            ? "0 0 0 1px rgba(16,185,129,0.2), 0 0 40px rgba(16,185,129,0.08)"
            : scrolled
            ? "0 0 0 1px rgba(16,185,129,0.05)"
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
        className={`relative flex items-center gap-1 px-3 py-2 rounded-none overflow-hidden backdrop-blur-2xl border border-white/5 transition-all duration-500 ${
          scrolled ? "bg-black/80" : "bg-black/40"
        }`}
        style={{
          boxShadow,
        }}
      >
        {/* Permanent emerald tint across navbar */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(108deg, rgba(16,185,129,0.08) 0%, transparent 100%)",
          }}
        />

        {/* Top inner highlight — the glass surface light source */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(16,185,129,0.2), transparent)",
          }}
        />

        {/* Cursor-following light sweep — fades in/out with nav hover state */}
        <div
          ref={lightRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity:    navHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

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
              className="relative px-4 py-1.5 rounded-none text-[10px] font-mono uppercase tracking-[0.25em] select-none"
            >
              {/* Sliding active / hover pill (shared layout animation) */}
              <AnimatePresence>
                {isHighlit && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-none"
                    style={{
                      background: isActive
                        ? "rgba(16,185,129,0.12)"
                        : "rgba(255,255,255,0.03)",
                      border: isActive
                        ? "1px solid rgba(16,185,129,0.3)"
                        : "1px solid rgba(255,255,255,0.05)",
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
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(156,163,175,0.8)",
                  textShadow: isActive
                    ? "0 0 12px rgba(16,185,129,0.6)"
                    : "none",
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {link.name}
              </motion.span>

              {/* Underline: center-expand, gradient on active */}
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary origin-left"
                animate={{
                  scaleX: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
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
