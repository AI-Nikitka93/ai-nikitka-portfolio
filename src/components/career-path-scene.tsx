"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  GraduationCap,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type CareerStep = {
  id: string;
  period: string;
  title: string;
  shortTitle: string;
  body: string;
  facts: readonly string[];
  check: readonly string[];
  href: string;
  cta: string;
  x: number;
  y: number;
  icon: LucideIcon;
};

const careerPathSteps: readonly CareerStep[] = [
  {
    id: "college",
    period: "2009-2014",
    title: "Техническая база",
    shortTitle: "Колледж",
    body:
      "Сначала были не нейросети, а нормальная техника: электрооборудование, кинооборудование, компьютеры, графика, сайты и понимание, как все это работает руками.",
    facts: [
      "электрооборудование",
      "аудиовизуальные системы",
      "первые сайты и графика",
    ],
    check: ["образование", "специальность", "техническая база"],
    href: "/about",
    cta: "Открыть профиль",
    x: 12,
    y: 76,
    icon: GraduationCap,
  },
  {
    id: "vodokanal",
    period: "2014-2021",
    title: "7 лет в УП «Минскводоканал»",
    shortTitle: "Минскводоканал",
    body:
      "Это не красивая легенда для сайта: был реальный участок жизни с оборудованием, сменами, ответственностью, 5-м разрядом электромонтера и IV группой допуска.",
    facts: [
      "7 лет стажа",
      "электромонтер",
      "5-й разряд и IV группа допуска",
    ],
    check: ["период работы", "разряд", "допуск"],
    href: "/about",
    cta: "Посмотреть контекст",
    x: 29,
    y: 52,
    icon: Building2,
  },
  {
    id: "learning",
    period: "2021-2025",
    title: "Разворот в цифру",
    shortTitle: "Учеба",
    body:
      "После техники пошли курсы и практика: web, дизайн, маркетинг, поддержка, нейросети. Не один волшебный курс, а длинная попытка собрать новую профессию из разных кусочков.",
    facts: [
      "web и дизайн",
      "маркетинг и поддержка",
      "AI и нейросети",
    ],
    check: ["сертификаты", "темы обучения", "направления"],
    href: "/awards-credentials",
    cta: "Открыть документы",
    x: 45,
    y: 31,
    icon: BadgeCheck,
  },
  {
    id: "visual",
    period: "2024-2025",
    title: "Визуальные работы",
    shortTitle: "Визуал",
    body:
      "Здесь уже начинается то, что можно показать глазами: изображения, ролики, конкурсные подачи, первые понятные результаты и материалы для портфолио.",
    facts: [
      "изображения",
      "ролики",
      "конкурсные подачи",
    ],
    check: ["работы", "превью", "результаты"],
    href: "/portfolio",
    cta: "Смотреть работы",
    x: 61,
    y: 48,
    icon: Camera,
  },
  {
    id: "awards",
    period: "2025-2026",
    title: "Конкурсы и дипломы",
    shortTitle: "Дипломы",
    body:
      "КИНОМАТИК, Helix, 35AWARDS и другие материалы вынесены в отдельные страницы: там видно событие, результат и чем это подтверждается.",
    facts: [
      "КИНОМАТИК",
      "Helix",
      "35AWARDS",
    ],
    check: ["событие", "результат", "документ или ссылка"],
    href: "/portfolio",
    cta: "Открыть портфолио",
    x: 76,
    y: 29,
    icon: Trophy,
  },
  {
    id: "now",
    period: "Сейчас",
    title: "AI_Nikitka93 как рабочий проект",
    shortTitle: "Сейчас",
    body:
      "Теперь это не одна страница с кучей слов, а понятная система: путь отдельно, работы отдельно, бюджет отдельно, контакты отдельно.",
    facts: [
      "портфолио",
      "калькулятор",
      "помощник по сайту",
    ],
    check: ["разделы сайта", "ссылки", "следующий шаг"],
    href: "/links",
    cta: "Написать Никите",
    x: 88,
    y: 62,
    icon: Sparkles,
  },
] as const;

