"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { CONTRACT_SECTIONS } from "@/lib/workData";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";

const STRINGS: Record<Locale, {
  eyebrow: string;
  heading: string;
  subtitle: string;
  watchOut: string;
  tip: string;
}> = {
  en: {
    eyebrow: "Employment Contract",
    heading: "What every clause in your contract means",
    subtitle: "Korean employment contracts are written in Korean. Here's what each section means — and what to watch out for.",
    watchOut: "Watch out: ",
    tip: "💡 Before signing, go through every clause line by line. You have the right to ask for an explanation of anything you don't understand — even if it feels awkward.",
  },
  ko: {
    eyebrow: "계약서 가이드",
    heading: "계약서 항목별 설명",
    subtitle: "한국 근로계약서의 주요 항목을 이해하면 불이익을 미리 막을 수 있습니다.",
    watchOut: "주의: ",
    tip: "💡 계약서에 서명하기 전, 모든 항목을 한 줄씩 확인하세요. 이해하지 못한 조항은 반드시 설명을 요청할 권리가 있습니다.",
  },
  ja: {
    eyebrow: "雇用契約書",
    heading: "契約書の各条項が意味すること",
    subtitle: "韓国の雇用契約書は韓国語で書かれています。各セクションの意味と注意点を解説します。",
    watchOut: "注意: ",
    tip: "💡 署名前に各条項を一行ずつ確認してください。理解できない内容は説明を求める権利があります。",
  },
  "zh-CN": {
    eyebrow: "劳动合同",
    heading: "合同中每个条款的含义",
    subtitle: "韩国劳动合同用韩语撰写。以下是每个部分的含义及注意事项。",
    watchOut: "注意: ",
    tip: "💡 签字前逐行检查每个条款。对于任何不理解的内容，您有权要求解释。",
  },
  "zh-TW": {
    eyebrow: "勞動契約",
    heading: "合約中每個條款的含義",
    subtitle: "韓國勞動契約以韓語撰寫。以下是每個部分的含義及注意事項。",
    watchOut: "注意: ",
    tip: "💡 簽字前逐行確認每個條款。對於任何不理解的內容，您有權要求解釋。",
  },
  pt: {
    eyebrow: "Contrato de Trabalho",
    heading: "O que cada cláusula do seu contrato significa",
    subtitle: "Os contratos de trabalho na Coreia são escritos em coreano. Veja o que cada seção significa — e o que observar.",
    watchOut: "Atenção: ",
    tip: "💡 Antes de assinar, revise cada cláusula linha por linha. Você tem o direito de pedir explicações sobre qualquer coisa que não entender.",
  },
  es: {
    eyebrow: "Contrato Laboral",
    heading: "Lo que significa cada cláusula de tu contrato",
    subtitle: "Los contratos de trabajo en Corea están escritos en coreano. Aquí está lo que significa cada sección — y a qué prestar atención.",
    watchOut: "Cuidado: ",
    tip: "💡 Antes de firmar, revisa cada cláusula línea por línea. Tienes derecho a pedir una explicación de cualquier cosa que no entiendas.",
  },
};

export default function ContractGuide() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="contract" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.eyebrow}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {s.subtitle}
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
                      {loc(section as Record<string, unknown>, "field", locale)}
                    </span>
                    {locale !== "ko" && (
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
                          {loc(section as Record<string, unknown>, "desc", locale)}
                        </p>

                        {/* Red flag */}
                        <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
                          <span className="mt-0.5 text-base">🚩</span>
                          <p className="text-sm text-amber-800">
                            <span className="font-semibold">
                              {s.watchOut}
                            </span>
                            {loc(section as Record<string, unknown>, "redFlag", locale)}
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
            {s.tip}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
