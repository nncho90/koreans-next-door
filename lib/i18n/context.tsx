"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Locale, Dictionary } from "./types";
import { en } from "./en";
import { ko } from "./ko";
import { updateMetadata } from "./metadata";

const dicts: Record<Locale, Dictionary> = { en, ko };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("knd-locale") as Locale | null;
    if (stored === "en" || stored === "ko") {
      setLocaleState(stored);
      updateMetadata(stored);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("knd-locale", next);
    updateMetadata(next);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dicts[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
