"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { COMMON_PITFALLS } from "@/lib/visaData";

export default function CommonPitfalls() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="pitfalls" className="bg-zinc-950 px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            {isKo ? "주의사항" : "Watch Out"}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            {isKo ? "자주 하는 실수들" : "Common pitfalls"}
          </h2>
          <p className="mb-12 max-w-xl text-zinc-400">
            {isKo
              ? "비자 위반은 벌금, 출국 명령, 재입국 금지로 이어질 수 있습니다. 이 실수들을 미리 알아두세요."
              : "Visa violations can lead to fines, deportation orders, and bans on re-entry. Know these before they catch you off guard."}
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COMMON_PITFALLS.map((pitfall, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="flex flex-col rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
            >
              {/* Visa tag */}
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-lg border border-zinc-600 px-2.5 py-0.5 text-xs font-bold text-zinc-400">
                  {pitfall.visa}
                </span>
                <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">
                  {isKo ? "⚠ 주의" : "⚠ Warning"}
                </span>
              </div>

              {/* Issue */}
              <h3 className="mb-3 font-bold text-white leading-snug">
                {isKo ? pitfall.issueKo : pitfall.issueEn}
              </h3>

              {/* Divider */}
              <div className="mb-3 h-px w-full bg-zinc-800" />

              {/* Solution */}
              <p className="text-sm leading-relaxed text-zinc-400">
                {isKo ? pitfall.solutionKo : pitfall.solutionEn}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 rounded-2xl border border-zinc-700 bg-zinc-900 px-7 py-6 md:flex md:items-center md:justify-between"
        >
          <div className="mb-4 md:mb-0">
            <p className="font-semibold text-white">
              {isKo ? "비자 문의가 있으신가요?" : "Have a visa question?"}
            </p>
            <p className="mt-0.5 text-sm text-zinc-400">
              {isKo
                ? "출입국·외국인청 콜센터 1345 (한국어 + 영어 안내)"
                : "Call the immigration helpline at 1345 — they have English support."}
            </p>
          </div>
          <a
            href="tel:1345"
            className="inline-flex items-center gap-2 rounded-xl bg-[#ffd966] px-6 py-3 text-sm font-bold text-zinc-900 transition-colors hover:bg-[#c9a800]"
          >
            <span>📞</span>
            {isKo ? "1345 전화하기" : "Call 1345"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
