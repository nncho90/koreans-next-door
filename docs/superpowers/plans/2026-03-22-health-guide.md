# Health Guide Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/guide/health` page that helps internationals navigate Korea's healthcare system — understand clinic types, find English-friendly doctors, and know who to call in an emergency.

**Architecture:** New page at `app/guide/health/page.tsx` following the exact pattern of `app/guide/settle/page.tsx`. Five new components in `components/guide/`. The guide hub at `app/guide/page.tsx` gets a 4th card. The Leaflet map reuses the same library already installed for `SeoulMap.tsx`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, react-leaflet (already installed), Leaflet (already installed)

**Spec:** `docs/superpowers/specs/2026-03-22-health-guide-design.md`

---

## Chunk 1: Data + Page Shell

### Task 1: Create clinic data file

**Files:**
- Create: `lib/healthData.ts`

- [ ] Create `lib/healthData.ts` with all static data for the health page:

```ts
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
    color: "bg-emerald-500",
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
    color: "bg-blue-500",
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
    color: "bg-orange-500",
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
    color: "bg-red-500",
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
```

- [ ] Commit:
```bash
git add lib/healthData.ts
git commit -m "feat(health): add static data for clinic tiers, specialties, clinics, hotlines"
```

---

### Task 2: Create the health page shell

**Files:**
- Create: `app/guide/health/page.tsx`

- [ ] Create `app/guide/health/page.tsx` following the exact `settle/page.tsx` pattern:

```tsx
"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import ClinicTierExplainer from "@/components/guide/ClinicTierExplainer";
import SpecialtyPicker from "@/components/guide/SpecialtyPicker";
import EnglishClinicMap from "@/components/guide/EnglishClinicMap";
import HealthHotlines from "@/components/guide/HealthHotlines";

function HealthContent() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  return (
    <>
      <SharedNavbar />
      <main>
        <section className="bg-zinc-950 px-6 pt-32 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {isKo ? "의료 안내" : "Healthcare"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
              {isKo ? "아픈 날을\n위한 안내" : "When you're\nnot feeling well"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-400">
              {isKo
                ? "한국의 의료 시스템, 영어 가능한 병원, 그리고 급할 때 연락할 곳."
                : "Korea's clinic system, English-speaking hospitals, and who to call when you need help."}
            </p>
          </div>
        </section>
        <ClinicTierExplainer />
        <SpecialtyPicker />
        <EnglishClinicMap />
        <HealthHotlines />
      </main>
      <SharedFooter />
    </>
  );
}

export default function HealthPage() {
  return (
    <LocaleProvider>
      <HealthContent />
    </LocaleProvider>
  );
}
```

- [ ] Verify the dev server doesn't crash (components will be stubbed next):
```bash
cd /Users/nelsoncho/koreans-next-door && npm run dev
```
Expected: May show "module not found" for the 4 components — that's fine, they'll be created next.

- [ ] Commit:
```bash
git add app/guide/health/page.tsx
git commit -m "feat(health): add /guide/health page shell"
```

---

### Task 3: Add health card to the guide hub

**Files:**
- Modify: `app/guide/page.tsx`

- [ ] Add the health card to the `groups` array in `app/guide/page.tsx`. Insert after the `pinch` object:

```ts
{
  href: "/guide/health",
  labelEn: "Find a Doctor",
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
},
```

Also update the grid to support 4 columns on large screens: change `md:grid-cols-3` to `md:grid-cols-2 lg:grid-cols-4`.

- [ ] Commit:
```bash
git add app/guide/page.tsx
git commit -m "feat(health): add health guide card to /guide hub"
```

---

## Chunk 2: Components

### Task 4: ClinicTierExplainer component

**Files:**
- Create: `components/guide/ClinicTierExplainer.tsx`

- [ ] Create `components/guide/ClinicTierExplainer.tsx`:

