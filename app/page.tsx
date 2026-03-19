"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MissionStory from "@/components/MissionStory";
import Events from "@/components/Events";
import ImpactCounter from "@/components/ImpactCounter";
import UpcomingEvents from "@/components/UpcomingEvents";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Globe from "@/components/Globe";
import SurvivalKit from "@/components/SurvivalKit";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import PhraseOfDay from "@/components/PhraseOfDay";

const phrase = "이웃이 되어줘서 고마워요";

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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MissionStory />
        <Events />
        <ImpactCounter />
        <UpcomingEvents />
        <Gallery />
        <Testimonials />
        <Globe />
        <SurvivalKit />
        <FAQ />
        <Contact />
      </main>
      <PhraseOfDay />
      <footer className="bg-zinc-950 px-6 py-8 text-center text-sm text-white/30">
        © {new Date().getFullYear()} Koreans Next Door · Seoul, Korea
        <FooterPhrase />
      </footer>
    </>
  );
}
