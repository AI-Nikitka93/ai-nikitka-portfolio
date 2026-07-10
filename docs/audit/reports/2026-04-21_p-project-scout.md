# PROJECT DOSSIER: AI_Nikitka93 Portfolio

**Дата анализа:** 2026-04-21 14:30  
**Аналитик:** P-PROJECT-SCOUT  
**Путь проекта:** `M:\Projects\sites\ai-nikitka-portfolio`  
**Тип проекта:** Personal Brand Portfolio / Commercial Website  
**Статус полноты анализа:** FULL

---

## 1. QUICK IDENTITY

- **Что это за проект:** Личный портфолио-сайт для Никиты Кизевича (AI_Nikitka93), включающий витрину проектов, блог, калькулятор услуг и AI-помощника по сайту.
- **Для кого он:** Работодатели, потенциальные клиенты, профессиональное сообщество в области AI.
- **Основной стек:** Next.js 16.2.3 (App Router) + React 19.2.4 + Tailwind CSS v4 + TypeScript 5
- **Основной режим запуска:** Static-first SSG с selective server components для будущих интерактивных поверхностей
- **Общий уровень зрелости:** **Scaffold Complete / Content Implementation Pending** — архитектура и routing готовы, но страницы содержат только placeholder shells без финального контента

---

## 2. DIRECTORY COVERAGE

| Папка / зона | Статус | Что найдено | Насколько важно |
|---|---|---|---|
| `src/app/*` | **reviewed** | Полный набор route shells для всех страниц sitemap: homepage, about, portfolio, blog, services-calculator, ai-assistant, links, awards-credentials, 404, robots, sitemap | **high** |
| `src/components/*` | **reviewed** | Shared UI shells: SiteHeader, SiteFooter, PageShell | **high** |
| `src/lib/*` | **reviewed** | Site config (`site.ts`) и MDX content utility (`mdx.ts`) | **high** |
| `content/blog/*` | **reviewed** | Пустая директория с `.gitkeep` — контент не добавлен | **high** |
| `content/portfolio/*` | **reviewed** | Пустая директория с `.gitkeep` — контент не добавлен | **high** |
| `docs/*` | **reviewed** | Полная проектная документация: стратегия, SEO, дизайн, handoff, история, решения | **high** |
| `docs/stitch/*` | **reviewed** | Visual design artifacts: exploration, refinement, final screens | **medium** |
| `.next/` | **skipped** | Build output — generated | **low** |
| `node_modules/` | **skipped** | Dependencies — standard | **low** |

---

## 3. FILES THAT DEFINE THE PROJECT

| Файл | Роль | Почему важен |
|---|---|---|
| `AGENTS.md` | Project context and memory map | Определяет цель проекта, текущую фазу, source of truth и ограничения позиционирования |
| `EXECUTION_PLAN.md` | High-level roadmap | Показывает, что scaffold завершен (step 6 DONE), следующий шаг — UI implementation |
| `docs/PORTFOLIO_STRATEGY.md` | Product strategy artifact | Полная стратегия позиционирования, sitemap, homepage structure, services logic, AI bot constraints |
| `docs/IMPLEMENTATION_HANDOFF.md` | Technical handoff | Framework choice, route map, content model, production copy skeleton |
| `docs/DESIGN_CONCEPT.md` | Visual system documentation | Winning design direction, screen inventory, UI foundations |
| `docs/SEO_AND_DOMAIN_STRATEGY.md` | SEO and domain strategy | Domain recommendations, hosting strategy, metadata mapping, indexing plan |
| `docs/STATE.md` | Current project state | Tracks current goal, task status, blockers, artifacts |
| `package.json` | Dependency manifest | Defines tech stack: Next.js 16, React 19, Tailwind v4, gray-matter, lucide-react |
| `src/app/layout.tsx` | Root layout | Global metadata, fonts (Manrope + IBM Plex Mono), header/footer structure |
| `src/lib/site.ts` | Site configuration | Brand strings, navigation structure, canonical URL |
| `src/lib/mdx.ts` | Content utility | MDX/markdown reader for blog and portfolio content |
| `src/app/globals.css` | Design tokens | Color system, typography, dark theme implementation |
| `tailwind.config.ts` | Tailwind configuration | Extended theme with custom colors, shadows, border radius |

