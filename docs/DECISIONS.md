# DECISIONS

## 2026-04-09 — Public positioning is proof-first, not hype-first
- Why: Nikita's strongest public asset is a non-standard but evidenced track record: awards, hackathons, published work, and prompt-first execution.
- Consequence: The site should emphasize verified achievements and case studies instead of broad "AI expert" claims.

## 2026-04-09 — The website is a commercial personal brand product
- Why: The site must attract both employers and paying clients, not only showcase hobbies.
- Consequence: Navigation includes portfolio, blog, services calculator, AI bot, credentials, and project detail pages.

## 2026-04-09 — Sensitive political and private biography stays out of the public surface
- Why: It weakens trust, distracts from professional value, and conflicts with the requested public framing.
- Consequence: Public pages and AI bot are limited to verified professional, creative, and educational facts.

## 2026-04-09 — Calculator shows service logic, not invented prices
- Why: Exact commercial offers are still unknown and the source material does not justify fixed public pricing.
- Consequence: The calculator should estimate scope and complexity first, and only expose pricing after founder validation.

## 2026-06-02 — Calculator may show BYN-first budget ranges, not final fixed offers
- Why: The public site now needs to help HR/client visitors understand budget order without pretending that every service package is commercially validated.
- Consequence: `/services-calculator` can show orientation ranges in BYN, convert USD/EUR/RUB/PLN through the official NBRB exchange-rate route, and include the range in the email brief, but visible copy must keep final pricing tied to a short brief/founder validation.

## 2026-06-02 — Assistant may feel like an operator console, but must remain bounded
- Why: The helper needs to feel useful and authored for HR/client visitors, yet a fake unrestricted AI chat would weaken the proof-first public trust model.
- Consequence: `/ai-assistant` can use matrix-style answer motion, quick prompt routing, and clear contact handoff, but it must stay local/bounded, answer only from public site routes, expose `aria-live`, and direct project-specific questions to Telegram, email, LinkedIn, or the calculator instead of inventing facts.

## 2026-04-09 — Primary domain should be `.com`, not `.by`
- Why: The site must rank for branded queries while remaining credible for both Belarusian and broader audiences. `.com` is the strongest balance of trust, memorability, and future flexibility.
- Consequence: Recommend `.com` as the main domain and `.by` only as an optional defensive/local redirect.

## 2026-04-09 — Paid hosting is not required for launch SEO
- Why: Official docs and pricing show that Vercel Hobby and Cloudflare Pages can serve a custom-domain site for free with CDN delivery, while Google and Yandex guidance emphasize speed, uptime, and clean indexing rather than expensive shared hosting.
- Consequence: Budget should go to the domain purchase first; hosting can remain free until real product constraints appear.

## 2026-04-10 — The visual direction is a calm dark proof-led bento system
- Why: It best balances proof density, modest positioning, AI-native feel, and the more product-like surfaces required for the calculator and AI assistant.
- Consequence: Implementation should preserve dark graphite surfaces, restrained blue accents, modular proof cards, and a non-flashy bento layout.

## 2026-04-10 — Exported visual copy is secondary to the approved strategy copy
- Why: Stitch produced a strong visual system, but parts of the generated wording drifted toward corporate or inflated framing and needed correction.
- Consequence: Frontend implementation should treat `docs/PORTFOLIO_STRATEGY.md` and `docs/DESIGN_CONCEPT.md` as source of truth, not blindly ship raw generated text from every screen.

## 2026-04-10 — Implementation should start with Next.js App Router
- Why: The site is not only content-driven; it also needs clean metadata, blog/case pages, a multi-step calculator, and a future bounded AI assistant endpoint. Official framework docs confirm strong support for metadata, route handlers, and MDX in one stack.
- Consequence: The next technical step should scaffold a static-first Next.js App Router project instead of choosing a content-only stack first and compensating later.

## 2026-04-10 — Build static-first, not app-like by default
- Why: Most value comes from branded pages, proof pages, and searchable case/blog content. Only calculator and AI assistant need richer interaction.
- Consequence: Implementation should prerender most routes and isolate client/server logic to the few surfaces that truly need it.

