import type { ContentEntry, ContentFrontmatter } from "@/lib/mdx";
import { absoluteUrl } from "@/lib/seo";

export type DossierVariant = "image" | "text";
export type DossierKind = "Signal Marker" | "Proof Artifact";
export type PublicEvidenceLevel = "file-backed" | "image-backed" | "source-traced";

export type ExternalContextLink = {
  label: string;
  href: string;
  note: string;
};

export type PortfolioFrontmatter = ContentFrontmatter & {
  dossierId: string;
  dossierType: DossierKind;
  issuer: string;
  evidenceStatus: string;
  publicEvidenceLevel?: PublicEvidenceLevel;
  publicEvidenceNote?: string;
  externalContext?: ExternalContextLink[];
  archiveNote: string;
  variant: DossierVariant;
  image?: string;
  metricValue?: string;
  metricLabel?: string;
  metricSecondary?: string;
  signalStrength?: string[];
  year?: string;
  role?: string;
  client?: string;
  tools?: string[];
  orientation?: "portrait" | "landscape";
  aspectRatio?: string;
};

export function getEvidencePresentation(
  status: string | undefined,
  publicEvidenceLevel?: PublicEvidenceLevel,
) {
  if (publicEvidenceLevel === "source-traced" || status === "text-backed only") {
    return {
      shortLabel: "событие + описание",
      label: "есть ссылка на событие; личный результат указан по материалам Никиты",
      detail:
        "Публичная ссылка ведет на конкурс, правила, страницу победителей или таблицу результатов. Для личного результата рядом указано, какой скриншот или файл стоит добавить позже.",
    };
  }

  if (status === "image-backed" || publicEvidenceLevel === "image-backed") {
    return {
      shortLabel: "изображение",
      label: "есть изображение результата",
      detail:
        "На странице есть публичное изображение, которое можно проверить прямо здесь.",
    };
  }

  if (status === "file-backed" || publicEvidenceLevel === "file-backed") {
    return {
      shortLabel: "документ",
      label: "есть диплом или сертификат",
      detail:
        "На странице показан диплом, сертификат или другой документ, который подтверждает результат.",
    };
  }

  if (status === "file-backed + text-backed") {
    return {
      shortLabel: "событие + документ",
      label: "есть событие и подтверждающий документ",
      detail:
        "Указаны событие, дата и площадка, а на странице показан диплом или сертификат. Если есть публичная страница с объявлением победителей, ссылка добавляется рядом.",
    };
  }

  return {
    shortLabel: status || "не указано",
    label: status || "подтверждение не указано",
    detail: "Для этой работы можно добавить отдельное публичное подтверждение.",
  };
}

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: "Никита Кизевич",
    alternateName: [
      "AI_Nikitka93",
      "AI Nikitka93",
      "Nikitka AI",
      "Кизевич Никита",
    ],
    url: absoluteUrl("/"),
    mainEntityOfPage: absoluteUrl("/"),
    description:
      "Никита Кизевич — автор AI_Nikitka93: портфолио с видео, изображениями, небольшими проектами и подтвержденными результатами.",
    knowsAbout: [
      "Generative AI",
      "AI video",
      "AI tools",
      "Prompt engineering",
      "AI experiments",
      "Generative visuals",
    ],
  };
}

export function buildProofArchiveJsonLd(
  entries: Array<ContentEntry<PortfolioFrontmatter>>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/portfolio#collection"),
    url: absoluteUrl("/portfolio"),
    name: "Работы | AI_Nikitka93",
    description:
      "Семь страниц с работами, результатами, датами и подтверждениями AI_Nikitka93.",
    isPartOf: {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: "AI_Nikitka93",
      url: absoluteUrl("/"),
    },
    about: {
      "@id": absoluteUrl("/#person"),
    },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: entries.length,
      itemListElement: entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/portfolio/${entry.slug}`),
        name: entry.frontmatter.title || entry.slug,
      })),
    },
  };
}
