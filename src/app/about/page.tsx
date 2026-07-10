import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileCheck2, Radar, SquareArrowOutUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { buildMetadata } from "@/lib/seo";

const profileRows = [
  ["Имя", "Никита Кизевич"],
  ["Имя проекта", "AI_Nikitka93"],
  ["Город и год рождения", "Минск / 1993"],
  ["Основное направление", "видео с нейросетями, изображения, сайты и практичные цифровые проекты"],
] as const;

const foundationBlocks = [
  {
    label: "Техническая база",
    value:
      "Путь начался с техники: электрооборудование, компьютеры, сайты, графика и понимание, как все это работает руками.",
  },
  {
    label: "Образование",
    value:
      "По образованию Никита связан с электрооборудованием, кинооборудованием и аудиовизуальными системами. Есть путь от электромонтера до техника-электромеханика и 5-го разряда электромонтера.",
  },
  {
    label: "Визуальная практика",
    value:
      "Сначала была фотография и визуальные конкурсы, потом видео, а дальше инструменты с нейросетями. Это развитие одного интереса: сделать изображение или ролик так, чтобы его можно было показать.",
  },
] as const;

const timeline = [
  {
    period: "2005+",
    title: "Первые шаги в цифровой среде",
    note:
      "Информатика, программирование, создание сайтов, компьютерная графика и работа с компьютерами.",
  },
  {
    period: "2009–2014",
    title: "Электрика, оборудование и аудиовизуальная база",
    note:
      "Учеба по электрооборудованию, кинооборудованию и аудиовизуальным системам. Основа - техника, практика и работа с оборудованием.",
  },
  {
    period: "2013–2018",
    title: "Работа с визуальным материалом",
    note:
      "Фотографические конкурсы и заметная работа с изображением как с отдельным навыком.",
  },
  {
    period: "Сейчас",
    title: "AI_Nikitka93 как рабочий проект",
    note:
      "видео с нейросетями, изображения, сайты, небольшие инструменты, работы и открытые площадки, где все это можно посмотреть.",
  },
] as const;

const verificationRoutes = [
  {
    label: "Работы",
    href: "/portfolio",
    kind: "внутри сайта",
    note: "Главные работы, результаты и подтверждения собраны в одном месте.",
    external: false,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ai_nikitka93",
    kind: "внешняя площадка",
    note: "Здесь можно посмотреть видео и визуальные эксперименты на внешней площадке.",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kizevichnik/",
    kind: "деловой профиль",
    note: "Формальный профессиональный профиль для делового общения и быстрой проверки данных.",
    external: true,
  },
  {
    label: "Связи",
    href: "/links",
    kind: "контакты и ссылки",
    note: "Страница со ссылками и каналами, через которые можно перейти к проекту и автору.",
    external: false,
  },
] as const;

