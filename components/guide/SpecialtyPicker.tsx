"use client";

import { useLocale } from "@/lib/i18n";
import { SPECIALTIES } from "@/lib/healthData";
import type { Locale } from "@/lib/i18n/types";

const STRINGS: Record<Locale, {
  eyebrow: string;
  heading: string;
  subtitle: string;
  goodocHover: string;
  tip: string;
}> = {
  en: {
    eyebrow: "Find a Specialty",
    heading: "What kind of care do you need?",
    subtitle: "Pick a specialty below to search nearby clinics on Goodoc — Korea's largest clinic finder.",
    goodocHover: "Find on Goodoc →",
    tip: "Tip: Download the Goodoc app for appointments, check-ins, and 24/7 telemedicine.",
  },
  ko: {
    eyebrow: "진료과 찾기",
    heading: "어떤 진료가 필요하세요?",
    subtitle: "진료과를 선택하면 굿닥에서 주변 의원을 바로 검색할 수 있어요.",
    goodocHover: "굿닥에서 찾기 →",
    tip: "굿닥 앱을 다운로드하면 예약, 접수, 비대면 진료도 가능해요.",
  },
  ja: {
    eyebrow: "診療科を探す",
    heading: "どんな診療が必要ですか？",
    subtitle: "専門科を選択してGoodocで近くのクリニックを検索できます。",
    goodocHover: "Goodocで探す →",
    tip: "Goodocアプリをダウンロードすると予約・受付・遠隔医療も可能です。",
  },
  "zh-CN": {
    eyebrow: "查找专科",
    heading: "您需要什么类型的诊疗？",
    subtitle: "选择专科，在韩国最大诊所查询平台Goodoc上搜索附近诊所。",
    goodocHover: "在Goodoc上查找 →",
    tip: "下载Goodoc应用可预约、登记和进行24/7远程医疗。",
  },
  "zh-TW": {
    eyebrow: "查找專科",
    heading: "您需要什麼類型的診療？",
    subtitle: "選擇專科，在韓國最大診所查詢平台Goodoc上搜索附近診所。",
    goodocHover: "在Goodoc上查找 →",
    tip: "下載Goodoc應用可預約、登記和進行24/7遠程醫療。",
  },
  pt: {
    eyebrow: "Encontrar Especialidade",
    heading: "Que tipo de cuidado você precisa?",
    subtitle: "Escolha uma especialidade abaixo para buscar clínicas próximas no Goodoc — o maior localizador de clínicas da Coreia.",
    goodocHover: "Encontrar no Goodoc →",
    tip: "Dica: Baixe o aplicativo Goodoc para consultas, check-ins e telemedicina 24/7.",
  },
  es: {
    eyebrow: "Encontrar Especialidad",
    heading: "¿Qué tipo de atención necesitas?",
    subtitle: "Elige una especialidad para buscar clínicas cercanas en Goodoc — el mayor buscador de clínicas de Corea.",
    goodocHover: "Encontrar en Goodoc →",
    tip: "Consejo: Descarga la app Goodoc para citas, registros y telemedicina 24/7.",
  },
};

export default function SpecialtyPicker() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="specialties" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.eyebrow}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {s.subtitle}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {SPECIALTIES.map((sp) => (
            <a
              key={sp.ko}
              href={`https://www.goodoc.co.kr/hospitals?department=${encodeURIComponent(sp.goodocParam)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-5 text-center transition-all hover:border-[#ffd966]/60 hover:shadow-sm"
            >
              <span className="text-3xl">{sp.icon}</span>
              <span className="text-base font-bold text-zinc-900">{sp.ko}</span>
              <span className="text-xs text-zinc-500">{sp.en}</span>
              <span className="mt-1 text-xs font-semibold text-[#c9a800] opacity-0 transition-opacity group-hover:opacity-100">
                {s.goodocHover}
              </span>
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-zinc-400">
          {s.tip}
        </p>
      </div>
    </section>
  );
}
