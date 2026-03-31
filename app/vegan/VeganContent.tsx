"use client";

import { LocaleProvider } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import VeganMap from "@/components/guide/VeganMap";

function Inner() {
  return (
    <>
      <SharedNavbar />
      <main className="pt-28">
        <VeganMap />
      </main>
      <SharedFooter />
    </>
  );
}

export default function VeganContent() {
  return (
    <LocaleProvider>
      <Inner />
    </LocaleProvider>
  );
}
