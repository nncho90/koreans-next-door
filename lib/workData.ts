export const CONTRACT_SECTIONS = [
  {
    fieldEn: "Employment Type (고용 형태)",
    fieldKo: "고용 형태",
    descEn: "Regular (정규직) vs. contract (계약직) vs. part-time (시간제). Regular employees get the most protections. Contract employees hired for 2+ years must be converted to regular status.",
    descKo: "정규직 vs 계약직 vs 시간제. 정규직이 가장 강한 보호. 2년 이상 계약직은 정규직 전환 의무.",
    redFlagEn: "If the contract lists you as 'freelance' but you work set hours at a set workplace, you may legally be an employee — with all the associated rights.",
    redFlagKo: "프리랜서로 계약하지만 정해진 시간과 장소에서 일한다면 법적으로 근로자 지위일 수 있습니다.",
  },
  {
    fieldEn: "Probation Period (수습 기간)",
    fieldKo: "수습 기간",
    descEn: "Usually 3 months. During probation, employer can pay up to 10% less than the agreed salary. They can also terminate more easily during this period.",
    descKo: "보통 3개월. 수습 기간 중 급여 최대 10% 삭감 가능. 해고도 더 용이합니다.",
    redFlagEn: "Probation longer than 3 months is unusual and may not be fully legal. Ask HR to clarify.",
    redFlagKo: "3개월 초과 수습 기간은 이례적이며 법적으로 문제가 될 수 있습니다. 인사팀에 확인하세요.",
  },
  {
    fieldEn: "Working Hours (근무 시간)",
    fieldKo: "근무 시간",
    descEn: "Standard work week is 40 hours (5 days × 8 hours). Overtime is anything beyond 40 hrs/week and must be compensated at 150% of regular pay (or compensatory time off).",
    descKo: "주 40시간(하루 8시간 × 5일)이 기준. 초과 근무는 통상임금의 150% 지급 또는 대체 휴무 적용.",
    redFlagEn: "If the contract says '업무가 종료될 때까지' (until the work is done) without specifying hours — this is a red flag for unlimited unpaid overtime.",
    redFlagKo: "\"업무가 종료될 때까지\"처럼 시간이 명시되지 않은 조항은 무급 초과 근무 강요 가능성이 있습니다.",
  },
  {
    fieldEn: "Annual Leave (연차 휴가)",
    fieldKo: "연차 휴가",
    descEn: "After 1 year of employment: 15 days paid leave. Increases to 25 days maximum after 10 years. During the first year: 1 day per month worked.",
    descKo: "1년 이상 근무 시 유급 휴가 15일. 10년 이상 최대 25일. 첫 1년은 매월 1일씩 발생.",
    redFlagEn: "Some employers don't allow you to take your full leave. Unused leave must be paid out unless agreed otherwise.",
    redFlagKo: "일부 고용주는 휴가 사용을 막기도 합니다. 미사용 연차는 합의가 없는 한 금전으로 보상해야 합니다.",
  },
  {
    fieldEn: "Severance Pay (퇴직금)",
    fieldKo: "퇴직금",
    descEn: "After 1 year of continuous employment, you're entitled to severance pay: 1 month's average salary per year worked. Applies even if you resign voluntarily.",
    descKo: "1년 이상 근무 시 퇴직금 지급 의무: 연 1개월 평균 급여. 자발적 퇴직에도 해당.",
    redFlagEn: "Some employers try to structure contracts as multiple short-term contracts to avoid paying severance. If you're effectively the same employee with no real break, you may still be entitled.",
    redFlagKo: "일부 고용주는 퇴직금 회피를 위해 단기 계약을 반복하기도 합니다. 실질적으로 계속 근무했다면 퇴직금 청구가 가능할 수 있습니다.",
  },
  {
    fieldEn: "4 Major Insurances (4대보험)",
    fieldKo: "4대보험",
    descEn: "Korean law requires employer + employee to jointly pay into: National Health Insurance (건강보험), National Pension (국민연금), Employment Insurance (고용보험), Industrial Accident Insurance (산재보험).",
    descKo: "법적으로 사용자와 근로자가 공동 부담: 건강보험, 국민연금, 고용보험, 산재보험.",
    redFlagEn: "If your employer refuses to enroll you in the 4 major insurances, this is illegal. Report to the Labor Standards Office (근로기준법 위반).",
    redFlagKo: "4대보험 가입을 거부하는 사업주는 불법입니다. 근로기준서에 신고하세요.",
  },
];

