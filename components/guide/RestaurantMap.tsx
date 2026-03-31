"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { useLocale } from "@/lib/i18n";
import { RESTAURANTS, restaurantListJsonLd, type Restaurant } from "@/lib/restaurantData";
import { jsonLd } from "@/lib/jsonLd";

const Map = dynamic(() => import("./RestaurantMapInner"), { ssr: false });

const ALL = "ALL";

export default function RestaurantMap() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [selected, setSelected] = useState<Restaurant | null>(null);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    return RESTAURANTS.filter((r) => {
      const key = r.category;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map((r) => ({ ko: r.category, en: r.categoryEn, emoji: r.emoji }));
  }, []);

  const filtered = useMemo(
    () =>
      activeCategory === ALL
        ? RESTAURANTS
        : RESTAURANTS.filter((r) => r.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(restaurantListJsonLd())}
      />
      <section id="restaurants" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "이웃 맛집" : "Neighbor Picks"}
        </p>
        <h2 className="mb-2 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo ? "시광교회 단골집들" : "Local favorites from Sigwang"}
        </h2>
        <p className="mb-8 max-w-xl text-zinc-500">
          {isKo
            ? "시광교회 멤버들이 직접 추천하는 신촌 맛집 지도예요. 카테고리를 눌러 필터할 수 있어요."
            : "A map of go-to spots in Sinchon, handpicked by our Sigwang Church members. Filter by type below."}
        </p>

        {/* Filter pills */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveCategory(ALL); setSelected(null); }}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150 ${
              activeCategory === ALL
                ? "bg-zinc-950 text-white"
                : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900"
            }`}
          >
            {isKo ? "전체" : "All"}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.ko}
              onClick={() => {
                setActiveCategory(cat.ko);
                setSelected(null);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150 ${
                activeCategory === cat.ko
                  ? "bg-zinc-950 text-white"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900"
              }`}
            >
              {cat.emoji} {isKo ? cat.ko : cat.en}
            </button>
          ))}
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
          <Map restaurants={filtered} onSelect={setSelected} />
        </div>

        {/* Selected detail card */}
        {selected && (
          <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-950">{selected.name}</h3>
                <p className="text-sm text-zinc-500">{selected.nameEn}</p>
              </div>
              <span className="shrink-0 rounded-full bg-[#ffd966]/30 px-3 py-1 text-xs font-bold text-zinc-700">
                {selected.emoji} {isKo ? selected.category : selected.categoryEn}
              </span>
            </div>
            <div className="mt-3 grid gap-2 text-sm text-zinc-600">
              <p>📍 {selected.address}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={selected.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
              >
                {isKo ? "지도에서 보기 →" : "Open in Maps →"}
              </a>
            </div>
          </div>
        )}

        {/* No selection hint */}
        {!selected && (
          <p className="mt-3 text-center text-xs text-zinc-400">
            {isKo ? "핀을 클릭하면 상세 정보를 볼 수 있어요" : "Click a pin to see details"}
          </p>
        )}
      </div>
    </section>
    </>
  );
}
