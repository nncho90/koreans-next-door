"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { JOB_RESOURCES } from "@/lib/workData";

export default function JobResources() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="jobs" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "취업 정보" : "Job Search"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo
            ? "한국에서 일자리 찾기"
            : "Finding work in Korea"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "분야별로 외국인에게 적합한 채용 경로를 정리했습니다."
            : "The best job search channels vary a lot depending on what kind of work you're looking for. Here's where to start."}
        </p>

        <div className="space-y-10">
          {JOB_RESOURCES.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.1 }}
            >
              {/* Category header */}
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{group.emoji}</span>
                <div>
                  <h3 className="font-bold text-zinc-950">
                    {isKo ? group.categoryKo : group.category}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {isKo ? group.category : group.categoryKo}
                  </p>
                </div>
              </div>

              {/* Resources grid */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.resources.map((resource, ri) => (
                  <motion.div
                    key={ri}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.1 + ri * 0.06 }}
                    className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm"
                  >
                    <h4 className="mb-2 font-semibold text-zinc-950">
                      {resource.name}
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-500">
                      {isKo ? resource.descKo : resource.descEn}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5"
        >
          <p className="text-sm font-semibold text-zinc-800">
            {isKo
              ? "📋 취업비자(E-7 등)는 고용주가 대부분의 서류를 처리합니다. 비자 없이 근무를 시작하지 마세요 — 고용주와 근로자 모두 법적 책임을 질 수 있습니다."
              : "📋 For work visas (E-7, etc.), your employer handles most of the paperwork. Never start working without a valid visa — both you and your employer can face legal consequences."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
