"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import FoodDecoder from "@/components/guide/FoodDecoder";
import NeighborhoodGuide from "@/components/guide/NeighborhoodGuide";
import SeasonalCalendar from "@/components/guide/SeasonalCalendar";

function ExploreContent() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  return (
    <>
      <SharedNavbar />
      <main>
        <section className="bg-white px-6 pt-32 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {isKo ? "탐색하기" : "Explore"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "서울을\n제대로 즐기기" : "Actually enjoy\nbeing here"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "음식, 동네, 계절. 서울 생활이 즐거워지는 것들."
                : "Food, neighborhoods, seasons. The things that make life here genuinely fun."}
            </p>
          </div>
        </section>
        <FoodDecoder />
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
