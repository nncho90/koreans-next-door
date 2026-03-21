"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { getTestimonialQuotes } from "@/lib/i18n/rich";

export default function Testimonials() {
  const { t, locale } = useLocale();
  const quotes = getTestimonialQuotes(locale);

  return (
    <section className="bg-white px-6 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-5xl">

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {t.testimonials.label}
        </p>
        <h2 className="mb-10 text-4xl font-bold leading-none tracking-tighter text-zinc-950 md:text-5xl">
          {t.testimonials.heading}
        </h2>

        <div className="flex flex-col gap-8">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="flex flex-col gap-6 border-t border-zinc-100 pt-8 sm:flex-row sm:gap-8"
            >
              <div className="flex-shrink-0">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={q.photo}
                    alt={q.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-lg leading-relaxed text-zinc-700">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-bold text-zinc-950">{q.name}</p>
                  <p className="text-sm text-zinc-400">{q.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
