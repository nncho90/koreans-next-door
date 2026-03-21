"use client";

import { useLocale } from "@/lib/i18n";

export default function Events() {
  const { t } = useLocale();
  return (
    <section id="events" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {t.events.label}
        </p>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {t.events.heading}
        </h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          {t.events.subheading}
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {t.events.cards.map((e) => (
            <div
              key={e.title}
              className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="mb-4 block text-4xl">{e.emoji}</span>
              <div className="mb-1 flex items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#ffd966]">
                  {e.type}
                </p>
                {e.date && (
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-400">
                    {e.date}
                  </span>
                )}
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#1a1a1a]">
                {e.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-500">
                {e.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
