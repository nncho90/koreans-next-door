"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  useMotionValue,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { BUILDINGS } from "./skylineData";
import SkylineBackground from "./SkylineBackground";
import SkylineBuilding from "./SkylineBuilding";

// Minimum scene width ensures all 12 buildings have enough horizontal space
const SCENE_MIN_W = 980;
const SCENE_H = 480;

export default function SeoulSkyline() {
  const { t } = useLocale();
  const ss = t.seoulSkyline;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { once: true, margin: "-80px" });

  const mouseX = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.width / 2;
      // Normalize to -1 → 1 range relative to container center
      mouseX.set((e.clientX - rect.left - cx) / cx);
    },
    [mouseX, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
  }, [mouseX]);

  return (
    <section className="relative overflow-hidden bg-[#04090f] py-16 md:py-20">
      {/* ── Section header ─────────────────────────────────────────── */}
      <div className="text-center mb-10 md:mb-14 relative z-10 px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {ss.label}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-3">
          {ss.heading1}{" "}
          <span className="text-[#ffd966]">{ss.heading2}</span>
        </h2>
        <p className="text-zinc-400 mt-3 text-base md:text-lg max-w-xl mx-auto">
          {ss.subheading}
        </p>
      </div>

      {/* ── Skyline scene — horizontally scrollable on mobile ─────── */}
      <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div
          ref={sceneRef}
          className="relative"
          style={{ height: SCENE_H, minWidth: SCENE_MIN_W }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background: sky, mountains, Han River */}
          <SkylineBackground />

          {/* Interactive buildings */}
          {BUILDINGS.map((building, i) => (
            <SkylineBuilding
              key={building.id}
              building={building}
              isDimmed={hoveredId !== null && hoveredId !== building.id}
              onHoverStart={() => setHoveredId(building.id)}
              onHoverEnd={() => setHoveredId(null)}
              mouseX={mouseX}
              entrance={{ visible: isInView, delay: i * 0.055 }}
            />
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div className="text-center mt-10 relative z-10">
        <Link
          href="/guide"
          className="inline-flex items-center gap-2 bg-[#ffd966] hover:bg-[#f5c842] active:bg-[#e8b800] text-[#1a1a1a] font-semibold rounded-full px-7 py-3 text-sm transition-colors"
        >
          Browse all guides
        </Link>
      </div>
    </section>
  );
}
