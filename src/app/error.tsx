"use client";

import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-[1440px] flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-10"
    >
      <section className="signal-surface max-w-3xl rounded-shell p-8 md:p-10">
        <p className="signal-label text-accent">Ошибка страницы</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-foreground md:text-5xl">
          Этот раздел временно не загрузился.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[rgba(214,207,191,0.78)]">
          Сайт сохранил безопасный fallback вместо пустого экрана. Можно повторить загрузку
          текущего раздела или перейти на главную страницу.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-accent px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(183,255,60,0.08)]"
          >
            <RotateCcw size={16} />
            Повторить
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-border-subtle bg-surface-muted px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
          >
            <Home size={16} />
            На главную
          </Link>
        </div>
      </section>
    </main>
  );
}
