"use client";

import { useRef, useState, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { sectionVariants, childVariants } from "@/utils/animations";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import GlassGlare from "@/components/ui/GlassGlare";
import GlassCard from "@/components/ui/GlassCard";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "Smart Leave Management",
    status: "ONGOING",
    num: "01",
    desc: "A backend-focused system designed to streamline employee leave workflows with structured approval pipelines and role-based access control. Scalable REST APIs and secure JWT authentication at its core.",
    highlights: [
      "Role-based access control (RBAC)",
      "Secure authentication using JWT",
      "Structured approval workflow system",
      "Scalable backend architecture",
    ],
    tech: ["Java", "Spring Boot", "MySQL", "JWT", "REST APIs"],
    link: "#",
    repo: "https://github.com/Meet21-hub/Smart-Leave-Management-System",
    accent: "#8b5cf6",
    primary: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Student Management System",
    status: "COMPLETED",
    num: "02",
    desc: "A desktop-based application to manage student records, academic data, and administrative workflows with full database integration and a clean GUI.",
    highlights: [
      "Interactive GUI-based application",
      "CRUD operations for student records",
      "Database integration with MySQL",
      "Clean modular structure",
    ],
    tech: ["Java", "Java Swing", "MySQL"],
    link: "#",
    repo: "https://github.com/Meet21-hub/student-management-system-java",
    accent: "#06b6d4",
    primary: false,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "3D FPS VR Shooting Game",
    status: "COMPLETED",
    num: "03",
    desc: "An immersive first-person VR shooting experience in Unity, simulating realistic interactions in a fully rendered virtual environment with real-time optimization.",
    highlights: [
      "First-person shooter mechanics",
      "Immersive VR interaction design",
      "Real-time rendering & optimization",
      "Interactive 3D environment",
    ],
    tech: ["Unity", "C#", "VR Development"],
    link: "#",
    repo: "#",
    accent: "#f59e0b",
    primary: false,
    image: "/vr_screenshot_1.jpg",
  },
];

