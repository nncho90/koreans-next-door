import type { Metadata } from "next";
import ExploreContent from "./ExploreContent";

export const metadata: Metadata = {
  title: "Explore Seoul",
  description: "Discover Seoul's best food, neighborhoods, and hidden gems. Restaurant picks, vegan map curated by locals, and seasonal tips.",
  keywords: ["best restaurants Sinchon", "vegan restaurants Seoul", "Seoul neighborhood guide", "things to do Seoul", "Seoul food guide", "Seoul expat tips"],
  openGraph: {
    title: "Explore Seoul — Koreans Next Door",
    description: "Local restaurant picks, a Seoul vegan map, neighborhood guide, and seasonal tips — all in one place.",
    url: "https://koreansnextdoor.com/guide/explore",
  },
  alternates: { canonical: "https://koreansnextdoor.com/guide/explore" },
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
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://koreansnextdoor.com" },
              { "@type": "ListItem", "position": 2, "name": "Seoul Guide", "item": "https://koreansnextdoor.com/guide" },
              { "@type": "ListItem", "position": 3, "name": "Explore Seoul", "item": "https://koreansnextdoor.com/guide/explore" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Explore Seoul: Neighborhood and Food Guide for Foreigners (2026)",
            "datePublished": "2026-01-01",
            "dateModified": "2026-03-31",
            "author": { "@type": "Organization", "name": "Koreans Next Door", "url": "https://koreansnextdoor.com" },
            "publisher": { "@type": "Organization", "name": "Koreans Next Door", "logo": { "@type": "ImageObject", "url": "https://koreansnextdoor.com/logo.png" } },
            "inLanguage": "en",
            "about": { "@type": "Thing", "name": "Seoul Neighborhoods and Food Culture" }
          })
        }}
      />
      <ExploreContent />
    </>
  );
}
