"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";

interface FAQItem {
  q: string;
  a: string;
}

interface GuideFAQProps {
  faqs: FAQItem[];
  titleEn?: string;
  titleKo?: string;
  isKo: boolean;
}

export default function GuideFAQ({ faqs, titleEn = "Frequently Asked Questions", titleKo = "자주 묻는 질문", isKo }: GuideFAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
          {isKo ? titleKo : titleEn}
        </h2>
        <div className="space-y-0 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 overflow-hidden">
          {faqs.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-zinc-50"
              >
                <span className="font-medium text-zinc-900 leading-snug">{item.q}</span>
                <span className="mt-0.5 shrink-0 text-zinc-400">
                  {open === i ? <Minus size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
                </span>
              </button>
              {open === i && (
                <div className="border-t border-zinc-100 bg-zinc-50 px-6 py-4">
                  <p className="text-sm leading-relaxed text-zinc-600">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
