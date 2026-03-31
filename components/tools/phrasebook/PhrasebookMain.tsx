"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { CATEGORIES, PHRASES } from "@/lib/phrasebookData";
import type { Phrase, PhraseCategory } from "@/lib/phrasebookData";

// ─── Priority badge ────────────────────────────────────────────────────────────
function PriorityBadge({ priority }: { priority: Phrase["priority"] }) {
  if (priority === "essential") {
    return (
      <span className="inline-flex items-center rounded-full bg-[#ffd966] px-2 py-0.5 text-xs font-semibold text-zinc-900">
        Essential
      </span>
    );
  }
  if (priority === "useful") {
    return (
      <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600">
        Useful
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-400">
      Bonus
    </span>
  );
}

// ─── Phrase card ───────────────────────────────────────────────────────────────
function PhraseCard({
  phrase,
  isFavorite,
  onToggleFavorite,
  onShow,
  isKo,
}: {
  phrase: Phrase;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onShow: (phrase: Phrase) => void;
  isKo: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Top row: badge + actions */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <PriorityBadge priority={phrase.priority} />
        <div className="flex items-center gap-2">
          {/* Favorite toggle */}
          <button
            onClick={() => onToggleFavorite(phrase.id)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className="rounded-full p-1.5 text-zinc-300 transition-colors hover:text-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
          >
            {isFavorite ? (
              <svg className="h-4 w-4 fill-rose-400 text-rose-400" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Korean (large) */}
      <p className="mb-1 text-2xl font-bold leading-snug tracking-tight text-zinc-950">
        {phrase.korean}
      </p>

      {/* Romanization */}
      <p className="mb-1 text-sm text-zinc-400 italic">{phrase.romanization}</p>

      {/* English translation */}
      <p className="mb-3 text-base font-medium text-zinc-700">{phrase.english}</p>

      {/* Context */}
      <p className="mb-4 text-xs text-zinc-400">
        {isKo ? phrase.contextKo : phrase.contextEn}
      </p>

      {/* SHOW button */}
      <button
        onClick={() => onShow(phrase)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {isKo ? "크게 보기" : "SHOW THIS"}
      </button>
    </motion.div>
  );
}

// ─── Show Mode overlay ─────────────────────────────────────────────────────────
function ShowMode({
  phrase,
  onClose,
  isKo,
}: {
  phrase: Phrase;
  onClose: () => void;
  isKo: boolean;
}) {
  // Dynamic font size based on text length
  const len = phrase.korean.length;
  const koreanSizeClass =
    len <= 6
      ? "text-7xl md:text-9xl"
      : len <= 12
        ? "text-6xl md:text-8xl"
        : len <= 18
          ? "text-5xl md:text-7xl"
          : "text-4xl md:text-6xl";

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[200] flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Show phrase full screen"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-5">
        <button
          onClick={onClose}
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          {isKo ? "뒤로" : "Back"}
        </button>

        {/* Category context */}
        <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
          {isKo ? "보여주세요" : "Show to a Korean speaker"}
        </span>

        {/* Landscape hint for mobile */}
        <span className="hidden text-xs text-zinc-300 sm:block">
          ↻ {isKo ? "가로로 돌리면 더 커요" : "Rotate for wider view"}
        </span>
        <span className="text-xs text-zinc-300 sm:hidden">↻</span>
      </div>

      {/* Center content */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        {/* Main Korean text */}
        <motion.p
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className={`${koreanSizeClass} font-bold leading-tight tracking-tight text-zinc-950`}
        >
          {phrase.korean}
        </motion.p>

        {/* Romanization */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="mt-5 text-xl text-zinc-400 italic md:text-2xl"
        >
          {phrase.romanization}
        </motion.p>

        {/* English */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="mt-3 text-lg font-medium text-zinc-600 md:text-xl"
        >
          {phrase.english}
        </motion.p>

        {/* Context */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="mt-4 max-w-sm text-sm text-zinc-400 italic"
        >
          {isKo ? phrase.contextKo : phrase.contextEn}
        </motion.p>
      </div>

      {/* Bottom tap to dismiss */}
      <div className="pb-8 text-center">
        <button
          onClick={onClose}
          className="text-xs text-zinc-300 underline-offset-2 hover:text-zinc-400 hover:underline"
        >
          {isKo ? "탭하여 닫기" : "Tap anywhere to go back"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Category tab button ───────────────────────────────────────────────────────
function CategoryTab({
  category,
  isActive,
  count,
  isKo,
  onClick,
}: {
  category: PhraseCategory | { id: string; nameEn: string; nameKo: string; emoji: string };
  isActive: boolean;
  count: number;
  isKo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-3 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd966] ${
        isActive
          ? "border-[#ffd966] bg-[#ffd966] text-zinc-900 shadow-sm"
          : "border-zinc-100 bg-white text-zinc-600 hover:border-zinc-200 hover:bg-zinc-50"
      }`}
    >
      <span className="text-2xl leading-none">{category.emoji}</span>
      <span className="text-xs font-semibold leading-tight">
        {isKo ? category.nameKo : category.nameEn}
      </span>
      <span
        className={`text-xs font-medium ${isActive ? "text-zinc-700" : "text-zinc-400"}`}
      >
        {count}
      </span>
    </button>
  );
}

// ─── Main exported component ───────────────────────────────────────────────────
export default function PhrasebookMain() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  const [selectedCategory, setSelectedCategory] = useState<string>("hospital");
  const [showModePhrase, setShowModePhrase] = useState<Phrase | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Load favorites from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("knd-favorites");
      if (stored) {
        setFavorites(new Set(JSON.parse(stored) as string[]));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist favorites
  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("knd-favorites", JSON.stringify([...next]));
      }
      return next;
    });
  }, []);

  // Phrase counts per category
  const countsPerCategory = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.id] = PHRASES.filter((p) => p.categoryId === cat.id).length;
    return acc;
  }, {});
  const favoritesCount = favorites.size;

  // Filtered phrases for selected category / search
  const displayedPhrases = (() => {
    let pool: Phrase[];

    if (selectedCategory === "favorites") {
      pool = PHRASES.filter((p) => favorites.has(p.id));
    } else {
      pool = PHRASES.filter((p) => p.categoryId === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(
        (p) =>
          p.korean.toLowerCase().includes(q) ||
          p.romanization.toLowerCase().includes(q) ||
          p.english.toLowerCase().includes(q) ||
          p.contextEn.toLowerCase().includes(q)
      );
    }

    return pool;
  })();

  const favoritesTab = {
    id: "favorites",
    nameEn: "Favorites",
    nameKo: "즐겨찾기",
    emoji: "❤️",
  };

  return (
    <>
      {/* Show mode overlay — rendered at root level to cover everything */}
      <AnimatePresence>
        {showModePhrase && (
          <ShowMode
            phrase={showModePhrase}
            onClose={() => setShowModePhrase(null)}
            isKo={isKo}
          />
        )}
      </AnimatePresence>

      <section className="bg-[#fafaf8] px-4 py-12 md:px-10">
        <div className="mx-auto max-w-5xl">
          {/* Search bar */}
          <div className="mb-8">
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isKo
                    ? "구문 검색 (한국어, 영어, 로마자)..."
                    : "Search phrases (Korean, English, romanization)..."
                }
                className="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#ffd966] focus:outline-none focus:ring-2 focus:ring-[#ffd966]/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:text-zinc-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category grid */}
          <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
            {/* Favorites tab */}
            <CategoryTab
              category={favoritesTab}
              isActive={selectedCategory === "favorites"}
              count={favoritesCount}
              isKo={isKo}
              onClick={() => {
                setSelectedCategory("favorites");
                setSearchQuery("");
              }}
            />
            {/* Category tabs */}
            {CATEGORIES.map((cat) => (
              <CategoryTab
                key={cat.id}
                category={cat}
                isActive={selectedCategory === cat.id}
                count={countsPerCategory[cat.id] ?? 0}
                isKo={isKo}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchQuery("");
                }}
              />
            ))}
          </div>

          {/* Section header */}
          <div className="mb-6">
            {selectedCategory === "favorites" ? (
              <div>
                <h2 className="text-2xl font-bold text-zinc-950">
                  {isKo ? "❤️ 즐겨찾기" : "❤️ Your Favorites"}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  {isKo
                    ? "하트를 눌러 저장한 구문들"
                    : "Phrases you've saved with the heart button"}
                </p>
              </div>
            ) : (
              (() => {
                const activeCat = CATEGORIES.find((c) => c.id === selectedCategory);
                if (!activeCat) return null;
                return (
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-950">
                      {activeCat.emoji} {isKo ? activeCat.nameKo : activeCat.nameEn}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-400">
                      {isKo ? activeCat.descKo : activeCat.descEn}
                    </p>
                  </div>
                );
              })()
            )}
          </div>

          {/* Phrase grid */}
          {displayedPhrases.length === 0 ? (
            <div className="rounded-2xl border border-zinc-100 bg-white px-8 py-16 text-center">
              {selectedCategory === "favorites" && favorites.size === 0 ? (
                <>
                  <p className="text-4xl">❤️</p>
                  <p className="mt-3 font-semibold text-zinc-700">
                    {isKo ? "즐겨찾기가 없어요" : "No favorites yet"}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {isKo
                      ? "구문 카드의 하트를 눌러 저장하세요"
                      : "Tap the heart on any phrase card to save it here"}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-4xl">🔍</p>
                  <p className="mt-3 font-semibold text-zinc-700">
                    {isKo ? "검색 결과가 없어요" : "No phrases match your search"}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {isKo ? "다른 검색어를 시도해보세요" : "Try a different search term"}
                  </p>
                </>
              )}
            </div>
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {displayedPhrases.map((phrase) => (
                  <PhraseCard
                    key={phrase.id}
                    phrase={phrase}
                    isFavorite={favorites.has(phrase.id)}
                    onToggleFavorite={toggleFavorite}
                    onShow={setShowModePhrase}
                    isKo={isKo}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Phrase count */}
          {displayedPhrases.length > 0 && (
            <p className="mt-6 text-center text-xs text-zinc-400">
              {searchQuery
                ? isKo
                  ? `${displayedPhrases.length}개의 구문이 검색됨`
                  : `${displayedPhrases.length} phrase${displayedPhrases.length !== 1 ? "s" : ""} found`
                : isKo
                  ? `총 ${displayedPhrases.length}개의 구문`
                  : `${displayedPhrases.length} phrases in this category`}
            </p>
          )}
        </div>
      </section>

      {/* Bottom tip bar */}
      <section className="bg-zinc-950 px-6 py-10 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#ffd966]">
                {isKo ? "💡 사용 팁" : "💡 Pro tip"}
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                {isKo
                  ? "SHOW THIS 버튼을 누르면 구문이 전체 화면으로 커져요 — 한국인에게 바로 보여주세요. 외워서 말할 필요 없어요!"
                  : 'Tap "SHOW THIS" on any phrase to go full-screen. Hand your phone to the Korean person — you don\'t need to say a word.'}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <div className="rounded-xl bg-zinc-800 px-4 py-2 text-center">
                <p className="text-2xl font-bold text-white">{PHRASES.length}</p>
                <p className="text-xs text-zinc-400">{isKo ? "총 구문" : "phrases"}</p>
              </div>
              <div className="rounded-xl bg-zinc-800 px-4 py-2 text-center">
                <p className="text-2xl font-bold text-white">{CATEGORIES.length}</p>
                <p className="text-xs text-zinc-400">{isKo ? "상황" : "situations"}</p>
              </div>
              <div className="rounded-xl bg-zinc-800 px-4 py-2 text-center">
                <p className="text-2xl font-bold text-[#ffd966]">{favorites.size}</p>
                <p className="text-xs text-zinc-400">{isKo ? "즐겨찾기" : "saved"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
