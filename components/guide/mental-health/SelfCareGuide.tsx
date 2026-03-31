"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { SELF_CARE_TIPS } from "@/lib/mentalHealthData";

export default function SelfCareGuide() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="self-care" className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            {isKo ? "셀프 케어" : "Self-Care"}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            {isKo ? "매일 할 수 있는 것들" : "Things you can do every day"}
          </h2>
          <p className="mb-10 max-w-xl text-zinc-400">
            {isKo
              ? "임상적 조언이 아닙니다. 한국에서 살아온 외국인들이 실제로 도움이 됐다고 하는 것들이에요."
              : "Not clinical advice. Just real things that actually help — from people who've been where you are."}
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SELF_CARE_TIPS.map((tip, i) => (
            <motion.div
              key={tip.tipEn}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mb-3 text-3xl">{tip.emoji}</div>
              <h3 className="mb-1 font-bold text-white">
                {isKo ? tip.tipKo : tip.tipEn}
              </h3>
              {!isKo && (
                <p className="mb-2 text-xs text-zinc-500">{tip.tipKo}</p>
              )}
              <p className="text-sm leading-relaxed text-zinc-400">
                {isKo ? tip.descKo : tip.descEn}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="mx-auto max-w-lg rounded-2xl border border-[#ffd966]/30 bg-[#ffd966]/5 px-8 py-8">
            <p className="mb-2 text-2xl">💛</p>
            <h3 className="mb-3 text-lg font-bold text-white">
              {isKo ? "당신은 여기 있을 자격이 있습니다" : "You belong here"}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              {isKo
                ? "한국에 사는 모든 외국인이 힘든 순간을 겪습니다. 그건 당신이 약해서가 아닙니다. 낯선 곳에서 살아가는 용기 있는 사람이기 때문입니다."
                : "Every foreigner in Korea has hard moments. That's not weakness — it's what it means to be brave enough to build a life somewhere unfamiliar. We're glad you're here."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
