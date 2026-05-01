"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
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
