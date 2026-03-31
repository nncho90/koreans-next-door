"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FEEDBACK_QUESTIONS } from "@/lib/feedbackQuestions";
import StarRating from "./StarRating";
import NpsScale from "./NpsScale";
import MultipleChoice from "./MultipleChoice";
import LongText from "./LongText";
import WelcomeScreen from "./WelcomeScreen";
import ThankYouScreen from "./ThankYouScreen";

interface SurveyShellProps {
  event: string;
  initialLocale: "en" | "ko";
}

type AnswerMap = Record<string, string | number>;

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function SurveyShell({ event, initialLocale }: SurveyShellProps) {
  // step: -1 = welcome, 0..N-1 = questions, N = thank you
  const [step, setStep] = useState(-1);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitting, setSubmitting] = useState(false);
  const [locale, setLocale] = useState<"en" | "ko">(initialLocale);

  const total = FEEDBACK_QUESTIONS.length;
  const isWelcome = step === -1;
  const isThanks = step === total;
  const currentQ = !isWelcome && !isThanks ? FEEDBACK_QUESTIONS[step] : null;

  const currentAnswer = currentQ ? answers[currentQ.id] : undefined;
  const isAnswered =
    currentQ &&
    (currentQ.required
      ? currentAnswer !== undefined && currentAnswer !== "" && currentAnswer !== "__other__"
      : true);

  function goNext() {
    if (step === total - 1) {
      handleSubmit();
    } else {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  function setAnswer(id: string, value: string | number) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          event,
          submittedAt: new Date().toISOString(),
          answers,
        }),
      });
    } catch {
      // show thank you regardless
    }
    setDirection(1);
    setStep(total);
    setSubmitting(false);
  }

  const progressPct =
    step < 0 ? 0 : step >= total ? 100 : Math.round((step / total) * 100);

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col">
      {/* Progress bar */}
      {!isWelcome && !isThanks && (
        <div className="h-1 bg-gray-200 sticky top-0 z-10">
          <motion.div
            className="h-full bg-[#ffd966]"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Language toggle */}
      {!isThanks && (
        <div className="flex justify-end px-5 pt-3">
          <button
            onClick={() => setLocale(locale === "en" ? "ko" : "en")}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-gray-200 text-gray-500 hover:border-[#ffd966] hover:text-gray-800 transition-all"
          >
            {locale === "en" ? "한국어" : "English"}
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-5">
        <AnimatePresence mode="wait" custom={direction}>
          {isWelcome && (
            <motion.div
              key="welcome"
              custom={direction}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="flex-1"
            >
              <WelcomeScreen
                locale={locale}
                onStart={() => {
                  setDirection(1);
                  setStep(0);
                }}
              />
            </motion.div>
          )}

          {isThanks && (
            <motion.div
              key="thanks"
              custom={direction}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="flex-1"
            >
              <ThankYouScreen locale={locale} />
            </motion.div>
          )}

          {currentQ && (
            <motion.div
              key={currentQ.id}
              custom={direction}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="flex-1 flex flex-col justify-center py-10"
            >
              {/* Step counter */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
                {step + 1} / {total}
              </p>

              {/* Question */}
              <h2 className="text-xl font-bold text-gray-900 leading-snug mb-1">
                {locale === "ko" ? currentQ.label.ko : currentQ.label.en}
              </h2>
              {currentQ.subtitle && (
                <p className="text-sm text-gray-500 mb-6">
                  {locale === "ko" ? currentQ.subtitle.ko : currentQ.subtitle.en}
                </p>
              )}
              {!currentQ.subtitle && <div className="mb-6" />}

              {/* Input */}
              {currentQ.type === "stars" && (
                <StarRating
                  value={
                    typeof currentAnswer === "number" ? currentAnswer : null
                  }
                  onChange={(v) => setAnswer(currentQ.id, v)}
                />
              )}
              {currentQ.type === "nps" && (
                <NpsScale
                  value={
                    typeof currentAnswer === "number" ? currentAnswer : null
                  }
                  onChange={(v) => setAnswer(currentQ.id, v)}
                  locale={locale}
                />
              )}
              {currentQ.type === "multiplechoice" && (
                <MultipleChoice
                  options={currentQ.options!}
                  allowOther={currentQ.allowOther}
                  value={
                    typeof currentAnswer === "string" ? currentAnswer : null
                  }
                  onChange={(v) => setAnswer(currentQ.id, v)}
                  locale={locale}
                />
              )}
              {currentQ.type === "longtext" && (
                <LongText
                  value={
                    typeof currentAnswer === "string" ? currentAnswer : ""
                  }
                  onChange={(v) => setAnswer(currentQ.id, v)}
                  locale={locale}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      {!isWelcome && !isThanks && (
        <div className="sticky bottom-0 bg-[#fafaf8] border-t border-gray-100 px-5 py-4 flex gap-3 max-w-lg mx-auto w-full">
          {step > 0 && (
            <button
              onClick={goBack}
              className="px-5 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-300 transition-all active:scale-95"
            >
              {locale === "ko" ? "← 이전" : "← Back"}
            </button>
          )}
          <button
            onClick={goNext}
            disabled={!isAnswered || submitting}
            className={`
              flex-1 py-3 rounded-xl text-sm font-bold transition-all active:scale-95
              ${isAnswered && !submitting
                ? "bg-[#ffd966] hover:bg-[#f5c842] text-gray-900"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {submitting
              ? "..."
              : step === total - 1
              ? locale === "ko"
                ? "제출하기 →"
                : "Submit →"
              : locale === "ko"
              ? "다음 →"
              : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}
