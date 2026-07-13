"use client";

import Link from "next/link";
import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import { guideGroups, guideCategories, getGuideLabel, getGuideDesc, getGuideCategoryLabel } from "@/lib/guideData";

// Column counts chosen so items always fill complete rows (no zinc-200 slabs
// showing through the gap-px grid) at every breakpoint. Mobile base is always
// 2 columns for a compact, scannable layout.
function categoryGridClass(count: number): string {
  switch (count) {
    case 1: return "grid-cols-1";
    case 2: return "grid-cols-2";
    case 3: return "grid-cols-2 sm:grid-cols-3";
    default: return "grid-cols-2 lg:grid-cols-4";
  }
}

// True when a row would otherwise leave a trailing empty (grey) cell on the
// mobile 2-column grid, so we add one invisible white filler cell.
function needsMobileFiller(count: number): boolean {
  return count >= 2 && count % 2 === 1;
}

function GuideHubInner() {
  const { locale, t } = useLocale();
  const gs = t.guideSection;

  return (
    <>
      <SharedNavbar />
      <main>
        {/* Page header */}
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
              {gs.label}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl whitespace-pre-line">
              {gs.heading}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">{gs.descHub}</p>
          </div>
        </section>

        {/* Guide categories */}
        <section className="bg-white px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl space-y-10">
            {guideCategories.map((cat) => {
              const catGuides = guideGroups.filter((g) => g.category === cat.id);
              return (
                <div key={cat.id}>
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                    {getGuideCategoryLabel(cat, locale)}
                  </p>
                  <div className={`grid gap-px bg-zinc-200 ${categoryGridClass(catGuides.length)} rounded-2xl overflow-hidden`}>
                    {catGuides.map((g) => (
                      <Link
                        key={g.href}
                        href={g.href}
                        className="group flex flex-col bg-white p-4 transition-colors duration-200 hover:bg-zinc-50 sm:p-6"
                      >
                        <div className="mb-2 text-3xl sm:mb-4">{g.emoji}</div>
                        <h2 className="text-sm font-bold text-zinc-950 leading-snug sm:mb-1.5">
                          {getGuideLabel(g, locale)}
                        </h2>
                        <p className="mb-4 hidden flex-1 text-xs leading-relaxed text-zinc-500 sm:block">
                          {getGuideDesc(g, locale)}
                        </p>
                        <div className="hidden items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors group-hover:text-[#c9a800] sm:flex">
                          {gs.open}
                          <span className="transition-transform group-hover:translate-x-0.5">→</span>
                        </div>
                      </Link>
                    ))}
                    {needsMobileFiller(catGuides.length) && (
                      <div className="bg-white sm:hidden" aria-hidden="true" />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Tools row */}
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {t.navbar.tools}
              </p>
              <div className="grid gap-px bg-zinc-200 grid-cols-2 sm:grid-cols-3 rounded-2xl overflow-hidden">
                {[
                  { href: "/tools/address", emoji: "🏠", label: gs.toolAddressLabel, desc: gs.toolAddressDesc },
                  { href: "/tools/phrasebook", emoji: "💬", label: gs.toolPhrasebookLabel, desc: gs.toolPhrasebookDesc },
                  { href: "/tools/forms", emoji: "📄", label: gs.toolFormDecoderLabel, desc: gs.toolFormDecoderDesc },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex flex-col bg-white p-4 transition-colors duration-200 hover:bg-zinc-50 sm:p-6"
                  >
                    <div className="mb-2 text-3xl sm:mb-4">{tool.emoji}</div>
                    <h2 className="text-sm font-bold text-zinc-950 sm:mb-1.5">{tool.label}</h2>
                    <p className="mb-4 hidden flex-1 text-xs leading-relaxed text-zinc-500 sm:block">{tool.desc}</p>
                    <div className="hidden items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors group-hover:text-[#c9a800] sm:flex">
                      {gs.open}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                  </Link>
                ))}
                <div className="bg-white sm:hidden" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
    </>
  );
}

export default function GuideHubContent() {
  return (
    <LocaleProvider>
      <GuideHubInner />
    </LocaleProvider>
  );
}
