# PROJECT UNIFIED REPORT: ai-nikitka-portfolio

**Дата анализа:** 2026-04-24 18:46
**Аналитик:** P-PROJECT-UNIFIED
**Путь проекта:** `M:\Projects\sites\ai-nikitka-portfolio`
**Режим:** FULL
**Статус полноты анализа:** FULL
**Тип проекта:** public-facing personal brand web product with content hub and planned interactive lead-gen surfaces
**Уровень зрелости:** EARLY BUILD
**Общий verdict:** Это не готовый продукт, а хорошо документированная и технически рабочая основа под личный AI-портфолио-сайт Никиты Кизевича. Продуктовая идея, sitemap, tone, visual direction и базовый Next.js scaffold уже собраны в цельную систему, но большая часть реальной пользовательской ценности еще не перенесена из docs и Stitch-артефактов в runtime.

## 1. HUMAN SUMMARY

- Что это за проект: сайт личного бренда Никиты Кизевича (`AI_Nikitka93`) с портфолио, блогом, страницей наград, калькулятором услуг и будущим AI-помощником.
- Для кого он: для работодателей, потенциальных клиентов и аудитории, которой нужно быстро понять, чем Никита занимается в AI-видео, visuals, prompt-first prototyping и экспериментах.
- Какую задачу решает: упаковать доказуемые достижения в внятный публичный продукт и превратить разрозненные артефакты, награды и тексты в один доверительный web surface.
- Как им пользуются: посетитель открывает веб-сайт, читает proof-led страницы, смотрит кейсы и статьи, позже должен получать scope estimate через калькулятор и навигацию через AI assistant.
- Что в нем главное: не код сам по себе, а связка `proof-first positioning + calm dark visual system + static-first Next.js scaffold + локальный content pipeline`.

## 2. QUICK IDENTITY

- Surface: `Web`, static-first portfolio/content site with planned interactive calculator and site-bounded AI assistant.
- Основной стек: `Next.js 16.2.3`, `React 19.2.4`, `TypeScript`, `Tailwind CSS v4`, `gray-matter`, `marked`, `lucide-react`.
- Основной режим запуска: `npm run dev`, `npm run build`, `npm run start`; дополнительно есть `.bat` wrappers.
- Главные точки входа: `src/app/layout.tsx`, `src/app/page.tsx`, `src/lib/site.ts`, `src/lib/mdx.ts`, dynamic routes in `src/app/blog/[slug]/page.tsx` and `src/app/portfolio/[slug]/page.tsx`.
- На что это похоже по зрелости: implementation-ready foundation with one validated content pipeline, not yet a finished portfolio product.

## 3. SYSTEM CONTEXT

- Пользователи / акторы: публичный посетитель сайта; Никита как владелец бренда и контента; copywriter/editor, который позже должен наполнить `content/*`.
- Внешние системы: Google Fonts via `next/font`; планируемый custom domain `kizevich.com`; предполагаемая будущая Vercel/Cloudflare deployment path описана в docs, но не реализована в repo.
- Основные входы: локальные source-of-truth файлы о Никите, docs-артефакты стратегии и дизайна, markdown-like files в `content/blog` и `content/portfolio`.
- Основные выходы: статические HTML-страницы, metadata/robots/sitemap, будущие leads through calculator/contact/assistant surfaces.
- Главный результат работы системы: публичное, скромное, proof-based представление Никиты как `prompt-first AI practitioner`, а не как generic “AI expert”.

## 4. RUNTIME & OPERATION

