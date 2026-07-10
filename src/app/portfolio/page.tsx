import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DossierCard } from "@/components/dossier-card";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  buildProofArchiveJsonLd,
  getEvidencePresentation,
  type PortfolioFrontmatter,
} from "@/lib/proof-archive";
import { buildMetadata } from "@/lib/seo";
import { getPortfolioEntries } from "@/lib/mdx";
import { flagshipProofCases } from "@/lib/proof-lab";

export const metadata: Metadata = buildMetadata({
  title: "Работы",
  description:
    "Главные работы и результаты AI_Nikitka93: видео с нейросетями, изображения и конкурсные задачи.",
  path: "/portfolio",
  imagePath: "/portfolio/opengraph-image",
});

export default async function PortfolioPage() {
  const entries = await getPortfolioEntries<PortfolioFrontmatter>();
  const proofArchiveJsonLd = buildProofArchiveJsonLd(entries);
  const fileBackedEntries = entries.filter((entry) => entry.frontmatter.variant === "image");
  const metricEntries = entries.filter((entry) => entry.frontmatter.variant === "text");
  const heroProofCases = flagshipProofCases.slice(0, 3);
  const archiveRows = entries.map((entry) => ({
    node: entry.frontmatter.dossierId,
    title: entry.frontmatter.title,
    issuer: entry.frontmatter.issuer,
    state: getEvidencePresentation(
      entry.frontmatter.evidenceStatus,
      entry.frontmatter.publicEvidenceLevel,
    ).shortLabel,
  }));
  const archiveLaw = [
    "Здесь собраны только главные работы и результаты, которые лучше всего показывают мой опыт.",
    "Часть работ подтверждена дипломами или изображениями; для работ с цифрами рядом указано, какой материал стоит добавить позже.",
    "Дополнительные дипломы и обучение вынесены на отдельную страницу, чтобы здесь сразу были главные работы.",
  ];

  return (
    <>
      <JsonLdScript data={proofArchiveJsonLd} />
      <PageShell
        eyebrow="Работы"
        title="Восемь главных работ и результатов."
        description="Здесь собраны проекты и результаты, с которых лучше всего начинать знакомство с тем, что я делаю: видео, визуальные работы и конкурсные задачи."
        actions={
          <>
            <a
              href="#file-backed"
              className="inline-flex min-h-11 items-center rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              Визуальные работы
            </a>
            <a
              href="#text-backed"
              className="inline-flex min-h-11 items-center rounded-panel border border-border-subtle px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Конкурсы с цифрами
            </a>
            <a
              href="#portfolio-index"
              className="inline-flex min-h-11 items-center rounded-panel border border-border-subtle px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Вся подборка
            </a>
          </>
        }
        aside={
          <div className="space-y-4">
            <div className="signal-frame rounded-panel p-5">
              <p className="signal-label text-accent">Сначала открыть</p>
              <div className="mt-4 grid gap-3">
                {heroProofCases.map((item) => (
                  <Link
                    key={item.id}
                    href={`/portfolio/${item.slug}`}
                    className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-panel border border-border-subtle p-3 transition-colors hover:border-accent"
                  >
                    <span className="relative min-h-16 overflow-hidden rounded-[6px] border border-border-subtle bg-[rgba(214,207,191,0.9)]">
                      <Image
                        src={item.image}
                        alt={`${item.shortTitle}: превью работы`}
                        fill
                        sizes="72px"
                        className="object-contain p-1"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-titanium">
                        {item.result}
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-6 text-foreground">
                        {item.shortTitle}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[rgba(214,207,191,0.66)]">
                        {item.evidence}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="signal-frame rounded-panel p-5">
              <p className="signal-label text-accent">Что здесь собрано</p>
              <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                Только главные работы и самые сильные результаты, чтобы страницу было легко читать
                и быстро понять, чем именно я занимаюсь.
              </p>
            </div>
            <div className="signal-frame rounded-panel p-5">
              <p className="signal-label">Типы работ</p>
              <div className="mt-3 grid gap-3 text-sm text-[rgba(214,207,191,0.78)]">
                <div className="rounded-panel border border-border-subtle px-3 py-3">
                  работы с изображениями, видео и файлами
                </div>
                <div className="rounded-panel border border-border-subtle px-3 py-3">
                  работы, где главный результат — цифра, место или технический итог
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ScrollReveal>
          <section className="grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
            <div className="grid gap-5">
              <div className="signal-frame signal-radial-accent rounded-shell p-6">
                <p className="signal-label text-accent">Как читать эту страницу</p>
                <div className="mt-4 grid gap-3">
                  {archiveLaw.map((item, index) => (
                    <div
                      key={item}
                      className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 rounded-panel border border-border-subtle px-4 py-4"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-7 text-[rgba(214,207,191,0.82)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="signal-frame rounded-shell p-6">
                <p className="signal-label">Коротко</p>
                <div className="mt-4 grid gap-3">
                  {[
                    { label: "Главные работы", value: "08" },
                    { label: "Работы с файлами и изображениями", value: "04" },
                    { label: "Конкурсы с цифрами", value: "04" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-panel border border-border-subtle px-4 py-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                        {item.label}
                      </p>
                      <p className="mt-3 font-mono text-4xl tracking-normal text-foreground">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="signal-frame overflow-hidden rounded-shell">
              <div className="grid grid-cols-[72px_minmax(0,1.4fr)_minmax(140px,1fr)_minmax(120px,0.8fr)] border-b border-border-subtle bg-[rgba(18,24,22,0.78)] px-4 py-3">
                    {["ID", "Работа", "Площадка", "Подтверждение"].map((label) => (
                  <p
                    key={label}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium"
                  >
                    {label}
                  </p>
                ))}
              </div>
              <div>
                {archiveRows.map((row) => (
                  <div
                    key={row.node}
                    className="grid grid-cols-[72px_minmax(0,1.4fr)_minmax(140px,1fr)_minmax(120px,0.8fr)] items-start gap-3 border-b border-border-subtle px-4 py-4 last:border-b-0"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      {row.node}
                    </p>
                    <p className="text-sm leading-7 text-[rgba(214,207,191,0.84)]">{row.title}</p>
                    <p className="text-sm leading-7 text-[rgba(214,207,191,0.7)]">{row.issuer}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                      {row.state}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <section id="file-backed" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
                <p className="signal-label text-accent">Работы с изображениями и файлами</p>
                <h2 className="text-3xl font-semibold tracking-normal text-foreground">
                  Здесь собраны проекты, которые проще всего оценить глазами.
                </h2>
            </div>

            <div className="grid gap-5 xl:grid-cols-6">
              {fileBackedEntries.map((entry, index) => (
                <ScrollReveal
                  key={entry.slug}
                  delay={Math.min(index * 0.06, 0.16)}
                  className={
                    index === 0
                      ? "xl:col-span-4"
                      : index === 1
                        ? "xl:col-span-2"
                        : index === 2
                          ? "xl:col-span-2"
                          : "xl:col-span-4"
                  }
                >
                  <DossierCard slug={entry.slug} frontmatter={entry.frontmatter} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <section id="text-backed" className="grid gap-5 xl:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]">
            <div className="signal-frame signal-grid-panel rounded-shell p-6 md:p-8">
                <p className="signal-label text-accent">Конкурсы с цифрами</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-normal text-foreground">
                Здесь важны цифра, место и состав участников.
              </h2>
              <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.82)]">
                Эти работы держатся на цифрах, месте, составе участников и публичных страницах
                конкурса. Для личного результата рядом указано, какой скриншот или файл стоит
                добавить позже.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {metricEntries.map((entry, index) => (
                <ScrollReveal key={entry.slug} delay={Math.min(index * 0.06, 0.16)}>
                  <DossierCard slug={entry.slug} frontmatter={entry.frontmatter} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.14}>
          <section id="portfolio-index" className="grid scroll-mt-28 gap-5 xl:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)]">
            <div className="signal-frame rounded-shell p-6">
              <p className="signal-label text-accent">Вся подборка сразу</p>
              <p className="mt-4 text-3xl font-semibold tracking-normal text-foreground">
                Список всех восьми работ.
              </p>
              <p className="mt-4 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                Нижний блок дает быстрый список переходов после основных разделов.
              </p>
            </div>

            <div className="signal-frame overflow-hidden rounded-shell">
              {entries.map((entry, index) => (
                <Link
                  key={entry.slug}
                  href={`/portfolio/${entry.slug}`}
                  className="grid gap-3 border-b border-border-subtle px-4 py-4 transition-colors last:border-b-0 hover:bg-accent/10 md:grid-cols-[76px_minmax(0,1.2fr)_minmax(130px,0.6fr)_minmax(110px,0.5fr)]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")} / {entry.frontmatter.dossierId}
                  </span>
                  <span className="text-sm font-semibold leading-7 text-foreground">
                    {entry.frontmatter.title}
                  </span>
                  <span className="text-sm leading-7 text-[rgba(214,207,191,0.72)]">
                    {entry.frontmatter.metricValue || entry.frontmatter.issuer}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                    {getEvidencePresentation(
                      entry.frontmatter.evidenceStatus,
                      entry.frontmatter.publicEvidenceLevel,
                    ).shortLabel}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </PageShell>
    </>
  );
}
