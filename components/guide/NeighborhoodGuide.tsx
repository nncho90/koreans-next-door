"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "@/lib/i18n";
import type { MapNeighborhood } from "./SeoulMap";

type FriendlyLevel = 1 | 2 | 3;

interface Neighborhood extends MapNeighborhood {
  rentRange: string;
  bestFor: { en: string[]; ko: string[] };
  landmarks: string[];
  description: { en: string; ko: string };
}

const COLORS: Neighborhood["color"][] = [
  { fill: "#fca5a5", border: "#ef4444", text: "#b91c1c" }, // red
  { fill: "#c4b5fd", border: "#8b5cf6", text: "#6d28d9" }, // violet
  { fill: "#93c5fd", border: "#3b82f6", text: "#1d4ed8" }, // blue
  { fill: "#6ee7b7", border: "#10b981", text: "#047857" }, // emerald
  { fill: "#5eead4", border: "#14b8a6", text: "#0f766e" }, // teal
  { fill: "#fda4af", border: "#f43f5e", text: "#be123c" }, // rose
  { fill: "#fcd34d", border: "#f59e0b", text: "#b45309" }, // amber
  { fill: "#86efac", border: "#22c55e", text: "#15803d" }, // green
];

const neighborhoods: Neighborhood[] = [
  {
    name: "Itaewon / Yongsan",
    korean: "이태원·용산",
    emoji: "🌍",
    guName: "용산구",
    color: COLORS[0],
    lat: 37.5340, lng: 126.9947,
    vibe: { en: "The foreigner capital of Seoul", ko: "서울의 외국인 수도" },
    rentRange: "₩900K–1.6M/mo",
    bestFor: { en: ["Expats", "Nightlife", "International food"], ko: ["외국인", "나이트라이프", "국제 음식"] },
    landmarks: ["Hamilton Hotel", "Gyeongnidan-gil", "Haebangchon (HBC)"],
    foreignerFriendly: 3,
    description: {
      en: "The most internationally diverse neighborhood in Seoul. English menus everywhere, halal food, international grocery stores, and a massive expat community. It's noisy, chaotic, and genuinely fun. Ideal starting point for new arrivals. Easy to make international friends here.",
      ko: "서울에서 외국인이 가장 많은 동네예요. 영문 메뉴, 할랄 음식, 외국 식료품점이 즐비하고 외국인 커뮤니티가 활발해요. 새로 온 분들에게 최적의 출발지예요.",
    },
  },
  {
    name: "Hongdae",
    korean: "홍대",
    emoji: "🎨",
    guName: "마포구",
    color: COLORS[1],
    lat: 37.5564, lng: 126.9240,
    vibe: { en: "Young, artsy, always buzzing", ko: "젊고 활기찬 예술의 거리" },
    rentRange: "₩700K–1.2M/mo",
    bestFor: { en: ["Students", "Creatives", "Nightlife"], ko: ["학생", "크리에이터", "나이트라이프"] },
    landmarks: ["Hongik University", "Yeonnam-dong", "Sangsu-dong"],
    foreignerFriendly: 3,
    description: {
      en: "Student area near Hongik University, packed with indie cafes, street art, live music, and clubs. Very lively on weekends. Neighboring Yeonnam-dong and Sangsu-dong are quieter but equally trendy.",
      ko: "홍익대학교 앞 젊고 활기찬 동네예요. 인디 카페, 거리 예술, 라이브 음악이 가득해요. 주말엔 특히 붐벼요.",
    },
  },
  {
    name: "Gangnam",
    korean: "강남",
    emoji: "💼",
    guName: "강남구",
    color: COLORS[2],
    lat: 37.4979, lng: 127.0276,
    vibe: { en: "Corporate, polished, expensive", ko: "세련되고 비싼 비즈니스 지구" },
    rentRange: "₩1.2M–2.5M+/mo",
    bestFor: { en: ["Professionals", "Families", "Business expats"], ko: ["직장인", "가족", "주재원"] },
    landmarks: ["COEX Mall", "Apgujeong Rodeo", "Cheongdam-dong"],
    foreignerFriendly: 2,
    description: {
      en: "Seoul's affluent business district. Clean, modern, and expensive. Less \"foreigner community\" feel. More corporate expats on company packages. Good international schools and hospitals nearby.",
      ko: "서울의 고급 비즈니스 지구예요. 깔끔하고 현대적이지만 비싸요. 회사 발령으로 온 주재원이 많아요. 국제학교와 병원이 가까워요.",
    },
  },
  {
    name: "Sinchon / Ewha",
    korean: "신촌·이화",
    emoji: "📚",
    guName: "서대문구",
    color: COLORS[3],
    lat: 37.5596, lng: 126.9368,
    vibe: { en: "University area, budget-friendly, youthful", ko: "대학가, 저렴하고 젊은 분위기" },
    rentRange: "₩500K–900K/mo",
    bestFor: { en: ["Students", "Budget travelers", "Language learners"], ko: ["학생", "저예산", "한국어 학습자"] },
    landmarks: ["Yonsei University", "Ewha Womans University", "Sinchon Station"],
    foreignerFriendly: 2,
    description: {
      en: "Two major universities side by side means cheap food, affordable rooms, and lots of Korean students. Great for language exchange. Less nightlife than Hongdae, more laid-back. Popular with Korean language students.",
      ko: "연세대와 이화여대가 인접해 있어요. 저렴한 음식과 활기찬 대학 문화가 매력이에요. 한국어 어학원 학생들에게 인기가 많아요.",
    },
  },
  {
    name: "Mapo / Mangwon",
    korean: "마포·망원",
    emoji: "☕",
    guName: "마포구",
    color: COLORS[4],
    lat: 37.5548, lng: 126.9073,
    vibe: { en: "Trendy cafes, local feel, Han River nearby", ko: "트렌디한 카페와 한강이 가까운 동네" },
    rentRange: "₩700K–1.1M/mo",
    bestFor: { en: ["Young professionals", "Creatives", "Local experience"], ko: ["젊은 직장인", "크리에이터", "현지 생활"] },
    landmarks: ["Mangwon Market", "Hangang Park", "Hapjeong Station"],
    foreignerFriendly: 2,
    description: {
      en: "Where Seoul locals who don't want to live in tourist areas tend to settle. Mangwon Market is a classic traditional market; Hangang Park is walking distance. Great independent cafes. Growing expat scene but still feels authentically Korean.",
      ko: "서울 현지인들이 선호하는 동네예요. 망원시장, 한강공원이 가깝고 개성 있는 카페가 많아요. 점점 외국인이 늘고 있지만 아직 한국적인 정취가 살아있어요.",
    },
  },
  {
    name: "Jamsil / Songpa",
    korean: "잠실·송파",
    emoji: "🎡",
    guName: "송파구",
    color: COLORS[5],
    lat: 37.5133, lng: 127.1028,
    vibe: { en: "Families, parks, Lotte World", ko: "가족, 공원, 롯데월드" },
    rentRange: "₩800K–1.4M/mo",
    bestFor: { en: ["Families", "Sports fans", "East Seoul"], ko: ["가족", "스포츠 팬", "동서울"] },
    landmarks: ["Lotte World", "Olympic Park", "Lotte Tower"],
    foreignerFriendly: 2,
    description: {
      en: "East Seoul family neighborhood. Great parks, Lotte World theme park, and Lotte Tower for shopping. Less party, more lifestyle. Popular with families and those who want space. Slightly less central but excellent transport.",
      ko: "롯데월드, 올림픽공원, 롯데타워가 있는 가족 친화적인 동네예요. 파티보다 라이프스타일 중심이에요.",
    },
  },
  {
    name: "Gwanak / Sillim",
    korean: "관악·신림",
    emoji: "🍜",
    guName: "관악구",
    color: COLORS[6],
    lat: 37.4776, lng: 126.9516,
    vibe: { en: "Budget-friendly, student-heavy, diverse food", ko: "저렴하고 학생이 많은 다양한 음식의 동네" },
    rentRange: "₩350K–700K/mo",
    bestFor: { en: ["Budget living", "Students", "SNU campus"], ko: ["저예산", "학생", "서울대 근처"] },
    landmarks: ["Seoul National University", "Gwanak Mountain", "Sillim Station"],
    foreignerFriendly: 1,
    description: {
      en: "The most affordable area on this list. Home to Seoul National University. Young, student-heavy, cheap Korean food everywhere. Less English spoken here, which is either a challenge or a great language immersion opportunity.",
      ko: "서울대학교가 있는 가장 저렴한 지역이에요. 한국어 생활 환경에 빠르게 적응할 수 있는 곳이에요.",
    },
  },
  {
    name: "Seocho / Yangjae",
    korean: "서초·양재",
    emoji: "🌳",
    guName: "서초구",
    color: COLORS[7],
    lat: 37.4735, lng: 127.0385,
    vibe: { en: "Quiet, residential, well-connected", ko: "조용하고 쾌적한 주거 지역" },
    rentRange: "₩900K–1.6M/mo",
    bestFor: { en: ["Families", "Professionals", "Peace and quiet"], ko: ["가족", "직장인", "조용한 환경"] },
    landmarks: ["Yangjae Citizen's Forest", "AT Center", "Express Bus Terminal"],
    foreignerFriendly: 2,
    description: {
      en: "Quieter residential area just south of Gangnam. Lots of green space, good international schools, and a more settled expat community. Less exciting for young solo expats but excellent for families.",
      ko: "강남 남쪽의 조용한 주거 지역이에요. 녹지가 많고 국제학교가 잘 갖춰져 있어요. 가족 단위 거주자에게 인기 있어요.",
    },
  },
];

