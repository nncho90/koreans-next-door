"use client";

interface NpsScaleProps {
  value: number | null;
  onChange: (value: number) => void;
  locale: "en" | "ko";
}

export default function NpsScale({ value, onChange, locale }: NpsScaleProps) {
  return (
    <div className="w-full">
      <div className="flex gap-1.5 justify-between">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            className={`
              flex-1 min-w-0 h-10 rounded-lg text-sm font-semibold transition-all active:scale-95 focus:outline-none
              ${value === i
                ? "bg-[#ffd966] text-[#1a1a1a] border-2 border-[#f5c842]"
                : "bg-white border-2 border-gray-200 text-gray-500 hover:border-[#ffd966]"
              }
            `}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>{locale === "ko" ? "추천 안 할게요" : "Not likely"}</span>
        <span>{locale === "ko" ? "적극 추천할게요" : "Extremely likely"}</span>
      </div>
    </div>
  );
}
