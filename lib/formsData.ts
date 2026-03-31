export interface FormField {
  id: string;
  koreanLabel: string;
  englishLabel: string;
  fieldType: "text" | "checkbox" | "date" | "number" | "select" | "signature";
  whatToWriteEn: string;
  whatToWriteKo: string;
  exampleValue?: string;
  tip?: string;
  tipKo?: string;
  required: boolean;
}

export interface KoreanForm {
  id: string;
  nameEn: string;
  nameKo: string;
  purposeEn: string;
  purposeKo: string;
  emoji: string;
  usedAtEn: string;
  usedAtKo: string;
  fields: FormField[];
  tipsEn: string[];
  tipsKo: string[];
}

export const FORMS: KoreanForm[] = [
  {
    id: "hospital-registration",
    nameEn: "Hospital Registration Form",
    nameKo: "진료 신청서",
    purposeEn: "Fill out when registering at a hospital or clinic for the first time",
    purposeKo: "처음 병원/의원 방문 시 작성",
    emoji: "🏥",
    usedAtEn: "Any hospital, clinic, or dental office in Korea",
    usedAtKo: "모든 병원, 의원, 치과 등",
    fields: [
      {
        id: "name",
        koreanLabel: "성명",
        englishLabel: "Full Name",
        fieldType: "text",
        whatToWriteEn: "Your full legal name as on your passport",
        whatToWriteKo: "여권에 기재된 성명",
        exampleValue: "HONG GILDONG",
        required: true,
      },
      {
        id: "dob",
        koreanLabel: "생년월일",
        englishLabel: "Date of Birth",
        fieldType: "date",
        whatToWriteEn: "Write: YYYY-MM-DD (e.g., 1990-05-15)",
        whatToWriteKo: "생년월일: YYYY-MM-DD 형식",
        exampleValue: "1990-05-15",
        required: true,
      },
      {
        id: "gender",
        koreanLabel: "성별",
        englishLabel: "Gender",
        fieldType: "select",
        whatToWriteEn: "남 = Male, 여 = Female",
        whatToWriteKo: "남 = 남성, 여 = 여성",
        exampleValue: "남 (Male)",
        required: true,
      },
      {
        id: "id-number",
        koreanLabel: "주민등록번호 / 외국인등록번호",
        englishLabel: "ID / ARC Number",
        fieldType: "text",
        whatToWriteEn:
          "Write your ARC number (외국인등록번호). If you don't have one, write your passport number.",
        whatToWriteKo: "외국인등록번호 기재. 없으면 여권번호 기재.",
        exampleValue: "Passport: A12345678",
        required: true,
        tip: "The ARC number is on the front of your green ARC card — it looks like: 123456-1234567",
        tipKo: "외국인등록번호는 외국인등록증 앞면에 있습니다.",
      },
      {
        id: "phone",
        koreanLabel: "연락처 / 전화번호",
        englishLabel: "Phone Number",
        fieldType: "text",
        whatToWriteEn: "Your Korean mobile number (010-XXXX-XXXX)",
        whatToWriteKo: "한국 휴대폰 번호 (010-XXXX-XXXX)",
        exampleValue: "010-1234-5678",
        required: true,
      },
      {
        id: "address",
        koreanLabel: "주소",
        englishLabel: "Address",
        fieldType: "text",
        whatToWriteEn:
          "Your Korean address (the one on your ARC or lease contract). You can write it in English letters.",
        whatToWriteKo: "한국 거주 주소 (ARC 또는 임대차계약서의 주소).",
        exampleValue: "서울시 마포구 홍대로 1길 5, 101호",
        required: true,
      },
      {
        id: "insurance",
        koreanLabel: "보험 종류",
        englishLabel: "Insurance Type",
        fieldType: "select",
        whatToWriteEn:
          "건강보험 = National Health Insurance (NHIS), 의료급여 = Medical Aid, 비급여 = No insurance (full cost). Most foreigners with ARC should have 건강보험.",
        whatToWriteKo: "건강보험: 국민건강보험, 의료급여: 저소득층, 비급여: 보험 없음.",
        exampleValue: "건강보험",
        required: true,
        tip: "If you're unsure, you likely have 건강보험. Your employer should have enrolled you.",
        tipKo: "보험이 있다면 보통 건강보험입니다. 고용주가 가입했을 것입니다.",
      },
      {
        id: "symptoms",
        koreanLabel: "증상 / 내원 사유",
        englishLabel: "Symptoms / Reason for Visit",
        fieldType: "text",
        whatToWriteEn:
          "Describe your symptoms in Korean or English. It's okay to write in English — they can usually find someone to help translate.",
        whatToWriteKo:
          "증상을 한국어 또는 영어로 기재. 영어 기재 시 통역 요청 가능.",
        exampleValue: "두통 (headache), 발열 (fever)",
        required: false,
      },
      {
        id: "allergies",
        koreanLabel: "알레르기 여부",
        englishLabel: "Allergies",
        fieldType: "text",
        whatToWriteEn:
          "List any drug allergies. Write '없음' (none) if you have none. Very important for prescriptions!",
        whatToWriteKo: "약물 알레르기 기재. 없으면 '없음'. 처방전에 매우 중요!",
        exampleValue: "페니실린 (penicillin) / 없음 (none)",
        required: false,
        tip: "Always be specific about drug allergies. '없음' means none.",
        tipKo: "약물 알레르기는 정확히 기재하세요. '없음'은 없다는 의미입니다.",
      },
      {
        id: "signature",
        koreanLabel: "서명",
        englishLabel: "Signature",
        fieldType: "signature",
        whatToWriteEn: "Your signature (any style is fine)",
        whatToWriteKo: "서명 (형식 자유)",
        required: true,
      },
    ],
    tipsEn: [
      "Bring your ARC and health insurance card (건강보험증) together",
      "The receptionist will likely have a simplified form — ask '외국인용 있어요?' (Is there a form for foreigners?)",
      "For first visits, arrive 15 minutes early to fill out paperwork",
    ],
    tipsKo: [
      "ARC와 건강보험증 함께 지참",
      "접수처에 '외국인용 있어요?'라고 물어보세요",
      "첫 방문 시 서류 작성 위해 15분 일찍 도착",
    ],
  },
  {
    id: "arc-application",
    nameEn: "ARC Application Form",
    nameKo: "외국인등록 신청서",
    purposeEn: "Apply for your Alien Registration Card at the immigration office",
    purposeKo: "출입국 사무소에서 외국인등록증 신청 시 작성",
    emoji: "📋",
    usedAtEn: "Immigration offices (출입국·외국인청)",
    usedAtKo: "출입국·외국인청",
    fields: [
      {
        id: "name-kor",
        koreanLabel: "성명 (한글)",
        englishLabel: "Name in Korean (optional)",
        fieldType: "text",
        whatToWriteEn:
          "Your name in Korean characters if you have one. Leave blank if not.",
        whatToWriteKo: "한국어 이름이 있으면 기재. 없으면 공란.",
        exampleValue: "홍길동 (optional)",
        required: false,
      },
      {
        id: "name-eng",
        koreanLabel: "성명 (영문)",
        englishLabel: "Name in English",
        fieldType: "text",
        whatToWriteEn:
          "Your full legal name as on your passport, in CAPITAL LETTERS",
        whatToWriteKo: "여권의 영문 성명 (대문자)",
        exampleValue: "HONG GILDONG",
        required: true,
      },
      {
        id: "nationality",
        koreanLabel: "국적",
        englishLabel: "Nationality",
        fieldType: "text",
        whatToWriteEn:
          "Your country of citizenship as it appears on your passport",
        whatToWriteKo: "여권에 기재된 국적",
        exampleValue: "미국 (American) / 영국 (British)",
        required: true,
      },
      {
        id: "passport-no",
        koreanLabel: "여권번호",
        englishLabel: "Passport Number",
        fieldType: "text",
        whatToWriteEn:
          "The number on the biographical page of your passport",
        whatToWriteKo: "여권 인적사항 페이지의 여권번호",
        exampleValue: "A12345678",
        required: true,
      },
      {
        id: "passport-expiry",
        koreanLabel: "여권만료일",
        englishLabel: "Passport Expiry Date",
        fieldType: "date",
        whatToWriteEn: "YYYY-MM-DD format",
        whatToWriteKo: "YYYY-MM-DD 형식",
        exampleValue: "2028-12-31",
        required: true,
      },
      {
        id: "entry-date",
        koreanLabel: "입국일자",
        englishLabel: "Entry Date",
        fieldType: "date",
        whatToWriteEn:
          "The date you entered Korea on your current visa. Check your passport entry stamp.",
        whatToWriteKo: "현재 비자로 입국한 날짜. 여권 입국 도장 확인.",
        exampleValue: "2024-03-01",
        required: true,
      },
      {
        id: "visa-type",
        koreanLabel: "체류자격",
        englishLabel: "Visa Type",
        fieldType: "select",
        whatToWriteEn:
          "Your visa type code (D-2, E-2, F-4, etc.). This is printed on your visa sticker in your passport.",
        whatToWriteKo:
          "비자 종류 코드 (D-2, E-2, F-4 등). 여권의 비자 스티커에 인쇄됨.",
        exampleValue: "E-2",
        required: true,
      },
      {
        id: "address-korea",
        koreanLabel: "국내 체류지",
        englishLabel: "Address in Korea",
        fieldType: "text",
        whatToWriteEn:
          "Your full Korean address. Format: 시/도 → 시/군/구 → 동/읍/면 → 번지/호",
        whatToWriteKo:
          "한국 거주 주소. 형식: 시/도 → 시/군/구 → 동/읍/면 → 번지/호",
        exampleValue: "서울시 마포구 홍대로 1길 5, 101호",
        required: true,
        tip: "Your address must match your lease contract or visa sponsor letter.",
        tipKo: "주소는 임대차계약서 또는 비자 초청 서류와 일치해야 합니다.",
      },
      {
        id: "employer-school",
        koreanLabel: "직장명/학교명",
        englishLabel: "Employer/School Name",
        fieldType: "text",
        whatToWriteEn:
          "Name of your employer or school in Korea (whoever sponsored your visa)",
        whatToWriteKo: "한국 고용주 또는 학교명 (비자 스폰서)",
        exampleValue: "ABC Language Academy / Seoul National University",
        required: true,
      },
      {
        id: "phone-korea",
        koreanLabel: "연락처",
        englishLabel: "Korean Phone Number",
        fieldType: "text",
        whatToWriteEn: "Your Korean mobile number (010-XXXX-XXXX)",
        whatToWriteKo: "한국 휴대폰 번호",
        exampleValue: "010-1234-5678",
        required: true,
      },
      {
        id: "photo",
        koreanLabel: "사진",
        englishLabel: "Passport Photo",
        fieldType: "text",
        whatToWriteEn:
          "Attach 1 passport-size photo (3.5cm × 4.5cm). White background, taken within 6 months.",
        whatToWriteKo:
          "여권 사진 1매 (3.5×4.5cm). 흰 배경, 6개월 이내 촬영본.",
        required: true,
        tip: "Photos are available at any convenience store photo booth for 3,000-5,000 won.",
        tipKo: "편의점 사진 촬영기에서 3,000~5,000원에 촬영 가능.",
      },
    ],
    tipsEn: [
      "Book your appointment at hikorea.go.kr before going",
      "Bring originals AND photocopies of all documents",
      "The fee is 30,000 won — bring exact cash or card",
      "Processing takes 2-3 weeks. You'll get a text when ready.",
    ],
    tipsKo: [
      "사전에 hikorea.go.kr에서 예약",
      "모든 서류 원본 + 복사본 지참",
      "수수료 3만원 — 현금 또는 카드 준비",
      "처리 기간 2-3주. 완료 시 문자 알림.",
    ],
  },
  {
    id: "bank-account",
    nameEn: "Bank Account Application",
    nameKo: "통장 개설 신청서",
    purposeEn: "Open a bank account at a Korean bank",
    purposeKo: "한국 은행에서 계좌 개설 시 작성",
    emoji: "🏦",
    usedAtEn: "Any Korean bank branch",
    usedAtKo: "모든 은행 지점",
    fields: [
      {
        id: "name",
        koreanLabel: "성명",
        englishLabel: "Full Name",
        fieldType: "text",
        whatToWriteEn: "Your full name as on your passport",
        whatToWriteKo: "여권에 기재된 성명",
        exampleValue: "HONG GILDONG",
        required: true,
      },
      {
        id: "arc-number",
        koreanLabel: "외국인등록번호",
        englishLabel: "ARC Number",
        fieldType: "text",
        whatToWriteEn:
          "Your 13-digit ARC number from your alien registration card. If no ARC, write your passport number.",
        whatToWriteKo:
          "외국인등록증의 13자리 번호. ARC 없으면 여권번호 기재.",
        exampleValue: "123456-1234567",
        required: true,
        tip: "Some banks accept passport number for new arrivals without ARC. Ask the teller.",
        tipKo:
          "일부 은행은 ARC 없는 신규 입국자의 여권번호도 수락합니다. 직원에게 문의.",
      },
      {
        id: "phone",
        koreanLabel: "휴대폰번호",
        englishLabel: "Mobile Phone Number",
        fieldType: "text",
        whatToWriteEn:
          "Your Korean mobile number (required for OTP verification)",
        whatToWriteKo: "한국 휴대폰 번호 (OTP 인증 필요)",
        exampleValue: "010-1234-5678",
        required: true,
      },
      {
        id: "email",
        koreanLabel: "이메일",
        englishLabel: "Email Address",
        fieldType: "text",
        whatToWriteEn: "Your email address (for bank notifications)",
        whatToWriteKo: "이메일 주소 (알림 수신용)",
        exampleValue: "yourname@email.com",
        required: false,
      },
      {
        id: "address",
        koreanLabel: "주소",
        englishLabel: "Address",
        fieldType: "text",
        whatToWriteEn: "Your Korean residential address",
        whatToWriteKo: "한국 거주 주소",
        exampleValue: "서울시 마포구 홍대로 1길 5",
        required: true,
      },
      {
        id: "account-type",
        koreanLabel: "예금종류",
        englishLabel: "Account Type",
        fieldType: "select",
        whatToWriteEn:
          "보통예금 = Regular savings account (most common). 정기예금 = Fixed-term deposit.",
        whatToWriteKo:
          "보통예금: 일반 통장 (가장 일반적). 정기예금: 정기 예금.",
        exampleValue: "보통예금",
        required: true,
      },
      {
        id: "purpose",
        koreanLabel: "거래목적",
        englishLabel: "Purpose of Account",
        fieldType: "select",
        whatToWriteEn:
          "급여 = Salary account. 생활비 = Living expenses. 투자 = Investment. Most foreigners say '생활비'.",
        whatToWriteKo:
          "급여: 월급 수령용. 생활비: 생활 자금. 투자: 투자용. 대부분 '생활비' 선택.",
        exampleValue: "생활비",
        required: true,
      },
      {
        id: "internet-banking",
        koreanLabel: "인터넷뱅킹 신청여부",
        englishLabel: "Apply for Internet Banking?",
        fieldType: "checkbox",
        whatToWriteEn:
          "Check YES. This enables online transfers and the bank app.",
        whatToWriteKo: "예 체크. 온라인 이체와 앱 사용 가능.",
        exampleValue: "예 (Yes)",
        required: false,
        tip: "Always check YES for internet banking. You'll need it for Coupang, Baemin, and everything else.",
        tipKo:
          "인터넷뱅킹은 꼭 신청하세요. 쿠팡, 배달의민족 등 모든 서비스에 필요합니다.",
      },
      {
        id: "card-type",
        koreanLabel: "카드 신청여부 / 종류",
        englishLabel: "Apply for Card? Type?",
        fieldType: "select",
        whatToWriteEn:
          "체크카드 = Debit card (easier for foreigners to get). 신용카드 = Credit card (requires credit history).",
        whatToWriteKo:
          "체크카드: 직불카드 (외국인에게 쉬움). 신용카드: 신용 이력 필요.",
        exampleValue: "체크카드 (Debit card)",
        required: false,
        tip: "As a new foreigner, you'll likely only be approved for a 체크카드 (debit card). That's fine for most needs.",
        tipKo:
          "신규 외국인은 대부분 체크카드만 발급됩니다. 일상 사용에는 충분합니다.",
      },
      {
        id: "signature",
        koreanLabel: "서명",
        englishLabel: "Signature",
        fieldType: "signature",
        whatToWriteEn:
          "Sign consistently — this becomes your official bank signature",
        whatToWriteKo: "일관되게 서명 — 공식 은행 서명이 됩니다",
        required: true,
      },
    ],
    tipsEn: [
      "Visit in the morning on a weekday — less waiting time",
      "Bring your ARC and passport together",
      "Have your phone ready — they'll send a verification code during the process",
      "Hana Bank in Itaewon has dedicated English-speaking staff",
    ],
    tipsKo: [
      "평일 오전 방문 — 대기 시간 적음",
      "ARC와 여권 함께 지참",
      "인증 코드 발송되니 휴대폰 준비",
      "하나은행 이태원 지점에 영어 가능 전담 직원 있음",
    ],
  },
  {
    id: "address-change",
    nameEn: "Address Change Notification",
    nameKo: "전입신고서",
    purposeEn: "Register a new address after moving to a new home",
    purposeKo: "이사 후 새 주소 등록 시 작성",
    emoji: "🏠",
    usedAtEn: "Your local 주민센터 (community center), within 14 days of moving",
    usedAtKo: "관할 주민센터, 이사 후 14일 이내",
    fields: [
      {
        id: "new-address",
        koreanLabel: "전입지 주소",
        englishLabel: "New Address",
        fieldType: "text",
        whatToWriteEn: "Your complete new address in Korean format",
        whatToWriteKo: "새 주소 전체 (한국 형식)",
        exampleValue: "서울시 마포구 홍대로 1길 5, 101호",
        required: true,
      },
      {
        id: "move-date",
        koreanLabel: "전입일자",
        englishLabel: "Move-in Date",
        fieldType: "date",
        whatToWriteEn: "The date you actually moved in (YYYY-MM-DD)",
        whatToWriteKo: "실제 이사 날짜 (YYYY-MM-DD)",
        exampleValue: "2024-04-01",
        required: true,
      },
      {
        id: "name",
        koreanLabel: "신고인 성명",
        englishLabel: "Reporter's Name",
        fieldType: "text",
        whatToWriteEn: "Your full name",
        whatToWriteKo: "성명 전체",
        required: true,
      },
      {
        id: "arc-number",
        koreanLabel: "외국인등록번호",
        englishLabel: "ARC Number",
        fieldType: "text",
        whatToWriteEn: "Your ARC number",
        whatToWriteKo: "외국인등록번호",
        required: true,
      },
      {
        id: "phone",
        koreanLabel: "전화번호",
        englishLabel: "Phone Number",
        fieldType: "text",
        whatToWriteEn: "Your contact number",
        whatToWriteKo: "연락처",
        required: true,
      },
      {
        id: "landlord-name",
        koreanLabel: "건물 소유자 / 임대인",
        englishLabel: "Building Owner / Landlord Name",
        fieldType: "text",
        whatToWriteEn: "Your landlord's name (from the lease contract)",
        whatToWriteKo: "임대인 이름 (임대차계약서 참조)",
        required: false,
      },
      {
        id: "relationship",
        koreanLabel: "건물주와의 관계",
        englishLabel: "Relationship to Owner",
        fieldType: "select",
        whatToWriteEn:
          "임차인 = Tenant (most likely). 소유자 = Owner.",
        whatToWriteKo: "임차인: 세입자 (대부분). 소유자: 건물 소유자.",
        exampleValue: "임차인 (Tenant)",
        required: false,
      },
    ],
    tipsEn: [
      "Do this within 14 days of moving — it's a legal requirement for foreigners",
      "This also activates your 확정일자 (priority date) which protects your deposit",
      "Bring your ARC, lease contract, and passport",
      "This can now also be done online via gov.kr with ARC + phone verification",
    ],
    tipsKo: [
      "이사 후 14일 이내 신고 — 외국인 법적 의무",
      "확정일자(보증금 보호 우선권) 설정됨",
      "ARC, 임대차계약서, 여권 지참",
      "현재 gov.kr에서 ARC+휴대폰 인증으로 온라인 신고 가능",
    ],
  },
  {
    id: "phone-application",
    nameEn: "Mobile Phone Plan Application",
    nameKo: "휴대폰 개통 신청서",
    purposeEn: "Sign up for a Korean mobile phone plan",
    purposeKo: "한국 통신 서비스 가입 시 작성",
    emoji: "📱",
    usedAtEn: "Any carrier store (SKT, KT, LG U+) or MVNO shop",
    usedAtKo: "이동통신사 대리점 (SKT, KT, LG U+) 또는 알뜰폰",
    fields: [
      {
        id: "name",
        koreanLabel: "성명",
        englishLabel: "Name",
        fieldType: "text",
        whatToWriteEn: "Your full name as on your ARC or passport",
        whatToWriteKo: "ARC 또는 여권의 성명",
        required: true,
      },
      {
        id: "arc-number",
        koreanLabel: "외국인등록번호",
        englishLabel: "ARC Number / Passport Number",
        fieldType: "text",
        whatToWriteEn:
          "ARC number if you have one. Passport number if not (some carriers accept this for pre-paid).",
        whatToWriteKo:
          "ARC 있으면 외국인등록번호, 없으면 여권번호 (일부 선불 상품).",
        required: true,
      },
      {
        id: "plan-type",
        koreanLabel: "요금제",
        englishLabel: "Plan Type",
        fieldType: "select",
        whatToWriteEn:
          "The name of the plan you've chosen. Show the staff your preferred plan details.",
        whatToWriteKo: "선택한 요금제 이름. 원하는 요금제를 직원에게 보여주세요.",
        required: true,
      },
      {
        id: "device",
        koreanLabel: "단말기",
        englishLabel: "Device",
        fieldType: "select",
        whatToWriteEn:
          "자급제 = Bring your own device (BYOD). 약정 = Device with contract plan.",
        whatToWriteKo:
          "자급제: 본인 기기 사용. 약정: 계획과 함께 기기 구입.",
        exampleValue: "자급제 (BYOD)",
        required: true,
        tip: "If you already have an unlocked phone, choose 자급제 (BYOD) and just get a SIM card.",
        tipKo: "언락된 기기가 있다면 자급제로 유심만 개통하세요.",
      },
      {
        id: "contract-length",
        koreanLabel: "약정기간",
        englishLabel: "Contract Length",
        fieldType: "select",
        whatToWriteEn:
          "약정없음 = No contract (free to cancel anytime). 12개월 = 12-month contract. 24개월 = 24-month.",
        whatToWriteKo:
          "약정없음: 약정 없음 (언제든 해지 가능). 12개월/24개월 약정.",
        exampleValue: "약정없음 (No contract)",
        required: true,
        tip: "For foreigners, 약정없음 (no contract) is usually best — you don't know how long you'll stay.",
        tipKo: "외국인은 보통 약정없음이 유리합니다. 체류 기간이 불확실하기 때문.",
      },
      {
        id: "phone-number",
        koreanLabel: "희망 번호",
        englishLabel: "Preferred Number",
        fieldType: "text",
        whatToWriteEn:
          "Write if you have a specific preference, otherwise leave blank.",
        whatToWriteKo: "원하는 번호가 있으면 기재, 없으면 공란.",
        required: false,
      },
      {
        id: "payment-method",
        koreanLabel: "납부 방법",
        englishLabel: "Payment Method",
        fieldType: "select",
        whatToWriteEn:
          "자동이체 = Automatic bank transfer. 카드 = Credit card payment.",
        whatToWriteKo: "자동이체: 은행 자동 이체. 카드: 카드 납부.",
        required: true,
      },
    ],
    tipsEn: [
      "You need a Korean bank account for automatic payment — get your bank account first",
      "Pre-paid SIMs (선불 유심) don't require a form — just buy at a convenience store or airport",
      "Ask: '외국인도 가입할 수 있어요?' (Can foreigners sign up too?) to check their policy",
    ],
    tipsKo: [
      "자동이체를 위해 한국 은행 계좌 필요 — 먼저 계좌 개설",
      "선불 유심은 신청서 불필요 — 편의점이나 공항에서 구입 가능",
      "'외국인도 가입할 수 있어요?'라고 물어 정책 확인",
    ],
  },
];
