# RESEARCH LOG

## [TOPIC: Portfolio strategy for Nikita Kizevich]
_Последнее обновление: 2026-04-09 | Product Strategist_
Статус: Handoff

- Источник анализа: только локальные материалы проекта.
- Интернет-поиск не выполнялся намеренно, потому что текущее ТЗ ограничивает source of truth пользовательским контекстом.
- Использованные файлы:
  - `О никите на 09.04.2026.txt`
  - `Электронные сертификат и обычение за несколько лет.txt`
  - `Статьи из еготелграм канала.txt`
- Подтверждено:
  - 35AWARDS, LabStory / Helix, Kinomatik, MiniMax, VK RecSys, Yandex CodeRun, NVIDIA GPU hackathon, Onliner mention.
  - Prompt-first workflow, zero-budget approach, AI video / image / agent practice.
- Осталось гипотезой:
  - Какие услуги Никита готов продавать сразу после запуска сайта.
  - Нужна ли отдельная pricing page или достаточно калькулятора + заявки.

## [TOPIC: SEO, domain, and hosting strategy for Nikita Kizevich]
_Последнее обновление: 2026-04-09 | Technical SEO Engineer_
Статус: Актуально

- Выполнен интернет-поиск и проверка официальных страниц.
- Темы:
  - цены и позиционирование доменных зон;
  - бесплатный хостинг с кастомным доменом;
  - geotargeting / ccTLD / server-location guidance;
  - индексирование через Google Search Console и Yandex Webmaster;
  - live-check shortlist доменов через public registry lookup.
- Проверенные источники:
  - `https://www.namecheap.com/domains/`
  - `https://hoster.by/`
  - `https://hoster.by/service/hosting/unix/`
  - `https://vercel.com/pricing`
  - `https://vercel.com/docs/domains/working-with-domains/add-a-domain`
  - `https://developers.cloudflare.com/pages/platform/limits/`
  - `https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites`
  - `https://developers.google.com/search/docs/appearance/title-link`
  - `https://developers.google.com/search/docs/appearance/snippet`
  - `https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap`
  - `https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl`
  - `https://yandex.com/support/webmaster/en/recommendations/choosing-hosting`
  - `https://yandex.com/support/webmaster/en/indexing-options/sitemap`
  - `https://webmaster.yandex.com/welcome/`
- Подтверждено:
  - `.com` is the best primary TLD for this brand/site mix.
  - `.by` is useful as a local/defensive redirect, not necessarily as the only primary domain.
  - Vercel/Cloudflare Pages with a custom domain are valid low-cost hosting options for SEO.
  - Official Google/Yandex guidance does not justify paying for a CIS IP purely for ranking.
  - Several `.com` and `.pro` candidates returned no registration record in public RDAP checks on `2026-04-09`.
- Осталось непроверенным:
  - live availability of `.by` candidates inside the Belarusian registrar checkout flow;
  - the exact final domain the owner will purchase.

## [TOPIC: Stitch visual generation and MCP workflow for Nikita portfolio]
_Последнее обновление: 2026-04-10 | UI/UX Visual Designer_
Статус: Актуально

- Выполнена current-date проверка Stitch docs и live MCP path перед генерацией экранов.
- Темы:
  - доступность Stitch MCP;
  - способ аутентификации;
  - генерация exploration-концептов;
  - refinement winner direction;
  - full-surface generation for all required screens.
- Проверенные источники и сигналы:
  - `https://stitch.withgoogle.com/docs/mcp/setup/`
  - live MCP endpoint from environment: `STITCH_MCP_URL`
  - live auth behavior with `initialize`, `tools/list`, `create_project`, `generate_screen_from_text`, `generate_variants`, `edit_screens`
- Подтверждено:
  - MCP endpoint responds and supports the expected design-generation tool surface.
  - In this environment, tool calls worked with `x-goog-api-key`, while `Authorization: Bearer` was rejected for real mutations.
  - `list_screens` was unreliable for this flow, but `generate_screen_from_text` and `get_screen` were sufficient to capture artifacts.
  - Final approved visual system was generated in Stitch and saved locally under `docs/stitch/final/`.
- Осталось ограничением:
  - часть generated copy still needs final content replacement during implementation;
  - artifacts are validated visually, but not yet converted into framework code.

## [TOPIC: Framework choice and implementation direction for Nikita portfolio]
_Последнее обновление: 2026-04-10 | Product / Architecture Handoff_
Статус: Актуально

