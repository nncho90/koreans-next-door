"use client";

import Link from "next/link";
import { useLocale, LocaleProvider } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";

const groups = [
  {
    href: "/guide/settle",
    labelEn: "Settle in",
    labelKo: "정착하기",
    descEn: "The practical first steps: registration, banking, health insurance, and apps.",
    descKo: "외국인등록증, 은행 계좌, 건강보험, 필수 앱 등 정착에 필요한 실질적인 안내예요.",
    items: {
      en: ["First Week Checklist", "Bureaucracy Wizard", "Seoul Survival Kit"],
      ko: ["첫째 주 체크리스트", "행정 처리 가이드", "서울 생존 키트"],
    },
    bg: "bg-zinc-950",
    labelColor: "text-[#ffd966]",
    headingColor: "text-white",
    descColor: "text-zinc-400",
    itemColor: "text-zinc-500",
    dotColor: "bg-[#ffd966]",
    arrowColor: "text-[#ffd966]",
  },
  {
    href: "/guide/explore",
    labelEn: "Explore",
    labelKo: "탐색하기",
    descEn: "Understand the food, the neighborhoods, and what each season feels like.",
    descKo: "음식, 동네, 계절별 생활. 서울을 제대로 즐기기 위한 안내예요.",
    items: {
      en: ["Korean Food Decoder", "Neighborhood Guide", "Seasonal Calendar"],
      ko: ["한국 음식 가이드", "동네 안내", "월별 생활 가이드"],
    },
    bg: "bg-white",
    labelColor: "text-[#c9a800]",
    headingColor: "text-zinc-950",
    descColor: "text-zinc-500",
    itemColor: "text-zinc-400",
    dotColor: "bg-[#ffd966]",
    arrowColor: "text-zinc-300",
  },
  {
    href: "/guide/pinch",
    labelEn: "In a pinch",
    labelKo: "급할 때",
    descEn: "Unwritten rules, emergency info, and a real neighbor to ask when you're stuck.",
    descKo: "불문율, 비상 상황 대비, 그리고 막막할 때 물어볼 수 있는 이웃이 있어요.",
    items: {
      en: ["Cultural Tips", "Emergency Lockscreen Card", "Ask a Neighbor"],
      ko: ["한국 문화 팁", "긴급 잠금화면 카드", "이웃에게 물어보기"],
    },
    bg: "bg-[#fafaf8]",
    labelColor: "text-[#c9a800]",
    headingColor: "text-zinc-950",
    descColor: "text-zinc-500",
    itemColor: "text-zinc-400",
    dotColor: "bg-zinc-300",
    arrowColor: "text-zinc-300",
  },
  {
    href: "/guide/health",
    labelEn: "Find a Doctor",
    labelKo: "의료 안내",
    descEn: "Understand Korea's clinic system and find English-speaking doctors near you.",
    descKo: "한국 의료 시스템을 이해하고 영어 가능 병원을 찾아보세요.",
    items: {
      en: ["Clinic Type Guide", "Specialty Finder", "English-Friendly Clinics"],
      ko: ["진료기관 종류 안내", "진료과 찾기", "영어 가능 병원"],
    },
    bg: "bg-zinc-950",
    labelColor: "text-[#ffd966]",
    headingColor: "text-white",
    descColor: "text-zinc-400",
    itemColor: "text-zinc-500",
    dotColor: "bg-[#ffd966]",
    arrowColor: "text-[#ffd966]",
  },
];

function GuideIndex() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <>
      <SharedNavbar />
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pt-32 pb-12 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {isKo ? "서울 가이드" : "Seoul Guide"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "이웃의 핸드북" : "The Neighbor's Handbook"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "처음 한국에 왔을 때 누군가 알려줬으면 했던 것들."
                : "Everything you wish someone had told you when you first arrived in Korea."}
            </p>
          </div>
        </section>

        {/* 3 group cards */}
        <section className="bg-white px-6 pb-20 md:px-10">
          <div className="mx-auto max-w-5xl grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className={`group relative flex flex-col justify-between rounded-3xl p-8 transition-transform hover:-translate-y-1 ${g.bg}`}
              >
                <div>
                  <p className={`mb-2 text-xs font-bold uppercase tracking-widest ${g.labelColor}`}>
                    {isKo ? g.labelKo : g.labelEn}
                  </p>
                  <h2 className={`mb-3 text-2xl font-bold tracking-tight ${g.headingColor}`}>
                    {isKo ? g.descKo : g.descEn}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {(isKo ? g.items.ko : g.items.en).map((item) => (
                      <li key={item} className={`flex items-center gap-2 text-sm ${g.itemColor}`}>
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${g.dotColor}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`mt-8 flex items-center gap-1 text-sm font-semibold transition-gap ${g.arrowColor}`}>
                  {isKo ? "바로 가기" : "Open"}
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SharedFooter />
    </>
  );
}

export default function GuidePage() {
  return (
    <LocaleProvider>
      <GuideIndex />
    </LocaleProvider>
  );
}
