"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/lib/i18n";

const phrase = "\uC774\uC6C3\uC774 \uB418\uC5B4\uC918\uC11C \uACE0\uB9C8\uC6CC\uC694";

function FooterPhrase() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <span
      ref={ref}
      className="mt-2 block text-xs tracking-widest text-white/25"
    >
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
  const isKo = locale === "ko";

  return (
    <footer className="bg-zinc-950 px-6 py-8 text-center text-sm text-white/30">
      <nav className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
        <Link href="/guide/settle" className="text-xs text-white/40 hover:text-white/70 transition-colors">
          {isKo ? "정착하기" : "Settle in Seoul"}
        </Link>
        <Link href="/guide/explore" className="text-xs text-white/40 hover:text-white/70 transition-colors">
          {isKo ? "탐색하기" : "Explore Seoul"}
        </Link>
        <Link href="/guide/pinch" className="text-xs text-white/40 hover:text-white/70 transition-colors">
          {isKo ? "급할 때" : "In a Pinch"}
        </Link>
        <Link href="/guide/health" className="text-xs text-white/40 hover:text-white/70 transition-colors">
          {isKo ? "의료 안내" : "Find a Doctor"}
        </Link>
      </nav>
      &copy; {new Date().getFullYear()} {t.footer.copyright}
      <FooterPhrase />
    </footer>
  );
}
