import { put, head, del } from "@vercel/blob";
import { NextResponse } from "next/server";

const BLOB_KEY = "knd-pins.json";

interface Pin {
  lat: number;
  lng: number;
  name: string;
  city: string;
  country: string;
  note: string;
  instagram?: string;
}

async function readPins(): Promise<Pin[]> {
  try {
    const info = await head(BLOB_KEY);
    const res = await fetch(info.url);
    return await res.json();
  } catch {
    return [];
  }
}

export async function GET() {
  const pins = await readPins();
  return NextResponse.json(pins);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, city, country, lat, lng, note, instagram } = body;

  if (!name || !city || !lat || !lng || !note) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const pins = await readPins();
  const newPin: Pin = { lat, lng, name, city, country, note, ...(instagram ? { instagram } : {}) };
  pins.push(newPin);

  // Overwrite the blob
  try {
    await del(BLOB_KEY);
  } catch {
    // ok if it doesn't exist yet
  }

  await put(BLOB_KEY, JSON.stringify(pins), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });

  return NextResponse.json(newPin, { status: 201 });
}
