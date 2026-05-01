"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import RecyclingGuide from "@/components/guide/daily/RecyclingGuide";
import EssentialApps from "@/components/guide/daily/EssentialApps";
import PhonePlans from "@/components/guide/daily/PhonePlans";
import DeliveryGuide from "@/components/guide/daily/DeliveryGuide";
import DriversLicense from "@/components/guide/daily/DriversLicense";
import KoreanAddressGuide from "@/components/guide/daily/KoreanAddressGuide";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";

const STRINGS: Record<Locale, {
  label: string;
  heading: string;
  sub: string;
  updated: string;
  nav: { recycling: string; apps: string; phone: string; delivery: string; address: string; license: string };
}> = {
  en: {
    label: "Daily Life",
    heading: "Living in\nKorea",
    sub: "Recycling rules, phone plans, must-have apps, delivery culture, and your driver's license — everything for daily life in Korea.",
    updated: "Last updated: March 2026",
    nav: { recycling: "Recycling", apps: "Essential Apps", phone: "Phone Plans", delivery: "Delivery", address: "Addresses", license: "Driver's License" },
  },
  ko: {
    label: "일상 생활",
    heading: "한국에서\n사는 법",
    sub: "쓰레기 분리수거부터 유심 요금제, 배달 앱, 운전면허까지 — 한국 일상 생활 완전 가이드.",
    updated: "마지막 업데이트: 2026년 3월",
    nav: { recycling: "분리수거", apps: "필수 앱", phone: "요금제", delivery: "배달", address: "주소", license: "운전면허" },
  },
  ja: {
    label: "日常生活",
    heading: "韓国での\n暮らし方",
    sub: "ゴミの分別から携帯プラン、必須アプリ、デリバリー文化、運転免許まで — 韓国の日常生活完全ガイド。",
    updated: "最終更新：2026年3月",
    nav: { recycling: "ゴミ分別", apps: "必須アプリ", phone: "携帯プラン", delivery: "デリバリー", address: "住所", license: "運転免許" },
  },
  "zh-CN": {
    label: "日常生活",
    heading: "在韩国\n的生活",
    sub: "从垃圾分类到手机套餐、必备App、外卖文化，再到驾驶证办理 — 韩国日常生活完全指南。",
    updated: "最后更新：2026年3月",
    nav: { recycling: "垃圾分类", apps: "必备App", phone: "手机套餐", delivery: "外卖", address: "地址", license: "驾驶证" },
  },
  "zh-TW": {
    label: "日常生活",
    heading: "在韓國\n的生活",
    sub: "從垃圾分類到手機方案、必備App、外送文化，再到駕照辦理 — 韓國日常生活完整指南。",
    updated: "最後更新：2026年3月",
    nav: { recycling: "垃圾分類", apps: "必備App", phone: "手機方案", delivery: "外送", address: "地址", license: "駕照" },
  },
  pt: {
    label: "Vida Cotidiana",
    heading: "Vivendo\nna Coreia",
    sub: "Regras de reciclagem, planos de celular, apps essenciais, cultura de delivery e carteira de motorista — tudo para o dia a dia na Coreia.",
    updated: "Última atualização: Março de 2026",
    nav: { recycling: "Reciclagem", apps: "Apps Essenciais", phone: "Planos de Celular", delivery: "Delivery", address: "Endereços", license: "Carteira de Motorista" },
  },
  es: {
    label: "Vida Diaria",
    heading: "Vivir\nen Corea",
    sub: "Normas de reciclaje, planes de celular, apps imprescindibles, cultura de delivery y licencia de conducir — todo para la vida diaria en Corea.",
    updated: "Última actualización: Marzo de 2026",
    nav: { recycling: "Reciclaje", apps: "Apps Esenciales", phone: "Planes de Celular", delivery: "Delivery", address: "Direcciones", license: "Licencia de Conducir" },
  },
};

function DailyContent() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <>
      <SharedNavbar />
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {s.label}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl whitespace-pre-line">
              {s.heading}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {s.sub}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {s.updated}
            </p>

            {/* Quick jump nav */}
            <div className="mt-8 flex flex-wrap gap-2">
              {(
                [
                  { href: "#recycling", key: "recycling" },
                  { href: "#apps", key: "apps" },
                  { href: "#phone", key: "phone" },
                  { href: "#delivery", key: "delivery" },
                  { href: "#address", key: "address" },
                  { href: "#license", key: "license" },
                ] as { href: string; key: keyof typeof s.nav }[]
              ).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-white hover:text-zinc-950"
                >
                  {s.nav[link.key]}
                </a>
              ))}
            </div>
          </div>
        </section>

        <RecyclingGuide />
        <EssentialApps />
        <PhonePlans />
        <DeliveryGuide />
        <KoreanAddressGuide />
        <DriversLicense />
        <GuideFAQ faqs={GUIDE_FAQS["daily"]} locale={locale} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function DailyPage() {
  return (
    <LocaleProvider>
      <DailyContent />
    </LocaleProvider>
  );
}
