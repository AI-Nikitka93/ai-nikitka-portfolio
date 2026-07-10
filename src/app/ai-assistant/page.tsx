import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calculator,
  ChevronRight,
  Mail,
  MessageSquareText,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteAssistantPanel } from "@/components/site-assistant-panel";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "На связи",
  description:
    "ИИ-собеседник и цифровой клон Никиты Кизевича: ответит на вопросы, даст советы и ссылки или поможет связаться с автором.",
  path: "/ai-assistant",
});

const contactRoutes = [
  {
    label: "Telegram",
    href: "https://t.me/digital_ai_art",
    value: "короткий рабочий вопрос, быстрый диалог",
    icon: Radio,
  },
  {
    label: "Email",
    href: "mailto:nikitka9318@gmail.com?subject=AI_Nikitka93%20%2F%20assistant",
    value: "бриф, вложения, формальный запрос",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kizevichnik/",
    value: "HR, профессиональный контакт, профиль",
    icon: BriefcaseBusiness,
  },
] as const;

const fastPaths = [
  {
    label: "HR-проверка",
    value: "кто такой Никита, какие работы открыть первыми, где подтверждения",
    href: "/portfolio",
    icon: BriefcaseBusiness,
  },
  {
    label: "Новая задача",
    value: "тип проекта, ориентир бюджета в BYN, что написать в первом сообщении",
    href: "/services-calculator",
    icon: Calculator,
  },
  {
    label: "Навигация",
    value: "портфолио, блог, награды, профиль и быстрый переход к контактам",
    href: "/links",
    icon: Search,
  },
] as const;

const operatingRules = [
  "работает по открытым разделам сайта",
  "показывает материалы, которые уже есть",
  "для отдельного факта ведет к прямому контакту",
] as const;

export default function AiAssistantPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-10 px-4 pb-20 pt-28 sm:px-6 lg:px-10 lg:pt-32"
    >
      <ScrollReveal>
        <section className="grid gap-6 xl:grid-cols-[120px_minmax(0,0.92fr)_minmax(360px,1fr)] xl:items-start">
          <div className="border-b border-border-subtle pb-4 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">?</p>
            <p className="mt-4 font-mono text-6xl tracking-normal text-foreground sm:text-7xl">93</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
              помощь по сайту
            </p>
          </div>

          <div className="space-y-5">
            <p className="signal-label">На связи</p>
            <h1 className="max-w-4xl text-balance text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-tight text-foreground">
              Интерактивный ИИ-собеседник. Цифровой клон Никиты.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[rgba(214,207,191,0.82)] md:text-lg md:leading-9">
              Спросите обо всём: о его пути от электрика Минскводоканала к генерации видео, хакатонах, победах и работах. Бот ведет диалог как живой человек и сразу дает нужные контакты или ссылки.
            </p>
            <div className="flex flex-wrap gap-3">
              {["куда писать", "что открыть HR", "посчитать BYN", "найти дипломы"].map((item) => (
                <a
                  key={item}
                  href="#assistant-panel"
                  className="inline-flex min-h-11 items-center rounded-panel border border-border-subtle bg-[rgba(18,24,22,0.62)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-titanium transition-colors hover:border-accent hover:text-foreground"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="signal-frame signal-radial-accent rounded-shell p-5 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="signal-label text-accent">Куда писать</p>
              <MessageSquareText size={17} className="text-accent" />
            </div>
            <div className="mt-4 grid gap-3">
              {contactRoutes.map((route) => {
                const Icon = route.icon;
                return (
                  <a
                    key={route.label}
                    href={route.href}
                    target={route.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={route.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                    className="grid min-h-16 grid-cols-[36px_minmax(0,1fr)_18px] items-center gap-3 rounded-panel border border-border-subtle px-4 py-3 transition-colors hover:border-accent"
                  >
                    <Icon size={16} className="text-accent" />
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {route.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[rgba(214,207,191,0.66)]">
                        {route.value}
                      </span>
                    </span>
                    <ArrowRight size={15} className="text-titanium" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.04}>
        <SiteAssistantPanel />
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.88fr)]">
          <div className="signal-frame signal-grid-panel rounded-shell p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="signal-label text-accent">Быстрые вопросы</p>
                <h2 className="mt-4 max-w-3xl text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
                  Один ввод — один понятный следующий шаг.
                </h2>
              </div>
              <Sparkles size={18} className="text-accent" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {fastPaths.map((pathItem) => {
                const Icon = pathItem.icon;
                return (
                  <Link
                    key={pathItem.label}
                    href={pathItem.href}
                    className="interactive-surface rounded-panel border border-border-subtle p-4 transition-colors hover:border-accent"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Icon size={17} className="text-accent" />
                      <ChevronRight size={16} className="text-titanium" />
                    </div>
                    <p className="mt-5 text-lg font-semibold text-foreground">{pathItem.label}</p>
                    <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.76)]">
                      {pathItem.value}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="signal-frame signal-radial-accent rounded-shell p-6 md:p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="signal-label text-accent">Правила ответа</p>
              <ShieldCheck size={17} className="text-accent" />
            </div>
            <div className="mt-5 grid gap-3">
              {operatingRules.map((rule, index) => (
                <div
                  key={rule}
                  className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 border-b border-border-subtle pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-7 text-[rgba(214,207,191,0.82)]">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
