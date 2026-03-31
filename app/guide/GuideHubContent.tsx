"use client";

import Link from "next/link";
import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import { guideGroups, guideCategories } from "@/lib/guideData";

function GuideHubInner() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <>
      <SharedNavbar />
      <main>
        {/* Page header */}
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
              {isKo ? "서울 가이드" : "Seoul Guide"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "이웃의\n핸드북" : "The Neighbor's\nHandbook"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "처음 한국에 왔을 때 누군가 알려줬으면 했던 것들. 무엇이든 골라 시작해보세요."
                : "Everything you wish someone had told you when you first arrived in Korea. Pick a topic and dig in."}
            </p>
          </div>
        </section>

        {/* Guide categories */}
        <section className="bg-white px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl space-y-10">
            {guideCategories.map((cat) => {
              const catGuides = guideGroups.filter((g) => g.category === cat.id);
              return (
                <div key={cat.id}>
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                    {isKo ? cat.labelKo : cat.labelEn}
                  </p>
                  <div className="grid gap-px bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden">
                    {catGuides.map((g) => (
                      <Link
                        key={g.href}
                        href={g.href}
                        className="group flex flex-col bg-white p-6 transition-colors duration-200 hover:bg-zinc-50"
                      >
                        <div className="mb-4 text-3xl">{g.emoji}</div>
                        <h2 className="mb-1.5 text-sm font-bold text-zinc-950 leading-snug">
                          {isKo ? g.labelKo : g.labelEn}
                        </h2>
                        <p className="mb-4 flex-1 text-xs leading-relaxed text-zinc-500">
                          {isKo ? g.descKo : g.descEn}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors group-hover:text-[#c9a800]">
                          {isKo ? "바로 가기" : "Open"}
                          <span className="transition-transform group-hover:translate-x-0.5">
                            →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Tools row */}
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {isKo ? "도구" : "Tools"}
              </p>
              <div className="grid gap-px bg-zinc-200 sm:grid-cols-2 rounded-2xl overflow-hidden">
                {[
                  {
                    href: "/tools/phrasebook",
                    emoji: "💬",
                    labelEn: "Phrasebook",
                    labelKo: "상황별 한국어",
                    descEn:
                      "Korean scripts for real situations — show your phone to any Korean speaker.",
                    descKo: "상황별 한국어 — 화면을 보여주면 바로 해결.",
                  },
                  {
                    href: "/tools/forms",
                    emoji: "📄",
                    labelEn: "Form Decoder",
                    labelKo: "서류 해석기",
                    descEn:
                      "Korean bureaucratic forms decoded field by field in plain English.",
                    descKo: "한국어 서류를 한 칸씩 영어로 설명해드려요.",
                  },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex flex-col bg-white p-6 transition-colors duration-200 hover:bg-zinc-50"
                  >
                    <div className="mb-4 text-3xl">{tool.emoji}</div>
                    <h2 className="mb-1.5 text-sm font-bold text-zinc-950">
                      {isKo ? tool.labelKo : tool.labelEn}
                    </h2>
                    <p className="mb-4 flex-1 text-xs leading-relaxed text-zinc-500">
                      {isKo ? tool.descKo : tool.descEn}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors group-hover:text-[#c9a800]">
                      {isKo ? "바로 가기" : "Open"}
                      <span className="transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
    </>
  );
}

export default function GuideHubContent() {
  return (
    <LocaleProvider>
      <GuideHubInner />
    </LocaleProvider>
  );
}
