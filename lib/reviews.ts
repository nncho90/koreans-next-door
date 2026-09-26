import { createHash } from "crypto";
import { put, del, list } from "@vercel/blob";

/**
 * Visitor-submitted reviews.
 *
 * Each review is its own blob under `reviews/`. The pins and feedback routes
 * keep a whole array in a single JSON file and rewrite it with del() + put(),
 * which loses data when two people post at once. One file per review means a
 * write only ever touches that review.
 */

export type ReviewStatus = "published" | "pending" | "removed";

export interface Review {
  id: string;
  createdAt: string;
  name: string;
  city: string;
  handle?: string;
  text: string;
  photoUrl?: string;
  status: ReviewStatus;
  screening?: { allow: boolean; reasons: string[]; model: string };
  /** sha256 of the normalised text, used to catch reposts */
  textHash: string;
  /** hashed, never the raw address */
  ipHash: string;
  ua?: string;
}

/** What the public API exposes. Nothing here identifies the poster. */
export interface PublicReview {
  id: string;
  createdAt: string;
  name: string;
  city: string;
  handle?: string;
  text: string;
  photoUrl?: string;
}

const PREFIX = "reviews/";
const PHOTO_PREFIX = "reviews/photos/";
const RATE_PREFIX = "ratelimit/";

export const LIMITS = {
  name: 40,
  city: 60,
  handle: 40,
  textMin: 40,
  textMax: 800,
  photoBytes: 2 * 1024 * 1024,
  perWindowMs: 10 * 60 * 1000,
  perDay: 3,
} as const;

export function hash(value: string): string {
  const salt = process.env.REVIEWS_HASH_SALT ?? "knd-local-salt";
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

export function normaliseText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

export function toPublic(r: Review): PublicReview {
  return {
    id: r.id,
    createdAt: r.createdAt,
    name: r.name,
    city: r.city,
    handle: r.handle,
    text: r.text,
    photoUrl: r.photoUrl,
  };
}

async function readBlobJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Every review, newest first. Used by the admin page. */
export async function readAllReviews(): Promise<Review[]> {
  try {
    const { blobs } = await list({ prefix: PREFIX, limit: 1000 });
    const jsonBlobs = blobs.filter((b) => b.pathname.endsWith(".json"));
    const reviews = await Promise.all(jsonBlobs.map((b) => readBlobJson<Review>(b.url)));
    return reviews
      .filter((r): r is Review => r !== null)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export async function readPublishedReviews(): Promise<PublicReview[]> {
  const all = await readAllReviews();
  return all.filter((r) => r.status === "published").map(toPublic);
}

export async function writeReview(review: Review): Promise<void> {
  await put(`${PREFIX}${review.id}.json`, JSON.stringify(review), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function readReview(id: string): Promise<Review | null> {
  const { blobs } = await list({ prefix: `${PREFIX}${id}.json`, limit: 1 });
  if (blobs.length === 0) return null;
  return readBlobJson<Review>(blobs[0].url);
}

export async function deleteReview(review: Review): Promise<void> {
  const targets = [`${PREFIX}${review.id}.json`];
  if (review.photoUrl) targets.push(review.photoUrl);
  await Promise.all(
    targets.map((t) => del(t).catch(() => undefined))
  );
}

export async function storePhoto(id: string, bytes: Buffer, contentType: string) {
  const ext = contentType === "image/png" ? "png" : "jpg";
  const blob = await put(`${PHOTO_PREFIX}${id}.${ext}`, bytes, {
    access: "public",
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return blob.url;
}

/**
 * Rate limit, one small file per hashed IP so posts from different people
 * never contend for the same file.
 */
export async function checkRateLimit(
  ipHash: string
): Promise<{ ok: true } | { ok: false; reason: "too_soon" | "daily_cap" }> {
  const key = `${RATE_PREFIX}${ipHash}.json`;
  const now = Date.now();
  let stamps: number[] = [];

  try {
    const { blobs } = await list({ prefix: key, limit: 1 });
    if (blobs.length > 0) {
      stamps = (await readBlobJson<number[]>(blobs[0].url)) ?? [];
    }
  } catch {
    stamps = [];
  }

  const dayAgo = now - 24 * 60 * 60 * 1000;
  const recent = stamps.filter((t) => t > dayAgo);

  if (recent.some((t) => now - t < LIMITS.perWindowMs)) return { ok: false, reason: "too_soon" };
  if (recent.length >= LIMITS.perDay) return { ok: false, reason: "daily_cap" };

  recent.push(now);
  await put(key, JSON.stringify(recent), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  }).catch(() => undefined);

  return { ok: true };
}

/** JPEG and PNG only, checked by magic bytes rather than the declared type. */
export function sniffImage(bytes: Buffer): "image/jpeg" | "image/png" | null {
  if (bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length > 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  return null;
}

/** Links and markup are what spam is made of, and a review never needs either. */
export function containsLinkOrMarkup(text: string): boolean {
  return /https?:\/\/|www\.|<[^>]|\[url|\{\{/i.test(text);
}
