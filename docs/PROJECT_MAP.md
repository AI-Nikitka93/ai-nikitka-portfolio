# PROJECT MAP

## Goal
Create a portfolio site that introduces Nikita as a credible AI practitioner, showcases projects and achievements, converts visitors into employers or clients, and offers guided interaction through an AI assistant.

## Scope
- Public-facing homepage
- Portfolio and project detail pages
- Blog and article detail pages
- Services calculator
- AI assistant page
- Credentials / awards / certificates page
- Links / contact hub
- English summary entry page
- Privacy / data-use page

## Core Content Modules
- Positioning and biography
- Proof and achievements
- Project case studies
- Services and conversion logic
- Articles and thought pieces
- Bot knowledge and guardrails

## Current Code Modules
- `src/app/*` — App Router route shells + layout + metadata routes
- `src/components/*` — shared UI shells (header, content-derived footer, page shell)
- `src/components/project-scope-estimator.tsx` — client-side BYN-first budget estimator with currency selector and email brief generator
- `src/app/api/exchange-rates/route.ts` — same-origin exchange-rate route backed by the official NBRB API with fallback rates
- `src/lib/service-pricing.ts` — service pricing model for orientation ranges in BYN
- `src/lib/exchange-rates.ts` — NBRB rate normalization, fallback data, and currency response helpers
- `src/components/site-assistant-panel.tsx` — bounded operator-style site assistant/router with visible input, quick prompts, matrix-style streamed answer text, accessible live region, and direct Telegram/email/LinkedIn handoff
- `src/lib/site.ts` — site-level constants and navigation
- `src/lib/structured-data.ts` — WebSite, Blog, BlogPosting, and BreadcrumbList JSON-LD helpers
- `src/app/privacy/page.tsx` — public privacy/data-use route for the current no-analytics, no-cookie, no-site-form release mode
- `src/app/manifest.ts` — web app manifest metadata route
- `src/lib/mdx.ts` — local content-reader utility for `content/blog` and `content/portfolio`
- `content/blog/*`, `content/portfolio/*` — local markdown/MDX content roots
- `src/app/error.tsx`, `src/app/global-error.tsx` — route-level and root-level fallback screens for unexpected runtime failures
- `scripts/release-audit.mjs` — reproducible release audit for content/frontmatter/proof metadata/deployment config/pricing-currency readiness/assistant readiness/dynamic footer counts/reduced-motion/stale copy and optional live-route SEO/accessibility/security/freshness invariants
- `vercel.json` — Vercel deployment config that runs `npm run verify` as the build gate
- `public/favicon.svg` — branded site icon served directly and via `/favicon.ico` rewrite
- global shell accessibility — skip-to-content link in `src/app/layout.tsx`, `main#main-content` landmarks on public routes, active navigation `aria-current`, and reduced-motion CSS in `src/app/globals.css`
- root config layer — `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`

## Main Risks
- Oversharing personal or political context
- Overclaiming engineering depth beyond confirmed evidence
- Turning the site into a noisy "all skills at once" catalog
- Treating orientation budget ranges as final fixed commercial offers before commercial scope is validated
- Treating the local release candidate as a live public release before final domain/deploy closure

## Product Direction
- Tone: modest, factual, intelligent, non-elite
- Conversion: employer trust + inbound client leads
- Differentiator: prompt-first AI practice backed by public results, not "guru" rhetoric

## Implementation Direction
- Recommended framework: `Next.js App Router`
- Architecture: static-first modular monolith with selective interactive surfaces
- Content-heavy pages: homepage, about, awards, blog, case studies
- Product-like pages: services calculator and AI assistant
- SEO model: branded `.com` primary domain, custom-domain deployment, file- and page-level metadata
