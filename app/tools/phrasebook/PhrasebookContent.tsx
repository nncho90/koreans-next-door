"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import PhrasebookMain from "@/components/tools/phrasebook/PhrasebookMain";

function PhrasebookInner() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

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
