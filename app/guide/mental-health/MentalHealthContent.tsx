"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import CultureShockGuide from "@/components/guide/mental-health/CultureShockGuide";
import TherapistDirectory from "@/components/guide/mental-health/TherapistDirectory";
import CrisisResources from "@/components/guide/mental-health/CrisisResources";
import SupportGroups from "@/components/guide/mental-health/SupportGroups";
import SelfCareGuide from "@/components/guide/mental-health/SelfCareGuide";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";
import type { Locale } from "@/lib/i18n/types";

const STRINGS: Record<Locale, {
  eyebrow: string;
  h1: string;
  subtitle: string;
  updated: string;
}> = {
  en: {
    eyebrow: "Mind & Wellbeing",
    h1: "You're allowed\nto struggle.",
    subtitle: "Living in a foreign country is hard. Culture shock is real. Loneliness is real. You're not alone in this — and help is here.",
    updated: "Last updated: March 2026",
  },
  ko: {
    eyebrow: "마음 건강",
    h1: "힘든 게\n당연해요.",
    subtitle: "낯선 나라에서 사는 건 쉽지 않습니다. 외국인 누구나 겪는 이야기예요. 여기서 당신 혼자가 아닙니다.",
    updated: "마지막 업데이트: 2026년 3월",
  },
  ja: {
    eyebrow: "心の健康",
    h1: "苦しんでも\n大丈夫。",
    subtitle: "異国での生活は簡単ではありません。カルチャーショックも孤独感も本物です。あなたは一人ではありません。",
    updated: "最終更新: 2026年3月",
  },
  "zh-CN": {
    eyebrow: "心理健康",
    h1: "挣扎是被\n允许的。",
    subtitle: "在异国生活并不容易。文化冲击是真实的，孤独感也是真实的。你并不孤单——帮助就在这里。",
    updated: "最后更新: 2026年3月",
  },
  "zh-TW": {
    eyebrow: "心理健康",
    h1: "掙扎是被\n允許的。",
    subtitle: "在異國生活並不容易。文化衝擊是真實的，孤獨感也是真實的。你並不孤單——幫助就在這裡。",
    updated: "最後更新: 2026年3月",
  },
  pt: {
    eyebrow: "Saúde Mental",
    h1: "Você tem\npermissão para lutar.",
    subtitle: "Viver em um país estrangeiro é difícil. O choque cultural é real. A solidão é real. Você não está sozinho nisso — e há ajuda aqui.",
    updated: "Última atualização: Março de 2026",
  },
  es: {
    eyebrow: "Salud Mental",
    h1: "Está bien\nluchar.",
    subtitle: "Vivir en un país extranjero es difícil. El choque cultural es real. La soledad es real. No estás solo en esto — y hay ayuda aquí.",
    updated: "Última actualización: Marzo de 2026",
  },
};

function MentalHealthContent() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <>
      <SharedNavbar />
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {s.eyebrow}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {s.h1}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {s.subtitle}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {s.updated}
            </p>
          </div>
        </section>
        <CultureShockGuide />
        <TherapistDirectory />
        <CrisisResources />
        <SupportGroups />
        <SelfCareGuide />
        <GuideFAQ faqs={GUIDE_FAQS["mental-health"]} locale={locale} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function MentalHealthPage() {
  return (
    <LocaleProvider>
      <MentalHealthContent />
    </LocaleProvider>
  );
}
