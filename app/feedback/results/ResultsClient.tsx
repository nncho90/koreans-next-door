"use client";

import { useState } from "react";
import type { FeedbackSubmission, Question } from "@/lib/feedbackTypes";
import { FEEDBACK_QUESTIONS } from "@/lib/feedbackQuestions";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StarAverage {
  id: string;
  label: { en: string; ko: string };
  avg: number | null;
  count: number;
}

interface Props {
  submissions: FeedbackSubmission[];
  allSubmissions: FeedbackSubmission[];
  events: string[];
  starAverages: StarAverage[];
  starDistributions: Record<string, number[]>;
  npsScore: number | null;
  npsCount: number;
  npsBreakdown: { promoters: number; passives: number; detractors: number };
  paceCount: { too_rushed: number; good: number; too_slow: number; other: number };
  currentEvent: string;
  secretKey: string;
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={s <= value ? "#ffd966" : "none"}
          stroke={s <= value ? "#f5c842" : "#d1d5db"}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

// ─── Question card components ─────────────────────────────────────────────────

function StarsCard({
  q,
  avg,
  count,
  distribution,
}: {
  q: Question;
  avg: number | null;
  count: number;
  distribution: number[];
}) {
  const total = distribution.reduce((a, b) => a + b, 0);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Rating</p>
      <h3 className="text-sm font-semibold text-gray-800 mb-4">{q.label.en}</h3>
      <div className="flex items-center gap-3 mb-4">
        {avg !== null ? (
          <>
            <span className="text-3xl font-black text-gray-900">{avg.toFixed(1)}</span>
            <Stars value={Math.round(avg)} />
            <span className="text-xs text-gray-400">{count} responses</span>
          </>
        ) : (
          <span className="text-xs text-gray-400">No data</span>
        )}
      </div>
      {total > 0 && (
        <div className="space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const cnt = distribution[star - 1];
            const pct = total > 0 ? Math.round((cnt / total) * 100) : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-3 text-right">{star}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#ffd966" stroke="#f5c842" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-[#ffd966] h-1.5 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-6 text-right">{cnt}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NpsCard({
  q,
  score,
  count,
  breakdown,
}: {
  q: Question;
  score: number | null;
  count: number;
  breakdown: { promoters: number; passives: number; detractors: number };
}) {
  const total = breakdown.promoters + breakdown.passives + breakdown.detractors;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">NPS</p>
      <h3 className="text-sm font-semibold text-gray-800 mb-4">{q.label.en}</h3>
      <div className="flex items-end gap-3 mb-4">
        <span
          className={`text-4xl font-black ${
            score === null
              ? "text-gray-300"
              : score >= 50
              ? "text-green-500"
              : score >= 0
              ? "text-yellow-500"
              : "text-red-400"
          }`}
        >
          {score !== null ? (score > 0 ? `+${score}` : score) : "—"}
        </span>
        <span className="text-sm text-gray-400 pb-1">({count} responses)</span>
      </div>
      {total > 0 && (
        <div className="space-y-2 mb-3">
          {[
            { key: "promoters", label: "Promoters (9–10)", color: "bg-green-400" },
            { key: "passives", label: "Passives (7–8)", color: "bg-yellow-300" },
            { key: "detractors", label: "Detractors (0–6)", color: "bg-red-300" },
          ].map(({ key, label, color }) => {
            const cnt = breakdown[key as keyof typeof breakdown];
            const pct = total > 0 ? Math.round((cnt / total) * 100) : 0;
            return (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-28 shrink-0">{label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-14 text-right">
                  {cnt} ({pct}%)
                </span>
              </div>
            );
          })}
        </div>
      )}
      <p className="text-xs text-gray-400">50+ = Excellent · 0–50 = Good · Below 0 = Needs work</p>
    </div>
  );
}

function MultipleChoiceCard({
  q,
  paceCount,
}: {
  q: Question;
  paceCount: { too_rushed: number; good: number; too_slow: number; other: number };
}) {
  const total = paceCount.too_rushed + paceCount.good + paceCount.too_slow + paceCount.other;
  if (total === 0) return null;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Multiple Choice</p>
      <h3 className="text-sm font-semibold text-gray-800 mb-4">{q.label.en}</h3>
      <div className="space-y-2">
        {[
          { key: "good" as const, label: "Just right", color: "bg-green-400" },
          { key: "too_rushed" as const, label: "Too rushed", color: "bg-yellow-400" },
          { key: "too_slow" as const, label: "Too slow", color: "bg-blue-300" },
          { key: "other" as const, label: "Other", color: "bg-gray-300" },
        ].map(({ key, label, color }) => {
          const cnt = paceCount[key];
          const pct = total > 0 ? Math.round((cnt / total) * 100) : 0;
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-20 shrink-0">{label}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs text-gray-500 w-14 text-right">
                {cnt} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LongtextCard({
  q,
  submissions,
}: {
  q: Question;
  submissions: FeedbackSubmission[];
}) {
  const answers = submissions
    .map((s) => s.answers[q.id])
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-sm font-semibold text-gray-800">{q.label.en}</h3>
        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0">
          {answers.length} {answers.length === 1 ? "response" : "responses"}
        </span>
      </div>
      {answers.length === 0 ? (
        <p className="text-xs text-gray-400">No responses yet</p>
      ) : (
        <div className="space-y-2">
          {answers.map((text, i) => (
            <div key={i} className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ResultsClient({
  submissions,
  allSubmissions,
  events,
  starAverages,
  starDistributions,
  npsScore,
  npsCount,
  npsBreakdown,
  paceCount,
  currentEvent,
  secretKey,
}: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  function handleEventChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    const url = new URL(window.location.href);
    if (val === "all") {
      url.searchParams.delete("event");
    } else {
      url.searchParams.set("event", val);
    }
    window.location.href = url.toString();
  }

  function exportCSV() {
    const headers = ["id", "event", "submittedAt", ...FEEDBACK_QUESTIONS.map((q) => q.id)];
    const rows = submissions.map((s) => [
      s.id,
      s.event,
      s.submittedAt,
      ...FEEDBACK_QUESTIONS.map((q) => String(s.answers[q.id] ?? "")),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `knd-feedback-${currentEvent}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] py-10 px-5">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">KND</p>
            <h1 className="text-2xl font-bold text-gray-900">Feedback Results</h1>
          </div>
          <button
            onClick={exportCSV}
            className="text-sm px-4 py-2 rounded-xl border-2 border-gray-200 font-semibold text-gray-600 hover:border-[#ffd966] transition-all"
          >
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Event</label>
          <select
            value={currentEvent}
            onChange={handleEventChange}
            className="text-sm border-2 border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-[#ffd966]"
          >
            <option value="all">All ({allSubmissions.length})</option>
            {events.map((ev) => (
              <option key={ev} value={ev}>
                {ev} ({allSubmissions.filter((s) => s.event === ev).length})
              </option>
            ))}
          </select>
          {submissions.length > 0 && (
            <span className="text-xs text-gray-400 ml-auto">
              {submissions.length} {submissions.length === 1 ? "response" : "responses"}
            </span>
          )}
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">📭</div>
            <p>No responses yet</p>
          </div>
        ) : (
          <>
            {/* Question cards — one per question in survey order */}
            <div className="grid gap-3 mb-8">
              {FEEDBACK_QUESTIONS.map((q) => {
                if (q.type === "stars") {
                  const starData = starAverages.find((s) => s.id === q.id);
                  return (
                    <StarsCard
                      key={q.id}
                      q={q}
                      avg={starData?.avg ?? null}
                      count={starData?.count ?? 0}
                      distribution={starDistributions[q.id] ?? [0, 0, 0, 0, 0]}
                    />
                  );
                }
                if (q.type === "nps") {
                  return (
                    <NpsCard
                      key={q.id}
                      q={q}
                      score={npsScore}
                      count={npsCount}
                      breakdown={npsBreakdown}
                    />
                  );
                }
                if (q.type === "multiplechoice") {
                  return <MultipleChoiceCard key={q.id} q={q} paceCount={paceCount} />;
                }
                if (q.type === "longtext") {
                  return <LongtextCard key={q.id} q={q} submissions={submissions} />;
                }
                return null;
              })}
            </div>

            {/* Individual responses */}
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Responses ({submissions.length})
            </h2>
            <div className="space-y-2">
              {[...submissions].reverse().map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
                  >
                    <div>
                      <span className="text-sm font-semibold text-gray-800">{sub.event}</span>
                      <span className="text-xs text-gray-400 ml-2">
                        {new Date(sub.submittedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">{expanded === sub.id ? "▲" : "▼"}</span>
                  </button>
                  {expanded === sub.id && (
                    <div className="px-5 pb-5 border-t border-gray-50">
                      <div className="space-y-3 mt-3">
                        {FEEDBACK_QUESTIONS.map((q) => {
                          const ans = sub.answers[q.id];
                          if (ans === undefined || ans === "") return null;
                          return (
                            <div key={q.id}>
                              <p className="text-xs text-gray-400 mb-0.5">{q.label.en}</p>
                              {q.type === "stars" && typeof ans === "number" ? (
                                <div className="flex items-center gap-1.5">
                                  <Stars value={ans} />
                                  <span className="text-sm font-semibold">{ans}/5</span>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-800">{String(ans)}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
