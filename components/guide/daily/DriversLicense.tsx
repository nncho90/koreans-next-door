"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { DRIVERS_LICENSE } from "@/lib/dailyData";

export default function DriversLicense() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="license" className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "운전면허" : "Driver's License"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {isKo ? "한국 운전면허 취득하기" : "Getting a Korean driver's license"}
        </h2>
        <p className="mb-12 max-w-xl text-zinc-400">
          {isKo
            ? "본국 면허가 있다면 많은 경우 시험 없이 한국 면허로 전환할 수 있습니다."
            : "If you already have a license from home, you may be able to convert it without taking a test."}
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
                {isKo ? "상호 협정 국가" : "Agreement country"}
              </span>
            </div>

            <h3 className="mb-2 text-lg font-bold text-white">
              {isKo ? "시험 없이 면허 전환" : "Convert without a test"}
            </h3>
            <p className="mb-6 text-sm text-zinc-400">
              {isKo ? DRIVERS_LICENSE.conversionKo : DRIVERS_LICENSE.conversionEn}
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
                    {isKo ? step.stepKo : step.stepEn}
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
                {isKo ? "협정 미체결 국가" : "No agreement"}
              </span>
            </div>

            <h3 className="mb-2 text-lg font-bold text-white">
              {isKo ? "정식 시험 응시" : "Full Korean driving test"}
            </h3>
            <p className="mb-6 text-sm text-zinc-400">
              {isKo ? DRIVERS_LICENSE.newTestKo : DRIVERS_LICENSE.newTestEn}
            </p>

            {/* Test breakdown */}
            <div className="mt-2 space-y-3">
              {[
                {
                  en: "Written theory test",
                  ko: "필기 시험",
                  detail: { en: "70 questions, passing score 60%. Available in English.", ko: "70문항, 60점 이상 합격. 영어 응시 가능." },
                },
                {
                  en: "On-course driving test",
                  ko: "코스 주행 시험",
                  detail: { en: "Slow-speed maneuvers in a test course. Straightforward if you prepare.", ko: "시험장 코스에서의 저속 주행. 준비하면 어렵지 않음." },
                },
                {
                  en: "Road driving test",
                  ko: "도로 주행 시험",
                  detail: { en: "Actual road driving with an examiner. Usually 5km route.", ko: "심사관 동승 실도로 주행. 보통 5km 코스." },
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-800/50 p-4"
                >
                  <p className="mb-1 text-sm font-bold text-zinc-100">
                    {isKo ? step.ko : step.en}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {isKo ? step.detail.ko : step.detail.en}
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
            {isKo
              ? "🚗 협정 체결 국가 목록과 시험 준비 자료는 도로교통공단(koroad.or.kr) 홈페이지에서 영어로 확인할 수 있습니다."
              : "🚗 Check the full list of agreement countries and study materials (in English) at the Road Traffic Authority site: koroad.or.kr"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
