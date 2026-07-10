# IMPLEMENTATION HANDOFF

Проверено: `2026-04-10`

Связанные артефакты:
- `docs/PORTFOLIO_STRATEGY.md`
- `docs/SEO_AND_DOMAIN_STRATEGY.md`
- `docs/DESIGN_CONCEPT.md`

## Purpose

Этот документ закрывает переход от стратегии и визуального концепта к технической реализации.
Он фиксирует:
- рекомендуемый framework;
- high-level implementation direction;
- route map;
- content model;
- page-level production copy skeleton;
- ограничения для разработки, чтобы не потерять tone, SEO и proof-first positioning.

## Recommended Stack Direction

### Recommendation

**Primary recommendation: `Next.js App Router`**

### Why Next.js wins for this project

Это не просто контентный сайт. У проекта есть три разных класса поверхностей:
- статические брендовые страницы с сильным SEO-слоем;
- блог и кейсы с удобной page-level metadata логикой;
- интерактивные product-like поверхности: `services-calculator` и `ai-assistant`.

Поэтому лучший баланс дает `Next.js App Router` со стратегией:
- **static-first** для большинства страниц;
- **route handlers** только там, где появится server-side логика для формы, калькулятора или AI assistant;
- **MDX/content-driven pages** для блога и кейсов;
- **built-in metadata** для title, description, OG, robots и sitemap.

### Official source check used for this recommendation

Проверено по официальным docs на `2026-04-10`:
- Next.js docs: Metadata and OG images
- Next.js docs: Route Handlers
- Next.js docs: MDX guide
- Astro docs: Content collections
- Astro docs: Islands architecture
- Astro docs: On-demand rendering

### Why Astro is not the primary pick

`Astro` остается хорошим fallback для контентного сайта и дал бы сильную производительность по умолчанию.
Но для этого проекта он проигрывает по общему удобству, потому что:
- AI assistant почти наверняка потребует server endpoints;
- калькулятору нужен state-heavy flow и, возможно, отправка заявки;
- позже сайт проще расширять в сторону product-like surfaces внутри Next App Router, чем пересобирать архитектуру после content-first старта.

### Inference Boundary

- **Observed:** у Next.js есть встроенные metadata APIs, route handlers и MDX-first guidance; у Astro есть content collections, islands и on-demand rendering.
- **Inferred:** для этого конкретного набора экранов и будущих функций Next.js уменьшит архитектурные компромиссы на следующем шаге.

## High-Level Architecture Direction

### Product format

- Primary format: `Web`
- Rendering strategy: `static-first with selective interactivity`
- Architectural direction: `modular monolith`

### Core principle

Сайт должен вести себя как быстрый SEO-friendly portfolio, а не как dashboard.
Интерактивность добавляется только туда, где она реально усиливает job:
- калькулятор;
- AI assistant;
- фильтры каталога;
- возможно подписка / форма контакта позже.

### Non-goals for the first implementation pass

- Не строить полноценную CMS до первой публичной версии.
- Не делать сложную auth-систему.
- Не превращать AI assistant в general-purpose chatbot.
- Не реализовывать публичную pricing engine с финальными ценами до подтверждения оффера.

## Routing Model

| Route | Type | Rendering | Purpose |
|---|---|---|---|
| `/` | static page | prerender | Главная витрина бренда и конверсии |
| `/about` | static page | prerender | Путь Никиты в AI, подход, навыки, рамки |
| `/portfolio` | static page + client filtering | prerender + client islands | Каталог кейсов |
| `/portfolio/[slug]` | content page | prerender from content source | Детальный кейс |
| `/awards-credentials` | static/content page | prerender | Награды, дипломы, сертификаты, упоминания |
| `/blog` | content index | prerender | Список статей |
| `/blog/[slug]` | content page | prerender from content source | Статья |
| `/services-calculator` | interactive page | static shell + client state | Выбор услуги и scope estimate |
| `/ai-assistant` | interactive page | static shell + selective server integration later | Чат-интерфейс помощника по сайту |
| `/links` | static page | prerender | Контакты и внешние профили |
| `/404` | system page | framework not-found | Строгая branded error surface |

### Expected server routes later

Эти маршруты не обязаны существовать на первом коммите scaffold, но архитектура должна их допускать:
- `/api/contact` — отправка заявки/брифа
- `/api/calculator-request` — захват результата калькулятора в письмо или CRM позже
- `/api/assistant` — ограниченный AI endpoint только по знаниям сайта

## Content Model

### Required entities

