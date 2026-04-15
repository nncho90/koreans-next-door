"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useLocale } from "@/lib/i18n";
import { ENGLISH_CLINICS, type ClinicPin } from "@/lib/healthData";
import type { Locale } from "@/lib/i18n/types";

const Map = dynamic(() => import("./EnglishClinicMapInner"), { ssr: false });

const STRINGS: Record<Locale, {
  eyebrow: string;
  heading: string;
  subtitle: string;
  openInMaps: string;
}> = {
  en: {
    eyebrow: "English-Friendly Clinics",
    heading: "Clinics that speak your language",
    subtitle: "A curated map of English-friendly clinics and hospitals across Seoul. Click a pin to see details.",
    openInMaps: "Open in Maps →",
  },
  ko: {
    eyebrow: "영어 가능 병원",
    heading: "영어 가능한 병원 지도",
    subtitle: "서울 전역의 영어 가능 병원을 모았어요. 핀을 클릭해 정보를 확인하세요.",
    openInMaps: "지도에서 열기 →",
  },
  ja: {
    eyebrow: "英語対応クリニック",
    heading: "英語が通じるクリニック",
    subtitle: "ソウル全域の英語対応クリニック・病院のマップです。ピンをクリックして詳細を確認してください。",
    openInMaps: "マップで開く →",
  },
  "zh-CN": {
    eyebrow: "英语友好诊所",
    heading: "提供英语服务的诊所",
    subtitle: "首尔各地英语友好诊所和医院的精选地图。点击标记查看详情。",
    openInMaps: "在地图中打开 →",
  },
  "zh-TW": {
    eyebrow: "英語友善診所",
    heading: "提供英語服務的診所",
    subtitle: "首爾各地英語友善診所和醫院的精選地圖。點擊標記查看詳情。",
    openInMaps: "在地圖中打開 →",
  },
  pt: {
    eyebrow: "Clínicas com Atendimento em Inglês",
    heading: "Clínicas que falam sua língua",
    subtitle: "Um mapa curado de clínicas e hospitais em Seul com atendimento em inglês. Clique em um pino para ver detalhes.",
    openInMaps: "Abrir no Maps →",
  },
  es: {
    eyebrow: "Clínicas con Atención en Inglés",
    heading: "Clínicas que hablan tu idioma",
    subtitle: "Un mapa seleccionado de clínicas y hospitales en Seúl con atención en inglés. Haz clic en un pin para ver detalles.",
    openInMaps: "Abrir en Maps →",
  },
};

export default function EnglishClinicMap() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;
  const [selected, setSelected] = useState<ClinicPin | null>(null);

  return (
    <section id="map" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.eyebrow}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-8 max-w-xl text-zinc-500">
          {s.subtitle}
        </p>

        <div className="overflow-hidden rounded-2xl border border-zinc-200">
          <Map
            clinics={ENGLISH_CLINICS}
            selected={selected}
            onSelect={setSelected}
          />
        </div>

        {/* Selected clinic detail panel */}
        {selected && (
          <div className="mt-4 rounded-2xl border border-zinc-200 bg-[#fafaf8] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-950">{selected.name}</h3>
                <p className="text-sm text-zinc-500">{selected.nameKo}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                selected.englishLevel === "Full"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {selected.englishLevel} English
              </span>
            </div>
            <div className="mt-3 grid gap-2 text-sm text-zinc-600">
              <p>📍 {selected.address}</p>
              <p>🏥 {selected.specialty}</p>
              {selected.notes && <p>💬 {selected.notes}</p>}
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={`tel:${selected.phone}`}
                  className="rounded-lg bg-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-300"
                >
                  📞 {selected.phone}
                </a>
                <a
                  href={selected.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  {s.openInMaps}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
