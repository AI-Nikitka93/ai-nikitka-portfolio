import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Clock3, FolderInput, ShieldCheck } from "lucide-react";
import { ProjectScopeEstimator } from "@/components/project-scope-estimator";
import { ScrollReveal } from "@/components/scroll-reveal";
import { services } from "@/lib/service-pricing";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Калькулятор услуг",
  description:
    "Интерактивный калькулятор услуг Никиты Кизевича: ориентир бюджета в BYN, конвертация в USD, EUR, RUB и PLN по курсу НБ РБ.",
  path: "/services-calculator",
});

const quickFacts = [
  {
    label: "Главная валюта",
    value: "BYN",
    body: "Расчет строится в белорусских рублях, а другие валюты показываются рядом.",
    icon: BadgeDollarSign,
  },
  {
    label: "Курс",
    value: "НБ РБ",
    body: "USD, EUR, RUB и PLN пересчитываются через официальный курс Национального банка.",
    icon: ShieldCheck,
  },
  {
    label: "После расчета",
    value: "Бриф",
    body: "Кнопка письма подставит формат, срок, дополнения и диапазон бюджета.",
    icon: FolderInput,
  },
] as const;

const readingRules = [
  {
    title: "Диапазон для старта",
    body: "Сайт показывает порядок бюджета для первого решения. Финальная сумма появляется после короткого брифа: материалы, права, сроки, объем правок.",
  },
  {
    title: "BYN остается базой",
    body: "При переключении USD, EUR, RUB или PLN меняется только отображение по курсу.",
  },
  {
    title: "Сложные задачи уходят в обсуждение",
    body: "Интеграции, длинные серии, срочные правки и коммерческое использование лучше оценивать отдельно.",
  },
] as const;

function formatByn(amount: number) {
  return new Intl.NumberFormat("ru-BY", {
    style: "currency",
    currency: "BYN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ServicesCalculatorPage() {
  const heroServiceStarts = services.slice(0, 3);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-10 px-4 pb-20 pt-28 sm:px-6 lg:px-10 lg:pt-32"
    >
      <ScrollReveal>
        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] xl:items-stretch">
          <div className="rounded-shell border border-[rgba(152,207,227,0.24)] bg-[linear-gradient(135deg,rgba(152,207,227,0.12),rgba(18,24,22,0.82)_42%,rgba(10,13,12,0.96))] p-6 md:p-8">
            <p className="signal-label text-accent">Калькулятор услуг</p>
            <h1 className="mt-5 max-w-5xl text-balance text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-tight text-foreground">
              Быстро прикинуть бюджет на видео, визуалы или простой прототип.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[rgba(214,207,191,0.84)] md:text-lg md:leading-9">
              Выберите формат, объем, готовность материалов и срок. Калькулятор покажет диапазон в
              BYN и пересчитает его в другие валюты по курсу НБ РБ.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#calculator"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(152,207,227,0.1)]"
              >
                Посчитать бюджет
                <ArrowRight size={15} />
              </a>
              <Link
                href="/portfolio"
                className="inline-flex min-h-11 items-center justify-center rounded-panel border border-border-subtle px-4 py-3 text-sm font-medium text-[rgba(214,207,191,0.76)] transition-colors hover:border-accent hover:text-foreground"
              >
                Сначала посмотреть работы
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-panel border border-[rgba(152,207,227,0.28)] bg-[rgba(152,207,227,0.08)] p-5">
              <p className="signal-label text-accent">Быстрый выбор</p>
              <div className="mt-4 grid gap-3">
                {heroServiceStarts.map((service) => (
                  <a
                    key={service.id}
                    href="#calculator"
                    className="rounded-panel border border-border-subtle px-4 py-3 transition-colors hover:border-accent"
                  >
                    <span className="text-sm font-semibold text-foreground">{service.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-[rgba(214,207,191,0.66)]">
                      от {formatByn(service.basePriceByn)} / {service.baseUnit}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            {quickFacts.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="rounded-panel border border-border-subtle bg-[rgba(18,24,22,0.68)] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                        {item.label}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-foreground">{item.value}</h2>
                    </div>
                    <Icon size={18} className="text-accent" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.04}>
        <div id="calculator" className="scroll-mt-28">
          <ProjectScopeEstimator />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.68)] p-6">
            <div className="flex items-start gap-3">
              <Clock3 size={18} className="mt-1 text-accent" />
              <div>
                <p className="signal-label text-accent">Как читать сумму</p>
                <h2 className="mt-4 text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
                  Калькулятор нужен для решения: писать сейчас или сначала собрать материалы.
                </h2>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {readingRules.map((rule) => (
              <article key={rule.title} className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.36)] p-5">
                <h3 className="text-lg font-semibold text-foreground">{rule.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">{rule.body}</p>
              </article>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <section className="grid gap-4 md:grid-cols-2">
          <a
            href="https://t.me/digital_ai_art"
            target="_blank"
            rel="noreferrer noopener"
            className="interactive-surface rounded-shell border border-[rgba(152,207,227,0.24)] bg-[rgba(152,207,227,0.08)] p-6"
          >
            <p className="signal-label text-accent">Написать напрямую</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-normal text-foreground">
                Telegram: показать задачу, сроки и примерный бюджет
              </h2>
              <ArrowRight size={16} />
            </div>
          </a>
          <Link
            href="/links"
            className="interactive-surface rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.68)] p-6"
          >
            <p className="signal-label">Контакты и профили</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-normal text-foreground">
                Открыть все способы связи
              </h2>
              <ArrowRight size={16} />
            </div>
          </Link>
        </section>
      </ScrollReveal>
    </main>
  );
}
