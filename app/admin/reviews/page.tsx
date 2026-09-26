import type { Metadata } from "next";
import { readAllReviews } from "@/lib/reviews";
import { keyIsValid } from "@/app/api/reviews/admin/route";
import AdminReviewsClient from "./AdminReviewsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews",
  robots: { index: false, follow: false },
};

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (!keyIsValid(key ?? null)) {
    return (
      <main className="mx-auto max-w-md px-6 py-24">
        <h1 className="text-2xl font-bold text-zinc-900">Not available</h1>
        <p className="mt-3 text-zinc-600">
          This page needs a key. Open it with <code>?key=…</code> appended to the address.
        </p>
      </main>
    );
  }

  const reviews = await readAllReviews();
  return <AdminReviewsClient reviews={reviews} adminKey={key!} />;
}
