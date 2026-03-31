"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { MOVING_CHECKLIST } from "@/lib/housingData";

const STORAGE_KEY = "knd-housing-checklist";

const PHASES = [
  { id: "Before signing", idKo: "계약 전" },
  { id: "Signing day", idKo: "계약 당일" },
  { id: "Move-in day", idKo: "이사 당일" },
];

export default function MovingChecklist() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: number[] = JSON.parse(stored);
          setChecked(new Set(parsed));
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  function toggleStep(step: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(step)) {
        next.delete(step);
      } else {
        next.add(step);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      }
      return next;
    });
  }

  function clearAll() {
    setChecked(new Set());
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const totalSteps = MOVING_CHECKLIST.length;
  const completedSteps = checked.size;
  const progressPct = Math.round((completedSteps / totalSteps) * 100);

  if (!mounted) {
    // Render skeleton to avoid hydration mismatch
    return (
      <section className="bg-white px-6 py-16 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="h-8 w-48 animate-pulse rounded bg-zinc-100" />
        </div>
      </section>
    );
  }

  return (
    <section id="moving-checklist" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {isKo ? "이사 체크리스트" : "Moving Checklist"}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {isKo
            ? "이사할 때 해야 할 것들"
            : "Everything you need to do when moving"}
        </h2>
        <p className="mb-6 max-w-xl text-zinc-500">
          {isKo
            ? "계약 전부터 이사 당일까지. 체크하면 저장됩니다."
            : "From before you sign to the day you move in. Your progress is saved automatically."}
        </p>

        {/* Progress Bar */}
        <div className="mb-10 rounded-2xl border border-zinc-200 bg-[#fafaf8] p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold text-zinc-900">
              {completedSteps} / {totalSteps}{" "}
              <span className="font-normal text-zinc-500">
                {isKo ? "완료" : "completed"}
              </span>
            </p>
            {completedSteps > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-600"
              >
                {isKo ? "초기화" : "Reset all"}
              </button>
            )}
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-zinc-200">
            <motion.div
              className="h-full rounded-full bg-[#ffd966]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {completedSteps === totalSteps && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-sm font-semibold text-emerald-600"
            >
              {isKo
                ? "🎉 모두 완료했습니다! 새 집에서 잘 지내세요."
                : "🎉 All done! Enjoy your new home."}
            </motion.p>
          )}
        </div>

        {/* Phases */}
        <div className="space-y-10">
          {PHASES.map((phase) => {
            const items = MOVING_CHECKLIST.filter(
              (item) => item.category === phase.id
            );
            const phaseCompleted = items.filter((item) =>
              checked.has(item.step)
            ).length;

            return (
              <div key={phase.id}>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-lg font-bold text-zinc-950">
                    {isKo ? phase.idKo : phase.id}
                  </h3>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-500">
                    {phaseCompleted}/{items.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {items.map((item, i) => {
                    const isDone = checked.has(item.step);
                    return (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className={`group cursor-pointer rounded-2xl border px-5 py-4 transition-all ${
                          isDone
                            ? "border-emerald-200 bg-emerald-50"
                            : "border-zinc-200 bg-[#fafaf8] hover:border-zinc-300"
                        }`}
                        onClick={() => toggleStep(item.step)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Checkbox */}
                          <div
                            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                              isDone
                                ? "border-emerald-500 bg-emerald-500"
                                : "border-zinc-300 group-hover:border-zinc-400"
                            }`}
                          >
                            {isDone && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-xs font-bold text-white"
                              >
                                ✓
                              </motion.span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <p
                              className={`font-semibold transition-colors ${
                                isDone
                                  ? "text-emerald-700 line-through decoration-emerald-400"
                                  : "text-zinc-900"
                              }`}
                            >
                              {isKo ? item.taskKo : item.task}
                            </p>
                            <p
                              className={`mt-1 text-sm transition-colors ${
                                isDone ? "text-emerald-600" : "text-zinc-500"
                              }`}
                            >
                              {item.detail}
                            </p>
                          </div>

                          {/* Step number */}
                          <span
                            className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              isDone
                                ? "bg-emerald-200 text-emerald-700"
                                : "bg-zinc-200 text-zinc-500"
                            }`}
                          >
                            {item.step}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
