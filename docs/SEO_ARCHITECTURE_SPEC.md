# SEO Architecture Spec — AI_Nikitka93

Checked on: 2026-04-24
Status: Active implementation spec for Next.js 16 App Router SEO layer
Scope: metadata, canonical URLs, sitemap, robots, JSON-LD, OG image conventions
Verified against:
- Next.js `generateMetadata` docs: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js `sitemap.xml` docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js `robots.txt` docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Next.js metadata / OG images guide: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js `opengraph-image` docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- Next.js JSON-LD guide: https://nextjs.org/docs/app/guides/json-ld

## 1. Objective

Build a brand-dominant technical SEO layer for `Next.js 16.2.3 App Router` that:

- wins branded intent for `AI_Nikitka93`, `AI Nikitka93`, `Nikitka AI`, `Никита Кизевич`, `Кизевич Никита`
- avoids confusion with the separate entity searched as `Nikita AI`
- fixes the current canonical bug
- fixes sitemap omission for dynamic MDX routes
- keeps unpublished MDX entries out of indexation, static params, and canonical space

This document is `copy-paste ready`. It does not change `src/` directly, but every snippet below is designed to be dropped into the current Next.js App Router project with minimal adaptation.

## 2. Non-Negotiable SEO Naming Rules

Derived from `docs/BRAND_CONSTITUTION.md`.

### Allowed Primary Brand Forms
- `AI_Nikitka93`
- `AI Nikitka93`
- `Nikitka AI`
- `Никита Кизевич`
- `Кизевич Никита`

### Disallowed Metadata Form
- `Nikita AI`

Reason:
- the user explicitly confirmed this query collides with another person/entity
- metadata must reinforce the correct branded cluster, not pollute it

### Title Logic
- Default global branding is `AI_Nikitka93`
- Human name is used where trust or biography matters
- Dossier detail titles must follow:
  - `[Dossier Title] | Proof Archive | AI_Nikitka93`
- Avoid:
  - `Портфолио Никиты Кизевича - [Название]`
  - stacked keyword spam like `Никита Кизевич AI Nikitka93 портфолио`

## 3. Current Bugs And Their Exact Fix

## 3.1 Bug: Root Canonical Is Hardcoded For Every Page

### Current Cause
Current `src/app/layout.tsx` exports:

```ts
alternates: {
  canonical: "/",
}
```

Because this sits in root layout metadata, every child route inherits the root canonical instead of its own path.

### Required Fix
1. Keep `metadataBase` in root layout.
2. Remove `alternates.canonical` from root layout.
3. Add route-level canonicals via an `absoluteUrl()` helper.

### Copy-Paste Helper

```ts
// src/lib/seo.ts
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kizevich.com";

export function absoluteUrl(path = "/") {
  const normalizedPath =
    path === "/"
      ? "/"
      : `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;

  return new URL(normalizedPath, SITE_URL).toString();
}
```

### Rule
- Root layout: `metadataBase` only
- Each index/detail page: its own `alternates.canonical`
- Never build canonicals with string concatenation in page files

## 3.2 Bug: `sitemap.ts` Ignores Dynamic MDX Routes

### Current Cause
Current `src/app/sitemap.ts` maps only `staticRoutes`, so `/portfolio/[slug]` and `/blog/[slug]` never enter the sitemap.

### Required Fix
1. Pull dynamic entries from `src/lib/mdx.ts`
2. Filter by `published !== false`
3. Emit both static and dynamic URLs
4. Set `lastModified` from frontmatter date if present, otherwise fallback to `new Date()`

## 3.3 Bug: `src/lib/mdx.ts` Does Not Filter `published: false`

### Required Fix
The MDX utility must enforce publish status at the data layer, not only in the UI.

### Copy-Paste Update

```ts
// src/lib/mdx.ts
function isPublished(frontmatter: ContentFrontmatter | undefined) {
  return frontmatter?.published !== false;
}

async function getCollection<TFrontmatter extends ContentFrontmatter>(
  directory: ContentDirectory,
): Promise<Array<ContentEntry<TFrontmatter>>> {
  const entries = await getDirectoryEntries(directory);

  const collection = await Promise.all(
    entries.map((fileName) => {
      const slug = fileName.replace(path.extname(fileName), "");
      return readContentFile<TFrontmatter>(directory, slug);
    }),
  );

  return collection.filter(
    (entry): entry is ContentEntry<TFrontmatter> =>
      entry !== null && isPublished(entry.frontmatter),
  );
}

export async function getPostBySlug<
  TFrontmatter extends ContentFrontmatter = ContentFrontmatter,
>(slug: string) {
  const post = await readContentFile<TFrontmatter>("blog", slug);
  return post && isPublished(post.frontmatter) ? post : null;
}

export async function getPortfolioEntryBySlug<
  TFrontmatter extends ContentFrontmatter = ContentFrontmatter,
