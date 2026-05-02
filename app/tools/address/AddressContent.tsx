"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import KoreanAddressGuide from "@/components/guide/daily/KoreanAddressGuide";
import ToolFaqSection, { type ToolFaqItem } from "@/components/tools/ToolFaqSection";

const FAQS: Record<string, ToolFaqItem[]> = {
  en: [
    {
      q: "Is this the official English address format?",
      a: "Yes. The page follows the Road Name Address English API output and shows the usual mailing order clearly.",
    },
    {
      q: "Will this cost money?",
      a: "The page is free. The live lookup only depends on the Juso approval key being configured on the server.",
    },
    {
      q: "Why is the postal code at the end?",
      a: "For English mailing format, the postal code is typically written at the end, after the country.",
    },
  ],
  ko: [
    {
      q: "이게 공식 영문 주소 형식인가요?",
      a: "네. 도로명주소 영문 API 출력 기준을 따르며, 보통 쓰는 우편 형식을 그대로 보여줍니다.",
    },
    {
      q: "비용이 드나요?",
      a: "페이지 자체는 무료입니다. 실시간 조회는 서버에 Juso 승인키가 설정되어 있어야만 동작합니다.",
    },
    {
      q: "우편번호가 왜 맨 끝에 있나요?",
      a: "영문 우편 형식에서는 보통 우편번호를 국가 뒤에 적기 때문입니다.",
    },
  ],
};

function AddressInner() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const faqItems = isKo ? FAQS.ko : FAQS.en;

  return (
    <>
      <SharedNavbar />
      <main>
        <section className="bg-white px-6 pt-36 md:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
              {isKo ? "도구" : "Tools"}
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-zinc-950 md:text-6xl">
              {isKo
                ? "한국 주소를 영문 주소로 바꾸기"
                : "Korean address to English converter"}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-500">
              {isKo
                ? "도로명주소를 붙여 넣고 영문 우편 형식으로 바꿔보세요. 우편번호와 순서도 함께 확인할 수 있습니다."
                : "Paste a Korean road-name address and convert it into an English mailing address, with the postal-code order shown clearly."}
            </p>
          </div>
        </section>
        <KoreanAddressGuide />

        <ToolFaqSection
          eyebrow={isKo ? "질문" : "FAQ"}
          heading={isKo ? "주소 변환에 대해 자주 묻는 것" : "Questions about address conversion"}
          intro={
            isKo
              ? "주소 순서와 우편번호 위치, 그리고 실시간 조회의 동작 방식을 빠르게 정리했습니다."
              : "A quick answer to the mailing order, postal-code position, and live lookup behavior."
          }
          items={faqItems}
        />
      </main>
      <SharedFooter />
    </>
  );
}

export default function AddressContent() {
  return (
    <LocaleProvider>
      <AddressInner />
    </LocaleProvider>
  );
}
