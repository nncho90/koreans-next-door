import type { Metadata } from "next";
import PhrasebookContent from "./PhrasebookContent";

export const metadata: Metadata = {
  title: "Korean Phrasebook for Foreigners — Situations That Actually Happen",
  description:
    "200+ Korean phrases organized by real-life situations — hospital, bank, landlord, immigration, restaurant and more. Tap any phrase for full-screen show mode to hand your phone to a Korean speaker.",
  keywords: [
    "Korean phrases hospital English",
    "useful Korean phrases expats",
    "Korean emergency phrases English",
    "Korean for foreigners in Korea",
    "Korean phrasebook situations",
    "Korean phrases bank",
    "Korean phrases landlord",
    "Korean phrases immigration ARC",
    "show Korean to Korean speaker",
    "Korean phrases daily life Seoul",
  ],
  openGraph: {
    title: "Korean Phrasebook — Situations That Actually Happen",
    description:
      "Tap any phrase to show it full-screen to the nearest Korean speaker. Hospital, bank, landlord, emergencies and more.",
    url: "https://koreansnextdoor.com/tools/phrasebook",
  },
  alternates: { canonical: "https://koreansnextdoor.com/tools/phrasebook" },
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
              {
                "@type": "ListItem",
                position: 3,
                name: "Korean Phrasebook",
                item: "https://koreansnextdoor.com/tools/phrasebook",
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
                name: "Can I hand this to a Korean speaker?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The phrasebook is made for showing your phone to a Korean speaker in the moment.",
                },
              },
              {
                "@type": "Question",
                name: "Does it work offline?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The phrases themselves do. Some extra features may need a connection, but the main phrasebook is usable without one.",
                },
              },
              {
                "@type": "Question",
                name: "Why make it a separate page?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It has its own search intent and works better when people can find it directly instead of digging through a bigger guide.",
                },
              },
            ],
          }),
        }}
      />
      <PhrasebookContent />
    </>
  );
}
