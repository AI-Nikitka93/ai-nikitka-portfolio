"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Calculator,
  CircuitBoard,
  Mail,
  PlugZap,
  Trophy,
} from "lucide-react";

type ProofAsset = {
  src: string;
  title: string;
  label: string;
  href: string;
};

type RouteId = "path" | "works" | "budget" | "contacts";

type RouteChoice = {
  id: RouteId;
  title: string;
  eyebrow: string;
  short: string;
  body: string;
  href: string;
  cta: string;
  icon: typeof PlugZap;
};

const routeChoices: readonly RouteChoice[] = [
  {
    id: "path",
    title: "Путь Никиты",
    eyebrow: "от проводов к нейросетям",
    short: "Как электрика, Минскводоканал и визуал привели к AI_Nikitka93.",
    body:
      "Хороший маршрут для тех, кто хочет понять человека, а не только список работ.",
    href: "/career-path",
    cta: "Открыть путь",
    icon: PlugZap,
  },
  {
    id: "works",
    title: "Работы и дипломы",
    eyebrow: "что уже можно открыть",
    short: "КИНОМАТИК, Helix, 35AWARDS и другие страницы с результатами.",
    body:
      "Здесь быстрее всего видно, где Никита участвовал, что получилось и какой документ лежит рядом.",
    href: "/portfolio",
    cta: "Смотреть работы",
    icon: Trophy,
  },
  {
    id: "budget",
    title: "Задача и бюджет",
    eyebrow: "если надо что-то сделать",
    short: "Ролик, изображения, сайт, бот или консультация без долгой переписки.",
    body:
      "Калькулятор помогает сразу написать задачу с понятным объемом, сроком и примерным бюджетом.",
    href: "/services-calculator",
    cta: "Прикинуть бюджет",
    icon: Calculator,
  },
  {
    id: "contacts",
    title: "Куда писать",
    eyebrow: "короткий путь к связи",
    short: "Telegram, email, LinkedIn и внешние профили в одном месте.",
    body:
      "Подходит, когда все уже понятно и нужно просто отправить задачу, вопрос или ссылку.",
    href: "/links",
    cta: "Открыть контакты",
    icon: Mail,
  },
] as const;

const pathSteps = [
  {
    period: "2009-2014",
    title: "Колледж и техника",
    text:
      "Электрооборудование, кинооборудование, аудиовизуальные системы, компьютеры и первые сайты.",
  },
  {
    period: "2014-2021",
    title: "УП «Минскводоканал»",
    text:
      "Семь лет работы электромонтером: оборудование, ответственность, 5-й разряд и IV группа допуска.",
  },
  {
    period: "2021-2025",
    title: "Учеба и разворот в цифру",
    text:
      "Курсы по web, дизайну, маркетингу, поддержке, AI и нейросетям. Много проб, много документов.",
  },
  {
    period: "2025-2026",
    title: "AI_Nikitka93",
    text:
      "Публичные работы, конкурсы, ролики, изображения, сайт, калькулятор и помощник по портфолио.",
  },
] as const;

const quickFacts = [
  "7 лет в УП «Минскводоканал»",
  "5-й разряд электромонтера",
  "работы с дипломами и ссылками",
] as const;

