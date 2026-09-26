"use client";

import Image from "next/image";
import type { PublicReview } from "@/lib/reviews";

/**
 * A submitted review, pinned to the cork board. Without a photo it is an index
 * card in handwriting; with one it is a polaroid with the words underneath.
 *
 * Card colours are picked from the id so the same review always looks the same,
 * on the server and in the browser.
 */

const CARD_COLORS = ["#fdf6d8", "#f6ead4", "#fdf3ef", "#eef4e2", "#eef1fa"];

function pick<T>(list: T[], seed: string): T {
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n + seed.charCodeAt(i)) % 997;
  return list[n % list.length];
}

export default function ReviewNote({ review }: { review: PublicReview }) {
  const bg = pick(CARD_COLORS, review.id);
  const hand = { fontFamily: "var(--font-caveat), var(--font-geist-sans), cursive" };

  return (
    <div
      className="relative w-full drop-shadow-[0_7px_10px_rgba(45,22,6,0.45)]"
      style={{ backgroundColor: review.photoUrl ? "#fdfbf5" : bg }}
    >
      {review.photoUrl && (
        <div className="relative m-2 mb-0 aspect-square w-[calc(100%-1rem)] overflow-hidden bg-zinc-200">
          <Image
            src={review.photoUrl}
            alt={`Photo shared by ${review.name}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        </div>
      )}

      <div className={review.photoUrl ? "px-3 pb-3 pt-2" : "px-4 py-5"}>
        <p
          className={`text-zinc-800 ${review.photoUrl ? "text-[15px] leading-snug" : "text-[17px] leading-snug"}`}
          style={hand}
        >
          {review.text}
        </p>
        <p className="mt-3 text-[13px] font-semibold text-zinc-700">
          {review.name}
          <span className="font-normal text-zinc-500"> · {review.city}</span>
        </p>
        {review.handle && (
          <p className="text-[12px] text-zinc-400">@{review.handle}</p>
        )}
      </div>
    </div>
  );
}
