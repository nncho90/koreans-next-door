"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { CULTURE_SHOCK_STAGES } from "@/lib/mentalHealthData";

export default function CultureShockGuide() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="culture-shock" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
            {isKo ? "문화 충격" : "Culture Shock"}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
            {isKo ? "이건 정상입니다" : "This is normal"}
          </h2>
          <p className="mb-12 max-w-xl text-zinc-500">
            {isKo
              ? "문화 충격은 실재하고, 보편적이며, 단계가 있습니다. 지금 어느 단계인지 알면 도움이 됩니다."
              : "Culture shock is real, universal, and has stages. Knowing where you are helps."}
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline connector */}
        <div className="hidden md:block">
          <div className="relative mb-8">
            {/* Connector line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-zinc-200" />
            <div className="grid grid-cols-4 gap-6">
              {CULTURE_SHOCK_STAGES.map((stage, i) => (
                <div key={stage.stage} className="relative flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-[#ffd966] text-2xl shadow-sm"
                  >
                    {stage.emoji}
                  </motion.div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c9a800]">
                    {isKo ? stage.timeframeKo : stage.timeframeEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {CULTURE_SHOCK_STAGES.map((stage, i) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-zinc-200 bg-white p-5"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ffd966] text-xs font-bold text-zinc-900">
                    {stage.stage}
                  </span>
                  <h3 className="font-bold text-zinc-950">
                    {isKo ? stage.nameKo : stage.nameEn}
                  </h3>
                </div>
                <p className="mb-4 text-sm text-zinc-500">
                  {isKo ? stage.descKo : stage.descEn}
                </p>

                <div className="mb-3">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {isKo ? "나타나는 증상" : "Signs"}
                  </p>
                  <ul className="space-y-1">
                    {(isKo ? stage.signsKo : stage.signsEn).map((sign) => (
                      <li key={sign} className="flex items-start gap-1.5 text-xs text-zinc-600">
                        <span className="mt-0.5 shrink-0 text-zinc-400">·</span>
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-[#fafaf8] p-3">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#c9a800]">
                    {isKo ? "도움이 되는 것들" : "What helps"}
                  </p>
                  <ul className="space-y-1">
                    {(isKo ? stage.tipsKo : stage.tipsEn).map((tip) => (
                      <li key={tip} className="flex items-start gap-1.5 text-xs text-zinc-600">
                        <span className="mt-0.5 shrink-0 text-[#ffd966]">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-4">
          {CULTURE_SHOCK_STAGES.map((stage, i) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex gap-4"
            >
              {/* Vertical connector */}
              {i < CULTURE_SHOCK_STAGES.length - 1 && (
                <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-zinc-200 -mb-4" />
              )}
              <div className="shrink-0 flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-[#ffd966] text-xl shadow-sm">
                  {stage.emoji}
                </div>
              </div>
              <div className="flex-1 rounded-2xl border border-zinc-200 bg-white p-4 mb-4">
                <div className="mb-0.5 flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ffd966] text-xs font-bold text-zinc-900">
                    {stage.stage}
                  </span>
                  <h3 className="font-bold text-zinc-950">
                    {isKo ? stage.nameKo : stage.nameEn}
                  </h3>
                  <span className="ml-auto text-xs text-[#c9a800] font-medium">
                    {isKo ? stage.timeframeKo : stage.timeframeEn}
                  </span>
                </div>
                <p className="mb-3 mt-1 text-sm text-zinc-500">
                  {isKo ? stage.descKo : stage.descEn}
                </p>
                <div className="mb-2">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {isKo ? "나타나는 증상" : "Signs"}
                  </p>
                  <ul className="space-y-0.5">
                    {(isKo ? stage.signsKo : stage.signsEn).map((sign) => (
                      <li key={sign} className="flex items-start gap-1.5 text-xs text-zinc-600">
                        <span className="mt-0.5 shrink-0 text-zinc-400">·</span>
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-[#fafaf8] p-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#c9a800]">
                    {isKo ? "도움이 되는 것들" : "What helps"}
                  </p>
                  <ul className="space-y-0.5">
                    {(isKo ? stage.tipsKo : stage.tipsEn).map((tip) => (
                      <li key={tip} className="flex items-start gap-1.5 text-xs text-zinc-600">
                        <span className="mt-0.5 shrink-0 text-[#ffd966]">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reassurance callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5"
        >
          <p className="text-sm font-semibold text-zinc-800">
            {isKo
              ? "💛 이 단계들은 선형적이지 않습니다. 적응 단계에 있다가도 힘든 날에는 다시 충격 단계로 돌아갈 수 있어요. 그것도 정상입니다."
              : "💛 These stages aren't perfectly linear. You can be in Adjustment and have a Crash day. That's okay. The overall direction is forward."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
