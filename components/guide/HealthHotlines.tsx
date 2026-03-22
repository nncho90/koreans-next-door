"use client";

import { useLocale } from "@/lib/i18n";
import { HOTLINES } from "@/lib/healthData";

const TIPS = [
  {
    en: "Bring your ARC",
    ko: "외국인등록증 지참",
    detail: {
      en: "Clinics use your ARC number to look up NHIS insurance automatically. You don't need a physical insurance card.",
      ko: "건강보험은 외국인등록증 번호로 자동 조회됩니다. 별도의 보험 카드는 필요 없어요.",
    },
  },
  {
    en: "Fill prescriptions same day",
    ko: "처방전은 당일 사용",
    detail: {
      en: "Doctors give you a paper prescription slip (처방전) to take to an outside pharmacy (약국). They keep the slip — fill it same day.",
      ko: "의사가 처방전을 발행하면 근처 약국에서 수령하세요. 약국이 처방전을 보관하므로 당일 바로 가세요.",
    },
  },
  {
    en: 'Search "영어 가능" on Naver Maps',
    ko: "네이버 지도에서 '영어 가능' 검색",
    detail: {
      en: 'Type "영어 가능 병원" in Naver Maps to find English-speaking clinics near you. Or call ahead: "영어로 진료 가능한가요?"',
      ko: "네이버 지도에서 '영어 가능 병원'을 검색하거나, 전화로 '영어로 진료 가능한가요?'라고 물어보세요.",
    },
  },
];

export default function HealthHotlines() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Hotlines */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "긴급 연락처" : "Hotlines"}
        </p>
        <h2 className="mb-8 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo ? "급할 때 전화하세요" : "Who to call"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {HOTLINES.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number.replace(/-/g, "")}`}
              className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 hover:shadow-sm"
            >
              <div className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${h.color} text-sm font-bold text-white`}>
                {h.number}
              </div>
              <div>
                <p className="font-semibold text-zinc-900">{h.label}</p>
                <p className="text-sm text-zinc-500">{h.detail}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Practical Tips */}
        <h2 className="mb-6 mt-14 text-2xl font-bold text-zinc-950">
          {isKo ? "알아두면 좋은 것들" : "Practical tips"}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {TIPS.map((tip) => (
            <div
              key={tip.en}
              className="rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <p className="mb-2 font-semibold text-zinc-900">
                {isKo ? tip.ko : tip.en}
              </p>
              <p className="text-sm text-zinc-500">
                {isKo ? tip.detail.ko : tip.detail.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
