# AI_Nikitka93 Portfolio

Production-oriented Next.js App Router site for Nikita Kizevich / `AI_Nikitka93`.

## What Is Included

- RU-first portfolio with selected works, documents, and contact routes.
- Separate interactive career-path route from electric work and `УП «Минскводоканал»` to visual work, sites, and `AI_Nikitka93`.
- Lab route with current site status, confirmation notes, and materials to add later.
- Updated document model for the local `Грамоты` archive: 35AWARDS season 11 as the fresh 2026 visual anchor, season 10 category files as support, and Digital Marathon 2026 as an additional ranked result.
- Blog with MDX posts.
- Services scope calculator with first-screen quick choice, BYN base pricing, live NBRB conversion, and mailto brief generation.
- Local site assistant that routes visitors to works, budget, documents, and contacts without inventing facts.
- Public awards and credentials route.
- Release-safe English summary route.
- Public privacy route for the current no-analytics, no-cookie, no-site-form release mode.
- SEO metadata, sitemap, robots, web manifest, favicon, JSON-LD for site/blog/articles/portfolio, OpenGraph image routes, security headers, skip-to-content navigation, active-navigation `aria-current`, reduced-motion handling, and fallback error screens.
- Public freshness signal and content-derived portfolio/blog count in the footer, currently `Обновлено: 5 июня 2026` and `7 работ / 2 заметки`.
- Vercel deployment config that runs the local verification gate during builds.

## Local Commands

```powershell
npm ci
npm run lint
npm run typecheck
npm run build
npm run audit:release
npm run audit:deps
npm run start -- --hostname 127.0.0.1 --port 3200
npm run audit:release:live
```

Windows helpers:

- `install.bat` installs locked dependencies with `npm ci` when `package-lock.json` exists.
- `run.bat` starts the development server.
- `build.bat` runs lint, typecheck, production build, and static release audit.
- `clean.bat` removes local build/dependency folders without deleting `package-lock.json`.

## Environment

Set the final public URL before production build when deploying away from the default candidate domain:

```powershell
$env:NEXT_PUBLIC_SITE_URL="https://example.com"
```

Without this variable, metadata uses `https://kizevich.com`.

## Release Gates

Current local release-candidate checks are recorded in:

- `docs/STATE.md`
- `reports/site-eval-2026-06-04/release-audit-live-gramoty-proof-2026-06-04-final.json`
- `reports/site-eval-2026-06-04/gramoty-proof-browser-qa-2026-06-04.json`
- `reports/site-eval-2026-06-04/gramoty-proof-home-browser-qa-2026-06-04.png`
- `reports/site-eval-2026-06-04/gramoty-proof-35awards-dossier-browser-qa-2026-06-04.png`
- `reports/site-eval-2026-06-04/gramoty-proof-awards-credentials-browser-qa-2026-06-04.png`
- `reports/site-eval-2026-06-04/release-audit-live-proof-lab-ux-mobile-proof-2026-06-04-post-state-final.json`
- `reports/site-eval-2026-06-04/proof-lab-browser-dom-qa-final-2026-06-04.json`
- `reports/site-eval-2026-06-04/proof-lab-home-mobile-final-2026-06-04.png`
- `reports/site-eval-2026-06-04/proof-lab-route-desktop-final-2026-06-04.png`
- `reports/site-eval-2026-06-01/browser-route-sweep-production-filtered.json`
- `reports/site-eval-2026-06-01/proof-layer-browser-qa.json`
- `reports/site-eval-2026-06-01/release-hardening-browser-qa.json`
- `reports/site-eval-2026-06-01/reduced-motion-browser-qa.json`
- `reports/site-eval-2026-06-01/current-nav-portfolio-browser-qa.json`
- `reports/site-eval-2026-06-01/current-nav-en-browser-qa.json`
- `reports/site-eval-2026-06-01/current-nav-mobile-browser-qa.json`
- `reports/site-eval-2026-06-01/dynamic-footer-count-browser-qa.json`

Reproducible release checks:

- `npm run verify` runs lint, typecheck, build, static release audit, and dependency audit.
- `npm run audit:release` checks content/frontmatter, confirmation metadata, proof assets, first-work selector, `/lab`, work-summary spine, assistant source cards, deployment config, content-derived footer counts, active-navigation `aria-current`, reduced-motion CSS, error-boundary files, and forbidden stale copy.
- `npm run audit:release:live` additionally checks live routes including `/lab`, 404/noindex, metadata, language tags, skip-to-content landmarks, image alt attributes, safe blank links, JSON-LD on proof/blog routes, visible freshness signal, current footer content count, privacy/no-tracking copy, security headers, sitemap, robots, web manifest, favicon, and OpenGraph endpoints against a running server on `127.0.0.1:3200`.
- `npm run audit:deps` must return `found 0 vulnerabilities` before production release.
- Add `-- --out=reports/site-eval-YYYY-MM-DD/release-audit-live.json` to save an audit artifact.

Deployment config:

- `vercel.json` declares `nextjs`, `npm ci`, and `npm run verify` so preview/production builds fail before publishing if lint, typecheck, build, or static release audit fails.
- `next.config.ts` disables `X-Powered-By` and applies the security header baseline checked by live audit.

External launch gates still require human action:

- validate final service/pricing wording with Nikita;
- buy/connect the final domain;
- deploy the production build;
- optionally add direct personal screenshots/files for the work pages that currently rely on source descriptions.

Current domain evidence from the local release pass: `kizevich.com` and `www.kizevich.com` did not resolve by DNS on 2026-06-01, and `https://kizevich.com` returned host-not-found locally. Treat the custom domain as an external launch gate until this is rechecked after purchase/connection.
