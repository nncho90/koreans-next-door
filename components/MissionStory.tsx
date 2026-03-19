"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const pillars = [
  {
    icon: "\u{1F3D8}\uFE0F",
    title: "Just neighbors",
    body: "Not a formal organization or a tour agency. Just a group of friends who believe hospitality turns an unfamiliar city into a familiar home.",
  },
  {
    icon: "\u{1F30D}",
    title: "Open to everyone",
    body: "Our core members are from Sigwang Church, but our events are not religious. All faiths, backgrounds, and walks of life are warmly welcomed.",
  },
  {
    icon: "\u{1F49B}",
    title: "No hidden agendas",
    body: "We haven\u2019t forgotten how it feels to be welcomed in a foreign country. We just want to be those neighbors to you.",
  },
];

const worries = [
  { text: '"I ordered food and had no idea what arrived."', top: "8%", left: "5%", size: "text-base", maxOpacity: 0.7 },
  { text: '"I haven\'t had a real conversation in weeks."', top: "22%", left: "30%", size: "text-2xl", maxOpacity: 0.8 },
  { text: '"Everyone stares at me on the subway."', top: "14%", left: "58%", size: "text-xl", maxOpacity: 0.5 },
  { text: '"My coworkers eat lunch together and I just sit alone."', top: "36%", left: "6%", size: "text-base", maxOpacity: 0.45 },
  { text: '"I can\'t even read the signs."', top: "44%", left: "64%", size: "text-xl", maxOpacity: 0.65 },
  { text: '"I called my mom crying last night."', top: "56%", left: "22%", size: "text-2xl", maxOpacity: 0.75 },
  { text: '"Nobody warned me it would be this lonely."', top: "10%", left: "38%", size: "text-xl", maxOpacity: 0.6 },
  { text: '"I don\'t know how to make Korean friends."', top: "68%", left: "7%", size: "text-base", maxOpacity: 0.55 },
  { text: '"I spend every weekend alone."', top: "76%", left: "68%", size: "text-base", maxOpacity: 0.5 },
  { text: '"I feel invisible here."', top: "48%", left: "40%", size: "text-2xl", maxOpacity: 0.85 },
  { text: '"I got lost and couldn\'t ask anyone for help."', top: "18%", left: "72%", size: "text-base", maxOpacity: 0.4 },
  { text: '"Is it always going to feel like this?"', top: "62%", left: "52%", size: "text-xl", maxOpacity: 0.65 },
  { text: '"I ate dinner alone. Again."', top: "32%", left: "54%", size: "text-base", maxOpacity: 0.55 },
  { text: '"I thought it would get easier."', top: "82%", left: "28%", size: "text-xl", maxOpacity: 0.6 },
  { text: '"Some days I wonder why I came."', top: "72%", left: "44%", size: "text-2xl", maxOpacity: 0.7 },
  { text: '"The silence in my apartment is deafening."', top: "4%", left: "62%", size: "text-base", maxOpacity: 0.5 },
  { text: '"I miss having people who just get it."', top: "86%", left: "58%", size: "text-base", maxOpacity: 0.45 },
  { text: '"My Korean is still terrible after a year."', top: "40%", left: "20%", size: "text-xl", maxOpacity: 0.6 },
];

function WorryPhrase({
  text, top, left, size, maxOpacity, enterStart, scrollYProgress,
}: {
  text: string; top: string; left: string; size: string; maxOpacity: number;
  enterStart: number; scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [enterStart, enterStart + 0.02, 0.48, 0.50],
    [0, maxOpacity, maxOpacity, 0]
  );
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

  // Phase 1 (0-0.25): "You just moved to Seoul."
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);

  // Phase 2 (0.25-0.5): Worry phrases — stagger computed per-phrase in WorryPhrase component

  // Phase 3 (0.5-0.75): "Then someone knocks."
  const yellowBgOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const phase3TextOpacity = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);

  // Phase 4 (0.75-1.0): Full yellow + pillars
  const phase4Opacity = useTransform(scrollYProgress, [0.75, 0.82], [0, 1]);
  const pillarStagger1 = useTransform(scrollYProgress, [0.82, 0.88], [0, 1]);
  const pillarStagger2 = useTransform(scrollYProgress, [0.86, 0.92], [0, 1]);
  const pillarStagger3 = useTransform(scrollYProgress, [0.90, 0.96], [0, 1]);
  const pillarOpacities = [pillarStagger1, pillarStagger2, pillarStagger3];

  // Mobile: simple static layout
  if (isMobile) {
    return (
      <section id="mission" className="bg-[#0a0a0a] px-6 py-16">
        <div className="mx-auto max-w-md">
          <p className="mb-2 text-lg text-white/50">You just moved to Seoul.</p>
          <div className="mb-8 flex flex-col gap-2">
            {worries.slice(0, 8).map((w) => (
              <p key={w.text} className="text-sm italic text-white/50">{w.text}</p>
            ))}
          </div>
          <div className="rounded-2xl bg-[#ffd966] p-8 text-center">
            <h2 className="mb-8 text-3xl font-bold text-[#1a1a1a]">
              Hey, we&apos;re your neighbors.
            </h2>
            <div className="flex flex-col gap-8 text-left">
              {pillars.map((p) => (
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
    <section id="mission" ref={containerRef} style={{ height: "400vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Dark background (always present, fades out as yellow comes in) */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Yellow background overlay */}
        <motion.div
          className="absolute inset-0 bg-[#ffd966]"
          style={{ opacity: yellowBgOpacity }}
        />

        {/* Phase 1: "You just moved to Seoul." */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: phase1Opacity }}
        >
          <h2 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            You just moved to Seoul.
          </h2>
        </motion.div>

        {/* Phase 2: Worry phrases flood in staggered */}
        <div className="absolute inset-0">
          {worries.map((w, i) => (
            <WorryPhrase
              key={w.text}
              text={w.text}
              top={w.top}
              left={w.left}
              size={w.size}
              maxOpacity={w.maxOpacity}
              enterStart={0.25 + i * 0.012}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Phase 3: "Then someone knocks." */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: phase3TextOpacity }}
        >
          <h2 className="text-4xl font-bold text-[#1a1a1a] md:text-6xl lg:text-7xl">
            Knock knock.
          </h2>
          <p className="mt-4 text-xl text-[#1a1a1a]/70 md:text-2xl">
            Hi, we&apos;re your neighbors.
          </p>
        </motion.div>

        {/* Phase 4: "Hey, we're your neighbors." + pillars */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6"
          style={{ opacity: phase4Opacity }}
        >
          <h2 className="text-4xl font-bold text-[#1a1a1a] md:text-5xl lg:text-6xl">
            Hey, we&apos;re your neighbors.
          </h2>
          <div className="grid max-w-5xl gap-8 md:grid-cols-3">
            {pillars.map((p, i) => (
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
