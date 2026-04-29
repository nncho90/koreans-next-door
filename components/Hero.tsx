"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";

const EASE_OUT_EXPO = [0.23, 1, 0.32, 1] as [number, number, number, number];

const slides = [
  { src: "/hero-3.jpeg", alt: "KND community group photo", objectPosition: "center 55%" },
  { src: "/hero-1.jpeg", alt: "Language exchange event", objectPosition: "center" },
  { src: "/hero-bg.jpeg", alt: "Community gathering", objectPosition: "center" },
];

// Each slide gets a different Ken Burns direction for variety
const kenBurns = [
  { initial: { scale: 1.15, x: "0%", y: "0%" }, animate: { scale: 1.06, x: "-1%", y: "1%" } },
  { initial: { scale: 1.08, x: "-2%", y: "-2%" }, animate: { scale: 1.16, x: "2%", y: "1%" } },
  { initial: { scale: 1.12, x: "2%", y: "1%" }, animate: { scale: 1.04, x: "-1%", y: "-1%" } },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const kb = kenBurns[current];

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background slides with Ken Burns */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2, ease: "easeInOut" } }}
        >
          <motion.div
            className="absolute inset-0"
            initial={shouldReduceMotion ? kb.animate : kb.initial}
            animate={kb.animate}
            transition={{ duration: 6, ease: EASE_OUT_EXPO  }}
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              priority={current === 0}
              className="object-cover"
              style={{ objectPosition: slides[current].objectPosition }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Yellow overlay */}
      <div className="absolute inset-0 bg-[#ffd966]/70" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

      {/* Centered content */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO , delay: 0.15 }}
          className="flex flex-col items-center"
        >
          <h1 className="sr-only">Koreans Next Door — Seoul Guide and Community for Foreigners Living in Korea</h1>
          <Image
            src="/logo.png"
            alt="Koreans Next Door"
            width={320}
            height={160}
            priority
            style={{ height: "auto" }}
            className="mb-8 w-64 md:w-80"
          />

          <p className="mb-9 max-w-md text-xl font-medium text-white/90 md:text-2xl drop-shadow-sm">
            {t.hero.tagline}
          </p>

          {!shouldReduceMotion && (
            <a href="#mission" className="flex flex-col items-center gap-0.5 mt-2" aria-label="Scroll to learn more">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
                >
                  <CaretDown size={22} weight="bold" className="text-white/80" />
                </motion.div>
              ))}
            </a>
          )}
        </motion.div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
              i === current ? "w-7 bg-white" : "w-1.5 bg-white/40"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