---

## 4. TECH STACK & RUNTIME MAP

### Языки
- **TypeScript** 5.9.3 (strict mode enabled)
- **CSS** (via Tailwind CSS v4)
- **MDX/Markdown** (для blog и portfolio content)

### Фреймворки
- **Next.js** 16.2.3 (App Router)
- **React** 19.2.4 + React DOM 19.2.4
- **Tailwind CSS** 4.2.2 + @tailwindcss/postcss

### Пакетный менеджер
- **npm** (lockfile: `package-lock.json`)

### БД / storage
- **File-based content** (MDX/markdown в `content/blog` и `content/portfolio`)
- Нет database layer на текущем этапе

### Внешние интеграции
- **CONFIRMED:** Нет активных интеграций в scaffold
- **PLANNED:** AI assistant endpoint (будущий server route)
- **PLANNED:** Contact/calculator form submission (будущий server route)

### Entry points
- **Development:** `npm run dev` → `next dev`
- **Production build:** `npm run build` → `next build`
- **Production start:** `npm run start` → `next start`
- **Linting:** `npm run lint` → `eslint .`
- **Type checking:** `npm run typecheck` → `tsc --noEmit`

### Команды запуска / сборки / тестов
```bash
npm run dev        # Development server
npm run build      # Production build (VERIFIED: passes)
npm run start      # Production server
npm run lint       # ESLint check (VERIFIED: passes)
npm run typecheck  # TypeScript validation
```

### Env / secrets expectations
- **CONFIRMED:** Нет `.env` файлов в проекте
- **LIKELY:** Потребуется для AI assistant API keys в будущем
- **NOT VERIFIED:** Deployment environment variables

### Платформа запуска
- **Recommended:** Vercel Hobby (free tier with custom domain)
- **Alternative:** Cloudflare Pages
- **Current:** Local development only

---

## 5. WHAT THE PROJECT ACTUALLY DOES

### CONFIRMED

✅ **Next.js App Router scaffold полностью реализован:**
- Все route shells существуют и компилируются
- Global layout с metadata, fonts, header/footer работает
- SEO primitives (robots.txt, sitemap.xml) генерируются
- Build проходит успешно: 13 routes, все static/dynamic правильно размечены

✅ **Design system foundations реализованы:**
- Calm dark color palette с powder blue accents
- Custom Tailwind tokens для surface, accent, border
- Typography: Manrope (sans) + IBM Plex Mono (mono)
- Responsive layout utilities

✅ **Content infrastructure готова:**
- MDX reader utility (`src/lib/mdx.ts`) с поддержкой frontmatter
- Content directories созданы (`content/blog`, `content/portfolio`)
- Dynamic routes для `[slug]` pages настроены

✅ **Shared components существуют:**
- `SiteHeader` с navigation
- `SiteFooter` с brand info
- `PageShell` как reusable page template

### LIKELY

⚠️ **Страницы функционируют как shells, но не содержат финального контента:**
- Все pages используют `PageShell` с placeholder text
- Нет реальных blog posts или portfolio cases
- Калькулятор и AI assistant — только UI shells без логики

⚠️ **Metadata частично реализована:**
- Page-level titles и descriptions существуют
- OG tags настроены в root layout
- Но dynamic metadata для blog/portfolio posts будет генерироваться из пустых content directories

### NOT VERIFIED

❓ **Deployment configuration:**
- Нет `vercel.json` или deployment config
- Не проверено, настроен ли custom domain
- Не проверено, работает ли production build на hosting

❓ **Content population:**
- Нет реальных MDX файлов в `content/blog` или `content/portfolio`
- Не проверено, как будет выглядеть rendered content

❓ **Interactive features:**
- Services calculator logic не реализована
- AI assistant backend не существует
- Contact forms не реализованы

---

## 6. ARCHITECTURE MAP

