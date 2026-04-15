"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";
import { DELIVERY_GUIDE } from "@/lib/dailyData";

const STRINGS: Record<Locale, {
  sectionLabel: string;
  heading: string;
  sub: string;
  phraseLabel: string;
  phraseTranslation: string;
  phraseHint: string;
}> = {
  en: {
    sectionLabel: "Delivery",
    heading: "Korea delivers everything",
    sub: "Korea's delivery culture is world-class. Food, groceries, electronics, furniture — it all comes to your door, fast.",
    phraseLabel: "Useful Korean phrase",
    phraseTranslation: "— Please leave it at the door",
    phraseHint: "Text this to the delivery person, or paste it into the delivery note field in the app.",
  },
  ko: {
    sectionLabel: "배달 & 배송",
    heading: "배달의 나라, 한국",
    sub: "한국의 배달 문화는 세계 최고 수준입니다. 음식부터 가전제품까지 — 모두 문 앞으로 배달됩니다.",
    phraseLabel: "유용한 표현",
    phraseTranslation: "— 문 앞에 두고 가 주세요",
    phraseHint: "배달 기사에게 이 문자를 보내거나, 앱의 배달 메모에 입력하면 됩니다.",
  },
  ja: {
    sectionLabel: "デリバリー",
    heading: "韓国はすべてを届けてくれる",
    sub: "韓国のデリバリー文化は世界最高水準。食事から家電まで、すべてドアまで届きます。",
    phraseLabel: "便利な韓国語フレーズ",
    phraseTranslation: "— ドアの前に置いてください",
    phraseHint: "配達員にこのメッセージを送るか、アプリの配達メモ欄に入力してください。",
  },
  "zh-CN": {
    sectionLabel: "外卖与配送",
    heading: "韩国无所不送",
    sub: "韩国的配送文化堪称世界一流。食物、杂货、电子产品、家具——全部快速送上门。",
    phraseLabel: "实用韩语短句",
    phraseTranslation: "— 请放在门口",
    phraseHint: "将此短句发给配送员，或粘贴到应用的配送备注栏中。",
  },
  "zh-TW": {
    sectionLabel: "外送與配送",
    heading: "韓國無所不送",
    sub: "韓國的外送文化堪稱世界一流。食物、雜貨、電子產品、家具——全部快速送上門。",
    phraseLabel: "實用韓語短句",
    phraseTranslation: "— 請放在門口",
    phraseHint: "將此短句發給配送員，或貼到應用的外送備註欄中。",
  },
  pt: {
    sectionLabel: "Delivery",
    heading: "A Coreia entrega tudo",
    sub: "A cultura de delivery da Coreia é de nível mundial. Comida, mantimentos, eletrônicos, móveis — tudo chega à sua porta, rápido.",
    phraseLabel: "Frase útil em coreano",
    phraseTranslation: "— Por favor, deixe na porta",
    phraseHint: "Envie isso para o entregador ou cole no campo de observações do app.",
  },
  es: {
    sectionLabel: "Delivery",
    heading: "Corea entrega todo",
    sub: "La cultura de delivery de Corea es de clase mundial. Comida, víveres, electrónicos, muebles — todo llega a tu puerta, rápido.",
    phraseLabel: "Frase útil en coreano",
    phraseTranslation: "— Por favor, déjalo en la puerta",
    phraseHint: "Envía esto al repartidor o pégalo en el campo de notas de entrega en la app.",
  },
};

export default function DeliveryGuide() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="delivery" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.sectionLabel}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {s.sub}
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
                {loc(item as Record<string, unknown>, "desc", locale)}
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
            {s.phraseLabel}
          </p>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-2xl font-bold text-zinc-950">문 앞에 놔주세요</span>
            <span className="text-sm text-zinc-400">
              {s.phraseTranslation}
            </span>
          </div>
          <p className="mt-2 text-sm text-zinc-500">
            {s.phraseHint}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
