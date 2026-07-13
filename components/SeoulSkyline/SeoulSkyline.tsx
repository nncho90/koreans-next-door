"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  useMotionValue,
  useReducedMotion,
  useInView,
  useScroll,
} from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { BUILDINGS } from "./skylineData";
import SkylineBackground from "./SkylineBackground";
import SkylineBuilding from "./SkylineBuilding";

// Minimum scene width ensures all 12 buildings have enough horizontal space
const SCENE_MIN_W = 980;

export default function SeoulSkyline() {
  const { t } = useLocale();
  const ss = t.seoulSkyline;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

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
    <section className="relative overflow-hidden bg-[#04090f] py-12 md:py-16">
      {/* Dusk band: bridges the hard cut from the yellow section above */}
      <div
        className="absolute top-0 inset-x-0 h-24 md:h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,217,102,0.10), rgba(255,180,80,0.04) 45%, transparent)",
        }}
      />
      {/* Pre-light band: bridges the hard cut into the off-white section below */}
      <div
        className="absolute bottom-0 inset-x-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(250,250,248,0.06))" }}
      />

      {/* ── Section header ─────────────────────────────────────────── */}
      <div className="text-center mb-2 md:mb-4 relative z-10 px-6">
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
      <div className="relative">
        <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div
            ref={sceneRef}
            className="relative h-[360px] md:h-[400px]"
            style={{ minWidth: SCENE_MIN_W }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background: sky, mountains, Han River */}
            <SkylineBackground
              mouseX={mouseX}
              scrollYProgress={scrollYProgress}
              prefersReduced={!!prefersReduced}
            />

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

        {/* Mobile scroll affordance: edge fades hinting more buildings off-screen */}
        <div
          className="md:hidden absolute left-0 top-0 bottom-0 w-8 pointer-events-none"
          style={{ background: "linear-gradient(to right, #04090f, transparent)" }}
        />
        <div
          className="md:hidden absolute right-0 top-0 bottom-0 w-12 pointer-events-none"
          style={{ background: "linear-gradient(to left, #04090f, transparent)" }}
        />
      </div>
      <p className="md:hidden text-center text-xs text-zinc-500 mt-3 relative z-10">
        {ss.swipeHint}
      </p>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div className="text-center mt-8 relative z-10">
        <Link
          href="/guide"
          className="inline-flex items-center gap-2 bg-[#ffd966] hover:bg-[#f5c842] active:bg-[#e8b800] text-[#1a1a1a] font-semibold rounded-full px-7 py-3 text-sm transition-colors"
        >
          {ss.browseAll}
        </Link>
      </div>
    </section>
  );
}