## 2026-04-10 — Scaffold baseline fixed on Next.js 16 + Tailwind v4
- Why: `create-next-app@latest` at implementation time generated a stable baseline with Next.js `16.2.3`, React `19.2.4`, and Tailwind CSS v4 tooling.
- Consequence: The project now follows that baseline to avoid config drift and reduce bootstrap risk.

## 2026-04-10 — Keep all route shells as Server Components in scaffold stage
- Why: The current step is infrastructure and routing; interactive feature logic is not required yet.
- Consequence: Pages are server-rendered by default, with future client boundaries added only when the real calculator and assistant behavior is implemented.

## 2026-04-24 — The public identity is AI_Nikitka93, while Nikita Kizevich remains the verification layer
- Why: The site needs a stronger authored presence than a plain personal resume, but trust still depends on a real human anchor and documented proof.
- Consequence: Hero, navigation, assistant, and editorial framing lead with `AI_Nikitka93`; about, bylines, contact, and credentials ground that identity in `Никита Кизевич`.

## 2026-04-24 — Blue-white SaaS styling is permanently banned
- Why: Research and task constraints both reject the stale corporate product look; it weakens memorability and collapses the intended cinematic/archive identity.
- Consequence: Future UI work must use the dark editorial / signal lab palette and reject fallback blue accents, white-first screens, and generic product-marketing composition.

## 2026-04-24 — Credentials must be presented as dossiers and proof artifacts
- Why: Static certificate galleries conflict with the archive/proof logic established by research and dilute the brand’s authored interface.
- Consequence: The upcoming credentials step should organize diplomas, certificates, and awards as dossiers, proof artifacts, archive shelves, and signal markers.

## 2026-04-24 — The featured proof archive is capped at seven top-layer dossiers
- Why: The raw credential corpus is too noisy, and broad certificate volume weakens the authored signal-lab identity.
- Consequence: Public credentials UI should foreground only the strongest seven dossiers and move the rest into supporting or hidden archive layers.

## 2026-04-24 — Competitive and juried proof outranks course volume on the main credentials surface
- Why: Ranked contests, external judging, and leaderboard results differentiate Nikita far more than mass online-learning completions.
- Consequence: The credentials route should prioritize competitions, public recognitions, and hard technical benchmarks, while coursework stays in background data or expandable drawers.

## 2026-04-24 — Text-backed dossiers must be treated as data-editorial hero cards, not as fallback tiles
- Why: Several of the strongest proof points are rank-, metric-, or leaderboard-based and would look weaker if rendered as empty cards without imagery.
- Consequence: Frontend implementation should give text-backed dossiers oversized mono metrics, axis-like rules, and archive-grade structure so they compete visually with image-backed proof.

## 2026-04-24 — Motion is authored and sparse, with explicit reduced-motion degradation
- Why: The brand depends on interface-led authorship, but excessive motion would drift into gimmick territory and hurt readability or accessibility.
- Consequence: Implementation should use a small shared motion vocabulary: section reveal, title scramble, dossier border scan, drawer slide, and nav compression with exact timings and accessibility fallbacks.

## 2026-04-24 — Canonical URLs must be route-level, never hardcoded at the root layout
- Why: A root `alternates.canonical: "/"` causes child pages to inherit the homepage canonical and weakens indexation for about, blog, and dynamic detail routes.
- Consequence: Root layout keeps `metadataBase` only; every index/detail route must emit its own canonical via a shared `absoluteUrl()` helper.

## 2026-04-24 — Published-state filtering belongs in the MDX utility layer
- Why: If `published: false` is not filtered at the data source, unpublished posts and cases can leak into static params, sitemap generation, and metadata paths.
- Consequence: `getPosts`, `getPortfolioEntries`, and slug lookup helpers should return only published content by default, with unpublished entries resolving to `null`.

