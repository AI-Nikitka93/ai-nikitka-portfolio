# Visual And Motion Spec — AI_Nikitka93

Checked on: 2026-04-24
Status: Active implementation spec for UI structure, motion, dossier behavior, and mobile fallback
Scope: visual shell, motion system, proof archive cards, responsive degradation
Implementation target: Next.js + Tailwind CSS v4 + Framer Motion

## 1. Visual Objective

The interface must feel like a `signal lab` and `proof archive`, not like a product landing page with effects.

Three rules govern the whole system:

1. `Interface = medium`
   The UI itself must prove authorship. Layout, motion, and navigation should feel indexed, routed, and filed.
2. `Proof outranks decoration`
   Every strong visual gesture should either reveal evidence, guide the eye, or define state.
3. `Dark editorial, not sci-fi cosplay`
   The site can feel cinematic and computational without turning into a hacker parody.

## 2. Core Visual Tokens

Use only the color and typography law from `docs/BRAND_CONSTITUTION.md`.

### Palette Roles
- `Void Black #0A0D0C` — base page field, page transition fade, deep background
- `Carbon Fog #161B19` — surfaces, cards, nav shell, drawers
- `Phosphor Lime #B7FF3C` — active borders, hover state, live index, cursor response
- `Archive Bone #D6CFBF` — primary readable text, document labels, dossier captions
- `Ember Orange #FF6A2A` — selected counters, chapter marks, exceptional emphasis
- `Raw Titanium #8E968C` — grid lines, metadata, inactive controls, secondary copy
- `Redacted Oxide #A9422A` — disabled, redacted, or hidden states

### Typography Roles
- `Space Grotesk` — page titles, section titles, dossier names, navigation labels above 16px
- `IBM Plex Mono` — metadata, counters, percentages, file markers, coordinates, timestamps, source traces

### Explicit Visual Bans
- No white-first screens
- No blue accents
- No soft Material-style shadows
- No floating glass cards with generic blur-only depth
- No perfect-center symmetric SaaS composition for all sections

## 3. Global Shell

## 3.1 Page Structure

The page shell should feel layered, indexed, and slightly instrument-like.

### Layer Stack
| Layer | z-index | Purpose | Notes |
|---|---:|---|---|
| Background field | 0 | Void Black page base | never moves independently |
| Noise skin | 1 | subtle film grain / archive texture | static or very low-motion |
| Grid / coordinates | 2 | authored surface logic | low-contrast only |
| Section atmospheres | 3 | soft radial or linear glows | sparse, tied to section mood |
| Main content | 10 | all readable content | highest focus plane |
| Floating nav | 30 | section index + page control | persistent |
| Cursor layer | 40 | desktop custom cursor only | disabled on touch |
| Drawer / modal layer | 50 | dossier expansion | blocks background interaction |

## 3.2 Background Physics

The background should not be flat black. It needs enough texture to feel authored without becoming noisy.

### Background Recipe
- Base fill: `Void Black`
- Noise overlay: monochrome grain at `2%` to `4%` visible intensity
- Grid overlay: `1px` lines in `Raw Titanium` at `8%` opacity
- Optional section glow: radial gradient, max `18%` opacity, anchored behind hero headline or active dossier cluster

### Grid Behavior
- Grid is not decorative wallpaper. It should feel like plotting paper or a control-room indexing layer.
- Recommended implementation: static `repeating-linear-gradient` overlays, not animated moving lines.
- Grid density:
  - desktop: `64px` major cells
  - tablet: `48px`
  - mobile: `40px`

## 3.3 Navigation

Navigation should behave like a filed control strip, not a generic sticky navbar.

### Desktop Navigation
- Position: floating, pinned near top center or slightly top-left weighted
- Form: horizontal control bar with segmented zones
- Height: `52px` to `60px`
- Surface: `Carbon Fog` with `1px` `Raw Titanium` border at `28%` opacity
- Corners: small radius, not pill-rounded; target `12px`

### Navigation Zones
- Left: current page label in `IBM Plex Mono`
- Center: primary route set
- Right: section index / progress marker / optional status tag

### Scroll Behavior
- Initial state: slightly taller, more breathable
- After `72px` scroll:
  - height reduces by `6px` to `8px`
  - background opacity rises slightly
  - border contrast increases
  - current section marker becomes more visible

### Active Route
- text color switches to `Archive Bone`
- underline is replaced by a `Phosphor Lime` edge marker or left rail
- optional small mono prefix like `01`, `02`, `03`

## 3.4 Cursor

Desktop cursor should reinforce the authored-lab feeling, but it must remain optional and lightweight.