- Как запускается: `npm run dev` поднимает Next.js dev server на `http://localhost:3000`; `npm run build` собирает `15` routes, включая `2` dynamic SSG detail pages.
- Команды dev / build / test / run:
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run lint`
  - `npm run typecheck`
  - `.bat` wrappers: `start_all.bat`, `install.bat`, `run.bat`, `build.bat`, `clean.bat`
- Env / secrets expectations: `CONFIRMED` `.env*` files отсутствуют; код не читает `process.env`; проект пока живет без secrets.
- Storage / DB / queues / cron / workers: `CONFIRMED` отсутствуют база данных, очереди, cron, background jobs и cache layer beyond Next build cache.
- Внешние интеграции: `CONFIRMED` runtime-интеграций почти нет; нет API routes, forms, analytics, CMS, AI SDK, deployment config.
- Git / CI state: `CONFIRMED` workspace в текущем состоянии не является git repository; `CONFIRMED` `.github`, `vercel.json`, Docker files и CI/CD config отсутствуют.

## 5. WHAT THE PROJECT ACTUALLY DOES

### CONFIRMED

- Проект реализует полный App Router scaffold для заявленного sitemap: `/`, `/about`, `/portfolio`, `/portfolio/[slug]`, `/awards-credentials`, `/blog`, `/blog/[slug]`, `/services-calculator`, `/ai-assistant`, `/links`, `/404`, `robots.txt`, `sitemap.xml`.
- У проекта есть единый visual/token baseline: dark graphite palette, powder-blue accents, Manrope + IBM Plex Mono, shared header/footer/page shell.
- Реально работает filesystem content pipeline: `src/lib/mdx.ts` читает `.md`/`.mdx`, парсит frontmatter через `gray-matter`, превращает markdown в HTML через `marked`, а dynamic routes рендерят это в SSG pages.
- Есть подтвержденная runtime-проверка: `npm run lint`, `npm run typecheck` и `npm run build` проходят на дату анализа; локальный dev server поднимался и страницы рендерились.
- В репозитории есть богатая проектная память: стратегия, SEO, дизайн, implementation handoff, state/history/research, visual exports Stitch, audit артефакты.
- Есть утвержденный визуальный слой в `docs/stitch/final/*` с full-screen coverage для homepage, about, portfolio, case detail, awards, blog, article, calculator, AI assistant, links и 404.
- Есть raw source materials, из которых строится публичный narrative, и явные guardrails на то, что нельзя выносить на сайт.

### LIKELY

- Проект задуман как коммерческий personal-brand product, который должен одновременно работать как portfolio, content engine и inbound funnel для работодателей/клиентов.
- Следующий реальный milestone должен состоять не в смене архитектуры, а в переносе approved copy + visual system из docs/Stitch в actual React components.
- Реальный публичный launch скорее предполагает Vercel + custom domain `kizevich.com`, потому что эта схема последовательно закреплена в документах.

### UNCLEAR

- Какие именно услуги Никита готов продавать сразу после запуска и какой scope/pricing workflow пройдет founder validation.
- Нужен ли на релизе настоящий AI backend или достаточно bounded mock/placeholder assistant.
- Какие статьи и кейсы из сырых материалов уже окончательно одобрены для публикации, а какие пока только кандидаты.
- Будет ли site multilingual или strictly Russian-first.

### NOT VERIFIED

- Production deployment, uptime, DNS, canonical host behavior на реальном домене.
- Реальная контактная/lead capture flow, аналитика и conversion tracking.
- Mobile usability end-to-end в реальном браузере на малом viewport.
- Работа assistant, contact forms, calculator logic, filters, search, media galleries.
- Связь с реальными доказательствами во внешней сети; этот анализ намеренно опирался на локальные материалы.

## 6. CORE FLOWS

### User Flow

- Trigger: пользователь открывает публичный сайт.
- Main path: header navigation -> route shell page -> при наличии контента dynamic blog/case detail pages.
- Modules involved: `src/app/*`, `src/components/site-header.tsx`, `src/components/page-shell.tsx`.
- Output: сейчас пользователь получает общий branded scaffold и два test content pages; promised proof-led experience пока не реализован.
- Confidence: `HIGH`

### Admin / Operator Flow

- Trigger: владелец или редактор хочет добавить статью/кейс.
- Main path: создать `.md`/`.mdx` файл в `content/blog` или `content/portfolio` -> rebuild -> route gets statically generated.
- Modules involved: `src/lib/mdx.ts`, dynamic routes, `docs/CONTENT_BRIEF.md`.
- Output: новая detail page with metadata and rendered markdown.
- Confidence: `HIGH`

### System / Ingestion Flow

- Trigger: build or page generation.
- Main path: filesystem read -> `gray-matter` parse -> `marked` HTML conversion -> `generateStaticParams()` -> Next SSG output.
- Modules involved: `src/lib/mdx.ts`, `src/app/blog/[slug]/page.tsx`, `src/app/portfolio/[slug]/page.tsx`.
- Output: static content detail pages.
- Confidence: `HIGH`

### Delivery / Publishing Flow

- Trigger: local build / launch.
- Main path: `npm run build` or `build.bat` -> `.next` output -> `npm run start`.
- Modules involved: `package.json`, `.bat` scripts, Next build.
- Output: production bundle locally.
- Confidence: `MEDIUM`

### Sync / Background Jobs Flow

- Trigger: none.
- Main path: отсутствует.
- Modules involved: none.
- Output: none.
- Confidence: `HIGH`

### Legacy / Pre-Implementation Flow

- Trigger: design and strategy exploration before coding.
- Main path: raw biography + certificates + Telegram texts -> strategy docs -> SEO docs -> Stitch exploration -> implementation handoff -> scaffold.
- Modules involved: source `.txt` files and `docs/*`.
- Output: unusually strong planning substrate that still outweighs the shipped UI.
- Confidence: `HIGH`

## 7. FEATURE MAP

| Функция / capability | Статус | Evidence |
|---|---|---|
| Multi-page public site scaffold | confirmed | `src/app/*`, successful build with all routes |
| Shared branded layout and theme tokens | confirmed | `src/app/layout.tsx`, `src/app/globals.css`, `tailwind.config.ts` |
| Blog detail pages from local content | confirmed | `src/lib/mdx.ts`, `src/app/blog/[slug]/page.tsx`, `content/blog/test-mdx-pipeline.mdx` |
| Portfolio detail pages from local content | confirmed | `src/lib/mdx.ts`, `src/app/portfolio/[slug]/page.tsx`, `content/portfolio/test-case-pipeline.mdx` |
| Blog index with real listing/filtering | not_verified | `src/app/blog/page.tsx` is only a shell |
| Portfolio catalog with cards/filters | not_verified | `src/app/portfolio/page.tsx` is only a shell |
| Services calculator logic | not_verified | `src/app/services-calculator/page.tsx` renders static placeholders only |
| AI assistant logic or backend | not_verified | `src/app/ai-assistant/page.tsx`; no `api` routes or AI integrations in repo |
| SEO primitives | confirmed | `src/app/robots.ts`, `src/app/sitemap.ts`, page metadata |
| SEO detail-page correctness | confirmed_partial | metadata exists, but canonical is fixed to homepage for all pages and sitemap omits dynamic entries |
| Design system / full-screen visual direction | confirmed | `docs/DESIGN_CONCEPT.md`, `docs/stitch/final/*.png` |
| Real launch/deployment pipeline | not_verified | no `.github`, `vercel.json`, Docker, or deployment scripts |

## 8. ARCHITECTURE MAP

| Область / модуль | Что делает | Ключевые файлы | Notes |
|---|---|---|---|
| Product memory & governance | Хранит цель проекта, стратегию, constraints, decisions, history | `AGENTS.md`, `EXECUTION_PLAN.md`, `docs/STATE.md`, `docs/DECISIONS.md`, `docs/PROJECT_HISTORY.md` | Здесь лежит большая часть product truth |
| Strategy & IA layer | Определяет positioning, sitemap, calculator logic, assistant guardrails | `docs/PORTFOLIO_STRATEGY.md`, `docs/IMPLEMENTATION_HANDOFF.md` | Очень зрелый planning layer |
| Visual system layer | Фиксирует winning design direction и screen inventory | `docs/DESIGN_CONCEPT.md`, `docs/stitch/final/*` | Runtime пока не догнал этот слой |
| Runtime app shell | Глобальный layout, fonts, header/footer, page shell | `src/app/layout.tsx`, `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/components/page-shell.tsx` | Почти весь current UI строится на одном generic shell |
| Routing & page surfaces | Роуты для страниц сайта | `src/app/page.tsx`, `src/app/about/page.tsx`, etc. | Почти все страницы placeholder-level |
| Content pipeline | Чтение markdown frontmatter/content и SSG detail pages | `src/lib/mdx.ts`, `src/app/blog/[slug]/page.tsx`, `src/app/portfolio/[slug]/page.tsx` | Самая функционально завершенная часть runtime |
| SEO/runtime metadata | Site config, metadata, robots, sitemap | `src/lib/site.ts`, `src/app/robots.ts`, `src/app/sitemap.ts` | Есть базовый SEO, но есть correctness gaps |
| Local developer ops | Быстрый install/run/build/clean для Windows | `install.bat`, `run.bat`, `build.bat`, `start_all.bat`, `clean.bat` | Удобно локально, но не заменяет CI/CD |
| Audit memory | Фиксирует прошлые assessments и gaps | `docs/audit/*` | Часть этих артефактов уже устарела относительно current code |

## 9. CURRENT VS LEGACY

### Current / Primary Path

- Primary truth today = `src/*` runtime + `docs/PORTFOLIO_STRATEGY.md` + `docs/DESIGN_CONCEPT.md` + `docs/IMPLEMENTATION_HANDOFF.md` + `docs/CONTENT_BRIEF.md`.
- Реальная функциональность сегодня сосредоточена в layout/theme/route shells и MDX content detail pipeline.

### Secondary / Fallback Path

- Windows `.bat` scripts дают удобный локальный bootstrap для install/run/build.
- Test content pages служат proof-of-pipeline fallback, пока настоящие кейсы и статьи не добавлены.

### Legacy / Historical Path

- Здесь почти нет legacy code, но есть historical artifacts.
- `docs/stitch/*` и strategy docs являются upstream pre-implementation artifacts, а не runtime.
- `docs/audit/SCOUT_SUMMARY.md` и часть `docs/audit/audit_log.jsonl` уже частично устарели: они описывают пустой `content/*` и untested MDX utility, что больше не соответствует current state после добавления test content и validation.

## 10. VISUAL & DESIGN STATE

- Есть ли реальный UI / визуальный слой: `CONFIRMED` да, но в двух формах.
  - Form A: утвержденные визуальные макеты в `docs/stitch/final/*.png`
  - Form B: текущий runtime UI в Next.js, который пока намного проще макетов
- Есть ли единый стиль: `CONFIRMED` да; palette/tokens/typography последовательно совпадают между docs и code.
- Есть ли брендинг: `CONFIRMED` да; `Никита Кизевич` + `AI_Nikitka93` consistently wired into metadata and header.
- Есть ли продуктовая упаковка: `PARTIAL`; narrative и макеты productized, runtime пока scaffold-level.
- Какие экраны / ассеты реально изучены:
  - `docs/stitch/final/homepage_82042f011c9445aeb4e971c2aef40f23.png`
  - `docs/stitch/final/Калькулятор_услуг_-_Никита_Кизевич_7bc784a085f94be184d646e67d07dff1.png`
  - `docs/stitch/final/aligned_ai_assistant_1c6881a181624f3b8f8eef36f371deb0.png`
  - runtime screenshots of `/`, `/services-calculator`, `/ai-assistant`, `/blog/test-mdx-pipeline`, `/portfolio/test-case-pipeline` on local dev server

### Сильные стороны визуального слоя

- Approved design direction целостная и не выглядит шаблонной: calm dark proof grid, restrained blue accents, high proof density.
- Runtime token baseline уже поддерживает этот стиль, а не дефолтный Tailwind look.
- Typography и palette ощущаются intentional, не случайными.

### Слабые места визуального слоя

- Главный visual gap огромный: design exports выглядят как nearly productized surface, а live runtime пока generic `PageShell`.
- Нет специализированных компонентов под case cards, proof chips, article layouts, filter bars, calculator panels, assistant conversation shell.
- `CONFIRMED` mobile navigation не реализована: desktop nav hidden below `lg` in `src/components/site-header.tsx`, альтернативного mobile menu нет.
- Нет `public/` directory, нет OG assets, нет production media assets, logo system or screenshots inside runtime.

### Что не удалось подтвердить по дизайну

- Mobile viewport behavior реального runtime.
- Наличие финальных image assets, portfolio previews, logos, illustrations.
- Соответствие всех Stitch screens actual coded screens beyond palette and high-level direction.

## 11. DIRECTORY COVERAGE

| Папка / зона | Статус | Что найдено | Насколько важно |
|---|---|---|---|
| root config layer | reviewed | `package.json`, TS/Next/Tailwind/ESLint config, `.bat` scripts | high |
| `src/app` | reviewed | all route shells, layout, metadata routes, dynamic detail routes | high |
| `src/components` | reviewed | header, footer, generic page shell only | high |
| `src/lib` | reviewed | site config and content-reader utility | high |
| `content` | reviewed | only 2 test content files plus `.gitkeep` | high |
| `docs` strategy/implementation | reviewed | strong planning and handoff artifacts | high |
| `docs/stitch` | reviewed | full design exploration and final exports | high |
| `docs/audit` | reviewed | scout + quick launch memory, some stale items | medium |
| `.next` | skipped | generated build output | low |
| `node_modules` | skipped | vendor dependencies | low |
| `.vscode` | skipped | editor-local config only | low |

## 12. FILES THAT DEFINE THE PROJECT

| Файл | Роль | Почему важен |
|---|---|---|
| `AGENTS.md` | project contract | фиксирует goal, source of truth и public-safe boundaries |
| `О никите на 09.04.2026.txt` | raw founder context | upstream evidence pool, включая много непубличных деталей |
| `Электронные сертификат и обычение за несколько лет.txt` | skill/certificate evidence | подтверждает breadth обучения и AI/prompting credential cluster |
| `Статьи из еготелграм канала.txt` | raw editorial voice | показывает, какой публичный voice доступен и почему docs later curate it |
| `docs/PORTFOLIO_STRATEGY.md` | product source of truth | определяет actual product intent |
| `docs/DESIGN_CONCEPT.md` | visual source of truth | фиксирует winning interface direction |
| `docs/IMPLEMENTATION_HANDOFF.md` | code-facing spec | мост между strategy/design и runtime |
| `src/lib/mdx.ts` | most real feature logic | content ingestion pipeline lives here |
| `src/app/layout.tsx` | runtime root | fonts, metadata, global shell |
| `src/components/page-shell.tsx` | current UI pattern | explains why almost every page currently feels the same |
| `src/app/blog/[slug]/page.tsx` | validated dynamic content path | real blog detail rendering |
| `src/app/portfolio/[slug]/page.tsx` | validated dynamic content path | real case detail rendering |

## 13. CURRENT STATE ASSESSMENT

### Что уже выглядит зрелым

- Продуктовая формулировка, scope discipline и proof-first positioning.
- Документация уровня стратегии, дизайна и handoff: она unusually coherent for a repo at this implementation stage.
- Базовая архитектура static-first Next.js monolith без лишней сложности.
- Runtime hygiene на уровне scaffold: app routes, metadata, lint/typecheck/build all pass.
- Local content pipeline для detail pages реально работает.

### Что выглядит хрупким

- Почти весь actual UI опирается на один generic `PageShell`; runtime value collapses if content is absent.
- SEO слой partially broken:
  - `CONFIRMED` canonical URL on `/`, `/about` and `/blog/test-mdx-pipeline` all resolves to `https://kizevich.com`
  - `CONFIRMED` sitemap contains only static routes and omits dynamic content pages
- `published` in frontmatter schema exists, but `src/lib/mdx.ts` does not filter unpublished entries.
- “MDX” support is intentionally limited to markdown-to-HTML conversion; JSX/MDX components are not supported despite `.mdx` extension.

### Что выглядит сырым или недоделанным

- Главная, about, portfolio index, awards, blog index, links page are still shells, not real product pages.
- Calculator and AI assistant are promised conversion surfaces, but today they are explanatory placeholders.
- Blog and portfolio catalogs do not enumerate real content.
- There is no deployment config, analytics, form handling, API layer, media pipeline, or public asset directory.
- Mobile nav is incomplete.

### Главные неизвестности

- `PRJ-001`: какие реальные кейсы и статьи пройдут founder-approved public-safe curation first.
- `PRJ-002`: будет ли AI assistant на релизе настоящим или останется static/help surface.
- `PRJ-003`: как будет организован lead capture, если fixed public pricing intentionally deferred.
- `PRJ-004`: какой будет production deployment path и когда домен станет реальностью.
- `PRJ-005`: насколько большая часть Telegram-text corpus вообще пригодна для публичного блога без сильной редакторской переработки.

## 14. PRODUCT MATURITY ASSESSMENT

- Техническая зрелость: `EARLY BUILD`
  - scaffold solid, but no advanced product features beyond content detail rendering.
- Функциональная зрелость: `EARLY BUILD`
  - only core structure exists; main user value surfaces remain unimplemented.
- Визуальная зрелость: `SPLIT STATE`
  - design artifacts are `NEARLY PRODUCTIZED`; coded runtime is `EARLY BUILD`.
- Операционная зрелость: `RAW -> EARLY`
  - local scripts exist, but no deployment, no CI, no analytics, no release path.
- Почему выбран именно этот уровень зрелости:
  - проект уже больше, чем rough prototype, потому что product shape, architecture, visual direction and one content pipeline are coherent and verified;
  - но он еще явно не `WORKING BUT FRAGILE`, потому что ключевые user flows не доведены до working product state.

## 15. GROWTH AREAS

| Зона | Что можно улучшить или добавить | Почему это важно |
|---|---|---|
| Real content layer | Заменить test MDX на реальные flagship cases и curated blog posts | без этого сайт не доказывает positioning |
| Homepage and catalog implementation | Сверстать реальные homepage/portfolio/blog index surfaces по Stitch + strategy | это основной user-facing value |
| Calculator MVP | Добавить client-side step flow и honest complexity summary | это один из главных conversion hooks |
| Assistant MVP | Добавить bounded site-helper behavior или хотя бы realistic static UX | иначе один из ключевых promises остается fiction |
| SEO correctness | Исправить canonical strategy, sitemap inclusion of dynamic pages, OG assets | иначе брендовая discoverability будет слабее, чем обещает docs |
| Mobile UX | Добавить mobile navigation and small-screen verification | сейчас mobile discoverability/layout path неполный |
| Deployment path | Настроить real release workflow and domain config | без этого проект нельзя считать продуктом |
| Content governance | Встроить filtering by `published`, curator workflow, and safer markdown policy | это снизит editorial drift и accidental leakage |

## 16. CONFIDENCE & VERIFICATION LAYER

### Verified Facts

- Проект является Next.js 16 App Router application with Tailwind v4 baseline.
- Локальный runtime поднимался и рендерил homepage, calculator shell, assistant shell, blog test page и portfolio test page.
- `npm run lint`, `npm run typecheck`, `npm run build` all passed during this analysis.
- Dynamic content detail pages are generated from local filesystem content.
- Approved design exports exist locally and cover all major screens.
- No DB, queues, workers, env files, CI, deployment config, or API routes currently exist.

### Strong Inferences

- Repo is intended to become a credible lead-gen website rather than a hobby demo, because docs consistently optimize for employers + clients + proof.
- The biggest execution gap is translation from docs/Stitch into UI, not lack of strategic clarity.
- The project can accelerate quickly once content and components are added, because navigation, theme, route map and documentation are already stable.

### Open Unknowns

- Founder-approved initial content set.
- Real assistant implementation scope.
- Deployment timeline and real domain purchase.
- Real media asset strategy.
- Public contact/conversion mechanism.

### Blockers to Confirmation

- `PRJ-006`: no production deployment to inspect.
- `PRJ-007`: no real flagship content published in repo yet.
- `PRJ-008`: calculator and assistant have no working logic to test.
- `PRJ-009`: runtime does not yet embody the approved design system beyond tokens and shell.
- `PRJ-010`: mobile behavior was not fully validated in a narrow viewport session.

## 17. FINAL VERDICT

- Это уже готовый продукт или нет: нет. Это implementation-ready foundation, а не finished portfolio product.
- Что мешает считать его готовым продуктом:
  - core pages are still shells
  - real content layer is mostly absent
  - calculator and assistant are not functional
  - SEO/release details are incomplete or partially incorrect
  - runtime visual execution lags far behind approved mockups
- Что уже можно считать сильной стороной проекта:
  - unusually coherent product strategy and visual planning
  - disciplined public-safe positioning
  - technically clean scaffold with validated filesystem content pipeline
- Где главный потенциал роста:
  - в прямом переносе approved strategy + Stitch direction into real components and founder-approved content, not in rethinking the architecture from scratch