>(slug: string) {
  const entry = await readContentFile<TFrontmatter>("portfolio", slug);
  return entry && isPublished(entry.frontmatter) ? entry : null;
}
```

### Result
- unpublished content returns `null`
- unpublished entries disappear from `generateStaticParams`
- unpublished entries disappear from `sitemap.ts`
- unpublished pages cannot accidentally get indexed

## 4. Global Metadata Architecture

## 4.1 Root Layout Metadata

Important Next.js rule verified in official docs:
- `title.template` defined in a layout applies to child route segments
- `title.template` does not apply to the page in the same segment
- `metadataBase` should be defined at root layout for URL-based metadata fields

### Copy-Paste Layout Metadata

```ts
// src/app/layout.tsx
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://kizevich.com"),
  title: {
    default: "AI_Nikitka93 — signal lab, proof archive, AI portfolio",
    template: "%s | AI_Nikitka93",
  },
  description:
    "AI Nikitka93: proof archive of AI video, generative visuals, agent workflows, dossiers, and field notes by Никита Кизевич.",
  applicationName: "AI_Nikitka93",
  keywords: [
    "AI_Nikitka93",
    "AI Nikitka93",
    "Nikitka AI",
    "Никита Кизевич",
    "Кизевич Никита",
    "AI portfolio",
    "proof archive",
    "AI video",
    "AI agents",
  ],
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: "AI_Nikitka93",
    title: "AI_Nikitka93 — signal lab, proof archive, AI portfolio",
    description:
      "AI Nikitka93: proof archive of AI video, generative visuals, agent workflows, dossiers, and field notes by Никита Кизевич.",
    locale: "ru_BY",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "AI_Nikitka93 — signal lab, proof archive, AI portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI_Nikitka93 — signal lab, proof archive, AI portfolio",
    description:
      "AI Nikitka93: proof archive of AI video, generative visuals, agent workflows, dossiers, and field notes by Никита Кизевич.",
    images: [absoluteUrl("/twitter-image")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};
