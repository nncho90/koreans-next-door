import type { Metadata } from "next";
import VeganContent from "./VeganContent";

export const metadata: Metadata = {
  title: "Seoul Vegan Map — Vegan Restaurants, Cafes & Bakeries",
  description:
    "The most complete vegan map for Seoul — restaurants, cafes, and bakeries curated by locals. Filter by category and open in Naver Maps.",
  keywords: [
    "vegan Seoul",
    "vegan restaurants Seoul",
    "vegan cafes Seoul",
    "plant-based Seoul",
    "서울 비건 맛집",
    "서울 비건 지도",
    "vegan Korea",
  ],
  openGraph: {
    title: "Seoul Vegan Map — Koreans Next Door",
    description:
      "Vegan restaurants, cafes, and bakeries across Seoul — curated by locals. Filter by category, click a pin, open in Naver Maps.",
    url: "https://koreansnextdoor.com/vegan",
  },
  alternates: { canonical: "https://koreansnextdoor.com/vegan" },
};

export default function Page() {
  return <VeganContent />;
}
