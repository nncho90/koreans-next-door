"use client";

interface LongTextProps {
  value: string;
  onChange: (value: string) => void;
  locale: "en" | "ko";
}

export default function LongText({ value, onChange, locale }: LongTextProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      placeholder={
        locale === "ko"
          ? "여기에 자유롭게 적어주세요..."
          : "Share your thoughts here..."
      }
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-800 resize-none focus:outline-none focus:border-[#ffd966] bg-white placeholder:text-gray-400 transition-colors"
    />
  );
}
