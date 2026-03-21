import type { Locale } from "./types";

export function updateMetadata(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
}
