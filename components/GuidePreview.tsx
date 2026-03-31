"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import { guideGroups, guideCategories } from "@/lib/guideData";

export default function GuidePreview() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="guide" className="bg-zinc-950 px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {isKo ? "서울 가이드" : "Seoul Guide"}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              {isKo ? "이웃의 핸드북" : "The Neighbor's\nHandbook"}
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
            {isKo
              ? "처음 한국에 왔을 때 누군가 알려줬으면 했던 것들."
              : "Everything you wish someone had told you when you first arrived in Korea."}
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {guideCategories.map((cat) => {
            const catGuides = guideGroups.filter((g) => g.category === cat.id);
            return (
              <div key={cat.id}>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                  {isKo ? cat.labelKo : cat.labelEn}
                </p>
                <div className="grid gap-px bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden">
                  {catGuides.map((g) => (
                    <Link
                      key={g.href}
                      href={g.href}
                      className="group flex flex-col bg-zinc-900 p-6 transition-colors duration-200 hover:bg-zinc-800"
                    >
                      {/* Emoji */}
                      <div className="mb-4 text-3xl">{g.emoji}</div>

                      {/* Name */}
                      <h3 className="mb-1.5 text-sm font-bold text-white leading-snug">
                        {isKo ? g.labelKo : g.labelEn}
                      </h3>

                      {/* Description */}
                      <p className="mb-4 flex-1 text-xs leading-relaxed text-zinc-500">
                        {isKo ? g.descKo : g.descEn}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-600 transition-colors group-hover:text-[#ffd966]">
                        {isKo ? "바로 가기" : "Open"}
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tools row */}
        <div className="mt-8">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            {isKo ? "도구" : "Tools"}
          </p>
          <div className="grid gap-px bg-zinc-800 sm:grid-cols-2 rounded-2xl overflow-hidden">
            {[
              { href: "/tools/phrasebook", emoji: "💬", labelEn: "Phrasebook", labelKo: "상황별 한국어", descEn: "Korean scripts for real situations — show your phone to any Korean speaker.", descKo: "상황별 한국어 — 화면을 보여주면 바로 해결." },
              { href: "/tools/forms", emoji: "📄", labelEn: "Form Decoder", labelKo: "서류 해석기", descEn: "Korean bureaucratic forms decoded field by field in plain English.", descKo: "한국어 서류를 한 칸씩 영어로 설명해드려요." },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col bg-zinc-900 p-6 transition-colors duration-200 hover:bg-zinc-800"
              >
                <div className="mb-4 text-3xl">{tool.emoji}</div>
                <h3 className="mb-1.5 text-sm font-bold text-white">
                  {isKo ? tool.labelKo : tool.labelEn}
                </h3>
                <p className="mb-4 flex-1 text-xs leading-relaxed text-zinc-500">
                  {isKo ? tool.descKo : tool.descEn}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-600 transition-colors group-hover:text-[#ffd966]">
                  {isKo ? "바로 가기" : "Open"}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
