# Health Guide Page — Design Spec
**Date:** 2026-03-22
**Route:** `/guide/health`
**Status:** Approved

---

## Overview

A new guide page to help internationals navigate Korea's healthcare system — find the right clinic type, discover English-friendly doctors, and know who to call in an emergency. Fits alongside the existing `/guide/settle`, `/guide/explore`, and `/guide/pinch` pages.

---

## Architecture

### New Page
- `app/guide/health/page.tsx` — follows identical pattern to settle/explore/pinch pages
- Wrapped in `LocaleProvider` for EN/KO i18n
- Dark-ish theme consistent with the "practical" settle section
- Linked from `/guide` hub page (add a 4th card)

### New Components (`components/guide/`)
| Component | Purpose |
|-----------|---------|
| `HealthHero` | Page intro, tagline, brief orientation |
| `ClinicTierExplainer` | Visual 4-tier system with when-to-go guidance |
| `SpecialtyPicker` | Clickable specialty cards → Goodoc deep links |
| `EnglishClinicMap` | Leaflet map with ~20 curated English-friendly clinic pins |
| `HealthHotlines` | Emergency numbers, resources, practical tips |

### Shared Infrastructure Reused
- `LocaleProvider` + `/lib/i18n` — existing i18n system
- `react-leaflet` — already installed and used in `SeoulMap`
- `SharedNavbar` / `SharedFooter`
- Framer Motion — for section animations

---

## Section 1 — Clinic Tier Explainer (`ClinicTierExplainer`)

Visual step/pyramid progression showing the 4 tiers. Desktop: horizontal. Mobile: vertical stack.

| Tier | Korean Name | English Name | When to Go | NHIS Coverage |
|------|-------------|--------------|------------|---------------|
| 1 | 의원 | Clinic | Default for everything — cold, skin, prescription | 70–80% |
| 2 | 병원 | Hospital | When clinic refers you; procedures | 60–70% |
| 3 | 종합병원 | General Hospital | Complex conditions; needs referral for coverage | 40–60% |
| 4 | 대학병원 / 상급종합병원 | University Hospital | Serious/specialized only; referral required | 40–60% (0% without referral) |

**Key callouts:**
- "Always start at 의원 — cheapest, fastest, no referral needed"
- "You need a 진료의뢰서 (referral slip) to get NHIS coverage at 종합병원 and above"
- "Bring your ARC card — clinics use it to look up your insurance automatically"

Language: English primary, Korean in parentheses throughout.

---

## Section 2 — Specialty Picker (`SpecialtyPicker`)

Grid of specialty cards. Each card:
- Korean name (large) + English name below
- Small specialty icon
- "Find on Goodoc →" link (opens `goodoc.co.kr/hospitals?department=<KO_NAME>` in new tab)

### Specialties (10 cards)

| Korean | English | Goodoc URL param |
|--------|---------|-----------------|
| 내과 | Internal Medicine | `내과` |
| 피부과 | Dermatology | `피부과` |
| 치과 | Dental | `치과` |
| 산부인과 | OBGYN | `산부인과` |
| 이비인후과 | ENT | `이비인후과` |
| 정신의학과 | Psychiatry | `정신의학과` |
| 정형외과 | Orthopedics | `정형외과` |
| 안과 | Ophthalmology | `안과` |
| 소아청소년과 | Pediatrics | `소아청소년과` |
| 한의과 | Korean Medicine | `한의과` |

---

## Section 3 — English-Friendly Clinic Map (`EnglishClinicMap`)

Leaflet map centered on Seoul (37.5665, 126.9780), zoom 12. ~20 curated pins of English-friendly clinics.

### Pin Data Structure
```ts
interface ClinicPin {
  name: string          // English name
  nameKo: string        // Korean name
  specialty: string     // e.g. "General Practice"
  englishLevel: "Full" | "Partial"
  address: string       // English address
  phone: string
  lat: number
  lng: number
  googleMapsUrl: string
  notes?: string        // e.g. "Walk-ins welcome"
}
```

### Curated Clinics (~20 pins across neighborhoods)

**Yongsan / Itaewon**
- International Clinic (Yongsan) — Full English, General Practice
- Seoul Foreign Clinic (Itaewon) — Full English, General + Psychiatry

**Jongno / Jung-gu**
- Seoul National University Hospital International Healthcare Center — Full English, all specialties
- Severance Hospital International Health Care Center (Seodaemun) — Full English, all specialties

**Songpa**
- Asan Medical Center International Healthcare Center — Full English, all specialties

**Gangnam / Seocho**
- Samsung Medical Center International Health Care Center — Full English, all specialties
- Trinity Women's Clinic — Full English, OBGYN

**Mapo / Hongdae**
- 1–2 English-friendly GPs (to be verified and added)

**Jamsil / Songpa**
- 1–2 English-friendly clinics (to be verified and added)

### Map Pin Popup
Shows: name, specialty, English level badge, address, phone (click-to-call), Google Maps link.

---

## Section 4 — Hotlines & Practical Tips (`HealthHotlines`)

### Emergency Hotlines
| Number | Service | Notes |
|--------|---------|-------|
| 119 | Emergency / Ambulance | Interpreters available |
| 1339 | Medical Triage Hotline | English guidance on what to do |
| 02-2075-4180 | Seoul Global Center 24hr Medical Referral | Medically trained English staff |
| 1577-7129 | Medical Korea | Multilingual support + interpreter assignment |

### Practical Tips (3 cards)
1. **Bring your ARC** — clinics use it to look up your NHIS insurance automatically. No card needed, just the number.
2. **Fill prescriptions same day** — doctors give you a prescription slip (처방전) to take to an outside pharmacy (약국). They keep the slip; fill it the same day.
3. **Search "영어 가능"** — type this in Naver Maps to find English-speaking clinics near you. Or call ahead: "영어로 진료 가능한가요?"

---

## Navigation

Add `/guide/health` as a 4th card on the `/guide` hub page. Card details:
- Icon: 🏥 or medical cross
- Title: "Find a Doctor"
- Subtitle: "Navigate Korea's healthcare system"
- Theme: consistent with existing guide cards

---

## i18n

All user-facing strings added to existing i18n system. Korean terms displayed inline alongside English (not swapped — both shown always for this page since the audience is English speakers who benefit from seeing Korean names).

---

## Out of Scope
- Live clinic availability / real-time data
- Appointment booking integration
- Telemedicine integration
- User-submitted clinic reviews
