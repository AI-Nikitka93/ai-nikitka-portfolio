import type { Metadata } from "next";
import { ArrowUpRight, Mail, Radio, Send, Video, BriefcaseBusiness } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Контакты",
  description:
    "Публичные профили, ссылки и контактные каналы AI_Nikitka93.",
  path: "/links",
});

const linkNodes = [
  {
    id: "01",
    label: "Telegram",
    kind: "Telegram-канал",
    href: "https://t.me/digital_ai_art",
    note: "Основной канал с текущими публикациями, наблюдениями и ссылками вокруг нейросетей, рынка и цифровой среды.",
    icon: Radio,
    size: "wide",
  },
  {
    id: "02",
    label: "LinkedIn",
    kind: "деловой профиль",
    href: "https://www.linkedin.com/in/kizevichnik/",
    note: "Профиль для делового контакта: биография, опыт и связь.",
    icon: BriefcaseBusiness,
    size: "compact",
  },
  {
    id: "03",
    label: "YouTube",
    kind: "видео",
    href: "https://www.youtube.com/@ai_nikitka93",
    note: "Внешняя площадка с роликами, визуальными работами и экспериментами.",
    icon: Video,
    size: "compact",
  },
  {
    id: "04",
    label: "35AWARDS",
    kind: "проверка работ",
    href: "https://35awards.com/10th/author/nikita650/",
    note: "Внешняя площадка, где можно проверить часть визуальных работ.",
    icon: ArrowUpRight,
    size: "wide",
  },
  {
    id: "05",
    label: "Email",
    kind: "прямая линия",
    href: "mailto:nikitka9318@gmail.com",
    note: "Канал для задач, файлов, брифов и конкретных предложений.",
    icon: Mail,
    size: "wide",
  },
  {
    id: "06",
    label: "Яндекс Музыка",
    kind: "музыкальные релизы",
    href: "https://music.yandex.ru/artist/25239184",
    note: "Официальный профиль артиста. Пример упаковки и дистрибуции генеративной музыки на стримингах.",
    icon: Radio,
    size: "compact",
  },
  {
    id: "07",
    label: "Spotify",
    kind: "музыкальные релизы",
    href: "https://open.spotify.com/artist/3fYjimtlZBBtZKNVHac5pB",
    note: "Дистрибуция авторских эмбиент и ИИ-музыкальных релизов на международной платформе.",
    icon: Radio,
    size: "compact",
  },
] as const;

const protocolRules = [
  "Telegram — читать текущие публикации и быстро писать.",
  "YouTube — смотреть ролики и визуальные работы.",
  "35AWARDS — проверять часть визуальных работ.",
  "Яндекс Музыка / Spotify — слушать музыкальные релизы.",
  "LinkedIn / Email — писать с задачей, сроком и контекстом.",
] as const;

export default function LinksPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-10 px-4 pb-20 pt-28 sm:px-6 lg:px-10 lg:pt-32"
    >
      <ScrollReveal>
        <section className="grid gap-6 xl:grid-cols-[120px_minmax(0,0.8fr)_minmax(0,1.2fr)] xl:items-start">
          <div className="border-b border-border-subtle pb-4 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">DIR</p>
            <p className="mt-4 font-mono text-6xl tracking-normal text-foreground sm:text-7xl">05</p>
          </div>

          <div className="space-y-5">
            <p className="signal-label">Связи</p>
            <h1 className="max-w-4xl text-balance text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-tight text-foreground">
              Ссылки на работы, профили и прямые контакты.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[rgba(214,207,191,0.82)] md:text-lg md:leading-9">
              Здесь собраны понятные ссылки: где смотреть работы, где читать публикации и куда
              писать с конкретным запросом.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="signal-frame signal-radial-accent rounded-shell p-5">
              <p className="signal-label text-accent">Состояние страницы</p>
              <div className="mt-4 grid gap-3">
                {[
                  ["Активных ссылок", "07"],
                  ["Для чего", "просмотр / проверка / контакт"],
                  ["Язык", "русский основной"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-panel border border-border-subtle px-4 py-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                      {label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="signal-frame rounded-shell p-5">
              <p className="signal-label">Как лучше заходить</p>
              <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.8)]">
                Telegram и YouTube — для публикаций и видео. LinkedIn и email — для деловых
                сообщений. 35AWARDS — внешняя страница с частью визуальных работ.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.58fr)_minmax(0,1.42fr)]">
          <div className="signal-frame rounded-shell p-6">
            <p className="signal-label">Куда нажимать</p>
            <div className="mt-4 grid gap-3">
              {protocolRules.map((rule, index) => (
                <div
                  key={rule}
                  className="grid grid-cols-[38px_minmax(0,1fr)] gap-3 border-b border-border-subtle pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-7 text-[rgba(214,207,191,0.82)]">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {linkNodes.map((node, index) => {
              const Icon = node.icon;

              return (
                <a
                  key={node.label}
                  href={node.href}
                  target={node.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={node.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                  className={`group signal-frame interactive-surface rounded-shell p-6 ${
                    node.size === "wide" ? "md:col-span-2" : ""
                  } ${index === 0 || node.label === "35AWARDS" ? "signal-radial-accent" : ""}`}
                >
                  <div className="grid gap-4 md:grid-cols-[52px_minmax(0,1fr)_48px] md:items-start">
                    <div className="space-y-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                        {node.id}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                        {node.kind}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
                        {node.label}
                      </h2>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-[rgba(214,207,191,0.82)]">
                        {node.note}
                      </p>
                    </div>

                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-panel border border-border-subtle text-titanium transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                      <Icon size={20} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="signal-frame signal-grid-panel rounded-shell p-6 md:p-8">
            <p className="signal-label text-accent">Первое сообщение</p>
            <h2 className="mt-4 text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
              Чем понятнее первое сообщение, тем быстрее получится ответить по делу.
            </h2>
            <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.82)]">
              Лучше сразу прислать задачу, срок, ограничения и референсы. Тогда станет понятно,
              нужна ли ссылка на работу, уточнение или сразу прямой ответ.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {["что нужно собрать", "какой срок реален", "какие есть референсы", "какой нужен итог"].map(
              (item) => (
                <div key={item} className="signal-frame rounded-panel p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                    обязательный пункт
                  </p>
                  <p className="mt-3 text-lg font-medium text-foreground">{item}</p>
                </div>
              ),
            )}
          </div>

          <a
            href="mailto:nikitka9318@gmail.com?subject=AI_Nikitka93%20%2F%20incoming%20brief"
            className="signal-frame interactive-surface rounded-shell p-6 xl:col-span-2"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="signal-label text-accent">Прямой канал</p>
                <p className="mt-3 text-2xl font-semibold tracking-normal text-foreground">
                  Отправить письмо с задачей
                </p>
              </div>
              <Send size={18} className="text-titanium" />
            </div>
          </a>
        </section>
      </ScrollReveal>
    </main>
  );
}
