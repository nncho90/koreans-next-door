import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Koreans Next Door Tools — Address Converter, Phrasebook, Form Decoder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#111111", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -180, right: -120, width: 520, height: 520, borderRadius: "50%", background: "#ffd966", opacity: 0.12 }} />
        <div style={{ position: "absolute", bottom: -120, left: -120, width: 360, height: 360, borderRadius: "50%", background: "#ffd966", opacity: 0.08 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 100px" }}>
          <div style={{ display: "flex", alignItems: "center", background: "#ffd966", borderRadius: 100, padding: "8px 20px", width: "fit-content", marginBottom: 36 }}>
            <span style={{ fontSize: 16, color: "#1a1a1a", fontWeight: 700, letterSpacing: 2 }}>TOOLS HUB</span>
          </div>
          <div style={{ fontSize: 80, fontWeight: 800, color: "#ffffff", lineHeight: 1.0, letterSpacing: -3, marginBottom: 10 }}>Tools for life</div>
          <div style={{ fontSize: 80, fontWeight: 800, color: "#ffd966", lineHeight: 1.0, letterSpacing: -3, marginBottom: 30 }}>in Korea</div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.50)", fontWeight: 400, maxWidth: 760 }}>Address conversion, phrasebook, and form decoder pages designed to rank and to be used directly.</div>
          <div style={{ marginTop: 40, fontSize: 16, color: "rgba(255,255,255,0.25)", letterSpacing: 2, fontWeight: 600 }}>KOREANS NEXT DOOR</div>
        </div>
        <div style={{ position: "absolute", right: 72, top: "50%", transform: "translateY(-50%)", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, opacity: 0.18 }}>
          {["🏠", "💬", "📄", "🛠️"].map((label) => (
            <div key={label} style={{ width: 116, height: 116, borderRadius: 28, border: "2px solid rgba(255,217,102,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, color: "#ffd966" }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
