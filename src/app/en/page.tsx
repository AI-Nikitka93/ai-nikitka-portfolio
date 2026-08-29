import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileCheck2, MessageSquareText } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { buildMetadata } from "@/lib/seo";
import { flagshipProofCases } from "@/lib/proof-lab";

const entryPoints = [
  {
    title: "Selected work",
    href: "/portfolio",
    note: "Eight selected pages with AI visuals, AI video, challenge results and supporting documents.",
    icon: FileCheck2,
  },
  {
    title: "Project budget",
    href: "/services-calculator",
    note: "A practical estimator for video, visual packs, simple helpers, prompts and consulting.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Site assistant",
    href: "/ai-assistant",
    note: "A local site helper that routes visitors to public pages without inventing unsupported claims.",
    icon: MessageSquareText,
  },
] as const;

const proofPoints = [
  "AI video, images, sites and practical digital work are the public focus.",
  "Each selected work shows the organizer, date, result and what confirms it.",
  "The public tone is intentionally modest: no inflated seniority, no unsupported promises, no private details.",
] as const;

export const metadata: Metadata = buildMetadata({
  title: "English Summary",
  description:
    "English summary for AI_Nikitka93: hands-on vibe-coding, web applications, generative media and practical experiments by Nikita Kizevich.",
  path: "/en",
  locale: "en_US",
  languageAlternates: true,
});

export default function EnglishSummaryPage() {
  const proofRail = flagshipProofCases.slice(0, 3);

  return (
    <PageShell
      contentLang="en"
      eyebrow="English summary"
      title="Nikita Kizevich / AI_Nikitka93: Vibe-coding, Web Applications & Generative AI Media."
      description="This is a compact English entry point. The main site is Russian-first, but the core positioning is simple: hands-on vibe-coding, web applications, generative media and practical experiments, without inflated claims."
      actions={
        <>
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(183,255,60,0.08)]"
          >
            View selected work
          </Link>
          <Link
            href="/links"
            className="inline-flex min-h-11 items-center rounded-panel border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-[rgba(183,255,60,0.06)]"
          >
            Contact links
          </Link>
        </>
      }
      aside={
        <div className="space-y-4">
          <div className="signal-frame signal-radial-accent rounded-panel p-5">
            <p className="signal-label text-accent">Start here</p>
            <div className="mt-4 grid gap-3">
              {proofRail.map((item) => (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.slug}`}
                  className="rounded-panel border border-border-subtle px-4 py-4 transition-colors hover:border-accent"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {item.result}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-foreground">
                    {item.shortTitle}
                  </span>
                  <span className="mt-2 block text-xs leading-6 text-[rgba(214,207,191,0.68)]">
                    {item.role} / {item.evidence}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="signal-frame rounded-panel p-5">
            <p className="signal-label text-accent">Status</p>
            <p className="mt-4 text-sm leading-7 text-[rgba(214,207,191,0.82)]">
              English page is a concise release-safe summary, not a full mirrored translation of every
              Russian route.
            </p>
          </div>
        </div>
      }
    >
      <ScrollReveal>
        <section className="grid gap-5 xl:grid-cols-3">
          {entryPoints.map((entry) => {
            const Icon = entry.icon;
            return (
              <Link
                key={entry.href}
                href={entry.href}
                className="signal-frame interactive-surface rounded-shell p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-semibold text-foreground">{entry.title}</h2>
                  <Icon size={18} className="text-accent" />
                </div>
                <p className="mt-4 text-sm leading-7 text-[rgba(214,207,191,0.8)]">{entry.note}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
                  Open route
                  <ArrowRight size={15} />
                </span>
              </Link>
            );
          })}
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <section className="signal-frame rounded-shell p-6 md:p-8">
          <p className="signal-label text-accent">Public summary</p>
          <div className="mt-5 grid gap-4">
            {proofPoints.map((point, index) => (
              <div
                key={point}
                className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 rounded-panel border border-border-subtle px-4 py-4"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-7 text-[rgba(214,207,191,0.82)]">{point}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </PageShell>
  );
}
