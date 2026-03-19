const events = [
  {
    emoji: "🥢",
    type: "Cultural Exchange",
    title: "Seollal 떡국 Party",
    description:
      "We made dumplings together, shared a bowl of tteokguk, and played Yut Nori — celebrating Korean New Year with new friends.",
  },
  {
    emoji: "⛰️",
    type: "Nature & Adventure",
    title: "Night Hike to Gwanaksan",
    description:
      "We laced up our shoes and headed up 관악산 after dark — Seoul sparkling below us and good company all around.",
  },
  {
    emoji: "🗣️",
    type: "Language Exchange",
    title: "Language Exchange Nights",
    description:
      "Practicing Korean and English over group games, laughs, and the occasional awkward grammar mistake. Everyone's welcome, no fluency required.",
  },
  {
    emoji: "☕",
    type: "Casual Hangouts",
    title: "Coffee & Conversation",
    description:
      "Sometimes it's just grabbing coffee, good food, and having real conversations. No agenda — just people getting to know each other.",
  },
];

export default function Events() {
  return (
    <section id="events" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          What we do
        </p>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          Things we&apos;ve done together
        </h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          We&apos;re still figuring it out as we go — and that&apos;s part of
          the fun.<br className="hidden md:block" /> Here&apos;s a taste of what you can expect.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((e) => (
            <div
              key={e.title}
              className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="mb-4 block text-4xl">{e.emoji}</span>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#ffd966]">
                {e.type}
              </p>
              <h3 className="mb-3 text-xl font-bold text-[#1a1a1a]">
                {e.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-500">
                {e.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
