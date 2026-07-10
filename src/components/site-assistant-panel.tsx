"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Mail,
  Radio,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
} from "lucide-react";
import { assistantSourceCards } from "@/lib/proof-lab";

type AssistantSourceCard = (typeof assistantSourceCards)[number];

type AssistantAnswer = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  routeLabel: string;
  href: string;
  cta: string;
  steps: string[];
  handoff: string;
  sourceCards: AssistantSourceCard["id"][];
};

const answerCards: AssistantAnswer[] = [
  {
    id: "portfolio",
    title: "Куда перейти: главные работы",
    keywords: ["работ", "кейс", "портфолио", "видео", "визуал", "35awards", "helix", "киноматик"],
    answer:
      "Начните с портфолио. Для быстрого просмотра лучше открыть три работы: КИНОМАТИК, LabStory / Helix и 35AWARDS. Там есть изображения, даты, площадки и понятная подача по делу.",
    routeLabel: "работы / подтверждения",
    href: "/portfolio",
    cta: "Открыть работы",
    steps: ["Открыть портфолио", "Посмотреть 3 сильные работы", "Перейти к контактам или бюджету"],
    handoff: "Если нужно обсудить похожую работу, лучше писать в Telegram или email с референсом и сроком.",
    sourceCards: ["portfolio-proof", "flagship-cases", "contact-handoff"],
  },
  {
    id: "services",
    title: "Куда перейти: задача и бюджет",
    keywords: ["услуг", "цена", "стоимость", "проект", "заказать", "бриф", "калькулятор", "бюджет"],
    answer:
      "Для новой задачи идите в калькулятор. Он считает ориентир в BYN, показывает USD/EUR/RUB/PLN по курсу НБ РБ и собирает короткий бриф. Это нормальная точка входа перед обсуждением деталей.",
    routeLabel: "бюджет / BYN",
    href: "/services-calculator",
    cta: "Посчитать бюджет",
    steps: ["Выбрать тип задачи", "Указать материалы и срок", "Отправить бриф с диапазоном"],
    handoff: "После расчета пишите напрямую: что нужно сделать, какой дедлайн и какие материалы уже есть.",
    sourceCards: ["pricing-scope", "contact-handoff", "portfolio-proof"],
  },
  {
    id: "about",
    title: "Куда перейти: кто такой AI_Nikitka93",
    keywords: ["кто", "никита", "автор", "биография", "опыт", "ai_nikitka93", "hr"],
    answer:
      "AI_Nikitka93 — публичное имя проекта Никиты Кизевича. Для HR достаточно открыть страницу о себе, затем работы и награды. Там видно путь от технической базы и электротехники к видео, изображениям, сайтам и конкурсным результатам.",
    routeLabel: "профиль / HR",
    href: "/about",
    cta: "Открыть профиль",
    steps: ["Открыть профиль", "Проверить работы", "Сохранить контакты"],
    handoff: "Для формального контакта лучше LinkedIn или email; для быстрого диалога — Telegram.",
    sourceCards: ["portfolio-proof", "flagship-cases", "contact-handoff"],
  },
  {
    id: "proof",
    title: "Куда перейти: подтверждения",
    keywords: ["награ", "диплом", "сертификат", "подтверж", "proof", "award", "провер"],
    answer:
      "Подтверждения разделены на главные работы и отдельную страницу наград. Если нужно быстро проверить факты, начинайте с портфолио: там главные результаты идут отдельно от длинного списка сертификатов.",
    routeLabel: "награды / проверка",
    href: "/awards-credentials",
    cta: "Открыть подтверждения",
    steps: ["Открыть страницу наград", "Сверить сильные работы", "Перейти к внешним профилям"],
    handoff: "Если нужен конкретный документ или ссылка, пишите email: так проще приложить контекст.",
    sourceCards: ["portfolio-proof", "flagship-cases", "contact-handoff"],
  },
  {
    id: "contacts",
    title: "Куда писать",
    keywords: ["контакт", "email", "почта", "telegram", "linkedin", "связ", "писать", "написать"],
    answer:
      "Если вопрос рабочий и короткий — Telegram. Если нужен аккуратный бриф, вложения или формальный запрос — email. Если вы HR или смотрите профиль как работодатель, LinkedIn будет самым деловым входом.",
    routeLabel: "контакты",
    href: "/links",
    cta: "Открыть все контакты",
    steps: ["Выбрать канал", "Коротко описать задачу", "Приложить срок и референсы"],
    handoff: "Самый понятный вход: цель, срок, формат результата, ссылки на референсы и бюджетный диапазон, если он уже посчитан.",
    sourceCards: ["contact-handoff", "pricing-scope", "portfolio-proof"],
  },
];