export const metadata: Metadata = buildMetadata({
  title: "Никита Кизевич",
  description:
    "Никита Кизевич — автор проекта AI_Nikitka93. Здесь коротко и понятно собраны основные факты, опыт и ссылки, по которым можно проверить работы.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="О себе"
      title="Никита Кизевич — автор проекта AI_Nikitka93."
      description="Здесь коротко и простыми словами: кто стоит за проектом, откуда взялся интерес к этой теме, чем подтверждается опыт и где можно посмотреть работы."
      actions={
        <>
          <Link
            href="/career-path"
            className="rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(183,255,60,0.08)]"
          >
            Интерактивный путь
          </Link>
          <Link
            href="/portfolio"
            className="rounded-panel border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-[rgba(183,255,60,0.06)]"
          >
            Открыть работы
          </Link>
          <Link
            href="/links"
            className="rounded-panel border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-[rgba(183,255,60,0.06)]"
          >
            Ссылки и контакты
          </Link>
        </>
      }
      aside={
        <div className="space-y-4">
          <div className="signal-frame signal-radial-accent rounded-panel p-5">
            <p className="signal-label text-accent">Коротко</p>
            <div className="mt-4 grid gap-3">
              {[
                ["Формат", "коротко и по делу"],
                ["Главное", "реальный автор проекта"],
                ["Зачем страница", "дать понятный контекст"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-panel border border-border-subtle px-4 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                    {label}
                  </p>
                  <p className="mt-3 font-mono text-lg tracking-normal text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="signal-frame interactive-surface rounded-panel p-5">
            <p className="signal-label">Зачем эта страница</p>
            <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.8)]">
              Страница дает понятное знакомство: кто делает проект, откуда взялся интерес к
              визуальным работам и где посмотреть результаты.
            </p>
          </div>
        </div>
      }
    >
      <ScrollReveal>
        <section className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="signal-frame rounded-shell p-6">
            <p className="signal-label">Кто стоит за проектом</p>
            <div className="mt-5 space-y-4">
              {profileRows.map(([key, value]) => (
                <div key={key} className="border-b border-border-subtle pb-4 last:border-b-0 last:pb-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-titanium">{key}</p>
                  <p className="mt-2 text-base leading-7 text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="signal-frame signal-grid-panel interactive-surface rounded-shell p-6 md:p-7">
            <p className="signal-label text-accent">Философия и инженерный подход</p>
            <h2 className="mt-4 text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
              За проектом стоит Никита Кизевич
            </h2>
            <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.82)]">
              Я не утверждаю, что создаю безупречные цифровые продукты. Моя философия проще: я ежедневно пытаюсь создавать, исследовать и фиксировать этот процесс. Мой рабочий день проходит за экраном ПК в непрерывных тестах когнитивных систем, графических моделей и генераторов звука.
            </p>
            <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.78)]">
              Моя база — это 7 лет практической работы с электрооборудованием до и выше 1000В. Эта суровая школа навсегда отучила меня от веры в «магию» или «идеальную работу с первого запуска». Системы всегда сбоят, а ИИ — галлюцинирует.
            </p>
            <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.78)]">
              С ноября 2022 года я целенаправленно изучаю эти сбои и ограничения. Через промпт-инжиниринг, вайб-кодинг и сотни итераций я собираю рабочие интерфейсы, побеждаю в конкурсах нейросетевого искусства (КИНОМАТИК, Helix, 35AWARDS) и доказываю, что для решения сложных задач важен не заученный синтаксис, а понимание логики работы системы. Дипломы или сертификаты здесь не так важны — ценны только реальный опыт, тернистый путь и непрерывная практика.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <section className="grid gap-5 xl:grid-cols-3">
          {foundationBlocks.map((block) => (
            <article key={block.label} className="signal-frame interactive-surface rounded-shell p-5">
              <p className="signal-label">{block.label}</p>
              <p className="mt-4 text-sm leading-7 text-[rgba(214,207,191,0.82)]">{block.value}</p>
            </article>
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <section className="signal-frame rounded-shell p-6 md:p-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <p className="signal-label">Ход формирования</p>
              <div className="mt-5 space-y-4">
                {timeline.map((item) => (
                  <div key={item.period} className="border-b border-border-subtle pb-4 last:border-b-0 last:pb-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                      {item.period}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-normal text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[rgba(214,207,191,0.8)]">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="signal-frame rounded-panel p-5 md:p-6">
              <div className="flex items-center gap-3">
                <FileCheck2 size={16} className="text-accent" />
                <p className="signal-label">Что можно посмотреть уже сейчас</p>
              </div>
              <div className="mt-5 grid gap-4">
                {[
                  "Страницы с работами, результатами и подтверждениями.",
                  "Публичные площадки: YouTube, LinkedIn, 35AWARDS и страница со ссылками.",
                  "Текущие направления: видео с нейросетями, изображения, сайты и работа с новыми инструментами.",
                ].map((item) => (
                  <div key={item} className="rounded-panel border border-border-subtle px-4 py-4">
                    <p className="text-sm leading-7 text-[rgba(214,207,191,0.8)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.14}>
        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.64fr)_minmax(0,1.36fr)]">
          <div className="signal-frame signal-radial-accent interactive-surface rounded-shell p-6">
            <div className="flex items-center gap-3">
              <Radar size={16} className="text-accent" />
              <p className="signal-label text-accent">Где посмотреть и проверить</p>
            </div>
            <h2 className="mt-4 text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
              Работы можно открыть сразу.
            </h2>
            <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.8)]">
              Ниже собраны самые полезные ссылки: работы, видео, деловой профиль и контакты.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {verificationRoutes.map((route) => {
              const content = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                        {route.kind}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-normal text-foreground">
                        {route.label}
                      </h3>
                    </div>
                    {route.external ? (
                      <SquareArrowOutUpRight size={18} className="text-titanium" />
                    ) : (
                      <ArrowUpRight size={18} className="text-titanium" />
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[rgba(214,207,191,0.82)]">{route.note}</p>
                </>
              );

              return route.external ? (
                <a
                  key={route.label}
                  href={route.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="signal-frame interactive-surface rounded-shell p-5"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={route.label}
                  href={route.href}
                  className="signal-frame interactive-surface rounded-shell p-5"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>
      </ScrollReveal>
    </PageShell>
  );
}
