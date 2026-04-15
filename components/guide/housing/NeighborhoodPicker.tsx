"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { NEIGHBORHOODS } from "@/lib/housingData";
import { loc, locArr } from "@/lib/i18n/guideLocale";

type NeighborhoodId =
  | "hongdae"
  | "itaewon"
  | "mapo"
  | "gangnam"
  | "yongsan"
  | "jongno";

type LS = Record<string, string>;
const STRINGS: Record<string, LS> = {
  en: {
    sectionLabel: "Neighborhood Finder",
    heading: "Where should you live in Seoul?",
    subheading: "Answer 3 quick questions and we'll match you with the best Seoul neighborhoods for your life.",
    quizTitle: "Neighborhood Quiz",
    quizSubtitle: "3 questions. We'll find your Seoul neighborhood match.",
    start: "Start →",
    stepBudget: "What's your monthly budget?",
    stepLifestyle: "What's your ideal lifestyle?",
    stepLifestyleHint: "Pick up to 2 that resonate with you",
    stepPriority: "What's your top priority?",
    back: "← Back",
    next: "Next →",
    matchesLabel: "Your matches",
    matchesHeading: "Here are your top neighborhoods",
    topPick: "Top pick",
    startOver: "Start over",
    avgRent: "Avg. monthly rent",
    month: "month",
    prosLabel: "Pros",
    consLabel: "Cons",
    subway: "Subway",
    tip: "💡 These are starting points, not gospel. Always visit in person before committing. Recommended listing apps: Zigbang (직방), Dabang (다방), Naver Real Estate (네이버 부동산).",
    stepOf: "Step {n} of {total}",
  },
  ko: {
    sectionLabel: "동네 추천",
    heading: "어디에 살아야 할까요?",
    subheading: "예산, 라이프스타일, 우선순위를 알려주시면 딱 맞는 동네를 추천해드려요.",
    quizTitle: "동네 추천 퀴즈",
    quizSubtitle: "3가지 질문으로 서울 최적의 동네를 찾아드립니다.",
    start: "시작하기 →",
    stepBudget: "월 예산이 어떻게 되세요?",
    stepLifestyle: "어떤 라이프스타일을 원하세요?",
    stepLifestyleHint: "최대 2개까지 선택 가능",
    stepPriority: "가장 중요한 게 뭔가요?",
    back: "← 이전",
    next: "다음 →",
    matchesLabel: "추천 결과",
    matchesHeading: "이 동네들을 살펴보세요",
    topPick: "최고 추천",
    startOver: "다시 하기",
    avgRent: "평균 월세",
    month: "월",
    prosLabel: "장점",
    consLabel: "단점",
    subway: "지하철",
    tip: "💡 이 추천은 참고용입니다. 실제 이사 전에 직접 방문해보세요. 부동산 앱 추천: 직방(Zigbang), 다방(Dabang), 네이버 부동산.",
    stepOf: "{n} / {total}",
  },
  ja: {
    sectionLabel: "街探しクイズ",
    heading: "ソウルのどこに住むべき？",
    subheading: "3つの質問に答えるだけで、あなたに最適なソウルの街をご提案します。",
    quizTitle: "街マッチングクイズ",
    quizSubtitle: "3問で、あなたにぴったりのソウルの街が見つかります。",
    start: "スタート →",
    stepBudget: "月々の予算は？",
    stepLifestyle: "理想のライフスタイルは？",
    stepLifestyleHint: "最大2つまで選択できます",
    stepPriority: "最も重視することは？",
    back: "← 戻る",
    next: "次へ →",
    matchesLabel: "マッチング結果",
    matchesHeading: "あなたにおすすめの街",
    topPick: "最高のおすすめ",
    startOver: "最初からやり直す",
    avgRent: "平均月額家賃",
    month: "月",
    prosLabel: "メリット",
    consLabel: "デメリット",
    subway: "地下鉄",
    tip: "💡 これらはあくまで参考情報です。契約前に必ず現地を訪れてください。おすすめ物件アプリ: Zigbang (직방)、Dabang (다방)、Naver不動産 (네이버 부동산)。",
    stepOf: "ステップ {n} / {total}",
  },
  "zh-CN": {
    sectionLabel: "街区推荐",
    heading: "你应该住在首尔哪里？",
    subheading: "回答3个问题，我们为你匹配最适合的首尔街区。",
    quizTitle: "街区匹配测验",
    quizSubtitle: "3道题，找到你的首尔归属地。",
    start: "开始 →",
    stepBudget: "你的月预算是多少？",
    stepLifestyle: "你理想的生活方式是什么？",
    stepLifestyleHint: "最多选择2项",
    stepPriority: "你最看重什么？",
    back: "← 返回",
    next: "下一步 →",
    matchesLabel: "推荐结果",
    matchesHeading: "以下是为你推荐的街区",
    topPick: "最佳推荐",
    startOver: "重新开始",
    avgRent: "平均月租",
    month: "月",
    prosLabel: "优点",
    consLabel: "缺点",
    subway: "地铁",
    tip: "💡 这些仅供参考，并非定论。正式签约前请务必亲自实地考察。推荐房源App：Zigbang（직방）、Dabang（다방）、Naver房产（네이버 부동산）。",
    stepOf: "第 {n} / {total} 步",
  },
  "zh-TW": {
    sectionLabel: "街區推薦",
    heading: "你應該住在首爾哪裡？",
    subheading: "回答3個問題，我們為你匹配最適合的首爾街區。",
    quizTitle: "街區匹配測驗",
    quizSubtitle: "3道題，找到你的首爾歸屬地。",
    start: "開始 →",
    stepBudget: "你的月預算是多少？",
    stepLifestyle: "你理想的生活方式是什麼？",
    stepLifestyleHint: "最多選擇2項",
    stepPriority: "你最看重什麼？",
    back: "← 返回",
    next: "下一步 →",
    matchesLabel: "推薦結果",
    matchesHeading: "以下是為你推薦的街區",
    topPick: "最佳推薦",
    startOver: "重新開始",
    avgRent: "平均月租",
    month: "月",
    prosLabel: "優點",
    consLabel: "缺點",
    subway: "地鐵",
    tip: "💡 這些僅供參考，並非定論。正式簽約前請務必親自實地考察。推薦房源App：Zigbang（직방）、Dabang（다방）、Naver房產（네이버 부동산）。",
    stepOf: "第 {n} / {total} 步",
  },
  pt: {
    sectionLabel: "Busca de Bairros",
    heading: "Onde você deveria morar em Seul?",
    subheading: "Responda 3 perguntas rápidas e encontraremos os melhores bairros de Seul para você.",
    quizTitle: "Quiz de Bairros",
    quizSubtitle: "3 perguntas. Encontraremos o seu bairro ideal em Seul.",
    start: "Começar →",
    stepBudget: "Qual é o seu orçamento mensal?",
    stepLifestyle: "Qual é o seu estilo de vida ideal?",
    stepLifestyleHint: "Escolha até 2 que ressoem com você",
    stepPriority: "Qual é a sua prioridade?",
    back: "← Voltar",
    next: "Próximo →",
    matchesLabel: "Suas correspondências",
    matchesHeading: "Aqui estão os seus melhores bairros",
    topPick: "Melhor escolha",
    startOver: "Recomeçar",
    avgRent: "Aluguel médio mensal",
    month: "mês",
    prosLabel: "Vantagens",
    consLabel: "Desvantagens",
    subway: "Metrô",
    tip: "💡 Estes são pontos de partida, não regras absolutas. Sempre visite pessoalmente antes de se comprometer. Apps recomendados: Zigbang (직방), Dabang (다방), Naver Real Estate (네이버 부동산).",
    stepOf: "Passo {n} de {total}",
  },
  es: {
    sectionLabel: "Buscador de Barrios",
    heading: "¿Dónde deberías vivir en Seúl?",
    subheading: "Responde 3 preguntas rápidas y encontraremos los mejores barrios de Seúl para ti.",
    quizTitle: "Quiz de Barrios",
    quizSubtitle: "3 preguntas. Encontraremos tu barrio ideal en Seúl.",
    start: "Empezar →",
    stepBudget: "¿Cuál es tu presupuesto mensual?",
    stepLifestyle: "¿Cuál es tu estilo de vida ideal?",
    stepLifestyleHint: "Elige hasta 2 que te identifiquen",
    stepPriority: "¿Cuál es tu prioridad?",
    back: "← Atrás",
    next: "Siguiente →",
    matchesLabel: "Tus coincidencias",
    matchesHeading: "Aquí están tus mejores barrios",
    topPick: "Mejor elección",
    startOver: "Empezar de nuevo",
    avgRent: "Alquiler mensual promedio",
    month: "mes",
    prosLabel: "Ventajas",
    consLabel: "Desventajas",
    subway: "Metro",
    tip: "💡 Estos son puntos de partida, no reglas absolutas. Visita siempre en persona antes de comprometerte. Apps recomendadas: Zigbang (직방), Dabang (다방), Naver Real Estate (네이버 부동산).",
    stepOf: "Paso {n} de {total}",
  },
};

