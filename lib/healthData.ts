// lib/healthData.ts

export interface ClinicPin {
  name: string;
  nameKo: string;
  specialty: string;
  englishLevel: "Full" | "Partial";
  address: string;
  phone: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  notes?: string;
}

export interface Specialty {
  ko: string;
  en: string;
  icon: string;
  goodocParam: string;
}

export const SPECIALTIES: Specialty[] = [
  { ko: "내과", en: "Internal Medicine", icon: "🩺", goodocParam: "내과" },
  { ko: "피부과", en: "Dermatology", icon: "✨", goodocParam: "피부과" },
  { ko: "치과", en: "Dental", icon: "🦷", goodocParam: "치과" },
  { ko: "산부인과", en: "OBGYN", icon: "🌸", goodocParam: "산부인과" },
  { ko: "이비인후과", en: "ENT", icon: "👂", goodocParam: "이비인후과" },
  { ko: "정신의학과", en: "Psychiatry", icon: "🧠", goodocParam: "정신의학과" },
  { ko: "정형외과", en: "Orthopedics", icon: "🦴", goodocParam: "정형외과" },
  { ko: "안과", en: "Ophthalmology", icon: "👁️", goodocParam: "안과" },
  { ko: "소아청소년과", en: "Pediatrics", icon: "👶", goodocParam: "소아청소년과" },
  { ko: "한의과", en: "Korean Medicine", icon: "🌿", goodocParam: "한의과" },
];

export const CLINIC_TIERS = [
  {
    tier: 1,
    ko: "의원",
    romanized: "Uiwon",
    en: "Clinic",
    description: "Your default first stop. Walk-ins always welcome. One or two doctors, no beds.",
    examples: "Cold, skin issue, prescription refill, checkup",
    nhis: "70–80% covered",
    tip: "Always start here — cheapest and fastest.",
    color: "bg-zinc-800",
  },
  {
    tier: 2,
    ko: "병원",
    romanized: "Byeongwon",
    en: "Hospital",
    description: "30+ beds, multiple departments. Some procedures and overnight stays.",
    examples: "Endoscopy, minor surgery, fracture treatment",
    nhis: "60–70% covered",
    tip: "Go when your 의원 refers you.",
    color: "bg-zinc-800",
  },
  {
    tier: 3,
    ko: "종합병원",
    romanized: "Jonghap Byeongwon",
    en: "General Hospital",
    description: "100+ beds, ICU, CT/MRI on-site. Needs referral for NHIS coverage.",
    examples: "Complex surgery, childbirth, cancer treatment",
    nhis: "40–60% covered (need referral)",
    tip: "Get a 진료의뢰서 (referral slip) first or you pay 100%.",
    color: "bg-zinc-800",
  },
  {
    tier: 4,
    ko: "대학병원",
    romanized: "Daehak Byeongwon",
    en: "University Hospital",
    description: "500+ beds. The country's top specialists. Referral required.",
    examples: "Rare diseases, major organ surgery, specialized oncology",
    nhis: "40–60% covered (0% without referral)",
    tip: "Only go here when referred — or in a true emergency.",
    color: "bg-zinc-800",
  },
];

