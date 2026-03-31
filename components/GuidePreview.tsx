"use client";

import Link from "next/link";
import { House, Compass, Lightning, FirstAidKit } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";
import { guideGroups } from "@/lib/guideData";

const numbers = ["01", "02", "03", "04"];
const icons = [House, Compass, Lightning, FirstAidKit];

export default function GuidePreview() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="guide" className="bg-zinc-950 px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">
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

        {/* Cards */}
        <div className="grid gap-px bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden">
          {guideGroups.map((g, i) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex flex-col bg-zinc-900 p-7 transition-colors duration-200 hover:bg-zinc-800"
            >
              {/* Number + Icon row */}
              <div className="mb-6 flex items-start justify-between">
                <span className="text-3xl font-bold tabular-nums text-zinc-700 transition-colors group-hover:text-[#ffd966]">
                  {numbers[i]}
                </span>
                {(() => { const Icon = icons[i]; return (
                  <Icon
                    size={36}
                    weight="duotone"
                    className="text-zinc-700 transition-colors duration-200 group-hover:text-[#ffd966]"
                  />
                ); })()}
              </div>

              {/* Category name */}
              <h3 className="mb-2 text-base font-bold text-white">
                {isKo ? g.labelKo : g.labelEn}
              </h3>

              {/* Description */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-400">
                {isKo ? g.descKo : g.descEn}
              </p>

              {/* Bullet items */}
              <ul className="mb-6 space-y-1.5">
                {(isKo ? g.items.ko : g.items.en).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-[#ffd966]">
                {isKo ? "바로 가기" : "Open"}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
