import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudySpine } from "@/components/case-study-spine";
import { DetailDocumentViewer } from "@/components/detail-document-viewer";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getEvidencePresentation, type PortfolioFrontmatter } from "@/lib/proof-archive";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { getPortfolioEntryBySlug, getPortfolioEntries } from "@/lib/mdx";

type PortfolioDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function localizeDossierType(type: string | undefined) {
  if (type === "Signal Marker") return "Основная работа";
  if (type === "Proof Artifact") return "Подтвержденный результат";
  return type || "Работа";
}

export async function generateStaticParams() {
  const entries = await getPortfolioEntries<PortfolioFrontmatter>();
  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getPortfolioEntryBySlug<PortfolioFrontmatter>(slug);

  if (!entry) {
    return buildMetadata({
      title: "Работа не найдена",
      description: "Запрошенная работа недоступна в портфолио.",
      path: `/portfolio/${slug}`,
      noIndex: true,
    });
  }

  const title = entry.frontmatter.title || slug;
  const description = entry.frontmatter.description || entry.excerpt;
  const canonicalPath = `/portfolio/${slug}`;

  return buildMetadata({
    title: `${title} | Работы | AI_Nikitka93`,
    description,
    path: canonicalPath,
    imagePath: `/portfolio/${slug}/opengraph-image`,
    type: "article",
    absoluteTitle: true,
  });
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const entry = await getPortfolioEntryBySlug<PortfolioFrontmatter>(slug);

  if (!entry) {
    notFound();
  }

  const dossierJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": absoluteUrl(`/portfolio/${slug}#work`),
    name: entry.frontmatter.title || slug,
    url: absoluteUrl(`/portfolio/${slug}`),
    description: entry.frontmatter.description || entry.excerpt,
    creator: {
      "@id": absoluteUrl("/#person"),
    },
    about: [entry.frontmatter.category, ...(entry.frontmatter.tags || [])].filter(Boolean),
  };
  const evidence = getEvidencePresentation(
    entry.frontmatter.evidenceStatus,
    entry.frontmatter.publicEvidenceLevel,
  );
  const publicEvidenceNote = entry.frontmatter.publicEvidenceNote || evidence.detail;

  return (
    <>
      <JsonLdScript data={dossierJsonLd} />
      <PageShell
        eyebrow={entry.frontmatter.dossierId}
        title={entry.frontmatter.title || slug}
        description={entry.frontmatter.archiveNote || entry.excerpt}
        aside={
          <div className="space-y-4">
            <div className="signal-frame rounded-panel p-5">
              <p className="signal-label text-accent">Подтверждение</p>
              <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                {evidence.label}
              </p>
              <p className="mt-3 text-xs leading-6 text-[rgba(214,207,191,0.66)]">
                {publicEvidenceNote}
              </p>
            </div>
            <div className="signal-frame rounded-panel p-5">
              <p className="signal-label">Где подтверждается</p>
              <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                {entry.frontmatter.issuer}
              </p>
            </div>
            <div className="signal-frame rounded-panel p-5">
              <p className="signal-label">Коротко о работе</p>
              <div className="mt-4 grid gap-3">
                {[
                  ["вид", localizeDossierType(entry.frontmatter.dossierType)],
                  ["раздел", entry.frontmatter.category || "Работы"],
                  [
                    "дата",
                    entry.frontmatter.date || entry.frontmatter.year || "дата не указана",
                  ],
                  ["подтверждение", evidence.shortLabel],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 border-b border-border-subtle pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                      {label}
                    </span>
                    <span className="text-sm text-[rgba(214,207,191,0.78)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <ScrollReveal>
          <section className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            {entry.frontmatter.variant === "image" && entry.frontmatter.image ? (
              <DetailDocumentViewer
                src={entry.frontmatter.image}
                alt={entry.frontmatter.title || entry.slug}
                orientation={entry.frontmatter.orientation}
                issuer={entry.frontmatter.issuer}
                date={entry.frontmatter.date || entry.frontmatter.year}
              />
            ) : (
              <div className="signal-frame flex min-h-[24rem] flex-col justify-between rounded-shell p-6 md:p-8">
                <div>
                  <p className="signal-label text-accent">
                    {entry.frontmatter.metricLabel || "результат"}
                  </p>
                  <p className="mt-6 font-mono text-6xl tracking-normal text-foreground sm:text-7xl lg:text-8xl">
                    {entry.frontmatter.metricValue}
                  </p>
                  {entry.frontmatter.metricSecondary ? (
                    <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-[rgba(214,207,191,0.74)]">
                      {entry.frontmatter.metricSecondary}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-3">
                  <div className="metric-rule h-px w-full" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-titanium">
                    {evidence.shortLabel}
                  </p>
                </div>
              </div>
            )}

            <div className="signal-frame rounded-shell p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Что это", localizeDossierType(entry.frontmatter.dossierType)],
                  ["Источник", entry.frontmatter.issuer],
                  [
                    "Дата",
                    entry.frontmatter.date || entry.frontmatter.year || "дата не указана",
                  ],
                  ["Подтверждение", evidence.label],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-panel border border-border-subtle p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                      {label}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[rgba(214,207,191,0.82)]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {entry.frontmatter.signalStrength && entry.frontmatter.signalStrength.length > 0 ? (
                <div className="mt-6 space-y-3">
                  <p className="signal-label">Почему эта работа важна</p>
                  <ul className="space-y-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                    {entry.frontmatter.signalStrength.map((signal) => (
                      <li key={signal} className="border-l border-border pl-4">
                        {signal}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-6 rounded-panel border border-border-subtle p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  документ или ссылка
                </p>
                <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.82)]">
                  {publicEvidenceNote}
                </p>
              </div>

              {entry.frontmatter.externalContext?.length ? (
                <div className="mt-6 rounded-panel border border-border-subtle p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                    ссылки по теме
                  </p>
                  <div className="mt-4 grid gap-3">
                    {entry.frontmatter.externalContext.map((source) => (
                      <a
                        key={source.href}
                        href={source.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group rounded-panel border border-border-subtle px-4 py-4 transition-colors duration-300 hover:border-accent focus-visible:border-accent focus-visible:outline-none"
                      >
                        <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-accent">
                          {source.label}
                        </span>
                        <span className="mt-2 block text-sm leading-7 text-[rgba(214,207,191,0.74)]">
                          {source.note}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-panel border border-border-subtle p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    о работе
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.82)]">
                    {entry.frontmatter.archiveNote || entry.excerpt}
                  </p>
                </div>
                <div className="rounded-panel border border-border-subtle p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                    порядок просмотра
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.82)]">
                    Короткий порядок: описание работы, документ или ссылка, потом подробности,
                    цифры и пояснения.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <CaseStudySpine frontmatter={entry.frontmatter} />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <article className="signal-frame rounded-shell p-6 md:p-8">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
            />
          </article>
        </ScrollReveal>
      </PageShell>
    </>
  );
}
