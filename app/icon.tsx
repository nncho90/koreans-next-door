import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 112,
        }}
      >
        {/* House icon — roof triangle + body rectangle + door */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {/* Roof: triangle via borders */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "130px solid transparent",
              borderRight: "130px solid transparent",
              borderBottom: "110px solid #1a1a1a",
            }}
          />
          {/* Body */}
          <div
            style={{
              width: 200,
              height: 160,
              background: "#1a1a1a",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 0,
            }}
          >
            {/* Door */}
            <div
              style={{
                width: 68,
                height: 90,
                background: "#ffd966",
                borderRadius: "34px 34px 0 0",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
