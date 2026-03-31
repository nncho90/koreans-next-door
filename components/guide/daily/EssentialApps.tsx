"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { ESSENTIAL_APPS } from "@/lib/dailyData";

export default function EssentialApps() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <section id="apps" className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "필수 앱" : "Essential Apps"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {isKo ? "한국 생활 필수 앱" : "Apps you need to survive in Korea"}
        </h2>
        <p className="mb-12 max-w-xl text-zinc-400">
          {isKo
            ? "구글 앱만으로는 부족합니다. 한국에는 한국만의 앱 생태계가 있어요."
            : "Google apps alone won't cut it. Korea has its own app ecosystem — here are the ones locals actually use."}
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
                  {isKo ? group.categoryKo : group.category}
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
                      {isKo ? app.descKo : app.descEn}
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
