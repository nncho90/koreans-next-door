"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Play, InstagramLogo } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";
import { proofMedia, photosOnly } from "./proofMedia";

/**
 * The photos and reels as a cork pinboard: masonry columns, nothing uniform,
 * every tile pinned, taped or torn.
 *
 * Every visual variation below is derived from the item's index, never from
 * Math.random, so the server and the client render the same HTML. A random
 * tilt here would throw a hydration error on every load.
 */

type Treatment = "polaroid" | "ripped" | "plain";

const TREATMENTS: Treatment[] = ["polaroid", "ripped", "plain", "ripped", "polaroid", "ripped"];
const TILTS = [-4.5, 2.5, -1.5, 3.5, -2.5, 1.5, -3.5, 4.5, -0.8, 2.8, -5, 1.2];
const PIN_COLORS = ["#d94f45", "#e8b53f", "#4f8fd9", "#5aa86b", "#e07a3f", "#8e6bd0"];
/** Pin sits left, centre or right of the top edge. */
const PIN_X = ["18%", "50%", "78%", "34%", "62%"];

function tiltOf(i: number) {
  return TILTS[i % TILTS.length];
}

function treatmentOf(i: number): Treatment {
  return TREATMENTS[i % TREATMENTS.length];
}

/**
 * Ripped-from-a-magazine outlines. Every edge is irregular, so the tile reads
 * as a page torn out by hand rather than a cropped rectangle.
 */
const RIPPED_CLIPS = [
  "polygon(1% 3%, 8% 0.5%, 17% 2.5%, 27% 0%, 38% 2%, 49% 0.5%, 61% 2.5%, 72% 0%, 83% 2%, 94% 0.5%, 99% 3%, 97.5% 12%, 100% 23%, 98% 35%, 99.5% 47%, 97% 58%, 99% 70%, 97.5% 82%, 99% 92%, 95% 97%, 86% 99.5%, 75% 97%, 64% 99.5%, 53% 97.5%, 42% 100%, 31% 97%, 20% 99.5%, 10% 97%, 2% 99%, 0.5% 88%, 2.5% 76%, 0% 64%, 2% 52%, 0.5% 40%, 3% 28%, 0.5% 16%)",
  "polygon(2% 1%, 12% 3%, 23% 0.5%, 34% 2.5%, 45% 0%, 57% 2%, 68% 0.5%, 79% 3%, 90% 1%, 98% 4%, 100% 15%, 97.5% 27%, 99.5% 38%, 97% 50%, 99% 62%, 97.5% 73%, 100% 85%, 98% 96%, 89% 99%, 78% 97%, 67% 99.5%, 56% 97%, 44% 99.5%, 33% 97.5%, 22% 100%, 11% 97.5%, 3% 99%, 0.5% 87%, 2.5% 75%, 0% 63%, 2% 51%, 0.5% 39%, 2.5% 27%, 0% 14%)",
  "polygon(3% 2%, 14% 0%, 25% 3%, 36% 0.5%, 47% 2.5%, 59% 0%, 70% 2.5%, 81% 0.5%, 92% 2.5%, 99% 5%, 97% 16%, 99.5% 28%, 97.5% 40%, 100% 52%, 98% 64%, 99.5% 76%, 97% 87%, 98.5% 97%, 88% 99%, 77% 96.5%, 66% 99%, 55% 97%, 43% 99.5%, 32% 96.5%, 21% 99%, 10% 96.5%, 1.5% 98%, 0% 86%, 2% 74%, 0.5% 62%, 3% 50%, 0% 38%, 2% 26%, 0.5% 13%)",
];

const corkStyle: React.CSSProperties = {
  backgroundColor: "#b8824a",
  // cork.svg is a 400px tile of granules and blotches; the gradients on top of
  // it are the light falling across the board.
  backgroundImage: [
    "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(255,235,200,0.30), transparent 70%)",
    "radial-gradient(ellipse 60% 50% at 85% 110%, rgba(60,32,10,0.28), transparent 70%)",
    "url(/cork.svg)",
  ].join(","),
  backgroundSize: "auto, auto, 400px 400px",
  backgroundRepeat: "no-repeat, no-repeat, repeat",
};

/**
 * A push pin, seen from slightly above: coloured head with a highlight, a
 * metal collar, and a shadow thrown down onto the photo.
 */
