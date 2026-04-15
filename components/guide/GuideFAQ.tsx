"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import type { Locale } from "@/lib/i18n/types";

export interface FAQItem {
  q: string;
  a: string;
  qKo?: string; aKo?: string;
  qJa?: string; aJa?: string;
  qZhCN?: string; aZhCN?: string;
  qZhTW?: string; aZhTW?: string;
  qPt?: string; aPt?: string;
  qEs?: string; aEs?: string;
}

const FAQ_TITLE: Record<Locale, string> = {
  en: "Frequently Asked Questions",
  ko: "자주 묻는 질문",
  ja: "よくある質問",
  "zh-CN": "常见问题",
  "zh-TW": "常見問題",
  pt: "Perguntas Frequentes",
  es: "Preguntas Frecuentes",
};

function getLocalizedFAQ(item: FAQItem, locale: Locale) {
  if (locale === "ko") return { q: item.qKo ?? item.q, a: item.aKo ?? item.a };
  if (locale === "ja") return { q: item.qJa ?? item.q, a: item.aJa ?? item.a };
  if (locale === "zh-CN") return { q: item.qZhCN ?? item.q, a: item.aZhCN ?? item.a };
  if (locale === "zh-TW") return { q: item.qZhTW ?? item.q, a: item.aZhTW ?? item.a };
  if (locale === "pt") return { q: item.qPt ?? item.q, a: item.aPt ?? item.a };
  if (locale === "es") return { q: item.qEs ?? item.q, a: item.aEs ?? item.a };
  return { q: item.q, a: item.a };
}

interface GuideFAQProps {
  faqs: FAQItem[];
  locale: Locale;
}

export default function GuideFAQ({ faqs, locale }: GuideFAQProps) {
  const [open, setOpen] = useState<number | null>(null);
  const title = FAQ_TITLE[locale] ?? FAQ_TITLE.en;

  return (
    <section className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
          {title}
        </h2>
        <div className="space-y-0 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 overflow-hidden">
          {faqs.map((item, i) => {
            const { q, a } = getLocalizedFAQ(item, locale);
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-zinc-50"
                >
                  <span className="font-medium text-zinc-900 leading-snug">{q}</span>
                  <span className="mt-0.5 shrink-0 text-zinc-400">
                    {open === i ? <Minus size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
                  </span>
                </button>
                {open === i && (
                  <div className="border-t border-zinc-100 bg-zinc-50 px-6 py-4">
                    <p className="text-sm leading-relaxed text-zinc-600">{a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
