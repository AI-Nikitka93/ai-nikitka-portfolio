import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0A0D0C",
          color: "#D6CFBF",
          padding: "64px",
          position: "relative",
          fontFamily: "IBM Plex Mono",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(142,150,140,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(142,150,140,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            opacity: 0.7,
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
            <div
              style={{
                color: "#B7FF3C",
                fontSize: 24,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
              }}
            >
              AI_Nikitka93
            </div>
            <div
              style={{
                fontFamily: "Space Grotesk",
                fontSize: 68,
                lineHeight: 1,
                letterSpacing: "0",
                maxWidth: "820px",
              }}
            >
              AI video / images / practical projects
            </div>
            <div style={{ fontSize: 24, color: "#D6CFBF" }}>
              selected work, diplomas and contact links
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 18,
              color: "#8E968C",
            }}
          >
            <span>Nikita Kizevich portfolio</span>
            <span style={{ color: "#FF6A2A" }}>Минск / AI_Nikitka93</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
