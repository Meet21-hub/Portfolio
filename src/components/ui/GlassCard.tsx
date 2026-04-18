"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glowColor?: string;
  rounded?: string;
  style?: React.CSSProperties;
}

/**
 * GlassCard component provides a consistent glassmorphism effect
 * with optional hover scaling and border glowing.
 */
export default function GlassCard({
  children,
  className = "",
  hover = true,
  glowColor = "#10b981", // Emerald default
  rounded = "rounded-none", // Sharp edges for editorial look
  style = {}
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? {
        scale: 1.01,
        borderColor: `${glowColor}80`,
        boxShadow: `0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px ${glowColor}15`,
      } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative backdrop-blur-xl border border-white/5 ${rounded} overflow-hidden ${className}`}
      style={{
        background: className.includes('bg-') ? undefined : 'rgba(12, 12, 12, 0.85)',
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}
