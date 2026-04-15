"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";
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

const STATUS_LABELS: Record<RangeStatus, Record<Locale, string>> = {
  under: {
    en: "Under average",
    ko: "평균 이하",
    ja: "平均以下",
    "zh-CN": "低于平均",
    "zh-TW": "低於平均",
    pt: "Abaixo da média",
    es: "Bajo el promedio",
  },
  average: {
    en: "Near average",
    ko: "평균 수준",
    ja: "平均前後",
    "zh-CN": "接近平均",
    "zh-TW": "接近平均",
    pt: "Perto da média",
    es: "Cerca del promedio",
  },
  over: {
    en: "Over average",
    ko: "평균 초과",
    ja: "平均超過",
    "zh-CN": "高于平均",
    "zh-TW": "高於平均",
    pt: "Acima da média",
    es: "Sobre el promedio",
  },
};

const statusConfig = {
  under: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    bar: "bg-emerald-400",
  },
  average: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    bar: "bg-[#ffd966]",
  },
  over: {
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    bar: "bg-red-400",
  },
};

const STRINGS: Record<
  Locale,
  {
    sectionLabel: string;
    heading: string;
    subheading: string;
    estimatedMonthly: string;
    breakdown: string;
    resetToAverages: string;
    disclaimer: string;
    statusUnder: string;
    statusAverage: string;
    statusOver: string;
    seoulAvg: (avg: string) => string;
  }
> = {
  en: {
    sectionLabel: "Cost of Living",
    heading: "How much does Seoul actually cost?",
    subheading:
      "Drag the sliders to match your lifestyle and see your estimated monthly budget.",
    estimatedMonthly: "Estimated monthly",
    breakdown: "Breakdown",
    resetToAverages: "Reset to averages",
    disclaimer:
      "* Estimates based on typical Seoul living costs 2024-2025. Actual costs vary by lifestyle, neighborhood, and exchange rates.",
    statusUnder: "You're spending below Seoul average 👍",
    statusAverage: "About average for Seoul",
    statusOver: "Above Seoul average spending",
    seoulAvg: (avg) => `Seoul avg: ${avg} / month`,
  },
  ko: {
    sectionLabel: "생활비 계산기",
    heading: "서울에서 한 달에 얼마나 드나요?",
    subheading:
      "슬라이더를 조정해 내 생활 방식에 맞는 월 예산을 계산해보세요.",
    estimatedMonthly: "예상 월 생활비",
    breakdown: "항목별 비중",
    resetToAverages: "평균값으로 초기화",
    disclaimer:
      "* 2024-2025년 기준 서울 일반 거주 비용 추산. 생활 방식, 거주 지역, 환율에 따라 달라질 수 있습니다.",
    statusUnder: "서울 평균보다 적게 지출하고 있어요 👍",
    statusAverage: "서울 평균 수준의 생활비예요",
    statusOver: "서울 평균보다 많이 지출하고 있어요",
    seoulAvg: (avg) => `서울 평균: ${avg} / 월`,
  },
  ja: {
    sectionLabel: "生活費計算ツール",
    heading: "ソウルの実際の生活費はいくら？",
    subheading:
      "スライダーを動かしてライフスタイルに合わせ、月々の予算を確認しましょう。",
    estimatedMonthly: "推定月額生活費",
    breakdown: "内訳",
    resetToAverages: "平均値にリセット",
    disclaimer:
      "* 2024〜2025年のソウル一般的な生活費の推計です。ライフスタイル、地域、為替レートによって異なります。",
    statusUnder: "ソウル平均より少ない支出です 👍",
    statusAverage: "ソウルの平均的な生活費です",
    statusOver: "ソウル平均より多い支出です",
    seoulAvg: (avg) => `ソウル平均: ${avg} / 月`,
  },
  "zh-CN": {
    sectionLabel: "生活费计算器",
    heading: "首尔实际生活费是多少？",
    subheading: "拖动滑块，根据您的生活方式计算每月预算。",
    estimatedMonthly: "预计月生活费",
    breakdown: "费用构成",
    resetToAverages: "重置为平均值",
    disclaimer:
      "* 基于2024-2025年首尔典型生活成本估算。实际费用因生活方式、居住区域和汇率而异。",
    statusUnder: "您的支出低于首尔平均水平 👍",
    statusAverage: "接近首尔平均生活费",
    statusOver: "您的支出高于首尔平均水平",
    seoulAvg: (avg) => `首尔平均: ${avg} / 月`,
  },
  "zh-TW": {
    sectionLabel: "生活費計算器",
    heading: "首爾實際生活費是多少？",
    subheading: "拖動滑桿，根據您的生活方式計算每月預算。",
    estimatedMonthly: "預計月生活費",
    breakdown: "費用構成",
    resetToAverages: "重置為平均值",
    disclaimer:
      "* 基於2024-2025年首爾典型生活成本估算。實際費用因生活方式、居住區域和匯率而異。",
    statusUnder: "您的支出低於首爾平均水準 👍",
    statusAverage: "接近首爾平均生活費",
    statusOver: "您的支出高於首爾平均水準",
    seoulAvg: (avg) => `首爾平均: ${avg} / 月`,
  },
  pt: {
    sectionLabel: "Calculadora de Custo de Vida",
    heading: "Quanto custa realmente viver em Seul?",
    subheading:
      "Arraste os controles deslizantes para corresponder ao seu estilo de vida e ver seu orçamento mensal estimado.",
    estimatedMonthly: "Estimativa mensal",
    breakdown: "Detalhamento",
    resetToAverages: "Redefinir para médias",
    disclaimer:
      "* Estimativas baseadas em custos típicos de vida em Seul 2024-2025. Os custos reais variam por estilo de vida, bairro e taxas de câmbio.",
    statusUnder: "Você está gastando abaixo da média de Seul 👍",
    statusAverage: "Perto da média de Seul",
    statusOver: "Acima da média de gastos de Seul",
    seoulAvg: (avg) => `Média de Seul: ${avg} / mês`,
  },
  es: {
    sectionLabel: "Calculadora de Costo de Vida",
    heading: "¿Cuánto cuesta realmente vivir en Seúl?",
    subheading:
      "Arrastra los controles deslizantes para ajustar a tu estilo de vida y ver tu presupuesto mensual estimado.",
    estimatedMonthly: "Estimado mensual",
    breakdown: "Desglose",
    resetToAverages: "Restablecer a promedios",
    disclaimer:
      "* Estimaciones basadas en costos típicos de vida en Seúl 2024-2025. Los costos reales varían según estilo de vida, barrio y tipos de cambio.",
    statusUnder: "Estás gastando por debajo del promedio de Seúl 👍",
    statusAverage: "Cerca del promedio de Seúl",
    statusOver: "Por encima del gasto promedio de Seúl",
    seoulAvg: (avg) => `Promedio de Seúl: ${avg} / mes`,
  },
};

