"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import CulturalTips from "@/components/guide/CulturalTips";
import EmergencyCard from "@/components/guide/EmergencyCard";
import AskNeighbor from "@/components/guide/AskNeighbor";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";

function PinchContent() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  return (
    <>
      <SharedNavbar />
      <main>
        <section className="bg-[#fafaf8] px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {isKo ? "급할 때" : "In a pinch"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "막막할 때\n펼쳐보세요" : "For when things\nget confusing"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "불문율, 비상 상황, 그리고 막막할 때 물어볼 수 있는 이웃."
                : "Unwritten rules, emergency prep, and a real neighbor to ask when you're stuck."}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {isKo ? "마지막 업데이트: 2026년 3월" : "Last updated: March 2026"}
            </p>
          </div>
        </section>
        <CulturalTips />
        <EmergencyCard />
        <AskNeighbor />
        <GuideFAQ faqs={GUIDE_FAQS["pinch"]} isKo={isKo} />
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
