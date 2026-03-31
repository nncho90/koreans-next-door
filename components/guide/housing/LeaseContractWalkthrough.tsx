"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { LEASE_SECTIONS } from "@/lib/housingData";

export default function LeaseContractWalkthrough() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const [openId, setOpenId] = useState<string | null>("parties");

  return (
    <section
      id="lease-contract"
      className="bg-[#fafaf8] px-6 py-16 md:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "계약서 가이드" : "Lease Contract"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo
            ? "임대차계약서 조항별 설명"
            : "What every section of your lease means"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "한국 임대차계약서의 각 항목을 이해하면 계약 시 실수를 막을 수 있습니다."
            : "Korean lease contracts are in Korean. Here's what each section means — and what to watch for."}
        </p>

        <div className="space-y-3">
          {LEASE_SECTIONS.map((section, i) => {
            const isOpen = openId === section.id;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-zinc-300 bg-white"
                    : "border-zinc-200 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : section.id)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-lg font-bold text-zinc-950 md:text-xl">
                      {section.koreanLabel}
                    </span>
                    <span className="hidden text-sm text-zinc-400 md:block">
                      {section.fieldEn}
                    </span>
                  </div>
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      isOpen
                        ? "bg-[#ffd966] text-zinc-900"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="border-t border-zinc-100 px-6 pb-5 pt-4">
                        {/* Mobile field name */}
                        <p className="mb-3 text-sm font-semibold text-zinc-400 md:hidden">
                          {section.fieldEn}
                        </p>

                        {/* Explanation */}
                        <p className="mb-4 text-sm leading-relaxed text-zinc-600">
                          {isKo
                            ? section.explanationKo
                            : section.explanationEn}
                        </p>

                        {/* Red flag */}
                        {section.redFlag && (
                          <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                            <span className="mt-0.5 text-base">🚩</span>
                            <p className="text-sm text-red-700">
                              <span className="font-semibold">
                                {isKo ? "주의: " : "Watch out: "}
                              </span>
                              {section.redFlag}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom tip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5"
        >
          <p className="text-sm font-semibold text-zinc-800">
            {isKo
              ? "💡 공인중개사(공인중개사)는 계약서를 작성하고 설명할 법적 의무가 있습니다. 이해하지 못한 부분은 반드시 설명을 요청하세요."
              : "💡 A licensed real estate agent (공인중개사) is legally required to explain every clause. Ask them to walk you through it — that's their job."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