- Выполнена проверка официальных framework docs перед выбором implementation direction.
- Темы:
  - metadata and OG handling;
  - route-level server logic;
  - blog/case content workflows;
  - static-first rendering with selective interactivity.
- Проверенные источники:
  - `https://nextjs.org/docs/app/getting-started/metadata-and-og-images`
  - `https://nextjs.org/docs/app/getting-started/route-handlers`
  - `https://nextjs.org/docs/app/guides/mdx`
  - `https://docs.astro.build/en/guides/content-collections/`
  - `https://docs.astro.build/en/concepts/islands/`
  - `https://docs.astro.build/en/guides/on-demand-rendering/`
- Подтверждено:
  - Next.js App Router officially supports metadata, OG flows, route handlers, and MDX-driven content patterns in one framework surface.
  - Astro officially supports content collections, islands, and on-demand rendering and remains a valid content-first alternative.
  - This project needs both content-heavy routes and future product-like interactive surfaces.
- Вывод:
  - Recommended stack direction: `Next.js App Router`.
  - Architecture direction: `static-first modular monolith`.
- Осталось непроверенным:
  - exact package-level choices for styling, content tooling, AI SDK, and form handling;
  - deployment implementation details after framework scaffold exists.

## [TOPIC: Next.js scaffold implementation baseline]
_Последнее обновление: 2026-04-10 | Frontend Implementation Engineer_
Статус: Актуально

- Выполнена практическая проверка bootstrap path через `create-next-app@latest` перед переносом scaffold в проект.
- Подтверждено по фактическому CLI результату:
  - `next`: `16.2.3`
  - `react`: `19.2.4`
  - `react-dom`: `19.2.4`
  - `tailwindcss`: `^4` + `@tailwindcss/postcss`
  - default app template uses `src/` + App Router.
- Подтверждено на локальной проверке проекта:
  - `npm run lint` проходит;
  - `npm run build` проходит и собирает все route shells.
- Осталось для следующего шага:
  - наполнить страницы реальным контентом и компонентами;
  - добавить детальную UI-логику калькулятора и assistant surface.

## [TOPIC: Distinctive interactive portfolio patterns for AI_Nikitka93]
_Последнее обновление: 2026-04-24 | Deep Research Analyst_
Статус: Актуально

- Выполнен fresh internet-search pass по актуальным референсам `2025-2026`; кэш `2026-04-10` не использовался как final source because older than 7 days.
- Темы:
  - какие механики реально используют сильные портфолио creative developers в `2025-2026`;
  - какие визуальные направления уходят от `blue/white SaaS`;
  - как показывать proof/achievements не через скучную сетку сертификатов;
  - какие паттерны подходят именно для образа `AI_Nikitka93`, а не просто "красивого дизайнера".
- Проверенные источники и сигналы:
  - `https://tympanus.net/codrops/2026/04/07/r-k-26-the-thinking-and-code-behind-a-portfolio-led-by-presence/`
  - `https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/`
  - `https://tympanus.net/codrops/2026/03/05/inside-corentin-bernadous-portfolio-swiss-inspired-layouts-webgl-geometry-and-thoughtful-motion/`
  - `https://tympanus.net/codrops/2025/11/27/letting-the-creative-process-shape-a-webgl-portfolio/`
  - `https://tympanus.net/codrops/2025/09/30/abstract-feelings-concrete-forms-daiki-fujita-portfolio-2025/`
  - `https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/`
  - `https://www.awwwards.com/sites/gen-02-smsy-portfolio`
  - `https://www.awwwards.com/sites/stefan-vitasovic-portfolio25`
  - `https://www.awwwards.com/sites/clay-boan-25`
  - `https://www.awwwards.com/sites/olha-lazarieva`
  - `https://www.cssdesignawards.com/sites/max-milkin/48371/`
  - `https://arxiv.org/abs/2505.08691`
  - `https://arxiv.org/abs/2501.09909`
- Подтверждено:
  - Сильные портфолио `2025-2026` часто строятся вокруг `typography + motion + unusual navigation + selective WebGL/3D`, а не вокруг стандартного hero + cards.
  - Лучшие механики работают как часть идентичности: interactive rulers, grid toggles, room-based navigation, shader/video grids, draggable or zoomable galleries, character-level text transitions.
  - Важный сдвиг: proof показывают не только текстом, а через exploration surfaces, archives, trajectories, maps, timelines и multi-view systems.
  - Для achievements / certificates есть сильная логика уйти от static image gallery к `timeline`, `archive`, `knowledge-graph`, `case-file` форматам.
