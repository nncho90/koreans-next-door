"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import PhotoStack, { type StackPhoto } from "@/components/home/PhotoStack";

/**
 * Photos for each category card. They are not translated, so they live here
 * and match the card by index; every locale lists the three cards in the
 * same order (holidays and culture, language and study, hangouts and play).
 * First photo in each list is the one on top of the pile.
 */
const CARD_STACKS: StackPhoto[][] = [
  [
    { src: "/photos/knd-21.jpeg", alt: "Around sixty KND neighbors and Weave Suites residents making finger hearts after the Chuseok songpyeon party" },
    { src: "/photos/knd-20.jpeg", alt: "Neighbors in gloves shaping green, white and yellow songpyeon dough at the KND Chuseok party" },
    { src: "/photos/knd-02.jpeg", alt: "Community members making dumplings at KND Seollal tteokguk party" },
    { src: "/photos/knd-04.jpeg", alt: "KND members playing Yut Nori together at Seollal celebration" },
    { src: "/photos/knd-17.jpeg", alt: "KND neighbors sitting in a circle on the grass at sunset outside the Seoul Museum of History" },
  ],
  [
    { src: "/photos/knd-10.jpeg", alt: "Huge KND language exchange group of around sixty neighbors waving together" },
    { src: "/photos/knd-05.jpeg", alt: "Language exchange event with Korean and international participants" },
    { src: "/photos/knd-13.jpeg", alt: "KND neighbors laughing together at a balloon party in Seoul" },
    { src: "/photos/knd-03.jpeg", alt: "International community gathering at Koreans Next Door Seoul" },
  ],
  [
    { src: "/photos/knd-11.jpeg", alt: "KND neighbors sharing a Korean BBQ dinner and flashing peace signs around the table" },
    { src: "/photos/knd-15.jpeg", alt: "KND neighbors posing with paddles on an indoor pickleball court in Seoul" },
    { src: "/photos/knd-14.jpeg", alt: "KND friends holding up board games at a board game cafe in Seoul" },
    { src: "/photos/knd-16.jpeg", alt: "KND hikers gathered on a rocky peak above Seoul in September 2026" },
    { src: "/photos/knd-09.jpeg", alt: "KND group photo outside 天下一麵 restaurant in Seoul" },
  ],
];

export default function Events() {
  const { t } = useLocale();
  return (
    <section id="events" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl break-keep">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
          {t.events.label}
        </p>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {t.events.heading}
        </h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          {t.events.subheading}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {t.events.cards.map((e, i) => {
            const stack = CARD_STACKS[i % CARD_STACKS.length];
            return (
              <div
                key={e.title}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative">
                  <PhotoStack photos={stack} label={e.title} />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow-sm"
                  >
                    {e.emoji}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#c9a800]">
                    {e.type}
                  </p>
                  <h3 className="mb-3 text-xl font-bold text-[#1a1a1a]">
                    {e.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-500">
                    {e.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {e.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 border-t border-zinc-200 pt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {t.events.partnerLabel}
          </p>
          <a
            href="https://www.weave-living.com"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 transition-opacity hover:opacity-100"
          >
            <Image
              src="/weave-suites-logo.png"
              alt="Weave Suites Sunyu Parkside"
              width={900}
              height={1028}
              className="h-24 w-auto"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
