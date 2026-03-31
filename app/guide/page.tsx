import type { Metadata } from "next";
import GuideHubContent from "./GuideHubContent";

export const metadata: Metadata = {
  title: "Seoul Guide for Foreigners — All Topics",
  description:
    "Complete guide for foreigners and expats living in Seoul, South Korea. Find guides on housing, visas, banking, healthcare, daily life, work, mental health, and more.",
  keywords: [
    "Seoul guide foreigners",
    "expat guide Korea",
    "living in Seoul guide",
    "Korea foreigner resource",
    "Seoul expat tips 2026",
  ],
  openGraph: {
    title: "Seoul Guide for Foreigners — All Topics | Koreans Next Door",
    description:
      "Complete guide for foreigners and expats living in Seoul, South Korea. Visas, housing, banking, healthcare, daily life, work, mental health, and more.",
    url: "https://koreansnextdoor.com/guide",
  },
  alternates: { canonical: "https://koreansnextdoor.com/guide" },
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
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://koreansnextdoor.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Seoul Guide",
                item: "https://koreansnextdoor.com/guide",
              },
            ],
          }),
        }}
      />
      <GuideHubContent />
    </>
  );
}
