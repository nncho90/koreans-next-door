import { put, head, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import type { FeedbackSubmission } from "@/lib/feedbackTypes";

const BLOB_KEY = "knd-feedback.json";

async function readSubmissions(): Promise<FeedbackSubmission[]> {
  try {
    const info = await head(BLOB_KEY);
    const res = await fetch(info.url);
    return await res.json();
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const secret = process.env.FEEDBACK_SECRET;

  if (secret && key !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await readSubmissions();
  return NextResponse.json(submissions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { id, event, submittedAt, answers } = body;

  if (!id || !event || !submittedAt || !answers) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const submissions = await readSubmissions();
  const newSubmission: FeedbackSubmission = { id, event, submittedAt, answers };
  submissions.push(newSubmission);

  try {
    await del(BLOB_KEY);
  } catch {
    // ok if it doesn't exist yet
  }

  await put(BLOB_KEY, JSON.stringify(submissions), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });

  return NextResponse.json(newSubmission, { status: 201 });
}
