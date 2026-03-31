"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { BANKS } from "@/lib/moneyData";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-sm ${i <= rating ? "text-[#ffd966]" : "text-zinc-200"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Badge({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-zinc-100 text-zinc-400 border border-zinc-200"
      }`}
    >
      {active ? "✓" : "✕"} {label}
    </span>
  );
}

export default function BankGuide() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section id="banks" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "은행 계좌 개설" : "Bank Account"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo
            ? "어느 은행이 외국인에게 좋을까?"
            : "Which bank is best for foreigners?"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "외국인도 한국 은행 계좌를 만들 수 있습니다. 영어 지원과 신청 편의성을 기준으로 정리했어요."
            : "You can open a Korean bank account as a foreigner. Here's how the major banks compare on English support and ease of access."}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BANKS.map((bank, i) => {
            const isExpanded = expandedIdx === i;
            return (
              <motion.div
                key={bank.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`flex flex-col rounded-2xl border bg-white p-6 transition-all ${
                  isExpanded
                    ? "border-[#ffd966]/60 shadow-md shadow-[#ffd966]/10"
                    : "border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
                }`}
              >
                {/* Header */}
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <div className="text-lg font-bold text-zinc-950">
                      {bank.name}
                    </div>
                    <div className="text-sm text-zinc-400">{bank.nameKo}</div>
                  </div>
                  <StarRating rating={bank.foreignerFriendly} />
                </div>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-zinc-500">
                  {isKo ? bank.descKo : bank.descEn}
                </p>

                {/* Badges */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  <Badge
                    label={isKo ? "영어 앱" : "English app"}
                    active={bank.englishApp}
                  />
                  <Badge
                    label={isKo ? "영어 창구" : "English branch"}
                    active={bank.englishBranch}
                  />
                </div>

                {/* Expand toggle */}
                <button
                  onClick={() => setExpandedIdx(isExpanded ? null : i)}
                  className="mt-auto flex items-center gap-1 text-xs font-semibold text-[#c9a800] hover:text-zinc-900 transition-colors"
                >
                  {isExpanded
                    ? isKo
                      ? "접기"
                      : "Less"
                    : isKo
                    ? "서류 및 팁 보기"
                    : "See docs & tips"}
                  <span
                    className={`transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 border-t border-zinc-100 pt-4">
                      {/* Required docs */}
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400">
                          {isKo ? "필요 서류" : "Required docs"}
                        </p>
                        <ul className="space-y-1">
                          {(isKo
                            ? bank.requiredDocsKo
                            : bank.requiredDocsEn
                          ).map((doc) => (
                            <li
                              key={doc}
                              className="flex items-start gap-1.5 text-xs text-zinc-600"
                            >
                              <span className="mt-0.5 text-[#ffd966]">▸</span>
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tip */}
                      <div className="rounded-xl bg-[#ffd966]/10 px-4 py-3 border border-[#ffd966]/30">
                        <p className="text-xs text-zinc-700">
                          💡 {isKo ? bank.tipsKo : bank.tips}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* General tip callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5"
        >
          <p className="text-sm font-semibold text-zinc-800">
            {isKo
              ? "📋 ARC(외국인등록증) 발급 전에는 계좌 개설이 어려울 수 있습니다. 먼저 ARC를 신청하세요. 일부 은행은 입국 후 6개월 이내에도 개설 가능합니다."
              : "📋 Most banks require your ARC (Alien Registration Card). Apply for it first. Some banks (especially Hana) are flexible for new arrivals within 6 months of entry — ask at the branch."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
