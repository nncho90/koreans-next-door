"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import Hero from "@/components/Hero";
import MissionStory from "@/components/MissionStory";
import Events from "@/components/Events";
import ImpactCounter from "@/components/ImpactCounter";
import UpcomingEvents from "@/components/UpcomingEvents";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Globe from "@/components/Globe";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import PhraseOfDay from "@/components/PhraseOfDay";

function PageContent() {
  const { t } = useLocale();

  return (
    <>
      <SharedNavbar />
      <main>
        <Hero />
        <MissionStory />
        <Events />
        <ImpactCounter />
        <UpcomingEvents />
        <Gallery />
        <Testimonials />
        <Globe />
        <FAQ />
        <Contact />
      </main>
      <PhraseOfDay />
      <SharedFooter />
    </>
  );
}

export default function Home() {
  return (
    <LocaleProvider>
      <PageContent />
    </LocaleProvider>
  );
}
