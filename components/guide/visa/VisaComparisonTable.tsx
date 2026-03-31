"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { VISA_TYPES } from "@/lib/visaData";

type Category = "study" | "work" | "resident" | "tourist";

const TABS: { id: Category; labelEn: string; labelKo: string; emoji: string }[] = [
  { id: "study", labelEn: "Study", labelKo: "학업", emoji: "📚" },
  { id: "work", labelEn: "Work", labelKo: "취업", emoji: "💼" },
  { id: "resident", labelEn: "Resident", labelKo: "거주", emoji: "🏠" },
  { id: "tourist", labelEn: "Tourist", labelKo: "관광", emoji: "✈️" },
];

export default function VisaComparisonTable() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const [activeTab, setActiveTab] = useState<Category>("study");

  const filtered = VISA_TYPES.filter((v) => v.category === activeTab);

  return (
    <section id="visa-types" className="bg-white px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            {isKo ? "비자 유형" : "Visa Types"}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
            {isKo ? "주요 비자 비교" : "Compare visa types"}
          </h2>
          <p className="mb-8 max-w-xl text-zinc-500">
            {isKo
              ? "카테고리를 선택해 각 비자의 목적, 기간, 취업 권리를 확인하세요."
              : "Select a category to compare visa purpose, duration, and work rights."}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-zinc-950 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              <span>{tab.emoji}</span>
              {isKo ? tab.labelKo : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Table — horizontally scrollable on mobile */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-200">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-5 py-4 text-left font-semibold text-zinc-600">
                  {isKo ? "비자" : "Visa"}
                </th>
                <th className="px-5 py-4 text-left font-semibold text-zinc-600">
                  {isKo ? "목적" : "Purpose"}
                </th>
                <th className="px-5 py-4 text-left font-semibold text-zinc-600">
                  {isKo ? "체류 기간" : "Duration"}
                </th>
                <th className="px-5 py-4 text-left font-semibold text-zinc-600">
                  {isKo ? "취업" : "Work"}
                </th>
                <th className="px-5 py-4 text-left font-semibold text-zinc-600">
                  {isKo ? "주요 서류" : "Key docs"}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((visa, idx) => (
                <motion.tr
                  key={visa.code}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50"
                >
                  {/* Code + name */}
                  <td className="px-5 py-4 align-top">
                    <span className="inline-block rounded-lg bg-[#ffd966] px-2.5 py-0.5 text-sm font-black text-zinc-900">
                      {visa.code}
                    </span>
                    <p className="mt-1 text-xs font-medium text-zinc-500">
                      {isKo ? visa.nameKo : visa.nameEn}
                    </p>
                  </td>

                  {/* Purpose */}
                  <td className="px-5 py-4 align-top">
                    <p className="text-zinc-700">
                      {isKo ? visa.purposeKo : visa.purposeEn}
                    </p>
                  </td>

                  {/* Duration */}
                  <td className="px-5 py-4 align-top whitespace-nowrap">
                    <p className="text-zinc-700">
                      {isKo ? visa.durationKo : visa.durationEn}
                    </p>
                  </td>

                  {/* Work rights */}
                  <td className="px-5 py-4 align-top">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        visa.canWork
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {visa.canWork
                        ? (isKo ? "가능" : "Yes")
                        : (isKo ? "불가" : "No")}
                    </span>
                    <p className="mt-1 text-xs text-zinc-400">
                      {isKo ? visa.workNoteKo : visa.workNoteEn}
                    </p>
                  </td>

                  {/* Requirements */}
                  <td className="px-5 py-4 align-top">
                    <ul className="flex flex-col gap-0.5">
                      {(isKo ? visa.requirementsKo : visa.requirementsEn).map(
                        (req, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-500">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                            {req}
                          </li>
                        )
                      )}
                    </ul>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <p className="mt-4 text-xs text-zinc-400">
          {isKo
            ? "비자 규정은 변경될 수 있습니다. 최신 정보는 하이코리아(hikorea.go.kr) 또는 한국 대사관에서 확인하세요."
            : "Visa regulations change. Always verify current requirements at hikorea.go.kr or your nearest Korean embassy."}
        </p>
      </div>
    </section>
  );
}
