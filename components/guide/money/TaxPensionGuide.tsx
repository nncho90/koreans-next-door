"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";
import { TAX_INFO, PENSION_INFO } from "@/lib/moneyData";

const STRINGS: Record<
  Locale,
  {
    taxLabel: string;
    taxHeading: string;
    taxSubheading: string;
    pensionLabel: string;
    pensionHeading: string;
    pensionSubheading: string;
    whatIsNPS: string;
    gettingRefund: string;
    exemptions: string;
    officialResourceLabel: string;
    officialResourceBody: (link: React.ReactNode) => React.ReactNode;
  }
> = {
  en: {
    taxLabel: "Taxes",
    taxHeading: "Taxes — less scary than you think",
    taxSubheading:
      "Working in Korea means paying Korean taxes. The good news: your employer handles most of it automatically.",
    pensionLabel: "Pension",
    pensionHeading: "National Pension — you can get it back",
    pensionSubheading:
      "When you leave Korea, you may be entitled to a full refund of your pension contributions. Here's what you need to know.",
    whatIsNPS: "What is NPS?",
    gettingRefund: "Getting a refund",
    exemptions: "Exemptions",
    officialResourceLabel: "🔗 Official resource: ",
    officialResourceBody: (link) => (
      <>Visit {link} to apply for a lump-sum refund and find detailed eligibility info.</>
    ),
  },
  ko: {
    taxLabel: "세금 안내",
    taxHeading: "세금, 어렵지 않아요",
    taxSubheading:
      "한국에서 일하는 외국인도 세금을 납부합니다. 하지만 대부분은 고용주가 처리해줍니다.",
    pensionLabel: "국민연금",
    pensionHeading: "연금 — 나중에 돌려받을 수 있어요",
    pensionSubheading:
      "한국을 떠날 때 납부한 연금을 환급받을 수 있습니다. 제대로 알아두세요.",
    whatIsNPS: "국민연금이란?",
    gettingRefund: "떠날 때 환급받기",
    exemptions: "납부 면제 대상",
    officialResourceLabel: "🔗 공식 안내: ",
    officialResourceBody: (link) => (
      <>국민연금 영어 사이트 {link}에서 환급 신청 및 자세한 정보를 확인하세요.</>
    ),
  },
  ja: {
    taxLabel: "税金ガイド",
    taxHeading: "税金 — 思ったよりシンプルです",
    taxSubheading:
      "韓国で働く場合は韓国の税金を支払います。ほとんどは雇用主が自動的に処理してくれます。",
    pensionLabel: "国民年金",
    pensionHeading: "国民年金 — 帰国時に取り戻せます",
    pensionSubheading:
      "韓国を離れる際、納付した年金の全額還付を受けられる可能性があります。必要な情報をまとめました。",
    whatIsNPS: "国民年金とは？",
    gettingRefund: "還付を受ける",
    exemptions: "免除対象",
    officialResourceLabel: "🔗 公式情報: ",
    officialResourceBody: (link) => (
      <>一時金還付の申請や詳細な資格情報は{link}でご確認ください。</>
    ),
  },
  "zh-CN": {
    taxLabel: "税务指南",
    taxHeading: "税务 — 没那么复杂",
    taxSubheading:
      "在韩国工作需缴纳韩国所得税。好消息是：大部分由雇主自动处理。",
    pensionLabel: "国民年金",
    pensionHeading: "国民年金 — 离境时可以取回",
    pensionSubheading:
      "离开韩国时，您可能有权全额退还已缴纳的年金。以下是您需要了解的内容。",
    whatIsNPS: "什么是NPS？",
    gettingRefund: "申请退款",
    exemptions: "免缴对象",
    officialResourceLabel: "🔗 官方资源：",
    officialResourceBody: (link) => (
      <>访问{link}申请一次性退款并查看详细资格信息。</>
    ),
  },
  "zh-TW": {
    taxLabel: "稅務指南",
    taxHeading: "稅務 — 沒那麼複雜",
    taxSubheading:
      "在韓國工作需繳納韓國所得稅。好消息是：大部分由雇主自動處理。",
    pensionLabel: "國民年金",
    pensionHeading: "國民年金 — 離境時可以取回",
    pensionSubheading:
      "離開韓國時，您可能有權全額退還已繳納的年金。以下是您需要了解的內容。",
    whatIsNPS: "什麼是NPS？",
    gettingRefund: "申請退款",
    exemptions: "免繳對象",
    officialResourceLabel: "🔗 官方資源：",
    officialResourceBody: (link) => (
      <>訪問{link}申請一次性退款並查看詳細資格資訊。</>
    ),
  },
  pt: {
    taxLabel: "Impostos",
    taxHeading: "Impostos — menos assustador do que você pensa",
    taxSubheading:
      "Trabalhar na Coreia significa pagar impostos coreanos. A boa notícia: seu empregador cuida da maior parte automaticamente.",
    pensionLabel: "Previdência",
    pensionHeading: "Previdência Nacional — você pode reaver",
    pensionSubheading:
      "Ao sair da Coreia, você pode ter direito ao reembolso total das suas contribuições previdenciárias. Aqui está o que você precisa saber.",
    whatIsNPS: "O que é o NPS?",
    gettingRefund: "Recebendo um reembolso",
    exemptions: "Isenções",
    officialResourceLabel: "🔗 Recurso oficial: ",
    officialResourceBody: (link) => (
      <>Visite {link} para solicitar um reembolso único e encontrar informações detalhadas sobre elegibilidade.</>
    ),
  },
  es: {
    taxLabel: "Impuestos",
    taxHeading: "Impuestos — menos aterrador de lo que piensas",
    taxSubheading:
      "Trabajar en Corea significa pagar impuestos coreanos. La buena noticia: tu empleador maneja la mayor parte automáticamente.",
    pensionLabel: "Pensión",
    pensionHeading: "Pensión Nacional — puedes recuperarla",
    pensionSubheading:
      "Al salir de Corea, es posible que tengas derecho a un reembolso total de tus contribuciones de pensión. Aquí está lo que necesitas saber.",
    whatIsNPS: "¿Qué es el NPS?",
    gettingRefund: "Obteniendo un reembolso",
    exemptions: "Exenciones",
    officialResourceLabel: "🔗 Recurso oficial: ",
    officialResourceBody: (link) => (
      <>Visita {link} para solicitar un reembolso único y encontrar información detallada sobre elegibilidad.</>
    ),
  },
};

