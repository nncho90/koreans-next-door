import { NextResponse } from "next/server";
import { isSnowWeatherCode } from "@/lib/particles/seasonDetection";

const OPEN_METEO_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.978&current=weather_code&timezone=Asia/Seoul";

export async function GET() {
  try {
    const res = await fetch(OPEN_METEO_URL, {
      next: { revalidate: 600 }, // cache for 10 minutes
    });

    if (!res.ok) {
      throw new Error(`Open-Meteo responded with ${res.status}`);
    }

    const data = await res.json();
    const weatherCode: number = data?.current?.weather_code ?? 0;

    return NextResponse.json({
      weatherCode,
      isSnowing: isSnowWeatherCode(weatherCode),
      timestamp: new Date().toISOString(),
    });
  } catch {
    // Fail open — no particles, no broken UI
    return NextResponse.json({
      weatherCode: 0,
      isSnowing: false,
      timestamp: new Date().toISOString(),
    });
  }
}