export const ENGLISH_CLINICS: ClinicPin[] = [
  // Yongsan / Itaewon
  {
    name: "International Clinic",
    nameKo: "인터내셔널 클리닉",
    specialty: "General Practice",
    englishLevel: "Full",
    address: "Yongsan-gu, Seoul",
    phone: "02-790-0857",
    lat: 37.5340,
    lng: 126.9947,
    googleMapsUrl: "https://maps.google.com/?q=International+Clinic+Yongsan+Seoul",
    notes: "Walk-ins welcome. English, Chinese.",
  },
  {
    name: "Seoul Foreign Clinic",
    nameKo: "서울 외국인 클리닉",
    specialty: "General Practice + Psychiatry",
    englishLevel: "Full",
    address: "Itaewon-dong, Yongsan-gu, Seoul",
    phone: "02-796-1871",
    lat: 37.5348,
    lng: 126.9928,
    googleMapsUrl: "https://maps.google.com/?q=Seoul+Foreign+Clinic+Itaewon",
    notes: "Doctors with international experience.",
  },
  // Jongno / Jung-gu
  {
    name: "Seoul National University Hospital — International Healthcare Center",
    nameKo: "서울대학교병원 국제진료센터",
    specialty: "All Specialties",
    englishLevel: "Full",
    address: "101 Daehak-ro, Jongno-gu, Seoul",
    phone: "02-2072-0505",
    lat: 37.5799,
    lng: 126.9990,
    googleMapsUrl: "https://maps.google.com/?q=Seoul+National+University+Hospital",
    notes: "English 24hr emergency line. Also: Chinese, Japanese, Mongolian, Russian.",
  },
  // Seodaemun
  {
    name: "Severance Hospital — International Health Care Center",
    nameKo: "세브란스병원 국제진료센터",
    specialty: "All Specialties",
    englishLevel: "Full",
    address: "50-1 Yonsei-ro, Seodaemun-gu, Seoul",
    phone: "02-2228-5810",
    lat: 37.5623,
    lng: 126.9409,
    googleMapsUrl: "https://maps.google.com/?q=Severance+Hospital+Seoul",
    notes: "Voted top hospital in Seoul.",
  },
  // Songpa / Jamsil
  {
    name: "Asan Medical Center — International Healthcare Center",
    nameKo: "서울아산병원 국제진료센터",
    specialty: "All Specialties",
    englishLevel: "Full",
    address: "88 Olympic-ro 43-gil, Songpa-gu, Seoul",
    phone: "02-3010-5001",
    lat: 37.5269,
    lng: 127.1085,
    googleMapsUrl: "https://maps.google.com/?q=Asan+Medical+Center+Seoul",
    notes: "Multilingual coordinators.",
  },
  // Gangnam / Seocho
  {
    name: "Samsung Medical Center — International Health Care",
    nameKo: "삼성서울병원 국제진료센터",
    specialty: "All Specialties",
    englishLevel: "Full",
    address: "81 Irwon-ro, Gangnam-gu, Seoul",
    phone: "02-3410-0200",
    lat: 37.4881,
    lng: 127.0856,
    googleMapsUrl: "https://maps.google.com/?q=Samsung+Medical+Center+Seoul",
    notes: "Coordinates referrals across 800+ specialists.",
  },
  {
    name: "Trinity Women's Clinic",
    nameKo: "트리니티 여성의원",
    specialty: "OBGYN",
    englishLevel: "Full",
    address: "Seocho-gu, Seoul",
    phone: "02-598-2828",
    lat: 37.4837,
    lng: 127.0324,
    googleMapsUrl: "https://maps.google.com/?q=Trinity+Women+Clinic+Seoul",
    notes: "Highly recommended for expat women.",
  },
  // Seoul St. Mary's (Seocho)
  {
    name: "Seoul St. Mary's Hospital — International Center",
    nameKo: "서울성모병원 국제진료센터",
    specialty: "All Specialties",
    englishLevel: "Full",
    address: "222 Banpo-daero, Seocho-gu, Seoul",
    phone: "02-2258-5745",
    lat: 37.5012,
    lng: 127.0051,
    googleMapsUrl: "https://maps.google.com/?q=Seoul+St+Marys+Hospital",
    notes: "English, Russian, Japanese, French, Chinese.",
  },
  // Mapo / Hongdae
  {
    name: "KMI Health Check Center (Mapo)",
    nameKo: "KMI 한국의학연구소 마포",
    specialty: "Health Checkups",
    englishLevel: "Partial",
    address: "Mapo-gu, Seoul",
    phone: "1588-1615",
    lat: 37.5510,
    lng: 126.9090,
    googleMapsUrl: "https://maps.google.com/?q=KMI+Health+Check+Mapo+Seoul",
    notes: "Annual health checkups; English-accommodating.",
  },
  // Gangnam general
  {
    name: "Gangnam Severance Hospital — International Clinic",
    nameKo: "강남세브란스병원 국제진료센터",
    specialty: "All Specialties",
    englishLevel: "Full",
    address: "211 Eonju-ro, Gangnam-gu, Seoul",
    phone: "02-2019-3114",
    lat: 37.4926,
    lng: 127.0487,
    googleMapsUrl: "https://maps.google.com/?q=Gangnam+Severance+Hospital",
    notes: "Part of the Yonsei health system.",
  },
];

export const HOTLINES = [
  {
    number: "119",
    label: "Emergency / Ambulance",
    detail: "Interpreters available in multiple languages",
    color: "bg-red-600",
  },
  {
    number: "1339",
    label: "Medical Triage Hotline",
    detail: "English guidance on what to do — when to go to the ER vs. wait",
    color: "bg-orange-500",
  },
  {
    number: "02-2075-4180",
    label: "Seoul Global Center — Medical Referral",
    detail: "24hr line. Medically trained English-speaking staff.",
    color: "bg-blue-600",
  },
  {
    number: "1577-7129",
    label: "Medical Korea",
    detail: "Multilingual support + interpreter assignment to your clinic",
    color: "bg-purple-600",
  },
];
