"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";

const guideGroups = [
  {
    en: "Settle in",
    ko: "정착하기",
    href: "/guide/settle",
    items: [
      { en: "First Week Checklist", ko: "첫째 주 체크리스트", href: "/guide/settle#first-week" },
      { en: "Bureaucracy Guide", ko: "행정 처리 가이드", href: "/guide/settle#bureaucracy" },
      { en: "Survival Kit", ko: "서울 생존 키트", href: "/guide/settle#survival-kit" },
    ],
  },
  {
    en: "Explore",
    ko: "탐색하기",
    href: "/guide/explore",
    items: [
      { en: "Food Decoder", ko: "한국 음식 가이드", href: "/guide/explore#food" },
      { en: "Neighborhoods", ko: "동네 안내", href: "/guide/explore#neighborhoods" },
      { en: "Seasonal Calendar", ko: "월별 생활 가이드", href: "/guide/explore#seasons" },
    ],
  },
  {
    en: "In a pinch",
    ko: "급할 때",
    href: "/guide/pinch",
    items: [
      { en: "Cultural Tips", ko: "한국 문화 팁", href: "/guide/pinch#culture" },
      { en: "Emergency Card", ko: "긴급 잠금화면 카드", href: "/guide/pinch#emergency" },
      { en: "Ask a Neighbor", ko: "이웃에게 물어보기", href: "/guide/pinch#ask" },
    ],
  },
];

export default function SharedNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const { t, locale, setLocale } = useLocale();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isGuide = pathname === "/guide" || pathname.startsWith("/guide/");
  // Pages with a light-colored hero — need dark nav text even before scrolling
  const lightHero = pathname === "/guide" || pathname === "/guide/explore" || pathname === "/guide/pinch";
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
          <div className="hidden md:flex items-center gap-3">
            {/* Guide dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${guideTextClass}`}
              >
                {locale === "ko" ? "가이드" : "Guide"}
                <CaretDown
                  size={13}
                  weight="bold"
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-xl shadow-black/10"
                  >
                    {guideGroups.map((group, gi) => (
                      <div key={gi} className={gi > 0 ? "mt-2 border-t border-zinc-100 pt-2" : ""}>
                        <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-[#c9a800]">
                          {locale === "ko" ? group.ko : group.en}
                        </p>
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className="block rounded-xl px-2 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                          >
                            {locale === "ko" ? item.ko : item.en}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
            onClick={() => { setMenuOpen((v) => !v); setExpandedGroup(null); }}
            aria-label="Toggle menu"
          >
            {menuOpen
              ? <X size={22} weight="bold" className="text-zinc-900" />
              : <List size={22} weight="bold" className={dark || menuOpen ? "text-zinc-900" : "text-white"} />
            }
          </button>
        </div>
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
              {/* Guide sections accordion */}
              {guideGroups.map((group, gi) => (
                <div key={gi}>
                  <button
                    onClick={() => setExpandedGroup(expandedGroup === gi ? null : gi)}
                    className="flex w-full items-center justify-between py-3 text-base font-semibold text-zinc-900"
                  >
                    <span>{locale === "ko" ? group.ko : group.en}</span>
                    <CaretDown
                      size={14}
                      weight="bold"
                      className={`text-zinc-400 transition-transform duration-200 ${expandedGroup === gi ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedGroup === gi && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-2 pl-2 space-y-0.5">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className="block rounded-xl px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                            >
                              {locale === "ko" ? item.ko : item.en}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="border-b border-zinc-100" />
                </div>
              ))}

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
