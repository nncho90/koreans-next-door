import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Find a Doctor — Koreans Next Door";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#111111", position: "relative", overflow: "hidden" }}>
        {/* Top-right decorative circle */}
        <div style={{ position: "absolute", top: -160, right: -160, width: 560, height: 560, borderRadius: "50%", background: "#ffd966", opacity: 0.12 }} />
        {/* Bottom-left decorative circle */}
        <div style={{ position: "absolute", bottom: -100, left: -80, width: 320, height: 320, borderRadius: "50%", background: "#ffd966", opacity: 0.08 }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 100px", gap: 0 }}>
          {/* Label badge */}
          <div style={{ display: "flex", alignItems: "center", background: "#ffd966", borderRadius: 100, padding: "8px 20px", width: "fit-content", marginBottom: 36 }}>
            <span style={{ fontSize: 16, color: "#1a1a1a", fontWeight: 700, letterSpacing: 2 }}>FIND A DOCTOR</span>
          </div>
          {/* Title line 1 - white */}
          <div style={{ fontSize: 86, fontWeight: 800, color: "#ffffff", lineHeight: 1.0, letterSpacing: -3, marginBottom: 4 }}>When you&apos;re</div>
          {/* Title line 2 - gold */}
          <div style={{ fontSize: 86, fontWeight: 800, color: "#ffd966", lineHeight: 1.0, letterSpacing: -3, marginBottom: 36 }}>not feeling well</div>
          {/* Subtitle */}
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.50)", fontWeight: 400, maxWidth: 700 }}>English-speaking clinics and hospitals across Seoul.</div>
          {/* KND brand */}
          <div style={{ marginTop: 40, fontSize: 16, color: "rgba(255,255,255,0.25)", letterSpacing: 2, fontWeight: 600 }}>KOREANS NEXT DOOR</div>
        </div>

        {/* Dot grid */}
        <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 16, opacity: 0.2 }}>
          {[...Array(6)].map((_, row) => (
            <div key={row} style={{ display: "flex", gap: 16 }}>
              {[...Array(6)].map((_, col) => (
                <div key={col} style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffd966" }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