// ─── Individual Project Card ──────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  isActive,
  onActivate,
}: {
  project: (typeof projects)[0];
  index: number;
  isActive: boolean;
  onActivate: (i: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);  // GSAP scroll target
  const tiltRef = useRef<HTMLDivElement>(null);  // tilt perspective wrapper
  const glowRef = useRef<HTMLDivElement>(null);  // cursor-following glow
  const imgRef = useRef<HTMLImageElement>(null); // image for zoom
  const [entered, setEntered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Scroll-linked Y entrance (scrubbing parallax)
      gsap.fromTo(
        cardRef.current,
        { y: 70 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 92%",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      // 2. Active tracking: fires when card enters the middle 50% of the screen
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) {
            onActivate(index);
          }
        },
      });

      // 3. Mark as entered once top hits 95%
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 95%",
        once: true,
        onEnter: () => setEntered(true),
      });
    }, cardRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, [index, onActivate]);

  // ── Tilt + follow-glow on mousemove ─────────────────────────────────────
  // Pure DOM math — zero React re-renders on mousemove
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    const glow = glowRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2); // -1 to 1
    const dy = (e.clientY - cy) / (rect.height / 2); // -1 to 1

    // Max tilt: 7 degrees on each axis
    const rotX = -dy * 7;
    const rotY = dx * 7;

    el.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.025)`;

    // Move the follow-glow to cursor position within card
    if (glow) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.background = `radial-gradient(circle at ${px}% ${py}%, ${project.accent}28, transparent 60%)`;
      glow.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    const el = tiltRef.current;
    const glow = glowRef.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glow) glow.style.opacity = "0";
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);


  const cardOpacity = !entered ? 0 : isActive ? 1 : 0.22;
  const cardScale = !entered ? 1 : isActive ? 1 : 0.968;
  const cardFilter = isActive
    ? "saturate(1) brightness(1)"
    : "saturate(0.25) brightness(0.55)";

  // Border brightens on both active AND hover
  const borderColor = isActive
    ? `${project.accent}70`
    : isHovered
      ? `${project.accent}40`
      : `${project.accent}12`;

  // Box shadow appears on hover for card-level glow
  const cardBoxShadow = isHovered
    ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accent}18`
    : "0 4px 24px rgba(0,0,0,0.3)";

  // Active state transitions
  const activeTransition = "all 0.65s cubic-bezier(0.25, 0.1, 0.25, 1)";
  const hoverTransition = "all 0.45s cubic-bezier(0.23, 1, 0.32, 1)";

  return (
    <div ref={cardRef} className="mb-10 last:mb-0 will-change-transform">

      {/* ── Tilt + hover wrapper — separate from GSAP ref ── */}
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
          transition: "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform",
        }}
      >
        <GlassCard
          hover={false}
          rounded="rounded-2xl"
          className="relative h-full"
          style={{
            opacity: cardOpacity,
            transform: `scale(${cardScale})`,
            filter: cardFilter,
            borderColor: borderColor,
            boxShadow: cardBoxShadow,
            transition: `${activeTransition}, box-shadow ${hoverTransition}, border-color ${hoverTransition}`,
          }}
        >
          <div data-cursor="card" className="absolute inset-0 z-[1]" />
          
          {/* ── Cursor-following glow ── */}
          <div
            ref={glowRef}
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              opacity: 0,
              transition: "opacity 0.35s ease",
            }}
          />
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl z-10"
            style={{
              background: `linear-gradient(to bottom, transparent, ${project.accent}, transparent)`,
              opacity: isActive ? 1 : 0.2,
              boxShadow: isActive ? `0 0 28px ${project.accent}70` : "none",
              transition: activeTransition,
            }}
          />

          <div className="absolute inset-0 overflow-hidden">
            <img
              ref={imgRef}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-25 brightness-50"
              style={{
                transform: isHovered ? "scale(1.07)" : "scale(1)",
                transition: "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05050f] via-[#05050f]/85 to-[#05050f]/30" />
            <div
              className="absolute inset-0"
              style={{
                opacity: isActive ? 0.12 : 0,
                background: `radial-gradient(ellipse at 70% 30%, ${project.accent}, transparent 60%)`,
                transition: activeTransition,
              }}
            />
          </div>

          <GlassGlare />

          <div className="relative p-8 md:p-10 min-h-[380px] md:min-h-[420px] flex flex-col justify-between z-10">
            <div className="flex items-center justify-between mb-6">
              <span
                className="text-7xl md:text-8xl font-black leading-none select-none"
                style={{
                  color: project.accent,
                  opacity: isActive ? 0.18 : 0.06,
                  transition: activeTransition,
                }}
              >
                {project.num}
              </span>
              <div className="flex items-center gap-3">
                {project.primary && (
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: project.accent }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ background: project.accent }}
                    />
                  </span>
                )}
                <span
                  className="text-[11px] font-mono uppercase tracking-[0.25em]"
                  style={{ color: project.accent }}
                >
                  {project.status}
                </span>
                {project.primary && (
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest border"
                    style={{
                      color: project.accent,
                      borderColor: `${project.accent}40`,
                      background: `${project.accent}12`,
                    }}
                  >
                    Featured
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none mb-2">
                {project.title}
              </h3>
              <div
                className="h-[2px] w-16 mb-6 rounded-full"
                style={{ background: project.accent }}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="md:w-3/5">
                <p className="text-gray-300 text-sm md:text-base mb-5 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-black/40 text-gray-200 border"
                      style={{ borderColor: `${project.accent}30` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-full text-white transition-all hover:brightness-110"
                      style={{ background: project.accent }}
                    >
                      View Live <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.repo !== "#" && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 text-sm bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors border border-white/10"
                    >
                      Source <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="md:w-2/5">
                <p className="text-[11px] font-mono text-gray-500 uppercase tracking-[0.25em] mb-3 pb-2 border-b border-white/10">
                  Key Highlights
                </p>
                <div className="space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: project.accent }}
                      />
                      <span className="text-sm text-gray-300 leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  // NEW REFS FOR PINNING
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Sweep line reveal
      gsap.fromTo(
        sweepRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // --- NEW GSAP PINNING LOGIC ---
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (leftColumnRef.current && rightColumnRef.current) {
          ScrollTrigger.create({
            trigger: rightColumnRef.current,
            start: "top top+=96", // Pins when right column is 96px from viewport top
            end: () => `bottom bottom-=96`, // Unpins when right column ends
            pin: leftColumnRef.current,
            pinSpacing: false, // Ensures it doesn't push down content
            invalidateOnRefresh: true,
          });
        }
      });
      // ------------------------------

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleActivate = useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  const activeProject = activeIndex >= 0 ? projects[activeIndex] : null;
  const activeTransition = "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <motion.div
      ref={sectionRef}
      className="relative py-24 pb-36 px-6 md:px-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      {/* Sweep line */}
      <div
        ref={sweepRef}
        className="absolute top-0 left-0 right-0 h-[1px] origin-left"
        style={{
          background: "linear-gradient(to right, transparent, #8b5cf6, #06b6d4, transparent)",
        }}
      />

      {/* Ambient spotlight behind right column */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[62%] pointer-events-none"
        style={{
          opacity: activeProject ? 0.06 : 0,
          background: activeProject
            ? `radial-gradient(ellipse at 80% 50%, ${activeProject.accent}, transparent 65%)`
            : "none",
          transition: "opacity 0.8s ease, background 0.8s ease",
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

        {/* ─── LEFT: STICKY heading + live progress tracker ─── */}
        <div className="lg:w-[38%] shrink-0 relative h-full z-20">
          <div ref={leftColumnRef} className="flex flex-col">
            <motion.p variants={childVariants} className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em] mb-4">
              03. Selected Work
            </motion.p>

            <motion.h2 variants={childVariants} className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-secondary bg-[length:200%_auto] animate-gradient tracking-tighter leading-none mb-4 drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              FEATURED
              <br />
              WORKS
            </motion.h2>

            <motion.div variants={childVariants} className="h-px w-16 bg-gradient-to-r from-primary to-transparent mb-5 origin-left" />

            <motion.p variants={childVariants} className="text-gray-400 text-sm leading-relaxed mb-8">
              A selection of projects demonstrating backend architecture, systems
              thinking, and immersive VR engineering.
            </motion.p>

            {/* Scroll progress indicator */}
            <motion.div variants={childVariants} className="mb-8">
              <div className="h-[2px] bg-white/8 rounded-full relative overflow-hidden mb-2">
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: activeIndex >= 0 ? `${((activeIndex + 1) / projects.length) * 100}%` : "0%",
                    background: activeProject?.accent ?? "#8b5cf6",
                    boxShadow: activeProject ? `0 0 8px ${activeProject.accent}80` : "none",
                    transition: "all 0.55s ease-out",
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span
                  className="text-[11px] font-mono"
                  style={{
                    color: activeProject?.accent ?? "#6b7280",
                    transition: "color 0.3s",
                  }}
                >
                  {activeIndex >= 0 ? String(activeIndex + 1).padStart(2, "0") : "—"}
                </span>
                <span className="text-[11px] font-mono text-gray-700">
                  / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>

            {/* Live progress tracker */}
            <motion.div variants={childVariants} className="flex flex-col gap-5">
              {projects.map((p, i) => {
                const isItemActive = activeIndex === i;
                const isPast = activeIndex > i;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                    style={{
                      opacity: isItemActive ? 1 : isPast ? 0.45 : 0.2,
                      transition: activeTransition,
                    }}
                  >
                    <div
                      className="h-[1px] shrink-0"
                      style={{
                        width: isItemActive ? "2.5rem" : "0.75rem",
                        background: isItemActive ? p.accent : "rgba(255,255,255,0.15)",
                        transition: activeTransition,
                      }}
                    />

                    <span
                      className="text-xs font-mono uppercase tracking-[0.2em] flex-1"
                      style={{
                        color: isItemActive ? "#ffffff" : "#6b7280",
                        transition: activeTransition,
                      }}
                    >
                      {p.num} {p.title}
                    </span>

                    <span
                      className="flex h-1.5 w-1.5 shrink-0"
                      style={{
                        opacity: isItemActive ? 1 : 0,
                        transform: `scale(${isItemActive ? 1 : 0})`,
                        transition: activeTransition,
                      }}
                    >
                      <span
                        className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full opacity-75"
                        style={{ background: p.accent }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-1.5 w-1.5"
                        style={{ background: p.accent }}
                      />
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Active project accent color reader */}
            <div
              className="mt-8 pt-6 border-t border-white/[0.06]"
              style={{
                opacity: activeProject ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em] mb-1">
                Now Viewing
              </p>
              <p className="text-sm font-semibold text-white transition-all duration-300">
                {activeProject?.title ?? ""}
              </p>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Scrollable cinematic cards ─── */}
        <div ref={rightColumnRef} className="flex-1 flex flex-col z-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isActive={activeIndex === index}
              onActivate={handleActivate}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}