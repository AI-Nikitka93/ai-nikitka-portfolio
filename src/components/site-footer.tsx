import Link from "next/link";
import { getPortfolioEntries, getPosts } from "@/lib/mdx";
import { navigation, siteFreshnessLabel, utilityNavigation } from "@/lib/site";
import { LiveAvailability } from "@/components/live-availability";

function formatCount(count: number, forms: [string, string, string]) {
  const absoluteCount = Math.abs(count);
  const lastTwoDigits = absoluteCount % 100;
  const lastDigit = absoluteCount % 10;
  const form =
    lastTwoDigits >= 11 && lastTwoDigits <= 14
      ? forms[2]
      : lastDigit === 1
        ? forms[0]
        : lastDigit >= 2 && lastDigit <= 4
          ? forms[1]
          : forms[2];

  return `${count} ${form}`;
}

export async function SiteFooter() {
  const [portfolioEntries, posts] = await Promise.all([getPortfolioEntries(), getPosts()]);
  const contentCountLabel = `${formatCount(portfolioEntries.length, [
    "работа",
    "работы",
    "работ",
  ])} / ${formatCount(posts.length, ["заметка", "заметки", "заметок"])}`;

  return (
    <footer className="mx-auto mt-16 w-full max-w-[1440px] px-4 pb-10 sm:px-6 lg:px-10">
      <div className="signal-surface rounded-shell px-6 py-6 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="signal-label text-accent">AI_Nikitka93</p>
            <p className="text-lg font-medium text-foreground">
              Сайт о работах, проектах и опыте Никиты Кизевича.
            </p>
            <p className="text-sm leading-7 text-[rgba(214,207,191,0.76)]">
              Здесь собраны работы, заметки, информация о проекте и способы связи.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="rounded-panel border border-border-subtle px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                Обновлено: {siteFreshnessLabel}
              </span>
              <span className="rounded-panel border border-border-subtle px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                {contentCountLabel}
              </span>
              <LiveAvailability initialStatus="selective" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[rgba(214,207,191,0.72)]">
            {[...navigation, ...utilityNavigation].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-panel border border-border-subtle px-3 py-2 transition-colors hover:border-accent hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

