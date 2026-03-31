"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { WORKPLACE_CULTURE } from "@/lib/workData";

export default function WorkplaceCulture() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="culture" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "직장 문화" : "Workplace Culture"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo
            ? "한국 직장에서 알아두면 좋은 것들"
            : "Navigating Korean work culture"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "한국 직장 문화는 외국인에게 낯설 수 있습니다. 비판이 아닌, 더 잘 적응하기 위한 안내입니다."
            : "Korean workplace culture can feel surprising if you're coming from abroad. This isn't a critique — it's a navigation guide so you can settle in with confidence."}
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
                  {isKo ? item.titleKo : item.titleEn}
                </h3>
                <p className="text-xs text-zinc-400">
                  {isKo ? item.titleEn : item.titleKo}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-zinc-500">
                {isKo ? item.descKo : item.descEn}
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
            {isKo ? (
              <>
                <span className="font-semibold text-zinc-900">
                  문화 차이로 어려움을 겪고 있나요?{" "}
                </span>
                서울글로벌센터(02-2075-4180)는 외국인 근로자를 위한 상담 서비스를 제공합니다. 전문 상담사가 한국 직장 문화 적응을 도와줍니다.
              </>
            ) : (
              <>
                <span className="font-semibold text-zinc-900">
                  Struggling with cultural differences at work?{" "}
                </span>
                The Seoul Global Center (02-2075-4180) offers counseling for foreign workers. They can help you navigate cultural situations and workplace conflicts.
              </>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
