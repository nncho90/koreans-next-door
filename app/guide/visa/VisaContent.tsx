"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import VisaWizard from "@/components/guide/visa/VisaWizard";
import VisaComparisonTable from "@/components/guide/visa/VisaComparisonTable";
import ARCGuide from "@/components/guide/visa/ARCGuide";
import CommonPitfalls from "@/components/guide/visa/CommonPitfalls";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";
import type { Locale } from "@/lib/i18n/types";

const STRINGS: Record<string, Record<Locale, string>> = {
  category: {
    en: "Visa & Immigration",
    ko: "비자 & 이민",
    ja: "ビザ・在留資格",
    "zh-CN": "签证与移民",
    "zh-TW": "簽證與移民",
    pt: "Visto & Imigração",
    es: "Visa e Inmigración",
  },
  heroTitle: {
    en: "Which visa\ndo you need?",
    ko: "어떤 비자가\n필요한가요?",
    ja: "どのビザが\n必要ですか？",
    "zh-CN": "您需要\n哪种签证？",
    "zh-TW": "您需要\n哪種簽證？",
    pt: "Qual visto\nvocê precisa?",
    es: "¿Qué visa\nnecesitas?",
  },
  heroDesc: {
    en: "Korean visa types, how to get your ARC card, and the pitfalls that trip up most newcomers.",
    ko: "한국 비자 종류, ARC 발급 방법, 그리고 자주 하는 실수들을 안내해드립니다.",
    ja: "韓国のビザの種類、外国人登録証（ARC）の取得方法、そして多くの新参者がはまりやすい落とし穴をご紹介します。",
    "zh-CN": "韩国签证类型、如何办理外国人登录证（ARC），以及新来者常犯的错误。",
    "zh-TW": "韓國簽證類型、如何辦理外國人登錄證（ARC），以及新來者常犯的錯誤。",
    pt: "Tipos de visto coreano, como obter seu cartão ARC e as armadilhas que pegam a maioria dos recém-chegados.",
    es: "Tipos de visa coreana, cómo obtener tu tarjeta ARC y los errores más comunes entre los recién llegados.",
  },
  lastUpdated: {
    en: "Last updated: March 2026",
    ko: "마지막 업데이트: 2026년 3월",
    ja: "最終更新：2026年3月",
    "zh-CN": "最后更新：2026年3月",
    "zh-TW": "最後更新：2026年3月",
    pt: "Última atualização: março de 2026",
    es: "Última actualización: marzo 2026",
  },
};

function VisaContent() {
  const { locale } = useLocale();

  return (
    <>
      <SharedNavbar />
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {STRINGS.category[locale]}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {STRINGS.heroTitle[locale]}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {STRINGS.heroDesc[locale]}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {STRINGS.lastUpdated[locale]}
            </p>
          </div>
        </section>

        <VisaWizard />
        <VisaComparisonTable />
        <ARCGuide />
        <CommonPitfalls />
        <GuideFAQ faqs={GUIDE_FAQS["visa"]} locale={locale} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function VisaPage() {
  return (
    <LocaleProvider>
      <VisaContent />
    </LocaleProvider>
  );
}
