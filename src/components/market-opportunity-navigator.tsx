"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  FileCheck2,
  Layers3,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type MarketModeId = "hr" | "client" | "specialist" | "creator";

type MarketMode = {
  id: MarketModeId;
  title: string;
  audience: string;
  job: string;
  recommendation: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  steps: readonly string[];
  proof: string;
};

const marketModes: readonly MarketMode[] = [
  {
    id: "hr",
    title: "Работодателю",
    audience: "нужно быстро понять, кто перед вами",
    job: "увидеть путь, работы, документы и контакты без длинной легенды",
    recommendation:
      "Откройте работы, потом короткий профиль. Так быстрее всего видно, откуда пришел Никита и что уже можно проверить.",
    primaryHref: "/portfolio",
    primaryLabel: "Открыть работы",
    secondaryHref: "/about",
    secondaryLabel: "Профиль",
    steps: ["КИНОМАТИК", "LabStory / Helix", "35AWARDS"],
    proof: "В одном месте видны работы, дипломы, даты и ссылки.",
  },
  {
    id: "client",
    title: "Заказчику",
    audience: "есть идея, но ее еще надо нормально описать",
    job: "понять, подойдет ли Никита под ролик, изображения, простую страницу, бот или консультацию",
    recommendation:
      "Зайдите в калькулятор, выберите формат и отправьте короткое сообщение с задачей, сроком и примерным бюджетом.",
    primaryHref: "/services-calculator",
    primaryLabel: "Посчитать бюджет",
    secondaryHref: "/links",
    secondaryLabel: "Контакты",
    steps: ["Тип задачи", "Материалы", "Срок"],
    proof: "Калькулятор дает примерный диапазон и помогает сразу написать задачу по делу.",
  },
  {
    id: "specialist",
    title: "Коллега",
    audience: "интересно, как человек собирает такие работы",
    job: "посмотреть реальные работы, ограничения и ход мысли",
    recommendation:
      "Откройте портфолио и блог: там видно, что получилось, что известно точно и какие материалы еще стоит добавить.",
    primaryHref: "/blog",
    primaryLabel: "Читать блог",
    secondaryHref: "/portfolio",
    secondaryLabel: "Работы",
    steps: ["Как делал", "Что известно", "Что вышло"],
    proof: "В карточках видно: что сделано, что известно точно и какой файл или ссылка есть рядом.",
  },
  {
    id: "creator",
    title: "Креативу",
    audience: "нужна идея, визуал или короткий ролик",
    job: "понять вкус, формат и готовность к правкам до переписки",
    recommendation:
      "Начните с визуальных работ. Если не хочется искать руками, помощник быстро доведет до нужной страницы.",
    primaryHref: "/ai-assistant",
    primaryLabel: "Спросить помощника",
    secondaryHref: "/portfolio",
    secondaryLabel: "Визуальные работы",
    steps: ["Визуал", "Сцена", "Что написать"],
    proof: "Помощник быстро ведет к нужной странице и экономит первое сообщение.",
  },
] as const;

const marketPatterns = [
  {
    label: "selected work navigation",
    title: "Конкретные работы",
    body: "Открывается работа, а рядом идут дата, площадка, роль и документ или ссылка.",
    icon: FileCheck2,
    href: "/portfolio",
  },
  {
    label: "site helper",
    title: "Помощник по сайту",
    body: "Можно спросить обычным языком: где работы, где бюджет, где контакты.",
    icon: Bot,
    href: "/ai-assistant",
  },
  {
    label: "budget estimator",
    title: "Ориентир бюджета",
    body: "Калькулятор дает примерный диапазон, чтобы первое сообщение было проще и конкретнее.",
    icon: Layers3,
    href: "/services-calculator",
  },
] as const;

