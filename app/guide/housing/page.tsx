import type { Metadata } from "next";
import HousingContent from "./HousingContent";

export const metadata: Metadata = {
  title: "Housing Guide for Foreigners in Seoul",
  description:
    "Complete guide to renting in Seoul — jeonse vs wolse explained, neighborhood picker, lease contract red flags, and how to protect your deposit.",
  keywords: [
    "Seoul apartment guide foreigner",
    "jeonse wolse explained",
    "rent Korea foreigner",
    "Seoul housing guide expat",
    "lease contract Korea English",
  ],
  openGraph: {
    title: "Housing Guide for Foreigners in Seoul — Koreans Next Door",
    description:
      "Jeonse, wolse, lease red flags, and neighborhood picker. Everything you need to rent safely in Seoul.",
    url: "https://koreansnextdoor.com/guide/housing",
  },
  alternates: { canonical: "https://koreansnextdoor.com/guide/housing" },
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
                name: "Housing",
                item: "https://koreansnextdoor.com/guide/housing",
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
            "headline": "Housing Guide for Foreigners in Seoul (2026)",
            "datePublished": "2026-01-01",
            "dateModified": "2026-03-31",
            "author": { "@type": "Organization", "name": "Koreans Next Door", "url": "https://koreansnextdoor.com" },
            "publisher": { "@type": "Organization", "name": "Koreans Next Door", "logo": { "@type": "ImageObject", "url": "https://koreansnextdoor.com/logo.png" } },
            "inLanguage": "en",
            "about": { "@type": "Thing", "name": "Renting Housing in Seoul, South Korea" }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to rent an apartment in Seoul as a foreigner",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Decide your budget and rental type",
                "text": "Choose between jeonse (전세, large deposit, no monthly rent), wolse (월세, smaller deposit + monthly rent), or monthly rental. Monthly rent in Seoul ranges from 500,000 KRW to 3,000,000+ KRW depending on area."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Find a real estate agent (부동산)",
                "text": "Visit local 부동산 offices near your target neighborhood. Bring your ARC, proof of income, and be ready to communicate your budget and preferences."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "View apartments and check for red flags",
                "text": "Verify the landlord's ownership at the Korea Court Registry (등기부등본). Check for liens, confirm the address matches your contract. Avoid buildings with existing mortgages larger than your deposit."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Sign the lease contract (임대차계약서)",
                "text": "Have a Korean speaker review the contract. Ensure it includes the correct deposit amount, monthly rent, lease term (usually 2 years), and the landlord's real name and address."
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "Protect your deposit",
                "text": "Register your move-in (전입신고) at your local district office (주민센터) within 14 days. Apply for a confirmed date (확정일자) immediately. This protects your deposit legally."
              }
            ]
          })
        }}
      />
      <HousingContent />
    </>
  );
}
