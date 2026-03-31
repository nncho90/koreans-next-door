"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import RecyclingGuide from "@/components/guide/daily/RecyclingGuide";
import EssentialApps from "@/components/guide/daily/EssentialApps";
import PhonePlans from "@/components/guide/daily/PhonePlans";
import DeliveryGuide from "@/components/guide/daily/DeliveryGuide";
import DriversLicense from "@/components/guide/daily/DriversLicense";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";

function DailyContent() {
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
              {isKo ? "일상 생활" : "Daily Life"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "한국에서\n사는 법" : "Living in\nKorea"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "쓰레기 분리수거부터 유심 요금제, 배달 앱, 운전면허까지 — 한국 일상 생활 완전 가이드."
                : "Recycling rules, phone plans, must-have apps, delivery culture, and your driver's license — everything for daily life in Korea."}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {isKo ? "마지막 업데이트: 2026년 3월" : "Last updated: March 2026"}
            </p>

            {/* Quick jump nav */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { href: "#recycling", en: "Recycling", ko: "분리수거" },
                { href: "#apps", en: "Essential Apps", ko: "필수 앱" },
                { href: "#phone", en: "Phone Plans", ko: "요금제" },
                { href: "#delivery", en: "Delivery", ko: "배달" },
                { href: "#license", en: "Driver's License", ko: "운전면허" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-white hover:text-zinc-950"
                >
                  {isKo ? link.ko : link.en}
                </a>
              ))}
            </div>
          </div>
        </section>

        <RecyclingGuide />
        <EssentialApps />
        <PhonePlans />
        <DeliveryGuide />
        <DriversLicense />
        <GuideFAQ faqs={GUIDE_FAQS["daily"]} isKo={isKo} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function DailyPage() {
  return (
    <LocaleProvider>
      <DailyContent />
    </LocaleProvider>
  );
}
