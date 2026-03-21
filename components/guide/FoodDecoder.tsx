"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/lib/i18n";
import { MagnifyingGlass } from "@phosphor-icons/react";

type Category = "all" | "rice" | "noodles" | "soup" | "bbq" | "streetfood" | "snacks";
type SpiceLevel = 0 | 1 | 2 | 3;

interface Dish {
  korean: string;
  english: string;
  enDescription: string;
  koDescription: string;
  spice: SpiceLevel;
  tags: string[];
  category: Exclude<Category, "all">;
}

const dishes: Dish[] = [
  // RICE
  { korean: "비빔밥", english: "Bibimbap", category: "rice", spice: 1,
    enDescription: "Mixed rice bowl with colorful vegetables, a fried egg, and spicy gochujang sauce. One of Korea's most iconic dishes.",
    koDescription: "갖가지 나물과 달걀, 고추장을 넣고 비벼 먹는 한국의 대표 음식이에요.",
    tags: ["popular", "vegetarian-option"] },
  { korean: "볶음밥", english: "Fried Rice", category: "rice", spice: 0,
    enDescription: "Stir-fried rice with vegetables, egg, and sometimes meat. Comfort food at its simplest.",
    koDescription: "채소와 달걀, 밥을 볶아 만든 간단하고 맛있는 음식이에요.",
    tags: ["popular"] },
  { korean: "돌솥비빔밥", english: "Stone Pot Bibimbap", category: "rice", spice: 1,
    enDescription: "Bibimbap served in a sizzling hot stone pot, creating crispy rice at the bottom. The crunch is the best part.",
    koDescription: "뜨거운 돌솥에 담아 바닥이 바삭하게 구워지는 비빔밥이에요.",
    tags: ["popular", "vegetarian-option"] },
  { korean: "오므라이스", english: "Omurice", category: "rice", spice: 0,
    enDescription: "Fried rice wrapped in a soft omelette, drizzled with ketchup or demi-glace. A beloved Korean-Japanese fusion.",
    koDescription: "볶음밥을 달걀로 감싼 케첩 소스의 오므라이스예요.",
    tags: [] },

  // NOODLES
  { korean: "라면", english: "Ramyeon", category: "noodles", spice: 2,
    enDescription: "Korean instant noodle soup, much spicier and bolder than Japanese ramen. A true national staple.",
    koDescription: "한국식 인스턴트 라면이에요. 일본 라멘보다 훨씬 얼큰해요.",
    tags: ["spicy", "popular"] },
  { korean: "냉면", english: "Cold Noodles", category: "noodles", spice: 0,
    enDescription: "Thin buckwheat noodles in an icy broth (물냉면) or spicy sauce (비빔냉면). Refreshing in summer.",
    koDescription: "메밀 면을 차가운 육수(물냉면)나 양념(비빔냉면)에 말아 먹는 여름 별미예요.",
    tags: ["popular"] },
  { korean: "잡채", english: "Japchae", category: "noodles", spice: 0,
    enDescription: "Glass noodles stir-fried with colorful vegetables and beef in a soy-sesame sauce. Often served at celebrations.",
    koDescription: "당면에 채소와 소고기를 넣고 간장 양념으로 볶은 잔치 음식이에요.",
    tags: ["popular"] },
  { korean: "칼국수", english: "Kalguksu", category: "noodles", spice: 0,
    enDescription: "Thick hand-cut wheat noodles in a mild anchovy or chicken broth. Warm, filling, and comforting.",
    koDescription: "손으로 칼로 썬 두꺼운 면을 맑은 육수에 끓인 소박하고 든든한 음식이에요.",
    tags: [] },

  // SOUP/STEW
  { korean: "김치찌개", english: "Kimchi Jjigae", category: "soup", spice: 2,
    enDescription: "Kimchi and pork (or tuna) stew in a rich red broth. Korea's ultimate comfort food. Every restaurant has it.",
    koDescription: "김치와 돼지고기(또는 참치)를 넣고 끓인 얼큰한 찌개예요. 한국인의 소울 푸드예요.",
    tags: ["spicy", "popular", "pork"] },
  { korean: "된장찌개", english: "Doenjang Jjigae", category: "soup", spice: 0,
    enDescription: "Earthy fermented soybean paste stew with tofu, mushrooms, and vegetables. Umami-rich and deeply satisfying.",
    koDescription: "두부, 버섯, 채소를 넣고 끓인 구수한 된장찌개예요. 깊고 진한 맛이 나요.",
    tags: ["vegetarian-option"] },
  { korean: "순두부찌개", english: "Sundubu Jjigae", category: "soup", spice: 2,
    enDescription: "Silky soft tofu in a spicy red broth with an egg cracked on top. One of the most popular soups.",
    koDescription: "부드러운 순두부를 넣고 끓인 얼큰한 찌개예요. 계란을 깨 넣어 더 고소해요.",
    tags: ["spicy", "popular", "seafood-option"] },
  { korean: "삼계탕", english: "Samgyetang", category: "soup", spice: 0,
    enDescription: "Whole young chicken stuffed with rice, garlic, jujubes, and ginseng, slow-cooked in broth. Eaten in summer for energy.",
    koDescription: "인삼, 찹쌀, 대추를 넣고 통째로 끓인 영양 보양식이에요. 여름에 많이 먹어요.",
    tags: ["popular"] },
  { korean: "갈비탕", english: "Galbitang", category: "soup", spice: 0,
    enDescription: "Clear beef short rib soup, slow-simmered until the meat falls off the bone. Light but deeply flavored.",
    koDescription: "소갈비를 오래 끓여 국물이 맑고 깊은 맛을 내는 해장국이에요.",
    tags: ["beef"] },

  // BBQ
  { korean: "삼겹살", english: "Samgyeopsal", category: "bbq", spice: 0,
    enDescription: "Thick pork belly grilled at the table, wrapped in lettuce with garlic and sauces. The quintessential Korean BBQ experience.",
    koDescription: "상추에 싸서 먹는 한국식 바베큐의 대명사예요. 직화로 구워 먹어요.",
    tags: ["pork", "popular"] },
  { korean: "불고기", english: "Bulgogi", category: "bbq", spice: 0,
    enDescription: "Sweet and savory marinated beef, grilled or pan-fried. One of the most internationally recognized Korean dishes.",
    koDescription: "달콤하게 양념한 소고기를 구운 한국의 대표 음식이에요.",
    tags: ["beef", "popular"] },
  { korean: "갈비", english: "Galbi", category: "bbq", spice: 0,
    enDescription: "Marinated beef short ribs grilled over charcoal. Rich, sweet, and caramelized at the edges.",
    koDescription: "양념에 재운 소갈비를 숯불에 구운 고급 한국 바베큐예요.",
    tags: ["beef", "popular"] },
  { korean: "닭갈비", english: "Dakgalbi", category: "bbq", spice: 2,
    enDescription: "Spicy stir-fried chicken with tteok (rice cakes), cabbage, and gochujang. Popular in Chuncheon.",
    koDescription: "닭고기에 채소와 떡을 넣고 고추장으로 볶은 춘천의 명물 음식이에요.",
    tags: ["spicy"] },

  // STREET FOOD
  { korean: "떡볶이", english: "Tteokbokki", category: "streetfood", spice: 2,
    enDescription: "Chewy cylindrical rice cakes in a sticky, sweet-spicy gochujang sauce. The most beloved Korean street food.",
    koDescription: "쫄깃한 가래떡을 고추장 양념에 볶은 국민 분식이에요.",
    tags: ["spicy", "popular", "vegetarian-option"] },
  { korean: "김밥", english: "Kimbap", category: "streetfood", spice: 0,
    enDescription: "Rice rolls with vegetables, egg, and various fillings, wrapped in seaweed. Often called 'Korean sushi' but it's its own thing.",
    koDescription: "밥과 채소, 달걀 등을 김으로 만 도시락 음식이에요. 일본 스시와는 달라요.",
    tags: ["popular", "vegetarian-option"] },
  { korean: "순대", english: "Sundae", category: "streetfood", spice: 0,
    enDescription: "Korean steamed sausage. Pork casing stuffed with glass noodles, rice, and vegetables. Sounds stranger than it tastes. An absolute street food staple.",
    koDescription: "돼지 창자에 당면과 채소를 넣어 만든 한국식 순대예요.",
    tags: ["pork"] },
  { korean: "붕어빵", english: "Bungeoppang", category: "streetfood", spice: 0,
    enDescription: "Fish-shaped waffle pastry filled with sweet red bean paste or custard cream. Winter street food icon.",
    koDescription: "잉어 모양 틀에 팥이나 슈크림을 넣고 구운 겨울 길거리 간식이에요.",
    tags: ["vegetarian", "popular"] },
  { korean: "파전", english: "Pajeon", category: "streetfood", spice: 0,
    enDescription: "Savory scallion pancake, often with seafood. Crispy outside, chewy inside. Perfect with makgeolli on a rainy day.",
    koDescription: "파를 넣고 부친 고소한 전이에요. 비 오는 날 막걸리와 함께 먹으면 최고예요.",
    tags: ["seafood-option"] },

  // SNACKS
  { korean: "호떡", english: "Hotteok", category: "snacks", spice: 0,
    enDescription: "Sweet pan-fried pancake filled with brown sugar, cinnamon, and crushed nuts. Crispy, gooey, and dangerously addictive.",
    koDescription: "흑설탕과 견과류로 속을 채워 구운 달콤한 길거리 간식이에요.",
    tags: ["vegetarian", "popular"] },
  { korean: "계란말이", english: "Gyeran Mari", category: "snacks", spice: 0,
    enDescription: "Rolled egg omelette, often served as a side dish (banchan). Light, fluffy, and mild.",
    koDescription: "달걀을 얇게 펴서 돌돌 말아 만든 담백한 계란말이예요.",
    tags: ["vegetarian"] },
  { korean: "도토리묵", english: "Acorn Jelly", category: "snacks", spice: 0,
    enDescription: "Grey savory jelly made from acorn starch, served with soy sauce and sesame oil. Unusual texture, deeply Korean.",
    koDescription: "도토리 전분으로 만든 고소하고 담백한 묵이에요. 간장에 찍어 먹어요.",
    tags: ["vegetarian"] },
  { korean: "치킨", english: "Korean Fried Chicken", category: "snacks", spice: 1,
    enDescription: "Double-fried for extreme crunch, available in dozens of flavors: soy garlic, spicy, honey butter. A late-night institution.",
    koDescription: "두 번 튀겨 바삭한 한국식 치킨이에요. 간장마늘, 양념, 허니버터 등 다양한 맛이 있어요.",
    tags: ["popular"] },
  { korean: "전", english: "Korean Pancake (Jeon)", category: "snacks", spice: 0,
    enDescription: "General term for pan-fried battered dishes, savory or sweet. Includes pajeon, kimchijeon, and more.",
    koDescription: "부침개의 총칭이에요. 파전, 김치전 등 다양한 종류가 있어요.",
    tags: ["popular"] },
  { korean: "떡", english: "Tteok (Rice Cake)", category: "snacks", spice: 0,
    enDescription: "Chewy rice cakes in endless varieties: sweet, savory, stuffed, plain. A staple at Korean celebrations and as everyday snacks.",
    koDescription: "찹쌀이나 멥쌀로 만든 쫄깃한 떡이에요. 명절이나 간식으로 다양하게 즐겨요.",
    tags: ["vegetarian", "popular"] },
];

