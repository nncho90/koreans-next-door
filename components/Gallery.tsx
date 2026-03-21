"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "@/lib/i18n";

const rotations = [-1.5, 2, -0.5, 1.8, -2, 1, -1.2, 2.1];

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
            <motion.div
              key={i}
              whileHover={{ rotate: rotations[i], y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-square w-full overflow-hidden rounded-xl"
            >
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