| Область | Что отвечает | Ключевые файлы | Риски / замечания |
|---|---|---|---|
| **Routing** | Next.js App Router file-based routing | `src/app/**/page.tsx` | ✅ Все routes существуют; ⚠️ Dynamic routes вернут 404 без content |
| **Layout** | Global layout, metadata, fonts | `src/app/layout.tsx` | ✅ Solid foundation; canonical URL hardcoded to `kizevich.com` |
| **Styling** | Tailwind CSS v4 + custom tokens | `src/app/globals.css`, `tailwind.config.ts` | ✅ Design system implemented; ⚠️ Некоторые utility classes могут потребовать расширения |
| **Content** | File-based MDX/markdown | `src/lib/mdx.ts`, `content/**/*.md(x)` | ⚠️ Content directories пустые; utility готова, но не протестирована с реальными файлами |
| **Components** | Shared UI shells | `src/components/*.tsx` | ✅ Basic shells exist; ⚠️ Нужны специализированные компоненты для каждой страницы |
| **Site Config** | Brand strings, navigation | `src/lib/site.ts` | ✅ Clean single source of truth |
| **SEO** | Metadata, robots, sitemap | `src/app/layout.tsx`, `robots.ts`, `sitemap.ts` | ✅ Baseline solid; ⚠️ Dynamic content metadata не протестирована |
| **Type Safety** | TypeScript strict mode | `tsconfig.json` | ✅ Strict mode enabled, no type errors |

---

## 7. FEATURE MAP

| Фича / capability | Статус | Доказательство |
|---|---|---|
| **Homepage** | shell only | `src/app/page.tsx` — PageShell с placeholder |
| **About page** | shell only | `src/app/about/page.tsx` — PageShell с placeholder |
| **Portfolio catalog** | shell only | `src/app/portfolio/page.tsx` — PageShell без case cards |
| **Portfolio detail pages** | route exists | `src/app/portfolio/[slug]/page.tsx` — dynamic route, но content пустая |
| **Blog index** | shell only | `src/app/blog/page.tsx` — PageShell без post list |
| **Blog detail pages** | route exists | `src/app/blog/[slug]/page.tsx` — dynamic route, но content пустая |
| **Services calculator** | shell only | `src/app/services-calculator/page.tsx` — placeholder grid, нет logic |
| **AI assistant** | shell only | `src/app/ai-assistant/page.tsx` — placeholder grid, нет chat logic |
| **Awards/credentials** | shell only | `src/app/awards-credentials/page.tsx` — PageShell без proof items |
| **Links/contacts** | shell only | `src/app/links/page.tsx` — PageShell без social links |
| **404 page** | confirmed | `src/app/not-found.tsx` — branded error page с CTAs |
| **Robots.txt** | confirmed | `src/app/robots.ts` — generates valid robots.txt |
| **Sitemap.xml** | confirmed | `src/app/sitemap.ts` — generates sitemap для static routes |
| **Responsive header** | confirmed | `src/components/site-header.tsx` — sticky header с navigation |
| **Footer** | confirmed | `src/components/site-footer.tsx` — brand info + quick links |
| **MDX content reader** | likely working | `src/lib/mdx.ts` — utility exists, но не протестирована с реальными файлами |

---

## 8. CURRENT QUALITY SIGNALS

### Сильные стороны

✅ **Архитектура чистая и хорошо документированная:**
- Полная проектная документация в `docs/`
- Четкое разделение strategy → design → implementation
- Все решения зафиксированы в `docs/DECISIONS.md`

✅ **Tech stack современный и правильно выбран:**
- Next.js 16 App Router — правильный выбор для этого типа проекта
- Tailwind CSS v4 — современная версия с улучшенной DX
- TypeScript strict mode — хорошая type safety

✅ **Build и lint проходят без ошибок:**
- `npm run build` успешно собирает все routes
- `npm run lint` не находит проблем
- Нет TypeScript errors

✅ **SEO foundations правильно реализованы:**
- Metadata API используется корректно
- robots.txt и sitemap.xml генерируются
- Canonical URL настроен

✅ **Design system последовательный:**
- Calm dark palette соответствует approved visual direction
- Custom tokens правильно настроены
- Typography choices реализованы

### Слабые места

⚠️ **Нет реального контента:**
- `content/blog` и `content/portfolio` пустые
- Все pages — placeholder shells
- Невозможно протестировать content rendering flow

