"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import {
  VISA_WIZARD_STEPS,
  VISA_RECOMMENDATIONS,
  VISA_TYPES,
} from "@/lib/visaData";

export default function VisaWizard() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  const [step, setStep] = useState(0); // 0 = purpose, 1 = duration, 2 = results
  const [purpose, setPurpose] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const purposeStep = VISA_WIZARD_STEPS[0];
  const durationStep = VISA_WIZARD_STEPS[1];

  const recommendationKey = purpose && duration ? `${purpose}-${duration}` : null;
  const recommendations = recommendationKey ? VISA_RECOMMENDATIONS[recommendationKey] ?? [] : [];

  const resolvedVisas = recommendations.map((rec) => {
    const visa = VISA_TYPES.find((v) => v.code === rec.code);
    return { ...rec, visa };
  });

  function handlePurpose(id: string) {
    setPurpose(id);
    setStep(1);
  }

  function handleDuration(id: string) {
    setDuration(id);
    setStep(2);
  }

  function reset() {
    setPurpose(null);
    setDuration(null);
    setStep(0);
  }

  return (
    <section id="wizard" className="bg-zinc-950 px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "비자 찾기" : "Visa Finder"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {isKo ? "나에게 맞는 비자는?" : "Find your visa"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-400">
          {isKo
            ? "두 가지 질문에 답하면 추천 비자를 알려드립니다."
            : "Answer two questions and we'll point you to the right visa."}
        </p>

        {/* Step progress */}
        <div className="mb-8 flex items-center gap-3">
          {[0, 1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 ${
                  step > s
                    ? "bg-[#ffd966] text-zinc-900"
                    : step === s
                    ? "border-2 border-[#ffd966] bg-transparent text-[#ffd966]"
                    : "border-2 border-zinc-700 bg-transparent text-zinc-600"
                }`}
              >
                {step > s ? "✓" : s + 1}
              </div>
              {s < 2 && (
                <div
                  className={`h-0.5 w-10 rounded-full transition-colors duration-500 ${
                    step > s ? "bg-[#ffd966]" : "bg-zinc-700"
                  }`}
                />
              )}
            </div>
          ))}
          <span className="ml-2 text-sm text-zinc-500">
            {step === 0 && (isKo ? "목적 선택" : "Choose purpose")}
            {step === 1 && (isKo ? "체류 기간 선택" : "Choose duration")}
            {step === 2 && (isKo ? "추천 비자" : "Results")}
          </span>
        </div>

        {/* Step panels */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="purpose"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <p className="mb-5 text-lg font-semibold text-white">
                {isKo ? purposeStep.questionKo : purposeStep.questionEn}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {purposeStep.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handlePurpose(opt.id)}
                    className="group flex flex-col items-start gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-left transition-all hover:border-[#ffd966]/60 hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd966]"
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-sm font-medium leading-snug text-white group-hover:text-[#ffd966]">
                      {isKo ? opt.labelKo : opt.labelEn}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="duration"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Show selected purpose */}
              <div className="mb-5 flex items-center gap-2">
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                  {purposeStep.options.find((o) => o.id === purpose)?.emoji}{" "}
                  {isKo
                    ? purposeStep.options.find((o) => o.id === purpose)?.labelKo
                    : purposeStep.options.find((o) => o.id === purpose)?.labelEn}
                </span>
                <button
                  onClick={() => { setPurpose(null); setStep(0); }}
                  className="text-xs text-zinc-500 hover:text-zinc-300 underline"
                >
                  {isKo ? "변경" : "change"}
                </button>
              </div>

              <p className="mb-5 text-lg font-semibold text-white">
                {isKo ? durationStep.questionKo : durationStep.questionEn}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {durationStep.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleDuration(opt.id)}
                    className="group flex flex-col items-start gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-left transition-all hover:border-[#ffd966]/60 hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd966]"
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-sm font-medium leading-snug text-white group-hover:text-[#ffd966]">
                      {isKo ? opt.labelKo : opt.labelEn}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {resolvedVisas.length === 0 ? (
                <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-8 text-center">
                  <p className="text-zinc-400">
                    {isKo
                      ? "해당 조건에 맞는 비자를 찾지 못했습니다. 출입국관리소에 직접 문의해보세요."
                      : "No exact match found. We recommend consulting directly with the immigration office."}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {resolvedVisas.map(({ code, noteEn, noteKo, visa }) => (
                    <div
                      key={code}
                      className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
                    >
                      {/* Visa code badge + name */}
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-xl bg-[#ffd966] px-4 py-1.5 text-xl font-black tracking-tight text-zinc-900">
                          {code}
                        </span>
                        <div>
                          <p className="font-bold text-white">
                            {isKo ? visa?.nameKo : visa?.nameEn}
                          </p>
                          {!isKo && visa?.nameKo && (
                            <p className="text-sm text-zinc-500">{visa.nameKo}</p>
                          )}
                        </div>
                      </div>

                      {/* Contextual note */}
                      <p className="mb-4 rounded-lg border border-[#ffd966]/20 bg-[#ffd966]/10 px-4 py-3 text-sm text-[#ffd966]">
                        {isKo ? noteKo : noteEn}
                      </p>

                      {/* Work rights */}
                      {visa && (
                        <div className="mb-4 flex items-start gap-2">
                          <span
                            className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              visa.canWork
                                ? "bg-emerald-900/60 text-emerald-300"
                                : "bg-red-900/60 text-red-300"
                            }`}
                          >
                            {visa.canWork
                              ? (isKo ? "취업 가능" : "Work allowed")
                              : (isKo ? "취업 불가" : "No work")}
                          </span>
                          <p className="text-sm text-zinc-400">
                            {isKo ? visa.workNoteKo : visa.workNoteEn}
                          </p>
                        </div>
                      )}

                      {/* Duration */}
                      {visa && (
                        <div className="mb-4">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            {isKo ? "체류 기간" : "Duration"}
                          </p>
                          <p className="text-sm text-zinc-300">
                            {isKo ? visa.durationKo : visa.durationEn}
                          </p>
                        </div>
                      )}

                      {/* Requirements */}
                      {visa && (
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            {isKo ? "주요 서류" : "Key requirements"}
                          </p>
                          <ol className="flex flex-col gap-1.5">
                            {(isKo ? visa.requirementsKo : visa.requirementsEn).map(
                              (req, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2.5 text-sm text-zinc-300"
                                >
                                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold text-zinc-300">
                                    {i + 1}
                                  </span>
                                  {req}
                                </li>
                              )
                            )}
                          </ol>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Reset */}
              <button
                onClick={reset}
                className="mt-6 flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
              >
                <span>←</span>
                {isKo ? "다시 시작하기" : "Start over"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <p className="mt-10 text-xs text-zinc-600">
          {isKo
            ? "이 정보는 참고용입니다. 정확한 비자 정보는 출입국·외국인청 또는 한국 대사관을 통해 확인하세요."
            : "This is for informational purposes only. Always verify with the Korean Immigration Service or your nearest Korean embassy."}
        </p>
      </div>
    </section>
  );
}
