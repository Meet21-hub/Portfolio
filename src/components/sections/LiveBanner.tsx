"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

export default function LiveBanner() {
  return (
    <motion.div
      {...fadeInUp}
      // Start banner slightly earlier
      transition={{ ...fadeInUp.transition, delay: 0.2 }}
      className="flex items-center justify-center -mt-8 mb-12 relative z-10"
    >
      <div className="glass-panel rounded-full py-2 px-4 flex items-center gap-3 w-max mx-auto shadow-lg shadow-primary/10">
        {/* Pulsing Indicator */}
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
        </div>
        <span className="text-sm font-medium text-foreground tracking-wide">
          Currently Building: <span className="text-secondary font-semibold">Smart Leave Management System</span>
        </span>
      </div>
    </motion.div>
  );
}
