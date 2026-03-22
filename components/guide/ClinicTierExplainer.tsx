"use client";

import { useLocale } from "@/lib/i18n";
import { CLINIC_TIERS } from "@/lib/healthData";

export default function ClinicTierExplainer() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="tiers" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "진료기관 종류" : "The 4-Tier System"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo ? "어떤 병원에 가야 할까?" : "Which clinic do you go to?"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "한국의 의료기관은 4단계로 나뉩니다. 대부분의 경우 의원에서 시작하세요."
            : "Korea's healthcare is organized in 4 tiers. Start at the bottom — it's cheaper, faster, and usually all you need."}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CLINIC_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-[#fafaf8] p-6"
            >
              <div className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full ${tier.color} text-sm font-bold text-white`}>
                {tier.tier}
              </div>
              <div className="mb-1 text-xl font-bold text-zinc-950">
                {tier.ko}
                <span className="ml-2 text-sm font-normal text-zinc-400">({tier.en})</span>
              </div>
              <p className="mb-3 text-sm text-zinc-500">{tier.description}</p>
              <div className="mt-auto space-y-2 text-xs">
                <div className="rounded-lg bg-white px-3 py-2 text-zinc-600 border border-zinc-100">
                  <span className="font-semibold text-zinc-800">{isKo ? "예시: " : "E.g.: "}</span>
                  {tier.examples}
                </div>
                <div className="rounded-lg bg-white px-3 py-2 text-zinc-600 border border-zinc-100">
                  <span className="font-semibold text-zinc-800">NHIS: </span>
                  {tier.nhis}
                </div>
                <div className={`rounded-lg px-3 py-2 text-xs font-medium ${tier.color} bg-opacity-10 text-zinc-800`}>
                  💡 {tier.tip}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key callout */}
        <div className="mt-8 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5">
          <p className="text-sm font-semibold text-zinc-800">
            {isKo
              ? "💳 진료 시 외국인등록증(ARC)을 지참하세요. 건강보험이 자동으로 조회됩니다."
              : "💳 Always bring your ARC (Alien Registration Card). Clinics use it to look up your NHIS insurance automatically — no card needed, just the number."}
          </p>
        </div>
      </div>
    </section>
  );
}
