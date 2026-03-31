"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { HOUSING_TYPES } from "@/lib/housingData";

export default function HousingSystemExplainer() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="housing-types" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "임대 유형" : "Rental Types"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo
            ? "전세, 월세, 단기 — 차이가 뭔가요?"
            : "Jeonse, Wolse, Short-term — what's the difference?"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "한국의 임대 시스템은 외국인에게 낯설 수 있습니다. 각 방식의 장단점을 알아보세요."
            : "Korea's rental system is unlike most other countries. Here's what you need to know before you start looking."}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {HOUSING_TYPES.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-[#fafaf8] p-6"
            >
              {/* Header */}
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl">{type.icon}</span>
                <div>
                  <div className="text-lg font-bold text-zinc-950">
                    {isKo ? type.nameKo : type.nameEn}
                  </div>
                  {!isKo && (
                    <div className="text-sm text-zinc-400">{type.nameKo}</div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mb-5 text-sm text-zinc-500">
                {isKo ? type.descKo : type.descEn}
              </p>

              {/* Pros & Cons */}
              <div className="mb-5 grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    {isKo ? "장점" : "Pros"}
                  </p>
                  <ul className="space-y-1">
                    {(isKo ? type.proKo : type.proEn).map((pro) => (
                      <li
                        key={pro}
                        className="flex items-start gap-1.5 text-xs text-zinc-600"
                      >
                        <span className="mt-0.5 text-emerald-500">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-500">
                    {isKo ? "단점" : "Cons"}
                  </p>
                  <ul className="space-y-1">
                    {(isKo ? type.conKo : type.conEn).map((con) => (
                      <li
                        key={con}
                        className="flex items-start gap-1.5 text-xs text-zinc-600"
                      >
                        <span className="mt-0.5 text-red-400">✕</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cost Range */}
              <div className="mt-auto space-y-2">
                <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                  <p className="text-xs text-zinc-400">
                    {isKo ? "보증금" : "Deposit range"}
                  </p>
                  <p className="font-semibold text-zinc-900">
                    {type.depositRange}
                  </p>
                </div>
                <div className="rounded-xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-4 py-3">
                  <p className="text-xs text-zinc-400">
                    {isKo ? "월 비용" : "Monthly cost"}
                  </p>
                  <p className="font-semibold text-zinc-900">
                    {type.monthlyRange}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tip callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5"
        >
          <p className="text-sm font-semibold text-zinc-800">
            {isKo
              ? "💡 외국인에게는 월세가 가장 일반적입니다. 전세는 한국 신용 기록이나 보증인이 필요할 수 있어요."
              : "💡 Most foreigners start with wolse. Jeonse is harder to get without Korean credit history or a guarantor — but not impossible."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
