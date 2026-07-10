import { ImageResponse } from "next/og";
import { getPortfolioEntryBySlug } from "@/lib/mdx";
import type { PortfolioFrontmatter } from "@/lib/proof-archive";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DossierOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const entry = await getPortfolioEntryBySlug<PortfolioFrontmatter>(slug);

  const title = entry?.frontmatter.title || slug;
  const metric = entry?.frontmatter.metricValue || entry?.frontmatter.dossierId || "DOSSIER";
  const secondary =
    entry?.frontmatter.metricSecondary ||
    entry?.frontmatter.issuer ||
    "Работы AI_Nikitka93";

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
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(142,150,140,0.2)",
            padding: "32px",
            gap: "32px",
            fontFamily: "IBM Plex Mono",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
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
                {entry?.frontmatter.dossierId || "Работа"}
              </span>
              <span
                style={{
                  fontFamily: "Space Grotesk",
                  fontSize: 60,
                  lineHeight: 1,
                  letterSpacing: "0",
                  maxWidth: "680px",
                }}
              >
                {title}
              </span>
              <span style={{ fontSize: 20, maxWidth: "620px" }}>{secondary}</span>
            </div>
            <span style={{ fontSize: 18, color: "#8E968C" }}>
              Работы | AI_Nikitka93
            </span>
          </div>
          <div
            style={{
              width: "280px",
              border: "1px solid rgba(142,150,140,0.18)",
              background: "rgba(22,27,25,0.88)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "24px",
            }}
          >
            <span
              style={{
                color: "#8E968C",
                fontSize: 16,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Итог
            </span>
            <span
              style={{
                color: "#B7FF3C",
                fontSize: 74,
                lineHeight: 1,
                letterSpacing: "0",
              }}
            >
              {metric}
            </span>
            <span style={{ color: "#FF6A2A", fontSize: 18 }}>
              Никита Кизевич
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
