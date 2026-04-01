import { head } from "@vercel/blob";
import type { FeedbackSubmission } from "@/lib/feedbackTypes";
import { FEEDBACK_QUESTIONS } from "@/lib/feedbackQuestions";
import ResultsClient from "./ResultsClient";

interface Props {
  searchParams: Promise<{ event?: string }>;
}

async function getSubmissions(): Promise<FeedbackSubmission[]> {
  try {
    const info = await head("knd-feedback.json");
    const res = await fetch(info.url, { cache: "no-store" });
    return await res.json();
  } catch {
    return [];
  }
}

export default async function ResultsPage({ searchParams }: Props) {
  const params = await searchParams;

  const submissions = await getSubmissions();

  // Filter by event if specified
  const eventFilter = params.event;
  const filtered = eventFilter
    ? submissions.filter((s) => s.event === eventFilter)
    : submissions;

  // All unique events for filter UI
  const events = [...new Set(submissions.map((s) => s.event))].sort();

  // Compute averages for star questions
  const starQuestions = FEEDBACK_QUESTIONS.filter((q) => q.type === "stars");
  const starAverages = starQuestions.map((q) => {
    const vals = filtered
      .map((s) => s.answers[q.id])
      .filter((v): v is number => typeof v === "number");
    const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
    return { id: q.id, label: q.label, avg, count: vals.length };
  });

  // Compute star distribution (count of each star value 1–5 per question)
  const starDistributions: Record<string, number[]> = {};
  starQuestions.forEach((q) => {
    const counts = [0, 0, 0, 0, 0]; // index 0 = 1 star, index 4 = 5 stars
    filtered.forEach((s) => {
      const v = s.answers[q.id];
      if (typeof v === "number" && v >= 1 && v <= 5) counts[v - 1]++;
    });
    starDistributions[q.id] = counts;
  });

  // NPS calculation
  const npsVals = filtered
    .map((s) => s.answers["nps"])
    .filter((v): v is number => typeof v === "number");
  const promoters = npsVals.filter((v) => v >= 9).length;
  const detractors = npsVals.filter((v) => v <= 6).length;
  const npsScore =
    npsVals.length > 0
      ? Math.round(((promoters - detractors) / npsVals.length) * 100)
      : null;
  const passives = npsVals.filter((v) => v === 7 || v === 8).length;
  const npsBreakdown = { promoters, passives, detractors };

  // Pace distribution
  const paceVals = filtered.map((s) => s.answers["pace"]).filter(Boolean);
  const paceCount = {
    too_rushed: paceVals.filter((v) => v === "too_rushed").length,
    good: paceVals.filter((v) => v === "good").length,
    too_slow: paceVals.filter((v) => v === "too_slow").length,
    other: paceVals.filter(
      (v) => v !== "too_rushed" && v !== "good" && v !== "too_slow" && v !== "__other__"
    ).length,
  };

  return (
    <ResultsClient
      submissions={filtered}
      allSubmissions={submissions}
      events={events}
      starAverages={starAverages}
      starDistributions={starDistributions}
      npsScore={npsScore}
      npsCount={npsVals.length}
      npsBreakdown={npsBreakdown}
      paceCount={paceCount}
      currentEvent={eventFilter || "all"}
      secretKey=""
    />
  );
}