- Осталось гипотезой:
  - какой из трех будущих visual directions эмоционально ближе самому Никите;
  - насколько далеко можно идти в WebGL / audio / experimental motion без вреда для usability и production scope.
- Handoff:
  - Для следующего шага готовить не "корпоративный сайт", а один из трех направлений: `editorial signal lab`, `glitch research console`, `immersive proof atlas`.
  - Жестко избегать: blue-white SaaS gradients, passive card walls, decorative-only motion, certificate lightbox gallery as final presentation model.

## [TOPIC: April 2026 delta on global portfolio patterns]
_Последнее обновление: 2026-04-24 | Deep Research Analyst_
Статус: Актуально

- Использован кэш от `2026-04-24`; выполнен только `delta`-поиск по публикациям и showcase-страницам `April 2026`.
- Темы:
  - что именно появилось в `April 2026`, а не в более широком окне `2025-2026`;
  - насколько картина интернациональна, а не локальна;
  - есть ли свежие китайские / азиатские portfolio-references именно в открытых индексируемых источниках этого месяца.
- Проверенные источники и сигналы:
  - `https://tympanus.net/codrops/2026/04/14/they-call-me-giulio-the-making-of-a-cinematic-cyberpunk-portfolio/`
  - `https://tympanus.net/codrops/2026/04/07/r-k-26-the-thinking-and-code-behind-a-portfolio-led-by-presence/`
  - `https://www.webgpu.com/showcase/joseph-santamaria-3d-webgl-portfolio/`
  - `https://www.webgpu.com/showcase/justine-soulie-portfolio-webgl-illustrations/`
  - `https://www.webgpu.com/showcase/itom-portfolio-paper-tear-corridor/`
  - `https://www.webgpu.com/showcase/`
- Подтверждено:
  - В `April 2026` сильный международный сигнал идет не в сторону "ещё более clean SaaS", а в сторону `cinematic narrative`, `scroll-as-camera`, `illustration-as-interface`, `2D→3D transitions`, `micro-world portfolios`.
  - География April-only референсов уже интернациональна: Италия, Франция, Эквадор, Польша, Швеция, Ближний Восток / cultural-heritage storytelling и др.; это не локальный восточноевропейский паттерн.
  - Свежий April-only evidence усиливает тезис: WebGL/3D становится не украшением, а navigation / storytelling / information architecture layer.
- Negative result:
  - По открыто индексируемым `April 2026` источникам не найдено сильного Chinese portfolio case study того же уровня доказательности, что у Codrops/WebGPU showcase.
  - Это не означает отсутствия китайских сильных сайтов; это означает, что в этом конкретном April-only pass не нашлось сопоставимого primary-evidence в доступных surfaces.
- Handoff:
  - Для `AI_Nikitka93` April delta усиливает направление `immersive proof + authored navigation`, а не ослабляет его.
  - Если нужен отдельный China-focused pass, его лучше запускать как отдельный research sprint с локальными дизайн-галереями и китайскими award/catalog surfaces.

## [TOPIC: May 2026 additions for assistant, trust, analytics, and entry personalization]
_Последнее обновление: 2026-05-01 | Product Strategist_
Статус: Актуально

- Выполнен свежий mini-pass по спорным добавкам к master brief: retrieval-based assistant, visible activity freshness, privacy-first analytics, source-aware entry behavior, and machine-readable sharing.
- Темы:
  - нужен ли портфолио-помощник как retrieval layer, а не как scripted chatbot;
  - как усиливать доверие через live-signal и проверяемые proof-links;
  - какие privacy-first analytics patterns уместны для портфолио без тяжелого consent-noise;
  - как source / campaign awareness и role-based CTA влияют на entry experience;
  - как route-level metadata, OG and JSON-LD remain part of first-class product trust.
- Проверенные источники и сигналы:
  - `https://platform.openai.com/docs/guides/tools-file-search/`
  - `https://platform.openai.com/docs/guides/retrieval`
  - `https://plausible.io/docs`
  - `https://posthog.com/docs/product-analytics`
  - `https://posthog.com/docs/session-replay`
  - `https://nextjs.org/docs/app/getting-started/metadata-and-og-images`
  - `https://nextjs.org/docs/13/app/building-your-application/optimizing/metadata`
  - `https://tympanus.net/codrops/2026/04/07/r-k-26-the-thinking-and-code-behind-a-portfolio-led-by-presence/`
  - `https://seansooch.dev/`
