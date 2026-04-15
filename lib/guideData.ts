import type { Locale } from "@/lib/i18n/types";

export type GuideCategory = "getting-started" | "living-here" | "wellbeing" | "discover";

export interface GuideGroup {
  href: string;
  labelEn: string; labelKo: string; labelJa: string; labelZhCN: string; labelZhTW: string; labelPt: string; labelEs: string;
  descEn: string;  descKo: string;  descJa: string;  descZhCN: string;  descZhTW: string;  descPt: string;  descEs: string;
  items: { en: string[]; ko: string[]; ja: string[]; zhCN: string[]; zhTW: string[]; pt: string[]; es: string[] };
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

export const guideCategories: {
  id: GuideCategory;
  labelEn: string; labelKo: string; labelJa: string; labelZhCN: string; labelZhTW: string; labelPt: string; labelEs: string;
}[] = [
  { id: "getting-started", labelEn: "Getting Started", labelKo: "처음 시작", labelJa: "はじめに", labelZhCN: "入门指南", labelZhTW: "入門指南", labelPt: "Primeiros Passos", labelEs: "Primeros Pasos" },
  { id: "living-here", labelEn: "Living Here", labelKo: "생활하기", labelJa: "生活する", labelZhCN: "在这里生活", labelZhTW: "在這裡生活", labelPt: "Vivendo Aqui", labelEs: "Viviendo Aquí" },
  { id: "wellbeing", labelEn: "Wellbeing", labelKo: "건강 & 안전", labelJa: "健康・安全", labelZhCN: "健康与安全", labelZhTW: "健康與安全", labelPt: "Bem-Estar", labelEs: "Bienestar" },
  { id: "discover", labelEn: "Discover Seoul", labelKo: "서울 탐험", labelJa: "ソウル探訪", labelZhCN: "发现首尔", labelZhTW: "發現首爾", labelPt: "Descobrir Seul", labelEs: "Descubrir Seúl" },
];

export const guideGroups: GuideGroup[] = [
  // ── Getting Started ──────────────────────────────────────────────────
  {
    href: "/guide/settle",
    labelEn: "Settle In",
    labelKo: "정착하기",
    labelJa: "定住する",
    labelZhCN: "安家落户",
    labelZhTW: "安家落戶",
    labelPt: "Instalar-se",
    labelEs: "Establecerse",
    descEn: "The practical first steps: registration, banking, health insurance, and apps.",
    descKo: "외국인등록증, 은행 계좌, 건강보험, 필수 앱 등 정착에 필요한 실질적인 안내예요.",
    descJa: "最初の実用的なステップ：登録、銀行、健康保険、アプリ。",
    descZhCN: "实用的第一步：登记、银行、健康保险和应用程序。",
    descZhTW: "實用的第一步：登記、銀行、健康保險和應用程式。",
    descPt: "Os primeiros passos práticos: registro, banco, seguro saúde e apps.",
    descEs: "Los primeros pasos prácticos: registro, banca, seguro médico y apps.",
    items: {
      en: ["First Week Checklist", "Bureaucracy Wizard", "Seoul Survival Kit"],
      ko: ["첫째 주 체크리스트", "행정 처리 가이드", "서울 생존 키트"],
      ja: ["最初の一週間チェックリスト", "行政手続きガイド", "ソウル・サバイバルキット"],
      zhCN: ["第一周清单", "行政手续向导", "首尔生存指南"],
      zhTW: ["第一週清單", "行政手續向導", "首爾生存指南"],
      pt: ["Lista da Primeira Semana", "Guia Burocrático", "Kit de Sobrevivência em Seul"],
      es: ["Lista de la Primera Semana", "Asistente Burocrático", "Kit de Supervivencia en Seúl"],
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
    labelJa: "ビザ・入管",
    labelZhCN: "签证与移民",
    labelZhTW: "簽證與移民",
    labelPt: "Visto e Imigração",
    labelEs: "Visa e Inmigración",
    descEn: "Find your visa type, understand ARC, and navigate immigration offices without stress.",
    descKo: "비자 종류 찾기, 외국인등록증 신청, 출입국 사무소 방문 가이드.",
    descJa: "ビザの種類を確認し、外国人登録証を理解し、入国管理局をスムーズに利用する。",
    descZhCN: "了解你的签证类型、外国人登录证和出入境手续。",
    descZhTW: "了解你的簽證類型、外國人登錄證和出入境手續。",
    descPt: "Encontre seu tipo de visto, entenda o ARC e navegue pelos escritórios de imigração sem stress.",
    descEs: "Encuentra tu tipo de visa, entiende el ARC y navega por las oficinas de inmigración sin estrés.",
    items: {
      en: ["Visa Wizard", "Visa Type Guide", "Immigration Office Tips"],
      ko: ["비자 찾기", "비자 종류 안내", "출입국 사무소 팁"],
      ja: ["ビザ検索", "ビザタイプガイド", "入国管理局のコツ"],
      zhCN: ["签证向导", "签证类型指南", "出入境事务所技巧"],
      zhTW: ["簽證向導", "簽證類型指南", "出入境事務所技巧"],
      pt: ["Assistente de Visto", "Guia de Tipos de Visto", "Dicas para o Escritório de Imigração"],
      es: ["Asistente de Visa", "Guía de Tipos de Visa", "Consejos para la Oficina de Inmigración"],
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
    labelJa: "住まい",
    labelZhCN: "住房",
    labelZhTW: "住房",
    labelPt: "Moradia",
    labelEs: "Vivienda",
    descEn: "Jeonse, wolse, lease red flags, neighborhood picker, and how to not get scammed.",
    descKo: "전세, 월세, 계약서 주의사항, 동네 추천기 — 안전하게 집 구하기.",
    descJa: "チョンセ・ウォルセ・契約書のリスクポイント・地域選び、詐欺に遭わない方法。",
    descZhCN: "全租、月租、合同红线、选区和避免被骗的方法。",
    descZhTW: "全租、月租、合約紅線、選區和避免被騙的方法。",
    descPt: "Jeonse, wolse, armadilhas em contratos, escolha de bairro e como não ser enganado.",
    descEs: "Jeonse, wolse, señales de alerta en contratos, selector de barrio y cómo no ser estafado.",
    items: {
      en: ["Jeonse vs Wolse", "Neighborhood Picker", "Lease Contract Guide"],
      ko: ["전세 vs 월세", "동네 추천기", "임대차 계약서 안내"],
      ja: ["チョンセ vs ウォルセ", "地域選び", "賃貸契約書ガイド"],
      zhCN: ["全租vs月租", "选区推荐", "租赁合同指南"],
      zhTW: ["全租vs月租", "選區推薦", "租賃合約指南"],
      pt: ["Jeonse vs Wolse", "Seletor de Bairro", "Guia de Contrato de Aluguel"],
      es: ["Jeonse vs Wolse", "Selector de Barrio", "Guía de Contrato de Arrendamiento"],
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
    labelJa: "金融・銀行",
    labelZhCN: "金融与银行",
    labelZhTW: "金融與銀行",
    labelPt: "Dinheiro e Banco",
    labelEs: "Dinero y Banca",
    descEn: "Open a bank account, transfer money home, file taxes, and understand your pension.",
    descKo: "은행 계좌 개설, 해외 송금, 세금 신고, 연금 환급 안내.",
    descJa: "銀行口座の開設、海外送金、納税申告、年金について。",
    descZhCN: "开设银行账户、汇款回国、报税和了解你的养老金。",
    descZhTW: "開設銀行帳戶、匯款回國、報稅和了解你的養老金。",
    descPt: "Abra uma conta bancária, transfira dinheiro para casa, declare impostos e entenda sua pensão.",
    descEs: "Abre una cuenta bancaria, transfiere dinero a casa, declara impuestos y entiende tu pensión.",
    items: {
      en: ["Bank Account Guide", "Transfer Comparison", "Cost of Living Calculator"],
      ko: ["은행 계좌 개설", "해외 송금 비교", "생활비 계산기"],
      ja: ["銀行口座開設ガイド", "送金比較", "生活費計算機"],
      zhCN: ["银行账户指南", "汇款比较", "生活费计算器"],
      zhTW: ["銀行帳戶指南", "匯款比較", "生活費計算機"],
      pt: ["Guia de Conta Bancária", "Comparação de Transferências", "Calculadora de Custo de Vida"],
      es: ["Guía de Cuenta Bancaria", "Comparación de Transferencias", "Calculadora de Costo de Vida"],
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
    labelJa: "日常生活",
    labelZhCN: "日常生活",
    labelZhTW: "日常生活",
    labelPt: "Vida Cotidiana",
    labelEs: "Vida Cotidiana",
    descEn: "Recycling rules, delivery apps, phone plans, utility bills, and getting around.",
    descKo: "분리수거, 배달 앱, 통신 요금제, 공과금, 교통 완벽 정리.",
    descJa: "ゴミ分別のルール、デリバリーアプリ、携帯プラン、公共料金、交通手段。",
    descZhCN: "垃圾分类规定、外卖应用、手机套餐、水电费和出行方式。",
    descZhTW: "垃圾分類規定、外送應用、手機方案、水電費和出行方式。",
    descPt: "Regras de reciclagem, apps de delivery, planos de telefone, contas de serviços e como se locomover.",
    descEs: "Reglas de reciclaje, apps de delivery, planes de teléfono, facturas de servicios y cómo moverse.",
    items: {
      en: ["Recycling Guide", "Phone Plans", "Essential Apps"],
      ko: ["분리수거 가이드", "통신 요금제", "필수 앱 정리"],
      ja: ["ゴミ分別ガイド", "携帯プラン", "必須アプリ"],
      zhCN: ["垃圾分类指南", "手机套餐", "必备应用"],
      zhTW: ["垃圾分類指南", "手機方案", "必備應用"],
      pt: ["Guia de Reciclagem", "Planos de Telefone", "Apps Essenciais"],
      es: ["Guía de Reciclaje", "Planes de Teléfono", "Apps Esenciales"],
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
    labelJa: "韓国で働く",
    labelZhCN: "在韩工作",
    labelZhTW: "在韓工作",
    labelPt: "Trabalhando na Coreia",
    labelEs: "Trabajando en Corea",
    descEn: "Employment contracts, labor rights, workplace culture, and job hunting resources.",
    descKo: "근로 계약서, 노동 권리, 직장 문화, 구직 정보 안내.",
    descJa: "労働契約書、労働権、職場文化、就職活動のリソース。",
    descZhCN: "劳动合同、劳工权益、职场文化和求职资源。",
    descZhTW: "勞動合約、勞工權益、職場文化和求職資源。",
    descPt: "Contratos de trabalho, direitos trabalhistas, cultura do local de trabalho e recursos para encontrar emprego.",
    descEs: "Contratos de trabajo, derechos laborales, cultura laboral y recursos para buscar empleo.",
    items: {
      en: ["Contract Red Flags", "Labor Rights", "Workplace Culture"],
      ko: ["계약서 주의사항", "노동 권리", "직장 문화"],
      ja: ["契約書の注意点", "労働権利", "職場文化"],
      zhCN: ["合同注意事项", "劳工权益", "职场文化"],
      zhTW: ["合約注意事項", "勞工權益", "職場文化"],
      pt: ["Sinais de Alerta no Contrato", "Direitos Trabalhistas", "Cultura do Trabalho"],
      es: ["Señales de Alerta en el Contrato", "Derechos Laborales", "Cultura Laboral"],
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
    labelJa: "医療案内",
    labelZhCN: "医疗指南",
    labelZhTW: "醫療指南",
    labelPt: "Saúde",
    labelEs: "Salud",
    descEn: "Understand Korea's clinic system and find English-speaking doctors near you.",
    descKo: "한국 의료 시스템을 이해하고 영어 가능 병원을 찾아보세요.",
    descJa: "韓国のクリニックシステムを理解し、近くの英語対応の医師を見つける。",
    descZhCN: "了解韩国的诊所体系，找到附近会说英语的医生。",
    descZhTW: "了解韓國的診所體系，找到附近會說英語的醫生。",
    descPt: "Entenda o sistema de clínicas da Coreia e encontre médicos que falam inglês perto de você.",
    descEs: "Entiende el sistema de clínicas de Corea y encuentra médicos que hablan inglés cerca de ti.",
    items: {
      en: ["Clinic Type Guide", "Specialty Finder", "English-Friendly Clinics"],
      ko: ["진료기관 종류 안내", "진료과 찾기", "영어 가능 병원"],
      ja: ["医療機関の種類ガイド", "診療科検索", "英語対応クリニック"],
      zhCN: ["诊所类型指南", "专科查找", "英语友好诊所"],
      zhTW: ["診所類型指南", "專科查找", "英語友好診所"],
      pt: ["Guia de Tipos de Clínica", "Buscador de Especialidades", "Clínicas com Atendimento em Inglês"],
      es: ["Guía de Tipos de Clínica", "Buscador de Especialidades", "Clínicas con Atención en Inglés"],
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
    labelJa: "こころの健康",
    labelZhCN: "心理健康",
    labelZhTW: "心理健康",
    labelPt: "Saúde Mental",
    labelEs: "Salud Mental",
    descEn: "Culture shock, English-speaking therapists, crisis resources, and support groups.",
    descKo: "문화 충격 극복, 영어 가능 상담사, 위기 지원, 커뮤니티 안내.",
    descJa: "カルチャーショック、英語対応のセラピスト、危機サポート、コミュニティ情報。",
    descZhCN: "文化冲击、会英语的心理咨询师、危机资源和支持团体。",
    descZhTW: "文化衝擊、會英語的心理諮詢師、危機資源和支持團體。",
    descPt: "Choque cultural, terapeutas que falam inglês, recursos de crise e grupos de apoio.",
    descEs: "Choque cultural, terapeutas que hablan inglés, recursos de crisis y grupos de apoyo.",
    items: {
      en: ["Culture Shock Guide", "Therapist Directory", "Crisis Resources"],
      ko: ["문화 충격 안내", "상담사 찾기", "위기 지원"],
      ja: ["カルチャーショックガイド", "セラピストディレクトリ", "危機サポート"],
      zhCN: ["文化冲击指南", "咨询师目录", "危机资源"],
      zhTW: ["文化衝擊指南", "諮詢師目錄", "危機資源"],
      pt: ["Guia de Choque Cultural", "Diretório de Terapeutas", "Recursos de Crise"],
      es: ["Guía de Choque Cultural", "Directorio de Terapeutas", "Recursos de Crisis"],
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
    labelJa: "困ったとき",
    labelZhCN: "紧急情况",
    labelZhTW: "緊急情況",
    labelPt: "Em Apuros",
    labelEs: "En Apuros",
    descEn: "Unwritten rules, emergency info, and a real neighbor to ask when you're stuck.",
    descKo: "불문율, 비상 상황 대비, 그리고 막막할 때 물어볼 수 있는 이웃이 있어요.",
    descJa: "暗黙のルール、緊急情報、そして困ったときに聞ける隣人。",
    descZhCN: "不成文的规则、紧急信息，以及遇到困难时可以询问的邻居。",
    descZhTW: "不成文的規則、緊急資訊，以及遇到困難時可以詢問的鄰居。",
    descPt: "Regras não escritas, informações de emergência e um vizinho real para perguntar quando estiver perdido.",
    descEs: "Reglas no escritas, información de emergencia y un vecino real a quien preguntar cuando estés atascado.",
    items: {
      en: ["Cultural Tips", "Emergency Lockscreen Card", "Ask a Neighbor"],
      ko: ["한국 문화 팁", "긴급 잠금화면 카드", "이웃에게 물어보기"],
      ja: ["韓国文化のコツ", "緊急ロック画面カード", "隣人に聞く"],
      zhCN: ["韩国文化技巧", "紧急锁屏卡", "向邻居求助"],
      zhTW: ["韓國文化技巧", "緊急鎖屏卡", "向鄰居求助"],
      pt: ["Dicas Culturais", "Cartão de Bloqueio de Tela de Emergência", "Pergunte a um Vizinho"],
      es: ["Consejos Culturales", "Tarjeta de Pantalla de Bloqueo de Emergencia", "Pregunta a un Vecino"],
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
    labelJa: "ソウル探訪",
    labelZhCN: "探索首尔",
    labelZhTW: "探索首爾",
    labelPt: "Explorar Seul",
    labelEs: "Explorar Seúl",
    descEn: "Understand the food, the neighborhoods, and what each season feels like.",
    descKo: "음식, 동네, 계절별 생활. 서울을 제대로 즐기기 위한 안내예요.",
    descJa: "食べ物、地域、各季節の感じ方を理解する。",
    descZhCN: "了解美食、社区和每个季节的感受。",
    descZhTW: "了解美食、社區和每個季節的感受。",
    descPt: "Entenda a comida, os bairros e como cada estação do ano se sente.",
    descEs: "Entiende la comida, los barrios y cómo se siente cada estación del año.",
    items: {
      en: ["Korean Food Decoder", "Neighborhood Guide", "Seasonal Calendar"],
      ko: ["한국 음식 가이드", "동네 안내", "월별 생활 가이드"],
      ja: ["韓国料理ガイド", "地域案内", "季節カレンダー"],
      zhCN: ["韩国美食解析", "社区指南", "季节日历"],
      zhTW: ["韓國美食解析", "社區指南", "季節日曆"],
      pt: ["Decodificador de Comida Coreana", "Guia de Bairros", "Calendário das Estações"],
      es: ["Decodificador de Comida Coreana", "Guía de Barrios", "Calendario de Temporadas"],
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

export function getGuideLabel(g: GuideGroup, locale: Locale): string {
  switch (locale) {
    case "ko": return g.labelKo;
    case "ja": return g.labelJa;
    case "zh-CN": return g.labelZhCN;
    case "zh-TW": return g.labelZhTW;
    case "pt": return g.labelPt;
    case "es": return g.labelEs;
    default: return g.labelEn;
  }
}

export function getGuideDesc(g: GuideGroup, locale: Locale): string {
  switch (locale) {
    case "ko": return g.descKo;
    case "ja": return g.descJa;
    case "zh-CN": return g.descZhCN;
    case "zh-TW": return g.descZhTW;
    case "pt": return g.descPt;
    case "es": return g.descEs;
    default: return g.descEn;
  }
}

export function getGuideCategoryLabel(
  cat: typeof guideCategories[number],
  locale: Locale
): string {
  switch (locale) {
    case "ko": return cat.labelKo;
    case "ja": return cat.labelJa;
    case "zh-CN": return cat.labelZhCN;
    case "zh-TW": return cat.labelZhTW;
    case "pt": return cat.labelPt;
    case "es": return cat.labelEs;
    default: return cat.labelEn;
  }
}
