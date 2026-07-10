# EXPLORATION: 5-7 VARIANTS EVALUATION

Проверено: `2026-04-10`

Источник стратегии для оценки: `docs/PORTFOLIO_STRATEGY.md`

Stitch exploration run:
- Exploration project: `projects/6735542063805162036`
- Homepage concepts generated: `6`
- Local artifacts: `docs/stitch/exploration_v2/`

## Exploration Summary

| Variant | Artifact | What worked | What failed | Verdict |
|---|---|---|---|---|
| Clean Minimalist Light | `docs/stitch/exploration_v2/Concept_1_Clean_Minimalist_Light.png` | Strong hierarchy, serious tone, clear CTA stack | In practice skewed darker and more cinematic than planned; felt closer to a polished AI agency than a modest personal portfolio | Rejected |
| Dark Tech / Prompt Console | `docs/stitch/exploration_v2/Concept_2_Dark_Tech_Prompt_Console.png` | Strong technical signal, good density for proofs, calculator/chat previews read clearly | Too close to “system architect” / dev-portfolio energy; risks overstating engineering identity | Rejected |
| Bento Proof Grid | `docs/stitch/exploration_v2/Concept_3_Bento_Proof_Grid.png` | Best information architecture for proof, awards, services, and assistant; modular layout suits portfolio + calculator + chat | Original copy and imagery were too dramatic in places; needed tone correction | Advanced to refinement |
| Editorial / Academic | `docs/stitch/exploration_v2/Concept_4_Editorial_Academic.png` | Most modest and “serious”; good for awards and long-form credibility | Too static for AI assistant and calculator; underplayed AI-native/product feel | Rejected as primary, kept as influence |
| Soft Glass / Modern Calm | `docs/stitch/exploration_v2/Concept_5_Soft_Glass_Modern_Calm.png` | Friendly and contemporary; approachable surfaces | Drifted toward generic startup aesthetic; weaker proof emphasis | Rejected |
| Precise Hybrid Professional | `docs/stitch/exploration_v2/Concept_6_Precise_Hybrid_Professional.png` | Reliable, structured, implementation-friendly | Felt closer to studio/corporate portfolio than to Nikita’s proof-first personal brand | Rejected |

## Refinement Pass

Base direction refined: `Bento Proof Grid`

Refinement artifacts:
- `docs/stitch/refine_bento/bento_refine_1_269645e9f0744a8eacda730b4081d1ba.png`
- `docs/stitch/refine_bento/bento_refine_2_de5cbe7b9f79428a9aa4f60f6d7c24d6.png`
- `docs/stitch/refine_bento/bento_refine_3_543b47e63c8e4f1ba475e1fe97a42871.png`

Refinement verdict:
- `bento_refine_1` proved the strongest structural direction: calm dark base, clear proof cards, strong support for calculator and assistant surfaces.
- `bento_refine_2` improved tone but became too pale and lost some visual authority.
- `bento_refine_3` collapsed into document-like output and stopped functioning as a portfolio homepage.

# WINNING CONCEPT

## Name
`Calm Dark Proof Grid`

## Why It Won

- It is the best match for the approved strategy: proof first, ego second.
- It supports the most difficult surfaces on the site: services calculator, AI assistant, awards, and dense case cards.
- It looks AI-native without falling into neon, cyberpunk, or inflated “future guru” aesthetics.
- The bento structure turns Nikita’s fragmented evidence set into a readable system: hackathons, awards, visual work, experiments, links, and services all fit naturally.
- It preserves a personal-brand tone better than the more corporate or editorial alternatives once the copy was aligned.

## Critical Corrections Made After Selection

- Removed or reduced “architect / enterprise / transformation” framing where Stitch drifted too far from the approved wedge.
- Reframed key screens toward `prompt-first AI practitioner`, practical work, experiments, and verified results.
- Kept the layout and visual system intact while aligning the text tone with the strategy.

## Final Stitch Surface

- Final visual system project: `projects/4866713033154837281`
- Final homepage artifact: `docs/stitch/final/homepage_82042f011c9445aeb4e971c2aef40f23.png`

# SCREEN INVENTORY

All required screen types were generated in the winning style.