export function HomeRoutePicker({ proofAssets }: { proofAssets: readonly ProofAsset[] }) {
  const [selectedRouteId, setSelectedRouteId] = useState<RouteId>("path");
  const selectedRoute = useMemo(
    () => routeChoices.find((route) => route.id === selectedRouteId) ?? routeChoices[0],
    [selectedRouteId],
  );
  const SelectedIcon = selectedRoute.icon;

  return (
    <div className="grid min-h-full gap-4">
      <div className="rounded-shell border border-[rgba(152,207,227,0.24)] bg-[rgba(18,24,22,0.76)] p-4 md:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="signal-label text-accent">Быстрый старт</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal text-foreground md:text-3xl">
              Что открыть первым?
            </h2>
          </div>
          <BadgeCheck size={19} className="text-accent" />
        </div>
        <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
          Выберите маршрут. Сайт покажет, куда идти: к истории, работам, бюджету или
          контактам.
        </p>

        <div
          role="radiogroup"
          aria-label="Что открыть первым"
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          {routeChoices.map((route) => {
            const Icon = route.icon;
            const active = selectedRouteId === route.id;

            return (
              <button
                key={route.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelectedRouteId(route.id)}
                className={`min-h-28 rounded-panel border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                  active
                    ? "border-[rgba(152,207,227,0.72)] bg-[rgba(152,207,227,0.1)]"
                    : "border-border-subtle bg-[rgba(10,13,12,0.32)] hover:border-[rgba(152,207,227,0.48)]"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-base font-semibold text-foreground">{route.title}</span>
                  <Icon size={17} className={active ? "text-accent" : "text-titanium"} />
                </span>
                <span className="mt-2 block text-xs leading-5 text-[rgba(214,207,191,0.68)]">
                  {route.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <article
        data-home-route={selectedRoute.id}
        className="signal-frame signal-grid-panel rounded-shell p-5 md:p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="signal-label text-accent">{selectedRoute.eyebrow}</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-normal text-foreground">
              {selectedRoute.title}
            </h3>
          </div>
          <SelectedIcon size={20} className="text-accent" />
        </div>

        <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.82)]">
          {selectedRoute.body}
        </p>

        {selectedRoute.id === "path" ? (
          <div className="mt-5 grid gap-3">
            {pathSteps.map((step) => (
              <div
                key={step.period}
                className="grid gap-3 border-b border-border-subtle pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[86px_minmax(0,1fr)]"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {step.period}
                </p>
                <div>
                  <p className="text-sm font-semibold leading-6 text-foreground">{step.title}</p>
                  <p className="mt-1 text-xs leading-6 text-[rgba(214,207,191,0.72)]">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {selectedRoute.id === "works" ? (
          <div className="mt-5 grid gap-3">
            {proofAssets.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="grid min-h-20 grid-cols-[74px_minmax(0,1fr)] items-center gap-3 rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.32)] p-3 transition-colors hover:border-accent"
              >
                <span className="relative h-16 overflow-hidden rounded-[6px] border border-border-subtle bg-[rgba(214,207,191,0.88)]">
                  <Image
                    src={item.src}
                    alt={`${item.title}: превью`}
                    fill
                    sizes="74px"
                    className="object-contain p-1"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-titanium">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-6 text-foreground">
                    {item.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        ) : null}

        {selectedRoute.id === "budget" ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["что нужно", "какие материалы", "когда нужно"].map((item, index) => (
              <div
                key={item}
                className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.32)] p-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-sm font-semibold leading-6 text-foreground">{item}</p>
              </div>
            ))}
          </div>
        ) : null}

        {selectedRoute.id === "contacts" ? (
          <div className="mt-5 rounded-panel border border-[rgba(152,207,227,0.28)] bg-[rgba(152,207,227,0.08)] p-4">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness size={16} className="text-accent" />
              <p className="signal-label text-accent">Для первого сообщения</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.82)]">
              Напишите формат, срок, пару примеров и что уже есть на руках. Так разговор
              начинается сразу с дела.
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={selectedRoute.href}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(152,207,227,0.1)]"
          >
            {selectedRoute.cta}
            <ArrowRight size={15} />
          </Link>
          <div className="flex flex-wrap gap-2">
            {quickFacts.map((fact) => (
              <span
                key={fact}
                className="rounded-[6px] border border-border-subtle px-3 py-2 text-[11px] leading-5 text-[rgba(214,207,191,0.72)]"
              >
                {fact}
              </span>
            ))}
          </div>
        </div>
      </article>

      <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.32)] p-4">
        <div className="flex items-center gap-3">
          <CircuitBoard size={16} className="text-accent" />
          <p className="signal-label text-accent">Коротко</p>
        </div>
        <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
          Это портфолио без длинного вступления: сначала выбираете интерес, потом открываете
          работу, документ, бюджет или контакт.
        </p>
      </div>
    </div>
  );
}
