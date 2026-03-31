"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { CONTRACT_SECTIONS } from "@/lib/workData";

export default function ContractGuide() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="contract" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "계약서 가이드" : "Employment Contract"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo
            ? "계약서 항목별 설명"
            : "What every clause in your contract means"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "한국 근로계약서의 주요 항목을 이해하면 불이익을 미리 막을 수 있습니다."
            : "Korean employment contracts are written in Korean. Here's what each section means — and what to watch out for."}
        </p>

        <div className="space-y-3">
          {CONTRACT_SECTIONS.map((section, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? "border-zinc-300 bg-white" : "border-zinc-200 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-zinc-950 md:text-lg">
                      {isKo ? section.fieldKo : section.fieldEn}
                    </span>
                    {!isKo && (
                      <span className="hidden text-sm text-zinc-400 md:block">
                        {section.fieldKo}
                      </span>
                    )}
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
                        {/* Description */}
                        <p className="mb-4 text-sm leading-relaxed text-zinc-600">
                          {isKo ? section.descKo : section.descEn}
                        </p>

                        {/* Red flag */}
                        <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
                          <span className="mt-0.5 text-base">🚩</span>
                          <p className="text-sm text-amber-800">
                            <span className="font-semibold">
                              {isKo ? "주의: " : "Watch out: "}
                            </span>
                            {isKo ? section.redFlagKo : section.redFlagEn}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5"
        >
          <p className="text-sm font-semibold text-zinc-800">
            {isKo
              ? "💡 계약서에 서명하기 전, 모든 항목을 한 줄씩 확인하세요. 이해하지 못한 조항은 반드시 설명을 요청할 권리가 있습니다."
              : "💡 Before signing, go through every clause line by line. You have the right to ask for an explanation of anything you don't understand — even if it feels awkward."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
