"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import FormDecoder from "@/components/tools/forms/FormDecoder";

function FormsInner() {
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
