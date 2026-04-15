"use client";

import { useLocale } from "@/lib/i18n";

export default function Mission() {
  const { t } = useLocale();
  const { whoWeAre, heading1, heading2, body } = t.missionAbout;

  return (
    <section id="mission" className="bg-white px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {whoWeAre}
        </p>
        <h2 className="mb-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#1a1a1a] md:text-5xl">
          {heading1}{" "}
          <span className="text-[#ffd966]">{heading2}</span>
        </h2>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-500">{body}</p>

        <div className="grid gap-8 md:grid-cols-3">
          {t.mission.pillars.map((p) => (
            <div key={p.title} className="flex flex-col gap-3">
              <span className="text-3xl">{p.icon}</span>
              <h3 className="text-lg font-bold text-[#1a1a1a]">{p.title}</h3>
              <p className="text-base leading-relaxed text-gray-500">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
