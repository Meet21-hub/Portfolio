"use client";

import { motion } from "framer-motion";
import { Mail, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { FolderGit2, Activity, Star } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GlassGlare from "@/components/ui/GlassGlare";
import ContactSpline from "@/components/3d/ContactSpline";
import { sectionVariants, childVariants } from "@/utils/animations";

const stats = [
  { icon: FolderGit2, value: "12+", label: "Repositories", color: "#10b981" },
  { icon: Activity, value: "450+", label: "Contributions", color: "#ffffff" },
  { icon: Star, value: "Java", label: "Primary Focus", color: "#10b981" },
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
          <motion.p variants={childVariants} className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-4">
            04 / CONNECT
          </motion.p>
          <motion.h2
            variants={childVariants}
            className="text-5xl md:text-7xl font-deltha text-white tracking-tight leading-[0.85] mb-6 uppercase"
          >
            Let&apos;s<br />
            <span className="text-primary">
              Connect
            </span>
          </motion.h2>
          <motion.div variants={childVariants} className="h-[1px] w-24 bg-primary mb-8 origin-left" />
          <motion.p variants={childVariants} className="text-gray-400 text-sm leading-relaxed">
            Always open to discussing backend architecture, system design, or
            opportunities to build resilient software together.
          </motion.p>
        </div>

        {/* RIGHT: GlassCard panel containing all content */}
        <div className="lg:w-2/3">
          <GlassCard hover={false} rounded="rounded-none" className="group">
            <GlassGlare />
            <div className="relative z-10 p-8 md:p-12 flex flex-col lg:grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
              
              {/* Left Column: Info & CTAs */}
              <div className="flex flex-col gap-14 w-full h-full">
                {/* GitHub Stats */}
                <div className="flex-1">
                  <motion.p variants={childVariants} className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                    <span className="inline-block w-6 h-px bg-primary/20" /> GitHub Activity
                  </motion.p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-5">
                    {stats.map(({ icon: Icon, value, label, color }) => (
                      <motion.div
                        key={label}
                        variants={childVariants}
                        className="h-full"
                      >
                        <GlassCard
                          glowColor={color}
                          rounded="rounded-none"
                          className="p-6 flex flex-col items-center text-center group h-full border-white/5"
                        >
                          <Icon
                            className="w-5 h-5 mb-4 transition-transform duration-300 group-hover:scale-110"
                            style={{ color: color === "#ffffff" ? "#ffffff" : "#10b981" }}
                          />
                          <div className="text-3xl font-black text-white mb-1.5 leading-none">{value}</div>
                          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none">{label}</div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-8 border-t border-white/[0.06]">
                  <motion.p variants={childVariants} className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                    <span className="inline-block w-6 h-px bg-white/10" /> Get In Touch
                  </motion.p>
                  <motion.div variants={childVariants} className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-5 mb-10">
                    <a
                      href="mailto:contact@example.com"
                      className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-[#080808] px-8 py-4 rounded-none font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                    >
                      <Mail className="w-4 h-4" /> Say Hello
                    </a>
                    <a
                      href="https://resume-7d89f8.tiiny.site/"
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 relative group overflow-hidden"
                    >
                      <GlassCard hover={false} rounded="rounded-none" className="px-8 py-4 text-xs font-bold text-white flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 w-full uppercase tracking-widest">
                        <Download className="w-4 h-4" /> Resume
                      </GlassCard>
                    </a>
                  </motion.div>

                  <motion.div variants={childVariants} className="flex items-center gap-8 text-gray-600">
                    <a href="https://github.com/Meet21-hub" target="_blank" rel="noopener noreferrer"
                      className="hover:text-primary transition-colors duration-300 group flex items-center gap-2">
                      <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">Github</span>
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
                      className="hover:text-primary transition-colors duration-300 group flex items-center gap-2">
                      <LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">LinkedIn</span>
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* Right Column: 3D Interaction */}
              <motion.div 
                variants={childVariants}
                className="w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden"
              >
                <div className="w-full h-full relative group">
                  <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <ContactSpline />
                </div>
              </motion.div>

              {/* Footer */}
              <motion.p 
                variants={childVariants} 
                className="text-[10px] text-gray-700 font-mono pt-6 border-t border-white/[0.06] lg:col-span-2 w-full flex justify-between uppercase tracking-widest"
              >
                <span>© {new Date().getFullYear()} Meet Khandelwal</span>
                <span className="opacity-50">Crafted with Next.js & Spline</span>
              </motion.p>
            </div>
          </GlassCard>
        </div>

      </div>
    </motion.section>
  );
}
