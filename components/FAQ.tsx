"use client";

import { useState, type ReactNode } from "react";
import { Plus, Minus } from "@phosphor-icons/react";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Is this a religious group?",
    a: <>Our core members are from <a href="https://seetheglory.or.kr/aboutChurch" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">Sigwang Church</a>, but our events have nothing to do with religion. Everyone is welcome regardless of faith, background, or where you&apos;re from. There&apos;s no agenda here, we just like meeting people.</>,
  },
  {
    q: "Do I need to speak Korean to join?",
    a: "Nope. A lot of us are still learning too. Events are bilingual — English and Korean — and our language exchange nights are open to total beginners. No pressure at all.",
  },
  {
    q: "Are there any fees or membership requirements?",
    a: "Nothing. No fees, no forms, no commitment. Just show up to an event and see if you vibe with it.",
  },
  {
    q: "How do I find out about upcoming events?",
    a: <>Check our <a href="https://lu.ma/koreansnextdoor" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">Luma page</a> for what&apos;s coming up, or join our <a href="https://open.kakao.com/o/gWb1KOci" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">KakaoTalk open chat</a> where we usually post things first.</>,
  },
  {
    q: "Who organizes KND?",
    a: "A small group of friends from Sigwang Church. We've all lived abroad at some point and know how weird and lonely it can feel at first. We just wanted to be the kind of neighbors we wished we had.",
  },
  {
    q: "Can I bring a friend?",
    a: "Please do. The more the merrier.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#fafaf8] px-6 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">

        <div className="grid grid-cols-1 gap-16 md:grid-cols-[2fr_3fr]">
          {/* Left: label + heading */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              Questions
            </p>
            <h2 className="text-4xl font-bold leading-none tracking-tighter text-zinc-950 md:text-5xl">
              Things people ask
            </h2>
          </div>

          {/* Right: accordion */}
          <div className="divide-y border-t border-zinc-200">
            {faqs.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-zinc-950">
                    {item.q}
                  </span>
                  {open === i ? (
                    <Minus size={16} weight="bold" className="shrink-0 text-zinc-400" />
                  ) : (
                    <Plus size={16} weight="bold" className="shrink-0 text-zinc-400" />
                  )}
                </button>
                {open === i && (
                  <p className="pb-6 text-base leading-relaxed text-zinc-500">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
