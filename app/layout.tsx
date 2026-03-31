import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_KR } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffd966",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://koreansnextdoor.com"),
  title: {
    template: "%s — Koreans Next Door",
    default: "Koreans Next Door — Seoul Expat Community",
  },
  description:
    "A community of locals walking alongside internationals in Seoul. Come as a guest, stay as a neighbor.",
  keywords: [
    "Seoul expat community",
    "internationals in Seoul",
    "Seoul English community",
    "Korea foreigner friends",
    "expat Seoul",
    "living in Korea guide",
    "Seoul community for foreigners",
  ],
  authors: [{ name: "Koreans Next Door" }],
  openGraph: {
    title: "Koreans Next Door",
    description:
      "Come as a guest, stay as a neighbor. A hospitality community in Seoul.",
    siteName: "Koreans Next Door",
    url: "https://koreansnextdoor.com",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Koreans Next Door — Seoul Expat Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koreans Next Door — Seoul Expat Community",
    description:
      "Come as a guest, stay as a neighbor. A hospitality community in Seoul for internationals.",
  },
  alternates: {
    canonical: "https://koreansnextdoor.com",
  },
  other: {
    "geo.region": "KR-11",
    "geo.placename": "Seoul, South Korea",
    "geo.position": "37.5665;126.978",
    ICBM: "37.5665, 126.978",
    "naver-site-verification": "715306cb539dc54c55892017f484a5c687afac75",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${notoSansKR.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {/* Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Koreans Next Door",
              "url": "https://koreansnextdoor.com",
              "logo": "https://koreansnextdoor.com/logo.png",
              "description": "A community of locals walking alongside internationals in Seoul. Come as a guest, stay as a neighbor.",
              "areaServed": { "@type": "City", "name": "Seoul", "addressCountry": "KR" },
              "sameAs": ["https://www.instagram.com/koreansnextdoor"]
            })
          }}
        />
        {/* WebSite schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Koreans Next Door",
              "url": "https://koreansnextdoor.com",
              "description": "Seoul guide and community for internationals",
              "inLanguage": "en",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://koreansnextdoor.com/?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
