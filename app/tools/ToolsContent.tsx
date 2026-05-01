"use client";

import Link from "next/link";
import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";

const TOOLS = [
  {
    href: "/tools/address",
    emoji: "🏠",
    titleEn: "Address Converter",
    titleKo: "영문 주소 변환기",
    descEn: "Convert a Korean road-name address into English mailing format.",
    descKo: "한국 도로명주소를 영문 우편 형식으로 바꿔보세요.",
  },
  {
    href: "/tools/phrasebook",
    emoji: "💬",
    titleEn: "Phrasebook",
    titleKo: "상황별 한국어",
    descEn: "Show-ready Korean phrases for real situations.",
    descKo: "실전 상황에서 바로 보여줄 수 있는 한국어 표현 모음.",
  },
  {
    href: "/tools/forms",
    emoji: "📄",
    titleEn: "Form Decoder",
    titleKo: "서류 해석기",
    descEn: "Decode Korean forms field by field in plain English.",
    descKo: "한국 서류를 항목별로 쉬운 영어로 풀어드립니다.",
  },
];

function ToolsInner() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <>
      <SharedNavbar />
      <main>
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
              {isKo ? "도구" : "Tools"}
            </p>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "한국 생활 도구 모음" : "Tools for Life in Korea"}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-500">
              {isKo
                ? "주소, 회화, 서류. 자주 쓰는 기능만 따로 꺼내서 바로 쓸 수 있게 만들었습니다."
                : "Address lookup, phrases, and form decoding. Each tool gets its own page so people can find the one they need fast."}
            </p>
          </div>
        </section>

        <section className="bg-white px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-px overflow-hidden rounded-3xl bg-zinc-200 sm:grid-cols-3">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col bg-white p-6 transition-colors duration-200 hover:bg-zinc-50"
                >
                  <div className="text-4xl">{tool.emoji}</div>
                  <h2 className="mt-6 text-xl font-bold text-zinc-950">
                    {isKo ? tool.titleKo : tool.titleEn}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-zinc-500">
                    {isKo ? tool.descKo : tool.descEn}
                  </p>
                  <div className="mt-6 text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-[#c9a800]">
                    {isKo ? "열기" : "Open"}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 pb-20 md:px-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
                {isKo ? "왜 따로 두나" : "Why separate pages"}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">
                {isKo ? "검색에서 바로 찾게 만들기" : "Make each tool easy to find"}
              </h2>
              <p className="mt-4 max-w-2xl text-zinc-500">
                {isKo
                  ? "각 도구는 자기 역할이 다르니, 각각의 검색어와 설명이 있는 페이지로 두는 편이 좋습니다."
                  : "Each tool solves a different problem, so each deserves its own search-friendly page with its own title, description, and link path."}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-[#fafaf8] p-6">
              <h3 className="text-lg font-bold text-zinc-950">
                {isKo ? "이렇게 쓰면 됩니다" : "How to use them"}
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600">
                <li>{isKo ? "주소는 /tools/address" : "Use /tools/address for Korean address conversion."}</li>
                <li>{isKo ? "회화는 /tools/phrasebook" : "Use /tools/phrasebook for show-ready Korean phrases."}</li>
                <li>{isKo ? "서류는 /tools/forms" : "Use /tools/forms for bureaucratic form decoding."}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
    </>
  );
}

export default function ToolsContent() {
  return (
    <LocaleProvider>
      <ToolsInner />
    </LocaleProvider>
  );
}
