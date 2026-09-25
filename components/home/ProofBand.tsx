"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Play, InstagramLogo } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";
import { proofMedia, photosOnly } from "./proofMedia";

const rotations = [-1.5, 2, -0.5, 1.8, -2, 1, -1.2, 2.1, -1.7, 1.4, -2.2, 0.9];

/**
 * One band of photos and reels, replacing the old Gallery + VideoWall pair.
 * Photos open a lightbox; reels open Instagram in a new tab.
 */
export default function ProofBand() {
  const { t } = useLocale();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + photosOnly.length) % photosOnly.length));
  }, []);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % photosOnly.length));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, prev, next]);

  return (
    <section id="proof" className="bg-[#fafaf8] px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
          {t.proof.label}
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">
          {t.proof.heading}
        </h2>
        <p className="mt-3 max-w-xl text-base text-zinc-600 md:text-lg">
          {t.proof.subheading}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {proofMedia.map((item, i) => {
            const rotate = rotations[i % rotations.length];

            if (item.kind === "reel") {
              return (
                <motion.a
                  key={item.shortcode}
                  href={`https://www.instagram.com/reel/${item.shortcode}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.caption} — ${t.proof.watchOnInstagram}`}
                  className="group relative block overflow-hidden rounded-xl bg-zinc-900"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                  whileHover={{ rotate, scale: 1.02 }}
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={`/photos/reels/${item.shortcode}.jpeg`}
                      alt={item.caption}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900">
                      <Play size={15} weight="fill" />
                    </span>
                    <p className="absolute inset-x-3 bottom-3 text-xs font-medium leading-snug text-white">
                      {item.caption}
                    </p>
                  </div>
                </motion.a>
              );
            }

            const photoIndex = photosOnly.findIndex((p) => p.src === item.src);
            return (
              <motion.button
                key={item.src}
                type="button"
                onClick={() => setLightbox(photoIndex)}
                aria-label={item.alt}
                className="relative block overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                whileHover={{ rotate, scale: 1.02 }}
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://www.instagram.com/koreansnextdoor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
          >
            <InstagramLogo size={18} weight="bold" />
            {t.proof.follow}
          </a>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-5 top-5 text-white/80 transition-colors hover:text-white"
            >
              <X size={28} weight="bold" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-4 text-white/80 transition-colors hover:text-white md:left-8"
            >
              <ArrowLeft size={30} weight="bold" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-4 text-white/80 transition-colors hover:text-white md:right-8"
            >
              <ArrowRight size={30} weight="bold" />
            </button>
            <motion.div
              key={lightbox}
              className="relative h-[80vh] w-full max-w-4xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photosOnly[lightbox].src}
                alt={photosOnly[lightbox].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
            <p className="absolute bottom-5 text-sm text-white/70">
              {lightbox + 1} / {photosOnly.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
