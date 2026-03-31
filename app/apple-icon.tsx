import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffd966",
          borderRadius: 40,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <div style={{ width: 0, height: 0, borderLeft: "46px solid transparent", borderRight: "46px solid transparent", borderBottom: "39px solid #1a1a1a" }} />
          <div style={{ width: 71, height: 57, background: "#1a1a1a", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div style={{ width: 24, height: 32, background: "#ffd966", borderRadius: "12px 12px 0 0" }} />
          </div>
        </div>
      </div>
    ),
    { width: 180, height: 180 }
  );
}
