"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, InstagramLogo } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";

const rotations = [-1.5, 2, -0.8, 1.6, -2, 1.2];

const reels = [
  {
    shortcode: "DadMLWkTdKo",
    caption: "POV: you found your community in Seoul",
    date: "Jul 2026",
  },
  {
    shortcode: "DZnHl12TWny",
    caption: "A reason to look forward to Mondays",
    date: "Jun 2026",
  },
  {
    shortcode: "Dah8tW4TA-Q",
    caption: "Wednesday work and study session",
    date: "Jul 2026",
  },
  {
    shortcode: "DYxIckNTbD-",
    caption: "Suwon day trip, hanok group photo",
    date: "May 2026",
  },
  {
    shortcode: "DYfbiwLz5Il",
    caption: "Han River night, these moments are happiness",
    date: "May 2026",
  },
  {
    shortcode: "DVBmat4EnpR",
    caption: "Gwanaksan night hike over the Seoul skyline",
    date: "Feb 2026",
  },
];

export default function VideoWall() {
  const { t } = useLocale();

  return (
    <section id="reels" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
          {t.videoWall.label}
        </p>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {t.videoWall.heading}
        </h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          {t.videoWall.subheading}
        </p>

        {/* Mobile: horizontal snap-scroll. Desktop: grid */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-6">
          {reels.map((reel, i) => (
            <motion.a
              key={reel.shortcode}
              href={`https://www.instagram.com/koreansnextdoor/reel/${reel.shortcode}/`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ rotate: rotations[i], y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group w-[62vw] shrink-0 snap-start sm:w-[42vw] md:w-auto"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-zinc-200">
                <Image
                  src={`/photos/reels/${reel.shortcode}.jpeg`}
                  alt={reel.caption}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 30vw, 62vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Play badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm transition-transform group-hover:scale-110">
                    <Play size={20} weight="fill" className="ml-0.5 text-white" />
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium leading-snug text-[#1a1a1a]">
                {reel.caption}
              </p>
              <p className="text-xs text-gray-400">{reel.date}</p>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://www.instagram.com/koreansnextdoor/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-7 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-75"
          >
            <InstagramLogo size={20} weight="fill" />
            {t.videoWall.follow}
          </a>
        </div>
      </div>
    </section>
  );
}
