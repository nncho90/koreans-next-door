import type { Metadata } from "next";
import { Suspense } from "react";
import FeedbackClient from "./FeedbackClient";

export const metadata: Metadata = {
  title: "KND Feedback",
  description: "Share your feedback about a Koreans Next Door event",
};

export default function FeedbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafaf8]" />}>
      <FeedbackClient />
    </Suspense>
  );
}
