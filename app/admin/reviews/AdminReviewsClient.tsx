"use client";

import { useState } from "react";
import Image from "next/image";
import type { Review } from "@/lib/reviews";

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-900",
  published: "bg-emerald-100 text-emerald-900",
  removed: "bg-zinc-200 text-zinc-600",
};

export default function AdminReviewsClient({
  reviews: initial,
  adminKey,
}: {
  reviews: Review[];
  adminKey: string;
}) {
  const [reviews, setReviews] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  // Pending first, that is the queue that needs Nelson.
  const ordered = [...reviews].sort((a, b) => {
    const rank = (s: string) => (s === "pending" ? 0 : s === "published" ? 1 : 2);
    return rank(a.status) - rank(b.status) || b.createdAt.localeCompare(a.createdAt);
  });
  const waiting = reviews.filter((r) => r.status === "pending").length;

  async function act(id: string, action: "approve" | "hide" | "delete") {
    if (action === "delete" && !confirm("Delete this review and its photo for good?")) return;
    setBusy(id);
    try {
      const res = await fetch("/api/reviews/admin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ key: adminKey, id, action }),
      });
      if (!res.ok) {
        alert(`Failed: ${res.status}`);
        return;
      }
      setReviews((list) =>
        action === "delete"
          ? list.filter((r) => r.id !== id)
          : list.map((r) =>
              r.id === id
                ? { ...r, status: action === "approve" ? "published" : "removed" }
                : r
            )
      );
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold text-zinc-900">Reviews</h1>
      <p className="mt-2 text-zinc-600">
        {waiting > 0
          ? `${waiting} waiting for you. Everything else is already on the site.`
          : "Nothing waiting. Everything published is listed below."}
      </p>

      <ul className="mt-8 flex flex-col gap-4">
        {ordered.map((r) => (
          <li key={r.id} className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[r.status]}`}
              >
                {r.status}
              </span>
              <span className="text-sm font-bold text-zinc-900">{r.name}</span>
              <span className="text-sm text-zinc-500">{r.city}</span>
              {r.handle && <span className="text-sm text-zinc-400">@{r.handle}</span>}
              <span className="ml-auto text-xs text-zinc-400">
                {new Date(r.createdAt).toLocaleString()}
              </span>
            </div>

            <p className="mt-3 whitespace-pre-wrap text-zinc-800">{r.text}</p>

            {r.photoUrl && (
              <div className="relative mt-3 h-48 w-48 overflow-hidden rounded-lg bg-zinc-100">
                <Image src={r.photoUrl} alt="" fill sizes="192px" className="object-cover" />
              </div>
            )}

            {r.screening && !r.screening.allow && r.screening.reasons.length > 0 && (
              <p className="mt-3 text-sm text-amber-800">
                Flagged: {r.screening.reasons.join(", ")}
              </p>
            )}

            <div className="mt-4 flex gap-2">
              {r.status !== "published" && (
                <button
                  type="button"
                  disabled={busy === r.id}
                  onClick={() => act(r.id, "approve")}
                  className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Approve
                </button>
              )}
              {r.status === "published" && (
                <button
                  type="button"
                  disabled={busy === r.id}
                  onClick={() => act(r.id, "hide")}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 disabled:opacity-50"
                >
                  Take down
                </button>
              )}
              <button
                type="button"
                disabled={busy === r.id}
                onClick={() => act(r.id, "delete")}
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {ordered.length === 0 && (
        <p className="mt-10 text-zinc-500">No reviews yet.</p>
      )}
    </main>
  );
}
