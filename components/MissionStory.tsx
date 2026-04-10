"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useLocale } from "@/lib/i18n";

// Positional layout data for worry phrases (positions don't change with locale)
const worryLayout = [
  { top: "8%",  left: "5%",  size: "text-base", maxOpacity: 0.7 },
  { top: "22%", left: "30%", size: "text-2xl",  maxOpacity: 0.8 },
  { top: "14%", left: "58%", size: "text-xl",   maxOpacity: 0.5 },
  { top: "36%", left: "6%",  size: "text-base", maxOpacity: 0.45 },
  { top: "44%", left: "64%", size: "text-xl",   maxOpacity: 0.65 },
  { top: "56%", left: "22%", size: "text-2xl",  maxOpacity: 0.75 },
  { top: "10%", left: "38%", size: "text-xl",   maxOpacity: 0.6 },
  { top: "68%", left: "7%",  size: "text-base", maxOpacity: 0.55 },
  { top: "76%", left: "68%", size: "text-base", maxOpacity: 0.5 },
  { top: "48%", left: "40%", size: "text-2xl",  maxOpacity: 0.85 },
  { top: "18%", left: "72%", size: "text-base", maxOpacity: 0.4 },
  { top: "62%", left: "52%", size: "text-xl",   maxOpacity: 0.65 },
  { top: "32%", left: "54%", size: "text-base", maxOpacity: 0.55 },
  { top: "82%", left: "28%", size: "text-xl",   maxOpacity: 0.6 },
  { top: "72%", left: "44%", size: "text-2xl",  maxOpacity: 0.7 },
  { top: "4%",  left: "62%", size: "text-base", maxOpacity: 0.5 },
  { top: "86%", left: "58%", size: "text-base", maxOpacity: 0.45 },
  { top: "40%", left: "20%", size: "text-xl",   maxOpacity: 0.6 },
];

function WorryPhrase({
  text, top, left, size, maxOpacity, enterStart, scrollYProgress,
}: {
  text: string; top: string; left: string; size: string; maxOpacity: number;
  enterStart: number; scrollYProgress: MotionValue<number>;
}) {
  const enterEnd = enterStart + 0.02;
  const opacity = useTransform(scrollYProgress, (p) => {
    if (p < enterStart) return 0;
    if (p < enterEnd) return maxOpacity * ((p - enterStart) / 0.02);
    if (p < 0.48) return maxOpacity;
    if (p < 0.50) return maxOpacity * (1 - (p - 0.48) / 0.02);
    return 0;
  });
  return (
    <motion.span
      className={`absolute font-medium italic text-white ${size}`}
      style={{ top, left, opacity }}
    >
      {text}
    </motion.span>
  );
}

export default function MissionStory() {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Helper: linear interpolation between ranges
  function lerp(p: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    if (p <= inMin) return outMin;
    if (p >= inMax) return outMax;
    return outMin + (outMax - outMin) * ((p - inMin) / (inMax - inMin));
  }

  // Use callback-based useTransform (different FM code path than range mapping)
  const phase1Opacity = useTransform(scrollYProgress, (p) =>
    p < 0.18 ? 1 : p < 0.25 ? lerp(p, 0.18, 0.25, 1, 0) : 0
  );
  const yellowBgOpacity = useTransform(scrollYProgress, (p) =>
    lerp(p, 0.5, 0.65, 0, 1)
  );
  const phase3TextOpacity = useTransform(scrollYProgress, (p) =>
    p < 0.5 ? 0 : p < 0.55 ? lerp(p, 0.5, 0.55, 0, 1) : p < 0.7 ? 1 : p < 0.75 ? lerp(p, 0.7, 0.75, 1, 0) : 0
  );
  const phase4Opacity = useTransform(scrollYProgress, (p) =>
    lerp(p, 0.75, 0.80, 0, 1)
  );
  const pillarStagger1 = useTransform(scrollYProgress, (p) =>
    lerp(p, 0.80, 0.84, 0, 1)
  );
  const pillarStagger2 = useTransform(scrollYProgress, (p) =>
    lerp(p, 0.83, 0.87, 0, 1)
  );
  const pillarStagger3 = useTransform(scrollYProgress, (p) =>
    lerp(p, 0.86, 0.90, 0, 1)
  );
  const pillarOpacities = [pillarStagger1, pillarStagger2, pillarStagger3];

  // Mobile: simple static layout
  if (isMobile) {
    return (
      <section id="mission" className="bg-[#0a0a0a] px-6 py-16">
        <div className="mx-auto max-w-md">
          <p className="mb-2 text-lg text-white/50">{t.mission.phase1}</p>
          <div className="mb-8 flex flex-col gap-2">
            {t.mission.worries.slice(0, 8).map((w, i) => (
              <p key={i} className="text-sm italic text-white/50">{w}</p>
            ))}
          </div>
          <div className="rounded-2xl bg-[#ffd966] p-8 text-center">
            <h2 className="mb-8 text-3xl font-bold text-[#1a1a1a]">
              {t.mission.hiNeighbors}
            </h2>
            <div className="flex flex-col gap-8 text-left">
              {t.mission.pillars.map((p) => (
                <div key={p.title} className="flex flex-col gap-2">
                  <span className="text-3xl">{p.icon}</span>
                  <h3 className="text-lg font-bold text-[#1a1a1a]">{p.title}</h3>
                  <p className="text-base leading-relaxed text-[#1a1a1a]/70">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="mission" ref={containerRef} className="relative" style={{ height: "600vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Dark background */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Yellow background overlay */}
        <motion.div
          className="absolute inset-0 bg-[#ffd966]"
          style={{ opacity: yellowBgOpacity }}
        />

        {/* Phase 1 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: phase1Opacity }}
        >
          <h2 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            {t.mission.phase1}
          </h2>
        </motion.div>

        {/* Phase 2: Worry phrases */}
        <div className="absolute inset-0">
          {t.mission.worries.map((text, i) => (
            <WorryPhrase
              key={i}
              text={text}
              top={worryLayout[i].top}
              left={worryLayout[i].left}
              size={worryLayout[i].size}
              maxOpacity={worryLayout[i].maxOpacity}
              enterStart={0.25 + i * 0.012}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Phase 3: Knock knock */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: phase3TextOpacity }}
        >
          <h2 className="text-4xl font-bold text-[#1a1a1a] md:text-6xl lg:text-7xl">
            {t.mission.knockKnock}
          </h2>
        </motion.div>

        {/* Phase 4: Hi neighbors + pillars */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6"
          style={{ opacity: phase4Opacity }}
        >
          <h2 className="text-4xl font-bold text-[#1a1a1a] md:text-5xl lg:text-6xl">
            {t.mission.hiNeighbors}
          </h2>
          <div className="grid max-w-5xl gap-8 md:grid-cols-3">
            {t.mission.pillars.map((p, i) => (
              <motion.div
                key={p.title}
                className="flex flex-col gap-3"
                style={{ opacity: pillarOpacities[i] }}
              >
                <span className="text-3xl">{p.icon}</span>
                <h3 className="text-lg font-bold text-[#1a1a1a]">{p.title}</h3>
                <p className="text-base leading-relaxed text-[#1a1a1a]/70">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
