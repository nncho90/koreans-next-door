import type { Metadata } from "next";
import SettleContent from "./SettleContent";

export const metadata: Metadata = {
  title: "Settle in Seoul",
  description: "Your first week in Seoul: ARC registration, bank account, phone setup, transit cards, and everything to get started right.",
  keywords: ["moving to Seoul guide", "ARC card Korea", "Seoul expat first week", "foreigner registration Korea", "Seoul bank account", "Seoul phone plan"],
  openGraph: {
    title: "Settle in Seoul — Koreans Next Door",
    description: "ARC, bank account, health insurance, essential apps. The stuff you actually need to handle first.",
    url: "https://koreansnextdoor.com/guide/settle",
  },
  alternates: { canonical: "https://koreansnextdoor.com/guide/settle" },
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
              { "@type": "ListItem", "position": 3, "name": "Settle in Seoul", "item": "https://koreansnextdoor.com/guide/settle" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Complete Guide to Settling in Seoul (2026)",
            "datePublished": "2026-01-01",
            "dateModified": "2026-03-31",
            "author": { "@type": "Organization", "name": "Koreans Next Door", "url": "https://koreansnextdoor.com" },
            "publisher": { "@type": "Organization", "name": "Koreans Next Door", "logo": { "@type": "ImageObject", "url": "https://koreansnextdoor.com/logo.png" } },
            "inLanguage": "en",
            "about": { "@type": "Thing", "name": "Settling in Seoul, South Korea" }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to settle in Seoul as a foreigner",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Register your Alien Registration Card (ARC)",
                "text": "Visit your local Immigration Office within 90 days of arrival with your passport and a 3x4cm photo. The ARC is required for almost everything in Korea."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Open a Korean bank account",
                "text": "Take your ARC, passport, and phone number to Hana Bank, Shinhan Bank, or KB Kookmin Bank. Most branches near universities have English-speaking staff."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Get a Korean phone plan",
                "text": "Visit a KT, SKT, or LG U+ store with your ARC and passport. Plans start from 33,000 KRW/month. MVNO options like KT M-Mobile are cheaper."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Enroll in National Health Insurance (NHIS)",
                "text": "Foreigners staying 6+ months are automatically enrolled. Your employer handles enrollment for work visas. Visit your local NHIS office if needed."
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "Set up essential apps",
                "text": "Download KakaoTalk, Naver Maps (or Kakao Maps), Baemin or Coupang Eats for delivery, Toss or KakaoBank for banking."
              }
            ]
          })
        }}
      />
      <SettleContent />
    </>
  );
}
