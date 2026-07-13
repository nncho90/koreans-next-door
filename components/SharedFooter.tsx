"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { guideGroups, guideCategories, getGuideLabel, getGuideCategoryLabel } from "@/lib/guideData";

function FooterPhrase() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const phrase = "이웃이 되어줘서 고마워요";

  return (
    <span ref={ref} className="mt-2 block text-xs tracking-widest text-white/25">
      {phrase.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function SharedFooter() {
  const { t, locale } = useLocale();

  const tools = [
    { href: "/tools", label: t.guideSection.toolsHubLabel },
    { href: "/tools/address", label: t.guideSection.toolAddressLabel },
    { href: "/tools/phrasebook", label: t.guideSection.toolPhrasebookLabel },
    { href: "/tools/forms", label: t.guideSection.toolFormDecoderLabel },
  ];

  return (
    <footer className="bg-zinc-950 px-6 py-12 md:py-14">
      {/* Brand row */}
      <div className="mx-auto max-w-5xl mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Koreans Next Door"
            width={112}
            height={56}
            style={{ height: "28px", width: "auto" }}
          />
          <p className="max-w-xs text-xs leading-relaxed text-white/40">
            {t.hero.tagline}
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3">
          <a
            href="https://www.instagram.com/koreansnextdoor/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#ffd966] px-5 py-2.5 text-sm font-semibold text-[#1a1a1a] transition-opacity hover:opacity-80"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            {t.contact.instagram}
          </a>
          <a
            href="https://open.kakao.com/o/gWb1KOci"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3C6.477 3 2 6.82 2 11.5c0 2.91 1.782 5.467 4.5 7.03L5.25 21l3.563-1.781A11.8 11.8 0 0 0 12 20c5.523 0 10-3.82 10-8.5S17.523 3 12 3z" />
            </svg>
            {t.contact.kakao}
          </a>
        </div>
      </div>

      {/* Guide links grid */}
      <div className="mx-auto max-w-5xl mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {guideCategories.map((cat) => {
            const catGuides = guideGroups.filter((g) => g.category === cat.id);
            return (
              <div key={cat.id}>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">
                  {getGuideCategoryLabel(cat, locale)}
                </p>
                <ul className="space-y-2">
                  {catGuides.map((g) => (
                    <li key={g.href}>
                      <Link
                        href={g.href}
                        className="text-xs text-white/40 hover:text-white/70 transition-colors"
                      >
                        {getGuideLabel(g, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Tools row */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 self-center mr-2">
            {t.navbar.tools}
          </p>
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {tool.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-white/30">
        &copy; {new Date().getFullYear()} {t.footer.copyright}
        <FooterPhrase />
      </div>
    </footer>
  );
}
