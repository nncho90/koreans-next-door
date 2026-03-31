"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";
import { guideGroups } from "@/lib/guideData";

export default function SharedNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, locale, setLocale } = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isGuide = pathname === "/guide" || pathname.startsWith("/guide/");
  // Pages with a light-colored hero — need dark nav text even before scrolling
  const lightHero = pathname === "/guide" || pathname === "/guide/explore" || pathname === "/guide/pinch" || pathname === "/guide/health";
  const dark = scrolled || lightHero;

  const guideTextClass = isGuide
    ? dark ? "text-zinc-900 font-semibold" : "text-white font-semibold"
    : dark ? "text-zinc-500 hover:text-zinc-700" : "text-white/70 hover:text-white";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || menuOpen ? "bg-white/95 backdrop-blur-md border-b border-zinc-200/60 py-3" : "bg-transparent py-5"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Left: logo */}
          <Link
            href="/"
            className={`text-sm font-bold tracking-tight lowercase transition-colors duration-300 ${dark || menuOpen ? "text-zinc-900" : "text-white"}`}
          >
            koreans next door
          </Link>

          {/* Desktop right cluster */}
          <div className="hidden md:flex items-center gap-6">
            {/* Flat nav links */}
            {[
              { label: locale === "ko" ? "우리 이야기" : "Our Story", href: "/#mission" },
              { label: locale === "ko" ? "이벤트" : "Events", href: "/#events" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 pb-0.5 ${
                  dark ? "text-zinc-600 hover:text-zinc-900" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Guide link */}
            <Link
              href="/#guide"
              className={`text-sm font-medium transition-colors duration-300 pb-0.5 ${
                isGuide
                  ? "text-[#c9a800] border-b-2 border-[#ffd966]"
                  : dark ? "text-zinc-600 hover:text-zinc-900" : "text-white/70 hover:text-white"
              }`}
            >
              {locale === "ko" ? "가이드" : "Guide"}
            </Link>

            {/* Divider */}
            <div className={`h-4 w-px transition-colors duration-300 ${dark ? "bg-zinc-200" : "bg-white/20"}`} />

            {/* Language toggle */}
            <div className={`flex items-center rounded-full p-0.5 transition-all duration-300 ${dark ? "bg-zinc-100" : "bg-white/15"}`}>
              {(["ko", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-all duration-200 ${
                    locale === l
                      ? dark ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"
                      : dark ? "text-zinc-400 hover:text-zinc-700" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {l === "ko" ? "한" : "EN"}
                </button>
              ))}
            </div>

            {/* Join us CTA */}
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${dark ? "bg-zinc-950 text-white hover:bg-zinc-800" : "bg-white text-zinc-950 hover:bg-zinc-100"}`}
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
            {menuOpen
              ? <X size={22} weight="bold" className="text-zinc-900" />
              : <List size={22} weight="bold" className={dark || menuOpen ? "text-zinc-900" : "text-white"} />
            }
          </button>
        </div>

        {/* Guide sub-nav — visible only on guide pages */}
        {isGuide && (
          <div className="mx-auto max-w-7xl px-6 md:px-10 pb-2 pt-0.5 flex items-center gap-1.5">
            {guideGroups.map((g) => {
              const active = pathname === g.href;
              return (
                <Link
                  key={g.href}
                  href={g.href}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[#ffd966] text-zinc-950"
                      : dark
                        ? "text-zinc-500 hover:text-zinc-800"
                        : "text-white/60 hover:text-white"
                  }`}
                >
                  {locale === "ko" ? g.labelKo : g.labelEn}
                </Link>
              );
            })}
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
              {/* Top-level links */}
              {[
                { label: locale === "ko" ? "우리 이야기" : "Our Story", href: "/#mission" },
                { label: locale === "ko" ? "이벤트" : "Events", href: "/#events" },
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

              {/* Guide link */}
              <Link
                href="/#guide"
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-base font-semibold text-zinc-900 border-b border-zinc-100"
              >
                {locale === "ko" ? "가이드" : "Guide"}
              </Link>

              {/* Guide sub-sections (shown on guide pages) */}
              {isGuide && (
                <div className="pl-4 space-y-0">
                  {guideGroups.map((g) => {
                    const active = pathname === g.href;
                    return (
                      <Link
                        key={g.href}
                        href={g.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-2 py-2.5 text-sm border-b border-zinc-100 transition-colors ${
                          active ? "text-[#c9a800] font-semibold" : "text-zinc-500 font-medium"
                        }`}
                      >
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-[#ffd966] shrink-0" />}
                        {!active && <span className="h-1.5 w-1.5 rounded-full bg-transparent shrink-0" />}
                        {locale === "ko" ? g.labelKo : g.labelEn}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Language toggle */}
              <div className="pt-5 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Language</span>
                <div className="flex items-center rounded-full bg-zinc-100 p-0.5 ml-2">
                  {(["ko", "en"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLocale(l)}
                      className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-all duration-200 ${
                        locale === l ? "bg-zinc-950 text-white" : "text-zinc-400 hover:text-zinc-700"
                      }`}
                    >
                      {l === "ko" ? "한" : "EN"}
                    </button>
                  ))}
                </div>
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
