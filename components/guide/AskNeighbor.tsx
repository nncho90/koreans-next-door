"use client";

import { InstagramLogo } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";

export default function AskNeighbor() {
  const { locale } = useLocale();

  const kakaoUrl = "https://open.kakao.com/o/gWb1KOci";

  return (
    <section id="ask" className="bg-[#ffd966] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#a07c00]">
          {locale === "ko" ? "커뮤니티" : "Community"}
        </p>
        <h2 className="mb-3 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          {locale === "ko" ? "궁금한 게 있으신가요?" : "Have a question?"}
        </h2>
        <p className="mb-2 text-xl font-semibold text-zinc-800">
          {locale === "ko" ? "이웃에게 직접 물어보세요." : "Ask a real neighbor."}
        </p>
        <p className="mb-10 text-base text-zinc-600">
          {locale === "ko"
            ? "구글 검색보다 직접 물어보는 게 훨씬 빠르고 정확해요."
            : "No Google rabbit holes. Just ask someone who's actually been through it."}
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 sm:w-auto"
          >
            KakaoTalk Open Chat
          </a>
          <a
            href="https://instagram.com/koreansnextdoor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-zinc-950/20 bg-transparent px-8 py-3.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-950/10 sm:w-auto"
          >
            <InstagramLogo size={16} />
            Instagram DM
          </a>
        </div>
      </div>
    </section>
  );
}