export function CareerPathScene() {
  const [activeStepId, setActiveStepId] = useState(careerPathSteps[1].id);
  const activeStep = useMemo(
    () => careerPathSteps.find((step) => step.id === activeStepId) ?? careerPathSteps[0],
    [activeStepId],
  );
  const activeIndex = Math.max(
    careerPathSteps.findIndex((step) => step.id === activeStep.id),
    0,
  );
  const railProgress = ((activeIndex + 1) / careerPathSteps.length) * 100;
  const ActiveIcon = activeStep.icon;

  function handleNodeKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? careerPathSteps.length - 1
          : event.key === "ArrowRight" || event.key === "ArrowDown"
            ? (index + 1) % careerPathSteps.length
            : (index - 1 + careerPathSteps.length) % careerPathSteps.length;

    setActiveStepId(careerPathSteps[nextIndex].id);
  }

  return (
    <section
      data-career-path-scene="true"
      data-career-active-id={activeStep.id}
      className="grid gap-5 xl:grid-cols-[minmax(0,1.18fr)_minmax(340px,0.82fr)]"
    >
      <div className="signal-frame signal-grid-panel rounded-shell p-4 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="signal-label text-accent">Интерактивный путь</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal text-foreground md:text-3xl">
              Нажмите на точку и посмотрите этап.
            </h2>
          </div>
          <div className="rounded-panel border border-border-subtle px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
              {activeStep.period}
            </p>
          </div>
        </div>

        <div
          role="radiogroup"
          aria-label="Путь Никиты по этапам"
          className="relative mt-5 min-h-[430px] overflow-hidden rounded-shell border border-border-subtle bg-[radial-gradient(circle_at_30%_18%,rgba(183,255,60,0.12),transparent_34%),linear-gradient(180deg,rgba(10,13,12,0.4),rgba(10,13,12,0.86))] md:min-h-[540px] hidden md:block"
          style={{ perspective: "1200px" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-8 bottom-12 top-10 rounded-[10px] border border-accent/15 bg-[linear-gradient(rgba(142,150,140,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(142,150,140,0.1)_1px,transparent_1px)] bg-[length:36px_36px] opacity-80"
            style={{
              transform: "rotateX(58deg) rotateZ(-12deg) translateY(20px)",
              transformOrigin: "50% 78%",
            }}
          >
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={careerPathSteps.map((step) => `${step.x},${step.y}`).join(" ")}
                fill="none"
                stroke="rgba(183,255,60,0.34)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-5 left-5 right-5 h-2 rounded-full border border-border-subtle bg-[rgba(18,24,22,0.86)]"
          >
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-ember))]"
              style={{ width: `${railProgress}%` }}
            />
          </div>

          {careerPathSteps.map((step, index) => {
            const Icon = step.icon;
            const active = step.id === activeStep.id;

            return (
              <div
                key={step.id}
                className="absolute"
                style={{ left: `${step.x}%`, top: `${step.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={active}
                  data-career-node={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  onKeyDown={(event) => handleNodeKeyDown(event, index)}
                  onMouseEnter={() => setActiveStepId(step.id)}
                  className={`group relative flex h-16 w-16 items-center justify-center rounded-full border transition duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent md:h-20 md:w-20 ${
                    active
                      ? "scale-105 border-accent bg-accent/15 text-foreground shadow-[0_0_38px_rgba(183,255,60,0.22)]"
                      : "border-border-subtle bg-[rgba(18,24,22,0.86)] text-titanium hover:border-accent hover:text-foreground"
                  }`}
                >
                  <span className="absolute -top-7 rounded-[6px] border border-border-subtle bg-[rgba(10,13,12,0.9)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-titanium">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon size={active ? 26 : 22} aria-hidden="true" />
                  <span className="sr-only">
                    {step.period}: {step.title}
                  </span>
                </button>
                <div
                  className={`mt-2 hidden min-w-28 rounded-[6px] border px-3 py-2 text-center text-xs font-semibold leading-5 md:block ${
                    active
                      ? "border-accent bg-accent/8 text-foreground"
                      : "border-border-subtle bg-[rgba(10,13,12,0.72)] text-[rgba(214,207,191,0.72)]"
                  }`}
                >
                  {step.shortTitle}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile alternative: clean 2-column grid of buttons */}
        <div 
          role="radiogroup"
          aria-label="Выбор этапа пути"
          className="mt-5 grid grid-cols-2 gap-2 md:hidden"
        >
          {careerPathSteps.map((step, index) => {
            const Icon = step.icon;
            const active = step.id === activeStep.id;

            return (
              <button
                key={step.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setActiveStepId(step.id)}
                className={`flex min-h-12 items-center gap-2.5 rounded-panel border px-3 py-2 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                  active
                    ? "border-accent bg-accent/10 text-foreground shadow-[0_0_12px_rgba(183,255,60,0.1)]"
                    : "border-border-subtle bg-[rgba(18,24,22,0.8)] text-titanium hover:border-accent hover:text-foreground"
                }`}
              >
                <Icon size={14} className={active ? "text-accent" : "text-titanium"} />
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[8px] uppercase tracking-wider text-titanium leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-xs font-semibold truncate leading-none">
                    {step.shortTitle}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <article className="signal-frame rounded-shell p-5 md:p-6" data-career-detail={activeStep.id}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="signal-label text-accent">{activeStep.period}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground">
              {activeStep.title}
            </h2>
          </div>
          <ActiveIcon size={22} className="text-accent" />
        </div>

        <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.82)]">
          {activeStep.body}
        </p>

        <div className="mt-5 grid gap-4">
          <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.28)] p-4">
            <p className="signal-label">Что видно на этом этапе</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activeStep.facts.map((fact) => (
                <span
                  key={fact}
                  className="rounded-[6px] border border-border-subtle px-3 py-2 text-xs leading-5 text-[rgba(214,207,191,0.78)]"
                >
                  {fact}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-panel border border-accent/24 bg-accent/8 p-4">
            <p className="signal-label text-accent">Что можно проверить</p>
            <div className="mt-3 grid gap-2">
              {activeStep.check.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm leading-6 text-[rgba(214,207,191,0.82)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link
          href={activeStep.href}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
        >
          {activeStep.cta}
          <ArrowRight size={15} />
        </Link>
      </article>
    </section>
  );
}
