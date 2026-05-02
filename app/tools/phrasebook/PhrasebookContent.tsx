"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import PhrasebookMain from "@/components/tools/phrasebook/PhrasebookMain";
import ToolFaqSection, { type ToolFaqItem } from "@/components/tools/ToolFaqSection";

const FAQS: Record<string, ToolFaqItem[]> = {
  en: [
    {
      q: "Can I hand this to a Korean speaker?",
      a: "Yes. The phrasebook is made for showing your phone to a Korean speaker in the moment.",
    },
    {
      q: "Does it work offline?",
      a: "The phrases themselves do. Some extra features may need a connection, but the main phrasebook is usable without one.",
    },
    {
      q: "Why make it a separate page?",
      a: "It has its own search intent and works better when people can find it directly instead of digging through a bigger guide.",
    },
  ],
  ko: [
    { q: "한국인에게 바로 보여줘도 되나요?", a: "네. 실제로 폰 화면을 바로 보여주도록 만든 회화 도구입니다." },
    { q: "오프라인에서도 되나요?", a: "기본 문장들은 됩니다. 일부 부가 기능은 연결이 필요할 수 있지만, 핵심 회화는 그대로 볼 수 있습니다." },
    { q: "왜 따로 페이지를 만들었나요?", a: "검색 의도도 다르고, 따로 들어와야 바로 쓰기 쉽기 때문입니다." },
  ],
};

function PhrasebookInner() {
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
              {isKo ? "생존 도구" : "Tools"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "실전 한국어" : "Korean for\nReal Life"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "구문을 탭하면 전체화면으로 — 옆에 있는 한국인에게 바로 보여주세요."
                : "Tap any phrase to go full-screen — just show it to the nearest Korean."}
            </p>
          </div>
        </section>

        {/* Main phrasebook tool */}
        <PhrasebookMain />

        <ToolFaqSection
          eyebrow={isKo ? "질문" : "FAQ"}
          heading={isKo ? "회화 도구에 대해 자주 묻는 것" : "Questions about the phrasebook"}
          intro={
            isKo
              ? "핸드폰으로 바로 보여주는 방식, 오프라인 사용, 페이지를 분리한 이유를 짧게 정리했습니다."
              : "A short guide to showing the phrases on your phone, offline use, and why the page stands alone."
          }
          items={faqItems}
        />
      </main>
      <SharedFooter />
    </>
  );
}

export default function PhrasebookContent() {
  return (
    <LocaleProvider>
      <PhrasebookInner />
    </LocaleProvider>
  );
}
