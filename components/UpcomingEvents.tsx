"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";
import type { PastEvent } from "@/app/api/luma/past/route";

const KAKAO_URL = "https://open.kakao.com/o/gWb1KOci";
const LUMA_URL = "https://lu.ma/koreansnextdoor";

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
  const [tab, setTab] = useState<"upcoming" | "past" | null>(null);
  const [past, setPast] = useState<PastEvent[] | null>(null);
  const [upcoming, setUpcoming] = useState<PastEvent[] | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/api/luma/upcoming")
        .then((r) => r.json())
        .then((d) => (Array.isArray(d?.events) ? (d.events as PastEvent[]) : []))
        .catch(() => [] as PastEvent[]),
      fetch("/api/luma/past")
        .then((r) => r.json())
        .then((d) => (Array.isArray(d?.events) ? (d.events as PastEvent[]) : []))
        .catch(() => [] as PastEvent[]),
    ]).then(([up, ps]) => {
      if (!active) return;
      setUpcoming(up);
      setPast(ps);
      setTab(up.length > 0 ? "upcoming" : "past");
    });
    return () => {
      active = false;
    };
  }, []);

  const decided = tab !== null;

  const tabs = [
    { key: "upcoming" as const, label: t.upcoming.tabUpcoming },
    { key: "past" as const, label: t.upcoming.tabPast },
  ];

  return (
    <section id="upcoming" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
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

        {!decided ? (
          <EventsSkeleton />
        ) : tab === "upcoming" ? (
          upcoming && upcoming.length > 0 ? (
            <EventsList events={upcoming} locale={locale} />
          ) : (
            <UpcomingEmpty t={t} />
          )
        ) : (
          <PastList events={past} locale={locale} />
        )}
      </div>
    </section>
  );
}

function EventsSkeleton() {
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

function UpcomingEmpty({ t }: { t: ReturnType<typeof useLocale>["t"] }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4c2] text-2xl">
        📅
      </div>
      <h3 className="mb-2 text-xl font-bold text-[#1a1a1a]">
        {t.upcoming.emptyHeading}
      </h3>
      <p className="mx-auto mb-6 max-w-md text-base leading-relaxed text-gray-500">
        {t.upcoming.emptyBody}
      </p>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[#ffd966] px-6 py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[#f5cd4a]"
        >
          {t.upcoming.emptyKakao}
        </a>
        <a
          href={LUMA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-zinc-50"
        >
          {t.upcoming.emptyLuma}
        </a>
      </div>
    </div>
  );
}

function PastList({
  events,
  locale,
}: {
  events: PastEvent[] | null;
  locale: string;
}) {
  if (events === null) return <EventsSkeleton />;
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center text-gray-500">
        No past events to show yet.
      </div>
    );
  }
  return <EventsList events={events} locale={locale} />;
}

function EventsList({
  events,
  locale,
}: {
  events: PastEvent[];
  locale: string;
}) {
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
              <h3 className="line-clamp-2 text-base font-bold text-[#1a1a1a] sm:text-lg">
                {e.name}
              </h3>
              {e.location && (
                <p className="line-clamp-2 text-sm text-gray-500">{e.location}</p>
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
