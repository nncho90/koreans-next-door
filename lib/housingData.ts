// lib/housingData.ts

export const HOUSING_TYPES = [
  {
    id: "jeonse",
    nameEn: "Jeonse (전세)",
    nameKo: "전세",
    descEn:
      "Pay a large lump-sum deposit (usually 50–80% of property value). No monthly rent. You get the full deposit back when you leave.",
    descKo:
      "목돈을 보증금으로 맡기고 월세 없이 거주. 계약 종료 시 보증금 전액 반환.",
    proEn: [
      "No monthly rent payments",
      "Deposit returned in full",
      "Popular for 1-2 year contracts",
    ],
    proKo: ["월세 없음", "보증금 전액 반환", "1-2년 계약에 인기"],
    conEn: [
      "Requires large upfront capital",
      "Risk if landlord can't return deposit",
      "Less common recently as rates rise",
    ],
    conKo: [
      "큰 초기 자금 필요",
      "집주인 부채 시 반환 위험",
      "금리 상승으로 감소 추세",
    ],
    depositRange: "KRW 100M–500M+",
    monthlyRange: "₩0 / month",
    icon: "🏦",
  },
  {
    id: "wolse",
    nameEn: "Wolse (월세)",
    nameKo: "월세",
    descEn:
      "Pay a smaller security deposit plus monthly rent. More flexible, easier to enter. Most common for foreigners.",
    descKo:
      "소액 보증금과 함께 매달 월세 납부. 외국인에게 가장 일반적인 방식.",
    proEn: [
      "Lower initial investment",
      "More flexibility",
      "Easier for foreigners to get",
    ],
    proKo: ["초기 비용 적음", "유연한 거주", "외국인 계약 수월"],
    conEn: [
      "Monthly payments add up",
      "Deposit not invested",
      "Less negotiating power",
    ],
    conKo: ["월세 누적 부담", "보증금 수익 없음", "협상력 약함"],
    depositRange: "KRW 1M–50M",
    monthlyRange: "KRW 400K–2M+/month",
    icon: "🏠",
  },
  {
    id: "short-term",
    nameEn: "Short-term / Officetel",
    nameKo: "단기 / 오피스텔",
    descEn:
      "Furnished short-term rentals or officetels (studio apartments). Higher monthly cost but fully furnished and flexible.",
    descKo:
      "가구 포함 단기 임대 또는 오피스텔. 비용은 높지만 유연하고 편리.",
    proEn: [
      "Fully furnished",
      "Short lease terms available",
      "No setup hassle",
    ],
    proKo: ["가구 완비", "단기 계약 가능", "입주 즉시 편리"],
    conEn: [
      "Most expensive per month",
      "Smaller spaces",
      "Less authentic neighborhood feel",
    ],
    conKo: ["월 비용 높음", "좁은 공간", "주거 환경 덜 현지적"],
    depositRange: "KRW 500K–10M",
    monthlyRange: "KRW 700K–3M+/month",
    icon: "🏢",
  },
];

