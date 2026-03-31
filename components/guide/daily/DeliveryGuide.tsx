"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { DELIVERY_GUIDE } from "@/lib/dailyData";

export default function DeliveryGuide() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="delivery" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "배달 & 배송" : "Delivery"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo ? "배달의 나라, 한국" : "Korea delivers everything"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {isKo
            ? "한국의 배달 문화는 세계 최고 수준입니다. 음식부터 가전제품까지 — 모두 문 앞으로 배달됩니다."
            : "Korea's delivery culture is world-class. Food, groceries, electronics, furniture — it all comes to your door, fast."}
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {DELIVERY_GUIDE.map((item, i) => (
            <motion.div
              key={item.service}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl">{item.emoji}</span>
                <h3 className="text-base font-bold text-zinc-950">
                  {item.service}
                </h3>
              </div>
              <p className="text-sm text-zinc-500">
                {isKo ? item.descKo : item.descEn}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Useful phrase callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-8 rounded-2xl border border-zinc-200 bg-white px-6 py-5"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {isKo ? "유용한 표현" : "Useful Korean phrase"}
          </p>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-2xl font-bold text-zinc-950">문 앞에 놔주세요</span>
            <span className="text-sm text-zinc-400">
              {isKo ? "— 문 앞에 두고 가 주세요" : "— Please leave it at the door"}
            </span>
          </div>
          <p className="mt-2 text-sm text-zinc-500">
            {isKo
              ? "배달 기사에게 이 문자를 보내거나, 앱의 배달 메모에 입력하면 됩니다."
              : "Text this to the delivery person, or paste it into the delivery note field in the app."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