const fallbackAnswer: AssistantAnswer = {
  id: "fallback",
  title: "Уточнить вопрос",
  keywords: [],
  answer:
    "Я веду по этому сайту: работы, профиль, награды, услуги, бюджет и контакты. Для отдельного факта или документа лучше открыть контакты и написать напрямую.",
  routeLabel: "только по сайту",
  href: "/links",
  cta: "Открыть контакты",
  steps: ["Уточнить тему", "Проверить нужный раздел", "Написать напрямую"],
  handoff: "Для отдельного вопроса пишите напрямую и добавьте контекст к одному предложению.",
  sourceCards: ["contact-handoff", "portfolio-proof"],
};

const starterPrompts = [
  "Куда писать по новой задаче?",
  "Какие три работы посмотреть сначала?",
  "Как посчитать бюджет в BYN?",
  "Я HR. Что открыть первым?",
  "Где подтверждения наград?",
  "Кто такой AI_Nikitka93?",
] as const;

const contactActions = [
  {
    label: "Telegram",
    href: "https://t.me/digital_ai_art",
    note: "быстрый диалог, короткий рабочий вопрос",
    icon: Radio,
  },
  {
    label: "Email",
    href: "mailto:nikitka9318@gmail.com?subject=AI_Nikitka93%20%2F%20assistant%20handoff",
    note: "бриф, вложения, формальный запрос",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kizevichnik/",
    note: "HR, профессиональный контакт, профиль",
    icon: BriefcaseBusiness,
  },
] as const;

const matrixGlyphs = ["SYSTEM.READY", "ROUTING.ACTIVE", "PROOF.SECURE", "LOC.BYN", "CONTEXT.VERIFIED"];

function findAnswer(query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return answerCards[0];
  }

  return (
    answerCards.find((card) =>
      card.keywords.some((keyword) => normalized.includes(keyword.toLowerCase())),
    ) ?? fallbackAnswer
  );
}