```tsx
"use client";

import { useLocale } from "@/lib/i18n";
import { CLINIC_TIERS } from "@/lib/healthData";

export default function ClinicTierExplainer() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section className="bg-zinc-900 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "진료기관 종류" : "The 4-Tier System"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {isKo ? "어떤 병원에 가야 할까?" : "Which clinic do you go to?"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-400">
          {isKo
            ? "한국의 의료기관은 4단계로 나뉩니다. 대부분의 경우 의원에서 시작하세요."
            : "Korea's healthcare is organized in 4 tiers. Start at the bottom — it's cheaper, faster, and usually all you need."}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CLINIC_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className="flex flex-col rounded-2xl border border-zinc-700 bg-zinc-800 p-6"
            >
              <div className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full ${tier.color} text-sm font-bold text-white`}>
                {tier.tier}
              </div>
              <div className="mb-1 text-xl font-bold text-white">
                {tier.ko}
                <span className="ml-2 text-sm font-normal text-zinc-400">({tier.en})</span>
              </div>
              <p className="mb-3 text-sm text-zinc-400">{tier.description}</p>
              <div className="mt-auto space-y-2 text-xs">
                <div className="rounded-lg bg-zinc-700/50 px-3 py-2 text-zinc-300">
                  <span className="font-semibold text-white">{isKo ? "예시: " : "E.g.: "}</span>
                  {tier.examples}
                </div>
                <div className="rounded-lg bg-zinc-700/50 px-3 py-2 text-zinc-300">
                  <span className="font-semibold text-white">NHIS: </span>
                  {tier.nhis}
                </div>
                <div className={`rounded-lg px-3 py-2 text-xs font-medium ${tier.color} bg-opacity-20 text-white`}>
                  💡 {tier.tip}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key callout */}
        <div className="mt-8 rounded-2xl border border-[#ffd966]/30 bg-[#ffd966]/10 px-6 py-5">
          <p className="text-sm font-semibold text-[#ffd966]">
            {isKo
              ? "💳 진료 시 외국인등록증(ARC)을 지참하세요. 건강보험이 자동으로 조회됩니다."
              : "💳 Always bring your ARC (Alien Registration Card). Clinics use it to look up your NHIS insurance automatically — no card needed, just the number."}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] Commit:
```bash
git add components/guide/ClinicTierExplainer.tsx
git commit -m "feat(health): add ClinicTierExplainer component"
```

---

### Task 5: SpecialtyPicker component

**Files:**
- Create: `components/guide/SpecialtyPicker.tsx`

- [ ] Create `components/guide/SpecialtyPicker.tsx`:

```tsx
"use client";

import { useLocale } from "@/lib/i18n";
import { SPECIALTIES } from "@/lib/healthData";

export default function SpecialtyPicker() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "진료과 찾기" : "Find a Specialty"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {isKo ? "어떤 진료가 필요하세요?" : "What kind of care do you need?"}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-400">
          {isKo
            ? "진료과를 선택하면 굿닥에서 주변 의원을 바로 검색할 수 있어요."
            : "Pick a specialty below to search nearby clinics on Goodoc — Korea's largest clinic finder."}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {SPECIALTIES.map((s) => (
            <a
              key={s.ko}
              href={`https://www.goodoc.co.kr/hospitals?department=${encodeURIComponent(s.goodocParam)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-5 text-center transition-all hover:border-[#ffd966]/50 hover:bg-zinc-700"
            >
              <span className="text-3xl">{s.icon}</span>
              <span className="text-base font-bold text-white">{s.ko}</span>
              <span className="text-xs text-zinc-400">{s.en}</span>
              <span className="mt-1 text-xs font-semibold text-[#ffd966] opacity-0 transition-opacity group-hover:opacity-100">
                Find on Goodoc →
              </span>
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          {isKo
            ? "굿닥 앱을 다운로드하면 예약, 접수, 비대면 진료도 가능해요."
            : "Tip: Download the Goodoc app for appointments, check-ins, and 24/7 telemedicine."}
        </p>
      </div>
    </section>
  );
}
```

- [ ] Commit:
```bash
git add components/guide/SpecialtyPicker.tsx
git commit -m "feat(health): add SpecialtyPicker component with Goodoc deep links"
```

---

### Task 6: EnglishClinicMap component

**Files:**
- Create: `components/guide/EnglishClinicMap.tsx`

Note: Leaflet requires dynamic import (no SSR) — same pattern as `SeoulMap.tsx` via `next/dynamic`.

- [ ] Create `components/guide/EnglishClinicMap.tsx`:

```tsx
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useLocale } from "@/lib/i18n";
import { ENGLISH_CLINICS, type ClinicPin } from "@/lib/healthData";

