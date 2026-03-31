export const BANKS = [
  {
    name: "KEB Hana Bank",
    nameKo: "하나은행",
    foreignerFriendly: 5,
    descEn:
      "Most foreigner-friendly bank in Korea. Has dedicated English-speaking branches and a good English app. Often recommended as first choice.",
    descKo:
      "외국인 서비스 최고. 영어 전담 창구와 우수한 영어 앱 보유. 외국인 첫 번째 선택으로 추천.",
    requiredDocsEn: [
      "Passport",
      "ARC (or entry stamp within 6 months)",
      "Korean phone number",
    ],
    requiredDocsKo: [
      "여권",
      "외국인등록증 (또는 입국 후 6개월 이내)",
      "한국 전화번호",
    ],
    englishApp: true,
    englishBranch: true,
    tips: "Visit the branch near Itaewon or Hongdae for English-speaking staff. Call ahead.",
    tipsKo:
      "이태원이나 홍대 지점 방문 추천. 미리 전화해 영어 가능 직원 확인.",
  },
  {
    name: "Shinhan Bank",
    nameKo: "신한은행",
    foreignerFriendly: 4,
    descEn:
      "Solid option with a decent English app (SOL Bank). Has a dedicated foreigner service team at major branches.",
    descKo:
      "영어 앱(SOL Bank) 제공. 주요 지점에 외국인 전담팀 있음.",
    requiredDocsEn: ["Passport", "ARC", "Korean phone number"],
    requiredDocsKo: ["여권", "외국인등록증", "한국 전화번호"],
    englishApp: true,
    englishBranch: true,
    tips: "SOL Bank app is one of the better English banking apps. Good for online transfers.",
    tipsKo: "SOL Bank 앱이 영어 지원 잘 됨. 온라인 이체 편리.",
  },
  {
    name: "KB Kookmin Bank",
    nameKo: "국민은행 (KB)",
    foreignerFriendly: 3,
    descEn:
      "Largest bank by assets. Widespread ATMs. App (KB Star Banking) has English but interface is complex. Good for convenience.",
    descKo:
      "자산 규모 1위. ATM 많음. 앱(KB 스타뱅킹) 영어 지원하나 복잡함. 접근성 좋음.",
    requiredDocsEn: [
      "Passport",
      "ARC",
      "Korean phone number",
      "Employment or enrollment verification",
    ],
    requiredDocsKo: [
      "여권",
      "외국인등록증",
      "한국 전화번호",
      "재직/재학 증명",
    ],
    englishApp: true,
    englishBranch: false,
    tips: "Has the most ATMs nationwide. Some branches are strict about requiring ARC before 6 months.",
    tipsKo:
      "전국 ATM 가장 많음. 일부 지점은 6개월 미만 체류 시 계좌 개설 거부하기도 함.",
  },
  {
    name: "Woori Bank",
    nameKo: "우리은행",
    foreignerFriendly: 3,
    descEn:
      "Reliable, no-frills option. Less English support than Hana or Shinhan but widely available.",
    descKo:
      "신뢰할 수 있는 일반 은행. 하나, 신한보다 영어 지원은 부족하나 접근성 좋음.",
    requiredDocsEn: ["Passport", "ARC"],
    requiredDocsKo: ["여권", "외국인등록증"],
    englishApp: false,
    englishBranch: false,
    tips: "If you have a Korean friend, bring them to help translate. Easier experience.",
    tipsKo: "한국어 가능한 지인과 함께 방문하면 더 수월합니다.",
  },
  {
    name: "Kakao Bank",
    nameKo: "카카오뱅크",
    foreignerFriendly: 4,
    descEn:
      "Online-only bank. App is clean and simple. Easiest to set up if you already have a Korean phone number and ARC. No branch visits needed.",
    descKo:
      "인터넷 전문은행. 앱이 깔끔하고 단순. 한국 전화번호와 ARC 있으면 비대면 개설 가능. 지점 방문 불필요.",
    requiredDocsEn: ["ARC", "Korean phone number", "Face verification via app"],
    requiredDocsKo: ["외국인등록증", "한국 전화번호", "앱 본인 확인"],
    englishApp: false,
    englishBranch: false,
    tips: "App is Korean only. Best for those with some Korean reading ability. Great for easy transfers within Korea.",
    tipsKo:
      "앱은 한국어 전용. 한국어 읽기 가능자에게 적합. 국내 이체 편리.",
  },
];

