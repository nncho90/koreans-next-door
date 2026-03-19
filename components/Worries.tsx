const bubbles = [
  { text: "I've been here 3 months and still don't have real friends... 😔", x: "left-[4%]", y: "top-[10%]" },
  { text: "Everyone speaks Korean so fast, I can't keep up 😰", x: "left-[30%]", y: "top-[4%]" },
  { text: "I miss home but I don't want to admit it 🥺", x: "right-[5%]", y: "top-[12%]" },
  { text: "Is it really this hard to make Korean friends? 🤔", x: "left-[8%]", y: "top-[52%]" },
  { text: "I don't know where to go on weekends... I just stay home 😞", x: "right-[8%]", y: "top-[45%]" },
];

const tags = [
  { emoji: "🏠", label: "Homesickness" },
  { emoji: "🗣️", label: "Language barrier" },
  { emoji: "👥", label: "Making friends" },
  { emoji: "🍽️", label: "Culture shock" },
  { emoji: "😔", label: "Loneliness" },
  { emoji: "📋", label: "Visa & admin" },
];

export default function Worries() {
  return (
    <section className="relative bg-white px-6 py-10 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          Sound familiar?
        </p>
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          Living abroad is hard.
        </h2>
        <p className="mb-12 text-center text-lg text-gray-500">
          You&apos;re not the only one who feels this way.
        </p>

        {/* Floating bubbles container */}
        <div className="relative mx-auto h-72 max-w-4xl md:h-80">
          {bubbles.map((b, i) => (
            <div
              key={i}
              className={`absolute ${b.x} ${b.y} max-w-[220px] rounded-2xl bg-[#ede9ff] px-4 py-3 text-sm font-medium leading-snug text-[#3d3470] shadow-sm md:max-w-[260px] md:text-base`}
            >
              {b.text}
              <span className="absolute -bottom-2 left-5 h-3 w-3 rotate-45 bg-[#ede9ff]" />
            </div>
          ))}

          {/* Central anchor emoji */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl select-none">
            🌏
          </div>
        </div>

        {/* Tag pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {tags.map((t) => (
            <span
              key={t.label}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-[#1a1a1a] shadow-sm"
            >
              {t.emoji} {t.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
