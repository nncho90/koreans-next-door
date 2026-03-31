import type { Metadata } from "next";
import ExploreContent from "./ExploreContent";

export const metadata: Metadata = {
  title: "Explore Seoul",
  description: "Discover Seoul's best food, neighborhoods, and hidden gems. Restaurant picks, vegan map curated by locals, and seasonal tips.",
  keywords: ["best restaurants Sinchon", "vegan restaurants Seoul", "Seoul neighborhood guide", "things to do Seoul", "Seoul food guide", "Seoul expat tips"],
  openGraph: {
    title: "Explore Seoul — Koreans Next Door",
    description: "Local restaurant picks, a Seoul vegan map, neighborhood guide, and seasonal tips — all in one place.",
    url: "https://koreans-next-door.vercel.app/guide/explore",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://koreans-next-door.vercel.app" },
              { "@type": "ListItem", "position": 2, "name": "Seoul Guide", "item": "https://koreans-next-door.vercel.app/guide" },
              { "@type": "ListItem", "position": 3, "name": "Explore Seoul", "item": "https://koreans-next-door.vercel.app/guide/explore" }
            ]
          })
        }}
      />
      <ExploreContent />
    </>
  );
}
