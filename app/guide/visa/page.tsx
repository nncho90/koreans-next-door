import type { Metadata } from "next";
import VisaContent from "./VisaContent";

export const metadata: Metadata = {
  title: "Visa Guide for Foreigners in Korea",
  description: "Understand Korean visa types, find the right visa for your situation, get your ARC card, and avoid common immigration pitfalls.",
  keywords: [
    "Korea visa guide foreigners",
    "Korean visa types",
    "E-2 visa Korea",
    "D-2 student visa Korea",
    "ARC card Korea",
    "alien registration card Korea",
    "F-6 marriage visa Korea",
    "Korean immigration guide expat",
    "how to get visa Korea",
    "Korea visa requirements",
  ],
  openGraph: {
    title: "Visa Guide for Foreigners in Korea — Koreans Next Door",
    description: "Find the right visa, get your ARC, and avoid the common pitfalls that trip up newcomers.",
    url: "https://koreansnextdoor.com/guide/visa",
  },
  alternates: { canonical: "https://koreansnextdoor.com/guide/visa" },
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
              { "@type": "ListItem", "position": 3, "name": "Visa & Immigration", "item": "https://koreansnextdoor.com/guide/visa" },
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
            "headline": "Korea Visa Guide for Foreigners (2026)",
            "datePublished": "2026-01-01",
            "dateModified": "2026-03-31",
            "author": { "@type": "Organization", "name": "Koreans Next Door", "url": "https://koreansnextdoor.com" },
            "publisher": { "@type": "Organization", "name": "Koreans Next Door", "logo": { "@type": "ImageObject", "url": "https://koreansnextdoor.com/logo.png" } },
            "inLanguage": "en",
            "about": { "@type": "Thing", "name": "Korean Visa and Immigration" }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to apply for an Alien Registration Card (ARC) in Korea",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Prepare required documents",
                "text": "Gather: passport, visa, 1 passport photo (3x4cm), application form (available at Immigration Office), fee of 30,000 KRW."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Visit your local Immigration Office",
                "text": "Find the nearest Hi Korea Immigration Office at hikorea.go.kr. The main Seoul office is in Mokdong (목동). Bring all documents. Arrive early — wait times can be 2-3 hours."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Submit your application",
                "text": "Take a number, wait, then submit documents to the officer. Processing takes approximately 2-3 weeks."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Collect your ARC",
                "text": "Return to the Immigration Office when notified (by text message) to collect your card. Bring your passport."
              }
            ]
          })
        }}
      />
      <VisaContent />
    </>
  );
}