## 2026-04-24 — Brand-dominant SEO must avoid the mistaken query “Nikita AI”
- Why: The user explicitly confirmed that `Nikita AI` refers to another person/entity and causes brand confusion.
- Consequence: Metadata, JSON-LD, OG titles, and page titles should prioritize `AI_Nikitka93`, `AI Nikitka93`, `Nikitka AI`, `Никита Кизевич`, and `Кизевич Никита`, while excluding `Nikita AI`.

## 2026-04-24 — Featured proof must live as MDX-backed dossiers, not as hardcoded homepage-only cards
- Why: The archive needs indexable detail routes, route-level metadata, JSON-LD coverage, and one consistent content source for both UI and sitemap generation.
- Consequence: Future featured proof updates should be authored in `content/portfolio/*.mdx` with structured frontmatter and rendered through shared dossier components.

## 2026-04-25 — Final visual polish should follow a hybrid of Signal Lab, Bento density, and restrained neural atmosphere
- Why: The local archive `Версии дизайна сайта` shows that no single concept solves every route equally well. `Signal Lab` best matches the approved brand law, `Bento` best solves homepage density and route richness, and the biomorphic branch only works as a subtle atmospheric accent.
- Consequence: Future UI polish should keep `Signal Lab` as the primary system, add `Bento` structure to homepage/archive/links surfaces, use biomorphic glow only as background accent, borrow operator framing from `Classified Operator`, and avoid importing foreign palettes or glass-first rounded UI into the core system.

## 2026-04-25 — Visible interface copy is RU-first, while source titles and SEO templates may stay mixed where required
- Why: The product direction now requires Russian as the primary public interface language, but some route metadata and official competition titles still need to preserve brand/SEO structure or external source naming.
- Consequence: Buttons, labels, helper text, dossier status chips, route surfaces, and archive UI should be Russian by default; official dossier titles and approved SEO title templates can remain mixed when they reference real external names or previously locked search patterns.

## 2026-04-25 — The next visual rewrite must target route-specific page physics, not more global polish
- Why: The deep archive review showed that the current site is no longer broken, but it still feels too uniform because multiple routes reuse the same hero-card chassis. The biggest weakness is not palette or typography; it is insufficient separation between homepage, archive, operator, scope, verifier, notes, and background shelves.
- Consequence: The next implementation wave should rebuild `/about`, `/blog`, and `/awards-credentials` first, then harden `/ai-assistant`, `/links`, and `/services-calculator` with route-specific structures borrowed from `Signal Lab`, `Bento`, `Classified Operator`, and `Research Archive`.

## 2026-04-25 — `/about` must be a trust profile, not an internal policy screen
- Why: The first rewrite of `/about` still exposed internal moderation logic (`Граница публикации`, `скрыто`, public-layer rules) instead of helping a real visitor understand who stands behind `AI_Nikitka93` and why the project is trustworthy.
- Consequence: `/about` now focuses only on public-safe identity, technical formation, visual practice, and verification routes. Internal filtering logic should stay in docs and editorial decisions, never in visible page copy.

## 2026-04-25 — Public-facing info pages must use plain Russian, not internal jargon
- Why: Even after the structural fix, `/about` still contained too many internal terms and mixed English phrases (`proof-led`, `alias`, `human source`, `routing table`) that made the page feel artificial and harder to understand.
- Consequence: Public explanatory pages should be rewritten in direct everyday Russian. Brand language may stay in names like `AI_Nikitka93` or `досье`, but supporting copy should explain things in simple human terms first.

## 2026-04-25 — Design archive transfer must be composition-first, not mood-first
- Why: The deep audit of all `30` local design systems showed that production already borrowed the archive’s palette, fonts, and atmosphere, but still missed the stronger part: route-specific composition, page rhythm, density, spacing discipline, and different screen physics for homepage, archive, notes, links, operator, and scope.
- Consequence: Future frontend rewrites should explicitly map each route to concrete donor systems from the archive instead of applying more generic dark-theme polish. The highest-priority donor mapping is now documented in `docs/DESIGN_ARCHIVE_DEEP_EVAL.md`.

