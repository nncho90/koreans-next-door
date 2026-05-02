"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import FormDecoder from "@/components/tools/forms/FormDecoder";
import ToolFaqSection, { type ToolFaqItem } from "@/components/tools/ToolFaqSection";

const FAQS: Record<string, ToolFaqItem[]> = {
  en: [
    {
      q: "What kinds of forms does this cover?",
      a: "It focuses on the Korean bureaucracy people actually run into: hospitals, banks, ARC-related forms, address changes, and phone plans.",
    },
    {
      q: "Is this a translation service?",
      a: "No. It explains the fields in plain English so you can fill the form yourself with more confidence.",
    },
    {
      q: "Why have its own page?",
      a: "Form help is a separate search need and works best when people can land directly on it.",
    },
  ],
  ko: [
    { q: "어떤 서류를 다루나요?", a: "병원, 은행, ARC, 주소 변경, 휴대폰 요금제처럼 실제로 자주 만나는 한국 서류를 중심으로 설명합니다." },
    { q: "번역 서비스인가요?", a: "아니요. 각 칸의 의미를 쉬운 영어로 설명해서 직접 작성할 수 있게 돕는 도구입니다." },
    { q: "왜 따로 페이지를 만들었나요?", a: "서류 설명은 별도의 검색 의도라서, 바로 들어올 수 있는 페이지가 훨씬 잘 맞습니다." },
  ],
};

function FormsInner() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const faqItems = isKo ? FAQS.ko : FAQS.en;

  return (
    <>
      <SharedNavbar />
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {isKo ? "도구" : "Tools"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "한국 서류,\n쉽게 풀기" : "Korean Forms,\nDecoded"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "모든 항목을 쉬운 언어로 설명합니다. 더 이상 추측은 금물."
                : "Every field explained in plain English. No more guessing."}
            </p>
          </div>
        </section>

        {/* Form Decoder Tool */}
        <FormDecoder />

        <ToolFaqSection
          eyebrow={isKo ? "질문" : "FAQ"}
          heading={isKo ? "서류 해석기에 대해 자주 묻는 것" : "Questions about the form decoder"}
          intro={
            isKo
              ? "무슨 서류를 다루는지, 번역 서비스와 무엇이 다른지, 왜 따로 페이지를 뒀는지 정리했습니다."
              : "What it covers, how it differs from translation, and why it stands on its own page."
          }
          items={faqItems}
        />
      </main>
      <SharedFooter />
    </>
  );
}

export default function FormsContent() {
  return (
    <LocaleProvider>
      <FormsInner />
    </LocaleProvider>
  );
}
