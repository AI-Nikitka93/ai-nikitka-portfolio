import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
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
import { MarqueeTicker } from "@/components/marquee-ticker";
import { LaboratoryWorkflow } from "@/components/laboratory-workflow";
import { ProofScanner } from "@/components/proof-scanner";
import { MarketOpportunityNavigator } from "@/components/market-opportunity-navigator";
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
        {/* SECTION 2: Hero Section (Left Copy, Right Stats Grid + Glowing SVG Brain) */}
        <section 
          className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-stretch" 
          data-proof-hero="true"
        >
          
          {/* Left Column: Headline copy & CTA */}
          <div className="rounded-shell border border-border-subtle bg-[linear-gradient(135deg,rgba(183,255,60,0.08),rgba(18,24,22,0.88)_43%,rgba(10,13,12,0.96))] p-6 md:p-8 flex flex-col justify-between">
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
              
              <p className="max-w-3xl text-sm leading-7 text-[rgba(214,207,191,0.85)] md:text-base md:leading-8">
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
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-panel bg-accent px-5 py-3 text-sm font-bold text-void-black transition-all hover:opacity-90 hover:scale-[1.02] shadow-[0_0_20px_rgba(183,255,60,0.25)]"
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

          {/* Right Column: Achievements & Glowing Wireframe Brain */}
          <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-6 md:p-8 flex flex-col justify-between gap-6">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent mb-4">
                ДОСТИЖЕНИЯ В ЦИФРАХ
              </p>
              
              {/* 4-Column Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
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
                      className="border border-border-subtle/50 bg-[rgba(10,13,12,0.28)] rounded-panel p-4 flex items-center justify-between gap-3 hover:border-accent/30 transition-colors"
                    >
                      <div>
                        <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                          {stat.value}
                        </span>
                        <span className="block mt-1 text-[10px] leading-4 text-titanium">
                          {stat.label}
                        </span>
                      </div>
                      <Icon size={18} className="text-accent flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Glowing Wireframe Brain Visual */}
            <WireframeBrain />
          </div>
        </section>

        {/* SECTION 3: Infinite Marquee Ticker */}
        <section className="-mx-4 sm:-mx-6 lg:-mx-10 my-2">
          <MarqueeTicker />
        </section>

        {/* SECTION 3.5: Signature Proof Scanner */}
        <section className="space-y-4">
          <ProofScanner />
        </section>

        {/* SECTION 3.8: Market Opportunity Navigator */}
        <section className="space-y-4">
          <MarketOpportunityNavigator />
        </section>

        {/* SECTION 4: 'ГЛАВНОЕ ДОСТИЖЕНИЕ' (35AWARDS Grid + Timeline + Quote) */}
        <section className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            
            {/* Left Card: 35AWARDS Photo Award */}
            <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent mb-4">
                  ГЛАВНОЕ ДОСТИЖЕНИЕ
                </p>
                <h3 className="text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                  <span className="text-accent">TOP 35</span> INTERNATIONAL AI PHOTOGRAPHY AWARD
                </h3>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-titanium mb-5">
                  35AWARDS 2025
                </p>
                <p className="text-xs sm:text-sm leading-6 text-[rgba(214,207,191,0.78)]">
                  Международная премия в области AI фотографии. Признание на мировом уровне: 9 работ в финале, ТОП-35 авторов в категории генеративных визуальных образов.
                </p>

                {/* Categories ranked stats */}
                <div className="grid grid-cols-3 gap-2 mt-5">
                  {[
                    { label: "Living Creatures", rank: "Top 35" },
                    { label: "Landscape", rank: "Top 50" },
                    { label: "Undocumented", rank: "Top 70" }
                  ].map((cat, idx) => (
                    <div key={idx} className="rounded border border-border-subtle/50 bg-[rgba(10,13,12,0.4)] p-3 text-center">
                      <span className="block font-mono text-[8px] uppercase tracking-wider text-titanium mb-1">
                        {cat.label}
                      </span>
                      <span className="font-mono text-xs font-semibold text-accent">
                        {cat.rank}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle/30">
                <Link
                  href="/awards-credentials"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent hover:underline"
                >
                  ПОДРОБНЕЕ <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Card: Career Timeline Path */}
            <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.76)] p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent mb-4">
                  ПУТЬ РАЗВИТИЯ
                </p>

                {/* Timeline Grid */}
                <div className="relative border-l border-border-subtle pl-5 space-y-5">
                  {[
                    { year: "2020", title: "Первые AI эксперименты", desc: "Минскводоканал Electrical maintenance // Запуск тестов" },
                    { year: "2022", title: "Запуск LabStory / Helix", desc: "Победа в конкурсах, R&D в генерации видео" },
                    { year: "2024", title: "AI продукты и внедрение", desc: "Кастомные пайплайны, автоматические агенты" },
                    { year: "2026", title: "AI Core Architect", desc: "Создание будущего системного AI проектирования" }
                  ].map((node, idx) => (
                    <div key={idx} className="relative">
                      {/* Node Bullet */}
                      <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-accent border border-void-black animate-pulse" />
                      
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] font-bold text-accent">
                          {node.year}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                          {node.title}
                        </h4>
                      </div>
                      <p className="text-[10px] text-titanium leading-5">
                        {node.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Quote Card */}
          <div className="rounded-shell border border-border-subtle bg-[rgba(18,24,22,0.32)] p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-4 left-4 text-accent/10 pointer-events-none">
              <Quote size={56} />
            </div>
            
            <blockquote className="relative z-10 text-sm sm:text-base leading-7 text-[rgba(214,207,191,0.85)] max-w-4xl italic pl-6 border-l-2 border-accent/40">
              «Технологии — это инструмент. Важно то, как мы применяем их, чтобы решать реальные инженерные задачи и улучшать качество жизни людей.»
            </blockquote>
            
            <div className="mt-4 pl-6 text-right font-mono text-[9px] uppercase tracking-wider text-titanium">
              — Никита Кизевич / <span className="text-accent font-semibold">AI ARCHITECT</span>
            </div>
          </div>
        </section>

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
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel bg-accent px-6 py-2.5 text-xs font-bold text-void-black hover:opacity-95 hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(183,255,60,0.2)]"
          >
            НАПИСАТЬ МНЕ <ArrowRight size={12} />
          </Link>
        </section>
      </main>
    </>
  );
}
