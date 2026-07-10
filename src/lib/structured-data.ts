import type { ContentEntry, ContentFrontmatter } from "@/lib/mdx";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.shortName,
    url: absoluteUrl("/"),
    inLanguage: "ru",
    dateModified: siteConfig.lastUpdated,
    publisher: {
      "@id": absoluteUrl("/#person"),
    },
  };
}

export function buildBlogCollectionJsonLd(posts: Array<ContentEntry>) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog#blog"),
    name: "Блог AI_Nikitka93",
    url: absoluteUrl("/blog"),
    inLanguage: "ru",
    dateModified: siteConfig.lastUpdated,
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    author: {
      "@id": absoluteUrl("/#person"),
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/blog/${post.slug}#article`),
      headline: post.frontmatter.title || post.slug,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.frontmatter.date || siteConfig.lastUpdated,
      dateModified: post.frontmatter.date || siteConfig.lastUpdated,
    })),
  };
}

export function buildBlogPostingJsonLd(post: ContentEntry<ContentFrontmatter>) {
  const title = post.frontmatter.title || post.slug;
  const description = post.frontmatter.description || post.excerpt;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blog/${post.slug}#article`),
    headline: title,
    name: title,
    description,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    inLanguage: "ru",
    datePublished: post.frontmatter.date || siteConfig.lastUpdated,
    dateModified: post.frontmatter.date || siteConfig.lastUpdated,
    author: {
      "@id": absoluteUrl("/#person"),
    },
    publisher: {
      "@id": absoluteUrl("/#person"),
    },
    isPartOf: {
      "@id": absoluteUrl("/blog#blog"),
    },
    keywords: post.frontmatter.tags || [],
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