const BUDGET_OPTIONS = [
  {
    id: "under600",
    label: "Under ₩600K",
    labelKo: "60만원 미만",
    labelJa: "60万ウォン未満",
    labelZhCN: "60万韩元以下",
    labelZhTW: "60萬韓元以下",
    labelPt: "Menos de ₩600K",
    labelEs: "Menos de ₩600K",
    detail: "/ month",
    detailKo: "/ 월",
    detailJa: "/ 月",
    detailZhCN: "/ 月",
    detailZhTW: "/ 月",
    detailPt: "/ mês",
    detailEs: "/ mes",
  },
  {
    id: "600to900",
    label: "₩600K–₩900K",
    labelKo: "60만–90만원",
    labelJa: "60〜90万ウォン",
    labelZhCN: "60万–90万韩元",
    labelZhTW: "60萬–90萬韓元",
    labelPt: "₩600K–₩900K",
    labelEs: "₩600K–₩900K",
    detail: "/ month",
    detailKo: "/ 월",
    detailJa: "/ 月",
    detailZhCN: "/ 月",
    detailZhTW: "/ 月",
    detailPt: "/ mês",
    detailEs: "/ mes",
  },
  {
    id: "900to1500",
    label: "₩900K–₩1.5M",
    labelKo: "90만–150만원",
    labelJa: "90万〜150万ウォン",
    labelZhCN: "90万–150万韩元",
    labelZhTW: "90萬–150萬韓元",
    labelPt: "₩900K–₩1.5M",
    labelEs: "₩900K–₩1.5M",
    detail: "/ month",
    detailKo: "/ 월",
    detailJa: "/ 月",
    detailZhCN: "/ 月",
    detailZhTW: "/ 月",
    detailPt: "/ mês",
    detailEs: "/ mes",
  },
  {
    id: "over1500",
    label: "Over ₩1.5M",
    labelKo: "150만원 이상",
    labelJa: "150万ウォン以上",
    labelZhCN: "150万韩元以上",
    labelZhTW: "150萬韓元以上",
    labelPt: "Mais de ₩1.5M",
    labelEs: "Más de ₩1.5M",
    detail: "/ month",
    detailKo: "/ 월",
    detailJa: "/ 月",
    detailZhCN: "/ 月",
    detailZhTW: "/ 月",
    detailPt: "/ mês",
    detailEs: "/ mes",
  },
];