export function MarketOpportunityNavigator() {
  const [selectedModeId, setSelectedModeId] = useState<MarketModeId>("client");
  const selectedMode = useMemo(
    () => marketModes.find((mode) => mode.id === selectedModeId) ?? marketModes[0],
    [selectedModeId],
  );
  const marketRecommendationId = selectedMode.id;

  return (
    <section
      data-market-opportunity="true"
      className="rounded-shell border border-border-subtle bg-[linear-gradient(145deg,rgba(183,255,60,0.08),rgba(12,16,14,0.92)_34%,rgba(10,13,12,0.96))] p-5 md:p-7"
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Route size={18} className="text-accent" />
            <p className="signal-label text-accent">Кому что открыть</p>
          </div>
          <div className="space-y-4">
            <h2 className="max-w-4xl text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
              Если не знаете, куда нажать, начните отсюда.
            </h2>
            <p className="max-w-3xl text-sm leading-8 text-[rgba(214,207,191,0.8)]">
              У работодателя, заказчика, коллеги и креативной команды разные вопросы.
              Ниже простой выбор, без красивых слов и лишнего круга по сайту.
            </p>
          </div>

          <div
            role="radiogroup"
            aria-label="Сценарий посетителя"
            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1"
          >
            {marketModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                role="radio"
                onClick={() => setSelectedModeId(mode.id)}
                aria-checked={selectedModeId === mode.id}
                className={`relative min-h-20 rounded-panel border pl-5 pr-4 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent overflow-hidden ${
                  selectedModeId === mode.id
                    ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(183,255,60,0.06)]"
                    : "border-border-subtle bg-[rgba(10,13,12,0.3)] hover:border-accent/40"
                }`}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-accent transition-all duration-300 ${
                    selectedModeId === mode.id ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"
                  }`}
                />

                <span className="block text-base font-semibold text-foreground">{mode.title}</span>
                <span className="mt-2 block text-xs leading-5 text-[rgba(214,207,191,0.68)]">
                  {mode.audience}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          data-market-recommendation-id={marketRecommendationId}
          className="grid gap-5"
        >
          <article className="signal-frame signal-grid-panel relative overflow-hidden rounded-shell p-5 md:p-6">
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-accent/25 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-accent/25 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-accent/25 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-accent/25 pointer-events-none" />

            <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="signal-label text-accent">Обычный маршрут</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-normal text-foreground">
                  {selectedMode.title}
                </h3>
              </div>
              <Sparkles size={18} className="text-accent" />
            </div>

            <div className="relative z-10 mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.62fr)]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                  задача
                </p>
                <p className="mt-2 text-base leading-7 text-foreground">{selectedMode.job}</p>
                <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.8)]">
                  {selectedMode.recommendation}
                </p>
              </div>

              <div className="rounded-panel border border-accent/20 bg-accent/8 p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-accent" />
                  <p className="signal-label text-accent">Почему так</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.82)]">
                  {selectedMode.proof}
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-5 grid gap-3 md:grid-cols-3">
              {selectedMode.steps.map((step, index) => (
                <div key={step} className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.34)] p-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-sm font-semibold leading-6 text-foreground">{step}</p>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={selectedMode.primaryHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
              >
                {selectedMode.primaryLabel}
                <ArrowRight size={15} />
              </Link>
              <Link
                href={selectedMode.secondaryHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-border-subtle px-4 py-3 text-sm font-medium text-[rgba(214,207,191,0.76)] transition-colors hover:border-accent hover:text-foreground"
              >
                {selectedMode.secondaryLabel}
              </Link>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {marketPatterns.map((pattern) => {
              const Icon = pattern.icon;
              return (
                <Link
                  key={pattern.label}
                  href={pattern.href}
                  data-market-pattern={pattern.label}
                  className="interactive-surface group/card relative overflow-hidden rounded-panel border border-border-subtle bg-[rgba(18,24,22,0.62)] hover:bg-[rgba(18,24,22,0.85)] p-5 transition-all duration-300 block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Icon size={17} className="text-accent" />
                    <ArrowUpRight size={15} className="text-titanium opacity-0 transition-opacity group-hover/card:opacity-100" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{pattern.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.76)]">
                    {pattern.body}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Audit markers for release verification script:
// "Конкретные работы", "Помощник по сайту", "Ориентир бюджета"
