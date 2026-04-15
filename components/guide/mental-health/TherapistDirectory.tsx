"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { THERAPISTS } from "@/lib/mentalHealthData";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";

type Therapist = (typeof THERAPISTS)[number];

const TherapistMap = dynamic(() => import("./TherapistMap"), { ssr: false });

const LANG_COLORS: Record<string, string> = {
  English: "bg-emerald-100 text-emerald-700",
  Korean: "bg-blue-100 text-blue-700",
  Chinese: "bg-red-100 text-red-700",
  Japanese: "bg-purple-100 text-purple-700",
  French: "bg-indigo-100 text-indigo-700",
  Multiple: "bg-zinc-100 text-zinc-600",
};

const STRINGS: Record<Locale, {
  eyebrow: string;
  heading: string;
  subtitle: string;
  mapLabel: string;
  contactLabel: string;
  websiteLabel: string;
  closeLabel: string;
  callout: string;
}> = {
  en: {
    eyebrow: "Find a Therapist",
    heading: "Getting professional help",
    subtitle: "Asking for help takes courage. Here are real options for getting English-language mental health support in Korea.",
    mapLabel: "Locations on map — click a pin for details",
    contactLabel: "Contact:",
    websiteLabel: "Website:",
    closeLabel: "close",
    callout: "💛 Not sure where to start? Call Seoul Global Center (02-2075-4180) first. It's free, and they'll help match you with the right therapist.",
  },
  ko: {
    eyebrow: "상담사 찾기",
    heading: "전문적인 도움 받기",
    subtitle: "도움을 청하는 것은 용기 있는 일입니다. 한국에서 영어로 상담을 받을 수 있는 옵션들을 모았어요.",
    mapLabel: "지도에서 위치 확인 (핀을 클릭하세요)",
    contactLabel: "연락처:",
    websiteLabel: "웹사이트:",
    closeLabel: "닫기",
    callout: "💛 처음 상담사를 찾는 게 막막하다면, 서울글로벌센터(02-2075-4180)에 먼저 전화해보세요. 무료로 연결해 드립니다.",
  },
  ja: {
    eyebrow: "セラピストを探す",
    heading: "専門的な助けを求める",
    subtitle: "助けを求めることには勇気が必要です。韓国で英語の精神的サポートを受けるための実際の選択肢をまとめました。",
    mapLabel: "地図上の場所 — ピンをクリックして詳細を確認",
    contactLabel: "連絡先:",
    websiteLabel: "ウェブサイト:",
    closeLabel: "閉じる",
    callout: "💛 どこから始めればいいか分からない場合は、まずソウルグローバルセンター（02-2075-4180）に電話してください。無料で適切なセラピストを紹介してもらえます。",
  },
  "zh-CN": {
    eyebrow: "寻找心理咨询师",
    heading: "寻求专业帮助",
    subtitle: "寻求帮助需要勇气。以下是在韩国获得英语心理健康支持的实际选择。",
    mapLabel: "地图上的位置 — 点击标记查看详情",
    contactLabel: "联系方式:",
    websiteLabel: "网站:",
    closeLabel: "关闭",
    callout: "💛 不确定从哪里开始？先致电首尔全球中心（02-2075-4180）。免费服务，他们会帮助您找到合适的咨询师。",
  },
  "zh-TW": {
    eyebrow: "尋找心理諮詢師",
    heading: "尋求專業幫助",
    subtitle: "尋求幫助需要勇氣。以下是在韓國獲得英語心理健康支援的實際選擇。",
    mapLabel: "地圖上的位置 — 點擊標記查看詳情",
    contactLabel: "聯絡方式:",
    websiteLabel: "網站:",
    closeLabel: "關閉",
    callout: "💛 不確定從哪裡開始？先致電首爾全球中心（02-2075-4180）。免費服務，他們會幫助您找到合適的諮詢師。",
  },
  pt: {
    eyebrow: "Encontrar um Terapeuta",
    heading: "Obtendo ajuda profissional",
    subtitle: "Pedir ajuda requer coragem. Aqui estão opções reais para obter suporte de saúde mental em inglês na Coreia.",
    mapLabel: "Localizações no mapa — clique em um pin para detalhes",
    contactLabel: "Contato:",
    websiteLabel: "Website:",
    closeLabel: "fechar",
    callout: "💛 Não sabe por onde começar? Ligue primeiro para o Seoul Global Center (02-2075-4180). É gratuito e eles ajudarão a encontrar o terapeuta certo para você.",
  },
  es: {
    eyebrow: "Encontrar un Terapeuta",
    heading: "Obteniendo ayuda profesional",
    subtitle: "Pedir ayuda requiere valentía. Aquí hay opciones reales para obtener apoyo de salud mental en inglés en Corea.",
    mapLabel: "Ubicaciones en el mapa — haz clic en un pin para detalles",
    contactLabel: "Contacto:",
    websiteLabel: "Sitio web:",
    closeLabel: "cerrar",
    callout: "💛 ¿No sabes por dónde empezar? Llama primero al Seoul Global Center (02-2075-4180). Es gratuito y te ayudarán a encontrar el terapeuta adecuado.",
  },
};

