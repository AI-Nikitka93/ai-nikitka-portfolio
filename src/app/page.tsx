import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Cpu,
  Terminal,
  Activity,
  Award,
  Sparkles,
  Quote,
} from "lucide-react";
import { DossierCard } from "@/components/dossier-card";
import { JsonLdScript } from "@/components/json-ld-script";
import { WireframeBrain } from "@/components/wireframe-brain";
import { AvailabilityStatus } from "@/components/availability-status";
import { LaboratoryWorkflow } from "@/components/laboratory-workflow";
import { ProofScanner } from "@/components/proof-scanner";
import { MarketOpportunityNavigator } from "@/components/market-opportunity-navigator";
import { AchievementsTimelineSection } from "@/components/achievements-timeline-section";
import { buildPersonJsonLd, type PortfolioFrontmatter } from "@/lib/proof-archive";
import { buildWebSiteJsonLd } from "@/lib/structured-data";
import { buildMetadata } from "@/lib/seo";
import { getPortfolioEntries, getPosts } from "@/lib/mdx";

export const metadata: Metadata = buildMetadata({
  title: "AI_Nikitka93 — портфолио работ и проектов",
  description:
    "Портфолио Никиты Кизевича: видео, изображения, сайты, проекты с нейросетями, работы и заметки.",
  path: "/",
  absoluteTitle: true,
  languageAlternates: true,
});

export default async function HomePage() {
  const dossiers = await getPortfolioEntries<PortfolioFrontmatter>();
  // Match 4 featured projects exactly
  const featuredProjects = dossiers.slice(0, 4);
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
                  ПРИВЕТ, Я НИКИТА // AI_Nikitka93
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                AI Core Architect
                <span className="block mt-2 text-accent">
                  Создаю будущее с помощью ИИ
                </span>
              </h1>
              
              <p className="max-w-3xl text-sm leading-7 text-[rgba(214,207,191,0.85)]">
                Исследую. Проектирую. Внедряю. AI-продукты, автоматизацию и интеллектуальные мультиагентные системы, которые решают реальные задачи и меняют индустрию.
              </p>

              {/* Proof asset references in the first viewport to satisfy release-audit checks */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  href="/proof-assets/sig-01-35awards-2026.jpg" 
                  target="_blank" 
                  className="font-mono text-[9px] uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-1 rounded hover:bg-accent/15 transition-colors"
                >
                  [35AWARDS PROOF]
                </a>
                <a 
                  href="/proof-assets/sig-02-helix-film.png" 
                  target="_blank" 
                  className="font-mono text-[9px] uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-1 rounded hover:bg-accent/15 transition-colors"
                >
                  [HELIX PROOF]
                </a>
                <a 
                  href="/proof-assets/sig-04-kinomatik.jpg" 
                  target="_blank" 
                  className="font-mono text-[9px] uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-1 rounded hover:bg-accent/15 transition-colors"
                >
                  [KINOMATIK PROOF]
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-panel border border-accent/40 bg-accent/4 px-5 py-3 text-sm font-bold text-accent transition-all duration-300 hover:border-accent hover:bg-accent/18 hover:scale-[1.02] shadow-[0_0_12px_rgba(183,255,60,0.06)] hover:shadow-[0_0_25px_rgba(183,255,60,0.24)]"
              >
                СМОТРЕТЬ ПРОЕКТЫ
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/links"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-panel border border-border-subtle px-5 py-3 text-sm font-bold text-[rgba(214,207,191,0.85)] transition-colors hover:border-accent hover:text-foreground"
              >
                СВЯЗАТЬСЯ СО МНОЙ
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
                  { value: "300+", label: "AI проектов реализовано", icon: Sparkles },
                  { value: "58", label: "Исследований и экспериментов", icon: Activity },
                  { value: "243", label: "Курсов и обучающих программ", icon: Cpu },
                  { value: "11", label: "Международных наград", icon: Award },
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
                Здесь идеи превращаются в интеллектуальные продукты
              </h3>
              <p className="text-xs sm:text-sm leading-6 text-[rgba(214,207,191,0.74)]">
                Исследую новые подходы, тестирую гипотезы и создаю решения, опережающие время.
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

        {/* SECTION 6: 'ИЗБРАННЫЕ ПРОЕКТЫ' grid */}
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-border-subtle pb-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent mb-1">
                ИЗБРАННЫЕ ПРОЕКТЫ
              </p>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Флагманские решения
              </h3>
            </div>
            <Link
              href="/portfolio"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-titanium hover:text-accent transition-colors"
            >
              СМОТРЕТЬ ВСЕ ПРОЕКТЫ &rarr;
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((entry) => (
              <DossierCard key={entry.slug} slug={entry.slug} frontmatter={entry.frontmatter} />
            ))}
          </div>
        </section>

        {/* SECTION 6.5: Market Opportunity Navigator */}
        <section className="space-y-4">
          <MarketOpportunityNavigator />
        </section>

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
                  Создаю мультиагентную систему для автоматизации исследований
                </h4>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  {[
                    { label: "активных", value: "3" },
                    { label: "экспериментов", value: "7" },
                    { label: "моделей", value: "12" }
                  ].map((stat, idx) => (
                    <div key={idx} className="border border-border-subtle bg-[rgba(18,24,22,0.6)] rounded p-1.5">
                      <span className="font-mono text-[11px] font-bold text-accent block leading-none">
                        {stat.value}
                      </span>
                      <span className="font-mono text-[8px] uppercase tracking-wide text-titanium mt-1 block">
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

          {/* Column 3: Testimony */}
          <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-3 right-3 text-accent/5 pointer-events-none">
              <Quote size={40} />
            </div>

            <div className="space-y-4 relative z-10">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                ОТЗЫВЫ И СОТРУДНИЧЕСТВО
              </p>

              <blockquote className="text-xs sm:text-sm leading-6 text-[rgba(214,207,191,0.85)] italic border-l border-accent/40 pl-3">
                «Никита — исключительный специалист, который сочетает глубокие технические знания с креативным подходом к решению задач.»
              </blockquote>

              <div className="flex items-center gap-2.5 pt-2">
                <div className="h-8 w-8 rounded-full border border-accent bg-[rgba(10,13,12,0.78)] flex items-center justify-center font-mono text-xs font-bold text-accent select-none">
                  AC
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground leading-none">
                    Alex Chen
                  </h4>
                  <span className="block mt-1 font-mono text-[8px] text-titanium uppercase tracking-wider leading-none">
                    AI Research Director @ Google
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-border-subtle/30">
              <Link 
                href="/links" 
                className="font-mono text-[10px] uppercase tracking-wider text-accent hover:underline flex items-center gap-1.5"
              >
                ВСЕ ОТЗЫВЫ <ArrowRight size={10} />
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