- Подтверждено:
  - official retrieval and file-search tooling now strongly supports an assistant that searches a verified public corpus before answering instead of relying on static prompt text alone;
  - Plausible explicitly positions itself as privacy-friendly analytics with no cookies, no personal data collection, and no consent banners required;
  - PostHog’s current docs clearly support product analytics, traffic sources, real-time templates, funnels, and session replay as one analysis surface;
  - Next.js continues to treat metadata, OG image files, and JSON-LD as first-class route-level concerns rather than optional afterthoughts;
  - strong live portfolios in 2026 visibly signal activity and current work, rather than reading like frozen case-study museums.
- Осталось inference:
  - утверждение, что source-based personalization is a universal “standard”, слишком сильное; это лучше держать как `recommended` product pattern;
  - утверждение, что every top portfolio uses Agentic RAG, тоже лучше держать как `recommended direction`, а не как market-wide certainty.
- Handoff:
  - assistant in this project should evolve from bounded navigator into retrieval-first helper over the public corpus;
  - visible “last updated” and outward proof links should be treated as trust mechanics, not decorative UI;
  - analytics should stay privacy-respecting and product-facing: understand retention by case, drop-offs, and conversion routes;
  - master brief should reflect these additions as `recommended` or `proposed`, not as already-implemented facts.

## [TOPIC: May 2026 additions for scroll storytelling, accessibility, and performance]
_Последнее обновление: 2026-05-01 | Product Strategist_
Статус: Актуально

- Выполнен свежий mini-pass по новой волне требований: scroll-driven flagship cases, machine-readable identity and case metadata, live experiment layer, accessibility baseline, performance thresholds, and quiet assistant behavior.
- Темы:
  - как усилить flagship-cases через scroll storytelling, не превратив сайт в motion-demo;
  - почему `Lab / In Progress` нужен как отдельный публичный слой между заметкой и полноценным кейсом;
  - почему accessibility в `2026` уже читается как базовый сигнал зрелости, а не как факультативная доработка;
  - какие quality-bars разумно фиксировать прямо в product brief для медиа-тяжелого портфолио;
  - как удержать assistant visible, but quiet: user-invoked, keyboard-friendly, screen-reader-safe.
- Проверенные источники и сигналы:
  - `https://www.w3.org/WAI/standards-guidelines/wcag/`
  - `https://www.w3.org/TR/WCAG22/`
  - `https://web.dev/articles/vitals?hl=en`
  - `https://web.dev/articles/lcp?hl=en`
  - `https://web.dev/articles/cls`
  - `https://nextjs.org/docs/architecture/accessibility`
  - `https://gsap.com/docs/v3/Plugins/ScrollTrigger/`
- Подтверждено:
  - W3C continues to position WCAG as the shared international standard for web content accessibility, and WCAG `2.2` remains the current normative branch for this level of requirement framing;
  - web.dev still treats `LCP`, `INP`, and `CLS` as the stable Core Web Vitals set, with the familiar “good” thresholds remaining the practical quality targets for public sites;
  - Next.js accessibility guidance explicitly reinforces route announcements, descriptive titles, semantic structure, alt text, ARIA correctness, and reduced-motion awareness as first-class concerns;
  - scroll-triggered storytelling can be treated as a real presentation pattern for flagship cases, but only if performance and reduced-motion behavior are protected rather than treated as afterthoughts.
- Осталось inference:
  - тезис “лучшие портфолио 2026 обязаны иметь scroll storytelling” лучше держать как `recommended` direction, а не как жесткий универсальный стандарт;
  - вынос `Lab / In Progress` в `V1` зависит не от моды, а от реального наличия подходящего контента и готовности честко маркировать незавершенность.
- Handoff:
  - product brief should treat flagship scroll storytelling as a selective layer for hero cases only, not as the default rendering mode for the whole archive;
  - accessibility and performance need to be written as non-negotiable quality gates, not as optional polish;
  - `Lab / In Progress` should exist as a separate public material type with a different lifecycle from a fully verified case;
  - the assistant should stay discoverable but quiet: invoked by user intent, keyboard-accessible, and honest about scope.
