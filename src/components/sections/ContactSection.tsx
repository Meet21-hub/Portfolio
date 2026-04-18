"use client";

import { motion } from "framer-motion";
import { Mail, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { FolderGit2, Activity, Star } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GlassGlare from "@/components/ui/GlassGlare";
import { sectionVariants, childVariants } from "@/utils/animations";

const stats = [
  { icon: FolderGit2, value: "12+", label: "Repositories", color: "#8b5cf6" },
  { icon: Activity, value: "450+", label: "Contributions", color: "#06b6d4" },
  { icon: Star, value: "Java", label: "Primary Focus", color: "#f59e0b" },
];

export default function ContactSection() {
  return (
    <motion.section
      className="py-28 px-6 md:px-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

        {/* LEFT: sticky label */}
        <div className="lg:w-1/3 lg:sticky lg:top-28 shrink-0 self-start">
          <motion.p variants={childVariants} className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em] mb-4">
            04. Connect
          </motion.p>
          <motion.h2
            variants={childVariants}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4"
          >
            Let&apos;s<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Connect
            </span>
          </motion.h2>
          <motion.div variants={childVariants} className="h-px w-16 bg-gradient-to-r from-primary/50 to-transparent mb-6 origin-left" />
          <motion.p variants={childVariants} className="text-gray-500 text-sm leading-relaxed">
            Always open to discussing backend architecture, system design, or
            opportunities to build resilient software together.
          </motion.p>
        </div>

        {/* RIGHT: GlassCard panel containing all content */}
        <div className="lg:w-2/3">
          <GlassCard hover={false} rounded="rounded-3xl" className="group">
            <GlassGlare />
            <div className="relative z-10 p-8 md:p-10 flex flex-col gap-12">

            {/* GitHub Stats */}
            <div>
              <motion.p variants={childVariants} className="text-[11px] font-mono text-gray-500 uppercase tracking-[0.25em] mb-5 flex items-center gap-3">
                <span className="inline-block w-4 h-px bg-white/15" /> GitHub Activity
              </motion.p>
              <div className="grid grid-cols-3 gap-4">
                {stats.map(({ icon: Icon, value, label, color }) => (
                  <motion.div
                    key={label}
                    variants={childVariants}
                    className="h-full"
                  >
                    <GlassCard
                      glowColor={color}
                      rounded="rounded-2xl"
                      className="p-5 flex flex-col items-center text-center group h-full"
                    >
                      <Icon
                        className="w-5 h-5 mb-3 transition-transform duration-300 group-hover:scale-110"
                        style={{ color }}
                      />
                      <div className="text-2xl md:text-3xl font-black text-white mb-1">{value}</div>
                      <div className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">{label}</div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div>
              <motion.p variants={childVariants} className="text-[11px] font-mono text-gray-600 uppercase tracking-[0.25em] mb-5 flex items-center gap-3">
                <span className="inline-block w-4 h-px bg-white/15" /> Get In Touch
              </motion.p>
              <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-[1.03] shadow-[0_0_24px_rgba(139,92,246,0.25)]"
                >
                  <Mail className="w-4 h-4" /> Say Hello
                </a>
                <a
                  href="https://resume-7d89f8.tiiny.site/"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 relative group overflow-hidden"
                >
                  <GlassCard hover={false} rounded="rounded-full" className="px-7 py-3.5 text-sm text-white flex items-center gap-2 group-hover:border-white/20 transition-all duration-300">
                    <Download className="w-4 h-4" /> Resume
                  </GlassCard>
                </a>
              </motion.div>

              <motion.div variants={childVariants} className="flex items-center gap-6 text-gray-600">
                <a href="https://github.com/Meet21-hub" target="_blank" rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-300 group flex items-center gap-2">
                  <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-mono uppercase tracking-wider">Github</span>
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-300 group flex items-center gap-2">
                  <LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-mono uppercase tracking-wider">LinkedIn</span>
                </a>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.p variants={childVariants} className="text-xs text-gray-700 font-mono pt-4 border-t border-white/[0.06]">
              © {new Date().getFullYear()} Meet Khandelwal · Crafted with Next.js &amp; Three.js
            </motion.p>

            </div>{/* /inner wrapper */}
          </GlassCard>{/* /GlassCard */}
        </div>{/* /lg:w-2/3 */}

      </div>
    </motion.section>
  );
}
