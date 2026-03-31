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

function VisaContent() {
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
              {isKo ? "비자 & 이민" : "Visa & Immigration"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "어떤 비자가\n필요한가요?" : "Which visa\ndo you need?"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "한국 비자 종류, ARC 발급 방법, 그리고 자주 하는 실수들을 안내해드립니다."
                : "Korean visa types, how to get your ARC card, and the pitfalls that trip up most newcomers."}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {isKo ? "마지막 업데이트: 2026년 3월" : "Last updated: March 2026"}
            </p>
          </div>
        </section>

        <VisaWizard />
        <VisaComparisonTable />
        <ARCGuide />
        <CommonPitfalls />
        <GuideFAQ faqs={GUIDE_FAQS["visa"]} isKo={isKo} />
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
