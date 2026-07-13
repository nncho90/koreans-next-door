"use client";

import { useState, useEffect } from "react";
import { CaretUp, Translate } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";

// Korean phrases & romanization stay constant (educational content, not translated)
const phrases = [
  { korean: "감사합니다", romanization: "gamsahamnida" },
  { korean: "이거 주세요", romanization: "igeo juseyo" },
  { korean: "얼마예요?", romanization: "eolmayeyo?" },
  { korean: "화장실 어디예요?", romanization: "hwajangsil eodiyeyo?" },
  { korean: "괜찮아요", romanization: "gwaenchanayo" },
  { korean: "안녕하세요", romanization: "annyeonghaseyo" },
  { korean: "죄송합니다", romanization: "joesonghamnida" },
  { korean: "주문할게요", romanization: "jumunhalgeyo" },
  { korean: "맛있어요!", romanization: "masisseoyo!" },
  { korean: "계산이요", romanization: "gyesaniyo" },
  { korean: "네", romanization: "ne" },
  { korean: "아니요", romanization: "aniyo" },
  { korean: "잠시만요", romanization: "jamsimanyo" },
  { korean: "여기요!", romanization: "yeogiyo!" },
  { korean: "물 좀 주세요", romanization: "mul jom juseyo" },
  { korean: "하나 더 주세요", romanization: "hana deo juseyo" },
  { korean: "카드 돼요?", romanization: "kadeu dwaeyo?" },
  { korean: "Wi-Fi 비밀번호 뭐예요?", romanization: "waipai bimilbeonho mwoyeyo?" },
  { korean: "사진 찍어 주세요", romanization: "sajin jjigeo juseyo" },
  { korean: "이거 뭐예요?", romanization: "igeo mwoyeyo?" },
  { korean: "추천해 주세요", romanization: "chucheonhae juseyo" },
  { korean: "포장해 주세요", romanization: "pojanghae juseyo" },
  { korean: "도와주세요", romanization: "dowajuseyo" },
  { korean: "천천히 말해 주세요", romanization: "cheoncheonhi malhae juseyo" },
  { korean: "한국어 못해요", romanization: "hangugeo mothaeyo" },
  { korean: "이 근처에 편의점 있어요?", romanization: "i geuncheoe pyeonuijeom isseoyo?" },
  { korean: "어디에서 타요?", romanization: "eodieseo tayo?" },
  { korean: "소주 한 병 주세요", romanization: "soju han byeong juseyo" },
  { korean: "진짜요?", romanization: "jinjjayo?" },
  { korean: "재미있어요", romanization: "jaemiisseoyo" },
];

export default function PhraseOfDay() {
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { t } = useLocale();

  const dateStr = new Date().toDateString();
  const hash = dateStr.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const idx = hash % phrases.length;
  const phrase = phrases[idx];
  const translated = t.phraseOfDay.phrases[idx];

  // Never cover the contact CTA: hide the FAB while #contact is in the viewport
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-opacity duration-300"
      style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "auto" }}
    >
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={() => setExpanded(false)}
            className="cursor-pointer rounded-2xl bg-white shadow-lg border border-zinc-100 p-5 w-72"
          >
            <div className="flex items-center gap-2 mb-3">
              <Translate size={16} className="text-[#c9a800]" weight="bold" />
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                {t.phraseOfDay.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-zinc-900">{phrase.korean}</p>
            <p className="text-sm text-zinc-400 mt-1">{phrase.romanization}</p>
            <p className="text-base font-semibold text-zinc-800 mt-3">{translated.english}</p>
            <p className="text-sm italic text-zinc-400 mt-1">{translated.context}</p>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setExpanded(true)}
            aria-label={t.phraseOfDay.label}
            className="cursor-pointer flex items-center justify-center gap-2 rounded-full bg-[#ffd966] shadow-md hover:shadow-lg transition-shadow h-14 w-14 md:h-auto md:w-auto md:px-4 md:py-2"
          >
            <span className="hidden md:inline text-sm font-semibold text-zinc-800">{t.phraseOfDay.label}</span>
            <span className="md:hidden text-lg font-bold text-zinc-800">한</span>
            <CaretUp size={14} weight="bold" className="hidden md:inline text-zinc-600" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