⚠️ **Интерактивные features не реализованы:**
- Services calculator — только UI shell
- AI assistant — только UI shell
- Нет form handling
- Нет server routes

⚠️ **Нет тестов:**
- Нет unit tests
- Нет integration tests
- Нет E2E tests
- MDX utility не протестирована

⚠️ **Deployment не настроен:**
- Нет deployment configuration
- Custom domain не подключен
- Production environment не проверен

⚠️ **Некоторые UI компоненты слишком generic:**
- `PageShell` используется везде одинаково
- Нет специализированных компонентов для разных типов страниц
- Нет proof chips, case cards, blog post cards и т.д.

### Точки неясности

❓ **Content strategy execution:**
- Какие именно blog posts будут добавлены первыми?
- Какие portfolio cases будут приоритетными?
- Где взять реальные изображения для cases?

❓ **Services pricing:**
- Документация говорит "не показывать цены до validation"
- Но как именно будет работать calculator output?
- Нужна ли CRM integration для brief capture?

❓ **AI assistant implementation:**
- Какой AI provider будет использоваться?
- Как будет ограничиваться scope (только site knowledge)?
- Нужна ли RAG система или достаточно prompt engineering?

❓ **Performance optimization:**
- Нужны ли image optimization utilities?
- Будут ли использоваться Next.js Image component?
- Нужна ли code splitting для interactive pages?

---

## 9. RISK MAP BEFORE IMPROVEMENT

### 🔴 HIGH RISK

**SCT-001: Content directories пустые — dynamic routes вернут 404**
- **Impact:** Blog и portfolio detail pages не будут работать без content
- **Mitigation:** Добавить хотя бы 1-2 sample MDX files для тестирования
- **Status:** `open`

**SCT-002: Нет deployment configuration — production launch заблокирован**
- **Impact:** Невозможно deploy на Vercel/Cloudflare без config
- **Mitigation:** Добавить deployment config и подключить custom domain
- **Status:** `open`

**SCT-003: AI assistant и calculator — только shells без backend logic**
- **Impact:** Две ключевые conversion surfaces не функциональны
- **Mitigation:** Реализовать хотя бы MVP logic для calculator; AI assistant может быть phase 2
- **Status:** `open`

### 🟡 MEDIUM RISK

**SCT-004: MDX utility не протестирована с реальными файлами**
- **Impact:** Могут быть bugs в frontmatter parsing или content rendering
- **Mitigation:** Добавить sample content и протестировать rendering
- **Status:** `open`

**SCT-005: Нет специализированных UI компонентов для content types**
- **Impact:** Все pages выглядят одинаково generic
- **Mitigation:** Создать CaseCard, BlogPostCard, ProofChip, ServiceCard и т.д.
- **Status:** `open`

**SCT-006: Hardcoded canonical URL может конфликтовать с deployment**
- **Impact:** Если deploy на staging subdomain, canonical будет неправильным
- **Mitigation:** Использовать environment variable для canonical URL
- **Status:** `open`

### 🟢 LOW RISK

**SCT-007: Нет image optimization strategy**
- **Impact:** Могут быть performance issues с large images
- **Mitigation:** Использовать Next.js Image component когда добавляется контент
- **Status:** `accepted_risk`

**SCT-008: Нет error boundaries для client components**
- **Impact:** Errors в будущих client components могут crash всю страницу
- **Mitigation:** Добавить error boundaries когда появятся client components
- **Status:** `accepted_risk`

---

## 10. IMPROVEMENT CANDIDATE AREAS

| Зона | Почему стоит улучшать | Тип задачи |
|---|---|---|
| **Content population** | Без контента сайт не может быть запущен | **product** |
| **Homepage implementation** | Главная — ключевая conversion surface, сейчас только shell | **UX** + **product** |
| **Portfolio case cards** | Нужны для catalog page и homepage featured section | **UX** + **architecture** |
| **Blog post rendering** | Нужен proper article layout с typography и code highlighting | **UX** |
| **Services calculator logic** | Ключевая conversion feature, сейчас только placeholder | **product** + **architecture** |
| **AI assistant MVP** | Differentiator feature, но может быть phase 2 | **product** + **architecture** |
| **Proof chips component** | Используется на homepage, about, awards — нужен reusable component | **UX** |
| **Deployment setup** | Блокирует production launch | **release** |
| **Content testing** | MDX utility нужно протестировать с реальными файлами | **bugfix** |
| **Mobile navigation** | Header показывает desktop nav, но нет mobile menu | **UX** |
| **Image optimization** | Нужна strategy для portfolio images | **perf** |
| **Form handling** | Нужно для calculator brief capture и contact forms | **architecture** |
| **Error handling** | Нужны error boundaries и better error states | **architecture** |
| **Analytics setup** | Нужно для tracking conversions после launch | **product** |
| **SEO testing** | Metadata нужно проверить в production environment | **release** |

