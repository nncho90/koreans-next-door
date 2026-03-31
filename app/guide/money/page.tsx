import type { Metadata } from "next";
import MoneyContent from "./MoneyContent";

export const metadata: Metadata = {
  title: "Money & Banking Guide for Foreigners in Korea",
  description:
    "Open a Korean bank account, compare international transfer services, calculate your cost of living in Seoul, and understand taxes and pension as a foreigner in Korea.",
  keywords: [
    "bank account Korea foreigner",
    "send money Korea",
    "cost of living Seoul",
    "Korea income tax expat",
    "pension refund Korea",
    "Wise Sentbe Korea transfer",
    "Hana Bank foreigner",
    "Seoul monthly expenses",
  ],
  openGraph: {
    title: "Money & Banking Guide for Foreigners in Korea — Koreans Next Door",
    description:
      "Bank accounts, international transfers, cost of living calculator, taxes, and pension. Everything financial you need to know as a foreigner in Korea.",
    url: "https://koreansnextdoor.com/guide/money",
  },
  alternates: { canonical: "https://koreansnextdoor.com/guide/money" },
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
              {
                "@type": "ListItem",
                position: 3,
                name: "Money & Banking",
                item: "https://koreansnextdoor.com/guide/money",
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
            "@type": "Article",
            "headline": "Money & Banking Guide for Foreigners in Korea (2026)",
            "datePublished": "2026-01-01",
            "dateModified": "2026-03-31",
            "author": { "@type": "Organization", "name": "Koreans Next Door", "url": "https://koreansnextdoor.com" },
            "publisher": { "@type": "Organization", "name": "Koreans Next Door", "logo": { "@type": "ImageObject", "url": "https://koreansnextdoor.com/logo.png" } },
            "inLanguage": "en",
            "about": { "@type": "Thing", "name": "Banking and Finance in South Korea" }
          })
        }}
      />
      <MoneyContent />
    </>
  );
}
