"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import ClinicTierExplainer from "@/components/guide/ClinicTierExplainer";
import SpecialtyPicker from "@/components/guide/SpecialtyPicker";
import EnglishClinicMap from "@/components/guide/EnglishClinicMap";
import HealthHotlines from "@/components/guide/HealthHotlines";
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
    eyebrow: "Healthcare",
    h1: "When you're\nnot feeling well",
    subtitle: "Korea's clinic system, English-speaking hospitals, and who to call when you need help.",
    updated: "Last updated: March 2026",
  },
  ko: {
    eyebrow: "의료 안내",
    h1: "아픈 날을\n위한 안내",
    subtitle: "한국의 의료 시스템, 영어 가능한 병원, 그리고 급할 때 연락할 곳.",
    updated: "마지막 업데이트: 2026년 3월",
  },
  ja: {
    eyebrow: "医療ガイド",
    h1: "体調が\n悪いとき",
    subtitle: "韓国の医療制度、英語対応の病院、困ったときの連絡先。",
    updated: "最終更新: 2026年3月",
  },
  "zh-CN": {
    eyebrow: "医疗指南",
    h1: "生病时\n该怎么办",
    subtitle: "韩国的医疗体系、英语友好医院，以及需要帮助时该联系谁。",
    updated: "最后更新: 2026年3月",
  },
  "zh-TW": {
    eyebrow: "醫療指南",
    h1: "身體不適\n時該怎麼辦",
    subtitle: "韓國的醫療體系、英語友善醫院，以及需要幫助時該聯絡誰。",
    updated: "最後更新: 2026年3月",
  },
  pt: {
    eyebrow: "Saúde",
    h1: "Quando você\nnão está bem",
    subtitle: "O sistema de clínicas da Coreia, hospitais com atendimento em inglês e quem ligar quando precisar de ajuda.",
    updated: "Última atualização: Março de 2026",
  },
  es: {
    eyebrow: "Salud",
    h1: "Cuando no\nte sientes bien",
    subtitle: "El sistema de clínicas de Corea, hospitales con atención en inglés y a quién llamar cuando necesites ayuda.",
    updated: "Última actualización: Marzo de 2026",
  },
};

function HealthContent() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <>
      <SharedNavbar />
      <main>
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
        <ClinicTierExplainer />
        <SpecialtyPicker />
        <EnglishClinicMap />
        <HealthHotlines />
        <GuideFAQ faqs={GUIDE_FAQS["health"]} locale={locale} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function HealthPage() {
  return (
    <LocaleProvider>
      <HealthContent />
    </LocaleProvider>
  );
}
