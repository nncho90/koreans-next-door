"use client";

interface WelcomeScreenProps {
  onStart: () => void;
  locale: "en" | "ko";
}

export default function WelcomeScreen({ onStart, locale }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-12">
      <div className="text-6xl mb-6">🏠</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {locale === "ko" ? "함께해 주셔서 감사해요!" : "We were so happy you came!"}
      </h1>
      <p className="text-gray-500 text-sm mb-2 font-medium uppercase tracking-widest">
        KND Feedback
      </p>
      <p className="text-gray-600 mt-3 mb-8 max-w-xs leading-relaxed text-sm">
        {locale === "ko"
          ? "2분이면 끝나요. 솔직한 의견이 다음 이벤트를 더 좋게 만들어줘요."
          : "Takes about 2 minutes. Your honest feedback helps us make the next event even better."}
      </p>
      <button
        onClick={onStart}
        className="bg-[#ffd966] hover:bg-[#f5c842] text-gray-900 font-bold px-10 py-4 rounded-2xl text-base transition-all active:scale-95 shadow-sm"
      >
        {locale === "ko" ? "시작하기 →" : "Start →"}
      </button>
    </div>
  );
}
