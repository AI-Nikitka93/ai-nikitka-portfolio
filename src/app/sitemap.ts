import type { MetadataRoute } from "next";
import { getPortfolioEntries, getPosts } from "@/lib/mdx";
import { absoluteUrl } from "@/lib/seo";
import { staticRoutes } from "@/lib/site";

function normalizeLastModified(value?: string) {
  return value ? new Date(value) : new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [portfolioEntries, posts] = await Promise.all([
    getPortfolioEntries(),
    getPosts(),
  ]);

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/portfolio" || route === "/blog" ? 0.9 : 0.7,
  }));

  const portfolioUrls: MetadataRoute.Sitemap = portfolioEntries.map((entry) => ({
    url: absoluteUrl(`/portfolio/${entry.slug}`),
    lastModified: normalizeLastModified(entry.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: normalizeLastModified(post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticUrls, ...portfolioUrls, ...blogUrls];
}
