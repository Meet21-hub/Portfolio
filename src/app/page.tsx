"use client";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import InteractiveWebGL from "@/components/3d/NetworkBackground";
import TerminalEasterEgg from "@/components/ui/TerminalEasterEgg";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden">
      
      {/* Fixed WebGL Background */}
      <InteractiveWebGL />

      {/* Main Content */}
      <div className="w-full relative z-10 selection:bg-primary/30 selection:text-white">
        
        {/* CALM — Hero fills full viewport */}
        <HeroSection />

        {/* Transition spacer — breathe after hero */}
        <div className="h-[8vh] pointer-events-none" />

        {/* CALM — About: heavy glass panel grounds the user after the hero storm */}
        <section id="about" className="relative z-20">
          <div className="absolute inset-0 bg-[#05050f]/80 backdrop-blur-2xl border-y border-white/[0.04] shadow-[0_-30px_80px_rgba(0,0,0,0.7)]" />
          <div className="relative">
            <AboutSection />
          </div>
        </section>

        {/* DYNAMIC — Skills: transparent, floating in the universe */}
        <section id="skills" className="relative z-10">
          <SkillsSection />
        </section>

        {/* CLIMAX — Projects: deep cinematic layer */}
        {/* NOTE: No SectionTransition — CSS sticky breaks inside transformed ancestors */}
        {/* NOTE: No intermediate div.relative — sticky needs section as direct scroll container */}
        <section id="projects" className="relative z-30">
          <div className="absolute inset-0 bg-[#05050f]/40 pointer-events-none" />
          <ProjectsSection />
        </section>

        {/* EXHALE — Contact: settled, quiet */}
        <section id="contact" className="relative z-40 border-t border-white/[0.04]">
          <div className="absolute inset-0 bg-[#05050f]/90 backdrop-blur-xl" />
          <div className="relative">
            <ContactSection />
          </div>
        </section>

      </div>

      <TerminalEasterEgg />
      {/* Custom cursor — renders above everything, pointer-events-none */}
      <CustomCursor />
    </main>
  );
}
