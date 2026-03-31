import type { Metadata } from "next";
import MentalHealthContent from "./MentalHealthContent";

export const metadata: Metadata = {
  title: "Mental Health Guide for Foreigners in Korea",
  description: "Mental health and wellbeing guide for expats and foreigners living in Korea. Culture shock stages, English-speaking therapists in Seoul, crisis hotlines, and self-care tips.",
  keywords: [
    "English therapist Seoul",
    "mental health expat Korea",
    "culture shock Korea",
    "counseling Korea English",
    "Seoul psychologist English",
    "mental health foreigner Korea",
    "expat wellbeing Seoul",
  ],
  openGraph: {
    title: "Mental Health Guide for Foreigners in Korea — Koreans Next Door",
    description: "Culture shock stages, English-speaking therapists, crisis resources, and community support for foreigners living in Korea.",
    url: "https://koreansnextdoor.com/guide/mental-health",
  },
  alternates: { canonical: "https://koreansnextdoor.com/guide/mental-health" },
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
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://koreansnextdoor.com" },
              { "@type": "ListItem", position: 2, name: "Seoul Guide", item: "https://koreansnextdoor.com/guide" },
              { "@type": "ListItem", position: 3, name: "Mental Health", item: "https://koreansnextdoor.com/guide/mental-health" },
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
            "headline": "Mental Health Guide for Foreigners Living in Korea (2026)",
            "datePublished": "2026-01-01",
            "dateModified": "2026-03-31",
            "author": { "@type": "Organization", "name": "Koreans Next Door", "url": "https://koreansnextdoor.com" },
            "publisher": { "@type": "Organization", "name": "Koreans Next Door", "logo": { "@type": "ImageObject", "url": "https://koreansnextdoor.com/logo.png" } },
            "inLanguage": "en",
            "about": { "@type": "Thing", "name": "Mental Health and Wellbeing in South Korea" }
          })
        }}
      />
      <MentalHealthContent />
    </>
  );
}