### Cursor Construction
- Core dot: `4px` to `6px`, `Phosphor Lime`
- Outer ring: `20px` to `28px`, `1px` border in `Raw Titanium`
- Blend mode: normal; avoid over-styled additive glow

### Cursor States
- Rest: dot + ring follow with slight smoothing
- Interactive hover:
  - ring expands to `36px` to `44px`
  - border changes to `Phosphor Lime`
  - center dot remains stable
- Dossier hover:
  - ring shifts to rectangular bracket mode or shows a compact label like `OPEN`
  - transition duration `220ms`

### Cursor Disable Rules
- disable on touch devices
- disable when `prefers-reduced-motion: reduce`
- disable inside text selection and form controls

## 4. Layout And Spacing System

## 4.1 Page Grid

### Desktop
- 12-column CSS Grid
- max content width: `1440px`
- side gutter: `40px` to `56px`
- column gap: `24px`

### Tablet
- 8-column grid
- side gutter: `24px` to `32px`
- column gap: `20px`

### Mobile
- 4-column grid
- side gutter: `16px`
- column gap: `12px`

## 4.2 Section Rhythm

- major section padding top/bottom:
  - desktop: `96px` to `120px`
  - tablet: `72px` to `88px`
  - mobile: `56px` to `72px`
- card internal padding:
  - desktop: `28px` to `32px`
  - mobile: `20px` to `24px`

## 4.3 Composition Principle

- No repeated center-stacked sections from top to bottom.
- Use asymmetry: oversized left-aligned titles, offset metadata rails, and staggered card widths.
- Hero and proof archive should not share the same alignment logic.

## 5. Motion System

Motion must be technically explicit and semantically useful.

## 5.1 Motion Tokens

### Duration Scale
- `120ms` — micro feedback, cursor state, tiny icon shift
- `180ms` — button hover, active border switch
- `260ms` — card hover, nav compression
- `420ms` — small reveal, drawer label fade
- `600ms` — section reveal on scroll
- `820ms` — page intro or hero staged reveal

### Easing Scale
- `ease-out-standard`: `cubic-bezier(0.22, 1, 0.36, 1)`
- `ease-out-sharp`: `cubic-bezier(0.16, 1, 0.3, 1)`
- `ease-in-out-soft`: `cubic-bezier(0.45, 0, 0.25, 1)`
- `linear-data`: `linear` for counters, progress sweeps, or scanlines

## 5.2 Page Transition

Use a restrained cinematic wipe, not a large theatrical transition.

### Entry
- background stays persistent
- outgoing page content fades to `opacity 0` over `220ms`
- incoming page content enters with:
  - `opacity: 0 -> 1`
  - `y: 18px -> 0`
  - duration `420ms`
  - easing `ease-out-standard`
  - stagger between page headline, intro text, and first content block: `70ms`

### Exit
- no full-screen zoom
- no dramatic blur
- use quick dissolve + slight downward drift `0 -> 8px`

## 5.3 Scroll Reveal

Sections should feel discovered, not dropped in.

### Standard Section Reveal
- Trigger: when section top reaches `80%` of viewport height
- Initial:
  - `opacity: 0`
  - `y: 24px`
- Final:
  - `opacity: 1`
  - `y: 0`
- Duration: `600ms`
- Easing: `ease-out-standard`

### Child Stagger
- cards inside a revealed grid should stagger by `60ms`
- never exceed `180ms` total cascade delay across one row

## 5.4 Hover And Focus Physics

### Buttons / Links
- text color can switch to `Archive Bone` or `Phosphor Lime` depending on role
- border color transition:
  - `Raw Titanium 28%` -> `Phosphor Lime 100%`
  - `180ms`, `ease-out-sharp`
- translateY: `-1px` max
- no bounce

### Cards
- border intensifies
- background brightens by a small delta only
- internal metadata rail slides by `4px` to `8px`
- duration `260ms`, `ease-out-standard`

### Keyboard Focus
- same as hover, plus a secondary `Archive Bone` outline or offset focus rail
- no focus style that depends only on color shift

## 5.5 Wow Effects

The site should use only a few authored motion signatures.

### Wow Effect 01 — Title Scramble Reveal
- Applied to hero title, page chapter titles, and major dossier labels
- Trigger: first reveal only, not on every scroll loop
- Behavior:
  - characters resolve from scrambled mono glyphs into final `Space Grotesk` title
  - duration `320ms` to `480ms`
  - starts after the section crosses the reveal threshold
- Use on:
  - hero H1
  - proof archive heading
  - dossier drawer title
- Never use on paragraph text