const LIFESTYLE_OPTIONS = [
  {
    id: "international",
    label: "International vibe",
    labelKo: "국제적인 분위기",
    labelJa: "インターナショナルな雰囲気",
    labelZhCN: "国际化氛围",
    labelZhTW: "國際化氛圍",
    labelPt: "Ambiente internacional",
    labelEs: "Ambiente internacional",
    emoji: "🌍",
  },
  {
    id: "authentic",
    label: "Authentic Korean life",
    labelKo: "진짜 한국 생활",
    labelJa: "本物の韓国の生活",
    labelZhCN: "真实的韩国生活",
    labelZhTW: "真實的韓國生活",
    labelPt: "Vida coreana autêntica",
    labelEs: "Vida coreana auténtica",
    emoji: "🏯",
  },
  {
    id: "nightlife",
    label: "Nightlife & social",
    labelKo: "나이트라이프 & 소셜",
    labelJa: "ナイトライフ＆社交",
    labelZhCN: "夜生活与社交",
    labelZhTW: "夜生活與社交",
    labelPt: "Vida noturna e social",
    labelEs: "Vida nocturna y social",
    emoji: "🎉",
  },
  {
    id: "quiet",
    label: "Quiet & residential",
    labelKo: "조용하고 주거 중심",
    labelJa: "静かな住宅街",
    labelZhCN: "安静的住宅区",
    labelZhTW: "安靜的住宅區",
    labelPt: "Tranquilo e residencial",
    labelEs: "Tranquilo y residencial",
    emoji: "🌿",
  },
  {
    id: "cultural",
    label: "Cultural & historical",
    labelKo: "문화 & 역사",
    labelJa: "文化・歴史",
    labelZhCN: "文化与历史",
    labelZhTW: "文化與歷史",
    labelPt: "Cultural e histórico",
    labelEs: "Cultural e histórico",
    emoji: "🎨",
  },
];

