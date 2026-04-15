"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { Locale, Dictionary } from "./types";
import { en } from "./en";
import { ko } from "./ko";
import { updateMetadata } from "./metadata";

const ALL_LOCALES: Locale[] = ["en", "ko", "ja", "zh-CN", "zh-TW", "pt", "es"];

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => en,
  ko: async () => ko,
  ja: async () => (await import("./ja")).ja,
  "zh-CN": async () => (await import("./zh-CN")).zhCN,
  "zh-TW": async () => (await import("./zh-TW")).zhTW,
  pt: async () => (await import("./pt")).pt,
  es: async () => (await import("./es")).es,
};

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  isLoading: boolean;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  t: en,
  isLoading: false,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [t, setT] = useState<Dictionary>(en);
  const [isLoading, setIsLoading] = useState(false);
  const cache = useRef<Partial<Record<Locale, Dictionary>>>({ en, ko });

  useEffect(() => {
    const stored = localStorage.getItem("knd-locale") as Locale | null;
    if (stored && ALL_LOCALES.includes(stored)) {
      applyLocale(stored);
    }
  }, []);

  async function applyLocale(next: Locale) {
    if (cache.current[next]) {
      setLocaleState(next);
      setT(cache.current[next]!);
      updateMetadata(next);
      return;
    }
    setIsLoading(true);
    try {
      const dict = await loaders[next]();
      cache.current[next] = dict;
      setLocaleState(next);
      setT(dict);
      updateMetadata(next);
    } finally {
      setIsLoading(false);
    }
  }

  const setLocale = (next: Locale) => {
    localStorage.setItem("knd-locale", next);
    applyLocale(next);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isLoading }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
