"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";
import { PHONE_PLANS } from "@/lib/dailyData";

const STRINGS: Record<Locale, {
  sectionLabel: string;
  heading: string;
  sub: string;
  arcRequired: string;
  arcNotRequired: string;
  price: string;
  perMonth: string;
  data: string;
  calls: string;
  callout: string;
}> = {
  en: {
    sectionLabel: "Phone Plans",
    heading: "SIMs & plans for foreigners",
    sub: "Korea has some of the fastest mobile networks in the world. Here's how to pick a plan that works for you.",
    arcRequired: "ARC required",
    arcNotRequired: "No ARC needed",
    price: "Price",
    perMonth: "/ mo",
    data: "Data",
    calls: "Calls",
    callout: "💡 If you don't have an ARC yet, you can still get a pre-paid SIM at the airport. Ask for a 선불 유심 (prepaid SIM).",
  },
  ko: {
    sectionLabel: "통신 요금제",
    heading: "외국인을 위한 유심 & 요금제",
    sub: "한국은 세계 최고의 인터넷 속도를 자랑합니다. 가격 대비 좋은 요금제를 고르는 방법을 알아보세요.",
    arcRequired: "ARC 필요",
    arcNotRequired: "ARC 불필요",
    price: "가격",
    perMonth: "/ 월",
    data: "데이터",
    calls: "통화",
    callout: "💡 아직 ARC가 없다면 공항에서 선불 유심을 구매할 수 있습니다. '선불 유심 주세요'라고 하면 됩니다.",
  },
  ja: {
    sectionLabel: "携帯プラン",
    heading: "外国人向けSIMとプラン",
    sub: "韓国は世界最高水準のモバイル回線を持っています。自分に合ったプランの選び方を解説。",
    arcRequired: "ARC必要",
    arcNotRequired: "ARC不要",
    price: "料金",
    perMonth: "/ 月",
    data: "データ",
    calls: "通話",
    callout: "💡 まだARCがない場合でも、空港でプリペイドSIM（선불 유심）を購入できます。",
  },
  "zh-CN": {
    sectionLabel: "手机套餐",
    heading: "外国人适用的SIM卡与套餐",
    sub: "韩国拥有世界上最快的移动网络之一。了解如何选择适合您的套餐。",
    arcRequired: "需要ARC",
    arcNotRequired: "无需ARC",
    price: "价格",
    perMonth: "/ 月",
    data: "流量",
    calls: "通话",
    callout: "💡 如果您还没有ARC，仍可在机场购买预付费SIM卡（선불 유심）。",
  },
  "zh-TW": {
    sectionLabel: "手機方案",
    heading: "外國人適用的SIM卡與方案",
    sub: "韓國擁有世界上最快的行動網路之一。了解如何選擇適合您的方案。",
    arcRequired: "需要ARC",
    arcNotRequired: "無需ARC",
    price: "價格",
    perMonth: "/ 月",
    data: "流量",
    calls: "通話",
    callout: "💡 如果您還沒有ARC，仍可在機場購買預付費SIM卡（선불 유심）。",
  },
  pt: {
    sectionLabel: "Planos de Celular",
    heading: "SIMs e planos para estrangeiros",
    sub: "A Coreia tem uma das redes móveis mais rápidas do mundo. Veja como escolher um plano que funcione para você.",
    arcRequired: "ARC necessário",
    arcNotRequired: "Sem necessidade de ARC",
    price: "Preço",
    perMonth: "/ mês",
    data: "Dados",
    calls: "Ligações",
    callout: "💡 Se você ainda não tem ARC, pode comprar um SIM pré-pago no aeroporto. Peça um 선불 유심 (SIM pré-pago).",
  },
  es: {
    sectionLabel: "Planes de Celular",
    heading: "SIMs y planes para extranjeros",
    sub: "Corea tiene una de las redes móviles más rápidas del mundo. Así es como elegir un plan que funcione para ti.",
    arcRequired: "ARC requerido",
    arcNotRequired: "Sin ARC necesario",
    price: "Precio",
    perMonth: "/ mes",
    data: "Datos",
    calls: "Llamadas",
    callout: "💡 Si aún no tienes ARC, puedes obtener un SIM prepago en el aeropuerto. Pide un 선불 유심 (SIM prepago).",
  },
};

export default function PhonePlans() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="phone" className="bg-white px-6 py-16 md:px-10">
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
                    {locale === "ko" ? plan.carrierKo : plan.carrier}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {loc(plan as Record<string, unknown>, "plan", locale)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {plan.arcRequired ? (
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                      {s.arcRequired}
                    </span>
                  ) : (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {s.arcNotRequired}
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="mb-4 rounded-xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-4 py-3">
                <p className="text-xs text-zinc-500 mb-0.5">
                  {s.price}
                </p>
                <p className="text-2xl font-bold text-zinc-900">
                  ₩{plan.priceKRW.toLocaleString()}
                  <span className="text-sm font-normal text-zinc-400 ml-1">
                    {s.perMonth}
                  </span>
                </p>
              </div>

              {/* Data & Calls */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                  <p className="text-xs text-zinc-400 mb-0.5">
                    {s.data}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {loc(plan as Record<string, unknown>, "data", locale)}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                  <p className="text-xs text-zinc-400 mb-0.5">
                    {s.calls}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {loc(plan as Record<string, unknown>, "calls", locale)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="mt-auto text-sm text-zinc-500">
                {loc(plan as Record<string, unknown>, "desc", locale)}
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
            {s.callout}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