function TaxCard({
  item,
  locale,
  index,
}: {
  item: (typeof TAX_INFO)[number];
  locale: Locale;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const topic = loc(item as Record<string, unknown>, "topic", locale);
  const content = loc(item as Record<string, unknown>, "content", locale);

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
            <p className="font-semibold text-zinc-900">{topic}</p>
            {locale !== "ko" && (
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
            <p className="text-sm leading-relaxed text-zinc-600">{content}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function TaxPensionGuide() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  const npsLink = (
    <a
      href="https://www.nps.or.kr/english"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#c9a800] underline hover:text-zinc-900 transition-colors"
    >
      nps.or.kr/english
    </a>
  );

  return (
    <section id="taxes" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">

        {/* ── Tax Section ─────────────────────────────────────────── */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.taxLabel}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.taxHeading}
        </h2>
        <p className="mb-8 max-w-xl text-zinc-500">{s.taxSubheading}</p>

        <div className="mb-14 space-y-3">
          {TAX_INFO.map((item, i) => (
            <TaxCard key={item.topicEn} item={item} locale={locale} index={i} />
          ))}
        </div>

        {/* ── Pension Section ─────────────────────────────────────── */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.pensionLabel}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.pensionHeading}
        </h2>
        <p className="mb-8 max-w-xl text-zinc-500">{s.pensionSubheading}</p>

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
            <h3 className="mb-2 font-bold text-zinc-900">{s.whatIsNPS}</h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              {loc(PENSION_INFO as Record<string, unknown>, "what", locale)}
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
            <h3 className="mb-2 font-bold text-zinc-900">{s.gettingRefund}</h3>
            <p className="text-sm leading-relaxed text-zinc-600">
              {loc(PENSION_INFO as Record<string, unknown>, "refund", locale)}
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
            <h3 className="mb-2 font-bold text-zinc-900">{s.exemptions}</h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              {loc(PENSION_INFO as Record<string, unknown>, "exemptions", locale)}
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
              {s.officialResourceLabel}
            </span>
            {s.officialResourceBody(npsLink)}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