export const LABOR_RIGHTS = [
  {
    rightEn: "Minimum Wage",
    rightKo: "최저임금",
    emoji: "💵",
    descEn: "As of 2024, Korea's minimum wage is ₩9,860/hour (₩2,060,740/month for full-time). This applies to ALL workers in Korea regardless of visa status or nationality.",
    descKo: "2024년 기준 최저임금 시간당 9,860원 (풀타임 월 2,060,740원). 비자 종류나 국적 무관 모든 근로자에게 적용.",
  },
  {
    rightEn: "Right to Refuse Illegal Orders",
    rightKo: "불법 지시 거부권",
    emoji: "🛑",
    descEn: "You have the right to refuse orders that are illegal (working unpaid hours, discriminatory actions). Document everything in writing if you refuse — emails, texts.",
    descKo: "불법 지시(무급 초과 근무, 차별 행위 등) 거부 권리 있음. 거부 시 이메일, 문자 등 서면으로 기록하세요.",
  },
  {
    rightEn: "Maternity / Paternity Leave",
    rightKo: "출산/육아 휴직",
    emoji: "👶",
    descEn: "90 days paid maternity leave, 10 days paid paternity leave. Up to 1 year additional parental leave per parent. Applies to foreigners as well.",
    descKo: "유급 출산휴가 90일, 유급 배우자 출산휴가 10일. 부모 각각 최대 1년 육아휴직 추가 가능. 외국인도 해당.",
  },
  {
    rightEn: "Right to Inspect Your Employment Records",
    rightKo: "근로 기록 열람권",
    emoji: "📋",
    descEn: "You can request your payroll records and labor records at any time. Employers must keep records for 3 years.",
    descKo: "언제든지 급여 및 근로 기록 열람 요청 가능. 사용자는 3년간 기록 보관 의무.",
  },
  {
    rightEn: "Reporting Workplace Violations",
    rightKo: "노동법 위반 신고",
    emoji: "📞",
    descEn: "Call the Ministry of Employment and Labor (고용노동부) at 1350 (free, some English). You can also visit any Labor Standards Office (근로기준서). Anonymous reports are accepted.",
    descKo: "고용노동부 전화 1350 (무료, 영어 가능). 근로기준서 방문 또는 익명 신고도 가능.",
  },
];

export const WORKPLACE_CULTURE = [
  {
    emoji: "📊",
    titleEn: "Hierarchy (직급) is Real",
    titleKo: "직급 문화",
    descEn: "Korean workplaces have strict hierarchies. Your title (사원 → 대리 → 과장 → 차장 → 부장 → 임원) matters. Address seniors by title, not first name. Never speak informally to a superior without invitation.",
    descKo: "한국 직장은 수직적 문화가 강합니다. 직급(사원→대리→과장→차장→부장→임원)이 중요. 상사에게는 직함으로 호칭. 초대 없이는 반말 금지.",
  },
  {
    emoji: "🍻",
    titleEn: "회식 (Hoesik) — Work Dinners",
    titleKo: "회식 문화",
    descEn: "After-work team dinners are common and sometimes semi-mandatory. Declining repeatedly can affect relationships. You don't have to drink alcohol but staying for the meal is appreciated. Usually involves Korean BBQ, soju, and multiple rounds.",
    descKo: "야근 후 회식은 흔하고 때로 반강제적입니다. 반복 거절은 관계에 영향을 줄 수 있습니다. 음주는 안 해도 되지만 자리는 지키는 게 좋음. 보통 삼겹살+소주+2차/3차.",
  },
  {
    emoji: "⏰",
    titleEn: "Being Last to Leave",
    titleKo: "퇴근 문화",
    descEn: "In some traditional workplaces, leaving before your boss — even if your work is done — is frowned upon. This is changing in newer, more international companies. Read your workplace culture carefully.",
    descKo: "일부 전통적인 직장에서는 상사보다 먼저 퇴근하는 것을 눈치없게 볼 수 있습니다. 스타트업이나 외국계 기업은 다를 수 있음.",
  },
  {
    emoji: "💬",
    titleEn: "Indirect Communication",
    titleKo: "간접적 소통",
    descEn: "Direct 'no' is uncommon. '한번 해볼게요' (I'll try) often means it won't happen. '어렵겠는데요' (That seems difficult) means no. Learn to read between the lines.",
    descKo: "직접적인 '아니오'는 드물습니다. '한번 해볼게요'는 안 된다는 뜻일 수 있고, '어렵겠는데요'는 거절 표현입니다. 행간 읽기 중요.",
  },
  {
    emoji: "🎂",
    titleEn: "Gift-giving & Respect",
    titleKo: "선물과 예의",
    descEn: "Small gifts for important occasions (holidays, returning from travel, promotion) are appreciated. Receiving a gift: accept with two hands or right hand with left supporting. Don't open gifts immediately in front of the giver.",
    descKo: "명절, 귀국, 승진 등 기념일에 작은 선물이 환영받습니다. 받을 때는 두 손으로 또는 오른손+왼손 받침. 바로 앞에서 포장을 뜯지 않는 것이 예의.",
  },
];

