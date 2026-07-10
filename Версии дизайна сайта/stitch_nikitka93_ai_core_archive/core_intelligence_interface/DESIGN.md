---
name: Core Intelligence Interface
colors:
  surface: '#0f1412'
  surface-dim: '#0f1412'
  surface-bright: '#353a38'
  surface-container-lowest: '#0a0f0d'
  surface-container-low: '#181d1b'
  surface-container: '#1c211f'
  surface-container-high: '#262b29'
  surface-container-highest: '#313634'
  on-surface: '#dfe4e0'
  on-surface-variant: '#c2caaf'
  inverse-surface: '#dfe4e0'
  inverse-on-surface: '#2c312f'
  outline: '#8c947b'
  outline-variant: '#424935'
  surface-tint: '#96da06'
  primary: '#ffffff'
  on-primary: '#223600'
  primary-container: '#b0f734'
  on-primary-container: '#4a6f00'
  inverse-primary: '#456800'
  secondary: '#ffb59a'
  on-secondary: '#5b1b00'
  secondary-container: '#cd4700'
  on-secondary-container: '#fffbff'
  tertiary: '#ffffff'
  on-tertiary: '#343025'
  tertiary-container: '#e9e2d1'
  on-tertiary-container: '#696457'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b0f734'
  primary-fixed-dim: '#96da06'
  on-primary-fixed: '#121f00'
  on-primary-fixed-variant: '#334f00'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59a'
  on-secondary-fixed: '#380d00'
  on-secondary-fixed-variant: '#802a00'
  tertiary-fixed: '#e9e2d1'
  tertiary-fixed-dim: '#cdc6b6'
  on-tertiary-fixed: '#1e1b11'
  on-tertiary-fixed-variant: '#4b473b'
  background: '#0f1412'
  on-background: '#dfe4e0'
  surface-variant: '#313634'
typography:
  h1:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  h2:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h3:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0em
  body-main:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  ui-label:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  data-mono:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  island-padding: 32px
  gutter: 20px
---

## Brand & Style
The design system is engineered for high-performance AI environments where clarity meets atmospheric depth. It evokes a sense of "industrial futurism"—moving away from friendly, rounded tech tropes toward a precise, laboratory-grade aesthetic. The personality is analytical, sophisticated, and quiet.

The visual style is centered on **Glassmorphism**, specifically utilizing a "Cold-Cathode" approach. This involves heavy background blurs that simulate thick physical glass, paired with high-frequency luminous edges. The interface should feel like a series of "Floating Islands" suspended in a deep, void-like space, avoiding standard flat containers in favor of layered transparency and subtle light emissions.

## Colors
The palette is rooted in a high-contrast, dark-mode-only environment. 

- **The Foundation:** Void Black is the infinite base layer. Carbon Fog is used for secondary surfaces or to define structural areas.
- **The Accents:** Phosphor Lime is the primary action color, used for success states and active AI processes. Ember Orange is reserved for critical warnings and high-priority data points.
- **The Neutrals:** Archive Bone provides a tactile, paper-like contrast for secondary text, while Raw Titanium is used for structural borders and inactive UI elements.

All glass panels must utilize a semi-transparent version of Carbon Fog (e.g., 40-60% opacity) to ensure the "frosted" effect remains legible against the Void Black background.

## Typography
The typographic hierarchy balances technical precision with editorial impact.

- **Headings:** Space Grotesk is used for all major headings. It should be set with tight letter-spacing to emphasize its geometric, futuristic construction.
- **Body:** Inter (system fallback) provides maximum legibility for long-form AI explanations and descriptions.
- **Data & UI Labels:** IBM Plex Mono is the workhorse for all interactive elements, code snippets, and metadata. Its monospaced nature reinforces the "AI-core" technical narrative.
- **Language Switching:** The RU/EN toggle must always be set in IBM Plex Mono to maintain the aesthetic of a hardware-toggled switch.

## Layout & Spacing
The layout follows a "Floating Island" model rather than a traditional edge-to-edge grid. 

- **Grid:** A 12-column fluid grid is used, but content is contained within "islands"—glass panels that do not necessarily touch the edges of the viewport.
- **Rhythm:** A 4px baseline grid ensures tight alignment. 
- **Margins:** Large outer margins (48px+) are encouraged to allow the background Void Black to "breathe" around the interface islands.
- **Safe Areas:** Islands should maintain a minimum internal padding of 32px to reinforce the premium, spacious feel of the glass containers.

## Elevation & Depth
Depth is created through optical layering rather than drop shadows.

1.  **Level 0 (Background):** Pure Void Black (#0A0D0C).
2.  **Level 1 (Sub-layer):** Subtle Carbon Fog blurs (20px blur) to define zones.
3.  **Level 2 (Main Island):** Carbon Fog at 40% opacity with a 40px backdrop-filter blur. 1px solid stroke using Raw Titanium at 20% opacity.
4.  **Level 3 (Interactive/Hover):** Increase stroke opacity to 50% and add a subtle 10px inner glow using Phosphor Lime.

**Luminous Edges:** Every glass panel must have a 1px top and left border that is slightly brighter than the bottom and right, simulating a top-down light source hitting the edge of a glass sheet.

## Shapes
This design system favors architectural "Soft-Industrial" geometry. 

- **Corner Radius:** Standard containers use a 0.25rem (4px) or 0.5rem (8px) radius. Avoid large "pill" shapes for buttons to maintain the technical, professional tone. 
- **Navigation Panels:** These may feature slightly larger radii (12px) to distinguish them as primary structural elements.
- **Data Points:** Status indicators and small UI markers should be sharp squares or 45-degree chamfered polygons to reflect the precision of AI processing.

## Components
- **Buttons:** Non-ghost buttons use a Phosphor Lime fill with black text (IBM Plex Mono). Hover states should trigger a subtle Phosphor Lime glow effect (5px blur). Secondary buttons are glass-based with 1px Raw Titanium strokes.
- **Glass Panels:** These are the primary containers. They must feature `backdrop-filter: blur(40px)` and a 1px border.
- **Language Switcher:** A segmented control within the top-right of the glass navigation panel. Active states use Archive Bone text; inactive states use Raw Titanium.
- **Input Fields:** Minimalist 1px bottom-border only, or a fully enclosed glass field. Focus states glow Phosphor Lime.
- **Progress Bars:** Ultra-thin (2px) lines using Phosphor Lime. Use a "pulse" animation to indicate active AI generation.
- **Status Chips:** Small, monospaced labels with a leading 4px square indicator (Phosphor Lime for active, Ember Orange for error).