| Route | Screen purpose | Selected artifact |
|---|---|---|
| `/` | Homepage / brand overview | `docs/stitch/final/homepage_82042f011c9445aeb4e971c2aef40f23.png` |
| `/about` | Personal positioning and path into AI | `docs/stitch/final/aligned_Обо_мне_Никита_Кизевич_Обновлено_618ac817fb4f482db069c95e795fc062.png` |
| `/portfolio` | Portfolio catalog with categories | `docs/stitch/final/Проекты_-_Никита_Кизевич_dd1142d9c3ba45a0b87508165a3fe7ac.png` |
| `/portfolio/detail` | Case-study detail page | `docs/stitch/final/aligned_Детали_проекта_Обновлено_0afc9760405f47888cd9027edae0705c.png` |
| `/awards-credentials` | Awards, hackathons, certificates | `docs/stitch/final/Награды_и_дипломы_-_Никита_Кизевич_7b4869d32ec84deeb2e5feb49d1ffc48.png` |
| `/blog` | Blog index | `docs/stitch/final/Блог_-_Никита_Кизевич_ae7105f4a8fc4a1583aa9b4534002425.png` |
| `/blog/detail` | Article detail | `docs/stitch/final/aligned_Статья_Мой_воркфлоу_Никита_Кизевич_Обновлено_ca2764733bfb464e80de0258a94f1e38.png` |
| `/services-calculator` | Step-by-step scope estimator | `docs/stitch/final/Калькулятор_услуг_-_Никита_Кизевич_7bc784a085f94be184d646e67d07dff1.png` |
| `/ai-assistant` | Full AI site helper UI | `docs/stitch/final/aligned_ai_assistant_1c6881a181624f3b8f8eef36f371deb0.png` |
| `/links` | Professional links hub | `docs/stitch/final/Ссылки_и_ресурсы_-_Никита_Кизевич_dbc250bc0be04ccdae0eda435a35917a.png` |
| `/404` | Strict branded error page | `docs/stitch/final/404_Страница_не_найдена_-_Никита_Кизевич_b49b898ffc06469fb89c66bcff03e838.png` |

## Screen-Level Notes

- Homepage: strongest global summary and conversion surface; already close to implementation-ready.
- About: visually strong after copy alignment; should use final production copy from strategy docs before coding.
- Portfolio catalog: good category/filter rhythm and modular card system.
- Portfolio detail: best used as a reusable case-study template for LabStory / Helix, КИНОМАТИК, 35AWARDS, and MiniMax/hackathon cases.
- Awards page: visually fit for proof-heavy density without bragging tone.
- Blog detail: reading experience is clean enough to reuse for long-form posts.
- Calculator: strongest product-like screen in the set; especially suitable for implementation.
- AI assistant: after alignment pass, it reads as a site helper instead of a “grand AI system”.

# UI FOUNDATIONS (Colors, Typography, Component logic)

## Colors

Production tokens should be extracted from final HTML exports, but the approved visual direction is:

| Token role | Direction |
|---|---|
| Background | Deep graphite / blue-black, never pure black |
| Section surface | Slightly raised dark slate |
| Card surface | Dark charcoal/slate with restrained separation |
| Accent | Powder blue / cold mist blue |
| Text primary | Soft near-white |
| Text secondary | Muted steel blue / gray |
| Border / divider | Low-contrast slate line, subtle only |

## Typography

- Headings: modern geometric sans with strong but not theatrical weight.
- Body: clean readable sans for dense portfolio and article content.
- Labels / proof chips: occasional technical accent face for numbers, tags, or metadata only.
- Tone rule: typography should signal calm precision, not futurist spectacle.

## Layout Logic

- Core system: proof-led bento grid on desktop.
- Rhythm: large vertical spacing, but dense cards where evidence needs scanability.
- Hero: left-aligned, compact, name-first, CTA-first.
- Sections: separated more by tonal layering than by hard lines.
- Mobile intent: the system should collapse into stacked cards and step blocks without losing CTA order or proof hierarchy.

## Component Logic

### Header
- Minimal, dark, fixed or semi-sticky feeling.
- Brand at left, compact nav in center/right, restrained contact CTA.

### Proof Chips
- Small, dense, scannable.
- Used for awards, placements, and category markers.

### Project Cards
- Title, tag, short proof/result, and one clear CTA.
- Visual preview stays secondary to result framing.

### Calculator
- Stepper or progressive card flow, not a long flat form.
- Left/main column for decisions, right column for live summary.
- Output should show complexity class, not invented pricing.

### AI Assistant
- Main chat panel plus quick-navigation region.
- Helpful empty state and suggested prompts.
- Tone must stay professional and portfolio-aware.

### Article Layout
- Strong reading column with structured highlights.
- Related content and author/contact strip at the end.

## Do Not Lose In Implementation

- No neon accents.
- No oversized glossy 3D renders.
- No “AI guru” hero copy.
- No bootstrap-like default spacing or button styling.
- No generic enterprise dashboard patterns on portfolio pages.

# ACCEPTANCE CRITERIA

- `6` distinct homepage concepts were generated and reviewed critically, not accepted blindly.
- A single winner was chosen for strategic reasons, not only aesthetic preference.
- All `11` required unique screens were generated in the winning style.
- The calculator and AI assistant received dedicated, more detailed product-like surfaces.
- A copy alignment pass was performed where Stitch drifted into a more corporate or self-important tone.
- Final implementation should use this document plus `docs/PORTFOLIO_STRATEGY.md` as the visual/content source of truth.
- Remaining caution: some generated screen text is still placeholder-level and should be replaced by approved production copy during implementation; the visual system itself is the approved outcome of this step.
