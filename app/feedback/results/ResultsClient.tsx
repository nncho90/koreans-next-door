"use client";

import { useState } from "react";
import type { FeedbackSubmission } from "@/lib/feedbackTypes";
import { FEEDBACK_QUESTIONS } from "@/lib/feedbackQuestions";

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
  npsScore: number | null;
  npsCount: number;
  paceCount: { too_rushed: number; good: number; too_slow: number; other: number };
  currentEvent: string;
  secretKey: string;
}

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

export default function ResultsClient({
  submissions,
  allSubmissions,
  events,
  starAverages,
  npsScore,
  npsCount,
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

  const paceTotal = paceCount.too_rushed + paceCount.good + paceCount.too_slow + paceCount.other;

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
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">📭</div>
            <p>No responses yet</p>
          </div>
        ) : (
          <>
            {/* Summary stats */}
            <div className="grid gap-3 mb-6">
              {/* Star ratings */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Ratings
                </h2>
                <div className="space-y-3">
                  {starAverages.map((q) => (
                    <div key={q.id} className="flex items-center gap-3">
                      <p className="text-sm text-gray-700 flex-1 min-w-0 truncate">{q.label.en}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        {q.avg !== null ? (
                          <>
                            <Stars value={Math.round(q.avg)} />
                            <span className="text-sm font-bold text-gray-900">
                              {q.avg.toFixed(1)}
                            </span>
                            <span className="text-xs text-gray-400">({q.count})</span>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400">No data</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NPS */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  NPS Score
                </h2>
                <div className="flex items-end gap-3">
                  <span
                    className={`text-4xl font-black ${
                      npsScore === null
                        ? "text-gray-300"
                        : npsScore >= 50
                        ? "text-green-500"
                        : npsScore >= 0
                        ? "text-yellow-500"
                        : "text-red-400"
                    }`}
                  >
                    {npsScore !== null ? (npsScore > 0 ? `+${npsScore}` : npsScore) : "—"}
                  </span>
                  <span className="text-sm text-gray-400 pb-1">({npsCount} responses)</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  50+ = Excellent · 0–50 = Good · Below 0 = Needs work
                </p>
              </div>

              {/* Pace */}
              {paceTotal > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Event Pace
                  </h2>
                  <div className="space-y-2">
                    {[
                      { key: "good", label: "Just right", color: "bg-green-400" },
                      { key: "too_rushed", label: "Too rushed", color: "bg-yellow-400" },
                      { key: "too_slow", label: "Too slow", color: "bg-blue-300" },
                      { key: "other", label: "Other", color: "bg-gray-300" },
                    ].map(({ key, label, color }) => {
                      const count = paceCount[key as keyof typeof paceCount];
                      const pct = paceTotal > 0 ? Math.round((count / paceTotal) * 100) : 0;
                      return (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-20 shrink-0">{label}</span>
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div
                              className={`${color} h-2 rounded-full transition-all`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-12 text-right">
                            {count} ({pct}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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
                      <span className="text-sm font-semibold text-gray-800">
                        {sub.event}
                      </span>
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
