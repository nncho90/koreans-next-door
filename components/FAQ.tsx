"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";
import { getJsxFaqAnswers } from "@/lib/i18n/rich";
import { en } from "@/lib/i18n/en";
import { jsonLd } from "@/lib/jsonLd";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { t, locale } = useLocale();
  const jsxAnswers = getJsxFaqAnswers(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@type": "FAQPage",
          "mainEntity": en.faq.items.filter((item) => item.a).map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a,
            },
          })),
        })}
      />
      <section id="faq" className="bg-[#fafaf8] px-6 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">

        <div className="grid grid-cols-1 gap-16 md:grid-cols-[2fr_3fr]">
          {/* Left: label + heading */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {t.faq.label}
            </p>
            <h2 className="text-4xl font-bold leading-none tracking-tighter text-zinc-950 md:text-5xl">
              {t.faq.heading}
            </h2>
          </div>

          {/* Right: accordion */}
          <div className="divide-y border-t border-zinc-200">
            {t.faq.items.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-zinc-950">
                    {item.q}
                  </span>
                  {open === i ? (
                    <Minus size={16} weight="bold" className="shrink-0 text-zinc-400" />
                  ) : (
                    <Plus size={16} weight="bold" className="shrink-0 text-zinc-400" />
                  )}
                </button>
                {open === i && (
                  <p className="pb-6 text-base leading-relaxed text-zinc-500">
                    {jsxAnswers[i] ?? item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
    </>
  );
}
