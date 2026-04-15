"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { loc, locArr } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";
import { BANKS } from "@/lib/moneyData";

const STRINGS: Record<
  Locale,
  {
    sectionLabel: string;
    heading: string;
    subheading: string;
    englishApp: string;
    englishBranch: string;
    seeDocs: string;
    collapse: string;
    requiredDocs: string;
    arcCallout: string;
  }
> = {
  en: {
    sectionLabel: "Bank Account",
    heading: "Which bank is best for foreigners?",
    subheading:
      "You can open a Korean bank account as a foreigner. Here's how the major banks compare on English support and ease of access.",
    englishApp: "English app",
    englishBranch: "English branch",
    seeDocs: "See docs & tips",
    collapse: "Less",
    requiredDocs: "Required docs",
    arcCallout:
      "📋 Most banks require your ARC (Alien Registration Card). Apply for it first. Some banks (especially Hana) are flexible for new arrivals within 6 months of entry — ask at the branch.",
  },
  ko: {
    sectionLabel: "은행 계좌 개설",
    heading: "어느 은행이 외국인에게 좋을까?",
    subheading:
      "외국인도 한국 은행 계좌를 만들 수 있습니다. 영어 지원과 신청 편의성을 기준으로 정리했어요.",
    englishApp: "영어 앱",
    englishBranch: "영어 창구",
    seeDocs: "서류 및 팁 보기",
    collapse: "접기",
    requiredDocs: "필요 서류",
    arcCallout:
      "📋 ARC(외국인등록증) 발급 전에는 계좌 개설이 어려울 수 있습니다. 먼저 ARC를 신청하세요. 일부 은행은 입국 후 6개월 이내에도 개설 가능합니다.",
  },
  ja: {
    sectionLabel: "銀行口座開設",
    heading: "外国人に最適な銀行はどこ？",
    subheading:
      "外国人でも韓国で銀行口座を開設できます。英語サポートと利便性で主要銀行を比較しました。",
    englishApp: "英語アプリ",
    englishBranch: "英語窓口",
    seeDocs: "書類・ヒントを見る",
    collapse: "閉じる",
    requiredDocs: "必要書類",
    arcCallout:
      "📋 多くの銀行では外国人登録証（ARC）が必要です。まずARCを申請しましょう。ハナ銀行（하나은행）など一部の銀行は入国6ヶ月以内でも対応可能です。",
  },
  "zh-CN": {
    sectionLabel: "开设银行账户",
    heading: "哪家银行最适合外国人？",
    subheading:
      "外国人也可以在韩国开设银行账户。以下是主要银行在英语支持和开户便利性方面的比较。",
    englishApp: "英语应用",
    englishBranch: "英语窗口",
    seeDocs: "查看材料和提示",
    collapse: "收起",
    requiredDocs: "所需材料",
    arcCallout:
      "📋 大多数银行需要外国人登录证（ARC）。请先申请ARC。部分银行（尤其是韩亚银行 하나은행）对入境6个月内的新居民有所弹性，可咨询支行。",
  },
  "zh-TW": {
    sectionLabel: "開設銀行帳戶",
    heading: "哪家銀行最適合外國人？",
    subheading:
      "外國人也可以在韓國開設銀行帳戶。以下是主要銀行在英語支援和開戶便利性方面的比較。",
    englishApp: "英語應用",
    englishBranch: "英語窗口",
    seeDocs: "查看材料和提示",
    collapse: "收起",
    requiredDocs: "所需材料",
    arcCallout:
      "📋 大多數銀行需要外國人登錄證（ARC）。請先申請ARC。部分銀行（尤其是韓亞銀行 하나은행）對入境6個月內的新居民有所彈性，可諮詢分行。",
  },
  pt: {
    sectionLabel: "Conta Bancária",
    heading: "Qual banco é melhor para estrangeiros?",
    subheading:
      "Você pode abrir uma conta bancária coreana como estrangeiro. Veja como os principais bancos se comparam em suporte em inglês e facilidade de acesso.",
    englishApp: "App em inglês",
    englishBranch: "Atendimento em inglês",
    seeDocs: "Ver docs & dicas",
    collapse: "Menos",
    requiredDocs: "Documentos necessários",
    arcCallout:
      "📋 A maioria dos bancos exige seu ARC (Cartão de Registro de Estrangeiro). Solicite primeiro. Alguns bancos (especialmente o Hana) são flexíveis para recém-chegados dentro de 6 meses da entrada — pergunte na agência.",
  },
  es: {
    sectionLabel: "Cuenta Bancaria",
    heading: "¿Qué banco es mejor para extranjeros?",
    subheading:
      "Puedes abrir una cuenta bancaria coreana como extranjero. Así es como se comparan los principales bancos en soporte en inglés y facilidad de acceso.",
    englishApp: "App en inglés",
    englishBranch: "Sucursal en inglés",
    seeDocs: "Ver docs y consejos",
    collapse: "Menos",
    requiredDocs: "Documentos requeridos",
    arcCallout:
      "📋 La mayoría de los bancos requieren tu ARC (Tarjeta de Registro de Extranjero). Solicítala primero. Algunos bancos (especialmente Hana) son flexibles para recién llegados dentro de los 6 meses de entrada — pregunta en la sucursal.",
  },
};

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
  const s = STRINGS[locale] ?? STRINGS.en;
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section id="banks" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.sectionLabel}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">{s.subheading}</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BANKS.map((bank, i) => {
            const isExpanded = expandedIdx === i;
            const desc = loc(bank as Record<string, unknown>, "desc", locale);
            const tips = loc(bank as Record<string, unknown>, "tips", locale);
            const docs = locArr(bank as Record<string, unknown>, "requiredDocs", locale);

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
                  {desc}
                </p>

                {/* Badges */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  <Badge label={s.englishApp} active={bank.englishApp} />
                  <Badge label={s.englishBranch} active={bank.englishBranch} />
                </div>

                {/* Expand toggle */}
                <button
                  onClick={() => setExpandedIdx(isExpanded ? null : i)}
                  className="mt-auto flex items-center gap-1 text-xs font-semibold text-[#c9a800] hover:text-zinc-900 transition-colors"
                >
                  {isExpanded ? s.collapse : s.seeDocs}
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
                          {s.requiredDocs}
                        </p>
                        <ul className="space-y-1">
                          {docs.map((doc) => (
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
                        <p className="text-xs text-zinc-700">💡 {tips}</p>
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
          <p className="text-sm font-semibold text-zinc-800">{s.arcCallout}</p>
        </motion.div>
      </div>
    </section>
  );
}
