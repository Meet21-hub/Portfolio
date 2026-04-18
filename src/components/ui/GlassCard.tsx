"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glowColor?: string;
  rounded?: string;
}

/**
 * GlassCard component provides a consistent glassmorphism effect
 * with optional hover scaling and border glowing.
 */
export default function GlassCard({
  children,
  className = "",
  hover = true,
  glowColor = "#8b5cf6",
  rounded = "rounded-xl"
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? {
        scale: 1.02,
        borderColor: `${glowColor}60`,
        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${glowColor}25`,
      } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative backdrop-blur-lg bg-white/5 border border-white/10 ${rounded} overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
