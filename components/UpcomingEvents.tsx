"use client";

import { useLocale } from "@/lib/i18n";

export default function UpcomingEvents() {
  const { t } = useLocale();
  return (
    <section id="upcoming" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {t.upcoming.label}
        </p>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {t.upcoming.heading}
        </h2>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-500">
          {t.upcoming.subheading}
        </p>

        <div className="overflow-hidden rounded-2xl border border-zinc-200">
          <iframe
            src="https://luma.com/embed/calendar/cal-J0zAgLYj8iOqzD1/events?compact=true&amp;lt=light"
            width="100%"
            height="450"
            style={{ border: "none" }}
            title="Upcoming KND Events"
            allowFullScreen
            aria-hidden={false}
            tabIndex={0}
          />
        </div>
      </div>
    </section>
  );
}