export const NEIGHBORHOODS = [
  {
    id: "hongdae",
    name: "Hongdae (홍대)",
    nameKo: "홍대",
    emoji: "🎨",
    avgRentKRW: 900000,
    vibe: "Artsy, young, always buzzing",
    vibeKo: "예술적이고 젊고 활기찬",
    pros: [
      "Tons of cafes & restaurants",
      "Great nightlife",
      "Young international crowd",
      "Lots of English-friendly spots",
    ],
    prosKo: [
      "카페와 식당 풍부",
      "활발한 나이트라이프",
      "젊은 외국인 많음",
      "영어 통하는 곳 많음",
    ],
    cons: ["Noisy, especially weekends", "Pricier than average", "Crowded"],
    consKo: ["주말 소음 심함", "평균보다 비쌈", "혼잡"],
    stations: ["Hongdae (2, Airport, Gyeongui)", "Hapjeong (2, 6)"],
    foreignFriendly: true,
    bestFor: [
      "Young professionals",
      "Artists",
      "English teachers",
      "First-time Seoul residents",
    ],
    bestForKo: ["젊은 직장인", "예술가", "영어 강사", "처음 서울 온 외국인"],
  },
  {
    id: "itaewon",
    name: "Itaewon (이태원)",
    nameKo: "이태원",
    emoji: "🌍",
    avgRentKRW: 1100000,
    vibe: "International hub, diverse food, Western comforts",
    vibeKo: "국제적, 다양한 음식, 서양식 생활",
    pros: [
      "Most foreigner-friendly neighborhood",
      "International grocery stores",
      "Diverse restaurant scene",
      "Many English speakers",
    ],
    prosKo: [
      "외국인 가장 친화적",
      "국제 식재료 마트",
      "다양한 식당",
      "영어 구사자 많음",
    ],
    cons: [
      "Can feel like a bubble",
      "More expensive",
      "Some areas feel touristy",
    ],
    consKo: ["버블 느낌 있음", "비쌈", "관광지 느낌"],
    stations: ["Itaewon (6)", "Noksapyeong (6)"],
    foreignFriendly: true,
    bestFor: [
      "Families",
      "Those who want Western comforts",
      "Diplomats",
      "Corporate expats",
    ],
    bestForKo: ["가족", "서양 편의 원하는 분", "외교관", "기업 주재원"],
  },
  {
    id: "mapo",
    name: "Mapo / Sinchon (마포/신촌)",
    nameKo: "마포/신촌",
    emoji: "📚",
    avgRentKRW: 750000,
    vibe: "University area, studious by day, lively by night",
    vibeKo: "대학가, 낮엔 조용 밤엔 활기",
    pros: [
      "Affordable rent",
      "Great food scene",
      "Near Hongdae",
      "Many young Koreans",
    ],
    prosKo: ["저렴한 월세", "맛집 많음", "홍대 가까움", "젊은 한국인 많음"],
    cons: [
      "Fewer English speakers than Itaewon/Hongdae",
      "Can be rowdy on weekends",
    ],
    consKo: ["영어 구사자 적음", "주말 시끄러울 수 있음"],
    stations: ["Sinchon (2)", "Mapo (5)", "Hapjeong (2, 6)"],
    foreignFriendly: true,
    bestFor: [
      "Students",
      "Language learners wanting Korean immersion",
      "Budget-conscious",
    ],
    bestForKo: ["학생", "한국어 학습자", "저예산"],
  },
  {
    id: "gangnam",
    name: "Gangnam (강남)",
    nameKo: "강남",
    emoji: "💎",
    avgRentKRW: 1500000,
    vibe: "Upscale, polished, business-oriented",
    vibeKo: "고급스럽고 비즈니스 중심",
    pros: [
      "High-end amenities",
      "English-friendly banks & services",
      "Great transport links",
      "Safe",
    ],
    prosKo: [
      "고급 편의시설",
      "영어 가능 금융/서비스",
      "교통 편리",
      "안전",
    ],
    cons: [
      "Very expensive",
      "Less character than older neighborhoods",
      "Far from most expat social scenes",
    ],
    consKo: [
      "매우 비쌈",
      "올드 동네보다 개성 없음",
      "외국인 소셜 씬과 거리 있음",
    ],
    stations: ["Gangnam (2)", "Sinnonhyeon (9)", "Samsung (2)"],
    foreignFriendly: true,
    bestFor: [
      "Corporate expats",
      "Families with school-age kids",
      "Those with larger budgets",
    ],
    bestForKo: ["기업 주재원", "자녀 있는 가족", "예산 여유 있는 분"],
  },
  {
    id: "yongsan",
    name: "Yongsan / Hannam (용산/한남)",
    nameKo: "용산/한남",
    emoji: "🛍️",
    avgRentKRW: 1300000,
    vibe: "Trendy, upscale but cooler than Gangnam",
    vibeKo: "트렌디하고 고급스럽지만 강남보다 쿨함",
    pros: [
      "Near Itaewon",
      "Great parks and Han River access",
      "Trendy dining",
      "International schools nearby",
    ],
    prosKo: [
      "이태원 근처",
      "공원과 한강 가까움",
      "트렌디한 식당",
      "국제학교 근처",
    ],
    cons: ["Expensive", "Some areas under redevelopment"],
    consKo: ["비쌈", "일부 지역 재개발 중"],
    stations: [
      "Itaewon (6)",
      "Hannam (경의중앙)",
      "Noksapyeong (6)",
    ],
    foreignFriendly: true,
    bestFor: [
      "Families",
      "Those who want trendy but quieter than Itaewon",
      "Art & design lovers",
    ],
    bestForKo: [
      "가족",
      "이태원보다 조용한 트렌디 원하는 분",
      "예술/디자인 관심자",
    ],
  },
  {
    id: "jongno",
    name: "Jongno / Insadong (종로/인사동)",
    nameKo: "종로/인사동",
    emoji: "🏯",
    avgRentKRW: 800000,
    vibe: "Historic, cultural, traditional Korea vibe",
    vibeKo: "역사적이고 문화적인 전통 한국 느낌",
    pros: [
      "Rich in culture and history",
      "Affordable",
      "Unique neighborhood character",
      "Central location",
    ],
    prosKo: [
      "문화/역사 풍부",
      "저렴함",
      "독특한 동네 개성",
      "중심가",
    ],
    cons: [
      "Fewer English speakers",
      "Quieter nightlife",
      "Older building stock",
    ],
    consKo: ["영어 구사자 적음", "나이트라이프 부족", "노후 건물 많음"],
    stations: ["Jongno 3-ga (1, 3, 5)", "Anguk (3)"],
    foreignFriendly: false,
    bestFor: [
      "Culture enthusiasts",
      "Those seeking authentic Korean life",
      "Older expats",
    ],
    bestForKo: [
      "문화 애호가",
      "진짜 한국 생활 원하는 분",
      "중장년층 외국인",
    ],
  },
];

