"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Play, InstagramLogo, PushPin } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";
import type { PublicReview } from "@/lib/reviews";
import { proofMedia, photosOnly } from "./proofMedia";
import ReviewNote from "./ReviewNote";
import AddReviewModal from "./AddReviewModal";

/**
 * The photos and reels as a cork pinboard: masonry columns, nothing uniform,
 * every tile pinned, taped or torn.
 *
 * Every visual variation below is derived from the item's index, never from
 * Math.random, so the server and the client render the same HTML. A random
 * tilt here would throw a hydration error on every load.
 */

type Treatment = "polaroid" | "taped";

const TREATMENTS: Treatment[] = ["polaroid", "taped", "polaroid", "taped", "taped"];
const TILTS = [-4.5, 2.5, -1.5, 3.5, -2.5, 1.5, -3.5, 4.5, -0.8, 2.8, -5, 1.2];

function tiltOf(i: number) {
  return TILTS[i % TILTS.length];
}

function treatmentOf(i: number): Treatment {
  return TREATMENTS[i % TREATMENTS.length];
}

/** Cork003 from ambientCG, CC0, a seamless 700px tile. */
const corkStyle: React.CSSProperties = {
  backgroundColor: "#c08b52",
  backgroundImage: [
    "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(255,240,215,0.28), transparent 70%)",
    "radial-gradient(ellipse 70% 60% at 90% 115%, rgba(60,32,10,0.30), transparent 70%)",
    "url(/cork-texture.jpg)",
  ].join(","),
  backgroundSize: "auto, auto, 460px 460px",
  backgroundRepeat: "no-repeat, no-repeat, repeat",
};

function Tape({ corner }: { corner: "tl" | "br" }) {
  const pos =
    corner === "tl" ? "-left-4 -top-2 -rotate-[38deg]" : "-bottom-2 -right-4 -rotate-[38deg]";
  return (
    <span
      aria-hidden="true"
      className={`absolute z-20 h-6 w-16 bg-[rgba(255,247,214,0.72)] shadow-[0_1px_2px_rgba(60,30,10,0.25)] ${pos}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 3px, transparent 3px 7px)",
        maskImage:
          "linear-gradient(90deg, transparent 0, #000 4px, #000 calc(100% - 4px), transparent 100%)",
      }}
    />
  );
}

/** Media tiles plus submitted reviews, mixed so the board is not two blocks. */
type BoardItem =
  | { kind: "media"; index: number }
  | { kind: "review"; review: PublicReview }
  | { kind: "cta" };

function buildBoard(reviews: PublicReview[]): BoardItem[] {
  const items: BoardItem[] = [];
  // A review after every third photo keeps words and pictures interleaved.
  let r = 0;
  for (let i = 0; i < proofMedia.length; i++) {
    items.push({ kind: "media", index: i });
    if (i % 3 === 2 && r < reviews.length) {
      items.push({ kind: "review", review: reviews[r++] });
    }
  }
  while (r < reviews.length) items.push({ kind: "review", review: reviews[r++] });
  // The invitation sits early enough to be seen without scrolling the whole board.
  items.splice(Math.min(6, items.length), 0, { kind: "cta" });
  return items;
}

export default function ProofBand() {
  const { t } = useLocale();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data?.reviews)) setReviews(data.reviews);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

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
    // The board is an object sitting on the page, not a full-bleed band: the
    // off-white wall shows around it, and a wooden frame holds the cork.
    <section id="proof" className="bg-[#fafaf8] px-4 py-14 md:px-10 md:py-20">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[14px] p-4 shadow-[0_18px_40px_rgba(40,20,5,0.28)] md:p-8"
        style={{
          border: "14px solid #8a5a2e",
          borderImage:
            "linear-gradient(145deg, #a87243 0%, #7d4f27 35%, #9a6737 65%, #6d4320 100%) 1",
          ...corkStyle,
        }}
      >
        {/* the cork sits slightly recessed inside the frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow:
              "inset 0 0 26px rgba(70,38,12,0.40), inset 0 6px 16px rgba(0,0,0,0.22)",
          }}
        />

        <div className="relative">
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
          {buildBoard(reviews).map((slot, slotIndex) => {
            if (slot.kind === "cta") {
              return (
                <motion.button
                  key="cta"
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="group relative mb-5 block w-full break-inside-avoid md:mb-7"
                  style={{ transform: "rotate(-2deg)" }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45 }}
                  whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.03, zIndex: 30 }}
                >
                  <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 border-[3px] border-dashed border-[#fdfbf5]/70 bg-black/10 px-4 text-center drop-shadow-[0_7px_10px_rgba(45,22,6,0.4)]">
                    <PushPin size={28} weight="fill" className="text-[#ffd966]" />
                    <span className="text-base font-semibold text-[#fffaf0]">
                      {t.reviews.pinYours}
                    </span>
                  </div>
                </motion.button>
              );
            }

            if (slot.kind === "review") {
              const tilt = tiltOf(slotIndex);
              return (
                <motion.div
                  key={`review-${slot.review.id}`}
                  className="relative mb-5 block w-full break-inside-avoid md:mb-7"
                  style={{ transform: `rotate(${tilt}deg)` }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45 }}
                  whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.03, zIndex: 30 }}
                >
                  <Tape corner="tl" />
                  <ReviewNote review={slot.review} />
                </motion.div>
              );
            }

            const i = slot.index;
            const item = proofMedia[i];
            const treatment = treatmentOf(i);
            const tilt = tiltOf(i);
            const key = item.kind === "reel" ? item.shortcode : item.src;
            const caption = item.kind === "reel" ? item.caption : null;
            const photoIndex =
              item.kind === "photo" ? photosOnly.findIndex((p) => p.src === item.src) : -1;

            const paperClass = treatment === "polaroid" ? "bg-[#fdfbf5] p-2 pb-9" : "";

            const inner = (
              <>
                {treatment === "taped" && (
                  <>
                    <Tape corner="tl" />
                    <Tape corner="br" />
                  </>
                )}

                <div
                  className={`relative w-full drop-shadow-[0_7px_10px_rgba(45,22,6,0.45)] ${paperClass}`}
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
      </div>

      <AnimatePresence>
        {modalOpen && (
          <AddReviewModal
            onClose={() => setModalOpen(false)}
            onPublished={(review) => setReviews((list) => [review, ...list])}
          />
        )}
      </AnimatePresence>

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
