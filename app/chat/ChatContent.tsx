"use client";

import { LocaleProvider } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";

const KAKAO_URL = "https://open.kakao.com/o/gWb1KOci";
const INSTAGRAM_URL = "https://www.instagram.com/koreansnextdoor/";
const LUMA_URL = "https://lu.ma/koreansnextdoor";

const INTRO_PROMPTS = [
  {
    label: "Your name & where you're from",
    example: "Alex, originally from Toronto 🇨🇦",
  },
  {
    label: "How long you've been in Korea",
    example: "here about 3 months, teaching English in Mapo",
  },
  {
    label: "What you're into",
    example: "hiking, trying new restaurants, terrible at Korean but trying",
  },
  {
    label: "What you're hoping to find here",
    example: "language exchange partners and weekend hiking buddies",
  },
];

type Rule = {
  icon: string;
  title: string;
  note?: string;
  chipClass: string;
  items: string[];
};

const RULES: Rule[] = [
  {
    icon: "✅",
    title: "Share freely",
    note: "No approval needed",
    chipClass: "bg-emerald-50 text-emerald-700",
    items: [
      "Free community events, meetups, and resources helpful to foreigners in Korea",
      "Practical info: visa help, housing tips, hospitals with English service, etc.",
      "Things you have no personal business or financial stake in",
    ],
  },
  {
    icon: "💬",
    title: "Ask staff first",
    note: "DM any staff member before posting",
    chipClass: "bg-amber-50 text-amber-700",
    items: [
      "Anything you organize, host, sell, or benefit from (even if free, since free events are often a funnel to paid ones)",
      "Paid classes, services, products, or events",
      "Fundraisers or donation requests",
    ],
  },
  {
    icon: "🚫",
    title: "Not allowed",
    chipClass: "bg-red-50 text-red-600",
    items: [
      "Religious, ideological, or political recruitment of any kind. KND welcomes all faiths and backgrounds, and our chat is not a place to recruit for any group, including our own church",
      "Multi-level marketing, crypto or investment schemes",
      "Repeated promotion. As a guideline: one approved promo per person per month",
    ],
  },
];

function Inner() {
  return (
    <>
      <SharedNavbar />
      <main className="bg-[#fafaf8] pt-28">
        <section className="px-6 pb-16 md:px-12">
          <div className="mx-auto max-w-3xl">
            {/* Intro */}
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
              KND group chat
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
              Welcome! Let&rsquo;s get to know you
            </h1>
            <p className="mb-2 text-lg leading-relaxed text-gray-600">
              Hey neighbors :)
            </p>
            <p className="mb-12 max-w-2xl text-lg leading-relaxed text-gray-600">
              This chat only works if we actually know who&rsquo;s in it. So
              before anything else, do one thing:
            </p>

            {/* PRIMARY: introduce yourself */}
            <div className="mb-16 rounded-2xl border-2 border-[#f5c842] bg-white p-8 shadow-sm md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff4c2] text-2xl"
                  aria-hidden="true"
                >
                  👋
                </span>
                <h2 className="text-2xl font-bold text-[#1a1a1a] md:text-3xl">
                  Introduce yourself
                </h2>
              </div>
              <p className="mb-6 text-base leading-relaxed text-gray-600">
                Once you&rsquo;re in, drop a quick hello. It&rsquo;s the
                fastest way to go from stranger to neighbor. Four things to
                cover:
              </p>
              <ol className="mb-8 space-y-4">
                {INTRO_PROMPTS.map((prompt, i) => (
                  <li key={prompt.label} className="flex gap-4">
                    <span
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-sm font-bold text-white"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <p className="text-base leading-relaxed text-[#1a1a1a]">
                      <span className="font-semibold">{prompt.label}</span>
                      <span className="text-gray-500">
                        {" "}
                        (e.g. {prompt.example})
                      </span>
                    </p>
                  </li>
                ))}
              </ol>
              <div className="rounded-xl bg-[#fafaf8] p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Example
                </p>
                <p className="text-base leading-relaxed text-gray-600 italic">
                  &ldquo;Hi everyone! I&rsquo;m Alex, from Toronto. I&rsquo;ve
                  been in Seoul about 3 months teaching English in Mapo. I
                  love hiking and trying new restaurants, and my Korean is
                  still pretty rough (열심히 배우는 중이에요 😅). Would love to
                  meet people for language exchange and weekend hikes!&rdquo;
                </p>
              </div>
            </div>

            {/* SECONDARY: guidelines, led with warmth not policy */}
            <div className="mb-8 border-t border-zinc-200 pt-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Also good to know
              </p>
              <h2 className="mb-4 text-2xl font-bold text-[#1a1a1a]">
                Be loving. Use common sense.
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-gray-500">
                That&rsquo;s genuinely the whole guideline. We&rsquo;re a
                group of neighbors, not a company.
              </p>
            </div>

            <div className="mb-8 rounded-xl bg-white p-6 shadow-sm md:p-8">
              <p className="mb-5 max-w-2xl text-sm leading-relaxed text-gray-500">
                The one place we ask for a little more care is sharing and
                promotion. Chats get chaotic fast when everyone&rsquo;s
                pitching something, so here&rsquo;s the short version:
              </p>
              <div className="space-y-5">
                {RULES.map((rule) => (
                  <div key={rule.title}>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${rule.chipClass}`}
                        aria-hidden="true"
                      >
                        {rule.icon}
                      </span>
                      <h3 className="text-base font-bold text-[#1a1a1a]">
                        {rule.title}
                      </h3>
                      {rule.note && (
                        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-500">
                          {rule.note}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1.5 pl-1">
                      {rule.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-sm leading-relaxed text-gray-600"
                        >
                          <span
                            className="mt-[0.5em] h-1 w-1 flex-shrink-0 rounded-full bg-[#f5c842]"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16 space-y-3 text-sm leading-relaxed text-gray-500">
              <p>
                <span className="font-semibold text-[#1a1a1a]">
                  New here?
                </span>{" "}
                Join a couple of events before promoting anything, even
                something great, so we actually get to know you first.
              </p>
              <p>
                <span className="font-semibold text-[#1a1a1a]">
                  If something&rsquo;s off,
                </span>{" "}
                a staff member will just message you privately, no shame, no
                drama.
                We assume good intentions; most people just don&rsquo;t know
                the norms yet.
              </p>
            </div>

            {/* Stay connected */}
            <div className="border-t border-zinc-200 pt-10 text-center">
              <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-zinc-400">
                Stay connected
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={KAKAO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#ffd966] px-6 py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[#f5cd4a]"
                >
                  KakaoTalk chat
                </a>
                <a
                  href={LUMA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-zinc-50"
                >
                  Luma events
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-zinc-50"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
    </>
  );
}

export default function ChatContent() {
  return (
    <LocaleProvider>
      <Inner />
    </LocaleProvider>
  );
}