export const LEASE_SECTIONS = [
  {
    id: "parties",
    koreanLabel: "임대인 / 임차인",
    fieldEn: "Landlord (임대인) / Tenant (임차인)",
    explanationEn:
      "The landlord is '임대인' and you (the tenant) are '임차인'. Check that the landlord's name matches the property registration document (등기부등본).",
    explanationKo:
      "집주인은 임대인, 세입자(당신)는 임차인입니다. 집주인 이름이 등기부등본과 일치하는지 확인하세요.",
    redFlag:
      "If the name on the contract doesn't match the property registration, the real owner could evict you.",
  },
  {
    id: "property",
    koreanLabel: "부동산 표시",
    fieldEn: "Property Description (부동산 표시)",
    explanationEn:
      "The address and property details. Cross-reference with the property registration document to ensure the landlord actually owns what they're renting to you.",
    explanationKo:
      "주소와 부동산 정보입니다. 등기부등본으로 집주인이 실제 소유자인지 확인하세요.",
    redFlag:
      "Ask for a copy of the 등기부등본 (property registration) before signing anything.",
  },
  {
    id: "deposit",
    koreanLabel: "보증금",
    fieldEn: "Deposit Amount (보증금)",
    explanationEn:
      "The security deposit amount. For wolse this is typically 1M–50M KRW. For jeonse this can be hundreds of millions. Get it in writing exactly.",
    explanationKo:
      "보증금 금액입니다. 월세는 보통 100만~5000만원, 전세는 수억원까지 될 수 있습니다.",
    redFlag:
      "If the property has a mortgage, your deposit may be at risk. Check 근저당 (mortgage) on the registration document.",
  },
  {
    id: "monthly-rent",
    koreanLabel: "월세",
    fieldEn: "Monthly Rent (월세)",
    explanationEn:
      "How much you pay each month and by what date. Paying late can result in penalties or even contract termination.",
    explanationKo:
      "매달 내는 월세와 납부일입니다. 연체 시 위약금이나 계약 해지의 원인이 될 수 있습니다.",
    redFlag:
      "Confirm payment method. Most landlords want bank transfer, not cash.",
  },
  {
    id: "term",
    koreanLabel: "임대차 기간",
    fieldEn: "Lease Term (임대차 기간)",
    explanationEn:
      "Start and end date of your tenancy. By Korean law, the minimum protected lease term is 2 years — even if you sign for 1 year, you can legally stay for 2.",
    explanationKo:
      "계약 시작일과 종료일입니다. 한국법상 최소 2년 거주권이 보장됩니다 (묵시적 갱신 포함).",
    redFlag:
      "Make sure the start date is before your visa requires an address.",
  },
  {
    id: "maintenance",
    koreanLabel: "관리비",
    fieldEn: "Maintenance Fee (관리비)",
    explanationEn:
      "Monthly building maintenance fee — covers elevator, cleaning, parking, security. This is on top of rent. Can range from 50,000–200,000 KRW/month.",
    explanationKo:
      "매달 납부하는 관리비입니다. 엘리베이터, 청소, 주차, 경비 포함. 월 5만~20만원 수준.",
    redFlag:
      "Always ask: '관리비가 얼마예요?' before signing. This is often omitted from the headline price.",
  },
  {
    id: "special-terms",
    koreanLabel: "특약사항",
    fieldEn: "Special Terms (특약사항)",
    explanationEn:
      "This is the most important section. Any custom terms go here — repairs, pets, subletting, who pays for appliance breakdowns. Read every line carefully.",
    explanationKo:
      "가장 중요한 항목입니다. 수리, 반려동물, 전대, 가전 고장 책임 등 특별 조항이 여기 들어갑니다.",
    redFlag:
      "If something is agreed verbally, insist it goes in the 특약사항 in writing. Verbal agreements are hard to enforce.",
  },
];

