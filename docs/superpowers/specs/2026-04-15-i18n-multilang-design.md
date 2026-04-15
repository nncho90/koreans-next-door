# i18n Multi-Language Expansion — Design Spec
**Date:** 2026-04-15  
**Status:** Approved

---

## Overview

Expand the KND website from 2 languages (English, Korean) to 7 (+ Japanese, Simplified Chinese, Traditional Chinese, Portuguese, Spanish). Replace the current EN/한 pill toggle in the navbar with a globe icon + dropdown picker styled like Brandazine — globe button opens a card with native language name (bold) + English subtitle (muted), active locale highlighted.

---

## 1. Locale System

### `lib/i18n/types.ts`
- Expand `Locale` type: `"en" | "ko" | "ja" | "zh-CN" | "zh-TW" | "pt" | "es"`
- No other changes to `Dictionary` interface — all new locale files must implement the full type

### `lib/i18n/context.tsx`
- `en` and `ko` remain statically imported (already in bundle)
- The 5 new locales load via `dynamic import()` on first switch:
  ```ts
  const loaders: Record<Locale, () => Promise<Dictionary>> = {
    en: async () => en,
    ko: async () => ko,
    ja: async () => (await import("./ja")).ja,
    "zh-CN": async () => (await import("./zh-CN")).zhCN,
    "zh-TW": async () => (await import("./zh-TW")).zhTW,
    pt: async () => (await import("./pt")).pt,
    es: async () => (await import("./es")).es,
  };
  ```
- Add `isLoading: boolean` to context value (used by `LanguagePicker` for spinner)
- `setLocale` becomes async: loads dict, then sets state
- `localStorage` validation: accept all 7 locale codes on init
- `dicts` state is a `Partial<Record<Locale, Dictionary>>` — cache loaded dicts to avoid re-fetching

### `lib/i18n/metadata.ts`
- `updateMetadata` already sets `document.documentElement.lang = locale` — no changes needed; locale codes like `zh-CN` are valid BCP 47 lang tags

### `lib/i18n/index.ts`
- Export the expanded `Locale` type and `LocaleProvider`/`useLocale` as before — no new exports needed since new dicts are lazy-loaded internally by `context.tsx`

---

## 2. Dictionary Files

5 new files, each exporting a fully-typed `Dictionary`. All content translated naturally (not word-for-word). Tone: warm, friendly, community-focused.

| File | Export | Proper noun |
|------|--------|-------------|
| `lib/i18n/ja.ts` | `ja` | コリアンズ・ネクスト・ドア |
| `lib/i18n/zh-CN.ts` | `zhCN` | 科里安斯邻居 |
| `lib/i18n/zh-TW.ts` | `zhTW` | 科里安斯鄰居 |
| `lib/i18n/pt.ts` | `pt` | Koreans Next Door |
| `lib/i18n/es.ts` | `es` | Koreans Next Door |

All 5 files implement the full `Dictionary` type from `types.ts` — every key required, no omissions.

---

## 3. `LanguagePicker` Component

**File:** `components/LanguagePicker.tsx`

**Props:**
```ts
interface Props {
  dark: boolean; // true = white navbar context, false = transparent hero
}
```

**Behaviour:**
- Globe icon (`🌐`) in a rounded-square button (34×34px, radius 10px)
  - `dark=true`: `bg-zinc-100`
  - `dark=false`: `bg-white/15`
- Click toggles dropdown open/close
- Dropdown closes on outside click (mousedown listener) or Escape key
- While a new locale is loading, globe icon shows a spinner (CSS `animate-spin` on a small ring)

**Dropdown:**
- Positioned absolute, right-aligned below the button (`top: calc(100% + 8px)`)
- `bg-white`, `rounded-2xl`, `shadow-xl`, `border border-zinc-100/80`, `p-1.5`
- 7 rows, one per locale, in order: `ko`, `en`, `ja`, `zh-CN`, `zh-TW`, `pt`, `es`
- Each row: `flex justify-between items-center px-3.5 py-2.5 rounded-xl`
  - Left: native name (`font-semibold text-sm text-zinc-800`)
  - Right: English subtitle (`text-[10px] text-zinc-400`)
  - Active locale: `bg-zinc-100` background, native name in `text-zinc-950 font-bold`
  - Hover (non-active): `hover:bg-zinc-50`
- Native names:

| Locale | Native | Subtitle |
|--------|--------|----------|
| ko | 한국어 | Korean |
| en | English | English |
| ja | 日本語 | Japanese |
| zh-CN | 简体中文 | Simplified |
| zh-TW | 繁體中文 | Traditional |
| pt | Português | Portuguese |
| es | Español | Spanish |

---

## 4. Navbar Changes

**File:** `components/SharedNavbar.tsx`

- Remove the `(["ko", "en"] as const).map(...)` pill toggle (desktop + mobile)
- Replace with `<LanguagePicker dark={dark} />` in desktop cluster
- Replace mobile toggle section with `<LanguagePicker dark={true} />` inside the mobile menu
- All remaining `isKo ? x : y` inline guards: replace with proper `t.xxx` dictionary lookups where a translation key exists, or add keys to the dictionary if missing
- The `isKo` variable can be removed once all guards are converted

---

## 5. `guideData.ts` Changes

`GuideGroup` interface currently has `labelEn`, `labelKo`, `descEn`, `descKo`, `items: { en, ko }`.

**Extend to:**
```ts
interface GuideGroup {
  // existing
  labelEn: string; labelKo: string;
  descEn: string;  descKo: string;
  items: { en: string[]; ko: string[] };
  // new
  labelJa: string; labelZhCN: string; labelZhTW: string; labelPt: string; labelEs: string;
  descJa: string;  descZhCN: string;  descZhTW: string;  descPt: string;  descEs: string;
  items: { en: string[]; ko: string[]; ja: string[]; zhCN: string[]; zhTW: string[]; pt: string[]; es: string[] };
}
```

Add a helper in `guideData.ts`:
```ts
export function getGuideLabel(g: GuideGroup, locale: Locale): string { ... }
export function getGuideDesc(g: GuideGroup, locale: Locale): string { ... }
```

`guideCategories` array similarly extended with `labelJa`, `labelZhCN`, etc.

`SharedNavbar.tsx` uses `getGuideLabel(g, locale)` instead of `isKo ? g.labelKo : g.labelEn`.

---

## 6. Forward-Looking Translation Rule

When new content is added to any dictionary file (`en.ts`), the corresponding keys **must** be added to all 6 other locale files at the same time. The TypeScript type system enforces this — all locale exports must satisfy `Dictionary`, so missing keys will be a compile error.

---

## Files Changed / Created

| File | Action |
|------|--------|
| `lib/i18n/types.ts` | Edit — expand `Locale` type |
| `lib/i18n/context.tsx` | Edit — lazy loading, isLoading |
| `lib/i18n/index.ts` | Edit — minor export updates |
| `lib/i18n/ja.ts` | Create |
| `lib/i18n/zh-CN.ts` | Create |
| `lib/i18n/zh-TW.ts` | Create |
| `lib/i18n/pt.ts` | Create |
| `lib/i18n/es.ts` | Create |
| `components/LanguagePicker.tsx` | Create |
| `components/SharedNavbar.tsx` | Edit — swap picker, convert isKo guards |
| `lib/guideData.ts` | Edit — add locale fields + helpers |
