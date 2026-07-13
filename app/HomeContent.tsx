"use client";

import { LocaleProvider } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import Hero from "@/components/Hero";
import MissionStory from "@/components/MissionStory";
import Events from "@/components/Events";
import ImpactCounter from "@/components/ImpactCounter";
import UpcomingEvents from "@/components/UpcomingEvents";
import Gallery from "@/components/Gallery";
import VideoWall from "@/components/VideoWall";
import Testimonials from "@/components/Testimonials";
import Globe from "@/components/Globe";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import PhraseOfDay from "@/components/PhraseOfDay";
import SeoulSkyline from "@/components/SeoulSkyline/SeoulSkyline";

function PageContent() {
  // Home page section order: photo/video-forward layout
  return (
    <>
      <SharedNavbar />
      <main>
        <Hero />
        <MissionStory />
        <Events />
        <ImpactCounter />
        <SeoulSkyline />
        <UpcomingEvents />
        <Gallery />
        <VideoWall />
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
