import type { Metadata } from "next";
import HealthContent from "./HealthContent";

export const metadata: Metadata = {
  title: "Find a Doctor in Seoul",
  description: "Find English-speaking doctors and clinics in Seoul. Understand Korea's clinic system, find specialists, and see an interactive clinic map.",
  keywords: ["English speaking doctor Seoul", "foreigner clinic Seoul", "English hospital Korea", "doctor Seoul expat", "Seoul medical guide foreigners", "Korea health insurance foreigners"],
  openGraph: {
    title: "Find a Doctor in Seoul — Koreans Next Door",
    description: "Korea's clinic system, English-speaking hospitals, and who to call when you need help.",
    url: "https://koreans-next-door.vercel.app/guide/health",
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
              { "@type": "ListItem", "position": 3, "name": "Find a Doctor", "item": "https://koreans-next-door.vercel.app/guide/health" }
            ]
          })
        }}
      />
      <HealthContent />
    </>
  );
}
