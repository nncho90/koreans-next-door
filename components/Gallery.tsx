"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";

const rotations = [-1.5, 2, -0.5, 1.8, -2, 1, -1.2];

const photos = [
  { src: "/photos/knd-02.jpeg", alt: "KND event" },
  { src: "/photos/knd-03.jpeg", alt: "KND event" },
  { src: "/photos/knd-04.jpeg", alt: "KND event" },
  { src: "/photos/knd-05.jpeg", alt: "KND event" },
  { src: "/photos/knd-06.jpeg", alt: "KND event" },
  { src: "/photos/knd-07.jpeg", alt: "KND event" },
  { src: "/photos/knd-08.jpeg", alt: "KND event" },
];

export default function Gallery() {
  const { t } = useLocale();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, []);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % photos.length));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <section id="gallery" className="bg-white px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {t.gallery.label}
        </p>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {t.gallery.heading}
        </h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          {t.gallery.subheading}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <motion.button
              key={i}
              onClick={() => setLightbox(i)}
              whileHover={{ rotate: rotations[i], y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-square w-full overflow-hidden rounded-xl cursor-zoom-in"
            >
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
            onClick={() => setLightbox(null)}
          >
            {/* Photo */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative max-h-[85dvh] max-w-[90vw] w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={photos[lightbox].src}
                  alt={photos[lightbox].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            >
              <X size={22} weight="bold" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={22} weight="bold" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            >
              <ArrowRight size={22} weight="bold" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
              {lightbox + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
