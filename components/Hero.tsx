"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";

const slides = [
  { src: "/hero-1.jpeg", alt: "Language exchange event" },
  { src: "/hero-bg.jpeg", alt: "Community gathering" },
  { src: "/hero-2.jpeg", alt: "Community celebration" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const { t } = useLocale();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            priority={current === 0}
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Yellow overlay — semi-transparent so community photos show through */}
      <div className="absolute inset-0 bg-[#ffd966]/70" />
      {/* Bottom vignette for slide dot legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

      {/* Centered content */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-col items-center"
        >
          <Image
            src="/logo.png"
            alt="Koreans Next Door"
            width={320}
            height={160}
            priority
            style={{ height: "auto" }}
            className="mb-8 w-64 md:w-80"
          />

          <p className="mb-9 max-w-md text-lg font-medium text-white/90 md:text-xl drop-shadow-sm">
            {t.hero.tagline}
          </p>

          <a href="#mission" className="flex flex-col items-center gap-0.5 mt-2">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.18,
                }}
              >
                <CaretDown size={22} weight="bold" className="text-white/80" />
              </motion.div>
            ))}
          </a>
        </motion.div>
      </div>

      {/* Slide dots — centered */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === current ? "w-7 bg-white" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
