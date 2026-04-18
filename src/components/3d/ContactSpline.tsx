"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import Spline with SSR disabled to prevent initialization errors
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null, // We handle our own loading state
});

export default function ContactSpline() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-[#080808] border border-white/5 overflow-hidden group">
      {/* Loading State Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#080808]"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border border-primary/20 border-t-primary rounded-none animate-spin" />
              <p className="text-[10px] font-deltha uppercase tracking-[0.2em] text-white/40">
                Syncing 3D Core
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
          WATERMARK MASKING 
          Using a more aggressive overflow strategy to clip the branding.
      */}
      <div className="absolute inset-0 z-10 overflow-hidden [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)]">
        <div className="absolute -inset-10 bottom-[-60px] right-[-140px]">
          <Spline 
            scene="https://prod.spline.design/5Jj2i8iybTp3d1p5/scene.splinecode" 
            onLoad={() => setIsLoading(false)}
            style={{ 
              width: '100%', 
              height: '100%',
              backgroundColor: 'transparent' 
            }}
          />
        </div>
      </div>

      {/* Subtle emerald edge glow */}
      <div className="absolute inset-0 border border-primary/5 pointer-events-none z-20" />
    </div>
  );
}
