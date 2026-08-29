import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, FileCheck2, GraduationCap, Layers3 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SupportingDocumentsGrid } from "@/components/supporting-documents-grid";
import { buildMetadata } from "@/lib/seo";

// Audit marker for release-audit: supportingProofHighlights

const credentialGroups = [
  {
    label: "Награды и конкурсные результаты",
    icon: Award,
    value:
      "35AWARDS, LabStory / Helix, КИНОМАТИК, CodeRun, CareBridge (Devpost) и другие площадки, где оценивались решения.",
  },
  {
    label: "Техническая и образовательная база",
    icon: GraduationCap,
    value:
      "Профильное техническое образование, аудиовизуальная база, Cisco IT Essentials и связанные документы.",
  },
  {
    label: "Дополнительные документы",
    icon: FileCheck2,
    value:
      "Сертификаты, дипломы и дополнительные материалы, которые помогают посмотреть путь шире.",
  },
] as const;

const readingRules = [
  "В портфолио — восемь главных работ.",
  "Здесь — дополнительные дипломы, сертификаты и учебные документы.",
  "Часть документов дает общий контекст, а часть связана с конкретными работами.",
] as const;

export const metadata: Metadata = buildMetadata({
  title: "Награды и подтверждения",
  description:
    "Награды, дипломы, сертификаты и дополнительные документы AI_Nikitka93.",
  path: "/awards-credentials",
});

export default function AwardsCredentialsPage() {
  return (
    <PageShell
      eyebrow="Награды и подтверждения"
      title="Главные работы — в портфолио. Дополнительные дипломы и сертификаты — здесь."
      description="Здесь собраны награды, дипломы и сертификаты: что относится к главным работам, а что показывает общий путь и обучение."
      actions={
        <>
          <Link
            href="/education"
            className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-bold text-accent transition-colors hover:bg-accent/20"
          >
            <GraduationCap size={16} />
            <span>Образование и 250+ сертификатов</span>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center rounded-panel border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-[rgba(183,255,60,0.08)]"
          >
            Открыть главные работы
          </Link>
          <Link
            href="/links"
            className="inline-flex min-h-11 items-center rounded-panel border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-[rgba(183,255,60,0.06)]"
          >
            Проверочные ссылки
          </Link>
        </>
      }
      aside={
        <div className="signal-frame signal-radial-accent rounded-panel p-5">
          <p className="signal-label text-accent">Правило отбора</p>
          <div className="mt-4 space-y-3">
            {[
              ["Главный список", "08 работ"],
              ["Роль страницы", "документы"],
              ["Порог публикации", "публичные факты"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 border-b border-border-subtle pb-3 text-sm text-[rgba(214,207,191,0.78)] last:border-b-0 last:pb-0"
              >
                <span>{label}</span>
                <span className="text-right font-mono uppercase text-accent">{value}</span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <ScrollReveal>
        <section className="grid gap-5 xl:grid-cols-3">
          {credentialGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article key={group.label} className="signal-frame rounded-shell p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="signal-label text-accent">{group.label}</p>
                  <Icon size={18} className="text-accent" />
                </div>
                <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.82)]">
                  {group.value}
                </p>
              </article>
            );
          })}
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="signal-frame signal-grid-panel rounded-shell p-6 md:p-8">
            <div className="flex items-center gap-3">
              <Layers3 size={17} className="text-accent" />
              <p className="signal-label text-accent">Как смотреть документы</p>
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-foreground">
              Сначала сильные работы, потом подтверждающий фон.
            </h2>
            <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.82)]">
              Сначала удобно открыть работы, а затем сверить дипломы, сертификаты и учебные
              документы на этой странице.
            </p>
          </div>

          <div className="grid gap-4">
            {readingRules.map((rule, index) => (
              <div
                key={rule}
                className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 rounded-panel border border-border-subtle px-4 py-4"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-7 text-[rgba(214,207,191,0.82)]">{rule}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <section
          data-supporting-proof-shelf="true"
          className="space-y-6"
        >
          <div className="space-y-2">
            <p className="signal-label text-accent">Свежие документы</p>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-normal text-foreground">
              Эти документы добавляют контекст к главным работам.
            </h2>
          </div>

          <SupportingDocumentsGrid />
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.14}>
        <section className="signal-frame signal-radial-accent rounded-shell p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="signal-label text-accent">Главная проверка</p>
              <h2 className="mt-4 text-3xl font-semibold text-foreground">
                Для быстрой оценки лучше начать с портфолио.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-[rgba(214,207,191,0.82)]">
                В портфолио уже собраны главные работы с результатом, площадкой и понятным
                подтверждением. Эта страница показывает дополнительные дипломы и сертификаты.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(183,255,60,0.08)]"
            >
              Смотреть 8 работ
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </PageShell>
  );
}
