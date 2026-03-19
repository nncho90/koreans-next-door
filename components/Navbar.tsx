"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-zinc-200/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className={`text-sm font-bold tracking-tight lowercase transition-colors duration-300 ${
            scrolled ? "text-zinc-900" : "text-white"
          }`}
        >
          koreans next door
        </Link>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
            scrolled
              ? "bg-zinc-950 text-white hover:bg-zinc-800"
              : "bg-white text-zinc-950 hover:bg-zinc-100"
          }`}
        >
          Join us
        </motion.a>
      </div>
    </nav>
  );
}
