"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { NEIGHBORHOODS } from "@/lib/housingData";

type NeighborhoodId =
  | "hongdae"
  | "itaewon"
  | "mapo"
  | "gangnam"
  | "yongsan"
  | "jongno";

const BUDGET_OPTIONS = [
  {
    id: "under600",
    label: "Under ₩600K",
    labelKo: "60만원 미만",
    detail: "/ month",
    detailKo: "/ 월",
  },
  {
    id: "600to900",
    label: "₩600K–₩900K",
    labelKo: "60만–90만원",
    detail: "/ month",
    detailKo: "/ 월",
  },
  {
    id: "900to1500",
    label: "₩900K–₩1.5M",
    labelKo: "90만–150만원",
    detail: "/ month",
    detailKo: "/ 월",
  },
  {
    id: "over1500",
    label: "Over ₩1.5M",
    labelKo: "150만원 이상",
    detail: "/ month",
    detailKo: "/ 월",
  },
];

const LIFESTYLE_OPTIONS = [
  {
    id: "international",
    label: "International vibe",
    labelKo: "국제적인 분위기",
    emoji: "🌍",
  },
  {
    id: "authentic",
    label: "Authentic Korean life",
    labelKo: "진짜 한국 생활",
    emoji: "🏯",
  },
  {
    id: "nightlife",
    label: "Nightlife & social",
    labelKo: "나이트라이프 & 소셜",
    emoji: "🎉",
  },
  {
    id: "quiet",
    label: "Quiet & residential",
    labelKo: "조용하고 주거 중심",
    emoji: "🌿",
  },
  {
    id: "cultural",
    label: "Cultural & historical",
    labelKo: "문화 & 역사",
    emoji: "🎨",
  },
];

const PRIORITY_OPTIONS = [
  {
    id: "gangnam_work",
    label: "Close to Gangnam / CBD",
    labelKo: "강남/시내 접근성",
    emoji: "🏢",
  },
  {
    id: "food",
    label: "Best food scene",
    labelKo: "최고의 맛집",
    emoji: "🍜",
  },
  {
    id: "international_friendly",
    label: "Most international-friendly",
    labelKo: "외국인 친화 최우선",
    emoji: "🤝",
  },
  {
    id: "value",
    label: "Best value for money",
    labelKo: "가성비 최우선",
    emoji: "💰",
  },
  {
    id: "nature",
    label: "Near Han River / nature",
    labelKo: "한강 / 자연 가까이",
    emoji: "🌊",
  },
];