const PRIORITY_OPTIONS = [
  {
    id: "gangnam_work",
    label: "Close to Gangnam / CBD",
    labelKo: "강남/시내 접근성",
    labelJa: "江南・都心へのアクセス",
    labelZhCN: "靠近江南/市中心",
    labelZhTW: "靠近江南/市中心",
    labelPt: "Perto de Gangnam / Centro",
    labelEs: "Cerca de Gangnam / Centro",
    emoji: "🏢",
  },
  {
    id: "food",
    label: "Best food scene",
    labelKo: "최고의 맛집",
    labelJa: "最高のグルメ環境",
    labelZhCN: "最好的美食环境",
    labelZhTW: "最好的美食環境",
    labelPt: "Melhor cena gastronômica",
    labelEs: "Mejor oferta gastronómica",
    emoji: "🍜",
  },
  {
    id: "international_friendly",
    label: "Most international-friendly",
    labelKo: "외국인 친화 최우선",
    labelJa: "最も外国人に優しい",
    labelZhCN: "最适合外国人",
    labelZhTW: "最適合外國人",
    labelPt: "Mais amigável para estrangeiros",
    labelEs: "Más amigable para extranjeros",
    emoji: "🤝",
  },
  {
    id: "value",
    label: "Best value for money",
    labelKo: "가성비 최우선",
    labelJa: "コスパ最優先",
    labelZhCN: "性价比最优",
    labelZhTW: "性價比最優",
    labelPt: "Melhor custo-benefício",
    labelEs: "Mejor relación calidad-precio",
    emoji: "💰",
  },
  {
    id: "nature",
    label: "Near Han River / nature",
    labelKo: "한강 / 자연 가까이",
    labelJa: "漢江・自然に近い",
    labelZhCN: "靠近汉江/自然",
    labelZhTW: "靠近漢江/自然",
    labelPt: "Perto do Rio Han / natureza",
    labelEs: "Cerca del Río Han / naturaleza",
    emoji: "🌊",
  },
];

function getOptionLabel(opt: Record<string, string>, locale: string): string {
  const map: Record<string, string> = {
    ko: "labelKo",
    ja: "labelJa",
    "zh-CN": "labelZhCN",
    "zh-TW": "labelZhTW",
    pt: "labelPt",
    es: "labelEs",
  };
  const key = map[locale];
  return (key && opt[key]) ? opt[key] : opt.label;
}

function getDetailLabel(opt: Record<string, string>, locale: string): string {
  const map: Record<string, string> = {
    ko: "detailKo",
    ja: "detailJa",
    "zh-CN": "detailZhCN",
    "zh-TW": "detailZhTW",
    pt: "detailPt",
    es: "detailEs",
  };
  const key = map[locale];
  return (key && opt[key]) ? opt[key] : opt.detail;
}

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

  return (Object.entries(scores) as [NeighborhoodId, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => id);
}

