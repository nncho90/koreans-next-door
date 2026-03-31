"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { SUPPORT_GROUPS } from "@/lib/mentalHealthData";

export default function SupportGroups() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="community" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
            {isKo ? "커뮤니티" : "Community"}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
            {isKo ? "연결이 약입니다" : "Connection is medicine"}
          </h2>
          <p className="mb-10 max-w-xl text-zinc-500">
            {isKo
              ? "당신의 사람들을 찾을 수 있는 곳입니다. 외국인 그룹, 지원 모임, 그리고 KND."
              : "Connection is medicine. Here's where to find your people."}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {SUPPORT_GROUPS.map((group, i) => (
            <motion.div
              key={group.nameEn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="mb-1">
                <h3 className="font-bold text-zinc-950">{isKo ? group.nameKo : group.nameEn}</h3>
                {!isKo && <p className="text-sm text-zinc-400">{group.nameKo}</p>}
              </div>
              <p className="mb-4 mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                {isKo ? group.descKo : group.descEn}
              </p>
              <div className="mt-auto rounded-xl bg-[#fafaf8] px-4 py-3">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  {isKo ? "찾는 방법" : "How to find"}
                </p>
                <p className="text-sm font-medium text-zinc-700">{group.contact}</p>
              </div>

              {/* Highlight KND */}
              {group.nameEn.includes("KND") && (
                <div className="mt-3 rounded-xl border border-[#ffd966]/50 bg-[#ffd966]/10 px-4 py-2">
                  <p className="text-xs font-semibold text-zinc-800">
                    {isKo
                      ? "✨ 이게 바로 저희입니다 — 직접 연락해 주세요!"
                      : "✨ That's us — come say hi!"}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-2xl bg-zinc-950 px-6 py-6 text-white"
        >
          <h3 className="mb-2 text-lg font-bold">
            {isKo ? "처음 시작하기가 제일 어렵습니다" : "The hardest part is showing up the first time"}
          </h3>
          <p className="text-sm text-zinc-400">
            {isKo
              ? "그룹에 처음 나가거나 이벤트에 처음 참석하는 건 무섭습니다. 하지만 대부분의 사람들이 당신처럼 연결을 원하고 있습니다. 그냥 가세요."
              : "Going to a group or an event for the first time feels scary. But most people there are also looking for connection — just like you. Just go. It gets easier every time."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