function scoreNeighborhoods(
  budget: string,
  lifestyles: string[],
  priority: string
): NeighborhoodId[] {
  const scores: Record<NeighborhoodId, number> = {
    hongdae: 0,
    itaewon: 0,
    mapo: 0,
    gangnam: 0,
    yongsan: 0,
    jongno: 0,
  };

  // Budget scoring
  if (budget === "under600") {
    scores.mapo += 3;
    scores.jongno += 2;
  } else if (budget === "600to900") {
    scores.hongdae += 3;
    scores.mapo += 3;
    scores.jongno += 2;
  } else if (budget === "900to1500") {
    scores.hongdae += 2;
    scores.yongsan += 3;
    scores.itaewon += 1;
  } else if (budget === "over1500") {
    scores.gangnam += 3;
    scores.itaewon += 2;
    scores.yongsan += 2;
  }

  // Lifestyle scoring
  for (const lifestyle of lifestyles) {
    if (lifestyle === "international") {
      scores.itaewon += 3;
      scores.hongdae += 2;
    } else if (lifestyle === "authentic") {
      scores.jongno += 3;
      scores.mapo += 1;
    } else if (lifestyle === "nightlife") {
      scores.hongdae += 3;
      scores.itaewon += 2;
    } else if (lifestyle === "quiet") {
      scores.yongsan += 2;
      scores.jongno += 1;
      scores.gangnam += 1;
    } else if (lifestyle === "cultural") {
      scores.jongno += 3;
    }
  }

  // Priority scoring
  if (priority === "gangnam_work") {
    scores.gangnam += 3;
    scores.yongsan += 1;
  } else if (priority === "food") {
    scores.hongdae += 2;
    scores.mapo += 2;
    scores.itaewon += 2;
  } else if (priority === "international_friendly") {
    scores.itaewon += 3;
    scores.hongdae += 2;
  } else if (priority === "value") {
    scores.mapo += 3;
    scores.jongno += 2;
  } else if (priority === "nature") {
    scores.yongsan += 3;
    scores.mapo += 1;
  }

  // Sort by score descending and return top 3
  return (Object.entries(scores) as [NeighborhoodId, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => id);
}

export default function NeighborhoodPicker() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  const [step, setStep] = useState(0); // 0=intro, 1=budget, 2=lifestyle, 3=priority, 4=results
  const [budget, setBudget] = useState<string | null>(null);
  const [lifestyles, setLifestyles] = useState<string[]>([]);
  const [priority, setPriority] = useState<string | null>(null);

  const totalSteps = 3;

  function toggleLifestyle(id: string) {
    setLifestyles((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id].slice(-2)
    );
  }

  function reset() {
    setStep(0);
    setBudget(null);
    setLifestyles([]);
    setPriority(null);
  }

  const recommendedIds =
    step === 4 && budget && lifestyles.length > 0 && priority
      ? scoreNeighborhoods(budget, lifestyles, priority)
      : [];

  const recommendedNeighborhoods = recommendedIds.map((id) =>
    NEIGHBORHOODS.find((n) => n.id === id)!
  );

  return (
    <section
      id="neighborhood-picker"
      className="bg-zinc-950 px-6 py-16 md:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "동네 추천" : "Neighborhood Finder"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {isKo
            ? "어디에 살아야 할까요?"
            : "Where should you live in Seoul?"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-400">
          {isKo
            ? "예산, 라이프스타일, 우선순위를 알려주시면 딱 맞는 동네를 추천해드려요."
            : "Answer 3 quick questions and we'll match you with the best Seoul neighborhoods for your life."}
        </p>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
          <AnimatePresence mode="wait">
            {/* INTRO */}
            {step === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <span className="mb-4 text-5xl">🗺️</span>
                <h3 className="mb-2 text-2xl font-bold text-white">
                  {isKo ? "동네 추천 퀴즈" : "Neighborhood Quiz"}
                </h3>
                <p className="mb-8 max-w-sm text-zinc-400">
                  {isKo
                    ? "3가지 질문으로 서울 최적의 동네를 찾아드립니다."
                    : "3 questions. We'll find your Seoul neighborhood match."}
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="rounded-xl bg-[#ffd966] px-8 py-3 font-bold text-zinc-900 transition-all hover:bg-[#c9a800]"
                >
                  {isKo ? "시작하기 →" : "Start →"}
                </button>
              </motion.div>
            )}

            {/* STEP 1: BUDGET */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <ProgressBar current={1} total={totalSteps} />
                <h3 className="mb-6 text-xl font-bold text-white">
                  {isKo
                    ? "월 예산이 어떻게 되세요?"
                    : "What's your monthly budget?"}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setBudget(opt.id);
                        setStep(2);
                      }}
                      className={`flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all ${
                        budget === opt.id
                          ? "border-[#ffd966] bg-[#ffd966]/10 text-white"
                          : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      <span className="font-semibold">
                        {isKo ? opt.labelKo : opt.label}
                      </span>
                      <span className="text-sm text-zinc-500">
                        {isKo ? opt.detailKo : opt.detail}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: LIFESTYLE */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <ProgressBar current={2} total={totalSteps} />
                <h3 className="mb-2 text-xl font-bold text-white">
                  {isKo
                    ? "어떤 라이프스타일을 원하세요?"
                    : "What's your ideal lifestyle?"}
                </h3>
                <p className="mb-6 text-sm text-zinc-500">
                  {isKo
                    ? "최대 2개까지 선택 가능"
                    : "Pick up to 2 that resonate with you"}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {LIFESTYLE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => toggleLifestyle(opt.id)}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-4 text-left transition-all ${
                        lifestyles.includes(opt.id)
                          ? "border-[#ffd966] bg-[#ffd966]/10 text-white"
                          : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="font-medium">
                        {isKo ? opt.labelKo : opt.label}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm text-zinc-400 transition-all hover:border-zinc-500"
                  >
                    {isKo ? "← 이전" : "← Back"}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={lifestyles.length === 0}
                    className="rounded-xl bg-[#ffd966] px-6 py-2.5 text-sm font-bold text-zinc-900 transition-all hover:bg-[#c9a800] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isKo ? "다음 →" : "Next →"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PRIORITY */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <ProgressBar current={3} total={totalSteps} />
                <h3 className="mb-6 text-xl font-bold text-white">
                  {isKo
                    ? "가장 중요한 게 뭔가요?"
                    : "What's your top priority?"}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {PRIORITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setPriority(opt.id);
                        setStep(4);
                      }}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-4 text-left transition-all ${
                        priority === opt.id
                          ? "border-[#ffd966] bg-[#ffd966]/10 text-white"
                          : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="font-medium">
                        {isKo ? opt.labelKo : opt.label}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm text-zinc-400 transition-all hover:border-zinc-500"
                  >
                    {isKo ? "← 이전" : "← Back"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* RESULTS */}
            {step === 4 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
                      {isKo ? "추천 결과" : "Your matches"}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-white">
                      {isKo
                        ? "이 동네들을 살펴보세요"
                        : "Here are your top neighborhoods"}
                    </h3>
                  </div>
                  <button
                    onClick={reset}
                    className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition-all hover:border-zinc-500"
                  >
                    {isKo ? "다시 하기" : "Start over"}
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {recommendedNeighborhoods.map((n, idx) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="relative rounded-2xl border border-zinc-700 bg-zinc-800 p-5"
                    >
                      {idx === 0 && (
                        <div className="absolute -top-2.5 left-4">
                          <span className="rounded-full bg-[#ffd966] px-3 py-0.5 text-xs font-bold text-zinc-900">
                            {isKo ? "최고 추천" : "Top pick"}
                          </span>
                        </div>
                      )}
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-2xl">{n.emoji}</span>
                        <div>
                          <p className="font-bold text-white">
                            {isKo ? n.nameKo : n.name}
                          </p>
                          <p className="text-xs text-zinc-400">
                            {isKo ? n.vibeKo : n.vibe}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4 rounded-lg bg-zinc-900 px-3 py-2">
                        <p className="text-xs text-zinc-500">
                          {isKo ? "평균 월세" : "Avg. monthly rent"}
                        </p>
                        <p className="font-bold text-[#ffd966]">
                          ₩{(n.avgRentKRW / 10000).toFixed(0)}만원
                          <span className="ml-1 text-xs font-normal text-zinc-400">
                            / {isKo ? "월" : "month"}
                          </span>
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-500">
                          {isKo ? "장점" : "Pros"}
                        </p>
                        <ul className="space-y-1">
                          {(isKo ? n.prosKo : n.pros)
                            .slice(0, 3)
                            .map((pro) => (
                              <li
                                key={pro}
                                className="flex items-start gap-1.5 text-xs text-zinc-300"
                              >
                                <span className="mt-0.5 text-emerald-500">
                                  ✓
                                </span>
                                {pro}
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="mb-3">
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-red-400">
                          {isKo ? "단점" : "Cons"}
                        </p>
                        <ul className="space-y-1">
                          {(isKo ? n.consKo : n.cons)
                            .slice(0, 2)
                            .map((con) => (
                              <li
                                key={con}
                                className="flex items-start gap-1.5 text-xs text-zinc-400"
                              >
                                <span className="mt-0.5 text-red-400">✕</span>
                                {con}
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <p className="mb-1 text-xs text-zinc-500">
                          {isKo ? "지하철" : "Subway"}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {n.stations.join(" · ")}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
                  {isKo
                    ? "💡 이 추천은 참고용입니다. 실제 이사 전에 직접 방문해보세요. 부동산 앱 추천: 직방(Zigbang), 다방(Dabang), 네이버 부동산."
                    : "💡 These are starting points, not gospel. Always visit in person before committing. Recommended listing apps: Zigbang (직방), Dabang (다방), Naver Real Estate (네이버 부동산)."}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          Step {current} of {total}
        </span>
        <span className="text-xs text-zinc-500">
          {Math.round((current / total) * 100)}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <motion.div
          className="h-full rounded-full bg-[#ffd966]"
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}
