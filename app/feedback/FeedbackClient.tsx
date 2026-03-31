"use client";

import { useSearchParams } from "next/navigation";
import SurveyShell from "@/components/feedback/SurveyShell";

export default function FeedbackClient() {
  const searchParams = useSearchParams();
  const event = searchParams.get("event") || "general";
  const lang = searchParams.get("lang");
  const locale: "en" | "ko" = lang === "ko" ? "ko" : "en";

  return <SurveyShell event={event} initialLocale={locale} />;
}
