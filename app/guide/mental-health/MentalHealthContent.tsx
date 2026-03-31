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

function MentalHealthContent() {
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
              {isKo ? "마음 건강" : "Mind & Wellbeing"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "힘든 게\n당연해요." : "You're allowed\nto struggle."}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "낯선 나라에서 사는 건 쉽지 않습니다. 외국인 누구나 겪는 이야기예요. 여기서 당신 혼자가 아닙니다."
                : "Living in a foreign country is hard. Culture shock is real. Loneliness is real. You're not alone in this — and help is here."}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {isKo ? "마지막 업데이트: 2026년 3월" : "Last updated: March 2026"}
            </p>
          </div>
        </section>
        <CultureShockGuide />
        <TherapistDirectory />
        <CrisisResources />
        <SupportGroups />
        <SelfCareGuide />
        <GuideFAQ faqs={GUIDE_FAQS["mental-health"]} isKo={isKo} />
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
