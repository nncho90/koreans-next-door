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
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Why does each tool get its own page?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Each page targets a different search need and gives people one clear action instead of hiding the tool inside a bigger guide.",
                },
              },
              {
                "@type": "Question",
                name: "Which tool should I use first?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Use the address converter for forms, the phrasebook for speaking, and the form decoder when Korean paperwork gets confusing.",
                },
              },
              {
                "@type": "Question",
                name: "Are these tools free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. They are free to use on the site.",
                },
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
