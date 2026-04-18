"use client";

import { useEffect, useRef } from "react";

export default function GlassGlare() {
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glare = glareRef.current;
    if (!glare) return;
    const parent = glare.parentElement?.parentElement; // container > parent
    if (!parent) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;

      // Parallax glare: moves opposite to mouse movement
      const tx = (xPct - 50) * -0.5;
      const ty = (yPct - 50) * -0.5;
      glare.style.transform = `translate(${tx}%, ${ty}%)`;
      glare.style.opacity = "1";
    };

    const onMouseLeave = () => {
      glare.style.opacity = "0";
    };

    parent.addEventListener("mousemove", onMouseMove, { passive: true });
    parent.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-[2] mix-blend-overlay"
      style={{ borderRadius: "inherit" }}
    >
      <div
        ref={glareRef}
        className="absolute inset-0 w-[250%] h-[250%] -left-[75%] -top-[75%]"
        style={{
          background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.08) 50%, transparent 60%)",
          opacity: 0,
          transition: "opacity 0.4s ease",
          willChange: "transform",
        }}
      />
    </div>
  );
}
