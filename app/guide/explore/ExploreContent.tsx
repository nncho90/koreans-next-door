"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import FoodDecoder from "@/components/guide/FoodDecoder";
import RestaurantMap from "@/components/guide/RestaurantMap";
import VeganMap from "@/components/guide/VeganMap";
import NeighborhoodGuide from "@/components/guide/NeighborhoodGuide";
import SeasonalCalendar from "@/components/guide/SeasonalCalendar";

const STRINGS: Record<Locale, {
  label: string;
  h1: string;
  sub: string;
}> = {
  en: {
    label: "Explore",
    h1: "Actually enjoy\nbeing here",
    sub: "Food, neighborhoods, seasons. The things that make life here genuinely fun.",
  },
  ko: {
    label: "탐색하기",
    h1: "서울을\n제대로 즐기기",
    sub: "음식, 동네, 계절. 서울 생활이 즐거워지는 것들.",
  },
  ja: {
    label: "探索する",
    h1: "ソウルを\n本当に楽しもう",
    sub: "食べ物、街、季節。ここでの生活を本当に楽しくするもの。",
  },
  "zh-CN": {
    label: "探索首尔",
    h1: "真正享受\n在这里的生活",
    sub: "美食、社区、季节。让在首尔的生活真正精彩的事物。",
  },
  "zh-TW": {
    label: "探索首爾",
    h1: "真正享受\n在這裡的生活",
    sub: "美食、社區、季節。讓在首爾的生活真正精彩的事物。",
  },
  pt: {
    label: "Explorar",
    h1: "Aproveite de\nverdade estar aqui",
    sub: "Comida, bairros, estações. As coisas que tornam a vida aqui genuinamente divertida.",
  },
  es: {
    label: "Explorar",
    h1: "Disfruta de\nverdad estar aquí",
    sub: "Comida, barrios, estaciones. Las cosas que hacen que la vida aquí sea genuinamente divertida.",
  },
};

function ExploreContent() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;
  return (
    <>
      <SharedNavbar />
      <main>
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {s.label}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {s.h1}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {s.sub}
            </p>
          </div>
        </section>
        <FoodDecoder />
        <RestaurantMap />
        <VeganMap />
        <NeighborhoodGuide />
        <SeasonalCalendar />
      </main>
      <SharedFooter />
    </>
  );
}

export default function ExplorePage() {
  return (
    <LocaleProvider>
      <ExploreContent />
    </LocaleProvider>
  );
}
