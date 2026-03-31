"use client";

import { useState } from "react";
import type { ChoiceOption } from "@/lib/feedbackTypes";

interface MultipleChoiceProps {
  options: ChoiceOption[];
  allowOther?: boolean;
  value: string | null;
  onChange: (value: string) => void;
  locale: "en" | "ko";
}

export default function MultipleChoice({
  options,
  allowOther,
  value,
  onChange,
  locale,
}: MultipleChoiceProps) {
  const [otherText, setOtherText] = useState("");
  const isOtherSelected = value === "__other__";

  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`
            px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all active:scale-95 focus:outline-none
            ${value === opt.value
              ? "bg-[#ffd966] border-[#f5c842] text-[#1a1a1a]"
              : "bg-white border-gray-200 text-gray-600 hover:border-[#ffd966]"
            }
          `}
        >
          {locale === "ko" ? opt.ko : opt.en}
        </button>
      ))}
      {allowOther && (
        <button
          type="button"
          onClick={() => {
            onChange("__other__");
          }}
          className={`
            px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all active:scale-95 focus:outline-none
            ${isOtherSelected
              ? "bg-[#ffd966] border-[#f5c842] text-[#1a1a1a]"
              : "bg-white border-gray-200 text-gray-600 hover:border-[#ffd966]"
            }
          `}
        >
          {locale === "ko" ? "기타" : "Other"}
        </button>
      )}
      {isOtherSelected && (
        <input
          type="text"
          autoFocus
          value={otherText}
          onChange={(e) => {
            setOtherText(e.target.value);
            onChange(e.target.value ? `other: ${e.target.value}` : "__other__");
          }}
          placeholder={locale === "ko" ? "직접 입력해주세요" : "Type your answer..."}
          className="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffd966] bg-white"
        />
      )}
    </div>
  );
}
