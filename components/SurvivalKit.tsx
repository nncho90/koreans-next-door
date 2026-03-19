import { Train, Storefront, ChatDots, FirstAid, Warning, DeviceMobile } from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PhosphorIcon = FC<any>;

const categories: {
  Icon: PhosphorIcon;
  title: string;
  items: { name: string; note: string; href?: string }[];
}[] = [
  {
    Icon: Train,
    title: "Getting around",
    items: [
      { name: "Seoul Metro app", note: "Subway routes and real-time arrivals", href: "https://www.seoulmetro.co.kr/en/" },
      { name: "Kakao Map / Naver Map", note: "Navigation — better than Google Maps here", href: "https://map.kakao.com/" },
      { name: "T-money card", note: "Tap-and-go transit card, buy at any convenience store", href: "https://www.t-money.co.kr/" },
    ],
  },
  {
    Icon: Storefront,
    title: "Food & daily life",
    items: [
      { name: "Baemin (배달의민족)", note: "Most popular food delivery app", href: "https://www.baemin.com/" },
      { name: "Coupang Eats", note: "Fast delivery, often has promotions", href: "https://www.coupangeats.com/" },
      { name: "Daiso", note: "Everything you need for under ₩5,000", href: "https://www.daiso.co.kr/" },
    ],
  },
  {
    Icon: ChatDots,
    title: "Communication",
    items: [
      { name: "KakaoTalk", note: "How everyone in Korea communicates", href: "https://www.kakaocorp.com/page/service/service/KakaoTalk?lang=en" },
      { name: "Papago", note: "Best Korean ↔ English translation app", href: "https://papago.naver.com/" },
      { name: "Naver Dictionary", note: "Deep vocabulary and example sentences", href: "https://en.dict.naver.com/" },
    ],
  },
  {
    Icon: DeviceMobile,
    title: "Useful apps",
    items: [
      { name: "Naver (네이버)", note: "Korea's main search engine and maps", href: "https://www.naver.com/" },
      { name: "당근 (Karrot)", note: "Local marketplace and neighborhood app", href: "https://www.karrotmarket.com/" },
      { name: "Coupang", note: "Online shopping with next-day delivery", href: "https://www.coupang.com/" },
    ],
  },
  {
    Icon: FirstAid,
    title: "Healthcare",
    items: [
      { name: "Naver Maps → 약국", note: "Find the nearest pharmacy", href: "https://map.naver.com/" },
      { name: "GoodDoc / 1Health", note: "English-speaking doctor search", href: "https://www.goodoc.co.kr/" },
      { name: "National Health Insurance", note: "Register within 6 months of arrival", href: "https://www.nhis.or.kr/english/index.do" },
    ],
  },
  {
    Icon: Warning,
    title: "Emergency numbers",
    items: [
      { name: "112", note: "Police", href: "tel:112" },
      { name: "119", note: "Fire & ambulance", href: "tel:119" },
      { name: "1330", note: "Korea Tourism Helpline (English)", href: "https://english.visitkorea.or.kr/" },
    ],
  },
];

export default function SurvivalKit() {
  return (
    <section className="bg-white px-6 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          Seoul survival kit
        </p>
        <h2 className="mb-3 text-4xl font-bold leading-none tracking-tighter text-zinc-950 md:text-5xl">
          Things worth knowing
        </h2>
        <p className="mb-10 max-w-lg text-lg leading-relaxed text-zinc-400">
          A quick reference for getting settled in Seoul. Bookmark this.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ Icon, title, items }) => (
            <div key={title}>
              <div className="mb-4 flex items-center gap-3">
                <Icon size={20} weight="regular" className="text-[#ffd966]" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-950">
                  {title}
                </h3>
              </div>
              <ul className="space-y-3 border-t border-zinc-100 pt-4">
                {items.map((item) => (
                  <li key={item.name} className="flex flex-col gap-0.5">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("tel:") ? undefined : "_blank"}
                        rel={item.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                        className="text-sm font-semibold text-zinc-900 underline-offset-2 hover:underline hover:text-[#c9a800] transition-colors"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-zinc-900">{item.name}</span>
                    )}
                    <span className="text-sm text-zinc-400">{item.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
