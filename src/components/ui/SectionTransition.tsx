"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function SectionTransition({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Monitor the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 0"] // From when top hits bottom of viewport, to when bottom hits top
  });

  // Smooth out the scroll values so it doesn't instantly snap if the user stops scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Entry phase: (0 to 0.3) element is entering from bottom. Scale down from 0.85 to 1, opacity 0 to 1, blur 10px to 0.
  // Viewing phase: (0.3 to 0.7) element is in focus. Scale 1, opacity 1.
  // Exit phase: (0.7 to 1) element is exiting top. Scale from 1 to 0.9, opacity from 1 to 0, blur 0 to 10px.

  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.9]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const blurValue = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [8, 0, 0, 8]);
  const y = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  // Framer motion uses string templates for filters
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.div 
      ref={ref}
      style={{ scale, opacity, filter, y }}
      className={`will-change-transform ${className || ""}`}
    >
      {children}
    </motion.div>
  );
}
