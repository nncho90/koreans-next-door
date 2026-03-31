"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { FORMS, type KoreanForm, type FormField } from "@/lib/formsData";

// ── Field type badge colours ──────────────────────────────────────────────────
const FIELD_TYPE_STYLES: Record<
  FormField["fieldType"],
  { bg: string; text: string; label: string; labelKo: string }
> = {
  text: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    label: "Text",
    labelKo: "텍스트",
  },
  date: {
    bg: "bg-green-50",
    text: "text-green-700",
    label: "Date",
    labelKo: "날짜",
  },
  checkbox: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    label: "Checkbox",
    labelKo: "체크박스",
  },
  select: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    label: "Select",
    labelKo: "선택",
  },
  signature: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    label: "Signature",
    labelKo: "서명",
  },
  number: {
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    label: "Number",
    labelKo: "숫자",
  },
};

// ── Single field card ─────────────────────────────────────────────────────────
function FieldCard({ field, isKo }: { field: FormField; isKo: boolean }) {
  const typeStyle = FIELD_TYPE_STYLES[field.fieldType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm"
    >
      {/* Top row: type badge + required indicator */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeStyle.bg} ${typeStyle.text}`}
        >
          {isKo ? typeStyle.labelKo : typeStyle.label}
        </span>
        <span
          className={`text-xs font-semibold ${
            field.required ? "text-red-500" : "text-zinc-400"
          }`}
        >
          {field.required
            ? isKo
              ? "● 필수"
              : "● Required"
            : isKo
            ? "선택"
            : "Optional"}
        </span>
      </div>

      {/* Korean label */}
      <p className="text-2xl font-bold text-zinc-950 tracking-tight leading-tight mb-0.5">
        {field.koreanLabel}
      </p>

      {/* English label */}
      <p className="text-base font-semibold text-zinc-500 mb-4">
        {field.englishLabel}
      </p>

      {/* What to write */}
      <div className="mb-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
          {isKo ? "작성 방법" : "What to write"}
        </p>
        <p className="text-sm text-zinc-700 leading-relaxed">
          {isKo ? field.whatToWriteKo : field.whatToWriteEn}
        </p>
      </div>

      {/* Example value */}
      {field.exampleValue && (
        <div className="mb-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
            {isKo ? "예시" : "Example"}
          </p>
          <code className="inline-block rounded-lg bg-zinc-50 px-3 py-1.5 text-sm font-mono text-zinc-800 border border-zinc-100">
            {field.exampleValue}
          </code>
        </div>
      )}

      {/* Tip */}
      {(field.tip || field.tipKo) && (
        <div className="mt-4 flex gap-2.5 rounded-xl bg-amber-50 px-4 py-3 border border-amber-100">
          <span className="text-base mt-0.5 shrink-0">💡</span>
          <p className="text-sm text-amber-800 leading-relaxed">
            {isKo && field.tipKo ? field.tipKo : field.tip}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ── Form header info card ─────────────────────────────────────────────────────
function FormHeader({
  form,
  isKo,
}: {
  form: KoreanForm;
  isKo: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mb-8 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start gap-4">
        <span className="text-5xl">{form.emoji}</span>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-zinc-950 tracking-tight">
            {isKo ? form.nameKo : form.nameEn}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {isKo ? form.purposeKo : form.purposeEn}
          </p>

          {/* Where it's used */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              {isKo ? "사용 장소" : "Used at"}
            </span>
            <span className="text-xs text-zinc-600">
              {isKo ? form.usedAtKo : form.usedAtEn}
            </span>
          </div>
        </div>
      </div>

      {/* Tips */}
      {(isKo ? form.tipsKo : form.tipsEn).length > 0 && (
        <div className="mt-5 border-t border-zinc-100 pt-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            {isKo ? "꿀팁" : "Before you go"}
          </p>
          <ul className="space-y-2">
            {(isKo ? form.tipsKo : form.tipsEn).map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffd966]" />
                <span className="text-sm text-zinc-600 leading-relaxed">
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FormDecoder() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const selectedForm = FORMS.find((f) => f.id === selectedFormId) ?? null;

  function handleSelectForm(id: string) {
    const alreadySelected = selectedFormId === id;
    setSelectedFormId(alreadySelected ? null : id);
    if (!alreadySelected) {
      // Scroll to detail section after a short delay for animation
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }

  return (
    <section className="bg-[#fafaf8] px-6 pb-24 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <div className="py-12">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            {isKo ? "서류 선택" : "Choose a form"}
          </p>
          <p className="text-sm text-zinc-500">
            {isKo
              ? "아래에서 서류를 선택하면 모든 항목이 영어로 설명됩니다."
              : "Select a form below to see every field explained in plain English."}
          </p>
        </div>

        {/* Form picker grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
          {FORMS.map((form) => {
            const isSelected = selectedFormId === form.id;
            return (
              <motion.button
                key={form.id}
                onClick={() => handleSelectForm(form.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`relative flex flex-col items-center justify-center rounded-2xl px-4 py-6 text-center transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#ffd966] border-[#c9a800] text-zinc-950 shadow-md"
                    : "bg-white border-zinc-100 text-zinc-700 hover:border-zinc-200 hover:shadow-sm"
                }`}
              >
                <span className="text-3xl mb-2.5">{form.emoji}</span>
                <span className="text-sm font-semibold leading-snug">
                  {isKo ? form.nameKo : form.nameEn}
                </span>
                <span
                  className={`mt-1.5 text-[11px] leading-snug ${
                    isSelected ? "text-zinc-700" : "text-zinc-400"
                  }`}
                >
                  {isKo ? form.usedAtKo : form.usedAtEn}
                </span>

                {/* Selected checkmark */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950 text-white text-xs"
                    >
                      ✓
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Form detail */}
        <div ref={detailRef}>
          <AnimatePresence mode="wait">
            {selectedForm ? (
              <motion.div
                key={selectedForm.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Form header card */}
                <FormHeader form={selectedForm} isKo={isKo} />

                {/* Fields count */}
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-zinc-950">
                    {isKo
                      ? `항목 ${selectedForm.fields.length}개`
                      : `${selectedForm.fields.length} fields`}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      {isKo ? "필수" : "Required"}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                      {isKo ? "선택" : "Optional"}
                    </span>
                  </div>
                </div>

                {/* Fields grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedForm.fields.map((field, i) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <FieldCard field={field} isKo={isKo} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white py-20 text-center"
              >
                <span className="text-5xl mb-4">📄</span>
                <p className="text-lg font-semibold text-zinc-500">
                  {isKo
                    ? "위에서 서류를 선택하세요"
                    : "Select a form above to get started"}
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  {isKo
                    ? "항목마다 영어 설명과 예시가 표시됩니다."
                    : "Each field will be explained in plain English with examples."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