### Wow Effect 02 — Dossier Border Scan
- On dossier hover or entry, a thin `Phosphor Lime` trace runs once across the card edge
- Direction: left-to-right on top edge, then down right edge if card is active
- Duration `420ms`
- Should feel like a document is being indexed, not like a neon gaming line

## 5.6 Reduced Motion Mode

When reduced motion is requested:
- disable custom cursor
- remove title scramble
- replace all translate reveals with opacity-only reveals
- set all durations above `420ms` down to `180ms` to `240ms`

## 6. Global Section Behavior

## 6.1 Hero

### Intent
Establish the avatar-led experience immediately.

### Layout
- left-weighted composition
- oversized title in `Space Grotesk`
- supporting metadata strip in `IBM Plex Mono`
- one asymmetric evidence panel or live index block on the opposite side

### Motion
- chapter marker enters first
- H1 reveals second with scramble
- metadata and supporting panel stagger in at `80ms` intervals

## 6.2 Proof Archive Entry

This section should feel like entering a room of indexed evidence.

### Layout
- section title on one side
- status summary or archive legend on the other
- grid begins immediately below without a giant decorative intro

### Motion
- title and archive legend reveal together
- dossier cards stagger into place
- no parallax drift on the cards themselves

## 7. Dossier Card System

There are two primary dossier card modes. They must look related, but not identical.

## 7.1 Shared Dossier Anatomy

Every dossier card contains:
- ID marker (`SIG-01`, `SIG-06`)
- Type chip (`Signal Marker` or `Proof Artifact`)
- Title
- Issuer
- Date
- Archive note excerpt
- evidence status marker

### Shared Visual Rules
- Surface: `Carbon Fog`
- Border: `1px` `Raw Titanium` at `24%` to `32%`
- Title: `Space Grotesk`
- Meta: `IBM Plex Mono`
- No drop shadow
- Depth comes from border contrast, panel layering, and tonal separation

### Shared Interaction Rules
- default state: compressed and readable
- hover: border becomes `Phosphor Lime`, internal layout breathes slightly
- active/open: card border stays lime, one accent rail may turn `Ember Orange`

## 7.2 Image-Backed Dossier Card

Use for `SIG-01`, `SIG-02`, `SIG-03`, `SIG-04`.

### Visual Structure
- Card ratio: `4:5` or `5:6`
- Top zone: image or document preview takes `54%` to `62%` of height
- Bottom zone: metadata + title + excerpt

### Image Treatment
- Use actual proof image, certificate raster, or poster frame
- Apply a dark top overlay or bottom fade to prevent image chaos
- No heavy blur
- No fake glass reflection
- Preview should feel filed, not framed

### Overlay Elements
- top-left: dossier ID in mono
- top-right: status chip
- bottom-left over image: issuer or category label

### Hover Behavior
- image scale: `1 -> 1.03` max
- image brightness may lift by `4%` to `6%`
- card border turns `Phosphor Lime`
- archive excerpt fades in from `opacity 0.65 -> 1`
- border scan effect fires once

### Open State
- card expands into side drawer or inline expanded mode
- source traces appear below the archive note
- proof image gains a secondary zoom or page-preview control

## 7.3 Text-Backed Dossier Card

Use for `SIG-05`, `SIG-06`, `SIG-07`.

These cards must not feel like missing-image fallbacks. They should feel more analytical and, in some cases, stronger than the image-backed cards.

### Visual Structure
- Card ratio: wider than image-backed cards
- Recommended desktop span: `6` columns or a full-width data tile
- Primary zone: oversized metric or rank
- Secondary zone: compact archive note + metadata stack

### Typography Strategy
- Hero metric in `IBM Plex Mono`
- Title and interpretation in `Space Grotesk`
- Supporting labels in `IBM Plex Mono`

### Graphic Language
- Use typographic data-viz, not icons pretending to be charts
- Add:
  - vertical measurement lines
  - micro-axis labels
  - compact bars or rule lines via CSS pseudo-elements
  - field markers like `RANK`, `FIELD`, `METHOD`, `OUTPUT`

### Color Logic
- Large metric uses `Archive Bone` by default
- `Phosphor Lime` highlights one numeric token only
- `Ember Orange` is reserved for secondary marker, never the main percentage

## 7.4 SIG-06 Example — TOP-9% Card

This is the reference solution for text-backed dossiers.

### Layout
- Left block:
  - giant `TOP-9%` in `IBM Plex Mono`
  - beneath it: smaller line `68 / ~800`
- Right block:
  - title
  - issuer
  - archive note excerpt
  - small metadata rows