export const RED_FLAGS = [
  {
    icon: "🚩",
    title: "Landlord is heavily in debt",
    titleKo: "집주인 부채 과다",
    description:
      "If the property has a large mortgage (근저당) that exceeds your deposit, you may not get your money back. Always request the 등기부등본 (property registration document) from the real estate agent.",
    descriptionKo:
      "부동산에 근저당이 보증금보다 많으면 보증금을 못 받을 수 있습니다. 계약 전 반드시 등기부등본을 확인하세요.",
    whatToDo:
      "Get the 등기부등본 from the 부동산 and check '근저당권 설정' (mortgage). If it's more than 60-70% of property value, walk away.",
    whatToDoKo:
      "부동산에서 등기부등본을 발급받아 근저당권 설정 금액을 확인하세요. 주택가격의 60-70% 초과 시 계약하지 마세요.",
  },
  {
    icon: "🚩",
    title: "Landlord who isn't on the property registration",
    titleKo: "등기부등본과 다른 집주인",
    description:
      "If the person renting to you is not listed as the owner on the 등기부등본, there may be fraud involved. The real owner can kick you out even if you paid the fake landlord.",
    descriptionKo:
      "등기부등본에 등록된 소유자가 계약 당사자와 다르면 사기일 수 있습니다. 실 소유자가 퇴거 요청도 가능합니다.",
    whatToDo:
      "Always verify the landlord's ID matches the 등기부등본. If subletting, get written permission from the actual owner.",
    whatToDoKo:
      "집주인 신분증과 등기부등본의 이름이 일치하는지 확인하세요. 전대차인 경우 실소유자의 동의서를 받으세요.",
  },
  {
    icon: "🚩",
    title: "Pressure to decide immediately",
    titleKo: "즉각 결정 압박",
    description:
      "Legitimate landlords don't demand you sign today. High-pressure tactics are a red flag for scams or hiding something about the property.",
    descriptionKo:
      "정상적인 집주인은 즉각 계약을 강요하지 않습니다. 압박이 심하면 사기이거나 숨기는 것이 있을 수 있습니다.",
    whatToDo:
      "Walk away from any agent or landlord who pressures you. Take 24-48 hours minimum before signing any contract.",
    whatToDoKo:
      "압박하는 부동산이나 집주인은 피하세요. 계약 전 최소 24-48시간 생각하는 시간을 가지세요.",
  },
  {
    icon: "🚩",
    title: "Unusually cheap rent in a popular area",
    titleKo: "인기 지역의 비정상적으로 싼 월세",
    description:
      "If it seems too good to be true, it probably is. Scammers often post fake listings with below-market prices to get deposits before disappearing.",
    descriptionKo:
      "너무 싸 보이면 의심하세요. 사기범들은 시세보다 낮은 가격으로 허위 매물을 올리고 보증금을 받고 잠적합니다.",
    whatToDo:
      "Cross-check prices on Naver Real Estate (네이버 부동산) and Zigbang (직방). If the price is more than 15-20% below average, investigate thoroughly.",
    whatToDoKo:
      "네이버 부동산과 직방에서 시세를 비교하세요. 시세보다 15-20% 이상 저렴하면 꼼꼼히 확인하세요.",
  },
  {
    icon: "🚩",
    title: "No written contract",
    titleKo: "서면 계약서 없음",
    description:
      "In Korea, verbal rental agreements have limited legal protection. Always insist on a written 임대차계약서. If they refuse, leave.",
    descriptionKo:
      "구두 계약은 법적 보호가 약합니다. 반드시 서면 임대차계약서를 요구하세요. 거부하면 그냥 나오세요.",
    whatToDo:
      "Use a licensed real estate agent (공인중개사) who is legally required to provide a written contract and explain the terms.",
    whatToDoKo:
      "공인중개사 사무소를 이용하세요. 공인중개사는 서면 계약서 작성과 설명이 법적 의무입니다.",
  },
];

