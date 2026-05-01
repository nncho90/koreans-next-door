import type { Metadata } from "next";
import DailyContent from "./DailyContent";

export const metadata: Metadata = {
  title: "Daily Life in Korea Guide for Foreigners",
  description: "Everything you need for daily life in Korea: recycling rules, phone plans, essential apps, food delivery, Korean address conversion, and getting a driver's license as a foreigner.",
  keywords: [
    "recycling Korea guide",
    "phone plan Korea foreigner",
    "food delivery Korea English",
    "Korean address to English converter",
    "Korea English address converter",
    "Korean postal code 우",
    "how to write Korean address in English",
    "도로명주소 영문 변환",
    "영문주소 변환",
    "essential apps Korea expat",
    "driver's license Korea foreigner",
    "종량제 봉투",
    "Korea daily life expat",
    "Korea SIM card foreigner",
  ],
  openGraph: {
    title: "Daily Life in Korea — Koreans Next Door",
    description: "Recycling rules, phone plans, Korean address conversion, must-have apps, delivery culture, and driver's license — your complete daily life guide for living in Korea.",
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
            "dateModified": "2026-05-01",
            "author": { "@type": "Organization", "name": "Koreans Next Door", "url": "https://koreansnextdoor.com" },
            "publisher": { "@type": "Organization", "name": "Koreans Next Door", "logo": { "@type": "ImageObject", "url": "https://koreansnextdoor.com/logo.png" } },
            "inLanguage": "en",
            "about": [
              { "@type": "Thing", "name": "Daily Life in South Korea" },
              { "@type": "Thing", "name": "Korean address conversion" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to write a Korean road-name address in English",
            "description": "Use the postal code, move the building number before the road name, then add district, city, and country.",
            "step": [
              { "@type": "HowToStep", "name": "Find the postal code", "text": "In Korean addresses, (우) marks the postal code." },
              { "@type": "HowToStep", "name": "Move the building number", "text": "For English format, put the building number before the road name." },
              { "@type": "HowToStep", "name": "Finish from small to large", "text": "Write road name, district, city, postal code, and Republic of Korea." }
            ],
            "tool": { "@type": "HowToTool", "name": "Korea Road Name Address English API" }
          })
        }}
      />
      <DailyContent />
    </>
  );
}
