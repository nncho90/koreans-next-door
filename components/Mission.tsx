const pillars = [
  {
    icon: "🏘️",
    title: "Just neighbors",
    body: "Not a formal organization or a tour agency. Just a group of friends who believe hospitality turns an unfamiliar city into a familiar home.",
  },
  {
    icon: "🌍",
    title: "Open to everyone",
    body: "Our core members are from Sigwang Church, but our events are not religious. All faiths, backgrounds, and walks of life are warmly welcomed.",
  },
  {
    icon: "💛",
    title: "No hidden agendas",
    body: "We haven't forgotten how it feels to be welcomed in a foreign country. We just want to be those neighbors to you.",
  },
];

export default function Mission() {
  return (
    <section id="mission" className="bg-white px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          Who we are
        </p>
        <h2 className="mb-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#1a1a1a] md:text-5xl">
          Moving to a new country is exciting.{" "}
          <span className="text-[#ffd966]">But it can also be lonely.</span>
        </h2>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-500">
          We know what it&apos;s like to not feel at home in a foreign land —
          to feel like you don&apos;t quite belong.<br className="hidden md:block" /> We also haven&apos;t
          forgotten how it feels to be welcomed.<br className="hidden md:block" /> Our mission is simple: walk
          alongside you so we can all feel at home.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="flex flex-col gap-3">
              <span className="text-3xl">{p.icon}</span>
              <h3 className="text-lg font-bold text-[#1a1a1a]">{p.title}</h3>
              <p className="text-base leading-relaxed text-gray-500">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
