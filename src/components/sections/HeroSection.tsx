"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { sectionVariants, childVariants } from "@/utils/animations";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // ONE scroll interaction: opacity fade-out as you leave the hero
  // No scale, no y — those fought with the typography weight and caused chaos
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-start justify-center overflow-hidden pt-[22vh]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center mix-blend-difference pointer-events-none w-full"
      >
        <div className="overflow-hidden">
          <motion.h1
            variants={childVariants}
            className="text-[12vw] md:text-[10vw] font-equinox font-bold text-white leading-[0.85] tracking-tight text-center uppercase"
          >
            MEET
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            variants={childVariants}
            className="text-[12vw] md:text-[10vw] font-equinox font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-primary to-primary/40 leading-[0.85] tracking-tight text-center uppercase"
          >
            KHANDELWAL
          </motion.h1>
        </div>

        <motion.div
          variants={childVariants}
          className="mt-8 flex gap-6 items-center"
        >
          <div className="h-[1px] w-12 md:w-24 bg-white/30" />
          <p className="text-sm md:text-lg font-mono text-gray-300 uppercase tracking-[0.3em]">
            Software / Backend / VR
          </p>
          <div className="h-[1px] w-12 md:w-24 bg-white/30" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={childVariants}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 mix-blend-difference"
      >
        <span className="text-xs font-mono tracking-widest text-white/50 uppercase">
          Explore
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-white"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
