"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import FirstWeekChecklist from "@/components/guide/FirstWeekChecklist";
import BureaucracyWizard from "@/components/guide/BureaucracyWizard";
import SurvivalKit from "@/components/SurvivalKit";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";

const STRINGS: Record<Locale, {
  label: string;
  h1: string;
  sub: string;
  updated: string;
}> = {
  en: {
    label: "Settle in",
    h1: "Get the basics\nsorted first",
    sub: "ARC (외국인등록증), bank account, health insurance, essential apps. The stuff you actually need to handle first.",
    updated: "Last updated: March 2026",
  },
  ko: {
    label: "정착하기",
    h1: "첫 단추를\n잘 꿰어봐요",
    sub: "외국인등록증(ARC), 은행, 건강보험, 필수 앱. 처음에 해야 할 것들.",
    updated: "마지막 업데이트: 2026년 3월",
  },
  ja: {
    label: "定住する",
    h1: "まず基本を\n整えよう",
    sub: "外国人登録証(외국인등록증/ARC)、銀行口座、健康保険、必須アプリ。最初にやるべきこと。",
    updated: "最終更新: 2026年3月",
  },
  "zh-CN": {
    label: "安家落户",
    h1: "先把基础\n打好",
    sub: "外国人登录证(외국인등록증/ARC)、银行账户、健康保险、必备应用。刚到首先要处理的事情。",
    updated: "最后更新: 2026年3月",
  },
  "zh-TW": {
    label: "安家落戶",
    h1: "先把基礎\n打好",
    sub: "外國人登錄證(외국인등록증/ARC)、銀行帳戶、健康保險、必備應用程式。剛到首先要處理的事情。",
    updated: "最後更新: 2026年3月",
  },
  pt: {
    label: "Instalar-se",
    h1: "Organize o\nessencial primeiro",
    sub: "Cartão de registro (외국인등록증/ARC), conta bancária, seguro saúde, apps essenciais. O que você precisa resolver logo de cara.",
    updated: "Última atualização: março de 2026",
  },
  es: {
    label: "Instalarse",
    h1: "Organiza lo\nbásico primero",
    sub: "Tarjeta de registro (외국인등록증/ARC), cuenta bancaria, seguro médico, apps esenciales. Lo que necesitas resolver desde el principio.",
    updated: "Última actualización: marzo de 2026",
  },
};

function SettleContent() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;
  return (
    <>
      <SharedNavbar />
      <main>
        <section className="bg-zinc-950 px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {s.label}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
              {s.h1}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-400">
              {s.sub}
            </p>
            <p className="mt-4 text-xs text-zinc-500">
              {s.updated}
            </p>
          </div>
        </section>
        <FirstWeekChecklist />
        <BureaucracyWizard />
        <SurvivalKit />
        <GuideFAQ faqs={GUIDE_FAQS["settle"]} locale={locale} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function SettlePage() {
  return (
    <LocaleProvider>
      <SettleContent />
    </LocaleProvider>
  );
}
