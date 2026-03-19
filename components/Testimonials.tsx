import Image from "next/image";
import { ReactNode } from "react";

const quotes: { quote: ReactNode; name: string; detail: string; photo: string }[] = [
  {
    quote: (
      <>
        When I first came to Korea I really struggled to speak the language because I was worried about making mistakes.{" "}
        <strong className="text-zinc-950">KND gave me the space to try</strong> and I&apos;ve become{" "}
        <strong className="text-zinc-950">bolder and more confident in my speaking</strong>, even if I do still make mistakes.{" "}
        I am thankful for this community of people.
      </>
    ),
    name: "Raychel",
    detail: "Chicago, USA",
    photo: "/photos/testimonial-raychel.png",
  },
  {
    quote: (
      <>
        I didn&apos;t expect to find a community like this, but{" "}
        <strong className="text-zinc-950">KND made settling into Seoul feel so much easier</strong> and helped me meet a bunch of new friends through fun activities and delicious meals! Everyone was genuinely kind, welcoming, and so easy to talk to, and{" "}
        <strong className="text-zinc-950">connections formed really organically</strong>. It&apos;s one of those spaces that quietly yet quickly{" "}
        <strong className="text-zinc-950">makes a new city feel like home</strong>.
      </>
    ),
    name: "Amy Izatti",
    detail: "Wellington, New Zealand",
    photo: "/photos/testimonial-amy.png",
  },
  {
    quote: (
      <>
        It was 6 months since I moved to Seoul from Canada, and I was longing for a sense of community. I saw a lot of other group events but they were all paid or seemed out of reach.{" "}
        <strong className="text-zinc-950">Took a chance at KND and although I&apos;m not Christian I felt welcomed</strong> and I love the diversity of their meetups! Everyone is so kind and{" "}
        <strong className="text-zinc-950">I met great people through KND</strong>.
      </>
    ),
    name: "Sammi",
    detail: "Toronto, Canada",
    photo: "/photos/testimonial-sammi.png",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-6 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-5xl">

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          From our neighbors
        </p>
        <h2 className="mb-10 text-4xl font-bold leading-none tracking-tighter text-zinc-950 md:text-5xl">
          What people say
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
