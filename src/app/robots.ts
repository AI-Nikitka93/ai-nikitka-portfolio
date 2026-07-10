import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteHost = new URL(absoluteUrl("/")).host;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteHost,
  };
}
