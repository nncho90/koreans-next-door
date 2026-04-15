"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { WORKPLACE_CULTURE } from "@/lib/workData";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";

const STRINGS: Record<Locale, {
  eyebrow: string;
  heading: string;
  subtitle: string;
  calloutBold: string;
  calloutBody: string;
}> = {
  en: {
    eyebrow: "Workplace Culture",
    heading: "Navigating Korean work culture",
    subtitle: "Korean workplace culture can feel surprising if you're coming from abroad. This isn't a critique — it's a navigation guide so you can settle in with confidence.",
    calloutBold: "Struggling with cultural differences at work? ",
    calloutBody: "The Seoul Global Center (02-2075-4180) offers counseling for foreign workers. They can help you navigate cultural situations and workplace conflicts.",
  },
  ko: {
    eyebrow: "직장 문화",
    heading: "한국 직장에서 알아두면 좋은 것들",
    subtitle: "한국 직장 문화는 외국인에게 낯설 수 있습니다. 비판이 아닌, 더 잘 적응하기 위한 안내입니다.",
    calloutBold: "문화 차이로 어려움을 겪고 있나요? ",
    calloutBody: "서울글로벌센터(02-2075-4180)는 외국인 근로자를 위한 상담 서비스를 제공합니다. 전문 상담사가 한국 직장 문화 적응을 도와줍니다.",
  },
  ja: {
    eyebrow: "職場文化",
    heading: "韓国の職場文化を理解する",
    subtitle: "韓国の職場文化は海外から来た人には意外に感じることがあります。これは批判ではなく、自信を持って適応するためのガイドです。",
    calloutBold: "職場での文化の違いで困っていますか？ ",
    calloutBody: "ソウルグローバルセンター(02-2075-4180)では外国人労働者向けのカウンセリングを提供しています。",
  },
  "zh-CN": {
    eyebrow: "职场文化",
    heading: "了解韩国职场文化",
    subtitle: "韩国职场文化对外来者来说可能会感到意外。这不是批评，而是帮助您自信融入的指南。",
    calloutBold: "在工作中遇到文化差异困扰吗？ ",
    calloutBody: "首尔全球中心（02-2075-4180）为外国劳动者提供咨询服务，可帮助您应对文化情境和职场冲突。",
  },
  "zh-TW": {
    eyebrow: "職場文化",
    heading: "了解韓國職場文化",
    subtitle: "韓國職場文化對外來者來說可能會感到意外。這不是批評，而是幫助您自信融入的指南。",
    calloutBold: "在工作中遇到文化差異困擾嗎？ ",
    calloutBody: "首爾全球中心（02-2075-4180）為外國勞動者提供諮詢服務，可幫助您應對文化情境和職場衝突。",
  },
  pt: {
    eyebrow: "Cultura no Trabalho",
    heading: "Navegando pela cultura de trabalho coreana",
    subtitle: "A cultura de trabalho coreana pode parecer surpreendente se você vem do exterior. Isto não é uma crítica — é um guia de navegação para que você se instale com confiança.",
    calloutBold: "Tendo dificuldades com diferenças culturais no trabalho? ",
    calloutBody: "O Seoul Global Center (02-2075-4180) oferece aconselhamento para trabalhadores estrangeiros. Eles podem ajudá-lo a navegar por situações culturais e conflitos no local de trabalho.",
  },
  es: {
    eyebrow: "Cultura Laboral",
    heading: "Navegando la cultura laboral coreana",
    subtitle: "La cultura laboral coreana puede sorprender si vienes del extranjero. Esto no es una crítica — es una guía de navegación para que puedas instalarte con confianza.",
    calloutBold: "¿Tienes dificultades con las diferencias culturales en el trabajo? ",
    calloutBody: "El Seoul Global Center (02-2075-4180) ofrece asesoramiento para trabajadores extranjeros. Pueden ayudarte a navegar situaciones culturales y conflictos laborales.",
  },
};

export default function WorkplaceCulture() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="culture" className="bg-white px-6 py-16 md:px-10">
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

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WORKPLACE_CULTURE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-[#fafaf8] p-6 transition-all hover:border-zinc-300 hover:shadow-sm"
            >
              <div className="mb-3 text-3xl">{item.emoji}</div>
              <div className="mb-3">
                <h3 className="font-bold text-zinc-950">
                  {loc(item as Record<string, unknown>, "title", locale)}
                </h3>
                <p className="text-xs text-zinc-400">
                  {item.titleKo}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-zinc-500">
                {loc(item as Record<string, unknown>, "desc", locale)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-5"
        >
          <p className="text-sm text-zinc-600">
            <span className="font-semibold text-zinc-900">{s.calloutBold}</span>
            {s.calloutBody}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