### Visual Intent
- The percentage must dominate the card more strongly than any thumbnail would.
- The card should read like a terminal report fused with editorial poster typography.

### Hover Behavior
- `TOP-9%` changes from `Archive Bone` to mixed `Archive Bone + Phosphor Lime` emphasis
- micro rule under the metric extends from `24px` to `100%`
- archive note shifts upward by `6px`
- border scan fires horizontally first, then stops

### Open State
- reveal a narrow details band with:
  - task type
  - method note
  - rank
  - field size
- This band should appear as a deployed data shelf, not as a modal paragraph dump

## 7.5 Text-Only Card Variants

### `50+` Iteration Card
For `SIG-05`, the giant number is `50+`, with a cluster label like `AGENT RUNS`.

### `#64` Leaderboard Card
For `SIG-07`, use `#64` as the main hero metric and `56.183μs` as the secondary line.

The rule is consistent:
- one giant number
- one supporting stat
- one short excerpt
- one visible system label

## 8. Dossier Expansion Pattern

Avoid a generic lightbox.

### Preferred Pattern
- Desktop: side drawer sliding from the right
- Tablet: wide bottom drawer
- Mobile: stacked bottom sheet

### Drawer Structure
- Header: dossier ID, type, title
- Media / metric panel
- Archive note
- source traces
- evidence status

### Drawer Motion
- overlay fade: `180ms`
- panel slide:
  - desktop: `x: 24px -> 0`
  - mobile: `y: 20px -> 0`
- duration `420ms`
- easing `ease-out-standard`

## 9. Mobile Fallback

The site must preserve identity on a narrow screen without pretending desktop motion still fits.

## 9.1 Shell Adjustments
- remove custom cursor entirely
- simplify floating nav into a compact top control bar
- keep grid overlay, but reduce contrast
- reduce simultaneous layered atmospheres to one section at a time

## 9.2 Navigation On Mobile
- compact top shell with current route + menu trigger
- optional bottom progress rail only if it stays subtle
- no oversized persistent nav that steals vertical space

## 9.3 Dossier Grid On Mobile
- one column stack
- image-backed dossiers keep preview on top, text below
- text-backed dossiers keep giant metric, but clamp sizes:
  - large number: `48px` to `64px`
  - supporting stat: `14px` to `16px`

## 9.4 Motion Simplification
- disable section-level stagger beyond `2` children
- no repeated scramble on scroll
- reduce hover-only behaviors into tap/press states
- page transitions: opacity + `8px` move max

## 9.5 Touch Interaction
- tap once = focus card state
- tap second action or explicit affordance = open drawer
- never depend on hover to reveal critical metadata

## 10. Accessibility And Implementation Guardrails

## 10.1 Contrast
- Archive Bone on Carbon Fog or Void Black is default readable pairing
- Phosphor Lime must not carry large paragraph text
- Raw Titanium is metadata only; not for main body copy on dark fields if contrast drops too low

## 10.2 Interaction
- every hover state must have a keyboard-focus equivalent
- custom cursor cannot be the only interactive cue
- dossier open state must be possible by keyboard and touch

## 10.3 Motion Safety
- all major animated entrances should be skippable by reduced-motion preferences
- no infinite animations except subtle background noise if fully static in perception

## 10.4 Performance Boundaries
- no hard dependency on WebGL
- keep backgrounds CSS-based where possible
- prefer transform + opacity for motion
- avoid animating large blur radii or box-shadow

## 11. Frontend Handoff Notes

### Recommended Build Order
1. Build the shell and layer stack first
2. Implement nav compression and section reveal second
3. Implement dossier card shared anatomy
4. Split image-backed and text-backed variants
5. Add drawer behavior
6. Add scramble and border-scan signatures last

### Framer Motion Mapping
- Use shared motion tokens for `page`, `section`, `card`, `drawer`
- Keep motion variants reusable across routes
- Avoid one-off bespoke easings unless the effect is truly a signature

### Component Boundary
- One dossier base component with two visual sub-variants is preferred
- The metric-only card must not be a downgraded fallback; treat it as a first-class pattern

## 12. Acceptance Check

This spec is only considered correctly implemented if a frontend engineer can answer all of these questions from the document alone:

- What layers exist in the shell and how are they stacked?
- What exact colors and fonts belong to each part of the system?
- How does a section enter on scroll?
- What happens when a dossier card is hovered, focused, or opened?
- How is a text-only dossier made visually strong without fake imagery?
- What is removed or simplified on mobile?

If any future build answers these questions with “it appears nicely” or “we improvised it,” the spec was not followed.
