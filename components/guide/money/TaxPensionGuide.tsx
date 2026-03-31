"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { TAX_INFO, PENSION_INFO } from "@/lib/moneyData";

function TaxCard({
  item,
  isKo,
  index,
}: {
  item: (typeof TAX_INFO)[number];
  isKo: boolean;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="rounded-2xl border border-zinc-200 bg-white overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-zinc-50 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffd966]/20 text-sm font-bold text-[#c9a800]">
            {index + 1}
          </div>
          <div>
            <p className="font-semibold text-zinc-900">
              {isKo ? item.topicKo : item.topicEn}
            </p>
            {!isKo && (
              <p className="text-xs text-zinc-400">{item.topicKo}</p>
            )}
          </div>
        </div>
        <span
          className={`ml-3 shrink-0 text-zinc-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="border-t border-zinc-100 px-6 py-5">
            <p className="text-sm leading-relaxed text-zinc-600">
              {isKo ? item.contentKo : item.contentEn}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function TaxPensionGuide() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="taxes" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">

        {/* ── Tax Section ─────────────────────────────────────────── */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "세금 안내" : "Taxes"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo ? "세금, 어렵지 않아요" : "Taxes — less scary than you think"}
        </h2>
        <p className="mb-8 max-w-xl text-zinc-500">
          {isKo
            ? "한국에서 일하는 외국인도 세금을 납부합니다. 하지만 대부분은 고용주가 처리해줍니다."
            : "Working in Korea means paying Korean taxes. The good news: your employer handles most of it automatically."}
        </p>

        <div className="mb-14 space-y-3">
          {TAX_INFO.map((item, i) => (
            <TaxCard key={item.topicEn} item={item} isKo={isKo} index={i} />
          ))}
        </div>

        {/* ── Pension Section ─────────────────────────────────────── */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "국민연금" : "Pension"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo
            ? "연금 — 나중에 돌려받을 수 있어요"
            : "National Pension — you can get it back"}
        </h2>
        <p className="mb-8 max-w-xl text-zinc-500">
          {isKo
            ? "한국을 떠날 때 납부한 연금을 환급받을 수 있습니다. 제대로 알아두세요."
            : "When you leave Korea, you may be entitled to a full refund of your pension contributions. Here's what you need to know."}
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {/* What it is */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 }}
            className="rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xl">
              🏛️
            </div>
            <h3 className="mb-2 font-bold text-zinc-900">
              {isKo ? "국민연금이란?" : "What is NPS?"}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              {isKo ? PENSION_INFO.whatKo : PENSION_INFO.whatEn}
            </p>
          </motion.div>

          {/* Refund */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-[#ffd966]/40 bg-[#fff9e0] p-6"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#ffd966]/30 text-xl">
              💰
            </div>
            <h3 className="mb-2 font-bold text-zinc-900">
              {isKo ? "떠날 때 환급받기" : "Getting a refund"}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-600">
              {isKo ? PENSION_INFO.refundKo : PENSION_INFO.refundEn}
            </p>
          </motion.div>

          {/* Exemptions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xl">
              🤝
            </div>
            <h3 className="mb-2 font-bold text-zinc-900">
              {isKo ? "납부 면제 대상" : "Exemptions"}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              {isKo ? PENSION_INFO.exemptionsKo : PENSION_INFO.exemptionsEn}
            </p>
          </motion.div>
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-8 rounded-2xl border border-zinc-200 bg-white px-6 py-5"
        >
          <p className="text-sm text-zinc-600">
            <span className="font-semibold text-zinc-900">
              {isKo ? "🔗 공식 안내: " : "🔗 Official resource: "}
            </span>
            {isKo ? (
              <>
                국민연금 영어 사이트{" "}
                <a
                  href="https://www.nps.or.kr/english"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c9a800] underline hover:text-zinc-900 transition-colors"
                >
                  nps.or.kr/english
                </a>
                에서 환급 신청 및 자세한 정보를 확인하세요.
              </>
            ) : (
              <>
                Visit{" "}
                <a
                  href="https://www.nps.or.kr/english"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c9a800] underline hover:text-zinc-900 transition-colors"
                >
                  nps.or.kr/english
                </a>{" "}
                to apply for a lump-sum refund and find detailed eligibility info.
              </>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
