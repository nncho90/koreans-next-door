"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import HousingSystemExplainer from "@/components/guide/housing/HousingSystemExplainer";
import NeighborhoodPicker from "@/components/guide/housing/NeighborhoodPicker";
import LeaseContractWalkthrough from "@/components/guide/housing/LeaseContractWalkthrough";
import RedFlagsChecklist from "@/components/guide/housing/RedFlagsChecklist";
import MovingChecklist from "@/components/guide/housing/MovingChecklist";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";

function HousingInner() {
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
              {isKo ? "주거 안내" : "Housing"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "서울에서\n집 구하기" : "Finding a home\nin Seoul"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "전세, 월세, 계약서 읽는 법, 사기 예방, 그리고 어디에 살아야 할지까지."
                : "Jeonse, wolse, lease contracts, scam prevention, and a neighborhood quiz to find where you belong."}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {isKo ? "마지막 업데이트: 2026년 3월" : "Last updated: March 2026"}
            </p>

            {/* Quick nav pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { href: "#housing-types", labelEn: "Rental Types", labelKo: "임대 유형" },
                { href: "#neighborhood-picker", labelEn: "Neighborhood Finder", labelKo: "동네 추천" },
                { href: "#lease-contract", labelEn: "Lease Contract", labelKo: "계약서 가이드" },
                { href: "#red-flags", labelEn: "Red Flags", labelKo: "사기 예방" },
                { href: "#moving-checklist", labelEn: "Moving Checklist", labelKo: "이사 체크리스트" },
              ].map((pill) => (
                <a
                  key={pill.href}
                  href={pill.href}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm text-zinc-600 transition-all hover:border-zinc-300 hover:bg-white hover:text-zinc-900"
                >
                  {isKo ? pill.labelKo : pill.labelEn}
                </a>
              ))}
            </div>
          </div>
        </section>

        <HousingSystemExplainer />
        <NeighborhoodPicker />
        <LeaseContractWalkthrough />
        <RedFlagsChecklist />
        <MovingChecklist />
        <GuideFAQ faqs={GUIDE_FAQS["housing"]} isKo={isKo} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function HousingContent() {
  return (
    <LocaleProvider>
      <HousingInner />
    </LocaleProvider>
  );
}
