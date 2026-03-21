"use client";

import { Train, Storefront, ChatDots, FirstAid, Warning, DeviceMobile } from "@phosphor-icons/react";
import type { FC } from "react";
import { useLocale } from "@/lib/i18n";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PhosphorIcon = FC<any>;

// Static data: icons + item names + hrefs (brand names & URLs — not translated)
const categoryIcons: PhosphorIcon[] = [Train, Storefront, ChatDots, DeviceMobile, FirstAid, Warning];

const categoryItems: { name: string; href?: string }[][] = [
  [
    { name: "Seoul Metro app", href: "https://www.seoulmetro.co.kr/en/" },
    { name: "Kakao Map / Naver Map", href: "https://map.kakao.com/" },
    { name: "T-money card", href: "https://www.t-money.co.kr/" },
  ],
  [
    { name: "Baemin (배달의민족)", href: "https://www.baemin.com/" },
    { name: "Coupang Eats", href: "https://www.coupangeats.com/" },
    { name: "Daiso", href: "https://www.daiso.co.kr/" },
  ],
  [
    { name: "KakaoTalk", href: "https://www.kakaocorp.com/page/service/service/KakaoTalk?lang=en" },
    { name: "Papago", href: "https://papago.naver.com/" },
    { name: "Naver Dictionary", href: "https://en.dict.naver.com/" },
  ],
  [
    { name: "Naver (네이버)", href: "https://www.naver.com/" },
    { name: "당근 (Karrot)", href: "https://www.karrotmarket.com/" },
    { name: "Coupang", href: "https://www.coupang.com/" },
  ],
  [
    { name: "Naver Maps → 약국", href: "https://map.naver.com/" },
    { name: "GoodDoc / 1Health", href: "https://www.goodoc.co.kr/" },
    { name: "National Health Insurance", href: "https://www.nhis.or.kr/english/index.do" },
  ],
  [
    { name: "112", href: "tel:112" },
    { name: "119", href: "tel:119" },
    { name: "1330", href: "https://english.visitkorea.or.kr/" },
  ],
];

export default function SurvivalKit() {
  const { t } = useLocale();

  return (
    <section id="survival-kit" className="bg-white px-6 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {t.survivalKit.label}
        </p>
        <h2 className="mb-3 text-4xl font-bold leading-none tracking-tighter text-zinc-950 md:text-5xl">
          {t.survivalKit.heading}
        </h2>
        <p className="mb-10 max-w-lg text-lg leading-relaxed text-zinc-400">
          {t.survivalKit.subheading}
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.survivalKit.categories.map((cat, ci) => {
            const Icon = categoryIcons[ci];
            const items = categoryItems[ci];
            return (
              <div key={ci}>
                <div className="mb-4 flex items-center gap-3">
                  <Icon size={20} weight="regular" className="text-[#ffd966]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-950">
                    {cat.title}
                  </h3>
                </div>
                <ul className="space-y-3 border-t border-zinc-100 pt-4">
                  {items.map((item, ii) => (
                    <li key={item.name} className="flex flex-col gap-0.5">
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("tel:") ? undefined : "_blank"}
                          rel={item.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                          className="text-sm font-semibold text-zinc-900 underline-offset-2 hover:underline hover:text-[#c9a800] transition-colors"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-zinc-900">{item.name}</span>
                      )}
                      <span className="text-sm text-zinc-400">{cat.items[ii].note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
