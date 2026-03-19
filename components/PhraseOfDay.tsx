"use client";

import { useState } from "react";
import { CaretUp, Translate } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

interface Phrase {
  korean: string;
  romanization: string;
  english: string;
  context: string;
}

const phrases: Phrase[] = [
  { korean: "감사합니다", romanization: "gamsahamnida", english: "Thank you", context: "The most useful word in Korea" },
  { korean: "이거 주세요", romanization: "igeo juseyo", english: "This one please", context: "Point at menu and say this" },
  { korean: "얼마예요?", romanization: "eolmayeyo?", english: "How much is it?", context: "Essential for markets and street food" },
  { korean: "화장실 어디예요?", romanization: "hwajangsil eodiyeyo?", english: "Where's the bathroom?", context: "You will need this — trust us" },
  { korean: "괜찮아요", romanization: "gwaenchanayo", english: "It's okay", context: "Also means 'Are you okay?'" },
  { korean: "안녕하세요", romanization: "annyeonghaseyo", english: "Hello", context: "Use this greeting everywhere you go" },
  { korean: "죄송합니다", romanization: "joesonghamnida", english: "I'm sorry", context: "Polite apology for any situation" },
  { korean: "주문할게요", romanization: "jumunhalgeyo", english: "I'd like to order", context: "Say this to get the server's attention" },
  { korean: "맛있어요!", romanization: "masisseoyo!", english: "It's delicious!", context: "Compliment the chef — they'll love it" },
  { korean: "계산이요", romanization: "gyesaniyo", english: "Check please", context: "Wave and say this when you're done eating" },
  { korean: "네", romanization: "ne", english: "Yes", context: "Also pronounced 'de' — both are fine" },
  { korean: "아니요", romanization: "aniyo", english: "No", context: "Polite way to decline" },
  { korean: "잠시만요", romanization: "jamsimanyo", english: "Just a moment", context: "Buys you time in any situation" },
  { korean: "여기요!", romanization: "yeogiyo!", english: "Excuse me! (Over here!)", context: "Call staff at restaurants — totally normal" },
  { korean: "물 좀 주세요", romanization: "mul jom juseyo", english: "Water please", context: "Water is usually free at restaurants" },
  { korean: "하나 더 주세요", romanization: "hana deo juseyo", english: "One more please", context: "Works for refills, extra sides, anything" },
  { korean: "카드 돼요?", romanization: "kadeu dwaeyo?", english: "Can I pay by card?", context: "Almost everywhere accepts cards in Korea" },
  { korean: "Wi-Fi 비밀번호 뭐예요?", romanization: "waipai bimilbeonho mwoyeyo?", english: "What's the Wi-Fi password?", context: "Usually on a sign or the receipt" },
  { korean: "사진 찍어 주세요", romanization: "sajin jjigeo juseyo", english: "Please take my photo", context: "Hand over your phone and ask" },
  { korean: "이거 뭐예요?", romanization: "igeo mwoyeyo?", english: "What is this?", context: "Point at something and ask" },
  { korean: "추천해 주세요", romanization: "chucheonhae juseyo", english: "Please recommend something", context: "Great at restaurants when overwhelmed by the menu" },
  { korean: "포장해 주세요", romanization: "pojanghae juseyo", english: "To go please", context: "Pack it up to take with you" },
  { korean: "도와주세요", romanization: "dowajuseyo", english: "Please help me", context: "Koreans are incredibly helpful to new neighbors" },
  { korean: "천천히 말해 주세요", romanization: "cheoncheonhi malhae juseyo", english: "Please speak slowly", context: "A lifesaver when they talk too fast" },
  { korean: "한국어 못해요", romanization: "hangugeo mothaeyo", english: "I can't speak Korean", context: "Ironically, saying this in Korean impresses people" },
  { korean: "이 근처에 편의점 있어요?", romanization: "i geuncheoe pyeonuijeom isseoyo?", english: "Is there a convenience store nearby?", context: "There's one every 50 meters — but just in case" },
  { korean: "어디에서 타요?", romanization: "eodieseo tayo?", english: "Where do I board?", context: "For buses, subways, and trains" },
  { korean: "소주 한 병 주세요", romanization: "soju han byeong juseyo", english: "One bottle of soju please", context: "Unlock the full Korean dining experience" },
  { korean: "진짜요?", romanization: "jinjjayo?", english: "Really?", context: "React like a local — works in any convo" },
  { korean: "재미있어요", romanization: "jaemiisseoyo", english: "It's fun / interesting", context: "Great reaction to anything entertaining" },
];

export default function PhraseOfDay() {
  const [expanded, setExpanded] = useState(false);

  const dateStr = new Date().toDateString();
  const hash = dateStr.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const phrase = phrases[hash % phrases.length];

  return (
    <div className="fixed bottom-6 right-6 z-50">
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
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Daily Korean</span>
            </div>
            <p className="text-2xl font-bold text-zinc-900">{phrase.korean}</p>
            <p className="text-sm text-zinc-400 mt-1">{phrase.romanization}</p>
            <p className="text-base font-semibold text-zinc-800 mt-3">{phrase.english}</p>
            <p className="text-sm italic text-zinc-400 mt-1">{phrase.context}</p>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setExpanded(true)}
            className="cursor-pointer flex items-center gap-2 rounded-full bg-[#ffd966] px-4 py-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <span className="text-sm font-semibold text-zinc-800">Daily Korean</span>
            <CaretUp size={14} weight="bold" className="text-zinc-600" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
