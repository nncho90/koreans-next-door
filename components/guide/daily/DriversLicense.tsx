"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";
import { DRIVERS_LICENSE } from "@/lib/dailyData";

const STRINGS: Record<Locale, {
  sectionLabel: string;
  heading: string;
  sub: string;
  agreementBadge: string;
  noAgreementBadge: string;
  convertTitle: string;
  fullTestTitle: string;
  testSteps: { title: string; detail: string }[];
  tip: string;
}> = {
  en: {
    sectionLabel: "Driver's License",
    heading: "Getting a Korean driver's license",
    sub: "If you already have a license from home, you may be able to convert it without taking a test.",
    agreementBadge: "Agreement country",
    noAgreementBadge: "No agreement",
    convertTitle: "Convert without a test",
    fullTestTitle: "Full Korean driving test",
    testSteps: [
      { title: "Written theory test", detail: "70 questions, passing score 60%. Available in English." },
      { title: "On-course driving test", detail: "Slow-speed maneuvers in a test course. Straightforward if you prepare." },
      { title: "Road driving test", detail: "Actual road driving with an examiner. Usually 5km route." },
    ],
    tip: "🚗 Check the full list of agreement countries and study materials (in English) at the Road Traffic Authority site: koroad.or.kr",
  },
  ko: {
    sectionLabel: "운전면허",
    heading: "한국 운전면허 취득하기",
    sub: "본국 면허가 있다면 많은 경우 시험 없이 한국 면허로 전환할 수 있습니다.",
    agreementBadge: "상호 협정 국가",
    noAgreementBadge: "협정 미체결 국가",
    convertTitle: "시험 없이 면허 전환",
    fullTestTitle: "정식 시험 응시",
    testSteps: [
      { title: "필기 시험", detail: "70문항, 60점 이상 합격. 영어 응시 가능." },
      { title: "코스 주행 시험", detail: "시험장 코스에서의 저속 주행. 준비하면 어렵지 않음." },
      { title: "도로 주행 시험", detail: "심사관 동승 실도로 주행. 보통 5km 코스." },
    ],
    tip: "🚗 협정 체결 국가 목록과 시험 준비 자료는 도로교통공단(koroad.or.kr) 홈페이지에서 영어로 확인할 수 있습니다.",
  },
  ja: {
    sectionLabel: "運転免許",
    heading: "韓国の運転免許を取得する",
    sub: "母国の免許を持っている場合、多くのケースで試験なしに転換できます。",
    agreementBadge: "協定締結国",
    noAgreementBadge: "協定未締結国",
    convertTitle: "試験なしで転換",
    fullTestTitle: "正式な韓国運転免許試験",
    testSteps: [
      { title: "学科試験", detail: "70問、60点以上で合格。英語受験可能。" },
      { title: "コース走行試験", detail: "試験場内での低速走行。準備すれば難しくない。" },
      { title: "路上走行試験", detail: "試験官同乗での実際の道路走行。通常5kmコース。" },
    ],
    tip: "🚗 協定国リストと学習教材（英語）は道路交通公団サイト（koroad.or.kr）で確認できます。",
  },
  "zh-CN": {
    sectionLabel: "驾驶证",
    heading: "办理韩国驾驶证",
    sub: "若您已有本国驾照，很多情况下可以免试转换为韩国驾照。",
    agreementBadge: "协议国",
    noAgreementBadge: "非协议国",
    convertTitle: "免试转换驾照",
    fullTestTitle: "参加完整韩国驾照考试",
    testSteps: [
      { title: "笔试", detail: "70题，60分以上合格。可用英语作答。" },
      { title: "场地驾驶考试", detail: "在考试场地内低速驾驶。充分备考后并不难。" },
      { title: "道路驾驶考试", detail: "与考官同乘进行实际道路驾驶，通常约5公里路线。" },
    ],
    tip: "🚗 可在道路交通公团网站（koroad.or.kr）查阅完整协议国名单及英文学习材料。",
  },
  "zh-TW": {
    sectionLabel: "駕照",
    heading: "辦理韓國駕照",
    sub: "若您已有本國駕照，很多情況下可以免試轉換為韓國駕照。",
    agreementBadge: "協議國",
    noAgreementBadge: "非協議國",
    convertTitle: "免試轉換駕照",
    fullTestTitle: "參加完整韓國駕照考試",
    testSteps: [
      { title: "筆試", detail: "70題，60分以上合格。可用英語作答。" },
      { title: "場地駕駛考試", detail: "在考試場地內低速駕駛。充分備考後並不難。" },
      { title: "道路駕駛考試", detail: "與考官同乘進行實際道路駕駛，通常約5公里路線。" },
    ],
    tip: "🚗 可在道路交通公團網站（koroad.or.kr）查閱完整協議國名單及英文學習材料。",
  },
  pt: {
    sectionLabel: "Carteira de Motorista",
    heading: "Obtendo uma carteira de motorista coreana",
    sub: "Se você já tem uma habilitação de casa, pode ser possível convertê-la sem fazer um teste.",
    agreementBadge: "País com acordo",
    noAgreementBadge: "Sem acordo",
    convertTitle: "Converter sem fazer teste",
    fullTestTitle: "Exame completo de direção coreano",
    testSteps: [
      { title: "Prova teórica", detail: "70 questões, nota mínima 60%. Disponível em inglês." },
      { title: "Prova de manobras em pista", detail: "Manobras em baixa velocidade em pista de teste. Tranquilo se você se preparar." },
      { title: "Prova em via pública", detail: "Direção real com um examinador. Geralmente percurso de 5km." },
    ],
    tip: "🚗 Confira a lista completa de países com acordo e materiais de estudo (em inglês) no site da Autoridade de Trânsito Rodoviário: koroad.or.kr",
  },
  es: {
    sectionLabel: "Licencia de Conducir",
    heading: "Obtener una licencia de conducir coreana",
    sub: "Si ya tienes una licencia de tu país, es posible que puedas convertirla sin hacer un examen.",
    agreementBadge: "País con acuerdo",
    noAgreementBadge: "Sin acuerdo",
    convertTitle: "Convertir sin examen",
    fullTestTitle: "Examen completo de conducir coreano",
    testSteps: [
      { title: "Examen teórico", detail: "70 preguntas, puntaje mínimo 60%. Disponible en inglés." },
      { title: "Examen en circuito", detail: "Maniobras a baja velocidad en circuito de prueba. Sencillo si te preparas." },
      { title: "Examen en vía pública", detail: "Conducción real con un examinador. Generalmente ruta de 5km." },
    ],
    tip: "🚗 Consulta la lista completa de países con acuerdo y materiales de estudio (en inglés) en el sitio de la Autoridad de Tráfico Vial: koroad.or.kr",
  },
};

