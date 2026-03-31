import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Koreans Next Door — Seoul Expat Community",
  description: "A community of locals walking alongside internationals in Seoul. Come as a guest, stay as a neighbor.",
  keywords: ["Seoul expat community", "internationals in Seoul", "meet people Seoul", "Seoul English speakers", "Korea foreigner community"],
  openGraph: {
    title: "Koreans Next Door — Seoul Expat Community",
    description: "Come as a guest, stay as a neighbor. A hospitality community for internationals in Seoul.",
    url: "https://koreans-next-door.vercel.app",
  },
};

export default function Page() {
  return <HomeContent />;
}