export function SiteAssistantPanel() {
  const [query, setQuery] = useState("Куда писать по новой задаче?");
  const [submittedQuery, setSubmittedQuery] = useState(query);
  const [matrixAnswerText, setMatrixAnswerText] = useState("");
  const [announcedAnswerText, setAnnouncedAnswerText] = useState("");
  const answer = useMemo(() => findAnswer(submittedQuery), [submittedQuery]);
  const sourceCards = useMemo(
    () =>
      answer.sourceCards
        .map((sourceId) => assistantSourceCards.find((source) => source.id === sourceId))
        .filter((source): source is AssistantSourceCard => Boolean(source)),
    [answer],
  );

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const instantText = window.setTimeout(() => {
        setMatrixAnswerText(answer.answer);
        setAnnouncedAnswerText(answer.answer);
      }, 0);
      return () => window.clearTimeout(instantText);
    }

    const startedAt = performance.now();
    const duration = Math.min(1800, Math.max(820, answer.answer.length * 7));
    let animationFrame = 0;
    const completionFallback = window.setTimeout(
      () => {
        setMatrixAnswerText(answer.answer);
        setAnnouncedAnswerText(answer.answer);
      },
      duration + 240,
    );

    function tick(now: number) {
      const progress = Math.min(1, (now - startedAt) / duration);
      const nextLength = Math.ceil(answer.answer.length * progress);
      setMatrixAnswerText(answer.answer.slice(0, nextLength));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      } else {
        setAnnouncedAnswerText(answer.answer);
      }
    }

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(completionFallback);
    };
  }, [answer.answer, submittedQuery]);

  function submit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const nextQuery = query.trim() || "Куда писать по новой задаче?";
    setQuery(nextQuery);
    setMatrixAnswerText("");
    setAnnouncedAnswerText("");
    setSubmittedQuery(nextQuery);
  }

  function selectPrompt(prompt: string) {
    setQuery(prompt);
    setMatrixAnswerText("");
    setAnnouncedAnswerText("");
    setSubmittedQuery(prompt);
  }

  return (
    <section
      id="assistant-panel"
      className="scroll-mt-28 rounded-shell border border-[rgba(152,207,227,0.24)] bg-[linear-gradient(145deg,rgba(152,207,227,0.12),rgba(18,24,22,0.84)_36%,rgba(10,13,12,0.96))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.32)] md:p-6"
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.88fr)_minmax(360px,1.12fr)]">
        <div className="rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.44)] p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <SquareTerminal size={18} className="text-accent" />
                <p className="signal-label text-accent">Помощник по сайту</p>
              </div>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-foreground md:text-4xl">
                Спросите как человек. Помощник подскажет, куда перейти.
              </h2>
            </div>
            <span className="rounded-panel border border-[rgba(152,207,227,0.32)] bg-[rgba(152,207,227,0.08)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              только сайт
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[rgba(214,207,191,0.8)]">
            Это навигационный помощник по публичным материалам сайта: профиль, работы, награды,
            бюджет и контакты.
          </p>

          <form onSubmit={submit} className="mt-6 grid gap-3">
            <label className="signal-label" htmlFor="assistant-query">
              Вопрос
            </label>
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-titanium"
                />
                <input
                  id="assistant-query"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="min-h-12 w-full rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.58)] py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-[rgba(214,207,191,0.45)] focus:border-accent"
                  placeholder="Например: куда писать по новой задаче?"
                />
              </div>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-panel border border-accent px-5 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(152,207,227,0.1)]"
              >
                <Send size={15} />
                Показать куда идти
              </button>
            </div>
          </form>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => selectPrompt(prompt)}
                aria-pressed={submittedQuery === prompt}
                className={`min-h-11 rounded-panel border px-4 py-3 text-left text-sm leading-6 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                  submittedQuery === prompt
                    ? "border-[rgba(152,207,227,0.7)] bg-[rgba(152,207,227,0.1)] text-foreground"
                    : "border-border-subtle text-[rgba(214,207,191,0.78)] hover:border-accent hover:text-foreground"
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-panel border border-border-subtle bg-[rgba(18,24,22,0.48)] p-4">
            <p className="signal-label text-accent">Куда писать</p>
            <div className="mt-3 grid gap-3">
              {contactActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={action.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={action.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                    className="grid min-h-16 grid-cols-[38px_minmax(0,1fr)_18px] items-center gap-3 rounded-panel border border-border-subtle px-3 py-3 transition-colors hover:border-accent"
                  >
                    <Icon size={17} className="text-accent" />
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {action.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[rgba(214,207,191,0.66)]">
                        {action.note}
                      </span>
                    </span>
                    <ArrowRight size={15} className="text-titanium" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="matrix-answer-panel rounded-panel border border-[rgba(152,207,227,0.32)] bg-[rgba(10,13,12,0.72)] p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <ShieldCheck size={17} className="text-accent" />
              <p className="signal-label text-accent">Ответ помощника</p>
            </div>
            <span className="rounded-panel border border-border-subtle px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-titanium">
              {answer.routeLabel}
            </span>
          </div>

          <div className="mt-5 grid gap-3 rounded-panel border border-border-subtle bg-[rgba(18,24,22,0.54)] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
              ваш вопрос
            </p>
            <p className="text-sm leading-7 text-foreground">{submittedQuery}</p>
          </div>

          <div className="mt-4 overflow-hidden rounded-panel border border-accent/20 bg-[rgba(4,8,7,0.72)] p-4">
            <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-3">
              <h3 className="text-2xl font-semibold text-foreground">{answer.title}</h3>
              <Sparkles size={17} className="text-accent" />
            </div>

            <div className="matrix-stream mt-4" aria-hidden="true">
              {matrixGlyphs.map((glyph, index) => (
                <span key={`${glyph}-${index}`}>{glyph}</span>
              ))}
            </div>

            <p
              className="matrix-answer-text mt-4 min-h-40 text-sm leading-8 text-[rgba(214,207,191,0.86)]"
              aria-hidden="true"
            >
              {matrixAnswerText}
              <span className="matrix-caret" aria-hidden="true" />
            </p>
            <p className="sr-only" aria-live="polite">
              {announcedAnswerText}
            </p>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {answer.steps.map((step, index) => (
              <div key={step} className="rounded-panel border border-border-subtle bg-[rgba(18,24,22,0.48)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <CheckCircle2 size={15} className="text-accent" />
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-panel border border-border-subtle bg-accent/8 p-4">
            <p className="signal-label text-accent">Что написать дальше</p>
            <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.82)]">{answer.handoff}</p>
          </div>

          <div className="mt-4 rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.32)] p-4">
            <p className="signal-label text-accent">Откуда взят ответ</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {sourceCards.map((source) => (
                <Link
                  key={source.id}
                  href={source.href}
                  data-assistant-source-card={source.id}
                  className="rounded-panel border border-border-subtle px-4 py-4 transition-colors hover:border-accent focus-visible:border-accent focus-visible:outline-none"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                    {source.label}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-foreground">
                    {source.title}
                  </span>
                  <span className="mt-2 block text-xs leading-6 text-[rgba(214,207,191,0.66)]">
                    {source.note}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href={answer.href}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              {answer.cta}
              <ArrowRight size={15} />
            </Link>
            <a
              href="https://t.me/digital_ai_art"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-border-subtle px-4 py-3 text-sm font-medium text-[rgba(214,207,191,0.76)] transition-colors hover:border-accent hover:text-foreground"
            >
              Написать в Telegram
              <ArrowRight size={15} />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
