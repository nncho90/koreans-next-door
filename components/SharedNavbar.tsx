"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, CaretDownIcon as CaretDown } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";
import { guideGroups, guideCategories, getGuideLabel, getGuideCategoryLabel } from "@/lib/guideData";
import LanguagePicker from "@/components/LanguagePicker";

const TOOLS = [
  { href: "/tools/phrasebook", emoji: "💬", labelEn: "Phrasebook", labelKo: "상황별 한국어" },
  { href: "/tools/forms", emoji: "📄", labelEn: "Form Decoder", labelKo: "서류 해석기" },
];

// Column layout: col1 = getting-started + discover, col2 = living-here, col3 = wellbeing + tools (hardcoded below)
const COL_CATEGORIES = [
  ["getting-started", "discover"],
  ["living-here"],
] as const;

export default function SharedNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const { t, locale } = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isGuide =
    pathname === "/guide" ||
    pathname.startsWith("/guide/") ||
    pathname.startsWith("/tools/");

  const lightHero =
    pathname === "/guide" ||
    pathname === "/guide/explore" ||
    pathname === "/guide/pinch" ||
    pathname === "/guide/health" ||
    pathname === "/guide/housing" ||
    pathname === "/guide/visa" ||
    pathname === "/guide/money" ||
    pathname === "/guide/daily" ||
    pathname === "/guide/work" ||
    pathname === "/guide/mental-health" ||
    pathname === "/tools/phrasebook" ||
    pathname === "/tools/forms";

  const dark = scrolled || lightHero;

  function getToolLabel(tool: typeof TOOLS[number]): string {
    return locale === "ko" ? tool.labelKo : tool.labelEn;
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-white/95 backdrop-blur-md border-b border-zinc-200/60 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link
            href="/"
            className={`text-sm font-bold tracking-tight lowercase transition-colors duration-300 ${
              dark || menuOpen ? "text-zinc-900" : "text-white"
            }`}
          >
            koreans next door
          </Link>

          {/* Desktop cluster */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: t.navbar.ourStory, href: "/#mission" },
              { label: t.navbar.events, href: "/#events" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  dark ? "text-zinc-600 hover:text-zinc-900" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Guides dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setGuidesOpen(true)}
              onMouseLeave={() => setGuidesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                  isGuide
                    ? "text-[#c9a800] font-semibold"
                    : dark
                    ? "text-zinc-600 hover:text-zinc-900"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {t.navbar.guides}
                <CaretDown
                  size={12}
                  weight="bold"
                  className={`transition-transform duration-200 ${guidesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {guidesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.14 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[660px] rounded-2xl bg-white shadow-xl shadow-zinc-200/70 border border-zinc-100/80 p-5"
                  >
                    <div className="grid grid-cols-3 gap-5">
                      {/* Col 1 & 2: categories */}
                      {COL_CATEGORIES.map((catIds, colIdx) => (
                        <div key={colIdx} className="space-y-5">
                          {catIds.map((catId) => {
                            const cat = guideCategories.find((c) => c.id === catId)!;
                            const guides = guideGroups.filter((g) => g.category === catId);
                            return (
                              <div key={catId}>
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                  {getGuideCategoryLabel(cat, locale)}
                                </p>
                                <div className="space-y-0.5">
                                  {guides.map((g) => (
                                    <Link
                                      key={g.href}
                                      href={g.href}
                                      onClick={() => setGuidesOpen(false)}
                                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                                        pathname === g.href
                                          ? "bg-[#fff9e0] text-zinc-900 font-semibold"
                                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                                      }`}
                                    >
                                      <span>{g.emoji}</span>
                                      {getGuideLabel(g, locale)}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}

                      {/* Col 3: Wellbeing + Tools */}
                      <div className="space-y-5">
                        {(() => {
                          const cat = guideCategories.find((c) => c.id === "wellbeing")!;
                          const guides = guideGroups.filter((g) => g.category === "wellbeing");
                          return (
                            <div>
                              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                {getGuideCategoryLabel(cat, locale)}
                              </p>
                              <div className="space-y-0.5">
                                {guides.map((g) => (
                                  <Link
                                    key={g.href}
                                    href={g.href}
                                    onClick={() => setGuidesOpen(false)}
                                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                                      pathname === g.href
                                        ? "bg-[#fff9e0] text-zinc-900 font-semibold"
                                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                                    }`}
                                  >
                                    <span>{g.emoji}</span>
                                    {getGuideLabel(g, locale)}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* Tools */}
                        <div>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                            {t.navbar.tools}
                          </p>
                          <div className="space-y-0.5">
                            {TOOLS.map((tool) => (
                              <Link
                                key={tool.href}
                                href={tool.href}
                                onClick={() => setGuidesOpen(false)}
                                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                                  pathname === tool.href
                                    ? "bg-[#fff9e0] text-zinc-900 font-semibold"
                                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                                }`}
                              >
                                <span>{tool.emoji}</span>
                                {getToolLabel(tool)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div
              className={`h-4 w-px transition-colors duration-300 ${
                dark ? "bg-zinc-200" : "bg-white/20"
              }`}
            />

            {/* Language picker */}
            <LanguagePicker dark={dark} />

            {/* Join us CTA */}
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                dark
                  ? "bg-zinc-950 text-white hover:bg-zinc-800"
                  : "bg-white text-zinc-950 hover:bg-zinc-100"
              }`}
            >
              {t.navbar.joinUs}
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={22} weight="bold" className="text-zinc-900" />
            ) : (
              <List
                size={22}
                weight="bold"
                className={dark || menuOpen ? "text-zinc-900" : "text-white"}
              />
            )}
          </button>
        </div>

        {/* Guide sub-nav — scrollable pills on guide/tool pages */}
        {isGuide && (
          <div
            className="mx-auto max-w-7xl px-6 md:px-10 pb-2 pt-0.5 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex items-center gap-1.5 min-w-max">
              {guideGroups.map((g) => {
                const active = pathname === g.href;
                return (
                  <Link
                    key={g.href}
                    href={g.href}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                      active
                        ? "bg-[#ffd966] text-zinc-950"
                        : dark
                        ? "text-zinc-500 hover:text-zinc-800"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {g.emoji} {getGuideLabel(g, locale)}
                  </Link>
                );
              })}
              {/* Tools in sub-nav */}
              {TOOLS.map((tool) => {
                const active = pathname === tool.href;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                      active
                        ? "bg-[#ffd966] text-zinc-950"
                        : dark
                        ? "text-zinc-500 hover:text-zinc-800"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {tool.emoji} {getToolLabel(tool)}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 top-[57px] z-40 bg-white overflow-y-auto md:hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {[
                { label: t.navbar.ourStory, href: "/#mission" },
                { label: t.navbar.events, href: "/#events" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-base font-semibold text-zinc-900 border-b border-zinc-100"
                >
                  {link.label}
                </a>
              ))}

              {/* Categorized guide sections */}
              {guideCategories.map((cat) => {
                const catGuides = guideGroups.filter((g) => g.category === cat.id);
                return (
                  <div key={cat.id} className="pt-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {getGuideCategoryLabel(cat, locale)}
                    </p>
                    <div className="space-y-0">
                      {catGuides.map((g) => {
                        const active = pathname === g.href;
                        return (
                          <Link
                            key={g.href}
                            href={g.href}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-2.5 py-2.5 text-sm border-b border-zinc-50 transition-colors ${
                              active
                                ? "text-[#c9a800] font-semibold"
                                : "text-zinc-600 font-medium"
                            }`}
                          >
                            <span>{g.emoji}</span>
                            {getGuideLabel(g, locale)}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Tools */}
              <div className="pt-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {t.navbar.tools}
                </p>
                <div className="space-y-0">
                  {TOOLS.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 py-2.5 text-sm border-b border-zinc-50 text-zinc-600 font-medium"
                    >
                      <span>{tool.emoji}</span>
                      {getToolLabel(tool)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Language picker */}
              <div className="pt-5">
                <LanguagePicker dark={true} />
              </div>

              {/* Join us CTA */}
              <div className="pt-4">
                <a
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-full bg-zinc-950 py-3 text-center text-sm font-semibold text-white"
                >
                  {t.navbar.joinUs}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
