"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import GlassGlare from "@/components/ui/GlassGlare";
import { sectionVariants, childVariants } from "@/utils/animations";

export default function AboutSection() {
  return (
    <motion.section
      id="about-content"
      className="py-28 px-6 md:px-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

        {/* LEFT: Sticky label */}
        <div className="lg:w-1/3 lg:sticky lg:top-28 shrink-0">
          <motion.p variants={childVariants} className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em] mb-5">
            01. Who I Am
          </motion.p>
          <motion.h2
            variants={childVariants}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-none"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              Me
            </span>
          </motion.h2>
          <motion.div variants={childVariants} className="h-px w-16 bg-gradient-to-r from-primary/60 to-transparent mb-8" />

          {/* Avatar - using GlassCard for small badge style */}
          <motion.div variants={childVariants}>
            <GlassCard hover={false} rounded="rounded-full" className="w-16 h-16 flex items-center justify-center">
              <span className="text-xl font-mono text-gray-300 font-bold tracking-tight">MK</span>
            </GlassCard>
          </motion.div>
        </div>

        {/* RIGHT: Body copy inside a GlassCard panel ── */}
        <div className="lg:w-2/3">
          <GlassCard hover={false} rounded="rounded-3xl" className="group">
            <GlassGlare />
            <div className="relative z-10 p-8 md:p-10 space-y-8">

              <motion.p
                variants={childVariants}
                className="text-gray-300 leading-[1.9] text-base md:text-lg"
              >
                I am a software developer with a strong focus on building resilient{" "}
                <span className="text-white font-semibold">backend systems</span>.
                Currently evolving my expertise in Spring Boot, JWT authentication,
                and REST APIs — focused on creating solutions that solve real-world problems.
              </motion.p>

              <motion.p
                variants={childVariants}
                className="text-gray-400 leading-[1.9] text-base md:text-lg"
              >
                Beyond the backend, I bridge immersive technology and software engineering
                with experience in{" "}
                <span className="text-secondary font-semibold">AR/VR and Unity development</span>.
                This keeps my approach dynamic and user-centric.
              </motion.p>

              <motion.p
                variants={childVariants}
                className="text-gray-400 leading-[1.9] text-base md:text-lg"
              >
                Consistently striving for excellence, marked by a strong academic record{" "}
                <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full border border-accent/20 bg-accent/5 text-accent/80 text-sm font-mono italic">
                  CGPA: 9.66
                </span>
                .{" "}My goal is to orchestrate systems that are as efficient under the
                hood as they are seamless on the surface.
              </motion.p>

              {/* Stats — GlassCards with white glow */}
              <motion.div
                variants={childVariants}
                className="pt-6 border-t border-white/[0.06] flex flex-wrap gap-4"
              >
                {[
                  { val: "2+", label: "Years building" },
                  { val: "9.66", label: "CGPA" },
                  { val: "3+", label: "Projects shipped" },
                ].map(({ val, label }) => (
                  <motion.div key={label} variants={childVariants}>
                    <GlassCard rounded="rounded-2xl" className="px-5 py-3" glowColor="#ffffff">
                      <div className="text-2xl font-black text-white mb-0.5">{val}</div>
                      <div className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">{label}</div>
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>

            </div>{/* close inner padding div */}
          </GlassCard>{/* close GlassCard panel */}
        </div>{/* close lg:w-2/3 */}

      </div>
    </motion.section>
  );
}
