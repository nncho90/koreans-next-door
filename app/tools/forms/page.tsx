import type { Metadata } from "next";
import FormsContent from "./FormsContent";

export const metadata: Metadata = {
  title: "Korean Form Decoder — Forms Explained in English",
  description:
    "Decode Korean bureaucratic forms field by field. Hospital registration, ARC application, bank account, address change, and phone plan forms explained in plain English.",
  keywords: [
    "Korean hospital form English translation",
    "Korean bank form guide foreigners",
    "ARC form English help Korea",
    "Korean bureaucratic forms explained",
    "foreigner form guide Korea",
    "진료 신청서 영어",
    "외국인등록 신청서 English",
    "Korean form decoder",
  ],
  openGraph: {
    title: "Korean Form Decoder — Koreans Next Door",
    description:
      "Every field explained in plain English. No more guessing on Korean forms.",
    url: "https://koreansnextdoor.com/tools/forms",
  },
  alternates: { canonical: "https://koreansnextdoor.com/tools/forms" },
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
                name: "Form Decoder",
                item: "https://koreansnextdoor.com/tools/forms",
              },
            ],
          }),
        }}
      />
      <FormsContent />
    </>
  );
}
