export type GuideCategory = "getting-started" | "living-here" | "wellbeing" | "discover";

export interface GuideGroup {
  href: string;
  labelEn: string;
  labelKo: string;
  descEn: string;
  descKo: string;
  items: { en: string[]; ko: string[] };
  bg: string;
  labelColor: string;
  headingColor: string;
  descColor: string;
  itemColor: string;
  dotColor: string;
  arrowColor: string;
  category: GuideCategory;
  emoji: string;
}

export const guideCategories = [
  { id: "getting-started" as GuideCategory, labelEn: "Getting Started", labelKo: "처음 시작" },
  { id: "living-here" as GuideCategory, labelEn: "Living Here", labelKo: "생활하기" },
  { id: "wellbeing" as GuideCategory, labelEn: "Wellbeing", labelKo: "건강 & 안전" },
  { id: "discover" as GuideCategory, labelEn: "Discover Seoul", labelKo: "서울 탐험" },
];

export const guideGroups: GuideGroup[] = [
  // ── Getting Started ──────────────────────────────────────────────────
  {
    href: "/guide/settle",
    labelEn: "Settle In",
    labelKo: "정착하기",
    descEn: "The practical first steps: registration, banking, health insurance, and apps.",
    descKo: "외국인등록증, 은행 계좌, 건강보험, 필수 앱 등 정착에 필요한 실질적인 안내예요.",
    items: {
      en: ["First Week Checklist", "Bureaucracy Wizard", "Seoul Survival Kit"],
      ko: ["첫째 주 체크리스트", "행정 처리 가이드", "서울 생존 키트"],
    },
    bg: "bg-zinc-950",
    labelColor: "text-[#ffd966]",
    headingColor: "text-white",
    descColor: "text-zinc-400",
    itemColor: "text-zinc-500",
    dotColor: "bg-[#ffd966]",
    arrowColor: "text-[#ffd966]",
    category: "getting-started",
    emoji: "🏠",
  },
  {
    href: "/guide/visa",
    labelEn: "Visa & Immigration",
    labelKo: "비자 & 체류",
    descEn: "Find your visa type, understand ARC, and navigate immigration offices without stress.",
    descKo: "비자 종류 찾기, 외국인등록증 신청, 출입국 사무소 방문 가이드.",
    items: {
      en: ["Visa Wizard", "Visa Type Guide", "Immigration Office Tips"],
      ko: ["비자 찾기", "비자 종류 안내", "출입국 사무소 팁"],
    },
    bg: "bg-white",
    labelColor: "text-[#c9a800]",
    headingColor: "text-zinc-950",
    descColor: "text-zinc-500",
    itemColor: "text-zinc-400",
    dotColor: "bg-[#ffd966]",
    arrowColor: "text-zinc-300",
    category: "getting-started",
    emoji: "📋",
  },

  // ── Living Here ───────────────────────────────────────────────────────
  {
    href: "/guide/housing",
    labelEn: "Housing",
    labelKo: "집 구하기",
    descEn: "Jeonse, wolse, lease red flags, neighborhood picker, and how to not get scammed.",
    descKo: "전세, 월세, 계약서 주의사항, 동네 추천기 — 안전하게 집 구하기.",
    items: {
      en: ["Jeonse vs Wolse", "Neighborhood Picker", "Lease Contract Guide"],
      ko: ["전세 vs 월세", "동네 추천기", "임대차 계약서 안내"],
    },
    bg: "bg-[#fafaf8]",
    labelColor: "text-[#c9a800]",
    headingColor: "text-zinc-950",
    descColor: "text-zinc-500",
    itemColor: "text-zinc-400",
    dotColor: "bg-zinc-300",
    arrowColor: "text-zinc-300",
    category: "living-here",
    emoji: "🔑",
  },
  {
    href: "/guide/money",
    labelEn: "Money & Banking",
    labelKo: "금융",
    descEn: "Open a bank account, transfer money home, file taxes, and understand your pension.",
    descKo: "은행 계좌 개설, 해외 송금, 세금 신고, 연금 환급 안내.",
    items: {
      en: ["Bank Account Guide", "Transfer Comparison", "Cost of Living Calculator"],
      ko: ["은행 계좌 개설", "해외 송금 비교", "생활비 계산기"],
    },
    bg: "bg-zinc-950",
    labelColor: "text-[#ffd966]",
    headingColor: "text-white",
    descColor: "text-zinc-400",
    itemColor: "text-zinc-500",
    dotColor: "bg-[#ffd966]",
    arrowColor: "text-[#ffd966]",
    category: "living-here",
    emoji: "💰",
  },
  {
    href: "/guide/daily",
    labelEn: "Daily Life",
    labelKo: "일상생활",
    descEn: "Recycling rules, delivery apps, phone plans, utility bills, and getting around.",
    descKo: "분리수거, 배달 앱, 통신 요금제, 공과금, 교통 완벽 정리.",
    items: {
      en: ["Recycling Guide", "Phone Plans", "Essential Apps"],
      ko: ["분리수거 가이드", "통신 요금제", "필수 앱 정리"],
    },
    bg: "bg-white",
    labelColor: "text-[#c9a800]",
    headingColor: "text-zinc-950",
    descColor: "text-zinc-500",
    itemColor: "text-zinc-400",
    dotColor: "bg-[#ffd966]",
    arrowColor: "text-zinc-300",
    category: "living-here",
    emoji: "☀️",
  },
  {
    href: "/guide/work",
    labelEn: "Working in Korea",
    labelKo: "일하기",
    descEn: "Employment contracts, labor rights, workplace culture, and job hunting resources.",
    descKo: "근로 계약서, 노동 권리, 직장 문화, 구직 정보 안내.",
    items: {
      en: ["Contract Red Flags", "Labor Rights", "Workplace Culture"],
      ko: ["계약서 주의사항", "노동 권리", "직장 문화"],
    },
    bg: "bg-[#fafaf8]",
    labelColor: "text-[#c9a800]",
    headingColor: "text-zinc-950",
    descColor: "text-zinc-500",
    itemColor: "text-zinc-400",
    dotColor: "bg-zinc-300",
    arrowColor: "text-zinc-300",
    category: "living-here",
    emoji: "💼",
  },

  // ── Wellbeing ─────────────────────────────────────────────────────────
  {
    href: "/guide/health",
    labelEn: "Healthcare",
    labelKo: "의료 안내",
    descEn: "Understand Korea's clinic system and find English-speaking doctors near you.",
    descKo: "한국 의료 시스템을 이해하고 영어 가능 병원을 찾아보세요.",
    items: {
      en: ["Clinic Type Guide", "Specialty Finder", "English-Friendly Clinics"],
      ko: ["진료기관 종류 안내", "진료과 찾기", "영어 가능 병원"],
    },
    bg: "bg-zinc-950",
    labelColor: "text-[#ffd966]",
    headingColor: "text-white",
    descColor: "text-zinc-400",
    itemColor: "text-zinc-500",
    dotColor: "bg-[#ffd966]",
    arrowColor: "text-[#ffd966]",
    category: "wellbeing",
    emoji: "🏥",
  },
  {
    href: "/guide/mental-health",
    labelEn: "Mental Health",
    labelKo: "마음 건강",
    descEn: "Culture shock, English-speaking therapists, crisis resources, and support groups.",
    descKo: "문화 충격 극복, 영어 가능 상담사, 위기 지원, 커뮤니티 안내.",
    items: {
      en: ["Culture Shock Guide", "Therapist Directory", "Crisis Resources"],
      ko: ["문화 충격 안내", "상담사 찾기", "위기 지원"],
    },
    bg: "bg-white",
    labelColor: "text-[#c9a800]",
    headingColor: "text-zinc-950",
    descColor: "text-zinc-500",
    itemColor: "text-zinc-400",
    dotColor: "bg-[#ffd966]",
    arrowColor: "text-zinc-300",
    category: "wellbeing",
    emoji: "💚",
  },
  {
    href: "/guide/pinch",
    labelEn: "In a Pinch",
    labelKo: "급할 때",
    descEn: "Unwritten rules, emergency info, and a real neighbor to ask when you're stuck.",
    descKo: "불문율, 비상 상황 대비, 그리고 막막할 때 물어볼 수 있는 이웃이 있어요.",
    items: {
      en: ["Cultural Tips", "Emergency Lockscreen Card", "Ask a Neighbor"],
      ko: ["한국 문화 팁", "긴급 잠금화면 카드", "이웃에게 물어보기"],
    },
    bg: "bg-[#fafaf8]",
    labelColor: "text-[#c9a800]",
    headingColor: "text-zinc-950",
    descColor: "text-zinc-500",
    itemColor: "text-zinc-400",
    dotColor: "bg-zinc-300",
    arrowColor: "text-zinc-300",
    category: "wellbeing",
    emoji: "🆘",
  },

  // ── Discover ──────────────────────────────────────────────────────────
  {
    href: "/guide/explore",
    labelEn: "Explore Seoul",
    labelKo: "서울 탐험",
    descEn: "Understand the food, the neighborhoods, and what each season feels like.",
    descKo: "음식, 동네, 계절별 생활. 서울을 제대로 즐기기 위한 안내예요.",
    items: {
      en: ["Korean Food Decoder", "Neighborhood Guide", "Seasonal Calendar"],
      ko: ["한국 음식 가이드", "동네 안내", "월별 생활 가이드"],
    },
    bg: "bg-white",
    labelColor: "text-[#c9a800]",
    headingColor: "text-zinc-950",
    descColor: "text-zinc-500",
    itemColor: "text-zinc-400",
    dotColor: "bg-[#ffd966]",
    arrowColor: "text-zinc-300",
    category: "discover",
    emoji: "🗺️",
  },
];
