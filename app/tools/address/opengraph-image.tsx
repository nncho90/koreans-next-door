import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Korean Address to English Converter — Koreans Next Door";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#111111", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -160, right: -120, width: 500, height: 500, borderRadius: "50%", background: "#ffd966", opacity: 0.12 }} />
        <div style={{ position: "absolute", bottom: -120, left: -120, width: 340, height: 340, borderRadius: "50%", background: "#ffd966", opacity: 0.08 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 100px" }}>
          <div style={{ display: "flex", alignItems: "center", background: "#ffd966", borderRadius: 100, padding: "8px 20px", width: "fit-content", marginBottom: 36 }}>
            <span style={{ fontSize: 16, color: "#1a1a1a", fontWeight: 700, letterSpacing: 2 }}>ADDRESS TOOL</span>
          </div>
          <div style={{ fontSize: 78, fontWeight: 800, color: "#ffffff", lineHeight: 1.0, letterSpacing: -3, marginBottom: 10 }}>Korean address</div>
          <div style={{ fontSize: 78, fontWeight: 800, color: "#ffd966", lineHeight: 1.0, letterSpacing: -3, marginBottom: 30 }}>to English</div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.50)", fontWeight: 400, maxWidth: 780 }}>See the official mailing order, postal code placement, and live Juso lookup in one place.</div>
          <div style={{ marginTop: 40, fontSize: 16, color: "rgba(255,255,255,0.25)", letterSpacing: 2, fontWeight: 600 }}>KOREANS NEXT DOOR</div>
        </div>
        <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 14, opacity: 0.18 }}>
          {[
            "서울특별시 서대문구 독립문로 56",
            "56, Dongnimmun-ro, Seodaemun-gu, Seoul, Republic of Korea, 03745",
          ].map((line) => (
            <div key={line} style={{ width: 420, padding: "16px 18px", borderRadius: 20, background: "rgba(255,255,255,0.06)", color: "#ffffff", fontSize: 24, lineHeight: 1.25, border: "1px solid rgba(255,217,102,0.25)" }}>
              {line}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