---

## 11. WHAT THE ORCHESTRATOR SHOULD KNOW

### Что уже есть и не надо выдумывать

✅ **Архитектура и routing полностью готовы:**
- Все routes существуют и компилируются
- Layout, metadata, SEO primitives реализованы
- Design system foundations на месте

✅ **Документация исчерпывающая:**
- Полная product strategy в `docs/PORTFOLIO_STRATEGY.md`
- Technical handoff в `docs/IMPLEMENTATION_HANDOFF.md`
- Visual system в `docs/DESIGN_CONCEPT.md`
- SEO strategy в `docs/SEO_AND_DOMAIN_STRATEGY.md`

✅ **Tech stack выбран правильно:**
- Next.js App Router — правильный выбор для этого проекта
- Не нужно пересматривать framework choice

### Что критично не сломать

🔒 **Design system consistency:**
- Calm dark palette с powder blue accents
- Manrope + IBM Plex Mono typography
- Proof-first positioning tone

🔒 **SEO foundations:**
- Canonical URL structure
- Metadata patterns
- robots.txt и sitemap.xml generation

🔒 **Brand positioning:**
- "Prompt-first AI practitioner" — не "AI expert" или "senior developer"
- Proof-based claims only
- Modest, factual tone

🔒 **Content boundaries:**
- Нет политики, личных деталей, grievance narratives
- AI assistant ограничен site knowledge only
- Services calculator не показывает invented prices

### Какие ограничения уже видны

⚠️ **Content не готов:**
- Blog posts нужно curate из Telegram channel
- Portfolio cases нужно написать с нуля
- Awards/credentials нужно собрать из source materials

⚠️ **Services pricing не утвержден:**
- Calculator может показывать только complexity classes
- Нельзя публиковать fixed prices без founder validation

⚠️ **Domain не куплен:**
- Рекомендация: `kizevich.com`
- Deployment заблокирован до покупки domain

⚠️ **AI assistant требует backend:**
- Нужен AI provider (OpenAI, Anthropic, etc.)
- Нужна RAG или knowledge base strategy
- Нужны API keys и rate limiting

### Какие неизвестности надо закрыть до серьёзных правок

❓ **Content selection:**
- Какие 3-5 blog posts пойдут в первый launch?
- Какие portfolio cases будут flagship?
- Где взять images для cases?

❓ **Services scope:**
- Какие услуги Nikita готов продавать сразу?
- Какой минимальный scope для calculator MVP?
- Нужна ли CRM integration?

❓ **AI assistant scope:**
- Phase 1 или phase 2 feature?
- Какой AI provider?
- Какой budget на API calls?

❓ **Deployment timeline:**
- Когда планируется покупка domain?
- Какой hosting provider будет использоваться?
- Нужен ли staging environment?

---

## 12. ORCHESTRATOR HANDOFF BLOCK

**Скопируй этот блок в P-ORCHESTRATOR:**

