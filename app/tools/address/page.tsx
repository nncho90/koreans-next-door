import type { Metadata } from "next";
import AddressContent from "./AddressContent";

export const metadata: Metadata = {
  title: "Korean Address to English Converter — Road Name Address",
  description:
    "Convert Korean road-name addresses into English mailing format. Learn where the building number, district, city, country, and postal code go.",
  keywords: [
    "Korean address to English converter",
    "Korea English address converter",
    "Korean road name address English",
    "how to write Korean address in English",
    "Korean postal code 우",
    "도로명주소 영문 변환",
    "영문주소 변환",
  ],
  openGraph: {
    title: "Korean Address to English Converter — Koreans Next Door",
    description:
      "Paste a Korean address and format it for English mailing forms.",
    url: "https://koreansnextdoor.com/tools/address",
  },
  alternates: { canonical: "https://koreansnextdoor.com/tools/address" },
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
                name: "Address Converter",
                item: "https://koreansnextdoor.com/tools/address",
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
            "@type": "SoftwareApplication",
            name: "Korean Address to English Converter",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            url: "https://koreansnextdoor.com/tools/address",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
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
                name: "Is this the official English address format?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The page follows the Road Name Address English API output and shows the usual mailing order clearly.",
                },
              },
              {
                "@type": "Question",
                name: "Will this cost money?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The page is free. The live lookup only depends on the Juso approval key being configured on the server.",
                },
              },
              {
                "@type": "Question",
                name: "Why is the postal code at the end?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For English mailing format, the postal code is typically written at the end, after the country.",
                },
              },
            ],
          }),
        }}
      />
      <AddressContent />
    </>
  );
}
