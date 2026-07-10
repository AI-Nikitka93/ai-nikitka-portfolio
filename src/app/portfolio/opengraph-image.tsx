import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function PortfolioOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0A0D0C",
          color: "#D6CFBF",
          padding: "64px",
          fontFamily: "IBM Plex Mono",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(142,150,140,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(142,150,140,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(142,150,140,0.2)",
            padding: "32px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <span
              style={{
                color: "#B7FF3C",
                fontSize: 24,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
              }}
            >
              Selected Works
            </span>
            <span
              style={{
                fontFamily: "Space Grotesk",
                fontSize: 72,
                lineHeight: 1,
                letterSpacing: "0",
              }}
            >
              7 selected results
            </span>
            <span style={{ fontSize: 22, maxWidth: "760px" }}>
              AI images / video / challenges / technical work
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              color: "#8E968C",
            }}
          >
            <span>SIG-01 / SIG-07</span>
            <span style={{ color: "#FF6A2A" }}>AI_Nikitka93</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