export const TRANSFER_SERVICES = [
  {
    name: "Wise",
    logo: "🌐",
    feeEn: "~0.5-1% of transfer amount",
    feeKo: "이체 금액의 약 0.5-1%",
    speedEn: "1-2 business days",
    speedKo: "영업일 기준 1-2일",
    limitEn: "Up to $1M/transfer depending on verification",
    limitKo: "본인 확인에 따라 최대 100만 달러",
    bestForEn: "Regular transfers, best mid-market rates",
    bestForKo: "정기 송금, 최적의 환율",
    ratingEn: "⭐⭐⭐⭐⭐ Best overall",
    ratingKo: "⭐⭐⭐⭐⭐ 종합 최고",
    noteEn:
      "Uses real exchange rate (mid-market), transparent fees. Highly recommended.",
    noteKo: "실제 환율(중간 환율) 사용, 투명한 수수료. 강력 추천.",
    recommended: true,
  },
  {
    name: "Sentbe",
    logo: "💱",
    feeEn: "Flat fee KRW 3,000–5,000 per transfer",
    feeKo: "건당 3,000~5,000원 고정 수수료",
    speedEn: "Same day or 1 business day",
    speedKo: "당일 또는 영업일 기준 1일",
    limitEn: "Up to KRW 3M/day without extra verification",
    limitKo: "추가 본인 확인 없이 하루 300만원까지",
    bestForEn: "Sending money from Korea, fast small transfers",
    bestForKo: "한국에서 해외 송금, 소액 빠른 이체",
    ratingEn: "⭐⭐⭐⭐ Best for Korea-based senders",
    ratingKo: "⭐⭐⭐⭐ 한국 거주자 해외 송금 최고",
    noteEn:
      "Popular with foreigners in Korea. Low flat fee makes it excellent for small amounts.",
    noteKo:
      "한국 거주 외국인에게 인기. 소액 이체 시 낮은 고정 수수료가 유리.",
    recommended: false,
  },
  {
    name: "Remitly",
    logo: "💸",
    feeEn: "Variable, often $0 with economy option (slower)",
    feeKo: "다양, 이코노미 옵션으로 종종 무료 (느림)",
    speedEn: "Express: minutes. Economy: 3-5 days",
    speedKo: "익스프레스: 수분. 이코노미: 3-5일",
    limitEn: "Up to $2,999/day for new users",
    limitKo: "신규 사용자 하루 $2,999까지",
    bestForEn: "Sending to developing countries, large amounts",
    bestForKo: "개발도상국 송금, 거액 이체",
    ratingEn: "⭐⭐⭐⭐ Good for specific corridors",
    ratingKo: "⭐⭐⭐⭐ 특정 국가 송금에 유리",
    noteEn:
      "Strong for sending to Southeast Asia, South America. Less competitive for US/Europe.",
    noteKo:
      "동남아, 남미 송금에 강함. 미국/유럽은 경쟁력 낮음.",
    recommended: false,
  },
  {
    name: "Korean bank international transfer",
    logo: "🏦",
    feeEn: "KRW 5,000–30,000 per transfer",
    feeKo: "건당 5,000~30,000원",
    speedEn: "1-3 business days",
    speedKo: "영업일 기준 1-3일",
    limitEn: "Varies by bank, generally high",
    limitKo: "은행별 상이, 대체로 높음",
    bestForEn: "Large amounts, when you need official bank documentation",
    bestForKo: "거액 이체, 공식 은행 서류 필요 시",
    ratingEn: "⭐⭐⭐ Higher fees but reliable",
    ratingKo: "⭐⭐⭐ 수수료 높으나 신뢰성 있음",
    noteEn:
      "Use for tax or official purposes. Otherwise, Wise is usually cheaper.",
    noteKo:
      "세금 신고나 공식 목적일 때 사용. 그 외에는 Wise가 보통 저렴.",
    recommended: false,
  },
];

