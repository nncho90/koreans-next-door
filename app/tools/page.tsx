import type { Metadata } from "next";
import ToolsContent from "./ToolsContent";

export const metadata: Metadata = {
  title: "Koreans Next Door Tools — Address Converter, Phrasebook, Form Decoder",
  description:
    "Browse the Koreans Next Door tools: Korean address conversion, phrasebook, and form decoder pages built for daily life in Korea.",
  keywords: [
    "Korea expat tools",
    "Korean address converter",
    "Korean phrasebook",
    "Korean form decoder",
    "daily life in Korea tools",
    "useful Korea tools",
  ],
  openGraph: {
    title: "Koreans Next Door Tools",
    description:
      "A hub for the Korean address converter, phrasebook, and form decoder.",
    url: "https://koreansnextdoor.com/tools",
  },
  alternates: { canonical: "https://koreansnextdoor.com/tools" },
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
                name: "Tools",
                item: "https://koreansnextdoor.com/tools",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Koreans Next Door tools",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                url: "https://koreansnextdoor.com/tools/address",
                name: "Korean Address to English Converter",
              },
              {
                "@type": "ListItem",
                position: 2,
                url: "https://koreansnextdoor.com/tools/phrasebook",
                name: "Korean Phrasebook",
              },
              {
                "@type": "ListItem",
                position: 3,
                url: "https://koreansnextdoor.com/tools/forms",
                name: "Korean Form Decoder",
              },
            ],
          }),
        }}
      />
      <ToolsContent />
    </>
  );
}
