import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { screenReview } from "@/lib/moderation";
import {
  LIMITS,
  type Review,
  checkRateLimit,
  containsLinkOrMarkup,
  hash,
  normaliseText,
  readAllReviews,
  readPublishedReviews,
  sniffImage,
  storePhoto,
  writeReview,
} from "@/lib/reviews";

export const dynamic = "force-dynamic";

const ALLOWED_HOSTS = [
  "koreansnextdoor.com",
  "www.koreansnextdoor.com",
  "localhost:3000",
  "localhost:3111",
];

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin") ?? req.headers.get("referer");
  if (!origin) return false;
  try {
    const host = new URL(origin).host;
    return ALLOWED_HOSTS.includes(host) || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function GET() {
  const reviews = await readPublishedReviews();
  return NextResponse.json(
    { reviews },
    { headers: { "cache-control": "public, s-maxage=60, stale-while-revalidate=300" } }
  );
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return bad("bad_origin", 403);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return bad("bad_body");
  }

  // 1. Bot traps: a field humans never see, and a form that was filled in too fast.
  if ((form.get("website") as string | null)?.trim()) return bad("spam_detected");
  const renderedAt = Number(form.get("renderedAt"));
  const age = Date.now() - renderedAt;
  if (!Number.isFinite(renderedAt) || age < 3000 || age > 2 * 60 * 60 * 1000) {
    return bad("form_timing");
  }

  // 2. Shape and length.
  const name = String(form.get("name") ?? "").trim();
  const city = String(form.get("city") ?? "").trim();
  const handleRaw = String(form.get("handle") ?? "").trim();
  const text = String(form.get("text") ?? "").trim();

  if (!name || name.length > LIMITS.name) return bad("bad_name");
  if (!city || city.length > LIMITS.city) return bad("bad_city");
  if (handleRaw.length > LIMITS.handle) return bad("bad_handle");
  if (text.length < LIMITS.textMin) return bad("text_too_short");
  if (text.length > LIMITS.textMax) return bad("text_too_long");
  if (containsLinkOrMarkup(text) || containsLinkOrMarkup(name)) return bad("no_links");

  const handle = handleRaw ? handleRaw.replace(/^@+/, "") : undefined;

  // 3. Photo, if there is one. Type is decided by the bytes, not the header.
  let photo: { bytes: Buffer; contentType: "image/jpeg" | "image/png" } | undefined;
  const file = form.get("photo");
  if (file && typeof file !== "string" && file.size > 0) {
    if (file.size > LIMITS.photoBytes) return bad("photo_too_large");
    const bytes = Buffer.from(await file.arrayBuffer());
    const contentType = sniffImage(bytes);
    if (!contentType) return bad("photo_not_an_image");
    photo = { bytes, contentType };
  }

  // 4. Rate limit and repost check.
  const ipHash = hash(clientIp(req));
  const limit = await checkRateLimit(ipHash);
  if (!limit.ok) return bad(limit.reason, 429);

  const textHash = hash(normaliseText(text));
  const existing = await readAllReviews();
  if (existing.some((r) => r.textHash === textHash)) return bad("duplicate");

  // 5. Screening. Fails closed: anything other than a clear pass waits for review.
  const screening = await screenReview({ text, name, city, photo });

  const id = randomUUID();
  let photoUrl: string | undefined;
  if (photo) {
    try {
      photoUrl = await storePhoto(id, photo.bytes, photo.contentType);
    } catch {
      return bad("photo_upload_failed", 500);
    }
  }

  const review: Review = {
    id,
    createdAt: new Date().toISOString(),
    name,
    city,
    handle,
    text,
    photoUrl,
    status: screening.allow ? "published" : "pending",
    screening,
    textHash,
    ipHash,
    ua: req.headers.get("user-agent")?.slice(0, 200) ?? undefined,
  };

  try {
    await writeReview(review);
  } catch {
    return bad("save_failed", 500);
  }

  return NextResponse.json({
    status: review.status,
    review: review.status === "published"
      ? { id, name, city, handle, text, photoUrl, createdAt: review.createdAt }
      : undefined,
  });
}