```

### Mandatory Change To Current Root Metadata
- change `title.template` from `%s | Никита Кизевич` to `%s | AI_Nikitka93`
- remove root `alternates.canonical`
- stop treating the human name as the default suffix on every route

## 4.2 Robots File

Current `robots.ts` is acceptable, but production spec should be explicit and centralized.

### Copy-Paste `src/app/robots.ts`

```ts
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: "kizevich.com",
  };
}
```

## 5. Route Metadata Templates

## 5.1 Homepage `/`

Use homepage metadata as the main branded domination surface.

### Copy-Paste

```ts
// src/app/page.tsx
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "AI_Nikitka93 — signal lab, proof archive, AI portfolio",
  },
  description:
    "AI Nikitka93: proof archive of AI video, generative visuals, agent workflows, dossiers, and field notes by Никита Кизевич.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    url: absoluteUrl("/"),
    title: "AI_Nikitka93 — signal lab, proof archive, AI portfolio",
    description:
      "AI Nikitka93: proof archive of AI video, generative visuals, agent workflows, dossiers, and field notes by Никита Кизевич.",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "AI_Nikitka93 — signal lab, proof archive, AI portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI_Nikitka93 — signal lab, proof archive, AI portfolio",
    description:
      "AI Nikitka93: proof archive of AI video, generative visuals, agent workflows, dossiers, and field notes by Никита Кизевич.",
    images: [absoluteUrl("/twitter-image")],
  },
};
```

### Why This Wording
- brand-first
- avoids spam stacking
- keeps `AI Nikitka93` visible in description
- keeps `Никита Кизевич` as verification layer, not primary title lead

## 5.2 Proof Archive `/portfolio`

This page should rank for archive intent, cases, dossiers, and proof-led branded search.

### Copy-Paste

```ts
// src/app/portfolio/page.tsx
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Proof Archive",
  description:
    "Seven curated dossiers from AI_Nikitka93: AI imaging, neurovideo, agent experiments, ML ranking, and kernel-level technical proof.",
  alternates: {
    canonical: absoluteUrl("/portfolio"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/portfolio"),
    title: "Proof Archive | AI_Nikitka93",
    description:
      "Seven curated dossiers from AI_Nikitka93: AI imaging, neurovideo, agent experiments, ML ranking, and kernel-level technical proof.",
    images: [
      {
        url: absoluteUrl("/portfolio/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Proof Archive | AI_Nikitka93",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proof Archive | AI_Nikitka93",
    description:
      "Seven curated dossiers from AI_Nikitka93: AI imaging, neurovideo, agent experiments, ML ranking, and kernel-level technical proof.",
    images: [absoluteUrl("/portfolio/twitter-image")],
  },
};
```

### Notes
- Keep the English label `Proof Archive` because it is part of the approved brand lexicon
- Do not revert title to `Портфолио Никиты Кизевича`
- The dossier term belongs in body/H1/UI, not necessarily in every title tag

## 5.3 Dossier Detail `/portfolio/[slug]`

### Copy-Paste

```ts
// src/app/portfolio/[slug]/page.tsx
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getPortfolioEntryBySlug } from "@/lib/mdx";

type PortfolioFrontmatter = {
  title?: string;
  description?: string;
  excerpt?: string;
  published?: boolean;
  ogImage?: string;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getPortfolioEntryBySlug<PortfolioFrontmatter>(slug);

  if (!entry) {
    return {
      title: "Dossier Not Found | AI_Nikitka93",
      description: "The requested dossier is not available.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = entry.frontmatter.title || slug;
  const description =
    entry.frontmatter.description || entry.frontmatter.excerpt || entry.excerpt;
  const canonical = absoluteUrl(`/portfolio/${slug}`);
  const ogImage =
    entry.frontmatter.ogImage || absoluteUrl(`/portfolio/${slug}/opengraph-image`);

  return {
    title: `${title} | Proof Archive`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: `${title} | Proof Archive | AI_Nikitka93`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} | Proof Archive | AI_Nikitka93`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Proof Archive | AI_Nikitka93`,
      description,
      images: [ogImage],
    },
  };
}
```

### Required Title Rule
Use:
- `[Название досье] | Proof Archive | AI_Nikitka93`

Do not use:
- `Портфолио Никиты Кизевича - [Название]`

## 6. Sitemap Architecture

## 6.1 Copy-Paste `src/app/sitemap.ts`

```ts
// src/app/sitemap.ts
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
```

## 6.2 Sitemap Rules
- do not include unpublished MDX
- do not include `not-found`, `404`, draft, or test-only routes unless `published: true` is explicit and intentional
- if a route is canonicalized elsewhere, only canonical URL enters sitemap
- if future pagination/filtering is added, parameterized URLs do not enter sitemap

## 7. JSON-LD Structure

Official Next.js guidance verified on `2026-04-24`:
- render JSON-LD with a native `<script type="application/ld+json">`
- sanitize `<` via `.replace(/</g, "\\u003c")`

## 7.1 JSON-LD Person

Purpose:
- bind `AI_Nikitka93` to `Никита Кизевич`
- support brand identity split without creating two separate people

### Copy-Paste

```tsx
// render in homepage page.tsx or a server component used there
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://kizevich.com/#person",
  name: "Никита Кизевич",
  alternateName: [
    "AI_Nikitka93",
    "AI Nikitka93",
    "Nikitka AI",
    "Кизевич Никита",
  ],
  url: "https://kizevich.com",
  mainEntityOfPage: "https://kizevich.com",
  description:
    "Никита Кизевич — verified author behind AI_Nikitka93, a proof-led portfolio focused on AI video, generative visuals, agent workflows, and technical experiments.",
  knowsAbout: [
    "Generative AI",
    "AI video",
    "AI agents",
    "Prompt engineering",
    "ML experiments",
    "Generative visuals",
  ],
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
  }}
/>
```

## 7.2 JSON-LD CollectionPage + ItemList For Proof Archive

Purpose:
- present the `7` curated dossiers as a single intentional archive
- reinforce that `/portfolio` is not a generic project wall

### Copy-Paste

```tsx
const proofArchiveJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://kizevich.com/portfolio#collection",
  url: "https://kizevich.com/portfolio",
  name: "Proof Archive | AI_Nikitka93",
  description:
    "Curated proof archive of seven dossiers covering AI imaging, neurovideo, agent experiments, ML ranking, and kernel-level technical work.",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://kizevich.com/#website",
    name: "AI_Nikitka93",
    url: "https://kizevich.com",
  },
  about: {
    "@id": "https://kizevich.com/#person",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: 7,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: "https://kizevich.com/portfolio/sig-01-35awards-ai-imaging-field-results",
        name: "35AWARDS — AI Imaging Field Results",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: "https://kizevich.com/portfolio/sig-02-labstory-helix-best-animated-film",
        name: "LabStory / Helix — Best Animated Film",
      },
      {
        "@type": "ListItem",
        position: 3,
        url: "https://kizevich.com/portfolio/sig-03-labstory-helix-technical-mastery",
        name: "LabStory / Helix — Technical Mastery",
      },
      {
        "@type": "ListItem",
        position: 4,
        url: "https://kizevich.com/portfolio/sig-04-kinomatik-laureate-neurovideo-competition",
        name: "КИНОМАТИК — Laureate, Neurovideo Competition",
      },
      {
        "@type": "ListItem",
        position: 5,
        url: "https://kizevich.com/portfolio/sig-05-minimax-agent-challenge-2025",
        name: "MiniMax Agent Challenge 2025 — Multi-Agent Production Run",
      },
      {
        "@type": "ListItem",
        position: 6,
        url: "https://kizevich.com/portfolio/sig-06-vk-recsys-top-9-percent",
        name: "VK RecSys Challenge — TOP-9% Result",
      },
      {
        "@type": "ListItem",
        position: 7,
        url: "https://kizevich.com/portfolio/sig-07-nvidia-blackwell-nvfp4-kernel-hackathon",
        name: "NVIDIA Blackwell NVFP4 Kernel Hackathon — Leaderboard Entry",
      },
    ],
  },
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(proofArchiveJsonLd).replace(/</g, "\\u003c"),
  }}
