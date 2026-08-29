import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowUpRight, 
  FileCheck2, 
  Radar, 
  SquareArrowOutUpRight, 
  Cpu, 
  Zap, 
  Activity, 
  Sliders, 
  Binary, 
  Sparkles, 
  Video, 
  Layers 
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { buildMetadata } from "@/lib/seo";

// 1. Данные для таймлайна (2014-2026)
const timeline = [
  {
    period: "2014–2021",
    nodeId: "NODE_01_ELECTRICIAN",
    title: "Электромонтер & Техник-электромеханик",
    subtitle: "Силовые цепи и промышленное электрооборудование",
    status: "COMPLETED",
    metrics: [
      { label: "Квалификация", value: "5-й разряд" },
      { label: "Допуск", value: "до и выше 1000В" },
      { label: "Группа", value: "IV группа по эл. безопасности" }
    ],
    note: "Практическая работа «руками» на промышленных объектах. Суровая школа, давшая понимание, как работают сложные физические цепи и почему любая система склонна к сбоям.",
    icon: Zap,
  },
  {
    period: "2021–2022",
    nodeId: "NODE_02_TRANSITION",
    title: "Смена вектора & Certificate Hunting",
    subtitle: "Активное самообразование и переквалификация",
    status: "MIGRATED",
    metrics: [
      { label: "Курсы", value: "50+ завершено" },
      { label: "Направления", value: "IT Support, Cisco, Web, UX" },
      { label: "Особенность", value: "Массовый сбор базы" }
    ],
    note: "Осознанный переход в IT и системное освоение технологий. Сбор фундаментальных сертификатов (Vanderbilt, Google, IBM, Cisco) для быстрой адаптации.",
    icon: Sliders,
  },
  {
    period: "2023",
    nodeId: "NODE_03_PROMPTING",
    title: "Промпт-инжиниринг & Генеративный AI",
    subtitle: "Исследование когнитивных и языковых систем",
    status: "STABLE",
    metrics: [
      { label: "Модели", value: "GPT, Midjourney, Claude" },
      { label: "Фокус", value: "Системные промпты" },
      { label: "Интеграция", value: "Сборка рабочих связок" }
    ],
    note: "Изучение логики работы LLM и генеративных алгоритмов. Разработка сложных контекстных промптов и адаптация ИИ под прикладные задачи.",
    icon: Binary,
  },
  {
    period: "2024",
    nodeId: "NODE_04_IMAGES",
    title: "ИИ-Изображения & Визуальный продакшн",
    subtitle: "Генеративная графика и нейросетевое искусство",
    status: "OPTIMIZED",
    metrics: [
      { label: "Стек", value: "Stable Diffusion, ComfyUI, MJ" },
      { label: "Конкурсы", value: "35AWARDS, Helix, КИНОМАТИК" },
      { label: "Результат", value: "Лауреат / Победитель" }
    ],
    note: "Погружение в тонкую генерацию графики. Проектирование сложных конвейеров сборки в ComfyUI, обучение LoRA и победы в профессиональных конкурсах.",
    icon: Sparkles,
  },
  {
    period: "2025",
    nodeId: "NODE_05_VIDEO",
    title: "Нейросетевое видео & Анимация",
    subtitle: "Генерация динамического медиаконтента",
    status: "ONLINE",
    metrics: [
      { label: "Инструменты", value: "Runway, Sora, Luma, Lottie" },
      { label: "Конвейер", value: "Видео + Аудиосинхронизация" },
      { label: "Специфика", value: "Темпо-ритмический монтаж" }
    ],
    note: "Разработка сложных видеопроектов на базе нейросетей. Построение процессов генерации сцен, синхронизации с аудиоэффектами и анимации веб-интерфейсов.",
    icon: Video,
  },
  {
    period: "2026",
    nodeId: "NODE_06_AGENTS",
    title: "Агентное кодирование & AI Assistants",
    subtitle: "Сборка автономных интерфейсов силами ИИ-агентов",
    status: "ACTIVE_RUNNING",
    metrics: [
      { label: "Метод", value: "Vibe-coding / Agent Triads" },
      { label: "Среда", value: "Next.js 16 / Tailwind v4" },
      { label: "Контроль", value: "100% Автономные сборки" }
    ],
    note: "Сборка и развертывание сайтов, ИИ-ассистентов и инструментов автоматизации с помощью скоординированных цепочек ИИ-агентов (Antigravity).",
    icon: Layers,
  },
] as const;

