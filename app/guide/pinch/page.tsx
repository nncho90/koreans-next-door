import type { Metadata } from "next";
import PinchContent from "./PinchContent";

export const metadata: Metadata = {
  title: "In a Pinch — Seoul Emergency Guide",
  description: "Korean cultural tips, emergency numbers, and a quick guide for when things get confusing for internationals in Seoul.",
  keywords: ["Korea cultural tips foreigners", "Seoul emergency numbers English", "unwritten rules Korea", "Korea etiquette guide", "foreigner Seoul help"],
  openGraph: {
    title: "Seoul Emergency Guide — Koreans Next Door",
    description: "Unwritten rules, emergency prep, and a real neighbor to ask when you're stuck.",
    url: "https://koreans-next-door.vercel.app/guide/pinch",
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
              { "@type": "ListItem", "position": 3, "name": "In a Pinch", "item": "https://koreans-next-door.vercel.app/guide/pinch" }
            ]
          })
        }}
      />
      <PinchContent />
    </>
  );
}