| Entity | Purpose | Notes |
|---|---|---|
| `siteProfile` | имя, никнейм, hero copy, контакты, short bio | один источник истины для global brand strings |
| `proofItems` | короткие proof chips для главной и about | награды, места, упоминания, хакатоны |
| `portfolioCases` | кейсы для каталога и detail pages | slug, category, summary, tools, proof, gallery placeholders |
| `awardsEntries` | awards / credentials timeline | награды, дипломы, сертификаты, медиа-упоминания |
| `blogPosts` | статьи и заметки | slug, date, excerpt, tags, body |
| `services` | определения услуг для калькулятора и preview blocks | без inventing fixed prices |
| `links` | внешний link hub | LinkedIn, Telegram, YouTube, email, awards profiles |
| `assistantGuardrails` | публичные ограничения и allowed topics | использовать для AI assistant behavior |

### Recommended case categories

- `AI Video`
- `AI Images`
- `Agents & Prototypes`
- `Hackathons & Experiments`

### Required flagship cases for first launch

- `labstory-helix`
- `kinomatik`
- `35awards`
- `minimax-agent-challenge`
- `hackathons-experiments`

### Required blog posture

Блог должен быть curated, а не exhaust-dump из Telegram.
На первый релиз лучше выбрать:
- 3-5 strongest articles;
- тексты, которые усиливают образ thoughtful practitioner;
- без политической полемики и grievance-tone.

## Production Copy Skeleton

Ниже не финальная верстка, а approved content skeleton для реализации.
Тон: спокойный, доказательный, без self-hype.

### `/`

**Title**
- `Никита Кизевич / AI_Nikitka93 — AI-портфолио, проекты, блог`

**H1**
- `Никита Кизевич — prompt-first AI practitioner`

**Hero supporting text**
- `Делаю AI-видео, визуалы, агентские прототипы и экспериментальные системы на стыке креатива, практики и настойчивого исследования инструментов.`

**Primary CTAs**
- `Смотреть проекты`
- `Открыть калькулятор услуг`
- `Спросить ИИ-помощника`

**Required homepage sections**
- Proof bar with 5-6 facts
- What I do
- Featured projects
- Services preview
- AI assistant preview
- Blog preview
- Credentials preview
- Contact/footer

### `/about`

**Title**
- `О Никите Кизевиче — путь AI_Nikitka93 в AI`

**H1**
- `О Никите Кизевиче`

**Lead**
- `Я пришел в AI не через классическую инженерную карьерную лестницу, а через самостоятельные эксперименты, визуальные проекты, prompt-системы и практику на реальных задачах и конкурсах.`

**Required blocks**
- Short bio in 6-8 facts
- Work approach
- What Nikita is strong at
- Guardrails: what he does not claim
- Timeline into AI

### `/portfolio`

**Title**
- `Портфолио Никиты Кизевича — AI-видео, визуалы, агенты`

**H1**
- `Портфолио`

**Lead**
- `Здесь собраны кейсы, где важны не только картинки и эффекты, но и понятный результат: награды, шорт-листы, рабочие прототипы и завершенные AI-эксперименты.`

**Required UI**
- Category filter
- Featured case row
- Case cards with proof/result line

### `/portfolio/[slug]`

**Template H1 pattern**
- `[Название кейса]`

**Intro pattern**
- `Проект Никиты Кизевича (AI_Nikitka93) о [тема / задача].`

**Required blocks**
- Context / problem
- What was made
- Tools / workflow
- Constraints
- Result / recognition
- Gallery or media placeholders
- Lessons / relevance
- Related cases

### `/awards-credentials`

**Title**
- `Награды и достижения — Никита Кизевич / AI_Nikitka93`

**H1**
- `Награды и достижения`

**Lead**
- `Здесь собраны награды, шорт-листы, сертификаты и публичные подтверждения того, что моя работа замечена не только внутри личных экспериментов, но и во внешних конкурсах и проектах.`

**Required groups**
- Awards
- Hackathons
- Certificates
- Media mentions

### `/blog`

**Title**
- `Блог Никиты Кизевича (AI_Nikitka93) об ИИ`

**H1**
- `Блог`

**Lead**
- `Пишу об ИИ как практик: что реально работает, где ломаются ожидания и как собирать полезные результаты без лишнего шума.`

**Required UI**
- Featured post
- Post grid/list
- Tags

### `/blog/[slug]`

**Required template blocks**
- Title
- Date and tag row
- Reading body
- Key takeaway box
- Related posts
- Contact / CTA footer

