import { NextResponse } from "next/server";

const CALENDAR_API_ID = "cal-J0zAgLYj8iOqzD1";
const LUMA_URL = `https://api.lu.ma/calendar/get-items?calendar_api_id=${CALENDAR_API_ID}&period=past&pagination_limit=20`;

type LumaEntry = {
  event: {
    api_id: string;
    name: string;
    start_at: string;
    end_at?: string;
    timezone?: string;
    cover_url?: string;
    url?: string;
    geo_address_info?: {
      city_state?: string;
      short_address?: string;
      full_address?: string;
    };
  };
};

export type PastEvent = {
  id: string;
  name: string;
  startAt: string;
  endAt?: string;
  timezone?: string;
  coverUrl?: string;
  url: string;
  location?: string;
};

export async function GET() {
  try {
    const res = await fetch(LUMA_URL, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error(`Luma responded with ${res.status}`);
    const data = await res.json();
    const entries: LumaEntry[] = Array.isArray(data?.entries) ? data.entries : [];
    const events: PastEvent[] = entries.map((e) => ({
      id: e.event.api_id,
      name: e.event.name,
      startAt: e.event.start_at,
      endAt: e.event.end_at,
      timezone: e.event.timezone,
      coverUrl: e.event.cover_url,
      url: e.event.url ? `https://lu.ma/${e.event.url}` : `https://lu.ma/${e.event.api_id}`,
      location:
        e.event.geo_address_info?.short_address ??
        e.event.geo_address_info?.city_state ??
        e.event.geo_address_info?.full_address,
    }));
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
