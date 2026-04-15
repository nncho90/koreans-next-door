"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { JOB_RESOURCES } from "@/lib/workData";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";

const STRINGS: Record<Locale, {
  eyebrow: string;
  heading: string;
  subtitle: string;
  tip: string;
}> = {
  en: {
    eyebrow: "Job Search",
    heading: "Finding work in Korea",
    subtitle: "The best job search channels vary a lot depending on what kind of work you're looking for. Here's where to start.",
    tip: "📋 For work visas (E-7, etc.), your employer handles most of the paperwork. Never start working without a valid visa — both you and your employer can face legal consequences.",
  },
  ko: {
    eyebrow: "취업 정보",
    heading: "한국에서 일자리 찾기",
    subtitle: "분야별로 외국인에게 적합한 채용 경로를 정리했습니다.",
    tip: "📋 취업비자(E-7 등)는 고용주가 대부분의 서류를 처리합니다. 비자 없이 근무를 시작하지 마세요 — 고용주와 근로자 모두 법적 책임을 질 수 있습니다.",
  },
  ja: {
    eyebrow: "求人情報",
    heading: "韓国での仕事を見つける",
    subtitle: "求人チャンネルは職種によって大きく異なります。ここから始めましょう。",
    tip: "📋 就労ビザ（E-7等）の申請書類はほとんどが雇用主が処理します。有効なビザなしで働き始めないでください。",
  },
  "zh-CN": {
    eyebrow: "求职信息",
    heading: "在韩国找工作",
    subtitle: "最佳求职渠道因工作类型而异。以下是入门指南。",
    tip: "📋 就业签证（E-7等）的大部分文件由雇主处理。未获有效签证切勿开始工作——雇主和员工都可能面临法律后果。",
  },
  "zh-TW": {
    eyebrow: "求職資訊",
    heading: "在韓國找工作",
    subtitle: "最佳求職管道因工作類型而異。以下是入門指南。",
    tip: "📋 就業簽證（E-7等）的大部分文件由雇主處理。未獲有效簽證切勿開始工作——雇主和員工都可能面臨法律後果。",
  },
  pt: {
    eyebrow: "Busca de Emprego",
    heading: "Encontrando trabalho na Coreia",
    subtitle: "Os melhores canais de busca de emprego variam muito dependendo do tipo de trabalho que você procura. Aqui está por onde começar.",
    tip: "📋 Para vistos de trabalho (E-7, etc.), seu empregador cuida da maior parte da papelada. Nunca comece a trabalhar sem um visto válido — tanto você quanto seu empregador podem enfrentar consequências legais.",
  },
  es: {
    eyebrow: "Búsqueda de Empleo",
    heading: "Encontrando trabajo en Corea",
    subtitle: "Los mejores canales de búsqueda de empleo varían mucho según el tipo de trabajo que busques. Aquí está por dónde empezar.",
    tip: "📋 Para visas de trabajo (E-7, etc.), tu empleador maneja la mayor parte del papeleo. Nunca empieces a trabajar sin una visa válida — tanto tú como tu empleador pueden enfrentar consecuencias legales.",
  },
};

export default function JobResources() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="jobs" className="bg-[#fafaf8] px-6 py-16 md:px-10">
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

        <div className="space-y-10">
          {JOB_RESOURCES.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.1 }}
            >
              {/* Category header */}
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{group.emoji}</span>
                <div>
                  <h3 className="font-bold text-zinc-950">
                    {loc(group as Record<string, unknown>, "category", locale)}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {group.categoryKo}
                  </p>
                </div>
              </div>

              {/* Resources grid */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.resources.map((resource, ri) => (
                  <motion.div
                    key={ri}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.1 + ri * 0.06 }}
                    className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm"
                  >
                    <h4 className="mb-2 font-semibold text-zinc-950">
                      {resource.name}
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-500">
                      {loc(resource as Record<string, unknown>, "desc", locale)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5"
        >
          <p className="text-sm font-semibold text-zinc-800">
            {s.tip}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
