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

function HealthContent() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  return (
    <>
      <SharedNavbar />
      <main>
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {isKo ? "의료 안내" : "Healthcare"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "아픈 날을\n위한 안내" : "When you're\nnot feeling well"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "한국의 의료 시스템, 영어 가능한 병원, 그리고 급할 때 연락할 곳."
                : "Korea's clinic system, English-speaking hospitals, and who to call when you need help."}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {isKo ? "마지막 업데이트: 2026년 3월" : "Last updated: March 2026"}
            </p>
          </div>
        </section>
        <ClinicTierExplainer />
        <SpecialtyPicker />
        <EnglishClinicMap />
        <HealthHotlines />
        <GuideFAQ faqs={GUIDE_FAQS["health"]} isKo={isKo} />
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