const Map = dynamic(() => import("./EnglishClinicMapInner"), { ssr: false });

export default function EnglishClinicMap() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const [selected, setSelected] = useState<ClinicPin | null>(null);

  return (
    <section className="bg-zinc-900 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "영어 가능 병원" : "English-Friendly Clinics"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {isKo ? "영어 가능한 병원 지도" : "Clinics that speak your language"}
        </h2>
        <p className="mb-8 max-w-xl text-zinc-400">
          {isKo
            ? "서울 전역의 영어 가능 병원을 모았어요. 핀을 클릭해 정보를 확인하세요."
            : "A curated map of English-friendly clinics and hospitals across Seoul. Click a pin to see details."}
        </p>

        <div className="overflow-hidden rounded-2xl border border-zinc-700">
          <Map
            clinics={ENGLISH_CLINICS}
            selected={selected}
            onSelect={setSelected}
          />
        </div>

        {/* Selected clinic detail panel */}
        {selected && (
          <div className="mt-4 rounded-2xl border border-zinc-700 bg-zinc-800 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">{selected.name}</h3>
                <p className="text-sm text-zinc-400">{selected.nameKo}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                selected.englishLevel === "Full"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}>
                {selected.englishLevel} English
              </span>
            </div>
            <div className="mt-3 grid gap-2 text-sm text-zinc-400">
              <p>📍 {selected.address}</p>
              <p>🏥 {selected.specialty}</p>
              {selected.notes && <p>💬 {selected.notes}</p>}
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={`tel:${selected.phone}`}
                  className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-600"
                >
                  📞 {selected.phone}
                </a>
                <a
                  href={selected.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#ffd966] px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-[#f5ce50]"
                >
                  Open in Maps →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] Create `components/guide/EnglishClinicMapInner.tsx` (the actual Leaflet map, loaded dynamically):

```tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type ClinicPin } from "@/lib/healthData";

function makePin(level: "Full" | "Partial") {
  const color = level === "Full" ? "#10b981" : "#f59e0b";
  return L.divIcon({
    html: `<div style="
      width:32px;height:32px;border-radius:50%;
      background:${color};border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
      display:flex;align-items:center;justify-content:center;
      font-size:14px;
    ">🏥</div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

interface Props {
  clinics: ClinicPin[];
  selected: ClinicPin | null;
  onSelect: (c: ClinicPin) => void;
}

export default function EnglishClinicMapInner({ clinics, onSelect }: Props) {
  return (
    <MapContainer
      center={[37.5665, 126.978]}
      zoom={11}
      style={{ height: "420px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {clinics.map((clinic) => (
        <Marker
          key={clinic.name}
          position={[clinic.lat, clinic.lng]}
          icon={makePin(clinic.englishLevel)}
          eventHandlers={{ click: () => onSelect(clinic) }}
        >
          <Popup>
            <strong>{clinic.name}</strong>
            <br />
            {clinic.specialty}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

- [ ] Commit:
```bash
git add components/guide/EnglishClinicMap.tsx components/guide/EnglishClinicMapInner.tsx
git commit -m "feat(health): add EnglishClinicMap with Leaflet pins"
```

---

### Task 7: HealthHotlines component

**Files:**
- Create: `components/guide/HealthHotlines.tsx`

- [ ] Create `components/guide/HealthHotlines.tsx`:

```tsx
"use client";

import { useLocale } from "@/lib/i18n";
import { HOTLINES } from "@/lib/healthData";

const TIPS = [
  {
    en: "Bring your ARC",
    ko: "외국인등록증 지참",
    detail: {
      en: "Clinics use your ARC number to look up NHIS insurance automatically. You don't need a physical insurance card.",
      ko: "건강보험은 외국인등록증 번호로 자동 조회됩니다. 별도의 보험 카드는 필요 없어요.",
    },
  },
  {
    en: "Fill prescriptions same day",
    ko: "처방전은 당일 사용",
    detail: {
      en: "Doctors give you a paper prescription slip (처방전) to take to an outside pharmacy (약국). They keep the slip — fill it same day.",
      ko: "의사가 처방전을 발행하면 근처 약국에서 수령하세요. 약국이 처방전을 보관하므로 당일 바로 가세요.",
    },
  },
  {
    en: "Search "영어 가능" on Naver Maps",
    ko: "네이버 지도에서 '영어 가능' 검색",
    detail: {
      en: "Type "영어 가능 병원" in Naver Maps to find English-speaking clinics near you. Or call ahead: "영어로 진료 가능한가요?"",
      ko: "네이버 지도에서 '영어 가능 병원'을 검색하거나, 전화로 '영어로 진료 가능한가요?'라고 물어보세요.",
    },
  },
];

export default function HealthHotlines() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Hotlines */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "긴급 연락처" : "Hotlines"}
        </p>
        <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
          {isKo ? "급할 때 전화하세요" : "Who to call"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {HOTLINES.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number.replace(/-/g, "")}`}
              className="flex items-start gap-4 rounded-2xl border border-zinc-700 bg-zinc-800 p-5 transition-colors hover:border-zinc-600"
            >
              <div className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${h.color} text-sm font-bold text-white`}>
                {h.number}
              </div>
              <div>
                <p className="font-semibold text-white">{h.label}</p>
                <p className="text-sm text-zinc-400">{h.detail}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Practical Tips */}
        <h2 className="mb-6 mt-14 text-2xl font-bold text-white">
          {isKo ? "알아두면 좋은 것들" : "Practical tips"}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {TIPS.map((tip) => (
            <div
              key={tip.en}
              className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5"
            >
              <p className="mb-2 font-semibold text-white">
                {isKo ? tip.ko : tip.en}
              </p>
              <p className="text-sm text-zinc-400">
                {isKo ? tip.detail.ko : tip.detail.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] Commit:
```bash
git add components/guide/HealthHotlines.tsx
git commit -m "feat(health): add HealthHotlines component"
```

---

## Chunk 3: Verification

### Task 8: Smoke test the full page

- [ ] Start dev server:
```bash
cd /Users/nelsoncho/koreans-next-door && npm run dev
```

- [ ] Navigate to `http://localhost:3000/guide/health` in the browser.

- [ ] Verify each section renders without errors:
  - [ ] Hero section with yellow label + white heading
  - [ ] ClinicTierExplainer: 4 tier cards visible
  - [ ] SpecialtyPicker: 10 specialty cards, each linking to Goodoc
  - [ ] EnglishClinicMap: Leaflet map loads, pins visible
  - [ ] HealthHotlines: 4 hotline cards + 3 tip cards

- [ ] Navigate to `http://localhost:3000/guide` and verify the health card appears as 4th card.

- [ ] Click a specialty card — verify Goodoc opens pre-filtered to the correct department.

- [ ] Click a map pin — verify the clinic detail panel appears below the map.

- [ ] Click a hotline card — verify it triggers a phone call intent.

- [ ] Toggle locale (KO) — verify Korean translations render correctly throughout.

- [ ] Check mobile view (resize to 375px) — verify layout stacks correctly.

- [ ] Commit any fixes found during smoke test, then final commit:
```bash
git add -p
git commit -m "fix(health): smoke test fixes"
```

---

### Task 9: Build check

- [ ] Run production build to confirm no type errors or build failures:
```bash
cd /Users/nelsoncho/koreans-next-door && npm run build
```
Expected: Build completes with no errors. Leaflet warnings about `window` are acceptable (handled by `ssr: false`).

- [ ] If build fails, fix the error and re-run.
