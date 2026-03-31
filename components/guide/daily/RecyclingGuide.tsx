"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { RECYCLING_CATEGORIES } from "@/lib/dailyData";

export default function RecyclingGuide() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="recycling" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "분리수거 안내" : "Waste & Recycling"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo ? "쓰레기는 어떻게 버리나요?" : "How to throw out trash in Korea"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "한국의 분리수거 시스템은 엄격합니다. 규칙을 지키지 않으면 과태료가 부과될 수 있어요."
            : "Korea's waste system is strict and specific. Each type of waste has its own bag, bin, and rules — here's everything you need to know."}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {RECYCLING_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.nameEn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6"
            >
              {/* Header */}
              <div className="mb-4 flex items-start gap-4">
                <span className="text-4xl">{cat.emoji}</span>
                <div>
                  <div className="text-lg font-bold text-zinc-950">
                    {isKo ? cat.nameKo : cat.nameEn}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {isKo ? cat.nameEn : cat.nameKo}
                  </div>
                </div>
              </div>

              {/* Bag type badge */}
              <div className="mb-4 inline-flex self-start items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5">
                <span className="text-xs font-semibold text-zinc-500">
                  {isKo ? "봉투" : "Bag"}:
                </span>
                <span className="text-xs font-bold text-zinc-800">
                  {isKo ? cat.bagColorKo : cat.bagColor}
                </span>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm text-zinc-500">
                {isKo ? cat.descKo : cat.descEn}
              </p>

              {/* Tips */}
              <div className="mb-4 space-y-1.5">
                {(isKo ? cat.tipsKo : cat.tipsEn).map((tip) => (
                  <div key={tip} className="flex items-start gap-2 text-xs text-zinc-600">
                    <span className="mt-0.5 shrink-0 text-[#c9a800]">→</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              {/* How-to */}
              <div className="mt-auto rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                <p className="text-xs font-semibold text-zinc-500 mb-1">
                  {isKo ? "배출 방법" : "How to dispose"}
                </p>
                <p className="text-sm text-zinc-700">
                  {isKo ? cat.howKo : cat.how}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fine callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5"
        >
          <p className="text-sm font-semibold text-amber-900">
            {isKo
              ? "⚠️ 한국에서 분리수거 규칙을 어기면 과태료가 부과될 수 있습니다. 잘 모를 때는 건물 관리인(관리인)에게 물어보세요."
              : "⚠️ Breaking recycling rules in Korea can result in fines. When in doubt, ask your building manager (관리인)."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
