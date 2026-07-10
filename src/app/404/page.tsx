import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Страница не найдена",
  description: "Запрошенная страница портфолио AI_Nikitka93 недоступна.",
  path: "/404",
  noIndex: true,
});

export default function FourOhFourRoutePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-[1440px] flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-10"
    >
      <section className="signal-surface max-w-3xl rounded-shell p-8 md:p-10">
        <p className="signal-label text-accent">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-foreground md:text-5xl">
          Страница не найдена.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[rgba(214,207,191,0.78)]">
          Такой страницы нет в публичной версии сайта. Можно вернуться на главную, открыть
          работы или перейти к контактам.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-panel border border-accent px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(183,255,60,0.08)]"
          >
            На главную
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center rounded-panel border border-border-subtle bg-surface-muted px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
          >
            Смотреть работы
          </Link>
        </div>
      </section>
    </main>
  );
}
