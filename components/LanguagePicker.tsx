"use client";

import { useRef, useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const LANG_OPTIONS: { locale: Locale; native: string; subtitle: string }[] = [
  { locale: "ko", native: "한국어", subtitle: "Korean" },
  { locale: "en", native: "English", subtitle: "English" },
  { locale: "ja", native: "日本語", subtitle: "Japanese" },
  { locale: "zh-CN", native: "简体中文", subtitle: "Simplified" },
  { locale: "zh-TW", native: "繁體中文", subtitle: "Traditional" },
  { locale: "pt", native: "Português", subtitle: "Portuguese" },
  { locale: "es", native: "Español", subtitle: "Spanish" },
];

interface Props {
  dark: boolean;
}

export default function LanguagePicker({ dark }: Props) {
  const { locale, setLocale, isLoading } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        className="flex items-center justify-center w-[34px] h-[34px] transition-opacity duration-300 hover:opacity-70"
      >
        {isLoading ? (
          <span
            className="block w-4 h-4 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: dark ? "#71717a" : "rgba(255,255,255,0.7)" }}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={dark ? "#71717a" : "rgba(255,255,255,0.9)"}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] bg-white rounded-2xl shadow-xl border border-zinc-100/80 p-1.5 min-w-[140px] z-50">
          {LANG_OPTIONS.map(({ locale: l, native, subtitle }) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-xl transition-colors ${
                locale === l ? "bg-zinc-100" : "hover:bg-zinc-50"
              }`}
            >
              <span
                className={`text-sm ${locale === l ? "font-bold text-zinc-950" : "font-semibold text-zinc-800"}`}
              >
                {native}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
