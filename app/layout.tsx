import type { Metadata } from "next";
import { Geist, Noto_Sans_KR } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Koreans Next Door",
  description:
    "A community of locals walking alongside internationals in Seoul. Come as a guest, stay as a neighbor.",
  openGraph: {
    title: "Koreans Next Door",
    description:
      "Come as a guest, stay as a neighbor. A hospitality community in Seoul.",
    siteName: "Koreans Next Door",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${notoSansKR.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
