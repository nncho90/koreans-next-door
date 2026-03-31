import type { Metadata } from "next";
import HealthContent from "./HealthContent";

export const metadata: Metadata = {
  title: "Find a Doctor in Seoul",
  description: "Find English-speaking doctors and clinics in Seoul. Understand Korea's clinic system, find specialists, and see an interactive clinic map.",
  keywords: ["English speaking doctor Seoul", "foreigner clinic Seoul", "English hospital Korea", "doctor Seoul expat", "Seoul medical guide foreigners", "Korea health insurance foreigners"],
  openGraph: {
    title: "Find a Doctor in Seoul — Koreans Next Door",
    description: "Korea's clinic system, English-speaking hospitals, and who to call when you need help.",
    url: "https://koreansnextdoor.com/guide/health",
  },
  alternates: { canonical: "https://koreansnextdoor.com/guide/health" },
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
              { "@type": "ListItem", "position": 3, "name": "Find a Doctor", "item": "https://koreansnextdoor.com/guide/health" }
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
            "headline": "Healthcare Guide for Foreigners in Korea (2026)",
            "datePublished": "2026-01-01",
            "dateModified": "2026-03-31",
            "author": { "@type": "Organization", "name": "Koreans Next Door", "url": "https://koreansnextdoor.com" },
            "publisher": { "@type": "Organization", "name": "Koreans Next Door", "logo": { "@type": "ImageObject", "url": "https://koreansnextdoor.com/logo.png" } },
            "inLanguage": "en",
            "about": { "@type": "Thing", "name": "Healthcare in South Korea" }
          })
        }}
      />
      <HealthContent />
    </>
  );
}
