import type { ReactNode } from "react";

export type ToolFaqItem = {
  q: string;
  a: ReactNode;
};

type Props = {
  eyebrow: string;
  heading: string;
  intro: string;
  items: ToolFaqItem[];
};

export default function ToolFaqSection({ eyebrow, heading, intro, items }: Props) {
  return (
    <section className="bg-white px-6 pb-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
          {eyebrow}
        </p>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-3xl text-zinc-500">{intro}</p>

        <div className="mt-8 space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-zinc-200 bg-[#fafaf8] px-5 py-4"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-zinc-950">
                {item.q}
              </summary>
              <div className="mt-3 text-sm leading-7 text-zinc-600">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
