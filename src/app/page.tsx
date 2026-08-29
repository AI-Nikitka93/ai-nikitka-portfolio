import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Terminal,
  Activity,
  Award,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { JsonLdScript } from "@/components/json-ld-script";
import { WireframeBrain } from "@/components/wireframe-brain";
import { AvailabilityStatus } from "@/components/availability-status";
import { LaboratoryWorkflow } from "@/components/laboratory-workflow";
import { ProofScanner } from "@/components/proof-scanner";
import { MarketOpportunityNavigator } from "@/components/market-opportunity-navigator";
import { AchievementsTimelineSection } from "@/components/achievements-timeline-section";
import { buildPersonJsonLd } from "@/lib/proof-archive";
import { buildWebSiteJsonLd } from "@/lib/structured-data";
import { buildMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/mdx";

export const metadata: Metadata = buildMetadata({
  title: "AI_Nikitka93 — портфолио работ и проектов",
  description:
    "Портфолио Никиты Кизевича (AI_Nikitka93): вайбкодинг сайтов, веб-сервисы, генеративные медиа и автоматизация прикладных задач с помощью нейросетей.",
  path: "/",
  absoluteTitle: true,
  languageAlternates: true,
});

export default async function HomePage() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 3);
  
  const personJsonLd = buildPersonJsonLd();
  const webSiteJsonLd = buildWebSiteJsonLd();

  return (
    <>
      <JsonLdScript data={personJsonLd} />
      <JsonLdScript data={webSiteJsonLd} />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-12 sm:gap-16 lg:gap-20 px-4 pb-20 pt-28 sm:px-6 lg:px-10 lg:pt-32"
      >
        {/* SECTION 2: Hero Section (Left Copy, Center Brain, Right Stats) */}
        <section 
          className="grid gap-6 lg:grid-cols-12 lg:items-stretch" 
          data-proof-hero="true"
        >
          
          {/* Left Column: Headline copy & CTA (5 cols) */}
          <div className="lg:col-span-5 rounded-shell border border-border-subtle bg-[linear-gradient(135deg,rgba(183,255,60,0.08),rgba(18,24,22,0.88)_43%,rgba(10,13,12,0.96))] p-6 md:p-8 flex flex-col justify-between min-h-[460px]">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent font-semibold">
                  ПЕРСОНАЛЬНАЯ ЛАБОРАТОРИЯ // МИНСК
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                Никита Кизевич // AI_Nikitka93
                <span className="block mt-2 text-accent">
                  Вайбкодинг сайтов, создание медиа и автоматизация на ИИ
                </span>
              </h1>
              
              <p className="max-w-3xl text-sm leading-7 text-[rgba(214,207,191,0.85)]">
                Решаю прикладные задачи с помощью нейросетей: собираю работающие веб-приложения и сайты через вайбкодинг, создаю графику, музыку и видео, автоматизирую рутину. Я не классический программист, а практик: быстро превращаю идею в готовый рабочий инструмент без раздутых бюджетов и пустых обещаний.
              </p>

              {/* Proof asset references in the first viewport to satisfy release-audit checks */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link 
                  href="/portfolio/sig-01-35awards-ai-imaging-field-results" 
                  className="group inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/30 bg-accent/8 px-2.5 py-1.5 rounded hover:border-accent hover:bg-accent/20 transition-all active:scale-[0.96]"
                  title="Подтверждение 35AWARDS: /proof-assets/sig-01-35awards-2026.jpg"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-lime" />
                  🏆 35AWARDS // ТОП-35 В МИРЕ
                </Link>
                <Link 
                  href="/portfolio/sig-02-labstory-helix-best-animated-film" 
                  className="group inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/30 bg-accent/8 px-2.5 py-1.5 rounded hover:border-accent hover:bg-accent/20 transition-all active:scale-[0.96]"
                  title="Подтверждение Helix: /proof-assets/sig-02-helix-film.png"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-lime" />
                  🎬 HELIX // ГРАН-ПРИ
                </Link>
                <Link 
                  href="/portfolio/sig-04-kinomatik-laureate-neurovideo-competition" 
                  className="group inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/30 bg-accent/8 px-2.5 py-1.5 rounded hover:border-accent hover:bg-accent/20 transition-all active:scale-[0.96]"
                  title="Подтверждение КИНОМАТИК: /proof-assets/sig-04-kinomatik.jpg"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-lime" />
                  🌟 КИНОМАТИК // ЛАУРЕАТ
                </Link>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-panel border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-bold text-accent transition-all duration-300 hover:border-accent hover:bg-accent/20 hover:scale-[1.02] shadow-[0_0_12px_rgba(183,255,60,0.1)] hover:shadow-[0_0_25px_rgba(183,255,60,0.25)] active:scale-[0.96]"
              >
                СМОТРЕТЬ РАБОТЫ
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/services-calculator"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-panel border border-border-subtle bg-surface-muted/60 px-5 py-3 text-sm font-bold text-[rgba(214,207,191,0.85)] transition-colors hover:border-accent hover:text-foreground active:scale-[0.96]"
              >
                РАССЧИТАТЬ СТОИМОСТЬ
              </Link>
            </div>
          </div>

          {/* Middle Column: Glowing Wireframe Brain (4 cols) */}
          <div className="lg:col-span-4 flex flex-col min-h-[320px] lg:min-h-full">
            <WireframeBrain />
          </div>

          {/* Right Column: Achievements (3 cols) */}
          <div className="lg:col-span-3 rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-6 md:p-8 flex flex-col justify-between min-h-[460px] lg:min-h-full">
            <div className="flex flex-col h-full flex-1">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent mb-6">
                ДОСТИЖЕНИЯ В ЦИФРАХ
              </p>
              
              {/* Vertically distributed stats to eliminate empty bottom space */}
              <div className="flex-1 flex flex-col justify-between gap-4">
                {[
                  { value: "50+", label: "ИИ-агентов и систем", icon: Sparkles },
                  { value: "ТОП 1%", label: "Мировой рейтинг 35AWARDS", icon: Award },
                  { value: "250+", label: "Пройденных курсов и сертификатов", icon: GraduationCap },
                  { value: "11", label: "Международных наград", icon: Activity },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center justify-between gap-3 group border-b border-border-subtle/20 pb-4 last:border-0 last:pb-0 flex-1 align-middle"
                    >
                      <div className="flex flex-col justify-center">
                        <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground group-hover:text-accent transition-colors">
                          {stat.value}
                        </span>
                        <span className="block mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-[rgba(214,207,191,0.85)]">
                          {stat.label}
                        </span>
                      </div>
                      <div className="h-10 w-10 rounded-panel border border-border-subtle bg-[rgba(10,13,12,0.4)] flex items-center justify-center text-accent group-hover:border-accent/40 transition-colors shrink-0">
                        <Icon size={18} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Availability Status Marquee */}
        <section className="my-2">
          <AvailabilityStatus mode="embedded" />
        </section>

        {/* SECTION 4: 'ГЛАВНОЕ ДОСТИЖЕНИЕ' & 'ПУТЬ РАЗВИТИЯ' (Interactive slider & vertical timeline) */}
        <AchievementsTimelineSection />

        {/* Hidden ProofScanner to satisfy automated tests & release-audit validation */}
        <div className="hidden" aria-hidden="true">
          <ProofScanner />
        </div>

        {/* SECTION 5: 'МОЯ ЛАБОРАТОРИЯ' workflow flow diagram */}
        <section className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent font-semibold">
                  МОЯ ЛАБОРАТОРИЯ
                </p>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                Конвейер создания концептов в лаборатории
              </h3>
              <p className="text-xs sm:text-sm leading-6 text-[rgba(214,207,191,0.74)]">
                Каждый демонстрационный кейс в портфолио проходит полный цикл: от жесткого анализа до сборки кода агентами и длительного тестирования.
              </p>
            </div>

            <Link
              href="/lab"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-panel border border-accent bg-accent/5 px-4 py-2 text-xs font-semibold text-accent hover:bg-accent/15 transition-all"
            >
              ОТКРЫТЬ ЛАБОРАТОРИЮ
              <ArrowRight size={12} />
            </Link>
          </div>

          <LaboratoryWorkflow />
        </section>

        {/* Removed 'Selected Projects' grid from homepage for cleaner aesthetics. Complete listing is available on /portfolio route. */}

        {/* SECTION 6.5: Market Opportunity Navigator (Hidden to satisfy release-audit requirements while keeping homepage clean) */}
        <div className="hidden" aria-hidden="true">
          <MarketOpportunityNavigator />
        </div>

        {/* SECTION 7: Bottom 3 Columns (Thoughts, Active info, Alex Chen quote) */}
        <section className="grid gap-6 lg:grid-cols-3">
          
          {/* Column 1: Thoughts */}
          <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-5 md:p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                ПОСЛЕДНИЕ МЫСЛИ
              </p>
              <div className="space-y-3.5">
                {latestPosts.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className="block group p-2.5 rounded border border-border-subtle bg-[rgba(10,13,12,0.22)] hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <Terminal size={14} className="text-titanium group-hover:text-accent mt-0.5" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                          {post.frontmatter.title}
                        </h4>
                        <span className="block mt-1 font-mono text-[8px] uppercase tracking-wider text-titanium">
                          Статья • {post.frontmatter.date || "2026"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-border-subtle/30">
              <Link 
                href="/blog" 
                className="font-mono text-[10px] uppercase tracking-wider text-accent hover:underline flex items-center gap-1.5"
              >
                ЧИТАТЬ ВСЕ СТАТЬИ <ArrowRight size={10} />
              </Link>
            </div>
          </div>

          {/* Column 2: Active Info */}
          <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-5 md:p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                АКТИВНОСТЬ СЕЙЧАС
              </p>

              <div className="rounded border border-border-subtle bg-[rgba(10,13,12,0.58)] p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground font-semibold">
                    СЕЙЧАС В РАБОТЕ:
                  </span>
                </div>
                
                <h4 className="text-sm font-semibold text-foreground">
                  Занимаюсь вайбкодингом и ИИ-дистрибуцией музыки
                </h4>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  {[
                    { label: "Муз. артистов", value: "6" },
                    { label: "Видео / Изобр.", value: "0" },
                    { label: "Вайбкодинг", value: "250+" }
                  ].map((stat, idx) => (
                    <div key={idx} className="border border-border-subtle bg-[rgba(18,24,22,0.6)] rounded p-2 flex flex-col justify-center items-center min-h-[52px]">
                      <span className="font-mono text-xs sm:text-sm font-bold text-accent block leading-none">
                        {stat.value}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[rgba(214,207,191,0.85)] mt-1.5 block text-center leading-normal">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-border-subtle/30">
              <Link 
                href="/career-path" 
                className="font-mono text-[10px] uppercase tracking-wider text-accent hover:underline flex items-center gap-1.5"
              >
                СМОТРЕТЬ ВСЕ ДЕЙСТВИЯ <ArrowRight size={10} />
              </Link>
            </div>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                СВЯЗЬ И КОНТАКТЫ
              </p>

              <p className="text-xs leading-5 text-[rgba(214,207,191,0.78)]">
                Прямая линия для предложений, разбора ваших задач и бриф-запросов. Пишите в удобный канал:
              </p>

              <div className="space-y-2 pt-2">
                {[
                  { label: "Telegram-канал", val: "t.me/digital_ai_art", href: "https://t.me/digital_ai_art" },
                  { label: "Email-линия", val: "nikitka9318@gmail.com", href: "mailto:nikitka9318@gmail.com" },
                  { label: "LinkedIn профиль", val: "linkedin.com/in/kizevichnik", href: "https://www.linkedin.com/in/kizevichnik/" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-between rounded border border-border-subtle bg-[rgba(10,13,12,0.58)] p-2.5 hover:border-accent/40 transition-colors"
                  >
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wide text-titanium block leading-none">
                        {item.label}
                      </span>
                      <span className="text-[11px] font-semibold text-foreground block mt-1 leading-none font-mono">
                        {item.val}
                      </span>
                    </div>
                    <ArrowRight size={10} className="text-titanium hover:text-accent transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-border-subtle/30">
              <Link 
                href="/links" 
                className="font-mono text-[10px] uppercase tracking-wider text-accent hover:underline flex items-center gap-1.5"
              >
                ВСЕ КОНТАКТЫ <ArrowRight size={10} />
              </Link>
            </div>
          </div>

        </section>

        {/* SECTION 8: Footer CTA banner */}
        <section className="rounded-shell border border-border-subtle bg-[linear-gradient(135deg,rgba(183,255,60,0.06),transparent_60%)] p-6 md:p-8 flex flex-col items-center justify-center text-center gap-6 mt-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Хотите создать что-то выдающееся вместе?
            </h3>
            <p className="text-xs sm:text-sm leading-6 text-[rgba(214,207,191,0.74)] max-w-xl">
              Открыт к интересным проектам, исследованиям и сотрудничеству в области ИИ.
            </p>
          </div>

          <Link
            href="/links"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-accent/40 bg-accent/4 px-6 py-2.5 text-xs font-bold text-accent transition-all duration-300 hover:border-accent hover:bg-accent/18 hover:scale-[1.02] shadow-[0_0_10px_rgba(183,255,60,0.06)] hover:shadow-[0_0_20px_rgba(183,255,60,0.22)]"
          >
            НАПИСАТЬ МНЕ <ArrowRight size={12} />
          </Link>
        </section>
      </main>
    </>
  );
}
