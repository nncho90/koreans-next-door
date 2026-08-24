import type { Metadata } from "next";
import ChatContent from "./ChatContent";

export const metadata: Metadata = {
  title: "Group Chat",
  description:
    "New to the KND KakaoTalk chat? Introduce yourself first, then check the ground rules on what to share freely and what to ask a leader about.",
  openGraph: {
    title: "Group Chat — Koreans Next Door",
    description:
      "New to the KND KakaoTalk chat? Introduce yourself first, then check the ground rules.",
    url: "https://koreansnextdoor.com/chat",
  },
  alternates: { canonical: "https://koreansnextdoor.com/chat" },
};

export default function Page() {
  return <ChatContent />;
}
