"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { ARC_STEPS, IMMIGRATION_OFFICES } from "@/lib/visaData";

export default function ARCGuide() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="arc" className="bg-[#fafaf8] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            {isKo ? "외국인등록증" : "ARC Card"}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
            {isKo ? "ARC 발급받는 방법" : "How to get your ARC"}
          </h2>
          <p className="mb-12 max-w-xl text-zinc-500">
            {isKo
              ? "장기 체류 비자로 입국하면 외국인등록증(ARC)을 발급받아야 합니다. 은행 계좌 개설, 휴대폰 개통 등 거의 모든 것에 필요합니다."
              : "If you're in Korea on a long-stay visa, you need an Alien Registration Card. It's required for nearly everything — bank accounts, phone plans, health insurance."}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-4 md:grid-cols-5">
          {ARC_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5"
            >
              {/* Step number */}
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ffd966] text-sm font-black text-zinc-900">
                {step.step}
              </div>
              <h3 className="mb-2 font-bold text-zinc-900 leading-snug">
                {isKo ? step.titleKo : step.titleEn}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500">
                {isKo ? step.descKo : step.descEn}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Hi Korea callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-semibold text-zinc-900">
              {isKo ? "하이코리아에서 예약하세요" : "Book at Hi Korea"}
            </p>
            <p className="mt-0.5 text-sm text-zinc-600">
              {isKo
                ? "온라인 예약으로 2-4시간 대기를 피할 수 있습니다."
                : "Online appointments save you the 2-4 hour walk-in wait."}
            </p>
          </div>
          <a
            href="https://www.hikorea.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            hikorea.go.kr →
          </a>
        </motion.div>

        {/* Immigration offices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14"
        >
          <h3 className="mb-6 text-xl font-bold text-zinc-950">
            {isKo ? "서울 출입국 사무소" : "Seoul immigration offices"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {IMMIGRATION_OFFICES.map((office) => (
              <div
                key={office.name}
                className="rounded-2xl border border-zinc-200 bg-white p-5"
              >
                <p className="font-semibold text-zinc-900">
                  {isKo ? office.nameKo : office.name}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  {isKo ? office.addressKo : office.address}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                    🚇 {office.station}
                  </span>
                  <a
                    href={`tel:${office.phone.replace(/-/g, "")}`}
                    className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200"
                  >
                    📞 {office.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-zinc-400">
            {isKo
              ? "전국 어느 출입국 사무소에서나 신청 가능합니다. 1345로 전화하면 가까운 사무소를 안내받을 수 있습니다."
              : "You can register at any immigration office nationwide. Call 1345 to find the nearest one to you."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
