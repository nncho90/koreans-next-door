"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import HousingSystemExplainer from "@/components/guide/housing/HousingSystemExplainer";
import NeighborhoodPicker from "@/components/guide/housing/NeighborhoodPicker";
import LeaseContractWalkthrough from "@/components/guide/housing/LeaseContractWalkthrough";
import RedFlagsChecklist from "@/components/guide/housing/RedFlagsChecklist";
import MovingChecklist from "@/components/guide/housing/MovingChecklist";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";

type LS = Record<string, string>;
const STRINGS: Record<string, LS> = {
  en: {
    category: "Housing",
    title: "Finding a home\nin Seoul",
    desc: "Jeonse, wolse, lease contracts, scam prevention, and a neighborhood quiz to find where you belong.",
    lastUpdated: "Last updated: March 2026",
    pillRentalTypes: "Rental Types",
    pillNeighborhood: "Neighborhood Finder",
    pillLease: "Lease Contract",
    pillRedFlags: "Red Flags",
    pillMoving: "Moving Checklist",
  },
  ko: {
    category: "주거 안내",
    title: "서울에서\n집 구하기",
    desc: "전세, 월세, 계약서 읽는 법, 사기 예방, 그리고 어디에 살아야 할지까지.",
    lastUpdated: "마지막 업데이트: 2026년 3월",
    pillRentalTypes: "임대 유형",
    pillNeighborhood: "동네 추천",
    pillLease: "계약서 가이드",
    pillRedFlags: "사기 예방",
    pillMoving: "이사 체크리스트",
  },
  ja: {
    category: "住まい",
    title: "ソウルで\n家を探す",
    desc: "チョンセ（전세）、ウォルセ（월세）、賃貸契約の読み方、詐欺防止、そして自分に合った街探しまで。",
    lastUpdated: "最終更新：2026年3月",
    pillRentalTypes: "賃貸タイプ",
    pillNeighborhood: "街探しクイズ",
    pillLease: "賃貸契約",
    pillRedFlags: "詐欺注意",
    pillMoving: "引越しチェックリスト",
  },
  "zh-CN": {
    category: "住房指南",
    title: "在首尔\n寻找住所",
    desc: "全税（전세）、月租（월세）、租赁合同解读、防骗指南，以及帮你找到最适合自己的街区。",
    lastUpdated: "最后更新：2026年3月",
    pillRentalTypes: "租赁类型",
    pillNeighborhood: "街区推荐",
    pillLease: "租赁合同",
    pillRedFlags: "防骗指南",
    pillMoving: "搬家清单",
  },
  "zh-TW": {
    category: "住房指南",
    title: "在首爾\n尋找住所",
    desc: "全稅（전세）、月租（월세）、租賃合約解讀、防騙指南，以及幫你找到最適合自己的街區。",
    lastUpdated: "最後更新：2026年3月",
    pillRentalTypes: "租賃類型",
    pillNeighborhood: "街區推薦",
    pillLease: "租賃合約",
    pillRedFlags: "防騙指南",
    pillMoving: "搬家清單",
  },
  pt: {
    category: "Habitação",
    title: "Encontrar casa\nem Seul",
    desc: "Jeonse, wolse, contratos de arrendamento, prevenção de fraudes e um quiz para encontrar o seu bairro ideal.",
    lastUpdated: "Última atualização: março de 2026",
    pillRentalTypes: "Tipos de Aluguel",
    pillNeighborhood: "Busca de Bairros",
    pillLease: "Contrato de Arrendamento",
    pillRedFlags: "Sinais de Alerta",
    pillMoving: "Lista de Mudança",
  },
  es: {
    category: "Vivienda",
    title: "Encontrar casa\nen Seúl",
    desc: "Jeonse, wolse, contratos de alquiler, prevención de estafas y un quiz para encontrar tu barrio ideal.",
    lastUpdated: "Última actualización: marzo de 2026",
    pillRentalTypes: "Tipos de Alquiler",
    pillNeighborhood: "Buscador de Barrios",
    pillLease: "Contrato de Alquiler",
    pillRedFlags: "Señales de Alerta",
    pillMoving: "Lista de Mudanza",
  },
};

function HousingInner() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  const pills = [
    { href: "#housing-types", label: s.pillRentalTypes },
    { href: "#neighborhood-picker", label: s.pillNeighborhood },
    { href: "#lease-contract", label: s.pillLease },
    { href: "#red-flags", label: s.pillRedFlags },
    { href: "#moving-checklist", label: s.pillMoving },
  ];

  return (
    <>
      <SharedNavbar />
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {s.category}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {s.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {s.desc}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {s.lastUpdated}
            </p>

            {/* Quick nav pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {pills.map((pill) => (
                <a
                  key={pill.href}
                  href={pill.href}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm text-zinc-600 transition-all hover:border-zinc-300 hover:bg-white hover:text-zinc-900"
                >
                  {pill.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <HousingSystemExplainer />
        <NeighborhoodPicker />
        <LeaseContractWalkthrough />
        <RedFlagsChecklist />
        <MovingChecklist />
        <GuideFAQ faqs={GUIDE_FAQS["housing"]} locale={locale} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function HousingContent() {
  return (
    <LocaleProvider>
      <HousingInner />
    </LocaleProvider>
  );
}