### `/services-calculator`

**Title**
- `Калькулятор услуг — Никита Кизевич`

**H1**
- `Калькулятор услуг`

**Lead**
- `Этот инструмент помогает понять, какой формат работы подойдет под задачу: AI-видео, визуалы, агентский прототип, prompt-система или консультация.`

**Required flow**
1. Choose service type
2. Fill service-specific parameters
3. Review complexity summary
4. Get output class: `Simple / Standard / Advanced / Custom`
5. Leave brief or switch to consultation

**Important copy rule**
- Не писать точные публичные цены до founder validation.

### `/ai-assistant`

**Title**
- `AI-помощник по сайту — Никита Кизевич`

**H1**
- `AI-помощник`

**Lead**
- `Этот помощник помогает быстро найти кейсы, понять формат услуг и увидеть подтвержденные достижения без длинного ручного поиска по сайту.`

**Required UI**
- Chat column
- Suggested prompts
- Trust / limits panel
- Link to real contact if the question becomes project-specific

### `/links`

**Title**
- `Контакты и ссылки — Никита Кизевич`

**H1**
- `Контакты и ссылки`

**Lead**
- `Основные площадки, контакты и публичные профили, где можно посмотреть работы, написать напрямую или проверить дополнительные материалы.`

### `404`

**Title**
- `404 — Страница не найдена`

**H1**
- `Страница не найдена`

**Supporting copy**
- `Возможно, ссылка устарела или страница была перемещена. Лучше вернуться на главную, открыть портфолио или воспользоваться AI-помощником.`

## Shared Component Inventory

### Global components

- Header / navigation
- Footer / contact strip
- Proof chip
- Section heading block
- CTA button pair
- Social links row

### Portfolio system

- Case card
- Category filter
- Featured case panel
- Proof/result row
- Related case list

### Blog system

- Post card
- Article header
- Article body wrapper
- Related posts block

### Conversion system

- Service card
- Calculator step card
- Calculator summary sidebar
- Brief capture block
- Contact CTA block

### Assistant system

- Suggested prompt chips
- Chat message bubble pair
- Trust / limits panel
- Escalation CTA to human contact

## SEO And Metadata Constraints

### Canonical host

- Primary host: `https://kizevich.com/`
- Redirects later:
  - `http -> https`
  - `www -> non-www`
  - optional `.by -> .com`

### Metadata rules

- Every page gets unique title and description.
- `Никита Кизевич` is the primary brand string.
- `AI_Nikitka93` is a secondary identifying string, not the only brand.
- Portfolio and blog detail pages must generate page-specific metadata from content fields.
- Awards and portfolio pages should surface proof-driven snippets, not keyword stuffing.

### Structured data to plan for later

- `Person`
- `WebSite`
- `BreadcrumbList`
- `BlogPosting` / `Article`
- possibly `CreativeWork` for portfolio cases if implementation scope allows

## AI Assistant Boundaries For Engineering

- Assistant should be site-bounded, not open-domain.
- Allowed knowledge sources:
  - published site pages
  - portfolio case summaries
  - awards and credentials page
  - services definitions
  - links and contact info
- Hard refusals:
  - politics
  - insults
  - personal/private details outside public pages
  - invented income, promises, or work history

## Calculator Boundaries For Engineering

- Complexity classifier is allowed.
- Fixed pricing engine is not allowed yet.
- Output copy should stay honest:
  - `Simple`
  - `Standard`
  - `Advanced`
  - `Custom`
- For complex or ambiguous requests the calculator should redirect to brief capture or consultation.

## Delivery Order For The Next Technical Step

1. Scaffold `Next.js App Router` project.
2. Build global layout, metadata base, and route shells.
3. Create content sources for profile, proof items, cases, awards, links, and blog posts.
4. Implement homepage, about, portfolio, case template, awards, blog index/detail, and links.
5. Implement calculator shell with client-side multi-step state.
6. Implement AI assistant UI shell with mock responses or restricted placeholder backend.
7. Add SEO primitives: metadata, sitemap, robots, OG, canonical behavior.

## Acceptance Criteria

- Framework choice is explicit: `Next.js App Router`.
- Route set covers every approved screen from strategy and visual design.
- Content model separates reusable data from page rendering.
- Page-level production copy skeleton exists for all critical routes.
- AI assistant and calculator boundaries are preserved in the technical handoff.
- SEO and domain decisions from `docs/SEO_AND_DOMAIN_STRATEGY.md` are carried into implementation constraints.
