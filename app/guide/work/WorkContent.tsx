"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import ContractGuide from "@/components/guide/work/ContractGuide";
import LaborRights from "@/components/guide/work/LaborRights";
import WorkplaceCulture from "@/components/guide/work/WorkplaceCulture";
import JobResources from "@/components/guide/work/JobResources";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";
import type { Locale } from "@/lib/i18n/types";

const STRINGS: Record<Locale, {
  eyebrow: string;
  h1: string;
  subtitle: string;
  updated: string;
  links: { href: string; label: string }[];
}> = {
  en: {
    eyebrow: "Work",
    h1: "Working in\nKorea",
    subtitle: "Read your contract. Know your rights. Understand the culture. Find the job.",
    updated: "Last updated: March 2026",
    links: [
      { href: "#contract", label: "Employment Contract" },
      { href: "#rights",   label: "Labor Rights" },
      { href: "#culture",  label: "Workplace Culture" },
      { href: "#jobs",     label: "Find a Job" },
    ],
  },
  ko: {
    eyebrow: "취업 & 근무",
    h1: "한국에서\n일하기",
    subtitle: "근로계약서 읽는 법, 당신의 권리, 직장 문화, 그리고 취업 정보.",
    updated: "마지막 업데이트: 2026년 3월",
    links: [
      { href: "#contract", label: "근로계약서" },
      { href: "#rights",   label: "근로자 권리" },
      { href: "#culture",  label: "직장 문화" },
      { href: "#jobs",     label: "취업 정보" },
    ],
  },
  ja: {
    eyebrow: "就労・仕事",
    h1: "韓国で\n働く",
    subtitle: "契約書を読み、権利を知り、文化を理解し、仕事を見つける。",
    updated: "最終更新: 2026年3月",
    links: [
      { href: "#contract", label: "雇用契約書" },
      { href: "#rights",   label: "労働者の権利" },
      { href: "#culture",  label: "職場文化" },
      { href: "#jobs",     label: "求人情報" },
    ],
  },
  "zh-CN": {
    eyebrow: "就业与工作",
    h1: "在韩国\n工作",
    subtitle: "读懂合同、了解权利、理解文化、找到工作。",
    updated: "最后更新: 2026年3月",
    links: [
      { href: "#contract", label: "劳动合同" },
      { href: "#rights",   label: "劳动权利" },
      { href: "#culture",  label: "职场文化" },
      { href: "#jobs",     label: "求职信息" },
    ],
  },
  "zh-TW": {
    eyebrow: "就業與工作",
    h1: "在韓國\n工作",
    subtitle: "讀懂合約、了解權利、理解文化、找到工作。",
    updated: "最後更新: 2026年3月",
    links: [
      { href: "#contract", label: "勞動契約" },
      { href: "#rights",   label: "勞工權利" },
      { href: "#culture",  label: "職場文化" },
      { href: "#jobs",     label: "求職資訊" },
    ],
  },
  pt: {
    eyebrow: "Trabalho",
    h1: "Trabalhando\nna Coreia",
    subtitle: "Entenda seu contrato, conheça seus direitos, compreenda a cultura e encontre emprego.",
    updated: "Última atualização: Março de 2026",
    links: [
      { href: "#contract", label: "Contrato de Trabalho" },
      { href: "#rights",   label: "Direitos Trabalhistas" },
      { href: "#culture",  label: "Cultura no Trabalho" },
      { href: "#jobs",     label: "Encontrar Emprego" },
    ],
  },
  es: {
    eyebrow: "Trabajo",
    h1: "Trabajando\nen Corea",
    subtitle: "Lee tu contrato, conoce tus derechos, entiende la cultura y encuentra empleo.",
    updated: "Última actualización: Marzo de 2026",
    links: [
      { href: "#contract", label: "Contrato Laboral" },
      { href: "#rights",   label: "Derechos Laborales" },
      { href: "#culture",  label: "Cultura Laboral" },
      { href: "#jobs",     label: "Buscar Empleo" },
    ],
  },
};

function WorkContent() {
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
              {s.eyebrow}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {s.h1}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {s.subtitle}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {s.updated}
            </p>

            {/* Jump links */}
            <div className="mt-8 flex flex-wrap gap-3">
              {s.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-[#ffd966] hover:bg-[#ffd966]/10 hover:text-zinc-900"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <ContractGuide />
        <LaborRights />
        <WorkplaceCulture />
        <JobResources />
        <GuideFAQ faqs={GUIDE_FAQS["work"]} locale={locale} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function WorkPage() {
  return (
    <LocaleProvider>
      <WorkContent />
    </LocaleProvider>
  );
}