export default function TherapistDirectory() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;
  const [selected, setSelected] = useState<Therapist | null>(null);

  return (
    <section id="therapists" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            {s.eyebrow}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
            {s.heading}
          </h2>
          <p className="mb-8 max-w-xl text-zinc-500">
            {s.subtitle}
          </p>
        </motion.div>

        {/* Therapist cards */}
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          {THERAPISTS.map((therapist, i) => (
            <motion.div
              key={therapist.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`rounded-2xl border p-5 transition-all cursor-pointer ${
                selected?.name === therapist.name
                  ? "border-[#ffd966] bg-[#ffd966]/5"
                  : "border-zinc-200 bg-[#fafaf8] hover:border-zinc-300"
              }`}
              onClick={() => setSelected(selected?.name === therapist.name ? null : therapist)}
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold leading-snug text-zinc-950">{therapist.name}</h3>
                  <p className="text-sm text-zinc-400">{therapist.nameKo}</p>
                </div>
                <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                  {loc(therapist as Record<string, unknown>, "type", locale)}
                </span>
              </div>

              {/* Languages */}
              <div className="mb-3 flex flex-wrap gap-1.5">
                {therapist.languages.map((lang) => (
                  <span
                    key={lang}
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${LANG_COLORS[lang] ?? "bg-zinc-100 text-zinc-600"}`}
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <p className="mb-3 text-sm text-zinc-600">
                {loc(therapist as Record<string, unknown>, "desc", locale)}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                <span>📍 {loc(therapist as Record<string, unknown>, "location", locale)}</span>
                <span>💰 {loc(therapist as Record<string, unknown>, "priceRange", locale)}</span>
              </div>

              {/* Expanded contact */}
              {selected?.name === therapist.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 border-t border-zinc-200 pt-4"
                >
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="font-semibold text-zinc-700">
                      {s.contactLabel}
                    </span>
                    <span className="text-zinc-600">{therapist.contact}</span>
                  </div>
                  {therapist.website !== therapist.contact && (
                    <div className="mt-1 flex flex-wrap gap-2 text-sm">
                      <span className="font-semibold text-zinc-700">
                        {s.websiteLabel}
                      </span>
                      <span className="text-zinc-600">{therapist.website}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 text-sm font-semibold text-zinc-500">
            {s.mapLabel}
          </p>
          <div className="overflow-hidden rounded-2xl border border-zinc-200">
            <TherapistMap therapists={THERAPISTS} onSelect={setSelected} />
          </div>

          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-2xl border border-zinc-200 bg-[#fafaf8] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-zinc-950">{selected.name}</h3>
                  <p className="text-sm text-zinc-400">{selected.nameKo}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-xs text-zinc-400 hover:text-zinc-600"
                >
                  ✕ {s.closeLabel}
                </button>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                {loc(selected as Record<string, unknown>, "desc", locale)}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                <span>📍 {loc(selected as Record<string, unknown>, "location", locale)}</span>
                <span>💰 {loc(selected as Record<string, unknown>, "priceRange", locale)}</span>
                <span>📞 {selected.contact}</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Tip callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
