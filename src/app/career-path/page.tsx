import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, PlugZap, Trophy } from "lucide-react";
import { CareerPathScene } from "@/components/career-path-scene";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { buildMetadata } from "@/lib/seo";

const plainTimeline = [
  {
    period: "2009-2014",
    title: "Техническая база",
    body:
      "Учеба, электрооборудование, аудиовизуальные системы, компьютеры, графика и первые сайты.",
  },
  {
    period: "2014-2021",
    title: "УП «Минскводоканал»",
    body:
      "Семь лет работы электромонтером: оборудование, ответственность, 5-й разряд и IV группа допуска.",
  },
  {
    period: "2021-2025",
    title: "Разворот в цифровую сторону",
    body:
      "Web, дизайн, маркетинг, поддержка, AI, нейросети и много самостоятельного обучения.",
  },
  {
    period: "2025-2026",
    title: "AI_Nikitka93",
    body:
      "Публичные работы, конкурсы, портфолио, калькулятор, помощник по сайту и новые задачи.",
  },
] as const;

export const metadata: Metadata = buildMetadata({
  title: "Путь Никиты Кизевича",
  description:
    "Интерактивный путь Никиты Кизевича: от электрики и УП «Минскводоканал» к визуальным работам, нейросетям и проекту AI_Nikitka93.",
  path: "/career-path",
});

export default function CareerPathPage() {
  return (
    <PageShell
      eyebrow="Путь работы"
      title="От электрики и Минскводоканала к AI_Nikitka93."
      description="Здесь не нужно читать резюме на десять экранов. Нажмите на этап: видно, где была техника, где началось обучение, где появились визуальные работы и куда все это пришло сейчас."
      actions={
        <>
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(152,207,227,0.1)]"
          >
            Смотреть работы
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center rounded-panel border border-border-subtle px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-[rgba(152,207,227,0.08)]"
          >
            Открыть профиль
          </Link>
        </>
      }
      aside={
        <div className="space-y-4">
          {[
            {
              label: "Старт",
              value: "техника и электрика",
              icon: PlugZap,
            },
            {
              label: "Проверяемо",
              value: "работа, документы, ссылки",
              icon: FileCheck2,
            },
            {
              label: "Сейчас",
              value: "визуал, сайты, AI",
              icon: Trophy,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="signal-frame rounded-panel p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="signal-label text-accent">{item.label}</p>
                    <p className="mt-3 text-xl font-semibold leading-7 text-foreground">
                      {item.value}
                    </p>
                  </div>
                  <Icon size={18} className="text-accent" />
                </div>
              </div>
            );
          })}
        </div>
      }
    >
      <ScrollReveal>
        <CareerPathScene />
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <section className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.68)] p-5 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="signal-label text-accent">Если без кликов</p>
              <h2 className="mt-3 max-w-4xl text-2xl font-semibold tracking-normal text-foreground md:text-3xl">
                Тот же путь обычным списком.
              </h2>
            </div>
            <Link
              href="/awards-credentials"
              className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-border-subtle px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-[rgba(152,207,227,0.08)]"
            >
              Документы
              <ArrowRight size={15} />
            </Link>
          </div>

          <ol className="mt-5 grid gap-4 md:grid-cols-2">
            {plainTimeline.map((item, index) => (
              <li
                key={item.period}
                className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.3)] p-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, "0")} / {item.period}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-normal text-foreground">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </ScrollReveal>
    </PageShell>
  );
}