// 2. Внешние ссылки для верификации
const verificationRoutes = [
  {
    label: "Работы",
    href: "/portfolio",
    kind: "внутри сайта",
    note: "Главные работы, результаты и подтверждения собраны в одном месте.",
    external: false,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ai_nikitka93",
    kind: "внешняя площадка",
    note: "Здесь можно посмотреть видео и визуальные эксперименты на внешней площадке.",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kizevichnik/",
    kind: "деловой профиль",
    note: "Формальный профессиональный профиль для делового общения и быстрой проверки данных.",
    external: true,
  },
  {
    label: "Связи",
    href: "/links",
    kind: "контакты и ссылки",
    note: "Страница со ссылками и каналами, через которые можно перейти к проекту и автору.",
    external: false,
  },
] as const;

export const metadata: Metadata = buildMetadata({
  title: "Никита Кизевич",
  description:
    "Никита Кизевич — автор проекта AI_Nikitka93. Здесь коротко и понятно собраны основные факты, опыт и ссылки, по которым можно проверить работы.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="О себе"
      title="Никита Кизевич — автор проекта AI_Nikitka93."
      description="Здесь вы можете узнать обо мне как о человеке, моих взглядах на технологии, жизненном пути от электрика до ИИ-кодинга и принципах работы."
      actions={
        <>
          <Link
            href="/career-path"
            className="rounded-panel border border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(183,255,60,0.08)]"
          >
            Интерактивный путь
          </Link>
          <Link
            href="/education"
            className="rounded-panel border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Образование и 250+ сертификатов
          </Link>
          <Link
            href="/portfolio"
            className="rounded-panel border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-[rgba(183,255,60,0.06)]"
          >
            Открыть работы
          </Link>
          <Link
            href="/links"
            className="rounded-panel border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-[rgba(183,255,60,0.06)]"
          >
            Ссылки и контакты
          </Link>
        </>
      }
      aside={
        <div className="space-y-4">
          <div className="signal-frame signal-radial-accent rounded-panel p-5 relative overflow-hidden">
            {/* HUD Декоративная сетка */}
            <div className="absolute inset-0 signal-grid-panel opacity-10 pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <p className="signal-label text-accent">КРАТКАЯ СВОДКА</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[9px] text-accent tracking-widest uppercase">INFO</span>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {[
                { label: "Специализация", val: "Вайбкодинг, R&D ИИ-систем, нейровидео и музыкальные релизы" },
                { label: "Бэкграунд", val: "7 лет работы промышленным электриком 5-го разряда (до и выше 1000В) до перехода в ИИ" },
                { label: "Локация", val: "Минск, Беларусь" },
                { label: "Контактная линия", val: "Telegram: @AI_Nikitka93 / Email: nikitka9318@gmail.com" },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-titanium block leading-none">
                    {item.label}
                  </span>
                  <p className="text-xs leading-5 text-[rgba(214,207,191,0.85)]">
                    {item.val}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="signal-frame interactive-surface rounded-panel p-5 relative">
            <div className="absolute top-2 right-2 flex gap-1">
              <span className="w-1.5 h-1.5 bg-titanium/20" />
              <span className="w-1.5 h-1.5 bg-titanium/20" />
              <span className="w-1.5 h-1.5 bg-accent/40" />
            </div>
            <p className="signal-label">Зачем эта страница</p>
            <p className="mt-3 text-sm leading-7 text-[rgba(214,207,191,0.8)]">
              Дать понятный контекст: кто разрабатывает проект, почему технический фундамент важнее дипломов и где можно самостоятельно проверить результаты работы.
            </p>
          </div>
        </div>
      }
    >
      {/* Секция 1: Профиль и философия */}
      <ScrollReveal>
        <section className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          {/* Телеметрический формуляр профиля */}
          <div className="signal-frame rounded-shell p-6 relative overflow-hidden flex flex-col justify-between">
            {/* Декоративные HUD-уголки */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent/40" />
            
            <div>
              <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-accent animate-pulse" />
                  <p className="signal-label text-accent font-semibold">{"SYS.DOSSIER // CONFIDENTIAL"}</p>
                </div>
                <div className="font-mono text-[9px] text-titanium tracking-widest">REV_09.04.2026</div>
              </div>

              <div className="mt-6 space-y-5">
                {[
                  ["псевдонимы", "AI_Nikitka93 / Nikitka AI"],
                  ["имя", "Никита Кизевич / Nikita / Mikita Kizevich"],
                  ["исполнители", "Nikitka AI, Niko Xian, NIKITAAL, Niquiano, Kezevix, NKVIS, Nikita Kizevich"],
                  ["ии-стек", "LLM (ChatGPT, Claude, Gemini, DeepSeek) • Visual (Nanobanano Pro, Midjourney v6, Runway, Luma, Minimax, ранее Imagen 3/4) • Audio (Suno, Udio)"],
                  ["затраты на ии", "0 руб / 0 $ (за весь период по сей день)"]
                ].map(([key, value]) => (
                  <div key={key} className="border-b border-border-subtle/40 pb-3 last:border-b-0">
                    <p className="font-mono text-[10px] tracking-[0.24em] text-titanium uppercase">{key}</p>
                    <p className="mt-1.5 text-base font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Шкала интеграции навыков */}
            <div className="mt-8 pt-4 border-t border-border-subtle">
              <p className="font-mono text-[10px] tracking-[0.2em] text-titanium uppercase">SYS.INTEGRATION_LEVEL</p>
              <div className="mt-3 space-y-3">
                {[
                  { name: "PROMPTING & AGENTS", pct: 96 },
                  { name: "VISUAL NEURAL PROD", pct: 92 },
                  { name: "HARDWARE CORE BASE", pct: 88 }
                ].map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between font-mono text-[9px]">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-accent">{skill.pct}%</span>
                    </div>
                    <div className="h-1 bg-surface-muted rounded-full overflow-hidden border border-border-subtle">
                      <div 
                        className="h-full bg-accent rounded-full" 
                        style={{ width: `${skill.pct}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Философия проекта */}
          <div className="signal-frame signal-grid-panel interactive-surface rounded-shell p-6 md:p-7 relative">
            {/* Подложка сетки scanline */}
            <div className="card-scanline-container">
              <div className="card-scanline-grid" />
              <div className="card-scanline-line" />
            </div>
            
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-accent" />
              <p className="signal-label text-accent">Философия и инженерный подход</p>
            </div>
            <h2 className="mt-4 text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
              Манифест автора: философия и принципы
            </h2>
            <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.82)]">
              Я не утверждаю, что создаю безупречные цифровые продукты. Моя философия проще: я ежедневно пытаюсь создавать, исследовать и фиксировать этот процесс. Мой рабочий день проходит за экраном ПК в непрерывных тестах когнитивных систем, графических моделей и генераторов звука.
            </p>
            <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.78)]">
              Моя база — это 7 лет практической работы с электрооборудованием до и выше 1000В. Эта суровая школа навсегда отучила меня от веры в «магию» или «идеальную работу с первого запуска». Системы всегда сбоят, а ИИ — галлюцинирует.
            </p>
            <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.78)]">
              С ноября 2022 года я целенаправленно изучаю эти сбои и ограничения. Через промпт-инжиниринг, вайб-кодинг и сотни итераций я собираю рабочие интерфейсы, побеждаю в конкурсах нейросетевого искусства (КИНОМАТИК, Helix, 35AWARDS), решаю сложные олимпиадные и ML-задачи (AvitoTech ML CUP 7-е место, CodeRun 104-е место, CareBridge MedTech) и применяю ИИ в реальной жизни: от анализа градостроительных регламентов до автоматической генерации выверенных правовых документов без юридического бэкграунда. Дипломы или сертификаты здесь не так важны — ценны только реальный опыт, системный поиск решений и непрерывная практика.
            </p>
            <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.78)] border-t border-border-subtle/30 pt-4 italic">
              Но генерация картинок и видео — это лишь малая часть. Возможности ИИ огромны, и моя главная, глубинная мечта — применить эти технологии там, где они могут спасать жизни. 25 ноября 2024 года мой отец ушел из жизни из-за рака легких, и видеть, как стремительно развиваются нейросети, когда помочь самому близкому человеку уже невозможно — это тяжелый опыт. Я бы искренне хотел работать (даже на добровольных началах, бесплатно) в команде или стартапе, который занимается поиском лекарств от рака и борьбой со сложными заболеваниями с помощью ИИ. Я хочу направить все свои знания R&D и автоматизации, чтобы принести реальную пользу человечеству в борьбе с его самыми тяжелыми недугами.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Секция 2: Три фундаментальных блока */}
      <ScrollReveal delay={0.06}>
        <section className="grid gap-5 xl:grid-cols-3">
          {[
            {
              label: "Техническая база",
              value: "Путь начался с техники: электрооборудование, компьютеры, сайты, графика и понимание, как все это работает руками."
            },
            {
              label: "Образование",
              value: "Связано с электрооборудованием, кинооборудованием и аудиовизуальными системами. Есть путь от электромонтера до техника-электромеханика и 5-го разряда электромонтера."
            },
            {
              label: "Визуальная практика",
              value: "Сначала была фотография и визуальные конкурсы, потом видео, а дальше инструменты с нейросетями. Это развитие одного интереса: сделать изображение или ролик так, чтобы его можно было показать."
            }
          ].map((block) => (
            <article key={block.label} className="signal-frame interactive-surface rounded-shell p-5 relative">
              <div className="card-scanline-container">
                <div className="card-scanline-grid" />
                <div className="card-scanline-line" />
              </div>
              <p className="signal-label">{block.label}</p>
              <p className="mt-4 text-sm leading-7 text-[rgba(214,207,191,0.82)]">{block.value}</p>
            </article>
          ))}
        </section>
      </ScrollReveal>

      {/* Секция 3: Диагностическая хроника карьеры */}
      <ScrollReveal delay={0.1}>
        <section className="signal-frame rounded-shell p-6 md:p-8 relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
            <span className="font-mono text-[9px] text-titanium uppercase tracking-widest">TIMELINE_ACTIVE_NODE</span>
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
            {/* Интерактивный таймлайн */}
            <div>
              <p className="signal-label pb-6">Диагностическая хроника (2014 — 2026)</p>
              
              <div className="relative mt-2 border-l border-border-subtle pl-6 md:pl-8 space-y-8">
                {timeline.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.period} className="relative group">
                      {/* Узел-коннектор таймлайна */}
                      <span className="absolute -left-[31px] md:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-void-black border border-border transition-colors group-hover:border-accent group-hover:bg-accent/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-titanium transition-colors group-hover:bg-accent" />
                      </span>

                      {/* Заголовок этапа */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3">
                        <div className="flex items-center gap-2.5">
                          <Icon size={16} className="text-accent/60 group-hover:text-accent transition-colors" />
                          <div>
                            <span className="font-mono text-xs text-accent uppercase tracking-wider block sm:inline mr-2">
                              [{item.period}]
                            </span>
                            <span className="font-mono text-[10px] text-titanium uppercase tracking-widest">
                              {item.nodeId}
                            </span>
                          </div>
                        </div>
                        <div className="font-mono text-[9px] px-2 py-0.5 rounded border border-border-subtle bg-surface-muted/50 text-titanium group-hover:border-accent/40 group-hover:text-accent transition-colors">
                          {item.status}
                        </div>
                      </div>

                      {/* Карточка содержимого */}
                      <div className="mt-3 p-4 rounded-panel bg-surface-muted/20 border border-border-subtle group-hover:border-accent/30 group-hover:bg-surface-muted/40 transition-all">
                        <h3 className="text-lg font-bold tracking-normal text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-xs text-titanium font-mono mt-0.5">{item.subtitle}</p>
                        
                        {/* Системные метрики фазы */}
                        <div className="mt-4 grid gap-2 sm:grid-cols-3">
                          {item.metrics.map((metric) => (
                            <div key={metric.label} className="border border-border-subtle/30 bg-void-black/20 p-2 rounded-panel">
                              <p className="font-mono text-[9px] text-titanium uppercase tracking-wider">{metric.label}</p>
                              <p className="text-xs font-mono text-foreground mt-1">{metric.value}</p>
                            </div>
                          ))}
                        </div>

                        <p className="mt-4 text-sm leading-7 text-[rgba(214,207,191,0.8)]">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Вспомогательные проверочные факты справа */}
            <div className="space-y-6">
              <div className="signal-frame rounded-panel p-5 md:p-6 relative overflow-hidden bg-surface-muted/30">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/[0.02] rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
                  <FileCheck2 size={16} className="text-accent" />
                  <p className="signal-label font-semibold">Доказательная база</p>
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    "Систематизированные страницы с результатами ИИ-видео и коммерческих сайтов.",
                    "Публичные профили и подтвержденные конкурсные работы на YouTube, LinkedIn, 35AWARDS.",
                    "Принципиальное отсутствие скрытых данных: любые факты из хроники проверяются по прямым ссылкам ниже."
                  ].map((item, index) => (
                    <div key={index} className="rounded-panel border border-border-subtle bg-void-black/30 px-4 py-4 relative">
                      <div className="absolute top-4 left-2 w-1 h-2 bg-accent/40" />
                      <p className="text-sm leading-7 text-[rgba(214,207,191,0.8)] pl-2">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* HUD Контейнер с логами компиляций или системных проверок */}
              <div className="signal-frame rounded-panel p-5 md:p-6 bg-void-black/60 relative">
                <p className="signal-label text-titanium border-b border-border-subtle pb-3">{"SYSTEM_LOGS // DEPLOYMENT"}</p>
                <div className="mt-4 font-mono text-[10px] text-titanium space-y-2 leading-5">
                  <p className="text-accent">{"// AGENTIC SYSTEM INITIALIZED"}</p>
                  <p>&gt; load_context: profile_data_verified OK</p>
                  <p>&gt; load certificates: 50+ verifications OK</p>
                  <p>&gt; deploy: App Router layout compiles (Exit 0)</p>
                  <p className="text-accent-strong">{"// CURRENT STATE: PRODUCTION_ONLINE"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Секция 4: Где проверить */}
      <ScrollReveal delay={0.14}>
        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.64fr)_minmax(0,1.36fr)]">
          <div className="signal-frame signal-radial-accent interactive-surface rounded-shell p-6 flex flex-col justify-between">
            <div className="card-scanline-container">
              <div className="card-scanline-grid" />
              <div className="card-scanline-line" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <Radar size={16} className="text-accent animate-pulse" />
                <p className="signal-label text-accent">Где посмотреть и проверить</p>
              </div>
              <h2 className="mt-4 text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-normal text-foreground">
                Работы можно открыть сразу.
              </h2>
              <p className="mt-4 text-sm leading-8 text-[rgba(214,207,191,0.8)]">
                Все главные доказательства, ссылки, контакты и видеоматериалы проекта структурированы в одном месте.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {verificationRoutes.map((route) => {
              const content = (
                <div className="relative h-full flex flex-col justify-between">
                  <div className="card-scanline-container">
                    <div className="card-scanline-grid" />
                    <div className="card-scanline-line" />
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanium">
                          {route.kind}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold tracking-normal text-foreground group-hover:text-accent transition-colors">
                          {route.label}
                        </h3>
                      </div>
                      {route.external ? (
                        <SquareArrowOutUpRight size={18} className="text-titanium group-hover:text-accent transition-colors" />
                      ) : (
                        <ArrowUpRight size={18} className="text-titanium group-hover:text-accent transition-colors" />
                      )}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[rgba(214,207,191,0.82)]">{route.note}</p>
                  </div>
                </div>
              );

              return route.external ? (
                <a
                  key={route.label}
                  href={route.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="signal-frame interactive-surface rounded-shell p-5 group block"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={route.label}
                  href={route.href}
                  className="signal-frame interactive-surface rounded-shell p-5 group block"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>
      </ScrollReveal>
    </PageShell>
  );
}
