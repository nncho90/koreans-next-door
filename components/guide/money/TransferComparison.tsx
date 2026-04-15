"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";
import { TRANSFER_SERVICES } from "@/lib/moneyData";

const STRINGS: Record<
  Locale,
  {
    sectionLabel: string;
    heading: string;
    subheading: string;
    recommended: string;
    fee: string;
    speed: string;
    limit: string;
    bestFor: string;
    tipLabel: string;
    tip: string;
  }
> = {
  en: {
    sectionLabel: "International Transfers",
    heading: "The best ways to send money home",
    subheading:
      "Your Korean bank can send international wires, but the fees add up fast. These services are almost always cheaper.",
    recommended: "#1 Recommended",
    fee: "Fee",
    speed: "Speed",
    limit: "Limit",
    bestFor: "Best for",
    tipLabel: "Tip: ",
    tip: "Sending a larger amount at once is often cheaper than multiple small transfers due to flat fees. Wise also offers rate alerts — set one for your target exchange rate.",
  },
  ko: {
    sectionLabel: "해외 송금",
    heading: "돈을 집으로 보내는 가장 좋은 방법",
    subheading:
      "은행 직접 송금은 수수료가 높습니다. 아래 서비스들을 이용하면 더 저렴하게 송금할 수 있어요.",
    recommended: "추천 #1",
    fee: "수수료",
    speed: "속도",
    limit: "한도",
    bestFor: "최적 용도",
    tipLabel: "팁: ",
    tip: "환율이 좋을 때 큰 금액을 한 번에 보내는 것이 여러 번 나눠 보내는 것보다 수수료가 적게 나올 수 있습니다. Wise는 환율 알림 기능도 제공합니다.",
  },
  ja: {
    sectionLabel: "海外送金",
    heading: "お金を送る最良の方法",
    subheading:
      "韓国の銀行から国際送金もできますが、手数料が高くなりがちです。これらのサービスを使うとほぼ常に安くなります。",
    recommended: "#1 推奨",
    fee: "手数料",
    speed: "スピード",
    limit: "上限",
    bestFor: "最適な用途",
    tipLabel: "ヒント: ",
    tip: "定額手数料のため、小額を何度も送るより大きな金額を一度に送る方が安くなることが多いです。WiseにはレートアラートAlierty機能もあります。",
  },
  "zh-CN": {
    sectionLabel: "国际汇款",
    heading: "向家乡汇款的最佳方式",
    subheading:
      "通过韩国银行进行国际电汇手续费较高。以下服务几乎总是更便宜。",
    recommended: "推荐首选",
    fee: "手续费",
    speed: "速度",
    limit: "限额",
    bestFor: "最适用于",
    tipLabel: "提示：",
    tip: "由于固定手续费，一次性汇较大金额通常比多次小额转账更划算。Wise还提供汇率提醒功能，可设置目标汇率提醒。",
  },
  "zh-TW": {
    sectionLabel: "國際匯款",
    heading: "向家鄉匯款的最佳方式",
    subheading:
      "透過韓國銀行進行國際電匯手續費較高。以下服務幾乎總是更便宜。",
    recommended: "推薦首選",
    fee: "手續費",
    speed: "速度",
    limit: "限額",
    bestFor: "最適用於",
    tipLabel: "提示：",
    tip: "由於固定手續費，一次性匯較大金額通常比多次小額轉帳更划算。Wise還提供匯率提醒功能，可設置目標匯率提醒。",
  },
  pt: {
    sectionLabel: "Transferências Internacionais",
    heading: "As melhores formas de enviar dinheiro para casa",
    subheading:
      "Seu banco coreano pode enviar transferências internacionais, mas as taxas somam rápido. Esses serviços são quase sempre mais baratos.",
    recommended: "#1 Recomendado",
    fee: "Taxa",
    speed: "Velocidade",
    limit: "Limite",
    bestFor: "Melhor para",
    tipLabel: "Dica: ",
    tip: "Enviar um valor maior de uma vez geralmente é mais barato do que várias transferências pequenas por causa das taxas fixas. O Wise também oferece alertas de câmbio — configure um para sua taxa alvo.",
  },
  es: {
    sectionLabel: "Transferencias Internacionales",
    heading: "Las mejores formas de enviar dinero a casa",
    subheading:
      "Tu banco coreano puede enviar transferencias internacionales, pero las comisiones se acumulan rápido. Estos servicios son casi siempre más baratos.",
    recommended: "#1 Recomendado",
    fee: "Comisión",
    speed: "Velocidad",
    limit: "Límite",
    bestFor: "Mejor para",
    tipLabel: "Consejo: ",
    tip: "Enviar un monto mayor de una vez es generalmente más barato que múltiples transferencias pequeñas por las tarifas fijas. Wise también ofrece alertas de tipo de cambio — configura una para tu tasa objetivo.",
  },
};

export default function TransferComparison() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="transfers" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.sectionLabel}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">{s.subheading}</p>

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
                    {s.recommended}
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
                    {loc(service as Record<string, unknown>, "rating", locale)}
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white border border-zinc-100 px-3 py-2.5">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {s.fee}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {loc(service as Record<string, unknown>, "fee", locale)}
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-zinc-100 px-3 py-2.5">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {s.speed}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {loc(service as Record<string, unknown>, "speed", locale)}
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-zinc-100 px-3 py-2.5">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {s.limit}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {loc(service as Record<string, unknown>, "limit", locale)}
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-zinc-100 px-3 py-2.5">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {s.bestFor}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {loc(service as Record<string, unknown>, "bestFor", locale)}
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
                  {loc(service as Record<string, unknown>, "note", locale)}
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
            <span className="font-semibold text-zinc-900">{s.tipLabel}</span>
            {s.tip}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