export default function NeighborhoodPicker() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  const [step, setStep] = useState(0);
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
          {s.sectionLabel}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-400">
          {s.subheading}
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
                  {s.quizTitle}
                </h3>
                <p className="mb-8 max-w-sm text-zinc-400">
                  {s.quizSubtitle}
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="rounded-xl bg-[#ffd966] px-8 py-3 font-bold text-zinc-900 transition-all hover:bg-[#c9a800]"
                >
                  {s.start}
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
                <ProgressBar current={1} total={totalSteps} stepOf={s.stepOf} />
                <h3 className="mb-6 text-xl font-bold text-white">
                  {s.stepBudget}
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
                        {getOptionLabel(opt as Record<string, string>, locale)}
                      </span>
                      <span className="text-sm text-zinc-500">
                        {getDetailLabel(opt as Record<string, string>, locale)}
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
                <ProgressBar current={2} total={totalSteps} stepOf={s.stepOf} />
                <h3 className="mb-2 text-xl font-bold text-white">
                  {s.stepLifestyle}
                </h3>
                <p className="mb-6 text-sm text-zinc-500">
                  {s.stepLifestyleHint}
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
                        {getOptionLabel(opt as Record<string, string>, locale)}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm text-zinc-400 transition-all hover:border-zinc-500"
                  >
                    {s.back}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={lifestyles.length === 0}
                    className="rounded-xl bg-[#ffd966] px-6 py-2.5 text-sm font-bold text-zinc-900 transition-all hover:bg-[#c9a800] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {s.next}
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
                <ProgressBar current={3} total={totalSteps} stepOf={s.stepOf} />
                <h3 className="mb-6 text-xl font-bold text-white">
                  {s.stepPriority}
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
                        {getOptionLabel(opt as Record<string, string>, locale)}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm text-zinc-400 transition-all hover:border-zinc-500"
                  >
                    {s.back}
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
                      {s.matchesLabel}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-white">
                      {s.matchesHeading}
                    </h3>
                  </div>
                  <button
                    onClick={reset}
                    className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition-all hover:border-zinc-500"
                  >
                    {s.startOver}
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
                            {s.topPick}
                          </span>
                        </div>
                      )}
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-2xl">{n.emoji}</span>
                        <div>
                          <p className="font-bold text-white">
                            {loc(n as Record<string, unknown>, "name", locale)}
                          </p>
                          <p className="text-xs text-zinc-400">
                            {loc(n as Record<string, unknown>, "vibe", locale)}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4 rounded-lg bg-zinc-900 px-3 py-2">
                        <p className="text-xs text-zinc-500">{s.avgRent}</p>
                        <p className="font-bold text-[#ffd966]">
                          ₩{(n.avgRentKRW / 10000).toFixed(0)}만원
                          <span className="ml-1 text-xs font-normal text-zinc-400">
                            / {s.month}
                          </span>
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-500">
                          {s.prosLabel}
                        </p>
                        <ul className="space-y-1">
                          {locArr(n as Record<string, unknown>, "pros", locale)
                            .slice(0, 3)
                            .map((pro) => (
                              <li
                                key={pro}
                                className="flex items-start gap-1.5 text-xs text-zinc-300"
                              >
                                <span className="mt-0.5 text-emerald-500">✓</span>
                                {pro}
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="mb-3">
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-red-400">
                          {s.consLabel}
                        </p>
                        <ul className="space-y-1">
                          {locArr(n as Record<string, unknown>, "cons", locale)
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
                        <p className="mb-1 text-xs text-zinc-500">{s.subway}</p>
                        <p className="text-xs text-zinc-400">
                          {n.stations.join(" · ")}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
                  {s.tip}
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
  stepOf,
}: {
  current: number;
  total: number;
  stepOf: string;
}) {
  const label = stepOf
    .replace("{n}", String(current))
    .replace("{total}", String(total));

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-zinc-500">{label}</span>
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
