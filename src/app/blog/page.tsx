import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, NotebookText } from "lucide-react";
import { JsonLdScript } from "@/components/json-ld-script";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { buildBlogCollectionJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Блог",
  description:
    "Блог AI_Nikitka93: короткие заметки о работах, видео, графике и новых инструментах.",
  path: "/blog",
});

const noteFormats = [
  {
    id: "01",
    title: "Короткие выводы",
    text: "Небольшие записи после одного эксперимента, теста или рабочей находки.",
  },
  {
    id: "02",
    title: "Как делал",
    text: "Спокойное объяснение, что сработало, что пришлось поменять и почему.",
  },
  {
    id: "03",
    title: "Рабочий журнал",
    text: "Последовательность шагов, наблюдений и изменений по ходу проекта.",
  },
] as const;

const archiveLinks = [
  {
    label: "Работы",
    href: "/portfolio",
    note: "Главные работы, результаты и подтверждения.",
  },
  {
    label: "О себе",
    href: "/about",
    note: "Кто стоит за проектом и на чем он вырос.",
  },
  {
    label: "Контакты",
    href: "/links",
    note: "Публичные ссылки, контакты и внешние площадки.",
  },
] as const;

export default async function BlogPage() {
  const posts = await getPosts();
  const blogJsonLd = buildBlogCollectionJsonLd(posts);

  return (
    <>
      <JsonLdScript data={blogJsonLd} />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-10 px-4 pb-20 pt-28 sm:px-6 lg:px-10 lg:pt-32"
      >
      <ScrollReveal>
        <section className="grid gap-8 border-b border-border-subtle pb-10 xl:grid-cols-[120px_minmax(0,1.15fr)_minmax(300px,0.85fr)] xl:items-start">
          <div className="border-b border-border-subtle pb-4 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">БЛОГ</p>
            <p className="mt-4 font-mono text-6xl tracking-normal text-foreground sm:text-7xl">00</p>
          </div>

          <div className="space-y-5">
            <p className="signal-label">Блог</p>
            <h1 className="max-w-4xl text-balance text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-tight text-foreground">
              Заметки о работе: что получилось, что было сложным и что оказалось полезным.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[rgba(214,207,191,0.82)] md:text-lg md:leading-9">
              Здесь собраны короткие заметки о том, что дало реальный результат в видео,
              изображениях и новых инструментах. Это рабочие выводы, которые помогают понять,
              как делались работы.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="signal-frame rounded-shell p-5">
              <p className="signal-label">Записи</p>
              <div className="mt-4 grid gap-3">
                {[
                  ["Опубликовано", String(posts.length).padStart(2, "0")],
                  ["Формат", "короткие записи"],
                  ["Тон", "коротко и по делу"],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-border-subtle pb-3 last:border-b-0 last:pb-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                      {label}
                    </p>
                    <p className="mt-2 font-mono text-xl tracking-normal text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="signal-frame rounded-shell p-5">
              <p className="signal-label">Зачем этот раздел</p>
              <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.8)]">
                Каждая заметка должна либо объяснять полезный рабочий вывод, либо добавлять
                понятный контекст к уже существующим работам.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <section className="grid gap-5 xl:grid-cols-3">
          {noteFormats.map((item) => (
            <article key={item.id} className="signal-frame interactive-surface rounded-shell p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">{item.id}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-normal text-foreground">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[rgba(214,207,191,0.8)]">{item.text}</p>
            </article>
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        {posts.length > 0 ? (
          <section className="grid gap-0 border-t border-border-subtle">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="grid gap-6 border-b border-border-subtle py-8 md:grid-cols-[80px_minmax(0,1fr)_220px] md:items-start"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                    {post.frontmatter.category || "Заметка"}
                  </p>
                  <h2 className="mt-3 text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
                    {post.frontmatter.title || post.slug}
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-8 text-[rgba(214,207,191,0.82)]">
                    {post.frontmatter.description || post.excerpt}
                  </p>
                </div>
                <div className="flex flex-col gap-4 md:items-end">
                  {post.frontmatter.date ? (
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                      {post.frontmatter.date}
                    </p>
                  ) : null}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex min-h-11 items-center gap-2 border-b border-accent text-sm font-medium text-foreground transition-colors hover:text-accent"
                  >
                    Читать заметку
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="grid gap-8 xl:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] xl:items-start">
            <div className="signal-frame rounded-shell p-6 md:p-8">
              <p className="signal-label">Сейчас</p>
              <div className="mt-4 font-mono text-6xl tracking-normal text-accent sm:text-7xl">
                00
              </div>
              <h2 className="mt-5 max-w-xl text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
                Блог подключен к контентной системе. Если записи временно скрыты, этот раздел
                остается понятной навигацией по сайту.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[rgba(214,207,191,0.82)]">
                Опубликованные записи появляются здесь как аккуратный список: с датой, кратким
                выводом и прямым переходом к полной заметке.
              </p>
            </div>

            <div className="grid gap-5">
              <div className="signal-frame rounded-shell p-6">
              <div className="flex items-center gap-3">
                  <NotebookText size={16} className="text-accent" />
                  <p className="signal-label">Пока можно посмотреть здесь</p>
                </div>
                <div className="mt-5 grid gap-4">
                  {archiveLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="interactive-surface rounded-shell border border-border-subtle p-5 transition-colors hover:border-accent"
                    >
                      <div className="grid gap-4 md:grid-cols-[48px_minmax(0,1fr)_20px] md:items-start">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                          {item.href === "/portfolio" ? "01" : item.href === "/about" ? "02" : "03"}
                        </span>
                        <div>
                          <h3 className="text-2xl font-semibold tracking-normal text-foreground">
                            {item.label}
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.8)]">
                            {item.note}
                          </p>
                        </div>
                        <ArrowUpRight size={16} className="text-titanium" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="signal-frame rounded-shell p-6">
                <p className="signal-label">Как будет устроен блог</p>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-[rgba(214,207,191,0.8)]">
                  В этом разделе появятся короткие записи: полезный рабочий вывод или понятный контекст к
                  уже существующим работам.
                </p>
              </div>
            </div>
          </section>
        )}
      </ScrollReveal>
      </main>
    </>
  );
}