export default function CostOfLivingCalculator() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;
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
            {s.sectionLabel}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            {s.heading}
          </h2>
          <p className="mb-10 max-w-xl text-zinc-400">{s.subheading}</p>
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
              const catLabel = loc(
                cat as Record<string, unknown>,
                "label",
                locale
              );
              const catLabelKo = cat.labelKo;

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
                        {catLabel}
                      </span>
                      {locale !== "ko" && (
                        <span className="ml-1.5 text-sm text-zinc-500">
                          ({catLabelKo})
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-white">
                        {formatKRW(val)}
                      </span>
                      <span className="ml-1 text-sm text-zinc-400">/ mo</span>
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
                      aria-label={catLabel}
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
                      {STATUS_LABELS[status][locale]} · avg {formatKRW(cat.avgKRW)}
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
                {s.estimatedMonthly}
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
                  {totalStatus === "under" && s.statusUnder}
                  {totalStatus === "average" && s.statusAverage}
                  {totalStatus === "over" && s.statusOver}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {s.seoulAvg(formatKRW(avgTotal))}
                </p>
              </div>

              {/* Category breakdown */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
                  {s.breakdown}
                </p>
                {categories.map((cat) => {
                  const pct = Math.round((values[cat.id] / total) * 100);
                  const catLabel = loc(
                    cat as Record<string, unknown>,
                    "label",
                    locale
                  );
                  return (
                    <div key={cat.id} className="flex items-center gap-2">
                      <span className="w-20 shrink-0 text-xs text-zinc-500 truncate">
                        {catLabel}
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
              {s.resetToAverages}
            </button>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-zinc-500 text-center">{s.disclaimer}</p>
      </div>
    </section>
  );
}
