"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorState = "default" | "button" | "link" | "card";

// Spring config — controls how "laggy" the ring feels behind the dot
// Lower stiffness = more lag = more dramatic trail
const TRAIL_SPRING = { damping: 22, stiffness: 240, mass: 0.65 };

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // default true to avoid SSR flash

  // ── Position values — MotionValue avoids React re-renders on every mousemove
  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);

  // Ring lags behind via spring — creates the trail effect
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const ringX = useSpring(rawX, TRAIL_SPRING);
  const ringY = useSpring(rawY, TRAIL_SPRING);

  useEffect(() => {
    // Only enable on true pointer devices (not touch)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsTouch(false);

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      // Priority: card > button > link > default
      if (t.closest('[data-cursor="card"]')) {
        setState("card");
      } else if (t.closest('button, [role="button"], [data-cursor="button"]')) {
        setState("button");
      } else if (t.closest('a[href]')) {
        setState("link");
      } else {
        setState("default");
      }
    };

    const onDocLeave = () => setVisible(false);
    const onDocEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Don't render on touch devices or server
  if (isTouch) return null;

  // ── Derived ring styles based on state ──────────────────────────────────
  const ringSize =
    state === "button" ? 72 :
    state === "card"   ? 58 :
    state === "link"   ? 44 : 34;

  const ringBorderColor =
    state === "button" ? "#10b981" :
    state === "link"   ? "#10b981" :
    state === "card"   ? "rgba(255,255,255,0.85)" :
                         "rgba(16,185,129,0.4)";

  const ringBg =
    state === "button" ? "rgba(16,185,129,0.08)" :
    state === "card"   ? "rgba(255,255,255,0.03)" :
                         "transparent";

  const ringGlow =
    state === "button" ? "0 0 28px rgba(16,185,129,0.3), inset 0 0 10px rgba(16,185,129,0.1)" :
    state === "link"   ? "0 0 16px rgba(16,185,129,0.2)" :
    state === "card"   ? "0 0 18px rgba(255,255,255,0.12)" :
                         "none";

  const dotColor =
    state === "link" ? "#10b981" : "#ffffff";

  return (
    <>
      {/* ── DOT: exact mouse position, instant response ─────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{
          width:  state === "button" ? 0 : 8,
          height: state === "button" ? 0 : 8,
          opacity: visible ? 1 : 0,
          backgroundColor: dotColor,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* ── RING: spring-lagged trail, shape reacts to context ──────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-transparent flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{
          width:       ringSize,
          height:      ringSize,
          borderColor: ringBorderColor,
          backgroundColor: ringBg,
          boxShadow:   ringGlow,
          opacity:     visible ? 1 : 0,
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        {/* Label inside ring — appears only for button and card states */}
        <AnimatePresence mode="wait">
          {state === "button" && (
            <motion.span
              key="click"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.15 }}
              className="text-[8px] font-mono uppercase tracking-[0.22em] font-bold select-none"
              style={{ color: "#10b981" }}
            >
              Click
            </motion.span>
          )}
          {state === "card" && (
            <motion.span
              key="view"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.15 }}
              className="text-[8px] font-mono uppercase tracking-[0.22em] font-bold text-white/70 select-none"
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
