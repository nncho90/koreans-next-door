import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Koreans Next Door — Come as a guest, stay as a neighbor.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#111111",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative large golden circle — top right */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "#ffd966",
            opacity: 0.12,
          }}
        />
        {/* Decorative medium circle — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "#ffd966",
            opacity: 0.08,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 100px",
            gap: 0,
          }}
        >
          {/* Location badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#ffd966",
              borderRadius: 100,
              padding: "8px 20px",
              width: "fit-content",
              marginBottom: 36,
            }}
          >
            <span style={{ fontSize: 18, color: "#1a1a1a", fontWeight: 700, letterSpacing: 1 }}>
              🏠  Seoul, Korea
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.0,
              letterSpacing: -3,
              marginBottom: 28,
            }}
          >
            Koreans
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#ffd966",
              lineHeight: 1.0,
              letterSpacing: -3,
              marginBottom: 40,
            }}
          >
            Next Door
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.55)",
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            Come as a guest, stay as a neighbor.
          </div>
        </div>

        {/* Right side decoration — stacked dots grid */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity: 0.25,
          }}
        >
          {[...Array(6)].map((_, row) => (
            <div key={row} style={{ display: "flex", gap: 16 }}>
              {[...Array(6)].map((_, col) => (
                <div
                  key={col}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#ffd966",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
