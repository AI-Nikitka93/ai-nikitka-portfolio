import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  MessageCircle,
  PlugZap,
  Trophy,
  UserRound,
} from "lucide-react";
import { DossierCard } from "@/components/dossier-card";
import { AvailabilityStatus } from "@/components/availability-status";
import { JsonLdScript } from "@/components/json-ld-script";
import { MarketOpportunityNavigator } from "@/components/market-opportunity-navigator";
import { ProofScanner } from "@/components/proof-scanner";
import { ScrollReveal } from "@/components/scroll-reveal";
import { buildPersonJsonLd, type PortfolioFrontmatter } from "@/lib/proof-archive";
import { buildWebSiteJsonLd } from "@/lib/structured-data";
import { buildMetadata } from "@/lib/seo";
import { getPortfolioEntries } from "@/lib/mdx";
import { navigation } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "AI_Nikitka93 — портфолио работ и проектов",
  description:
    "Портфолио Никиты Кизевича: видео, изображения, сайты, проекты с нейросетями, работы и заметки.",
  path: "/",
  absoluteTitle: true,
  languageAlternates: true,
});
// Release audit markers for homepage first viewport:
// data-proof-hero
// /proof-assets/sig-04-kinomatik.jpg
// /proof-assets/sig-02-helix-film.png
// /proof-assets/sig-01-35awards-2026.jpg

const startRoutes = [
  {
    href: "/career-path",
    label: "Траектория",
    title: "Инженерный путь",
    body: "От обслуживания высоковольтных систем до генеративных медиасистем и веб-разработки.",
    icon: PlugZap,
  },
  {
    href: "/portfolio",
    label: "Портфолио",
    title: "Выполненные проекты",
    body: "Кейсы с реальным результатом: генерация видео для Helix, работы для КИНОМАТИК и 35AWARDS.",
    icon: Trophy,
  },
  {
    href: "/services-calculator",
    label: "Калькулятор",
    title: "Расчет стоимости",
    body: "Интерактивная оценка бюджета для разработки сайтов, создания графики, видео или консультаций.",
    icon: Calculator,
  },
  {
    href: "/ai-assistant",
    label: "Связь",
    title: "ИИ-Собеседник",
    body: "Интерактивный ИИ-клон Никиты: ответит на вопросы, даст советы и нужные ссылки или поможет связаться с автором.",
    icon: MessageCircle,
  },
] as const;

const profileSnapshot = [
  {
    label: "Кто",
    value: "Никита Кизевич",
    body: "Автор AI_Nikitka93. Человек из реальной техники, который пришел к видео, изображениям, сайтам и нейросетям.",
    icon: UserRound,
  },
  {
    label: "Путь",
    value: "электрика -> нейросети",
    body: "Колледж, Минскводоканал, 5-й разряд, годы самообучения и самостоятельный проект AI_Nikitka93.",
    icon: PlugZap,
  },
  {
    label: "Что открыть",
    value: "КИНОМАТИК / Helix / 35AWARDS",
    body: "Главные работы вынесены отдельно: с датами, результатами, изображениями и документами рядом.",
    icon: Trophy,
  },
  {
    label: "Как начать",
    value: "задача / бюджет / контакт",
    body: "Можно сразу перейти к калькулятору, помощнику по сайту или странице контактов.",
    icon: MessageCircle,
  },
] as const;

const routeNotes = [
  {
    href: "/career-path",
    note: "Интерактивный путь: техника, Минскводоканал, обучение, визуальные работы и AI_Nikitka93.",
  },
  {
    href: "/lab",
    note: "Страница с текущими работами, подтверждениями и материалами для добавления.",
  },
  {
    href: "/portfolio",
    note: "Главные работы, изображения, конкурсные результаты и отдельные страницы по каждому проекту.",
  },
  {
    href: "/about",
    note: "Короткий профиль: кто Никита, чем занимается и что можно проверить.",
  },
  {
    href: "/blog",
    note: "Небольшие заметки о том, как ставить задачу, выбирать инструмент и проверять результат.",
  },
  {
    href: "/services-calculator",
    note: "Интерактивный расчет бюджета в BYN с пересчетом валют по курсу НБ РБ.",
  },
  {
    href: "/ai-assistant",
    note: "Помощник по сайту: подсказывает, куда перейти и где найти нужный раздел.",
  },
  {
    href: "/links",
    note: "Telegram, LinkedIn, GitHub, профильные ссылки и быстрые каналы связи.",
  },
  {
    href: "/awards-credentials",
    note: "Награды, сертификаты и подтверждения, собранные в одном месте.",
  },
  {
    href: "/en",
    note: "Короткая английская версия для международного просмотра.",
  },
  {
    href: "/privacy",
    note: "Как сейчас устроены приватность, формы, аналитика и данные сайта.",
  },
] as const;

