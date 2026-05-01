"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";
import type { PastEvent } from "@/app/api/luma/past/route";

const CAL_ID = "cal-J0zAgLYj8iOqzD1";
const UPCOMING_SRC = `https://luma.com/embed/calendar/${CAL_ID}/events?compact=true&lt=light`;

function formatDate(iso: string, timezone: string | undefined, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: timezone || "Asia/Seoul",
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

export default function UpcomingEvents() {
  const { t, locale } = useLocale();
  const [tab, setTab] = useState<"upcoming" | "past">("past");
  const [past, setPast] = useState<PastEvent[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (past !== null) return;
    fetch("/api/luma/past")
      .then((r) => r.json())
      .then((d) => setPast(Array.isArray(d?.events) ? d.events : []))
      .catch(() => setPast([]))
      .finally(() => setLoading(false));
  }, [past]);

  const tabs = [
    { key: "past" as const, label: t.upcoming.tabPast },
    { key: "upcoming" as const, label: t.upcoming.tabUpcoming },
  ];

  return (
    <section id="upcoming" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {t.upcoming.label}
        </p>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {t.upcoming.heading}
        </h2>
        <p className="mb-6 max-w-xl text-lg leading-relaxed text-gray-500">
          {t.upcoming.subheading}
        </p>

        <div
          role="tablist"
          aria-label={t.upcoming.heading}
          className="mb-4 inline-flex rounded-full border border-zinc-200 bg-white p-1"
        >
          {tabs.map((tb) => {
            const active = tab === tb.key;
            return (
              <button
                key={tb.key}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setTab(tb.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-[#1a1a1a] text-white"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {tb.label}
              </button>
            );
          })}
        </div>

        {tab === "upcoming" ? (
          <div className="overflow-hidden rounded-2xl border border-zinc-200">
            <iframe
              src={UPCOMING_SRC}
              width="100%"
              height="450"
              style={{ border: "none" }}
              title={t.upcoming.tabUpcoming}
              allowFullScreen
              tabIndex={0}
            />
          </div>
        ) : (
          <PastEventsList events={past} loading={loading} locale={locale} />
        )}
      </div>
    </section>
  );
}

function PastEventsList({
  events,
  loading,
  locale,
}: {
  events: PastEvent[] | null;
  loading: boolean;
  locale: string;
}) {
  if (loading || events === null) {
    return (
      <ul className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="flex items-center gap-6 p-4">
            <div className="h-3 w-20 flex-shrink-0 animate-pulse rounded bg-zinc-100" />
            <div className="h-4 flex-1 animate-pulse rounded bg-zinc-100" />
          </li>
        ))}
      </ul>
    );
  }
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center text-gray-500">
        No past events to show yet.
      </div>
    );
  }
  return (
    <ul className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      {events.map((e) => (
        <li key={e.id}>
          <a
            href={e.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-6 px-5 py-4 transition-colors hover:bg-zinc-50"
          >
            <p className="w-24 flex-shrink-0 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400 sm:w-28 sm:text-sm">
              {formatDate(e.startAt, e.timezone, locale)}
            </p>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-bold text-[#1a1a1a] sm:text-lg">
                {e.name}
              </h3>
              {e.location && (
                <p className="truncate text-sm text-gray-500">{e.location}</p>
              )}
            </div>
            <svg
              className="hidden h-4 w-4 flex-shrink-0 text-zinc-300 transition-all group-hover:translate-x-0.5 group-hover:text-zinc-500 sm:block"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