const SeoulMap = dynamic(() => import("./SeoulMap"), { ssr: false });

function FriendlyDots({ level, color }: { level: FriendlyLevel; color: string }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full"
          style={{ background: i <= level ? color : "#e4e4e7" }}
        />
      ))}
    </div>
  );
}

export default function NeighborhoodGuide() {
  const { locale } = useLocale();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const displayN = hoveredIndex !== null ? neighborhoods[hoveredIndex] : null;

  return (
    <section id="neighborhoods" className="bg-white px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {locale === "ko" ? "동네 안내" : "Neighborhoods"}
        </p>
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          {locale === "ko" ? "어느 동네가 맞을까요?" : "Which neighborhood is right for you?"}
        </h2>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-500">
          {locale === "ko"
            ? "직접 살아본 이웃들의 솔직한 이야기."
            : "Honest assessments from people who've actually lived there."}
        </p>

        {/* Map + hover card */}
        <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm md:h-[560px]">
          <SeoulMap
            neighborhoods={neighborhoods}
            activeIndex={clickedIndex}
            hoveredIndex={hoveredIndex}
            onSelect={(i) => setClickedIndex(i === clickedIndex ? null : i)}
            onHover={setHoveredIndex}
          />

          {/* Hover card overlay */}
          {displayN && (
            <div
              className="pointer-events-none absolute bottom-4 left-4 z-[1000] w-72 rounded-2xl border bg-white/95 p-4 shadow-xl backdrop-blur-sm transition-all duration-150"
              style={{ borderColor: displayN.color.border }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">{displayN.emoji}</span>
                <div>
                  <p className="font-bold leading-tight text-zinc-950">{displayN.korean}</p>
                  <p className="text-xs text-zinc-400">{displayN.name}</p>
                </div>
                <div
                  className="ml-auto rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ background: displayN.color.fill, color: displayN.color.text }}
                >
                  {displayN.rentRange}
                </div>
              </div>
              <p className="mb-2 text-sm font-semibold" style={{ color: displayN.color.text }}>
                {locale === "ko" ? displayN.vibe.ko : displayN.vibe.en}
              </p>
              <p className="mb-3 text-sm leading-relaxed text-zinc-500 line-clamp-3">
                {locale === "ko" ? displayN.description.ko : displayN.description.en}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(locale === "ko" ? displayN.bestFor.ko : displayN.bestFor.en).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ background: displayN.color.fill, color: displayN.color.text }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <FriendlyDots level={displayN.foreignerFriendly} color={displayN.color.border} />
                <span className="text-xs text-zinc-400">
                  {locale === "ko" ? "외국인 친화도" : "Foreigner-friendly"}
                </span>
              </div>
            </div>
          )}

          {/* Default hint when nothing is hovered */}
          {!displayN && (
            <div className="pointer-events-none absolute bottom-4 left-1/2 z-[1000] -translate-x-1/2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2 text-xs font-medium text-zinc-400 shadow backdrop-blur-sm">
              {locale === "ko" ? "동네 위에 마우스를 올려보세요" : "Hover over a neighborhood"}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