export const JOB_RESOURCES = [
  {
    category: "Teaching English",
    categoryKo: "영어 강사",
    emoji: "🍎",
    resources: [
      { name: "EPIK (English Program in Korea)", descEn: "Government program placing English teachers in public schools. Great benefits: furnished apartment, health insurance, pension, flight reimbursement. Apply through your home country's EPIK recruiter.", descKo: "공립학교 원어민 영어보조교사 프로그램. 숙소 제공, 건강보험, 연금, 항공비 지원. 본국 EPIK 리크루터를 통해 지원." },
      { name: "Hagwon (학원) positions", descEn: "Private English academies. Higher pay potential but more variable quality. Research thoroughly before signing. Look up reviews on Dave's ESL Cafe and expat Facebook groups.", descKo: "사립 영어 학원. 급여 가능성 높으나 편차 큼. 계약 전 Dave's ESL Cafe와 외국인 페이스북 그룹에서 꼭 후기 확인." },
      { name: "University positions (E-1)", descEn: "Less teaching hours, higher prestige. Usually require a Master's degree minimum. Salaries range from ₩2M-4M/month.", descKo: "수업 시간 적고 안정적. 보통 석사 이상 요구. 월급 200만~400만원 수준." },
    ],
  },
  {
    category: "Corporate / Professional",
    categoryKo: "기업/전문직",
    emoji: "💼",
    resources: [
      { name: "LinkedIn Korea", descEn: "Most effective for professional jobs in Seoul. Many multinational companies hire through LinkedIn. Use Korean location filter.", descKo: "서울 전문직 취업에 가장 효과적. 다국적 기업 채용 활발. 한국 지역 필터 사용." },
      { name: "Saramin (사람인) / JobKorea", descEn: "Korea's biggest job boards. Korean-language, but many international company listings. Good for those with Korean language skills.", descKo: "국내 최대 구인구직 사이트. 한국어 중심이지만 외국계 기업 공고 많음. 한국어 가능자에게 적합." },
      { name: "Korea4Expats / Facebook Groups", descEn: "Expat-focused job boards. Lower-tech but community-vetted. Good for ESL, hospitality, translation, and creative roles.", descKo: "외국인 중심 채용 게시판. 덜 체계적이나 커뮤니티 검증됨. 어학, 서비스, 번역, 창작직 많음." },
    ],
  },
  {
    category: "Freelancing / Remote",
    categoryKo: "프리랜서/원격",
    emoji: "💻",
    resources: [
      { name: "Working remotely for a foreign company", descEn: "If you work remotely for a non-Korean company on a non-work visa, this is a legal gray area. Many people do it; few get caught. But technically, you should have a work visa or be on a tourist visa re-entering Korea frequently.", descKo: "비취업 비자로 외국 회사 원격 근무는 법적 회색지대. 많이 하지만 공식적으로는 취업 비자 또는 관광 비자 재입국 방식이 더 명확." },
      { name: "Starting a business as a foreigner", descEn: "You need a D-9 (corporate investment) or F-class visa to legally run a business. Minimum investment requirements apply. Consult a Korean 세무사 (tax accountant) before proceeding.", descKo: "외국인 사업 운영은 D-9(기업투자) 또는 F계열 비자 필요. 최소 투자 금액 요건 있음. 진행 전 한국 세무사 상담 권장." },
    ],
  },
];