export default function DriversLicense() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="license" className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.sectionLabel}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-12 max-w-xl text-zinc-400">
          {s.sub}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Path 1: Agreement country */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0 }}
            className="flex flex-col rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
          >
            {/* Path badge */}
            <div className="mb-5 inline-flex self-start items-center gap-2 rounded-full border border-emerald-700/50 bg-emerald-900/30 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                {s.agreementBadge}
              </span>
            </div>

            <h3 className="mb-2 text-lg font-bold text-white">
              {s.convertTitle}
            </h3>
            <p className="mb-6 text-sm text-zinc-400">
              {loc(DRIVERS_LICENSE as Record<string, unknown>, "conversion", locale)}
            </p>

            {/* Steps */}
            <div className="space-y-3">
              {DRIVERS_LICENSE.conversionSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ffd966] text-xs font-bold text-zinc-900">
                    {i + 1}
                  </div>
                  <p className="text-sm text-zinc-300">
                    {loc(step as Record<string, unknown>, "step", locale)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Path 2: No agreement */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
          >
            {/* Path badge */}
            <div className="mb-5 inline-flex self-start items-center gap-2 rounded-full border border-amber-700/50 bg-amber-900/30 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                {s.noAgreementBadge}
              </span>
            </div>

            <h3 className="mb-2 text-lg font-bold text-white">
              {s.fullTestTitle}
            </h3>
            <p className="mb-6 text-sm text-zinc-400">
              {loc(DRIVERS_LICENSE as Record<string, unknown>, "newTest", locale)}
            </p>

            {/* Test breakdown */}
            <div className="mt-2 space-y-3">
              {s.testSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-800/50 p-4"
                >
                  <p className="mb-1 text-sm font-bold text-zinc-100">
                    {step.title}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {step.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom tip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 rounded-2xl border border-[#ffd966]/30 bg-[#ffd966]/10 px-6 py-5"
        >
          <p className="text-sm font-semibold text-zinc-200">
            {s.tip}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
