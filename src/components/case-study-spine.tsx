import { CheckCircle2, FileCheck2, Gauge, ShieldCheck } from "lucide-react";
import { getEvidencePresentation, type PortfolioFrontmatter } from "@/lib/proof-archive";

type CaseStudySpineProps = {
  frontmatter: PortfolioFrontmatter;
};

function valueOrFallback(value: string | undefined, fallback: string) {
  return value && value.trim() ? value : fallback;
}

export function CaseStudySpine({ frontmatter }: CaseStudySpineProps) {
  const evidence = getEvidencePresentation(
    frontmatter.evidenceStatus,
    frontmatter.publicEvidenceLevel,
  );
  const tools = frontmatter.tools?.length ? frontmatter.tools.join(" / ") : "инструменты не указаны";
  const caseStudySpineRows = [
    {
      label: "что сделал",
      value: valueOrFallback(frontmatter.role, "описание не указано"),
      icon: CheckCircle2,
    },
    {
      label: "с чем работал",
      value: tools,
      icon: Gauge,
    },
    {
      label: "что важно",
      value:
        frontmatter.publicEvidenceNote ||
        "Основные факты указаны в описании работы и документах на странице.",
      icon: ShieldCheck,
    },
    {
      label: "итог",
      value: frontmatter.metricValue || frontmatter.metricSecondary || frontmatter.archiveNote,
      icon: CheckCircle2,
    },
    {
      label: "подтверждение",
      value: evidence.label,
      icon: FileCheck2,
    },
  ];

  return (
    <section
      data-case-study-spine="true"
      data-case-contract="what was done / tools / result / confirmation"
      className="signal-frame signal-grid-panel rounded-shell p-5 md:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="signal-label text-accent">Коротко о работе</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal text-foreground">
            Что сделал, с чем работал, какой итог и чем это подтверждается.
          </h2>
        </div>
        <span className="rounded-panel border border-[rgba(152,207,227,0.28)] bg-[rgba(152,207,227,0.08)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          {evidence.shortLabel}
        </span>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-5">
        {caseStudySpineRows.map((row, index) => {
          const Icon = row.icon;
          return (
            <article key={row.label} className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.32)] p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon size={15} className="text-accent" />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                {row.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.82)]">
                {row.value}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
