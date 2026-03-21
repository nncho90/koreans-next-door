"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useLocale } from "@/lib/i18n";

const metricDefs = [
  { target: 47 },
  { target: 200, suffix: "+" },
  { target: 12 },
  { target: 1 },
];

function AnimatedNumber({
  target,
  prefix = "",
  suffix = "",
  countDown = false,
  delay,
  inView,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  countDown?: boolean;
  delay: number;
  inView: boolean;
}) {
  const [value, setValue] = useState(countDown ? 100 : 0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [inView, delay, started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1600;
    const startTime = performance.now();
    const from = countDown ? 100 : 0;
    const to = target;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      setValue(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [started, target, countDown]);

  return (
    <span>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default function ImpactCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLocale();

  return (
    <section ref={ref} className="bg-[#ffd966] py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {metricDefs.map((m, i) => (
            <div key={i} className="text-center">
              <p className="text-5xl md:text-7xl font-black tracking-tighter text-[#1a1a1a]">
                <AnimatedNumber
                  target={m.target}
                  suffix={m.suffix}
                  delay={i * 200}
                  inView={inView}
                />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#1a1a1a]/60">
                {t.impact.metrics[i].label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
