"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useLocale } from "@/lib/i18n";
import { ENGLISH_CLINICS, type ClinicPin } from "@/lib/healthData";

const Map = dynamic(() => import("./EnglishClinicMapInner"), { ssr: false });

export default function EnglishClinicMap() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const [selected, setSelected] = useState<ClinicPin | null>(null);

  return (
    <section className="bg-zinc-900 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "영어 가능 병원" : "English-Friendly Clinics"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {isKo ? "영어 가능한 병원 지도" : "Clinics that speak your language"}
        </h2>
        <p className="mb-8 max-w-xl text-zinc-400">
          {isKo
            ? "서울 전역의 영어 가능 병원을 모았어요. 핀을 클릭해 정보를 확인하세요."
            : "A curated map of English-friendly clinics and hospitals across Seoul. Click a pin to see details."}
        </p>

        <div className="overflow-hidden rounded-2xl border border-zinc-700">
          <Map
            clinics={ENGLISH_CLINICS}
            selected={selected}
            onSelect={setSelected}
          />
        </div>

        {/* Selected clinic detail panel */}
        {selected && (
          <div className="mt-4 rounded-2xl border border-zinc-700 bg-zinc-800 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">{selected.name}</h3>
                <p className="text-sm text-zinc-400">{selected.nameKo}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                selected.englishLevel === "Full"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}>
                {selected.englishLevel} English
              </span>
            </div>
            <div className="mt-3 grid gap-2 text-sm text-zinc-400">
              <p>📍 {selected.address}</p>
              <p>🏥 {selected.specialty}</p>
              {selected.notes && <p>💬 {selected.notes}</p>}
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={`tel:${selected.phone}`}
                  className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-600"
                >
                  📞 {selected.phone}
                </a>
                <a
                  href={selected.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#ffd966] px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-[#f5ce50]"
                >
                  Open in Maps →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
