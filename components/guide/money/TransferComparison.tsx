"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { TRANSFER_SERVICES } from "@/lib/moneyData";

export default function TransferComparison() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="transfers" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "해외 송금" : "International Transfers"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo
            ? "돈을 집으로 보내는 가장 좋은 방법"
            : "The best ways to send money home"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "은행 직접 송금은 수수료가 높습니다. 아래 서비스들을 이용하면 더 저렴하게 송금할 수 있어요."
            : "Your Korean bank can send international wires, but the fees add up fast. These services are almost always cheaper."}
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {TRANSFER_SERVICES.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                service.recommended
                  ? "border-[#ffd966] bg-[#fff9e0] shadow-md shadow-[#ffd966]/20"
                  : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm transition-all"
              }`}
            >
              {/* Recommended badge */}
              {service.recommended && (
                <div className="absolute -top-3 left-6">
                  <span className="rounded-full bg-[#ffd966] px-3 py-1 text-xs font-bold text-zinc-900">
                    {isKo ? "추천 #1" : "#1 Recommended"}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{service.logo}</span>
                <div>
                  <div className="text-lg font-bold text-zinc-950">
                    {service.name}
                  </div>
                  <div className="text-sm font-medium text-zinc-500">
                    {isKo ? service.ratingKo : service.ratingEn}
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white border border-zinc-100 px-3 py-2.5">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {isKo ? "수수료" : "Fee"}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {isKo ? service.feeKo : service.feeEn}
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-zinc-100 px-3 py-2.5">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {isKo ? "속도" : "Speed"}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {isKo ? service.speedKo : service.speedEn}
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-zinc-100 px-3 py-2.5">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {isKo ? "한도" : "Limit"}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {isKo ? service.limitKo : service.limitEn}
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-zinc-100 px-3 py-2.5">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {isKo ? "최적 용도" : "Best for"}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {isKo ? service.bestForKo : service.bestForEn}
                  </p>
                </div>
              </div>

              {/* Note */}
              <div
                className={`mt-auto rounded-xl px-4 py-3 ${
                  service.recommended
                    ? "bg-[#ffd966]/30 border border-[#ffd966]/40"
                    : "bg-zinc-50 border border-zinc-100"
                }`}
              >
                <p className="text-xs text-zinc-700">
                  {isKo ? service.noteKo : service.noteEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* General warning */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-5"
        >
          <p className="text-sm text-zinc-600">
            <span className="font-semibold text-zinc-900">
              {isKo ? "팁: " : "Tip: "}
            </span>
            {isKo
              ? "환율이 좋을 때 큰 금액을 한 번에 보내는 것이 여러 번 나눠 보내는 것보다 수수료가 적게 나올 수 있습니다. Wise는 환율 알림 기능도 제공합니다."
              : "Sending a larger amount at once is often cheaper than multiple small transfers due to flat fees. Wise also offers rate alerts — set one for your target exchange rate."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
