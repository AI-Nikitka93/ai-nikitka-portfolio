import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrambleText } from "@/components/scramble-text";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  contentLang?: string;
  aside?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  contentLang,
  aside,
  actions,
  children,
}: PageShellProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      lang={contentLang}
      className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-10 px-4 pb-20 pt-28 sm:px-6 lg:px-10 lg:pt-32"
    >
      <ScrollReveal>
        <section className="signal-surface rounded-shell px-6 py-8 md:px-10 md:py-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)] xl:items-start">
            <div className="max-w-4xl space-y-5">
              {eyebrow ? (
                <p className="signal-label">{eyebrow}</p>
              ) : null}
              <div className="max-w-3xl">
                <ScrambleText
                  text={title}
                  as="h1"
                  className="text-balance break-words text-3xl font-bold tracking-tight text-foreground [overflow-wrap:anywhere] sm:text-4xl lg:text-[2.75rem] leading-[1.1]"
                />
              </div>
              <p className="signal-copy max-w-2xl text-base leading-8 md:text-lg md:leading-9">
                {description}
              </p>
              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>

            <div className="space-y-4">
              {aside ?? (
                <div className="signal-frame rounded-panel p-5">
                  <p className="signal-label">Состояние страницы</p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.76)]">
                    Страница подключена к сайту. Здесь можно добавлять данные и отдельную логику,
                    сохраняя общий вид.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="grid gap-6">
        {children ?? (
          <ScrollReveal>
            <div className="signal-frame rounded-panel p-6 md:p-8">
              <p className="signal-label">Страница готова</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[rgba(214,207,191,0.76)]">
                Эта страница подключена к сайту и может дополняться материалами в общем стиле.
              </p>
            </div>
          </ScrollReveal>
        )}
      </section>
    </main>
  );
}