## 2026-04-25 — The first full archive-transfer wave should land in homepage, proof archive, dossier cards, and field notes before minor polish
- Why: These surfaces carry the strongest visible proof that the site is no longer a generic dark shell. They are where the archive systems contribute the most composition, density, and route identity compared to background pages.
- Consequence: Production now prioritizes `Signal Lab + Bento` on `/` and `/portfolio`, `Academic Archive` discipline on `/blog`, and richer archive-signal behavior inside `DossierCard`. Remaining work should build on that base instead of re-litigating the global palette.

## 2026-04-25 — Public navigation labels must prefer plain everyday Russian over styled naming
- Why: Labels like `Полевые заметки` and `Брифинг` still sounded authored but made the site harder to understand for a first-time visitor who simply wants to find the blog or discuss a project.
- Consequence: Public nav, route titles, and section headers should default to literal wording such as `Блог`, `Работы`, `О себе`, `Контакты`, and `Обсудить проект`; stylistic flavor can stay in layout and motion, not in basic wayfinding.

## 2026-04-25 — Homepage should be an entry point, not a compressed version of the whole site
- Why: Even after the visual improvements, the homepage still tried to explain too much at once and made the product feel like one long page with internal sections instead of a real multi-page site.
- Consequence: The homepage should stay short and directional: brief identity, key route cards, and a small featured-work block. Explanations, context, blog material, contact guidance, and task intake should live on their own pages.

## 2026-05-01 — The assistant should be retrieval-first over the verified public corpus
- Why: A generic site chatbot would overstate knowledge, drift into hallucination, and weaken trust. The portfolio needs an assistant that finds real cases, notes, and proofs instead of improvising.
- Consequence: The assistant should become an Agentic RAG layer over published public materials, answer with grounded references to that corpus, and explicitly say when the answer is not present.

## 2026-05-01 — Every flagship proof item must either link outward or declare its verification status
- Why: Text-only claims are the softest point in an otherwise proof-first product. Public trust is stronger when the visitor can open a source, results page, profile, file, or clear verification note.
- Consequence: Featured proof cards and detail routes should expose a public verification link whenever possible; when that is not yet available, the UI should label the proof as verification-in-progress instead of presenting it as fully closed.

## 2026-05-01 — The front door and final CTA should adapt to source and intent
- Why: Different visitors arrive with different jobs-to-be-done. A recruiter, client, and collaborator should not all be pushed through one identical opening emphasis and one identical final action.
- Consequence: The product should support light source-aware entry behavior, visible activity freshness, and a role-based CTA block so the first and last screens feel relevant without hiding the rest of the portfolio.

## 2026-05-01 — Scroll storytelling is reserved for flagship cases and must stay subordinate to clarity
- Why: Nikita’s strongest AI-video and agentic work benefits from sequential reveal, but applying this everywhere would quickly turn the portfolio into a motion-first shell instead of a proof-first product.
- Consequence: Scroll-driven narrative becomes a selective presentation layer for top cases only, while standard archive reading remains fast, direct, and readable.

## 2026-05-01 — Accessibility and performance are part of trust, not post-launch polish
- Why: A portfolio that looks authored but fails keyboard use, semantic clarity, or public performance quality weakens credibility instead of strengthening it.
- Consequence: The product brief now treats WCAG `2.2 AA`, Core Web Vitals targets, reduced-motion safety, and keyboard/screen-reader readiness as baseline quality bars for flagship routes.

## 2026-05-01 — `Lab / In Progress` is a separate public content type
- Why: Not every valuable public artifact is ready to become a full case, but hiding all unfinished work makes the site feel less alive and narrows the visible practice too much.
- Consequence: The content model now includes experiments as an explicit public layer with honest in-progress status and a path to graduate into full cases later.

## 2026-05-01 — The assistant must remain quiet until invited
- Why: Auto-opening assistants read as pushy and reduce trust faster than they create help, especially on a portfolio that already asks for careful attention.
- Consequence: The assistant surface should be discoverable but never force itself open; it must support keyboard access and accessible announcements without interrupting the reading flow.
