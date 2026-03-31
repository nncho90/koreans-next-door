import type { Metadata } from "next";
import DailyContent from "./DailyContent";

export const metadata: Metadata = {
  title: "Daily Life in Korea Guide for Foreigners",
  description: "Everything you need for daily life in Korea: recycling rules, phone plans, essential apps, food delivery, and getting a driver's license as a foreigner.",
  keywords: [
    "recycling Korea guide",
    "phone plan Korea foreigner",
    "food delivery Korea English",
    "essential apps Korea expat",
    "driver's license Korea foreigner",
    "종량제 봉투",
    "Korea daily life expat",
    "Korea SIM card foreigner",
  ],
  openGraph: {
    title: "Daily Life in Korea — Koreans Next Door",
    description: "Recycling rules, phone plans, must-have apps, delivery culture, and driver's license — your complete daily life guide for living in Korea.",
    url: "https://koreansnextdoor.com/guide/daily",
  },
  alternates: { canonical: "https://koreansnextdoor.com/guide/daily" },
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
              { "@type": "ListItem", "position": 3, "name": "Daily Life", "item": "https://koreansnextdoor.com/guide/daily" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Daily Life in Korea Guide for Foreigners (2026)",
            "datePublished": "2026-01-01",
            "dateModified": "2026-03-31",
            "author": { "@type": "Organization", "name": "Koreans Next Door", "url": "https://koreansnextdoor.com" },
            "publisher": { "@type": "Organization", "name": "Koreans Next Door", "logo": { "@type": "ImageObject", "url": "https://koreansnextdoor.com/logo.png" } },
            "inLanguage": "en",
            "about": { "@type": "Thing", "name": "Daily Life in South Korea" }
          })
        }}
      />
      <DailyContent />
    </>
  );
}