```
Проект: AI_Nikitka93 Portfolio (Personal Brand Website)
Тип: Commercial personal portfolio with blog, services calculator, AI assistant
Текущее состояние: Scaffold DONE, Content Implementation PENDING

Подтверждённые сильные стороны:
- Чистая архитектура с полной документацией
- Правильный tech stack (Next.js 16 App Router + Tailwind v4)
- Build и lint проходят без ошибок
- SEO foundations правильно реализованы
- Design system последовательный и соответствует approved direction

Главные слабые места:
- Content directories пустые (blog и portfolio)
- Все pages — только placeholder shells
- Интерактивные features (calculator, AI assistant) не реализованы
- Нет deployment configuration
- Нет тестов

Главные риски:
- HIGH: Dynamic routes вернут 404 без content (SCT-001)
- HIGH: Production launch заблокирован без deployment config (SCT-002)
- HIGH: Conversion surfaces (calculator, AI assistant) не функциональны (SCT-003)
- MEDIUM: MDX utility не протестирована (SCT-004)
- MEDIUM: Нет специализированных UI компонентов (SCT-005)

Что неясно:
- Какой контент будет добавлен первым (blog posts, portfolio cases)
- Какие услуги и pricing будут в calculator
- Когда и как будет реализован AI assistant
- Когда будет куплен domain и настроен deployment

Какие классы задач вероятнее всего нужны:
1. PRODUCT: Content population (blog posts, portfolio cases, awards)
2. UX: Homepage implementation с proof bar, featured cases, services preview
3. UX: Portfolio и blog UI components (case cards, post cards, proof chips)
4. ARCHITECTURE: Services calculator logic (multi-step flow, complexity estimation)
5. RELEASE: Deployment setup (Vercel config, custom domain, environment variables)
6. PRODUCT: AI assistant MVP (если phase 1) или defer to phase 2

Какие prompt families стоит рассмотреть в shortlist:
- P-CONTENT-STRATEGY — для content selection и curation
- P-UX-IMPLEMENTATION — для homepage и component implementation
- P-PRODUCT-FEATURE — для calculator и AI assistant logic
- P-RELEASE-PREP — для deployment setup
- P-FUNCTIONAL — для gap analysis между strategy и current state

Что НЕ нужно предполагать без проверки:
- Не предполагать, что MDX utility работает без тестирования с реальными файлами
- Не предполагать, что можно показывать fixed prices в calculator
- Не предполагать, что AI assistant должен быть в phase 1
- Не предполагать, что можно deploy без custom domain
- Не предполагать, что можно использовать любой контент из Telegram без curation
```

---

## 13. NEXT PROMPT SUGGESTIONS

### Для общего маршрута
- **`P-ORCHESTRATOR`** — получит этот dossier и выберет цепочку действий

### Для контента
- **`P-CONTENT-STRATEGY`** — для selection и curation blog posts и portfolio cases
- **`P-CONTENT-WRITER`** — для написания production copy для homepage и about page

### Для UI implementation
- **`P-UX-IMPLEMENTATION`** — для реализации homepage, portfolio catalog, blog index
- **`P-COMPONENT-LIBRARY`** — для создания reusable components (CaseCard, ProofChip, etc.)

### Для product features
- **`P-PRODUCT-FEATURE`** — для реализации services calculator logic
- **`P-AI-INTEGRATION`** — для AI assistant implementation (если phase 1)

### Для release
- **`P-RELEASE-PREP`** — для deployment setup и production checklist
- **`P-SEO-AUDIT`** — для проверки metadata и indexing после deployment

### Для gap analysis
- **`P-FUNCTIONAL`** — для анализа gaps между strategy docs и current implementation
- **`P-AUDIT`** — для readiness audit перед launch

---

## 14. AUDIT MEMORY HANDOFF

- **Report Path:** `docs/audit/reports/2026-04-21_p-project-scout.md`
- **Opened / Updated IDs:** `SCT-001`, `SCT-002`, `SCT-003`, `SCT-004`, `SCT-005`, `SCT-006`, `SCT-007`, `SCT-008`
- **Status Changes:** All issues marked as `open` except `SCT-007` and `SCT-008` marked as `accepted_risk`
- **Next Owner:** `P-ORCHESTRATOR` or `P-EVAL-ROUTER`

---

## VERIFICATION CHECKLIST

- [x] Я реально прошёл по структуре проекта, а не только по корню
- [x] Я отделил confirmed от likely и not verified
- [x] Я указал, какие файлы действительно определяют проект
- [x] Я не перепутал "есть код" с "фича работает"
- [x] Я дал handoff-блок, который можно вставить в оркестратор
- [x] Я не начал сам выбирать финальный маршрут улучшений вместо оркестратора

---

**Конец dossier. Готов к передаче в P-ORCHESTRATOR.**
