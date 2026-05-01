"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import KoreanAddressGuide from "@/components/guide/daily/KoreanAddressGuide";

function AddressInner() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

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