export const COST_OF_LIVING = {
  categories: [
    {
      id: "rent",
      labelEn: "Rent (월세)",
      labelKo: "월세",
      minKRW: 400000,
      maxKRW: 3000000,
      avgKRW: 850000,
      unit: "/month",
    },
    {
      id: "food",
      labelEn: "Food",
      labelKo: "식비",
      minKRW: 200000,
      maxKRW: 800000,
      avgKRW: 400000,
      unit: "/month",
    },
    {
      id: "transport",
      labelEn: "Transport",
      labelKo: "교통",
      minKRW: 50000,
      maxKRW: 200000,
      avgKRW: 100000,
      unit: "/month",
    },
    {
      id: "phone",
      labelEn: "Phone plan",
      labelKo: "통신비",
      minKRW: 15000,
      maxKRW: 80000,
      avgKRW: 40000,
      unit: "/month",
    },
    {
      id: "utilities",
      labelEn: "Utilities",
      labelKo: "공과금",
      minKRW: 50000,
      maxKRW: 200000,
      avgKRW: 100000,
      unit: "/month",
    },
    {
      id: "entertainment",
      labelEn: "Entertainment & Social",
      labelKo: "여가/사교",
      minKRW: 100000,
      maxKRW: 500000,
      avgKRW: 200000,
      unit: "/month",
    },
    {
      id: "healthcare",
      labelEn: "Healthcare",
      labelKo: "의료비",
      minKRW: 20000,
      maxKRW: 200000,
      avgKRW: 50000,
      unit: "/month",
    },
  ],
};

export const TAX_INFO = [
  {
    topicEn: "Who pays income tax?",
    topicKo: "소득세 납부 대상",
    contentEn:
      "If you work in Korea, you pay Korean income tax regardless of nationality. Tax is progressive: 6% (up to ₩14M) to 45% (over ₩1B). Most employees have taxes withheld at source.",
    contentKo:
      "국적과 무관하게 한국에서 일하면 소득세 납부 의무가 있습니다. 세율은 누진제(6%~45%). 대부분 원천징수 방식.",
  },
  {
    topicEn: "Year-end tax settlement (연말정산)",
    topicKo: "연말정산",
    contentEn:
      "Korean employers do a year-end settlement in January. Like a tax refund process — if too much was withheld, you get money back. Your employer handles this.",
    contentKo:
      "1월에 고용주가 연말정산을 진행합니다. 과다 납부 시 환급받는 절차로, 고용주가 처리합니다.",
  },
  {
    topicEn: "Dual taxation",
    topicKo: "이중과세",
    contentEn:
      "Korea has tax treaties with 90+ countries to prevent double taxation. If you pay tax in Korea, you may get credit or exemption in your home country. Check your home country's rules.",
    contentKo:
      "한국은 90여 개국과 이중과세 방지 협약을 맺고 있습니다. 한국에서 납부한 세금은 본국에서 세액공제 또는 면제 가능. 본국 규정 확인 필요.",
  },
  {
    topicEn: "Freelancers & self-employed",
    topicKo: "프리랜서/자영업",
    contentEn:
      "File a comprehensive income tax return (종합소득세 신고) by May 31 each year. You may need an accountant (세무사) to help, especially for first-timers.",
    contentKo:
      "매년 5월 31일까지 종합소득세 신고. 처음이라면 세무사 도움 권장.",
  },
];

export const PENSION_INFO = {
  whatEn:
    "Korea's National Pension Service (NPS / 국민연금) is mandatory for most employees in Korea. A portion of your salary is deducted monthly (4.5% employee / 4.5% employer = 9% total).",
  whatKo:
    "국민연금은 대부분의 한국 근로자에게 의무입니다. 급여의 4.5% 본인 부담, 4.5% 사업주 부담 (총 9%).",
  refundEn:
    "When you leave Korea, you can claim a lump-sum refund of all your contributions if your home country has a social security agreement with Korea, OR if you are leaving permanently. Apply at the NPS office or online (nps.or.kr/english).",
  refundKo:
    "한국을 떠날 때 본국이 한국과 사회보장 협정을 맺었거나 영구 귀국 시 납부한 전액을 일시금으로 환급받을 수 있습니다. NPS 사무소 또는 nps.or.kr에서 신청.",
  exemptionsEn:
    "Citizens of countries with Social Security Totalization Agreements (US, UK, Germany, Canada, Australia, etc.) may be exempt from Korean pension contributions. Check with your employer's HR.",
  exemptionsKo:
    "미국, 영국, 독일, 캐나다, 호주 등 한국과 사회보장 협정 체결국 국민은 국민연금 납부 면제 가능. 인사팀에 확인 요망.",
};