const categories = [
  { id: "all", en: "All", ko: "전체" },
  { id: "rice", en: "Rice 밥", ko: "밥" },
  { id: "noodles", en: "Noodles 면", ko: "면" },
  { id: "soup", en: "Soup 국/찌개", ko: "국/찌개" },
  { id: "bbq", en: "BBQ 고기", ko: "고기" },
  { id: "streetfood", en: "Street Food 분식", ko: "분식" },
  { id: "snacks", en: "Snacks 간식", ko: "간식" },
] as const;

function SpiceDots({ level }: { level: SpiceLevel }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map(i => (
        <span key={i} className={`h-2 w-2 rounded-full ${i <= level ? "bg-red-400" : "bg-zinc-200"}`} />
      ))}
    </div>
  );
}

const TAG_LABELS: Record<string, { en: string; ko: string; color: string }> = {
  "vegetarian": { en: "Vegetarian", ko: "채식 가능", color: "bg-green-100 text-green-700" },
  "vegetarian-option": { en: "Veg option", ko: "채식 선택", color: "bg-green-100 text-green-700" },
  "pork": { en: "Contains pork", ko: "돼지고기", color: "bg-orange-100 text-orange-700" },
  "beef": { en: "Beef", ko: "소고기", color: "bg-red-100 text-red-700" },
  "seafood": { en: "Seafood", ko: "해산물", color: "bg-blue-100 text-blue-700" },
  "seafood-option": { en: "Seafood option", ko: "해산물 선택", color: "bg-blue-100 text-blue-700" },
  "spicy": { en: "Spicy", ko: "매운 음식", color: "bg-red-100 text-red-700" },
  "popular": { en: "Popular", ko: "인기 메뉴", color: "bg-yellow-100 text-yellow-700" },
};

