"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { HOUSING_TYPES } from "@/lib/housingData";
import { loc, locArr } from "@/lib/i18n/guideLocale";

type LS = Record<string, string>;
const STRINGS: Record<string, LS> = {
  en: {
    sectionLabel: "Rental Types",
    heading: "Jeonse, Wolse, Short-term — what's the difference?",
    subheading: "Korea's rental system is unlike most other countries. Here's what you need to know before you start looking.",
    prosLabel: "Pros",
    consLabel: "Cons",
    depositLabel: "Deposit range",
    monthlyLabel: "Monthly cost",
    tip: "💡 Most foreigners start with wolse. Jeonse is harder to get without Korean credit history or a guarantor — but not impossible.",
  },
  ko: {
    sectionLabel: "임대 유형",
    heading: "전세, 월세, 단기 — 차이가 뭔가요?",
    subheading: "한국의 임대 시스템은 외국인에게 낯설 수 있습니다. 각 방식의 장단점을 알아보세요.",
    prosLabel: "장점",
    consLabel: "단점",
    depositLabel: "보증금",
    monthlyLabel: "월 비용",
    tip: "💡 외국인에게는 월세가 가장 일반적입니다. 전세는 한국 신용 기록이나 보증인이 필요할 수 있어요.",
  },
  ja: {
    sectionLabel: "賃貸タイプ",
    heading: "チョンセ、ウォルセ、短期 — 違いは何？",
    subheading: "韓国の賃貸システムは他国とは異なります。物件探しを始める前に知っておくべきことをまとめました。",
    prosLabel: "メリット",
    consLabel: "デメリット",
    depositLabel: "保証金の目安",
    monthlyLabel: "月額費用",
    tip: "💡 外国人の多くはウォルセ（月租）から始めます。チョンセは韓国の信用履歴や保証人なしでは難しい場合がありますが、不可能ではありません。",
  },
  "zh-CN": {
    sectionLabel: "租赁类型",
    heading: "全税、月租、短租 — 有什么区别？",
    subheading: "韩国的租赁体系与大多数国家不同。开始找房前，先了解这些基本知识。",
    prosLabel: "优点",
    consLabel: "缺点",
    depositLabel: "押金范围",
    monthlyLabel: "月费用",
    tip: "💡 大多数外国人从月租（월세）开始。全税（전세）在没有韩国信用记录或担保人的情况下较难申请，但并非不可能。",
  },
  "zh-TW": {
    sectionLabel: "租賃類型",
    heading: "全稅、月租、短租 — 有什麼區別？",
    subheading: "韓國的租賃體系與大多數國家不同。開始找房前，先了解這些基本知識。",
    prosLabel: "優點",
    consLabel: "缺點",
    depositLabel: "押金範圍",
    monthlyLabel: "月費用",
    tip: "💡 大多數外國人從月租（월세）開始。全稅（전세）在沒有韓國信用記錄或擔保人的情況下較難申請，但並非不可能。",
  },
  pt: {
    sectionLabel: "Tipos de Aluguel",
    heading: "Jeonse, Wolse, Curto prazo — qual é a diferença?",
    subheading: "O sistema de arrendamento da Coreia é diferente da maioria dos países. Aqui está o que você precisa saber antes de começar a procurar.",
    prosLabel: "Vantagens",
    consLabel: "Desvantagens",
    depositLabel: "Intervalo de depósito",
    monthlyLabel: "Custo mensal",
    tip: "💡 A maioria dos estrangeiros começa com wolse. O jeonse é mais difícil de conseguir sem histórico de crédito coreano ou fiador — mas não é impossível.",
  },
  es: {
    sectionLabel: "Tipos de Alquiler",
    heading: "Jeonse, Wolse, Corto plazo — ¿cuál es la diferencia?",
    subheading: "El sistema de arrendamiento de Corea es diferente al de la mayoría de países. Esto es lo que necesitas saber antes de empezar a buscar.",
    prosLabel: "Ventajas",
    consLabel: "Desventajas",
    depositLabel: "Rango de depósito",
    monthlyLabel: "Costo mensual",
    tip: "💡 La mayoría de los extranjeros empiezan con wolse. El jeonse es más difícil de conseguir sin historial crediticio coreano o un garante — pero no es imposible.",
  },
};

export default function HousingSystemExplainer() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="housing-types" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.sectionLabel}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {s.subheading}
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
                    {loc(type as Record<string, unknown>, "name", locale)}
                  </div>
                  {locale !== "ko" && (
                    <div className="text-sm text-zinc-400">{type.nameKo}</div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mb-5 text-sm text-zinc-500">
                {loc(type as Record<string, unknown>, "desc", locale)}
              </p>

              {/* Pros & Cons */}
              <div className="mb-5 grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    {s.prosLabel}
                  </p>
                  <ul className="space-y-1">
                    {locArr(type as Record<string, unknown>, "pro", locale).map((pro) => (
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
                    {s.consLabel}
                  </p>
                  <ul className="space-y-1">
                    {locArr(type as Record<string, unknown>, "con", locale).map((con) => (
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
                  <p className="text-xs text-zinc-400">{s.depositLabel}</p>
                  <p className="font-semibold text-zinc-900">
                    {type.depositRange}
                  </p>
                </div>
                <div className="rounded-xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-4 py-3">
                  <p className="text-xs text-zinc-400">{s.monthlyLabel}</p>
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
          <p className="text-sm font-semibold text-zinc-800">{s.tip}</p>
        </motion.div>
      </div>
    </section>
  );
}
