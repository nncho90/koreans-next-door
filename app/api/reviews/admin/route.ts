import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { deleteReview, readAllReviews, readReview, writeReview } from "@/lib/reviews";

export const dynamic = "force-dynamic";

/** Constant-time compare, so the secret can't be guessed a character at a time. */
export function keyIsValid(provided: string | null): boolean {
  const secret = process.env.REVIEWS_ADMIN_SECRET;
  if (!secret || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (!keyIsValid(searchParams.get("key"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const reviews = await readAllReviews();
  return NextResponse.json({ reviews }, { headers: { "x-robots-tag": "noindex" } });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !keyIsValid(body.key ?? null)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id, action } = body as { id?: string; action?: string };
  if (!id || !["approve", "hide", "delete"].includes(action ?? "")) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const review = await readReview(id);
  if (!review) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (action === "delete") {
    await deleteReview(review);
    return NextResponse.json({ ok: true, deleted: id });
  }

  review.status = action === "approve" ? "published" : "removed";
  await writeReview(review);
  return NextResponse.json({ ok: true, status: review.status });
}
