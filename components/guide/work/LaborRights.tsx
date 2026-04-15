"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { LABOR_RIGHTS } from "@/lib/workData";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";

const STRINGS: Record<Locale, {
  eyebrow: string;
  heading: string;
  subtitle: string;
  ctaHeading: string;
  ctaDetail: string;
}> = {
  en: {
    eyebrow: "Your Rights",
    heading: "Know your rights — they apply to you too",
    subtitle: "Many foreigners in Korea don't know their rights — and some employers count on that. Korean labor law protects you regardless of nationality or visa status.",
    ctaHeading: "Questions about your rights at work?",
    ctaDetail: "Ministry of Employment and Labor hotline — some English available, free to call",
  },
  ko: {
    eyebrow: "근로자 권리",
    heading: "외국인 근로자도 동일한 권리를 가집니다",
    subtitle: "많은 외국인이 자신의 근로 권리를 모른 채 불이익을 당합니다. 한국 노동법은 국적과 비자 종류에 관계없이 적용됩니다.",
    ctaHeading: "근로 권리에 대해 궁금한 점이 있으신가요?",
    ctaDetail: "고용노동부 전화 상담: 영어 지원 가능 (무료)",
  },
  ja: {
    eyebrow: "あなたの権利",
    heading: "権利を知ってください — あなたにも適用されます",
    subtitle: "韓国の多くの外国人は自分の権利を知りません。韓国の労働法は国籍やビザの種類に関わらず適用されます。",
    ctaHeading: "職場での権利について質問がありますか？",
    ctaDetail: "雇用労働部ホットライン — 英語対応あり、無料",
  },
  "zh-CN": {
    eyebrow: "您的权利",
    heading: "了解您的权利 — 这些权利同样适用于您",
    subtitle: "许多在韩外国人不了解自己的权利。韩国劳动法无论国籍或签证类型均适用。",
    ctaHeading: "对工作中的权利有疑问吗？",
    ctaDetail: "雇用劳动部热线 — 提供部分英语服务，免费拨打",
  },
  "zh-TW": {
    eyebrow: "您的權利",
    heading: "了解您的權利 — 這些權利同樣適用於您",
    subtitle: "許多在韓外國人不了解自己的權利。韓國勞動法無論國籍或簽證類型均適用。",
    ctaHeading: "對工作中的權利有疑問嗎？",
    ctaDetail: "雇用勞動部熱線 — 提供部分英語服務，免費撥打",
  },
  pt: {
    eyebrow: "Seus Direitos",
    heading: "Conheça seus direitos — eles se aplicam a você também",
    subtitle: "Muitos estrangeiros na Coreia não conhecem seus direitos — e alguns empregadores contam com isso. A lei trabalhista coreana protege você independentemente de nacionalidade ou visto.",
    ctaHeading: "Dúvidas sobre seus direitos no trabalho?",
    ctaDetail: "Linha direta do Ministério do Emprego e Trabalho — algum inglês disponível, gratuito",
  },
  es: {
    eyebrow: "Tus Derechos",
    heading: "Conoce tus derechos — también se aplican a ti",
    subtitle: "Muchos extranjeros en Corea no conocen sus derechos — y algunos empleadores cuentan con eso. La ley laboral coreana te protege independientemente de tu nacionalidad o tipo de visa.",
    ctaHeading: "¿Preguntas sobre tus derechos laborales?",
    ctaDetail: "Línea directa del Ministerio de Empleo y Trabajo — algo de inglés disponible, llamada gratuita",
  },
};

export default function LaborRights() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="rights" className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.eyebrow}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-400">
          {s.subtitle}
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
                  {loc(right as Record<string, unknown>, "right", locale)}
                </h3>
                <p className="text-xs text-zinc-500">
                  {right.rightKo}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {loc(right as Record<string, unknown>, "desc", locale)}
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
              {s.ctaHeading}
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              {s.ctaDetail}
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
