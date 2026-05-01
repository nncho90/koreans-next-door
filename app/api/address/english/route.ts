import { NextRequest, NextResponse } from "next/server";

const JUSO_ENG_API_URL = "https://business.juso.go.kr/addrlink/addrEngApi.do";

type JusoEnglishAddress = {
  roadAddr?: string;
  korAddr?: string;
  jibunAddr?: string;
  zipNo?: string;
  siNm?: string;
  sggNm?: string;
};

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  const confmKey =
    process.env.JUSO_CONFM_KEY ??
    process.env.JUSO_API_KEY ??
    process.env.ROAD_ADDRESS_API_KEY;

  if (keyword.length < 2) {
    return NextResponse.json(
      { error: "Enter at least two characters.", items: [] },
      { status: 400 }
    );
  }

  if (!confmKey) {
    return NextResponse.json(
      {
        error: "Juso English address API key is not configured.",
        items: [],
        setup: "Set JUSO_CONFM_KEY to enable live Korean-to-English address lookup.",
      },
      { status: 503 }
    );
  }

  const params = new URLSearchParams({
    currentPage: "1",
    countPerPage: "5",
    keyword,
    confmKey,
    resultType: "json",
  });

  try {
    const res = await fetch(`${JUSO_ENG_API_URL}?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Address service is temporarily unavailable.", items: [] },
        { status: 502 }
      );
    }

    const data = await res.json();
    const common = data?.results?.common;
    const rawItems = data?.results?.juso;

    if (common?.errorCode && common.errorCode !== "0") {
      return NextResponse.json(
        { error: common.errorMessage ?? "Address lookup failed.", items: [] },
        { status: 400 }
      );
    }

    const items = (Array.isArray(rawItems) ? rawItems : [])
      .map((item: JusoEnglishAddress) => ({
        englishAddress: item.roadAddr ?? "",
        koreanAddress: item.korAddr ?? "",
        lotAddress: item.jibunAddr ?? "",
        postalCode: item.zipNo ?? "",
        city: item.siNm ?? "",
        district: item.sggNm ?? "",
      }))
      .filter((item) => item.englishAddress);

    return NextResponse.json({
      items,
      totalCount: Number(common?.totalCount ?? items.length),
      source: "Korea Road Name Address English API",
    });
  } catch {
    return NextResponse.json(
      { error: "Address lookup failed.", items: [] },
      { status: 500 }
    );
  }
}
