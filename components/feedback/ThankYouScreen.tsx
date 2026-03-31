"use client";

import { useEffect } from "react";

interface ThankYouScreenProps {
  locale: "en" | "ko";
}

export default function ThankYouScreen({ locale }: ThankYouScreenProps) {
  useEffect(() => {
    // Trigger confetti
    import("canvas-confetti").then((mod) => {
      const confetti = mod.default;
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffd966", "#f5c842", "#fff", "#fafaf8", "#10b981"],
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-12">
      <div className="text-6xl mb-6">🎉</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        {locale === "ko" ? "감사합니다!" : "Thank you!"}
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
        {locale === "ko"
          ? "소중한 의견 주셔서 감사해요. 다음 이벤트에서 꼭 봬요 :)"
          : "We really appreciate your feedback. Hope to see you at the next event :)"}
      </p>
      <p className="mt-6 text-gray-400 text-xs">
        {locale === "ko" ? "코리언스 넥스트 도어" : "Koreans Next Door"}
      </p>
    </div>
  );
}
