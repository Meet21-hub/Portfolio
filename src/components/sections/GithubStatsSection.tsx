"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/utils/animations";
import { FolderGit2, Activity, Star } from "lucide-react";

export default function GithubStatsSection() {
  return (
    <section className="py-16 px-6 relative z-10 bg-black/40 border-y border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        <motion.div {...fadeInUp} className="md:w-1/3 text-center md:text-left">
          <motion.h2 
             initial={{ opacity: 0, letterSpacing: "-0.05em" }}
             whileInView={{ opacity: 1, letterSpacing: "0em" }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 bg-[length:200%_auto] animate-gradient mb-4 drop-shadow-lg"
          >
            Github Open Source Activity
          </motion.h2>
          <p className="text-gray-400 text-sm">
            Continuous deployment and regular code contributions towards mastering the Backend ecosystem and occasionally VR.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <motion.div variants={staggerItem} className="glass p-5 rounded-xl text-center group hover:border-primary/30 transition-colors">
             <FolderGit2 className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
             <div className="text-3xl font-black text-foreground mb-1">12+</div>
             <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Repositories</div>
          </motion.div>

          <motion.div variants={staggerItem} className="glass p-5 rounded-xl text-center group hover:border-secondary/30 transition-colors">
             <Activity className="w-6 h-6 text-secondary mx-auto mb-3 group-hover:scale-110 transition-transform" />
             <div className="text-3xl font-black text-foreground mb-1">450+</div>
             <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Contributions</div>
          </motion.div>

          <motion.div variants={staggerItem} className="glass p-5 rounded-xl text-center md:col-span-1 col-span-2 group hover:border-accent/30 transition-colors">
             <Star className="w-6 h-6 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
             <div className="text-xl font-bold text-foreground mb-2 mt-1">Java / Backend</div>
             <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Primary Focus</div>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
