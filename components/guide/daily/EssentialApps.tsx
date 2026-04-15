"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";
import { ESSENTIAL_APPS } from "@/lib/dailyData";

const STRINGS: Record<Locale, {
  sectionLabel: string;
  heading: string;
  sub: string;
}> = {
  en: {
    sectionLabel: "Essential Apps",
    heading: "Apps you need to survive in Korea",
    sub: "Google apps alone won't cut it. Korea has its own app ecosystem — here are the ones locals actually use.",
  },
  ko: {
    sectionLabel: "필수 앱",
    heading: "한국 생활 필수 앱",
    sub: "구글 앱만으로는 부족합니다. 한국에는 한국만의 앱 생태계가 있어요.",
  },
  ja: {
    sectionLabel: "必須アプリ",
    heading: "韓国生活で必須のアプリ",
    sub: "Googleアプリだけでは足りません。韓国には独自のアプリ生態系があります。",
  },
  "zh-CN": {
    sectionLabel: "必备App",
    heading: "在韩国生存必备的App",
    sub: "仅靠Google应用远远不够。韩国有其独特的App生态——以下是当地人实际使用的应用。",
  },
  "zh-TW": {
    sectionLabel: "必備App",
    heading: "在韓國生活必備的App",
    sub: "僅靠Google應用遠遠不夠。韓國有其獨特的App生態——以下是當地人實際使用的應用。",
  },
  pt: {
    sectionLabel: "Apps Essenciais",
    heading: "Apps que você precisa para sobreviver na Coreia",
    sub: "Apenas os apps do Google não são suficientes. A Coreia tem seu próprio ecossistema de apps — aqui estão os que os locais realmente usam.",
  },
  es: {
    sectionLabel: "Apps Esenciales",
    heading: "Apps que necesitas para sobrevivir en Corea",
    sub: "Solo las apps de Google no son suficientes. Corea tiene su propio ecosistema de apps — aquí están las que los locales realmente usan.",
  },
};

export default function EssentialApps() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="apps" className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.sectionLabel}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-12 max-w-xl text-zinc-400">
          {s.sub}
        </p>

        <div className="space-y-12">
          {ESSENTIAL_APPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.06 }}
            >
              {/* Category label */}
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-800" />
                <span className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-zinc-300">
                  {loc(group as Record<string, unknown>, "category", locale)}
                </span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              {/* App cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.apps.map((app, ai) => (
                  <motion.div
                    key={app.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: gi * 0.06 + ai * 0.07 }}
                    className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                  >
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-white leading-tight">
                        {app.name}
                      </h3>
                    </div>
                    <p className="mb-4 flex-1 text-sm text-zinc-400">
                      {loc(app as Record<string, unknown>, "desc", locale)}
                    </p>
                    {/* Platform badge */}
                    <div className="mt-auto inline-flex self-start rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400">
                      {app.platform}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
