export type Restaurant = {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  address: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  emoji: string;
};

export const RESTAURANTS: Restaurant[] = [
  {
    id: "samgyeopsal",
    name: "더도이축산직영점 신촌본점",
    nameEn: "Deodoi Grilled Pork",
    category: "삼겹살",
    categoryEn: "Grilled Pork Belly",
    address: "서울 서대문구 연세로7길 24",
    lat: 37.5577343,
    lng: 126.9354055,
    googleMapsUrl: "https://maps.app.goo.gl/1FFe4tdrynHYVyUm9",
    emoji: "🥩",
  },
  {
    id: "godeungeo",
    name: "고삼이 신촌점",
    nameEn: "Gosami — Mackerel & Squid",
    category: "고등어오징어",
    categoryEn: "Mackerel & Squid",
    address: "서울 서대문구 연세로7안길 38",
    lat: 37.5583636,
    lng: 126.9347281,
    googleMapsUrl: "https://maps.app.goo.gl/hfqP58AABYNmg1RU7",
    emoji: "🐟",
  },
  {
    id: "malatang",
    name: "미도매운향솥",
    nameEn: "Mido — Mala Hot Pot",
    category: "마라탕",
    categoryEn: "Mala Hot Pot",
    address: "서울 서대문구 연세로11길 25",
    lat: 37.5587887,
    lng: 126.9354763,
    googleMapsUrl: "https://maps.app.goo.gl/Mery9D5DVfLek2cF8",
    emoji: "🌶️",
  },
  {
    id: "jjajang",
    name: "풍년",
    nameEn: "Pungnyeon — Jjajang & Jjamppong",
    category: "짜장짬뽕",
    categoryEn: "Jjajang & Jjamppong",
    address: "서울 서대문구 연세로12길 26",
    lat: 37.5589044,
    lng: 126.9384092,
    googleMapsUrl: "https://maps.app.goo.gl/vP4yPoqS6nR2zJg78",
    emoji: "🍜",
  },
  {
    id: "curry",
    name: "소코아 신촌점",
    nameEn: "Sokoa — Curry Katsu",
    category: "카레돈가스",
    categoryEn: "Curry & Katsu",
    address: "서울 서대문구 신촌로 63",
    lat: 37.5565635,
    lng: 126.9336421,
    googleMapsUrl: "https://maps.app.goo.gl/UoL3Ww1WiQaqUTmS7",
    emoji: "🍛",
  },
  {
    id: "ramen",
    name: "삼미당 신촌점",
    nameEn: "Sammidang — Ramen",
    category: "라멘",
    categoryEn: "Ramen",
    address: "서울 서대문구 연세로7길 40",
    lat: 37.5578728,
    lng: 126.9346837,
    googleMapsUrl: "https://maps.app.goo.gl/4hHUyvd4zoWV1Knd7",
    emoji: "🍥",
  },
  {
    id: "soba",
    name: "소바연구소",
    nameEn: "Soba Lab",
    category: "소바",
    categoryEn: "Soba",
    address: "서울 서대문구 명물길 50-9",
    lat: 37.5587293,
    lng: 126.9394417,
    googleMapsUrl: "https://maps.app.goo.gl/JokCzJmhZVB4nzoW9",
    emoji: "🍱",
  },
  {
    id: "pho",
    name: "신촌포가레",
    nameEn: "Pogare — Pho",
    category: "쌀국수",
    categoryEn: "Pho",
    address: "서울 서대문구 명물길 26",
    lat: 37.5579343,
    lng: 126.938258,
    googleMapsUrl: "https://maps.app.goo.gl/FgPTixmsgKcrgMG29",
    emoji: "🍲",
  },
  {
    id: "beef-noodle",
    name: "정육면체",
    nameEn: "Jeongyukmyeonche — Beef Noodle",
    category: "우육면",
    categoryEn: "Beef Noodle",
    address: "서울 서대문구 연세로5다길 22-8",
    lat: 37.5567725,
    lng: 126.9345699,
    googleMapsUrl: "https://maps.app.goo.gl/f7dcnEf3FHrb9GAy9",
    emoji: "🥢",
  },
  {
    id: "taco",
    name: "비아 메렝게",
    nameEn: "Via Merengue — Tacos",
    category: "타코",
    categoryEn: "Tacos",
    address: "서울 서대문구 명물길 일대",
    lat: 37.558589,
    lng: 126.938094,
    googleMapsUrl: "https://maps.app.goo.gl/pZH7wYeAh5RQA1kR9",
    emoji: "🌮",
  },
  {
    id: "pasta",
    name: "투파인드피터 서울신촌점",
    nameEn: "Two Find Peter — Pasta",
    category: "파스타",
    categoryEn: "Pasta",
    address: "서울 서대문구 명물길 29-8",
    lat: 37.5586514,
    lng: 126.9379905,
    googleMapsUrl: "https://maps.app.goo.gl/cRCfkzgQ71ZD5Kcv8",
    emoji: "🍝",
  },
];

export function restaurantListJsonLd() {
  return {
    "@type": "ItemList",
    "name": "Sigwang Church Recommended Restaurants in Sinchon Seoul",
    "description": "Curated restaurant recommendations near Sinchon, Seoul from Koreans Next Door community members",
    "numberOfItems": RESTAURANTS.length,
    "itemListElement": RESTAURANTS.map((r, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Restaurant",
        "name": r.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": r.address,
          "addressLocality": "Seoul",
          "addressCountry": "KR",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": r.lat,
          "longitude": r.lng,
        },
        "servesCuisine": r.categoryEn,
        "url": r.googleMapsUrl,
      },
    })),
  };
}
