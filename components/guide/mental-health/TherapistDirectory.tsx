"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { THERAPISTS } from "@/lib/mentalHealthData";

type Therapist = (typeof THERAPISTS)[number];

const TherapistMap = dynamic(() => import("./TherapistMap"), { ssr: false });

const LANG_COLORS: Record<string, string> = {
  English: "bg-emerald-100 text-emerald-700",
  Korean: "bg-blue-100 text-blue-700",
  Chinese: "bg-red-100 text-red-700",
  Japanese: "bg-purple-100 text-purple-700",
  French: "bg-indigo-100 text-indigo-700",
  Multiple: "bg-zinc-100 text-zinc-600",
};

export default function TherapistDirectory() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const [selected, setSelected] = useState<Therapist | null>(null);

  return (
    <section id="therapists" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            {isKo ? "상담사 찾기" : "Find a Therapist"}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
            {isKo ? "전문적인 도움 받기" : "Getting professional help"}
          </h2>
          <p className="mb-8 max-w-xl text-zinc-500">
            {isKo
              ? "도움을 청하는 것은 용기 있는 일입니다. 한국에서 영어로 상담을 받을 수 있는 옵션들을 모았어요."
              : "Asking for help takes courage. Here are real options for getting English-language mental health support in Korea."}
          </p>
        </motion.div>

        {/* Therapist cards */}
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          {THERAPISTS.map((therapist, i) => (
            <motion.div
              key={therapist.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`rounded-2xl border p-5 transition-all cursor-pointer ${
                selected?.name === therapist.name
                  ? "border-[#ffd966] bg-[#ffd966]/5"
                  : "border-zinc-200 bg-[#fafaf8] hover:border-zinc-300"
              }`}
              onClick={() => setSelected(selected?.name === therapist.name ? null : therapist)}
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold leading-snug text-zinc-950">{therapist.name}</h3>
                  <p className="text-sm text-zinc-400">{therapist.nameKo}</p>
                </div>
                <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                  {isKo ? therapist.typeKo : therapist.type}
                </span>
              </div>

              {/* Languages */}
              <div className="mb-3 flex flex-wrap gap-1.5">
                {therapist.languages.map((lang) => (
                  <span
                    key={lang}
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${LANG_COLORS[lang] ?? "bg-zinc-100 text-zinc-600"}`}
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <p className="mb-3 text-sm text-zinc-600">
                {isKo ? therapist.descKo : therapist.descEn}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                <span>📍 {isKo ? therapist.locationKo : therapist.locationEn}</span>
                <span>💰 {isKo ? therapist.priceRangeKo : therapist.priceRangeEn}</span>
              </div>

              {/* Expanded contact */}
              {selected?.name === therapist.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 border-t border-zinc-200 pt-4"
                >
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="font-semibold text-zinc-700">
                      {isKo ? "연락처:" : "Contact:"}
                    </span>
                    <span className="text-zinc-600">{therapist.contact}</span>
                  </div>
                  {therapist.website !== therapist.contact && (
                    <div className="mt-1 flex flex-wrap gap-2 text-sm">
                      <span className="font-semibold text-zinc-700">
                        {isKo ? "웹사이트:" : "Website:"}
                      </span>
                      <span className="text-zinc-600">{therapist.website}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 text-sm font-semibold text-zinc-500">
            {isKo ? "지도에서 위치 확인 (핀을 클릭하세요)" : "Locations on map — click a pin for details"}
          </p>
          <div className="overflow-hidden rounded-2xl border border-zinc-200">
            <TherapistMap therapists={THERAPISTS} onSelect={setSelected} />
          </div>

          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-2xl border border-zinc-200 bg-[#fafaf8] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-zinc-950">{selected.name}</h3>
                  <p className="text-sm text-zinc-400">{selected.nameKo}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-xs text-zinc-400 hover:text-zinc-600"
                >
                  ✕ {isKo ? "닫기" : "close"}
                </button>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                {isKo ? selected.descKo : selected.descEn}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                <span>📍 {isKo ? selected.locationKo : selected.locationEn}</span>
                <span>💰 {isKo ? selected.priceRangeKo : selected.priceRangeEn}</span>
                <span>📞 {selected.contact}</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Tip callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5"
        >
          <p className="text-sm font-semibold text-zinc-800">
            {isKo
              ? "💛 처음 상담사를 찾는 게 막막하다면, 서울글로벌센터(02-2075-4180)에 먼저 전화해보세요. 무료로 연결해 드립니다."
              : "💛 Not sure where to start? Call Seoul Global Center (02-2075-4180) first. It's free, and they'll help match you with the right therapist."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
