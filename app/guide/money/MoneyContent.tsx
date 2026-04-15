"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import BankGuide from "@/components/guide/money/BankGuide";
import TransferComparison from "@/components/guide/money/TransferComparison";
import CostOfLivingCalculator from "@/components/guide/money/CostOfLivingCalculator";
import TaxPensionGuide from "@/components/guide/money/TaxPensionGuide";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";

const STRINGS: Record<
  Locale,
  {
    sectionLabel: string;
    h1: string;
    subheading: string;
    lastUpdated: string;
    navBanks: string;
    navTransfers: string;
    navCost: string;
    navTaxes: string;
  }
> = {
  en: {
    sectionLabel: "Money & Banking",
    h1: "Your money\nin Korea",
    subheading:
      "Bank accounts, international transfers, cost of living, taxes, and pension — everything financial you need as a foreigner in Korea.",
    lastUpdated: "Last updated: March 2026",
    navBanks: "🏦 Bank Accounts",
    navTransfers: "💸 Transfers",
    navCost: "📊 Cost Calculator",
    navTaxes: "📋 Taxes & Pension",
  },
  ko: {
    sectionLabel: "금융 안내",
    h1: "돈 관리,\n어렵지 않아요",
    subheading:
      "은행 계좌 개설부터 해외 송금, 생활비 계산, 세금과 연금까지 — 외국인을 위한 금융 완전 가이드.",
    lastUpdated: "마지막 업데이트: 2026년 3월",
    navBanks: "🏦 은행 계좌",
    navTransfers: "💸 해외 송금",
    navCost: "📊 생활비 계산기",
    navTaxes: "📋 세금 & 연금",
  },
  ja: {
    sectionLabel: "お金と銀行",
    h1: "韓国での\nお金の管理",
    subheading:
      "銀行口座の開設、海外送金、生活費、税金と年金まで — 韓国在住外国人のための金融完全ガイド。",
    lastUpdated: "最終更新: 2026年3月",
    navBanks: "🏦 銀行口座",
    navTransfers: "💸 海外送金",
    navCost: "📊 生活費計算",
    navTaxes: "📋 税金 & 年金",
  },
  "zh-CN": {
    sectionLabel: "金融指南",
    h1: "在韩国\n管理财务",
    subheading:
      "从开设银行账户、国际汇款、生活费计算，到税务和年金 — 外国人在韩国的全面金融指南。",
    lastUpdated: "最后更新：2026年3月",
    navBanks: "🏦 银行账户",
    navTransfers: "💸 国际汇款",
    navCost: "📊 生活费计算",
    navTaxes: "📋 税务 & 年金",
  },
  "zh-TW": {
    sectionLabel: "金融指南",
    h1: "在韓國\n管理財務",
    subheading:
      "從開設銀行帳戶、國際匯款、生活費計算，到稅務和年金 — 外國人在韓國的全面金融指南。",
    lastUpdated: "最後更新：2026年3月",
    navBanks: "🏦 銀行帳戶",
    navTransfers: "💸 國際匯款",
    navCost: "📊 生活費計算",
    navTaxes: "📋 稅務 & 年金",
  },
  pt: {
    sectionLabel: "Dinheiro & Banco",
    h1: "Seu dinheiro\nna Coreia",
    subheading:
      "Contas bancárias, transferências internacionais, custo de vida, impostos e previdência — tudo que você precisa saber sobre finanças como estrangeiro na Coreia.",
    lastUpdated: "Última atualização: março de 2026",
    navBanks: "🏦 Contas Bancárias",
    navTransfers: "💸 Transferências",
    navCost: "📊 Calculadora de Custo",
    navTaxes: "📋 Impostos & Previdência",
  },
  es: {
    sectionLabel: "Dinero & Banca",
    h1: "Tu dinero\nen Corea",
    subheading:
      "Cuentas bancarias, transferencias internacionales, costo de vida, impuestos y pensión — todo lo financiero que necesitas como extranjero en Corea.",
    lastUpdated: "Última actualización: marzo de 2026",
    navBanks: "🏦 Cuentas Bancarias",
    navTransfers: "💸 Transferencias",
    navCost: "📊 Calculadora de Costo",
    navTaxes: "📋 Impuestos & Pensión",
  },
};

function MoneyContent() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  const navItems = [
    { href: "#banks", label: s.navBanks },
    { href: "#transfers", label: s.navTransfers },
    { href: "#cost-of-living", label: s.navCost },
    { href: "#taxes", label: s.navTaxes },
  ];

  return (
    <>
      <SharedNavbar />
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {s.sectionLabel}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl whitespace-pre-line">
              {s.h1}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {s.subheading}
            </p>
            <p className="mt-4 text-xs text-zinc-400">{s.lastUpdated}</p>

            {/* Quick navigation pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm font-semibold text-zinc-600 hover:border-zinc-300 hover:bg-white hover:text-zinc-900 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <BankGuide />
        <TransferComparison />
        <CostOfLivingCalculator />
        <TaxPensionGuide />
        <GuideFAQ faqs={GUIDE_FAQS["money"]} locale={locale} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function MoneyPage() {
  return (
    <LocaleProvider>
      <MoneyContent />
    </LocaleProvider>
  );
}
