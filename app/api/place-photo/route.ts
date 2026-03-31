import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get("name");
  const nameEn = searchParams.get("nameEn") ?? "";
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!name || !key) {
    return NextResponse.json({ photo: null });
  }

  try {
    const body: Record<string, unknown> = {
      textQuery: `${name} ${nameEn}`.trim(),
    };

    // Bias search to within 300m of the pin's coordinates for accuracy
    if (lat && lng) {
      body.locationBias = {
        circle: {
          center: { latitude: parseFloat(lat), longitude: parseFloat(lng) },
          radius: 300.0,
        },
      };
    }

    const searchRes = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "places.photos",
        },
        body: JSON.stringify(body),
        next: { revalidate: 86400 }, // cache 24h at CDN level
      }
    );

    if (!searchRes.ok) return NextResponse.json({ photo: null });

    const data = await searchRes.json();
    const photoName: string | undefined = data.places?.[0]?.photos?.[0]?.name;
    if (!photoName) return NextResponse.json({ photo: null });

    // Resolve photo name → actual image URI
    const mediaUrl = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=600&skipHttpRedirect=true&key=${key}`;
    const mediaRes = await fetch(mediaUrl, { next: { revalidate: 86400 } });

    if (!mediaRes.ok) return NextResponse.json({ photo: null });

    const mediaData = await mediaRes.json();
    return NextResponse.json({ photo: mediaData.photoUri ?? null });
  } catch {
    return NextResponse.json({ photo: null });
  }
}
