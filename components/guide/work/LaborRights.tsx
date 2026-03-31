"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { LABOR_RIGHTS } from "@/lib/workData";

export default function LaborRights() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="rights" className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "근로자 권리" : "Your Rights"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {isKo
            ? "외국인 근로자도 동일한 권리를 가집니다"
            : "Know your rights — they apply to you too"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-400">
          {isKo
            ? "많은 외국인이 자신의 근로 권리를 모른 채 불이익을 당합니다. 한국 노동법은 국적과 비자 종류에 관계없이 적용됩니다."
            : "Many foreigners in Korea don't know their rights — and some employers count on that. Korean labor law protects you regardless of nationality or visa status."}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {LABOR_RIGHTS.map((right, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mb-3 text-2xl">{right.emoji}</div>
              <div className="mb-1">
                <h3 className="font-bold text-white">
                  {isKo ? right.rightKo : right.rightEn}
                </h3>
                <p className="text-xs text-zinc-500">
                  {isKo ? right.rightEn : right.rightKo}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {isKo ? right.descKo : right.descEn}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-semibold text-white">
              {isKo
                ? "근로 권리에 대해 궁금한 점이 있으신가요?"
                : "Questions about your rights at work?"}
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              {isKo
                ? "고용노동부 전화 상담: 영어 지원 가능 (무료)"
                : "Ministry of Employment and Labor hotline — some English available, free to call"}
            </p>
          </div>
          <a
            href="tel:1350"
            className="flex-shrink-0 rounded-xl bg-[#ffd966] px-5 py-3 text-sm font-bold text-zinc-900 transition-opacity hover:opacity-90"
          >
            📞 1350
          </a>
        </motion.div>
      </div>
    </section>
  );
}