function Pin({ color, left }: { color: string; left: string }) {
  return (
    <span
      aria-hidden="true"
      className="absolute top-[-11px] z-30 h-[22px] w-[22px] -translate-x-1/2"
      style={{ left }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0 8%, rgba(255,255,255,0.45) 18%, ${color} 46%, ${color} 62%, rgba(0,0,0,0.55) 100%)`,
          boxShadow:
            "0 4px 7px rgba(50,25,8,0.5), 0 1px 0 rgba(255,255,255,0.35) inset, 0 -2px 4px rgba(0,0,0,0.3) inset",
        }}
      />
      <span
        className="absolute left-1/2 top-[13px] h-[7px] w-[7px] -translate-x-1/2 rounded-[2px]"
        style={{
          background: "linear-gradient(180deg, #e8e8ea, #9a9aa0)",
          boxShadow: "0 2px 3px rgba(50,25,8,0.45)",
        }}
      />
    </span>
  );
}

export default function ProofBand() {
  const { t } = useLocale();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

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
    // overflow-hidden keeps tape that hangs off a tile from widening the page
    <section
      id="proof"
      className="relative overflow-hidden px-4 py-12 md:px-10 md:py-16"
      style={corkStyle}
    >
      {/* board edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 0 10px rgba(120,74,34,0.55), inset 0 0 40px rgba(70,38,12,0.45), inset 0 8px 24px rgba(0,0,0,0.20)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {t.proof.label}
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-[#fffaf0] drop-shadow-[0_1px_2px_rgba(60,30,10,0.5)] md:text-4xl">
          {t.proof.heading}
        </h2>
        <p className="mt-3 max-w-xl text-base text-[#f6e6cf] md:text-lg">
          {t.proof.subheading}
        </p>

        <div className="mt-10 columns-2 gap-4 md:columns-3 md:gap-6 lg:columns-4">
          {proofMedia.map((item, i) => {
            const treatment = treatmentOf(i);
            const tilt = tiltOf(i);
            const key = item.kind === "reel" ? item.shortcode : item.src;
            const caption = item.kind === "reel" ? item.caption : null;
            const photoIndex =
              item.kind === "photo" ? photosOnly.findIndex((p) => p.src === item.src) : -1;

            // The paper under the photo. Ripped tiles get an irregular outline,
            // so their clip lives here and the pin stays outside it.
            const paperClass =
              treatment === "polaroid"
                ? "bg-[#fdfbf5] p-2 pb-9"
                : treatment === "ripped"
                  ? "bg-[#fdfbf5] p-[7px]"
                  : "";
            const paperStyle: React.CSSProperties =
              treatment === "ripped"
                ? { clipPath: RIPPED_CLIPS[i % RIPPED_CLIPS.length] }
                : {};

            const inner = (
              <>
                <Pin
                  color={PIN_COLORS[i % PIN_COLORS.length]}
                  left={PIN_X[i % PIN_X.length]}
                />

                <div
                  className={`relative w-full drop-shadow-[0_7px_10px_rgba(45,22,6,0.45)] ${paperClass}`}
                  style={paperStyle}
                >
                  <div
                    className={`relative ${item.kind === "reel" ? "aspect-[9/16]" : "aspect-square"} w-full overflow-hidden bg-zinc-200`}
                  >
                    <Image
                      src={item.kind === "reel" ? `/photos/reels/${item.shortcode}.jpeg` : item.src}
                      alt={item.kind === "reel" ? item.caption : item.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                    {item.kind === "reel" && (
                      <span className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900">
                        <Play size={15} weight="fill" />
                      </span>
                    )}
                    {caption && treatment !== "polaroid" && (
                      <p className="absolute inset-x-2 bottom-2 text-xs font-medium leading-snug text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        {caption}
                      </p>
                    )}
                  </div>

                  {caption && treatment === "polaroid" && (
                    <p
                      className="absolute inset-x-2 bottom-1.5 text-center text-[15px] leading-tight text-zinc-700"
                      style={{ fontFamily: "var(--font-caveat), var(--font-geist-sans), cursive" }}
                    >
                      {caption}
                    </p>
                  )}
                </div>
              </>
            );

            const shared = {
              className: "group relative mb-5 block w-full break-inside-avoid md:mb-7",
              style: { transform: `rotate(${tilt}deg)` } as React.CSSProperties,
              initial: { opacity: 0, y: 18 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-40px" },
              transition: { duration: 0.45, delay: (i % 4) * 0.05 },
              whileHover: reduceMotion ? undefined : { rotate: 0, scale: 1.03, zIndex: 30 },
            };

            return item.kind === "reel" ? (
              <motion.a
                key={key}
                href={`https://www.instagram.com/reel/${item.shortcode}/`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.caption} — ${t.proof.watchOnInstagram}`}
                {...shared}
              >
                {inner}
              </motion.a>
            ) : (
              <motion.button
                key={key}
                type="button"
                onClick={() => setLightbox(photoIndex)}
                aria-label={item.alt}
                {...shared}
              >
                {inner}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://www.instagram.com/koreansnextdoor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#fdfbf5] px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-[0_4px_10px_rgba(50,26,8,0.4)] transition-transform hover:-translate-y-0.5"
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
