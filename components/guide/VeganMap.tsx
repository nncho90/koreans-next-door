"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useEffect, useRef } from "react";
import { useLocale } from "@/lib/i18n";
import { VEGAN_PLACES, veganListJsonLd, type VeganPlace } from "@/lib/veganData";
import { jsonLd } from "@/lib/jsonLd";

const Map = dynamic(() => import("./VeganMapInner"), { ssr: false });

const ALL = "ALL";

export default function VeganMap() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [selected, setSelected] = useState<VeganPlace | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const photoCache = useRef<Record<string, string | null>>({});

  useEffect(() => {
    if (!selected) { setPhoto(null); return; }
    const key = selected.id;
    if (key in photoCache.current) {
      setPhoto(photoCache.current[key]);
      return;
    }
    setPhoto(null);
    setPhotoLoading(true);
    const params = new URLSearchParams({
      name: selected.name,
      nameEn: selected.nameEn,
      lat: String(selected.lat),
      lng: String(selected.lng),
    });
    fetch(`/api/place-photo?${params}`)
      .then((r) => r.json())
      .then((d) => { photoCache.current[key] = d.photo ?? null; setPhoto(d.photo ?? null); })
      .catch(() => { photoCache.current[key] = null; })
      .finally(() => setPhotoLoading(false));
  }, [selected?.id]);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    return VEGAN_PLACES.filter((p) => {
      if (seen.has(p.category)) return false;
      seen.add(p.category);
      return true;
    }).map((p) => ({ ko: p.category, en: p.categoryEn }));
  }, []);

  const filtered = useMemo(
    () =>
      activeCategory === ALL
        ? VEGAN_PLACES
        : VEGAN_PLACES.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(veganListJsonLd())}
      />
      <section id="vegan" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-500">
          {isKo ? "비건 맛집" : "Vegan Guide"}
        </p>
        <h2 className="mb-2 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo ? "서울 비건 지도" : "Seoul vegan map"}
        </h2>
        <p className="mb-1 max-w-xl text-zinc-500">
          {isKo
            ? "서울 전역의 비건 레스토랑, 카페, 베이커리를 한눈에. 카테고리로 필터할 수 있어요."
            : "Vegan restaurants, cafes, and bakeries across Seoul — all in one place. Filter by category below."}
        </p>
        {/* Amelie credit */}
        <p className="mb-6 text-sm text-zinc-400">
          {isKo ? "큐레이션: " : "Curated by "}
          <a
            href="https://www.instagram.com/amelierbln"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            @amelierbln
          </a>
        </p>

        {/* Filter pills */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveCategory(ALL); setSelected(null); }}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150 ${
              activeCategory === ALL
                ? "bg-emerald-500 text-white"
                : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900"
            }`}
          >
            {isKo ? `전체 (${VEGAN_PLACES.length})` : `All (${VEGAN_PLACES.length})`}
          </button>
          {categories.map((cat) => {
            const count = VEGAN_PLACES.filter((p) => p.category === cat.ko).length;
            return (
              <button
                key={cat.ko}
                onClick={() => { setActiveCategory(cat.ko); setSelected(null); }}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150 ${
                  activeCategory === cat.ko
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900"
                }`}
              >
                {isKo ? cat.ko : cat.en} ({count})
              </button>
            );
          })}
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
          <Map places={filtered} onSelect={setSelected} />
        </div>

        {/* Selected detail card */}
        {selected ? (
          <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 overflow-hidden">
            {/* Photo */}
            {(photoLoading || photo) && (
              <div className="relative h-48 w-full bg-zinc-100">
                {photoLoading && !photo && (
                  <div className="absolute inset-0 animate-pulse bg-zinc-200" />
                )}
                {photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo}
                    alt={selected.nameEn}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            )}
            <div className="p-5 sm:p-6">
            {/* Header row: emoji + name + price range */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2 min-w-0">
                <span className="text-2xl leading-none mt-0.5 shrink-0">{selected.emoji}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-zinc-950 leading-tight">{selected.name}</h3>
                    {selected.priceRange && (
                      <span className="text-sm font-semibold text-emerald-600">{selected.priceRange}</span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 mt-0.5">{selected.nameEn}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                {isKo ? selected.category : selected.categoryEn}
              </span>
            </div>

            {/* Description */}
            {(isKo ? selected.descriptionKo : selected.description) && (
              <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                {isKo ? selected.descriptionKo : selected.description}
              </p>
            )}

            {/* Must try */}
            {(isKo ? selected.mustTryKo : selected.mustTry)?.length ? (
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  {isKo ? "🍴 추천 메뉴" : "🍴 Must try"}
                </p>
                <ul className="space-y-0.5">
                  {(isKo ? selected.mustTryKo! : selected.mustTry!).map((item, i) => (
                    <li key={i} className="text-sm text-zinc-700">• {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Tags */}
            {(isKo ? selected.tagsKo : selected.tags)?.length ? (
              <p className="mt-3 text-xs text-zinc-400">
                🏷 {(isKo ? selected.tagsKo! : selected.tags!).join(" · ")}
              </p>
            ) : null}

            {/* Address + CTA */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-sm text-zinc-500 flex-1">📍 {selected.address}</p>
              <a
                href={selected.naverMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors text-center"
              >
                {isKo ? "네이버 지도에서 보기 →" : "Open in Naver Maps →"}
              </a>
            </div>
            </div>{/* end inner padding div */}
          </div>
        ) : (
          <p className="mt-3 text-center text-xs text-zinc-400">
            {isKo ? "핀을 클릭하면 상세 정보를 볼 수 있어요" : "Click a pin to see details"}
          </p>
        )}
      </div>
    </section>
    </>
  );
}
