"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export type StackPhoto = { src: string; alt: string };

/**
 * A pile of tilted polaroids, echoing the cork pinboard further down the page.
 * Click or tap sends the top photo to the back; hovering fans the pile out a
 * little; when nobody touches it, it advances by itself every few seconds so
 * the other photos still get seen.
 *
 * Tilts and offsets are fixed per slot (never random) so server and client
 * render the same markup.
 */
const SLOTS = [
  { rotate: -3, x: 0, y: 0 },
  { rotate: 5, x: 14, y: -6 },
  { rotate: -7, x: -16, y: 6 },
  { rotate: 8, x: 8, y: 12 },
  { rotate: -5, x: -6, y: -12 },
];

const AUTO_MS = 5000;

export default function PhotoStack({ photos, label }: { photos: StackPhoto[]; label: string }) {
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const [hover, setHover] = useState(false);
  const reduceMotion = useReducedMotion();

  const advance = useCallback(() => {
    setOrder((o) => (o.length > 1 ? [...o.slice(1), o[0]] : o));
  }, []);

  useEffect(() => {
    if (reduceMotion || hover || photos.length < 2) return;
    const id = setInterval(advance, AUTO_MS);
    return () => clearInterval(id);
  }, [advance, hover, reduceMotion, photos.length]);

  return (
    <button
      type="button"
      onClick={advance}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`${label}: next photo`}
      className="relative block aspect-[5/4] w-full cursor-pointer overflow-hidden bg-[#efe8da] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a800]"
    >
      {order.map((photoIndex, slot) => {
        const photo = photos[photoIndex];
        const base = SLOTS[Math.min(slot, SLOTS.length - 1)];
        // Fan: the deeper the card, the further it slides out from under the top one.
        const fan = hover && !reduceMotion ? slot * 10 : 0;
        return (
          <div
            key={photo.src}
            className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: photos.length - slot }}
          >
            <motion.div
              initial={false}
              animate={{
                rotate: base.rotate + (hover ? slot * 1.5 : 0),
                x: base.x + (slot % 2 === 0 ? -fan : fan),
                y: base.y,
                scale: 1 - slot * 0.03,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 24 }
              }
              className="bg-white p-2 pb-7 shadow-[0_10px_24px_rgba(50,35,10,0.22)]"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-200">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 200px, 60vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        );
      })}
    </button>
  );
}
