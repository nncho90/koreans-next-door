import type { Metadata } from "next";
import SettleContent from "./SettleContent";

export const metadata: Metadata = {
  title: "Settle in Seoul",
  description: "Your first week in Seoul: ARC registration, bank account, phone setup, transit cards, and everything to get started right.",
  keywords: ["moving to Seoul guide", "ARC card Korea", "Seoul expat first week", "foreigner registration Korea", "Seoul bank account", "Seoul phone plan"],
  openGraph: {
    title: "Settle in Seoul — Koreans Next Door",
    description: "ARC, bank account, health insurance, essential apps. The stuff you actually need to handle first.",
    url: "https://koreans-next-door.vercel.app/guide/settle",
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
              { "@type": "ListItem", "position": 3, "name": "Settle in Seoul", "item": "https://koreans-next-door.vercel.app/guide/settle" }
            ]
          })
        }}
      />
      <SettleContent />
    </>
  );
}
