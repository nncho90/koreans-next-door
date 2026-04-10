export type BuildingShape =
  | "namsan"
  | "skyscraper"
  | "office"
  | "government"
  | "hospital"
  | "hanok"
  | "pagoda"
  | "subway"
  | "gate"
  | "bookshop"
  | "convenience"
  | "document-office";

export interface BuildingDims {
  w: number;
  h: number;
}

export const DIMS: Record<BuildingShape, BuildingDims> = {
  namsan: { w: 90, h: 200 },
  skyscraper: { w: 55, h: 250 },
  office: { w: 70, h: 162 },
  government: { w: 112, h: 132 },
  hospital: { w: 96, h: 142 },
  hanok: { w: 112, h: 100 },
  pagoda: { w: 85, h: 188 },
  subway: { w: 92, h: 118 },
  gate: { w: 126, h: 132 },
  bookshop: { w: 70, h: 92 },
  convenience: { w: 76, h: 84 },
  "document-office": { w: 86, h: 114 },
};

export interface BuildingConfig {
  id: string;
  href: string;
  labelEn: string;
  labelKo: string;
  descEn: string;
  emoji: string;
  shape: BuildingShape;
  /** horizontal center as % of scene width */
  xPct: number;
  /** parallax depth: 0 = foreground (moves most), 1 = far background (barely moves) */
  depth: number;
}

export const BUILDINGS: BuildingConfig[] = [
  {
    id: "pagoda",
    href: "/guide/mental-health",
    labelEn: "Mental Health",
    labelKo: "마음 건강",
    descEn: "English-speaking therapists, culture shock guides, and support communities.",
    emoji: "💚",
    shape: "pagoda",
    xPct: 5,
    depth: 0.7,
  },
  {
    id: "hanok",
    href: "/guide/housing",
    labelEn: "Housing",
    labelKo: "집 구하기",
    descEn: "Jeonse, wolse, lease red flags — navigate Seoul's rental market safely.",
    emoji: "🔑",
    shape: "hanok",
    xPct: 13,
    depth: 0.6,
  },
  {
    id: "namsan",
    href: "/guide/settle",
    labelEn: "Settle In",
    labelKo: "정착하기",
    descEn: "First week checklist: ARC registration, bank account, phone, transit card.",
    emoji: "🏠",
    shape: "namsan",
    xPct: 21,
    depth: 0.3,
  },
  {
    id: "hospital",
    href: "/guide/health",
    labelEn: "Healthcare",
    labelKo: "의료 안내",
    descEn: "English-speaking doctors and how Korea's clinic system actually works.",
    emoji: "🏥",
    shape: "hospital",
    xPct: 30,
    depth: 0.6,
  },
  {
    id: "office",
    href: "/guide/work",
    labelEn: "Working in Korea",
    labelKo: "일하기",
    descEn: "Employment contracts, labor rights, and workplace culture.",
    emoji: "💼",
    shape: "office",
    xPct: 38,
    depth: 0.5,
  },
  {
    id: "subway",
    href: "/guide/pinch",
    labelEn: "In a Pinch",
    labelKo: "급할 때",
    descEn: "Emergency numbers, unwritten rules, and a real neighbor to call.",
    emoji: "🆘",
    shape: "subway",
    xPct: 45,
    depth: 0.7,
  },
  {
    id: "skyscraper",
    href: "/guide/money",
    labelEn: "Money & Banking",
    labelKo: "금융",
    descEn: "Open a bank account, transfer money home, file taxes, and more.",
    emoji: "💰",
    shape: "skyscraper",
    xPct: 52,
    depth: 0.2,
  },
  {
    id: "document-office",
    href: "/tools/forms",
    labelEn: "Form Decoder",
    labelKo: "서류 해독기",
    descEn: "Korean bureaucratic forms decoded and explained in plain English.",
    emoji: "📝",
    shape: "document-office",
    xPct: 60,
    depth: 0.6,
  },
  {
    id: "bookshop",
    href: "/tools/phrasebook",
    labelEn: "Phrasebook",
    labelKo: "한국어 회화",
    descEn: "200+ phrases for situations that actually happen. Tap to show your phone.",
    emoji: "📖",
    shape: "bookshop",
    xPct: 68,
    depth: 0.7,
  },
  {
    id: "government",
    href: "/guide/visa",
    labelEn: "Visa & Immigration",
    labelKo: "비자 & 체류",
    descEn: "Find your visa type, navigate ARC application, and immigration office tips.",
    emoji: "📋",
    shape: "government",
    xPct: 77,
    depth: 0.5,
  },
  {
    id: "gate",
    href: "/guide/explore",
    labelEn: "Explore Seoul",
    labelKo: "서울 탐험",
    descEn: "The best food, neighborhoods, and what each season feels like.",
    emoji: "🗺️",
    shape: "gate",
    xPct: 86,
    depth: 0.3,
  },
  {
    id: "convenience",
    href: "/guide/daily",
    labelEn: "Daily Life",
    labelKo: "일상생활",
    descEn: "Recycling rules, delivery apps, phone plans, and getting around Seoul.",
    emoji: "☀️",
    shape: "convenience",
    xPct: 94,
    depth: 0.7,
  },
];
