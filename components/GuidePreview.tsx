"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import { guideGroups, guideCategories, getGuideLabel, getGuideDesc, getGuideCategoryLabel } from "@/lib/guideData";

export default function GuidePreview() {
  const { locale, t } = useLocale();
  const gs = t.guideSection;

  return (
    <section id="guide" className="bg-zinc-950 px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {gs.label}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl whitespace-pre-line">
              {gs.heading}
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-400">{gs.desc}</p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {guideCategories.map((cat) => {
            const catGuides = guideGroups.filter((g) => g.category === cat.id);
            return (
              <div key={cat.id}>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                  {getGuideCategoryLabel(cat, locale)}
                </p>
                <div className="grid gap-px bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden">
                  {catGuides.map((g) => (
                    <Link
                      key={g.href}
                      href={g.href}
                      className="group flex flex-col bg-zinc-900 p-6 transition-colors duration-200 hover:bg-zinc-800"
                    >
                      <div className="mb-4 text-3xl">{g.emoji}</div>
                      <h3 className="mb-1.5 text-sm font-bold text-white leading-snug">
                        {getGuideLabel(g, locale)}
                      </h3>
                      <p className="mb-4 flex-1 text-xs leading-relaxed text-zinc-500">
                        {getGuideDesc(g, locale)}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-600 transition-colors group-hover:text-[#ffd966]">
                        {gs.open}
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tools row */}
        <div className="mt-8">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            {t.navbar.tools}
          </p>
          <div className="grid gap-px bg-zinc-800 sm:grid-cols-2 rounded-2xl overflow-hidden">
            {[
              { href: "/tools/phrasebook", emoji: "💬", label: gs.toolPhrasebookLabel, desc: gs.toolPhrasebookDesc },
              { href: "/tools/forms", emoji: "📄", label: gs.toolFormDecoderLabel, desc: gs.toolFormDecoderDesc },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col bg-zinc-900 p-6 transition-colors duration-200 hover:bg-zinc-800"
              >
                <div className="mb-4 text-3xl">{tool.emoji}</div>
                <h3 className="mb-1.5 text-sm font-bold text-white">{tool.label}</h3>
                <p className="mb-4 flex-1 text-xs leading-relaxed text-zinc-500">{tool.desc}</p>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-600 transition-colors group-hover:text-[#ffd966]">
                  {gs.open}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
