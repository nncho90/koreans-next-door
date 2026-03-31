import type { Metadata } from "next";
import WorkContent from "./WorkContent";

export const metadata: Metadata = {
  title: "Working in Korea Guide for Foreigners",
  description: "Everything foreigners need to know about working in Korea: employment contracts, labor rights, workplace culture, and how to find a job in Seoul.",
  keywords: [
    "work visa Korea foreigner",
    "Korean employment contract",
    "labor rights Korea expat",
    "Korean workplace culture",
    "working in Korea guide",
    "foreigner job Korea",
    "4대보험 foreigner",
    "severance pay Korea expat",
  ],
  openGraph: {
    title: "Working in Korea — Koreans Next Door",
    description: "Read your contract, know your rights, navigate workplace culture, and find your next job in Korea.",
    url: "https://koreansnextdoor.com/guide/work",
  },
  alternates: { canonical: "https://koreansnextdoor.com/guide/work" },
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
              { "@type": "ListItem", "position": 3, "name": "Working in Korea", "item": "https://koreansnextdoor.com/guide/work" },
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
            "headline": "Working in Korea Guide for Foreigners (2026)",
            "datePublished": "2026-01-01",
            "dateModified": "2026-03-31",
            "author": { "@type": "Organization", "name": "Koreans Next Door", "url": "https://koreansnextdoor.com" },
            "publisher": { "@type": "Organization", "name": "Koreans Next Door", "logo": { "@type": "ImageObject", "url": "https://koreansnextdoor.com/logo.png" } },
            "inLanguage": "en",
            "about": { "@type": "Thing", "name": "Employment in South Korea" }
          })
        }}
      />
      <WorkContent />
    </>
  );
}
