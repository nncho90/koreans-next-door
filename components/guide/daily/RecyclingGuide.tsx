"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { loc, locArr } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";
import { RECYCLING_CATEGORIES } from "@/lib/dailyData";

const STRINGS: Record<Locale, {
  sectionLabel: string;
  heading: string;
  sub: string;
  bagLabel: string;
  howToDispose: string;
  fineNotice: string;
}> = {
  en: {
    sectionLabel: "Waste & Recycling",
    heading: "How to throw out trash in Korea",
    sub: "Korea's waste system is strict and specific. Each type of waste has its own bag, bin, and rules — here's everything you need to know.",
    bagLabel: "Bag",
    howToDispose: "How to dispose",
    fineNotice: "⚠️ Breaking recycling rules in Korea can result in fines. When in doubt, ask your building manager (관리인).",
  },
  ko: {
    sectionLabel: "분리수거 안내",
    heading: "쓰레기는 어떻게 버리나요?",
    sub: "한국의 분리수거 시스템은 엄격합니다. 규칙을 지키지 않으면 과태료가 부과될 수 있어요.",
    bagLabel: "봉투",
    howToDispose: "배출 방법",
    fineNotice: "⚠️ 한국에서 분리수거 규칙을 어기면 과태료가 부과될 수 있습니다. 잘 모를 때는 건물 관리인(관리인)에게 물어보세요.",
  },
  ja: {
    sectionLabel: "ゴミ・リサイクル",
    heading: "韓国でのゴミの出し方",
    sub: "韓国の廃棄物システムは厳格です。種類ごとに袋・ゴミ箱・ルールが異なります。",
    bagLabel: "袋",
    howToDispose: "出し方",
    fineNotice: "⚠️ 韓国でリサイクルルールを破ると罰金になる場合があります。不明な点は建物の管理人（관리인）に確認してください。",
  },
  "zh-CN": {
    sectionLabel: "垃圾与回收",
    heading: "在韩国如何扔垃圾",
    sub: "韩国的垃圾处理系统严格细致，每种垃圾都有专用的袋子、垃圾桶和规则。",
    bagLabel: "袋",
    howToDispose: "投放方法",
    fineNotice: "⚠️ 在韩国违反垃圾分类规定可能会被罚款。有疑问时，请向楼栋管理员（관리인）咨询。",
  },
  "zh-TW": {
    sectionLabel: "垃圾與回收",
    heading: "在韓國如何丟垃圾",
    sub: "韓國的垃圾處理系統嚴格細緻，每種垃圾都有專用的袋子、垃圾桶和規則。",
    bagLabel: "袋",
    howToDispose: "投放方法",
    fineNotice: "⚠️ 在韓國違反垃圾分類規定可能會被罰款。有疑問時，請向大樓管理員（관리인）諮詢。",
  },
  pt: {
    sectionLabel: "Lixo e Reciclagem",
    heading: "Como jogar lixo fora na Coreia",
    sub: "O sistema de resíduos da Coreia é rígido e específico. Cada tipo de lixo tem seu próprio saco, lixeira e regras.",
    bagLabel: "Saco",
    howToDispose: "Como descartar",
    fineNotice: "⚠️ Quebrar as regras de reciclagem na Coreia pode resultar em multas. Em caso de dúvida, pergunte ao seu gerente de edifício (관리인).",
  },
  es: {
    sectionLabel: "Basura y Reciclaje",
    heading: "Cómo tirar la basura en Corea",
    sub: "El sistema de residuos de Corea es estricto y específico. Cada tipo de basura tiene su propia bolsa, contenedor y reglas.",
    bagLabel: "Bolsa",
    howToDispose: "Cómo descartar",
    fineNotice: "⚠️ Romper las reglas de reciclaje en Corea puede resultar en multas. En caso de duda, pregunta al administrador de tu edificio (관리인).",
  },
};

export default function RecyclingGuide() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="recycling" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.sectionLabel}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {s.sub}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {RECYCLING_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.nameEn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6"
            >
              {/* Header */}
              <div className="mb-4 flex items-start gap-4">
                <span className="text-4xl">{cat.emoji}</span>
                <div>
                  <div className="text-lg font-bold text-zinc-950">
                    {loc(cat as Record<string, unknown>, "name", locale)}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {locale === "ko" ? cat.nameEn : cat.nameKo}
                  </div>
                </div>
              </div>

              {/* Bag type badge */}
              <div className="mb-4 inline-flex self-start items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5">
                <span className="text-xs font-semibold text-zinc-500">
                  {s.bagLabel}:
                </span>
                <span className="text-xs font-bold text-zinc-800">
                  {loc(cat as Record<string, unknown>, "bagColor", locale)}
                </span>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm text-zinc-500">
                {loc(cat as Record<string, unknown>, "desc", locale)}
              </p>

              {/* Tips */}
              <div className="mb-4 space-y-1.5">
                {locArr(cat as Record<string, unknown>, "tips", locale).map((tip) => (
                  <div key={tip} className="flex items-start gap-2 text-xs text-zinc-600">
                    <span className="mt-0.5 shrink-0 text-[#c9a800]">→</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              {/* How-to */}
              <div className="mt-auto rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                <p className="text-xs font-semibold text-zinc-500 mb-1">
                  {s.howToDispose}
                </p>
                <p className="text-sm text-zinc-700">
                  {loc(cat as Record<string, unknown>, "how", locale)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fine callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5"
        >
          <p className="text-sm font-semibold text-amber-900">
            {s.fineNotice}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
