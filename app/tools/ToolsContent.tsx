"use client";

import Link from "next/link";
import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import ToolFaqSection, { type ToolFaqItem } from "@/components/tools/ToolFaqSection";

const TOOLS = [
  {
    href: "/tools/address",
    emoji: "🏠",
    titleEn: "Address Converter",
    titleKo: "영문 주소 변환기",
    descEn: "Signing a lease or filling in a delivery form? Turn your Korean address into English mailing format.",
    descKo: "계약서를 쓰거나 배송 정보를 입력할 때, 한국 주소를 영문 우편 형식으로 바꿔보세요.",
    exampleLabelEn: "Example",
    exampleLabelKo: "예시",
    exampleEn: "서울시 강남구 테헤란로 152 becomes 152 Teheran-ro, Gangnam-gu, Seoul.",
    exampleKo: "서울시 강남구 테헤란로 152 → 152 Teheran-ro, Gangnam-gu, Seoul",
  },
  {
    href: "/tools/phrasebook",
    emoji: "💬",
    titleEn: "Phrasebook",
    titleKo: "상황별 한국어",
    descEn: "In a cafe, taxi, or shop? Grab a ready-made Korean phrase you can say or show on your phone.",
    descKo: "카페, 택시, 가게에서 바로 말하거나 화면으로 보여줄 수 있는 한국어 표현을 찾아보세요.",
    exampleLabelEn: "Example",
    exampleLabelKo: "예시",
    exampleEn: "“Can I get this to go?” shows as 이거 포장돼요?",
    exampleKo: "“이거 포장돼요?” (Can I get this to go?)",
  },
  {
    href: "/tools/forms",
    emoji: "📄",
    titleEn: "Form Decoder",
    titleKo: "서류 해석기",
    descEn: "Stuck on a Korean form you cannot read? See what each field is asking in plain English.",
    descKo: "읽기 어려운 한국 서류가 있을 때, 각 항목이 무엇을 묻는지 쉬운 말로 확인하세요.",
    exampleLabelEn: "Example",
    exampleLabelKo: "예시",
    exampleEn: "The field 성명 simply means your full name, family name first.",
    exampleKo: "“성명” 항목은 성을 먼저 쓰는 전체 이름을 뜻해요.",
  },
];

const FAQS: Record<string, ToolFaqItem[]> = {
  en: [
    {
      q: "Which tool should I use first?",
      a: "Use the address converter when you fill in an address, the phrasebook when you need to say something out loud, and the form decoder when a Korean document leaves you stuck.",
    },
    {
      q: "Do I need to read Korean to use these?",
      a: "No. Everything is explained in English, and the phrasebook shows the Korean text you can hand over on your phone.",
    },
    {
      q: "Are these tools free?",
      a: "Yes. They are free to use on the site.",
    },
  ],
  ko: [
    { q: "어떤 도구부터 쓰면 되나요?", a: "주소를 입력할 때는 주소 변환기, 소리 내어 말해야 할 때는 회화 도구, 한국어 서류가 막힐 때는 서류 해석기를 쓰면 돼요." },
    { q: "한국어를 못 읽어도 쓸 수 있나요?", a: "네. 모두 쉬운 말로 풀어드리고, 회화 도구는 화면으로 바로 보여줄 수 있는 한국어 문장도 함께 알려줘요." },
    { q: "무료인가요?", a: "네. 사이트에서 무료로 사용할 수 있어요." },
  ],
};

function ToolsInner() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const faqItems = isKo ? FAQS.ko : FAQS.en;

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
                ? "주소, 회화, 서류. 한국에서 살다 보면 막히는 순간마다 바로 꺼내 쓸 수 있는 작은 도구들이에요."
                : "Address lookup, phrases, and form decoding. Small helpers for the everyday moments that trip you up while living in Korea."}
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
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {isKo ? tool.descKo : tool.descEn}
                  </p>
                  <div className="mt-4 flex-1 rounded-xl bg-[#fafaf8] p-3">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#c9a800]">
                      {isKo ? tool.exampleLabelKo : tool.exampleLabelEn}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-zinc-700">
                      {isKo ? tool.exampleKo : tool.exampleEn}
                    </p>
                  </div>
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
                {isKo ? "어떤 걸 쓸까" : "Which one to pick"}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">
                {isKo ? "지금 상황에 맞는 도구 고르기" : "Pick the tool for the moment you are in"}
              </h2>
              <p className="mt-4 max-w-2xl text-zinc-500">
                {isKo
                  ? "무엇이 필요한지에 따라 고르면 돼요. 아래 상황을 보고 바로 열어보세요."
                  : "Choose by what you are trying to do right now. Match your moment to the tool below and open it."}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-[#fafaf8] p-6">
              <h3 className="text-lg font-bold text-zinc-950">
                {isKo ? "이럴 때 이 도구" : "When to reach for each"}
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600">
                <li>{isKo ? "계약서나 배송 정보에 주소를 넣을 때는 주소 변환기." : "Putting an address on a lease or a delivery form? Address converter."}</li>
                <li>{isKo ? "카페나 택시에서 한마디 해야 할 때는 회화 도구." : "Need to say one line in a cafe or taxi? Phrasebook."}</li>
                <li>{isKo ? "읽기 어려운 한국 서류가 막힐 때는 서류 해석기." : "Stuck on a Korean document you cannot read? Form decoder."}</li>
              </ul>
            </div>
          </div>
        </section>

        <ToolFaqSection
          eyebrow={isKo ? "질문" : "FAQ"}
          heading={isKo ? "도구에 대해 자주 묻는 것" : "Questions about the tools"}
          intro={
            isKo
              ? "어떤 도구부터 쓰면 좋은지, 어떻게 쓰는지 짧게 정리했어요."
              : "A short answer to which tool to start with and how to use them."
          }
          items={faqItems}
        />
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
