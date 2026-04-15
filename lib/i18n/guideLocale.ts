import type { Locale } from "./types";

/**
 * Pick a localized field from a data object that uses the En/Ko/Ja/ZhCN/ZhTW/Pt/Es suffix convention.
 * Falls back to the English field if the locale field is missing.
 *
 * Example: loc(housingType, "desc", locale) → housingType.descJa ?? housingType.descEn
 */
export function loc(obj: Record<string, unknown>, field: string, locale: Locale): string {
  const suffix =
    locale === "ko" ? "Ko" :
    locale === "ja" ? "Ja" :
    locale === "zh-CN" ? "ZhCN" :
    locale === "zh-TW" ? "ZhTW" :
    locale === "pt" ? "Pt" :
    locale === "es" ? "Es" :
    "En";
  const value = obj[`${field}${suffix}`] ?? obj[`${field}En`];
  return (value as string) ?? "";
}

/**
 * Pick a localized string array from a data object.
 * Falls back to the English array if missing.
 */
export function locArr(obj: Record<string, unknown>, field: string, locale: Locale): string[] {
  const suffix =
    locale === "ko" ? "Ko" :
    locale === "ja" ? "Ja" :
    locale === "zh-CN" ? "ZhCN" :
    locale === "zh-TW" ? "ZhTW" :
    locale === "pt" ? "Pt" :
    locale === "es" ? "Es" :
    "En";
  const value = obj[`${field}${suffix}`] ?? obj[`${field}En`];
  return (value as string[]) ?? [];
}
