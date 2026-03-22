"use client";

import { useLocale } from "@/lib/i18n";
import { SPECIALTIES } from "@/lib/healthData";

export default function SpecialtyPicker() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="specialties" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "진료과 찾기" : "Find a Specialty"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo ? "어떤 진료가 필요하세요?" : "What kind of care do you need?"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "진료과를 선택하면 굿닥에서 주변 의원을 바로 검색할 수 있어요."
            : "Pick a specialty below to search nearby clinics on Goodoc — Korea's largest clinic finder."}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {SPECIALTIES.map((s) => (
            <a
              key={s.ko}
              href={`https://www.goodoc.co.kr/hospitals?department=${encodeURIComponent(s.goodocParam)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-5 text-center transition-all hover:border-[#ffd966]/60 hover:shadow-sm"
            >
              <span className="text-3xl">{s.icon}</span>
              <span className="text-base font-bold text-zinc-900">{s.ko}</span>
              <span className="text-xs text-zinc-500">{s.en}</span>
              <span className="mt-1 text-xs font-semibold text-[#c9a800] opacity-0 transition-opacity group-hover:opacity-100">
                Find on Goodoc →
              </span>
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-zinc-400">
          {isKo
            ? "굿닥 앱을 다운로드하면 예약, 접수, 비대면 진료도 가능해요."
            : "Tip: Download the Goodoc app for appointments, check-ins, and 24/7 telemedicine."}
        </p>
      </div>
    </section>
  );
}
