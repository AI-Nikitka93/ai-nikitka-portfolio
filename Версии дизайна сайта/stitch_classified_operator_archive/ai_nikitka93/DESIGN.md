---
name: AI_Nikitka93
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c3caac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8d9479'
  outline-variant: '#434933'
  surface-tint: '#a1d800'
  primary: '#ffffff'
  on-primary: '#263500'
  primary-container: '#b8f600'
  on-primary-container: '#506e00'
  inverse-primary: '#4b6700'
  secondary: '#ffb4a8'
  on-secondary: '#690000'
  secondary-container: '#920703'
  on-secondary-container: '#ff9a8a'
  tertiary: '#ffffff'
  on-tertiary: '#601400'
  tertiary-container: '#ffdbd1'
  on-tertiary-container: '#bc3000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b8f600'
  primary-fixed-dim: '#a1d800'
  on-primary-fixed: '#141f00'
  on-primary-fixed-variant: '#384e00'
  secondary-fixed: '#ffdad4'
  secondary-fixed-dim: '#ffb4a8'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#920703'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb5a0'
  on-tertiary-fixed: '#3b0900'
  on-tertiary-fixed-variant: '#872000'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  h1:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.02em
  h2:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  h3:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
  body:
    fontFamily: IBM Plex Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.0'
  metadata:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.0'
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  border-thin: 2px
  border-thick: 4px
---

## Brand & Style

This design system is rooted in **Cyber-Brutalism**, evoking a raw, industrial terminal aesthetic. It is built for a portfolio that values technical precision over decorative softness. The personality is aggressive, unapologetic, and highly structured, mimicking high-performance command-line interfaces and hardware diagnostics.

The visual language communicates authority and "under-the-hood" access. It rejects modern UI trends of accessibility through softness, opting instead for high-density information, heavy mechanical frames, and a "machine-first" hierarchy. The target audience expects a digital environment that feels engineered rather than designed.

## Colors

The palette is anchored by a near-black base to simulate a powered-down cathode-ray tube. The primary interaction color is a high-vibrancy **Toxic Phosphor-Lime**, used for active states and critical paths. 

**Oxide Red** and **Ember Orange** serve as secondary accents for warnings, destructive actions, or high-priority system alerts. Text content utilizes **Bone** for high-legibility reading, while **Titanium** is reserved for metadata, timestamps, and non-essential system telemetry to maintain a clear information hierarchy.

## Typography

Typography is divided into two functional tiers. **Space Grotesk** is used for massive, high-impact headings, often set in uppercase to emphasize the brutalist structure. **IBM Plex Mono** handles all body copy, system labels, and metadata to reinforce the technical, monospaced aesthetic of terminal environments.

System labels should feel like "stamped" identifiers on a chassis. Large headlines should be tightly tracked to maximize visual weight. Avoid all ligatures or decorative flourishes.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model based on a rigorous 4px baseline. Layouts are constructed within visible containers defined by heavy borders. Gutters are kept narrow to create a sense of high-density data compression.

Margins are consistent and mathematical. Content blocks should be framed in 2px borders, while primary layout sections or "hero" modules use 4px borders to establish dominance. Alignment is absolute; no element should float outside of the established grid lines.

## Elevation & Depth

Depth is achieved through **Structural Layering** rather than shadows. Instead of Z-axis elevation, use nested containers and thick borders to signify hierarchy. 

There are no soft shadows or blurs. To emphasize a focused element (like a modal or pop-out), use a solid offset "shadow" effect: a duplicated container shifted 4px-8px down and right, filled with a solid color (Primary or Oxide Red). Backdrop overlays must be 100% opaque or use a high-contrast dither pattern rather than a soft transparency.

## Shapes

The shape language is strictly **Rectilinear**. All corners are set to 0px. This applies to buttons, inputs, cards, and image containers. Any deviation into rounded corners is a violation of the system's core philosophy.

Visual interest is created through "clipped" corners (45-degree chamfers) if necessary for complex UI modules, but the fundamental unit remains the hard-edged rectangle.

## Components

### Buttons
Buttons are solid blocks of Toxic Phosphor-Lime with near-black text. On hover, the colors invert. Active states use a solid 4px offset shadow in Oxide Red to simulate a physical "press."

### Chips & Tags
Small, high-contrast rectangles with 2px borders. Use IBM Plex Mono in all-caps. Status chips use the Ember Orange for "In Progress" and Toxic Lime for "Complete."

### Lists & Tables
Tables are the primary data visualization tool. Every row and column must have a visible 2px border. Header rows should have a Phosphor-Lime background with black text.

### Input Fields
Inputs are Bone-colored outlines (2px). The cursor is a solid Phosphor-Lime block that blinks. Focus states change the entire border to Phosphor-Lime.

### Cards
Cards are heavy containers with 4px borders. Every card must include a "System Label" in the top-left corner, describing the content type (e.g., [PROJECT_001], [LOG_ENTRY]).

### Navigation
The navigation bar is a fixed-width sidebar or top-bar with 4px borders separating it from the main viewport. Navigation items use large, monospaced labels that underline on hover.