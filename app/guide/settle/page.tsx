"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import FirstWeekChecklist from "@/components/guide/FirstWeekChecklist";
import BureaucracyWizard from "@/components/guide/BureaucracyWizard";
import SurvivalKit from "@/components/SurvivalKit";

function SettleContent() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  return (
    <>
      <SharedNavbar />
      <main>
        <section className="bg-zinc-950 px-6 pt-32 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {isKo ? "정착하기" : "Settle in"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
              {isKo ? "첫 단추를\n잘 꿰어봐요" : "Get the basics\nsorted first"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-400">
              {isKo
                ? "외국인등록증, 은행, 건강보험, 필수 앱 — 처음에 해야 할 것들."
                : "ARC, bank account, health insurance, essential apps — the stuff you actually need to handle first."}
            </p>
          </div>
        </section>
        <FirstWeekChecklist />
        <BureaucracyWizard />
        <SurvivalKit />
      </main>
      <SharedFooter />
    </>
  );
}

export default function SettlePage() {
  return (
    <LocaleProvider>
      <SettleContent />
    </LocaleProvider>
  );
}
