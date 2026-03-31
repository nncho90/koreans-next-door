"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import BankGuide from "@/components/guide/money/BankGuide";
import TransferComparison from "@/components/guide/money/TransferComparison";
import CostOfLivingCalculator from "@/components/guide/money/CostOfLivingCalculator";
import TaxPensionGuide from "@/components/guide/money/TaxPensionGuide";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";

function MoneyContent() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <>
      <SharedNavbar />
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {isKo ? "금융 안내" : "Money & Banking"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "돈 관리,\n어렵지 않아요" : "Your money\nin Korea"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "은행 계좌 개설부터 해외 송금, 생활비 계산, 세금과 연금까지 — 외국인을 위한 금융 완전 가이드."
                : "Bank accounts, international transfers, cost of living, taxes, and pension — everything financial you need as a foreigner in Korea."}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {isKo ? "마지막 업데이트: 2026년 3월" : "Last updated: March 2026"}
            </p>

            {/* Quick navigation pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { href: "#banks", en: "🏦 Bank Accounts", ko: "🏦 은행 계좌" },
                { href: "#transfers", en: "💸 Transfers", ko: "💸 해외 송금" },
                {
                  href: "#cost-of-living",
                  en: "📊 Cost Calculator",
                  ko: "📊 생활비 계산기",
                },
                { href: "#taxes", en: "📋 Taxes & Pension", ko: "📋 세금 & 연금" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm font-semibold text-zinc-600 hover:border-zinc-300 hover:bg-white hover:text-zinc-900 transition-all"
                >
                  {isKo ? item.ko : item.en}
                </a>
              ))}
            </div>
          </div>
        </section>

        <BankGuide />
        <TransferComparison />
        <CostOfLivingCalculator />
        <TaxPensionGuide />
        <GuideFAQ faqs={GUIDE_FAQS["money"]} isKo={isKo} />
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