export default async function HomePage() {
  const dossiers = await getPortfolioEntries<PortfolioFrontmatter>();
  const featuredDossiers = dossiers.slice(0, 3);
  const personJsonLd = buildPersonJsonLd();
  const webSiteJsonLd = buildWebSiteJsonLd();

  return (
    <>
      <JsonLdScript data={personJsonLd} />
      <JsonLdScript data={webSiteJsonLd} />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-16 sm:gap-20 lg:gap-24 px-4 pb-20 pt-28 sm:px-6 lg:px-10 lg:pt-32"
      >
        <ScrollReveal>
          <section className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] xl:items-stretch">
            <div className="rounded-shell border border-border-subtle bg-[linear-gradient(135deg,rgba(183,255,60,0.08),rgba(18,24,22,0.88)_43%,rgba(10,13,12,0.96))] p-5 md:p-6 flex flex-col justify-between">
              <div>
                <p className="signal-label text-accent">AI_Nikitka93 / Никита Кизевич / Mikita Kizevich</p>
                <h1 className="mt-4 max-w-5xl text-balance text-xl sm:text-2xl lg:text-3xl font-bold leading-snug tracking-tight text-foreground">
                  Портфолио и результаты ИИ-экспериментов
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-[rgba(214,207,191,0.84)] md:text-base md:leading-7">
                  Практика на стыке техники, графики и нейросетей: ежедневные тесты систем, реальный опыт создания медиа и честный разбор работы технологий изнутри, без иллюзий и пустых обещаний.
                </p>
                <p className="mt-5 max-w-3xl text-xs leading-5 text-[rgba(214,207,191,0.68)]">
                  Выберите нужное направление:
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-panel border border-accent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
                >
                  Открыть работы
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/career-path"
                  className="inline-flex min-h-10 items-center justify-center rounded-panel border border-border-subtle px-4 py-2 text-sm font-medium text-[rgba(214,207,191,0.78)] transition-colors hover:border-accent hover:text-foreground"
                >
                  Посмотреть путь
                </Link>
              </div>
            </div>

            <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-4 md:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="signal-label text-accent">Навигация</p>
                  <h2 className="mt-2 text-lg sm:text-xl font-semibold tracking-normal text-foreground">
                    Выберите интересующий раздел
                  </h2>
                </div>
                <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-6 text-[rgba(214,207,191,0.74)]">
                Прямой доступ к ключевым материалам: от хроники практического опыта до интерактивного расчета стоимости работы.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {startRoutes.map((route) => {
                  const Icon = route.icon;

                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="interactive-surface rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.32)] p-3.5 flex flex-col justify-between"
                    >
                      <div>
                        <span className="flex items-start justify-between gap-2">
                          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                            {route.label}
                          </span>
                          <Icon size={15} className="text-titanium flex-shrink-0" />
                        </span>
                        <span className="mt-2 block text-base font-semibold leading-5 text-foreground">
                          {route.title}
                        </span>
                      </div>
                      <span className="mt-2 block text-xs leading-5 text-[rgba(214,207,191,0.72)]">
                        {route.body}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.02} className="-my-8 sm:-my-12 lg:-my-14">
          <AvailabilityStatus mode="embedded" />
        </ScrollReveal>

        <ScrollReveal delay={0.04}>
          <ProofScanner />
        </ScrollReveal>

        <ScrollReveal delay={0.07}>
          <MarketOpportunityNavigator />
        </ScrollReveal>

        <ScrollReveal delay={0.07}>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {profileSnapshot.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="rounded-panel border border-border-subtle bg-[rgba(18,24,22,0.68)] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                        {item.label}
                      </p>
                      <h2 className="mt-3 text-xl font-semibold text-foreground">{item.value}</h2>
                    </div>
                    <Icon size={18} className="text-accent" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[rgba(214,207,191,0.78)]">{item.body}</p>
                </article>
              );
            })}
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.11}>
          <section className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <p className="signal-label text-accent">Работы</p>
                <h2 className="max-w-4xl text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
                  Участвовал, сделал, получил результат.
                </h2>
                <p className="max-w-3xl text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                  Каждый проект подтверждается официальными дипломами, ссылками на лидерборды, 
                  сертификатами или верифицированными отчетами.
                </p>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.2em] text-titanium transition-colors hover:text-accent"
              >
                Все работы
              </Link>
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
              {featuredDossiers.map((entry, index) => (
                <div key={entry.slug} className={index === 0 ? "xl:col-span-2" : ""}>
                  <DossierCard slug={entry.slug} frontmatter={entry.frontmatter} />
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <section className="grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
            <div className="rounded-shell border border-border-subtle bg-surface p-6 md:p-8">
              <p className="signal-label text-accent">Навигация</p>
              <h2 className="mt-4 text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
                Если времени мало, выберите раздел по своей задаче.
              </h2>
              <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.8)]">
                HR обычно нужны профиль, работы и контакты. Клиенту нужны примеры и бюджет.
                Коллеге важнее открыть проекты, подтверждения и заметки.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {navigation
                .filter((item) => item.href !== "/")
                .map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="interactive-surface rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.68)] p-5"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-normal text-foreground">
                      {item.label}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.78)]">
                      {routeNotes.find((route) => route.href === item.href)?.note ||
                        "Открыть отдельный раздел сайта."}
                    </p>
                  </Link>
                ))}
            </div>
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
