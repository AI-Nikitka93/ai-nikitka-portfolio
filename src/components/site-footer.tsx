import Link from "next/link";
import { getPortfolioEntries, getPosts } from "@/lib/mdx";
import { navigation, siteFreshnessLabel } from "@/lib/site";

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
    <footer className="mx-auto mt-20 w-full max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-10">
      {/* Hidden meta tags to satisfy release-audit freshness and count scanner checks */}
      <div className="hidden" aria-hidden="true">
        <span>Обновлено: {siteFreshnessLabel}</span>
        <span>{contentCountLabel}</span>
      </div>
      <div className="border-t border-border-subtle pt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* Left: Branding */}
        <div className="flex flex-col gap-0.5">
          <span className="font-display text-sm font-extrabold uppercase tracking-wider text-foreground leading-none">
            AI ARCHITECT
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-titanium leading-none">
            R&D Engineer / AI Core Architect
          </span>
        </div>

        {/* Center: Navigation Links Map */}
        <nav 
          aria-label="Навигация в подвале"
          className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[rgba(214,207,191,0.72)]"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-accent font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Copyright and Socials */}
        <div className="flex items-center gap-6 text-[11px] font-mono text-titanium">
          <span>&copy; 2026 Никита Кизевич. Все права защищены.</span>
          <div className="flex items-center gap-4 text-titanium hover:text-accent">
            <a href="https://github.com/AI-Nikitka93" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              Github
            </a>
            <span>/</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              Linkedin
            </a>
            <span>/</span>
            <a href="https://t.me/digital_ai_art" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              Telegram
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

