"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { RED_FLAGS } from "@/lib/housingData";

export default function RedFlagsChecklist() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section id="red-flags" className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "사기 예방" : "Red Flags"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {isKo
            ? "이런 상황이면 조심하세요"
            : "5 warning signs to never ignore"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-400">
          {isKo
            ? "매년 수백 명의 외국인이 부동산 사기를 당합니다. 이 다섯 가지를 반드시 기억하세요."
            : "Hundreds of foreigners fall victim to rental scams in Korea every year. Know these five warning signs."}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RED_FLAGS.map((flag, i) => {
            const isExpanded = expandedIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
              >
                {/* Card Header */}
                <div className="px-5 pb-3 pt-5">
                  <div className="mb-3 flex items-start gap-3">
                    <span className="text-xl">{flag.icon}</span>
                    <h3 className="font-bold text-white">
                      {isKo ? flag.titleKo : flag.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {isKo ? flag.descriptionKo : flag.description}
                  </p>
                </div>

                {/* What to do */}
                <div className="mt-auto border-t border-zinc-800">
                  <button
                    onClick={() =>
                      setExpandedIdx(isExpanded ? null : i)
                    }
                    className="flex w-full items-center justify-between px-5 py-3 text-sm font-semibold text-[#ffd966] transition-colors hover:bg-zinc-800"
                  >
                    <span>
                      {isKo ? "어떻게 해야 할까요?" : "What to do"}
                    </span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ↓
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="what-to-do"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="border-t border-zinc-800 bg-zinc-800/50 px-5 py-4">
                          <p className="text-sm leading-relaxed text-zinc-300">
                            {isKo ? flag.whatToDoKo : flag.whatToDo}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-5"
        >
          <p className="text-sm text-zinc-400">
            {isKo ? (
              <>
                <span className="font-semibold text-white">
                  사기를 당했다면?{" "}
                </span>
                서울글로벌센터(02-2075-4180)에 연락하거나 경찰(112)에 신고하세요.
                계약금은 절대로 현금으로 주지 마세요.
              </>
            ) : (
              <>
                <span className="font-semibold text-white">
                  If you think you've been scammed:{" "}
                </span>
                Contact the Seoul Global Center (02-2075-4180) or report to
                police (112). Never pay a deposit in cash — always use a
                traceable bank transfer.
              </>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
