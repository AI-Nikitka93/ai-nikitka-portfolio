import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Приватность",
  description:
    "Как сайт AI_Nikitka93 относится к данным посетителя: аналитика, пиксели, формы, внешние ссылки и контактные каналы.",
  path: "/privacy",
});

const dataRules = [
  {
    label: "Собственные cookies",
    value: "не используются",
  },
  {
    label: "Аналитика и пиксели",
    value: "не подключены",
  },
  {
    label: "Формы и заявки",
    value: "не хранятся сайтом",
  },
] as const;

const boundaryItems = [
  {
    title: "Email-запрос",
    text: "Ссылка с брифом открывает почтовый клиент через mailto. Сам сайт не получает и не сохраняет текст письма.",
    icon: Mail,
  },
  {
    title: "Внешние профили",
    text: "Telegram, LinkedIn, YouTube и 35AWARDS открываются как отдельные платформы со своими правилами обработки данных.",
    icon: ExternalLink,
  },
  {
    title: "Проверочные материалы",
    text: "Работы и заметки читаются как статические страницы. В текущей версии нет личного кабинета, CMS-сессии или скрытой формы обратной связи.",
    icon: FileText,
  },
] as const;

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Приватность"
      title="Сайт показывает работы, ссылки и контакты как статические страницы."
      description="В текущей версии портфолио нет собственной аналитики, рекламных пикселей, аккаунтов, серверных форм и внутреннего хранения заявок."
      actions={
        <>
          <Link
            href="/links"
            className="inline-flex min-h-11 items-center rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(183,255,60,0.08)]"
          >
            Открыть контакты
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center rounded-panel border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-[rgba(183,255,60,0.06)]"
          >
            Проверить работы
          </Link>
        </>
      }
      aside={
        <div className="signal-frame signal-radial-accent rounded-panel p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck size={17} className="text-accent" />
            <p className="signal-label text-accent">Текущий режим</p>
          </div>
          <div className="mt-4 space-y-3">
            {dataRules.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 border-b border-border-subtle pb-3 text-sm text-[rgba(214,207,191,0.78)] last:border-b-0 last:pb-0"
              >
                <span>{item.label}</span>
                <span className="text-right font-mono uppercase text-accent">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <ScrollReveal>
        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="signal-frame signal-grid-panel rounded-shell p-6 md:p-8">
            <div className="flex items-center gap-3">
              <LockKeyhole size={17} className="text-accent" />
              <p className="signal-label text-accent">Что происходит на сайте</p>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-foreground">
              Публичный просмотр: страницы, ссылки и контактные переходы.
            </h2>
            <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.82)]">
              В текущей версии нет подключенной аналитики, рекламных пикселей,
              авторизации, серверных форм или базы заявок. Если это изменится, страница
              приватности должна быть обновлена до публичного запуска новой версии.
            </p>
          </div>

          <div className="grid gap-4">
            {boundaryItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="signal-frame rounded-panel p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold tracking-normal text-foreground">
                      {item.title}
                    </h2>
                    <Icon size={18} className="text-accent" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.8)]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <section className="signal-frame rounded-shell p-6 md:p-8">
          <p className="signal-label text-accent">Обновление правила</p>
          <p className="mt-4 max-w-4xl text-sm leading-8 text-[rgba(214,207,191,0.82)]">
            Эта страница описывает текущую версию сайта. Перед добавлением
            аналитики, формы обратной связи, помощника с памятью на сервере или любого стороннего
            скрипта нужно отдельно обновить публичное описание данных и заново проверить сайт.
          </p>
        </section>
      </ScrollReveal>
    </PageShell>
  );
}
