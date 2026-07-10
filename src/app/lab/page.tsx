import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, ShieldCheck, Wrench } from "lucide-react";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageShell } from "@/components/page-shell";
import { ProofScanner } from "@/components/proof-scanner";
import { ScrollReveal } from "@/components/scroll-reveal";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { flagshipProofCases, labExperimentTracks } from "@/lib/proof-lab";

export const metadata: Metadata = buildMetadata({
  title: "Проверка",
  description:
    "AI_Nikitka93: что уже есть на сайте, какие работы подтверждены файлами и какие материалы можно добавить позже.",
  path: "/lab",
});

export default function LabPage() {
  const labJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/lab#collection"),
    url: absoluteUrl("/lab"),
    name: "AI_Nikitka93: проверка сайта",
    description:
      "Рабочая страница AI_Nikitka93: текущие разделы, подтверждения работ и очередь материалов для усиления портфолио.",
    isPartOf: {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
    },
  };

  return (
    <>
      <JsonLdScript data={labJsonLd} />
      <PageShell
        eyebrow="Что уже есть"
        title="Рабочая карта сайта: что готово и что можно усилить."
        description="Здесь собрана простая карта: какие разделы уже работают, какие работы подтверждены файлами и какие материалы стоит добавить позже."
        aside={
          <div className="space-y-4">
            <div className="signal-frame rounded-panel p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="signal-label text-accent">Текущее состояние</p>
                <FlaskConical size={17} className="text-accent" />
              </div>
              <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                Эта страница показывает, что уже подключено к сайту и какие материалы нужно
                добавить следующими.
              </p>
            </div>
            <div className="signal-frame rounded-panel p-5">
              <p className="signal-label">Как подтверждается</p>
              <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                Для работ с дипломами показан документ. Для работ с цифрами указана публичная
                страница конкурса и список материалов, которые стоит добавить позже.
              </p>
            </div>
          </div>
        }
        actions={
          <>
            <Link
              href="/portfolio"
              className="inline-flex min-h-11 items-center rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              Открыть работы
            </Link>
            <Link
              href="/ai-assistant"
              className="inline-flex min-h-11 items-center rounded-panel border border-border-subtle px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Проверить помощника
            </Link>
          </>
        }
      >
        <ScrollReveal>
          <section
            data-proof-lab="true"
            data-lab-contract="checked / confirmations / materials to add later"
            className="grid gap-5 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]"
          >
            <div className="signal-frame signal-radial-accent rounded-shell p-6 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="signal-label text-accent">Что проверено</p>
                <ShieldCheck size={17} className="text-accent" />
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal text-foreground">
                Разделы помечены по состоянию.
              </h2>
              <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.82)]">
                Так проще понять, что уже можно смотреть, где есть документы и какие материалы
                ждут добавления.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {labExperimentTracks.map((track) => (
                <Link
                  key={track.id}
                  href={track.href}
                  className="interactive-surface rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.66)] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                        {track.status}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold text-foreground">
                        {track.title}
                      </h3>
                    </div>
                    <Wrench size={17} className="text-accent" />
                  </div>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                    {track.lane}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                    {track.summary}
                  </p>
                  <p className="mt-4 text-xs leading-6 text-[rgba(214,207,191,0.64)]">
                    {track.next}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    открыть раздел
                    <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <ProofScanner />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <section className="signal-frame rounded-shell p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="signal-label text-accent">Что добавить позже</p>
                <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal text-foreground">
                  Какие материалы добавить следующими.
                </h2>
              </div>
              <ShieldCheck size={18} className="text-accent" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {flagshipProofCases.map((item) => (
                <article key={item.id} className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.32)] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {item.evidence}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{item.shortTitle}</h3>
                  <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                    {item.sourceTraceUpgrade}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </PageShell>
    </>
  );
}