export const MOVING_CHECKLIST = [
  {
    step: 1,
    category: "Before signing",
    categoryKo: "계약 전",
    task: "Get 등기부등본 (property registration document)",
    taskKo: "등기부등본 발급",
    detail:
      "Ask your 부동산 agent. Costs around 1,000 KRW and verifies the owner and any mortgages.",
  },
  {
    step: 2,
    category: "Before signing",
    categoryKo: "계약 전",
    task: "Verify landlord's ID matches the registration",
    taskKo: "집주인 신분증 확인",
    detail:
      "Ask to see their ID card (주민등록증 or 운전면허증) and confirm the name matches.",
  },
  {
    step: 3,
    category: "Before signing",
    categoryKo: "계약 전",
    task: "Confirm total monthly costs (rent + 관리비)",
    taskKo: "월 총 비용 확인 (월세 + 관리비)",
    detail:
      "Ask: 관리비 포함해서 총 얼마예요? (How much is it all in including maintenance fee?)",
  },
  {
    step: 4,
    category: "Signing day",
    categoryKo: "계약 당일",
    task: "Read ALL sections of the 임대차계약서",
    taskKo: "임대차계약서 전체 읽기",
    detail:
      "Especially the 특약사항 (special terms). Use Google Translate or bring a Korean-speaking friend.",
  },
  {
    step: 5,
    category: "Signing day",
    categoryKo: "계약 당일",
    task: "Get a copy of the signed contract",
    taskKo: "계약서 사본 수령",
    detail: "You are legally entitled to a copy. Never leave without one.",
  },
  {
    step: 6,
    category: "Move-in day",
    categoryKo: "이사 당일",
    task: "Register your address at the local 주민센터",
    taskKo: "주민센터 전입신고",
    detail:
      "This activates the '확정일자' (priority date) which protects your deposit in court if needed.",
  },
  {
    step: 7,
    category: "Move-in day",
    categoryKo: "이사 당일",
    task: "Document existing damage with photos/video",
    taskKo: "기존 파손 사진/영상 기록",
    detail:
      "Send them to your landlord via KakaoTalk to create a timestamp. Prevents disputes when leaving.",
  },
  {
    step: 8,
    category: "Move-in day",
    categoryKo: "이사 당일",
    task: "Check all appliances and facilities",
    taskKo: "모든 가전 및 시설 확인",
    detail:
      "Test water heater, air conditioner, washing machine, oven. Report issues within the first week.",
  },
];

export const BUDONGSAN_PHRASES = [
  {
    situation: "Asking about rent",
    situationKo: "월세 문의",
    korean: "월세로 찾고 있어요",
    romanization: "Wolse-ro chatgo isseoyo",
    english: "I'm looking for a wolse apartment",
  },
  {
    situation: "Asking total cost",
    situationKo: "총 비용 문의",
    korean: "관리비 포함해서 총 얼마예요?",
    romanization: "Gwallibe pohamhaeseo chong eolmaeyo?",
    english: "How much in total including maintenance fee?",
  },
  {
    situation: "Requesting documents",
    situationKo: "서류 요청",
    korean: "등기부등본 보여주세요",
    romanization: "Deunggibuedeungbon boyeojuseyo",
    english: "Please show me the property registration document",
  },
  {
    situation: "Asking about duration",
    situationKo: "계약 기간 문의",
    korean: "계약 기간이 얼마예요?",
    romanization: "Gyeyak gigani eolmaeyo?",
    english: "What is the lease term?",
  },
  {
    situation: "Asking about pets",
    situationKo: "반려동물 문의",
    korean: "반려동물 키울 수 있나요?",
    romanization: "Ballyeodongmul kiwul su innayo?",
    english: "Can I have pets?",
  },
  {
    situation: "Reporting maintenance issue",
    situationKo: "수리 요청",
    korean: "수리가 필요해요",
    romanization: "Suriga piryohaeyo",
    english: "I need a repair",
  },
];
