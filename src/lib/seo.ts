import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export function absoluteUrl(path = "/") {
  const normalizedPath =
    path === "/"
      ? "/"
      : `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;

  return new URL(normalizedPath, SITE_URL).toString();
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  type?: "website" | "article";
  absoluteTitle?: boolean;
  noIndex?: boolean;
  locale?: string;
  languageAlternates?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  imagePath,
  type = "website",
  absoluteTitle = false,
  noIndex = false,
  locale = siteConfig.locale,
  languageAlternates = false,
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const defaultImagePath = "/opengraph-image";
  const imageUrl = absoluteUrl(imagePath || defaultImagePath);
  const metadataTitle = absoluteTitle ? { absolute: title } : title;
  const socialTitle = absoluteTitle ? title : `${title} | ${siteConfig.shortName}`;

  return {
    title: metadataTitle,
    description,
    alternates: {
      canonical,
      languages: languageAlternates
        ? {
            ru: absoluteUrl("/"),
            "ru-BY": absoluteUrl("/"),
            en: absoluteUrl("/en"),
            "x-default": absoluteUrl("/"),
          }
        : undefined,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      type,
      url: canonical,
      title: socialTitle,
      description,
      locale,
      siteName: siteConfig.shortName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
  };
}
