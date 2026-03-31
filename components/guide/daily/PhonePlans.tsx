"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { PHONE_PLANS } from "@/lib/dailyData";

export default function PhonePlans() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="phone" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "통신 요금제" : "Phone Plans"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo ? "외국인을 위한 유심 & 요금제" : "SIMs & plans for foreigners"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "한국은 세계 최고의 인터넷 속도를 자랑합니다. 가격 대비 좋은 요금제를 고르는 방법을 알아보세요."
            : "Korea has some of the fastest mobile networks in the world. Here's how to pick a plan that works for you."}
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {PHONE_PLANS.map((plan, i) => (
            <motion.div
              key={plan.carrier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-[#fafaf8] p-6"
            >
              {/* Carrier + badges */}
              <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="text-xl font-bold text-zinc-950">
                    {isKo ? plan.carrierKo : plan.carrier}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {isKo ? plan.planKo : plan.plan}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {plan.arcRequired ? (
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                      {isKo ? "ARC 필요" : "ARC required"}
                    </span>
                  ) : (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {isKo ? "ARC 불필요" : "No ARC needed"}
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="mb-4 rounded-xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-4 py-3">
                <p className="text-xs text-zinc-500 mb-0.5">
                  {isKo ? "가격" : "Price"}
                </p>
                <p className="text-2xl font-bold text-zinc-900">
                  ₩{plan.priceKRW.toLocaleString()}
                  <span className="text-sm font-normal text-zinc-400 ml-1">
                    {isKo ? "/ 월" : "/ mo"}
                  </span>
                </p>
              </div>

              {/* Data & Calls */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                  <p className="text-xs text-zinc-400 mb-0.5">
                    {isKo ? "데이터" : "Data"}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {isKo ? plan.dataKo : plan.data}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                  <p className="text-xs text-zinc-400 mb-0.5">
                    {isKo ? "통화" : "Calls"}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {isKo ? plan.callsKo : plan.calls}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="mt-auto text-sm text-zinc-500">
                {isKo ? plan.descKo : plan.descEn}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-8 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5"
        >
          <p className="text-sm font-semibold text-zinc-800">
            {isKo
              ? "💡 아직 ARC가 없다면 공항에서 선불 유심을 구매할 수 있습니다. '선불 유심 주세요'라고 하면 됩니다."
              : "💡 If you don't have an ARC yet, you can still get a pre-paid SIM at the airport. Ask for a 선불 유심 (prepaid SIM)."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
