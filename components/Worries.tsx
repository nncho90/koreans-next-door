"use client";

import { useLocale } from "@/lib/i18n";

const BUBBLE_POSITIONS = [
  { x: "left-[4%]", y: "top-[10%]" },
  { x: "left-[30%]", y: "top-[4%]" },
  { x: "right-[5%]", y: "top-[12%]" },
  { x: "left-[8%]", y: "top-[52%]" },
  { x: "right-[8%]", y: "top-[45%]" },
];

const TAG_EMOJIS = ["🏠", "🗣️", "👥", "🍽️", "😔", "📋"];

export default function Worries() {
  const { t } = useLocale();
  const { label, heading, subheading, bubbles, tags } = t.worriesSection;

  return (
    <section className="relative bg-white px-6 py-10 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {label}
        </p>
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {heading}
        </h2>
        <p className="mb-12 text-center text-lg text-gray-500">{subheading}</p>

        {/* Floating bubbles container */}
        <div className="relative mx-auto h-72 max-w-4xl md:h-80">
          {bubbles.map((text, i) => (
            <div
              key={i}
              className={`absolute ${BUBBLE_POSITIONS[i].x} ${BUBBLE_POSITIONS[i].y} max-w-[220px] rounded-2xl bg-[#ede9ff] px-4 py-3 text-sm font-medium leading-snug text-[#3d3470] shadow-sm md:max-w-[260px] md:text-base`}
            >
              {text}
              <span className="absolute -bottom-2 left-5 h-3 w-3 rotate-45 bg-[#ede9ff]" />
            </div>
          ))}

          {/* Central anchor emoji */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl select-none">
            🌏
          </div>
        </div>

        {/* Tag pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {tags.map((label, i) => (
            <span
              key={i}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-[#1a1a1a] shadow-sm"
            >
              {TAG_EMOJIS[i]} {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