/>
```

### Implementation Note
The URLs above are example slug targets for final production routing. Keep the `ListItem` order aligned with the curated top-layer dossier order from `docs/PROOF_ARCHIVE_DISTILLATION.md`.

## 8. Open Graph Image Strategy

The site must not ship default blog-like OG cards.

## 8.1 File Convention

Recommended route files:
- `src/app/opengraph-image.tsx`
- `src/app/twitter-image.tsx`
- `src/app/portfolio/opengraph-image.tsx`
- `src/app/portfolio/[slug]/opengraph-image.tsx`
- optional later: `src/app/blog/[slug]/opengraph-image.tsx`

Prefer file-based OG image API over manually syncing metadata image URLs.

## 8.2 Visual Rules For OG Images

### Shared Look
- background: `Void Black`
- primary text: `IBM Plex Mono`
- accent line / label / corner marker: `Phosphor Lime`
- secondary text: `Archive Bone`
- grid / technical frame: `Raw Titanium` at low opacity
- no blue
- no glossy gradients
- no default “blog card with big white text on a random photo”

### Homepage OG
- left-aligned text block
- top line: `AI_Nikitka93`
- primary line: `signal lab / proof archive`
- secondary line: `AI video / agents / dossiers / field notes`
- subtle grid and one phosphor accent rail

### Proof Archive OG
- title: `Proof Archive`
- subtitle: `7 curated dossiers`
- bottom strip: `AI imaging / neurovideo / ML / agents / kernels`
- optional small index markers `SIG-01` through `SIG-07`

### Dossier Detail OG
Two modes:

#### Image-backed dossier
- use a cropped monochrome or dark-treated proof panel on the right side at `30%` to `40%` width
- left side holds:
  - dossier title
  - `Proof Archive`
  - `AI_Nikitka93`

#### Text-backed dossier
- no fake image
- oversized mono metric becomes the visual anchor:
  - `TOP-9%`
  - `#64`
  - `50+`
- secondary line beneath the metric
- bottom metadata strip with dossier ID and brand name

### Technical Composition
- 1200x630
- safe padding: `64px`
- max 3 text zones
- max 1 accent family per card

## 8.3 Recommended Dynamic OG Skeleton

```tsx
// src/app/portfolio/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0A0D0C",
          color: "#D6CFBF",
          padding: 64,
        }}
      >
        {/* Build route-specific editorial signal lab composition here */}
      </div>
    ),
    size,
  );
}
```

## 9. Implementation Notes For Current Files

## 9.1 `src/app/layout.tsx`
- keep `metadataBase`
- remove `alternates.canonical`
- move brand suffix to `AI_Nikitka93`
- keep OG/Twitter defaults brand-first

## 9.2 `src/app/portfolio/page.tsx`
- replace static `Metadata` copy with the proof archive template above
- brand route as `Proof Archive`, not generic portfolio wall

## 9.3 `src/app/portfolio/[slug]/page.tsx`
- keep `generateStaticParams`
- ensure unpublished entry resolves to `null` via updated MDX utility
- use route-level canonical and dossier-specific OG image

## 9.4 `src/app/blog/[slug]/page.tsx`
- even though not the focus of this step, apply the same canonical pattern there
- if `published: false`, the page must 404

## 10. QA Checklist For Frontend

- homepage title starts with `AI_Nikitka93`
- `/portfolio` canonical is exactly `https://kizevich.com/portfolio`
- dossier detail title is `[Title] | Proof Archive | AI_Nikitka93`
- no route inherits homepage canonical by accident
- sitemap includes:
  - static routes
  - published blog posts
  - published portfolio entries
- sitemap excludes unpublished MDX
- Person JSON-LD links `AI_Nikitka93` and `Никита Кизевич` through one entity
- `Nikita AI` does not appear in title, description, OG title, or structured data

## 11. Final Rule

This SEO layer should rank the public identity that actually belongs to the project:
- `AI_Nikitka93`
- `AI Nikitka93`
- `Nikitka AI`
- `Никита Кизевич`
- `Кизевич Никита`

It must not collapse back into:
- generic personal portfolio naming
- human-name-only titling on every route
- or metadata that strengthens the wrong entity query such as `Nikita AI`
