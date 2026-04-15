"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import CulturalTips from "@/components/guide/CulturalTips";
import EmergencyCard from "@/components/guide/EmergencyCard";
import AskNeighbor from "@/components/guide/AskNeighbor";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";

const STRINGS: Record<Locale, {
  label: string;
  h1: string;
  sub: string;
  updated: string;
}> = {
  en: {
    label: "In a pinch",
    h1: "For when things\nget confusing",
    sub: "Unwritten rules, emergency prep, and a real neighbor to ask when you're stuck.",
    updated: "Last updated: March 2026",
  },
  ko: {
    label: "급할 때",
    h1: "막막할 때\n펼쳐보세요",
    sub: "불문율, 비상 상황, 그리고 막막할 때 물어볼 수 있는 이웃.",
    updated: "마지막 업데이트: 2026년 3월",
  },
  ja: {
    label: "いざという時",
    h1: "困ったときの\nガイド",
    sub: "暗黙のルール、緊急事態への備え、困ったときに聞けるご近所さん。",
    updated: "最終更新: 2026年3月",
  },
  "zh-CN": {
    label: "紧急情况",
    h1: "遇到麻烦时\n打开这里",
    sub: "潜规则、紧急情况准备，以及遇到困难时可以咨询的邻居。",
    updated: "最后更新: 2026年3月",
  },
  "zh-TW": {
    label: "緊急情況",
    h1: "遇到麻煩時\n打開這裡",
    sub: "潛規則、緊急情況準備，以及遇到困難時可以諮詢的鄰居。",
    updated: "最後更新: 2026年3月",
  },
  pt: {
    label: "Numa emergência",
    h1: "Para quando\nas coisas ficam confusas",
    sub: "Regras não escritas, preparo para emergências e um vizinho real para perguntar quando você ficar perdido.",
    updated: "Última atualização: março de 2026",
  },
  es: {
    label: "En apuros",
    h1: "Para cuando\nlas cosas se complican",
    sub: "Reglas no escritas, preparación para emergencias y un vecino real a quien preguntar cuando estés perdido.",
    updated: "Última actualización: marzo de 2026",
  },
};

function PinchContent() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;
  return (
    <>
      <SharedNavbar />
      <main>
        <section className="bg-[#fafaf8] px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {s.label}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {s.h1}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {s.sub}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {s.updated}
            </p>
          </div>
        </section>
        <CulturalTips />
        <EmergencyCard />
        <AskNeighbor />
        <GuideFAQ faqs={GUIDE_FAQS["pinch"]} locale={locale} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function PinchPage() {
  return (
    <LocaleProvider>
      <PinchContent />
    </LocaleProvider>
  );
}