export default function FoodDecoder() {
  const { locale } = useLocale();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered = useMemo(() => {
    return dishes.filter(d => {
      const matchesCategory = activeCategory === "all" || d.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        d.korean.includes(q) ||
        d.english.toLowerCase().includes(q) ||
        d.enDescription.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <section id="food" className="bg-white px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {locale === "ko" ? "음식" : "Food"}
        </p>
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          {locale === "ko" ? "한국 음식 가이드" : "Korean food decoder"}
        </h2>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-500">
          {locale === "ko"
            ? "메뉴판이 어렵다면 여기서 먼저 확인하세요."
            : "Can't read the menu? Here's what everything actually is."}
        </p>

        {/* Search */}
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5">
          <MagnifyingGlass size={16} className="text-zinc-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={locale === "ko" ? "이름으로 검색..." : "Search by name..."}
            className="flex-1 bg-transparent text-sm outline-none placeholder-zinc-400"
          />
        </div>

        {/* Category tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-zinc-950 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {locale === "ko" ? cat.ko : cat.en}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(dish => (
            <div key={dish.korean} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="text-xl font-bold text-zinc-950">{dish.korean}</p>
                  <p className="text-sm text-zinc-400">{dish.english}</p>
                </div>
                <SpiceDots level={dish.spice} />
              </div>
              <p className="mb-3 text-sm leading-relaxed text-zinc-500">
                {locale === "ko" ? dish.koDescription : dish.enDescription}
              </p>
              {dish.tags.filter(t => t !== "popular").length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {dish.tags.filter(t => t !== "popular").map(tag => {
                    const label = TAG_LABELS[tag];
                    if (!label) return null;
                    return (
                      <span key={tag} className={`rounded-full px-2 py-0.5 text-xs font-medium ${label.color}`}>
                        {locale === "ko" ? label.ko : label.en}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-zinc-400">
            {locale === "ko" ? "검색 결과가 없어요." : "No dishes found."}
          </p>
        )}
      </div>
    </section>
  );
}
