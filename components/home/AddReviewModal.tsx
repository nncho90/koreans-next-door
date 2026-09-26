"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";
import type { PublicReview } from "@/lib/reviews";

const MAX_TEXT = 800;
const MIN_TEXT = 40;

/**
 * Resize in the browser before uploading. Re-encoding through a canvas also
 * drops EXIF, so nobody posts their home coordinates by accident.
 */
async function preparePhoto(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unavailable");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("encode failed"))),
      "image/jpeg",
      0.85
    );
  });
}

type Status = "form" | "sending" | "published" | "pending" | "error";

export default function AddReviewModal({
  onClose,
  onPublished,
}: {
  onClose: () => void;
  onPublished: (review: PublicReview) => void;
}) {
  const { t } = useLocale();
  const r = t.reviews;
  const [status, setStatus] = useState<Status>("form");
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // Stamped once the form is on screen; the server rejects anything filled in
  // faster than a human could, which is most bots.
  const renderedAt = useRef(0);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const messageFor = (code: string) =>
    ({
      no_links: r.errLinks,
      text_too_short: r.errShort,
      text_too_long: r.errLong,
      duplicate: r.errDuplicate,
      too_soon: r.errTooSoon,
      daily_cap: r.errDailyCap,
      photo_too_large: r.errPhotoLarge,
      photo_not_an_image: r.errPhotoType,
    })[code] ?? r.errGeneric;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);

    const form = new FormData(e.currentTarget);
    form.set("renderedAt", String(renderedAt.current));

    const file = fileRef.current?.files?.[0];
    if (file) {
      try {
        form.set("photo", await preparePhoto(file), "photo.jpg");
      } catch {
        setStatus("error");
        setError(r.errPhotoType);
        return;
      }
    } else {
      form.delete("photo");
    }

    try {
      const res = await fetch("/api/reviews", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(messageFor(data?.error ?? ""));
        return;
      }
      if (data.status === "published" && data.review) {
        onPublished(data.review as PublicReview);
        setStatus("published");
      } else {
        setStatus("pending");
      }
    } catch {
      setStatus("error");
      setError(r.errGeneric);
    }
  }

  const done = status === "published" || status === "pending";

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-[#fdfbf5] p-6"
        initial={{ scale: 0.97, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={r.close}
          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-700"
        >
          <X size={22} weight="bold" />
        </button>

        {done ? (
          <div className="py-8 text-center">
            <p className="text-4xl">{status === "published" ? "📌" : "🕐"}</p>
            <h2 className="mt-4 text-xl font-bold text-zinc-900">
              {status === "published" ? r.successTitle : r.pendingTitle}
            </h2>
            <p className="mt-2 text-zinc-600">
              {status === "published" ? r.successBody : r.pendingBody}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-[#ffd966] px-6 py-2.5 text-sm font-semibold text-zinc-900"
            >
              {r.close}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">{r.title}</h2>
              <p className="mt-1 text-sm text-zinc-500">{r.subtitle}</p>
            </div>

            {/* Bot trap: positioned off screen, never announced, must stay empty. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
              {r.fieldName}
              <input
                name="name"
                required
                maxLength={40}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-base text-zinc-900"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
              {r.fieldCity}
              <input
                name="city"
                required
                maxLength={60}
                placeholder={r.fieldCityPlaceholder}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-base text-zinc-900"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
              {r.fieldHandle}
              <input
                name="handle"
                maxLength={40}
                placeholder={r.fieldHandlePlaceholder}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-base text-zinc-900"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
              {r.fieldText}
              <textarea
                name="text"
                required
                rows={5}
                minLength={MIN_TEXT}
                maxLength={MAX_TEXT}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-base text-zinc-900"
              />
              <span className="self-end text-xs text-zinc-400">
                {text.length} / {MAX_TEXT}
              </span>
            </label>

            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-zinc-700">{r.fieldPhoto}</span>
              <input
                ref={fileRef}
                type="file"
                name="photo"
                accept="image/jpeg,image/png,image/heic,image/webp"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  setPreview(f ? URL.createObjectURL(f) : null);
                }}
                className="text-sm text-zinc-600 file:mr-3 file:rounded-full file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
              {preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="" className="mt-2 h-28 w-28 rounded-lg object-cover" />
              )}
              <p className="text-xs leading-relaxed text-zinc-500">{r.photoConsent}</p>
            </div>

            {error && <p className="text-sm font-medium text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 rounded-full bg-[#ffd966] px-6 py-3 text-sm font-semibold text-zinc-900 disabled:opacity-60"
            >
              {status === "sending" ? r.sending : r.submit}
            </button>
            <p className="text-center text-xs text-zinc-400">{r.screeningNote}</p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
