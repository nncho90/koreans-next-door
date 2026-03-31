"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { COST_OF_LIVING } from "@/lib/moneyData";

const USD_RATE = 1350;

function formatKRW(amount: number): string {
  if (amount >= 1000000) {
    const millions = amount / 1000000;
    return `₩${millions % 1 === 0 ? millions : millions.toFixed(1)}M`;
  }
  if (amount >= 10000) {
    const manwon = amount / 10000;
    return `₩${manwon % 1 === 0 ? manwon : manwon.toFixed(0)}만`;
  }
  return `₩${amount.toLocaleString()}`;
}

function formatUSD(krw: number): string {
  const usd = Math.round(krw / USD_RATE);
  return `$${usd.toLocaleString()}`;
}

type RangeStatus = "under" | "average" | "over";

function getRangeStatus(value: number, avg: number): RangeStatus {
  const ratio = value / avg;
  if (ratio < 0.85) return "under";
  if (ratio > 1.15) return "over";
  return "average";
}

const statusConfig = {
  under: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    label: { en: "Under average", ko: "평균 이하" },
    bar: "bg-emerald-400",
  },
  average: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    label: { en: "Near average", ko: "평균 수준" },
    bar: "bg-[#ffd966]",
  },
  over: {
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    label: { en: "Over average", ko: "평균 초과" },
    bar: "bg-red-400",
  },
};

export default function CostOfLivingCalculator() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const { categories } = COST_OF_LIVING;

  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(categories.map((c) => [c.id, c.avgKRW]))
  );

  const total = useMemo(
    () => Object.values(values).reduce((sum, v) => sum + v, 0),
    [values]
  );

  const avgTotal = useMemo(
    () => categories.reduce((sum, c) => sum + c.avgKRW, 0),
    [categories]
  );

  const totalStatus = getRangeStatus(total, avgTotal);
  const totalConfig = statusConfig[totalStatus];

  return (
    <section id="cost-of-living" className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            {isKo ? "생활비 계산기" : "Cost of Living"}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            {isKo
              ? "서울에서 한 달에 얼마나 드나요?"
              : "How much does Seoul actually cost?"}
          </h2>
          <p className="mb-10 max-w-xl text-zinc-400">
            {isKo
              ? "슬라이더를 조정해 내 생활 방식에 맞는 월 예산을 계산해보세요."
              : "Drag the sliders to match your lifestyle and see your estimated monthly budget."}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Sliders */}
          <div className="space-y-5">
            {categories.map((cat, i) => {
              const val = values[cat.id];
              const status = getRangeStatus(val, cat.avgKRW);
              const config = statusConfig[status];
              const pct =
                ((val - cat.minKRW) / (cat.maxKRW - cat.minKRW)) * 100;

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white">
                        {isKo ? cat.labelKo : cat.labelEn}
                      </span>
                      {!isKo && (
                        <span className="ml-1.5 text-sm text-zinc-500">
                          ({cat.labelKo})
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-white">
                        {formatKRW(val)}
                      </span>
                      <span className="ml-1 text-sm text-zinc-400">
                        / mo
                      </span>
                    </div>
                  </div>

                  {/* Slider */}
                  <div className="relative mb-3">
                    <div className="h-1.5 w-full rounded-full bg-zinc-700">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-150 ${config.bar}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={cat.minKRW}
                      max={cat.maxKRW}
                      step={Math.round((cat.maxKRW - cat.minKRW) / 50)}
                      value={val}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          [cat.id]: Number(e.target.value),
                        }))
                      }
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      aria-label={isKo ? cat.labelKo : cat.labelEn}
                    />
                  </div>

                  {/* Range labels + status */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      {formatKRW(cat.minKRW)}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${config.bg} ${config.color} ${config.border} border`}
                    >
                      {isKo
                        ? config.label.ko
                        : config.label.en}{" "}
                      · avg {formatKRW(cat.avgKRW)}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {formatKRW(cat.maxKRW)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div
              className={`rounded-2xl border p-6 ${totalConfig.border} ${totalConfig.bg}`}
            >
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                {isKo ? "예상 월 생활비" : "Estimated monthly"}
              </p>
              <div className={`text-4xl font-bold mb-1 ${totalConfig.color}`}>
                {formatKRW(total)}
              </div>
              <div className="mb-4 text-lg font-semibold text-zinc-500">
                ≈ {formatUSD(total)} USD
              </div>

              {/* Status indicator */}
              <div
                className={`mb-5 rounded-xl border px-4 py-3 ${totalConfig.border} bg-white/60`}
              >
                <p className={`text-sm font-semibold ${totalConfig.color}`}>
                  {totalStatus === "under" &&
                    (isKo
                      ? "서울 평균보다 적게 지출하고 있어요 👍"
                      : "You're spending below Seoul average 👍")}
                  {totalStatus === "average" &&
                    (isKo
                      ? "서울 평균 수준의 생활비예요"
                      : "About average for Seoul")}
                  {totalStatus === "over" &&
                    (isKo
                      ? "서울 평균보다 많이 지출하고 있어요"
                      : "Above Seoul average spending")}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {isKo
                    ? `서울 평균: ${formatKRW(avgTotal)} / 월`
                    : `Seoul avg: ${formatKRW(avgTotal)} / month`}
                </p>
              </div>

              {/* Category breakdown */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
                  {isKo ? "항목별 비중" : "Breakdown"}
                </p>
                {categories.map((cat) => {
                  const pct = Math.round((values[cat.id] / total) * 100);
                  return (
                    <div key={cat.id} className="flex items-center gap-2">
                      <span className="w-20 shrink-0 text-xs text-zinc-500 truncate">
                        {isKo ? cat.labelKo : cat.labelEn}
                      </span>
                      <div className="flex-1 h-1.5 rounded-full bg-zinc-200">
                        <div
                          className="h-1.5 rounded-full bg-zinc-400 transition-all duration-150"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-right text-xs font-semibold text-zinc-600">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={() =>
                setValues(
                  Object.fromEntries(
                    categories.map((c) => [c.id, c.avgKRW])
                  )
                )
              }
              className="mt-3 w-full rounded-xl border border-zinc-700 py-2.5 text-xs font-semibold text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
            >
              {isKo ? "평균값으로 초기화" : "Reset to averages"}
            </button>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-zinc-500 text-center">
          {isKo
            ? "* 2024-2025년 기준 서울 일반 거주 비용 추산. 생활 방식, 거주 지역, 환율에 따라 달라질 수 있습니다."
            : "* Estimates based on typical Seoul living costs 2024-2025. Actual costs vary by lifestyle, neighborhood, and exchange rates."}
        </p>
      </div>
    </section>
  );
}
