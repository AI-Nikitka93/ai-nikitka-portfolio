---
name: High-Density Archive
colors:
  surface: '#101410'
  surface-dim: '#101410'
  surface-bright: '#363a35'
  surface-container-lowest: '#0b0f0b'
  surface-container-low: '#191d18'
  surface-container: '#1d211c'
  surface-container-high: '#272b26'
  surface-container-highest: '#323631'
  on-surface: '#e0e4dc'
  on-surface-variant: '#baccb0'
  inverse-surface: '#e0e4dc'
  inverse-on-surface: '#2d312c'
  outline: '#85967c'
  outline-variant: '#3c4b35'
  surface-tint: '#2ae500'
  primary: '#efffe3'
  on-primary: '#053900'
  primary-container: '#39ff14'
  on-primary-container: '#107100'
  inverse-primary: '#106e00'
  secondary: '#b7c8e1'
  on-secondary: '#213145'
  secondary-container: '#3a4a5f'
  on-secondary-container: '#a9bad3'
  tertiary: '#f9faf5'
  on-tertiary: '#2e312e'
  tertiary-container: '#dcded9'
  on-tertiary-container: '#5f625e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#79ff5b'
  primary-fixed-dim: '#2ae500'
  on-primary-fixed: '#022100'
  on-primary-fixed-variant: '#095300'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#e1e3de'
  tertiary-fixed-dim: '#c5c7c2'
  on-tertiary-fixed: '#191c19'
  on-tertiary-fixed-variant: '#454744'
  background: '#101410'
  on-background: '#e0e4dc'
  surface-variant: '#323631'
typography:
  headline-lg:
    fontFamily: IBM Plex Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 120%
    letterSpacing: -0.02em
  headline-md:
    fontFamily: IBM Plex Mono
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 120%
  body-md:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 150%
  body-sm:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 140%
  label-caps:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 100%
    letterSpacing: 0.05em
  code-dense:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 120%
spacing:
  unit: 4px
  gutter: 1px
  margin: 12px
  container-padding: 8px
---

## Brand & Style
The design system is engineered for maximum information density and technical precision. It evokes the atmosphere of a high-end surveillance terminal or a deep-level data vault. The brand personality is cold, efficient, and unapologetically functional. It targets a sophisticated user base—engineers, data archivists, and technical analysts—who require immediate access to vast amounts of data without visual fluff.

The aesthetic leans heavily into **Technical Brutalism**. It rejects soft edges and decorative whitespace in favor of a rigid, grid-bound structure. The primary emotional response is one of total control and professional immersion. The primary language is Russian, utilizing the structured, rhythmic nature of Cyrillic characters to reinforce the systematic feel of the interface.

## Colors
This design system operates exclusively in a high-contrast dark mode. The foundation is a deep olive-black (#050805), providing a void-like canvas that minimizes eye strain during long-term data monitoring. 

The primary accent is a high-intensity "Command Lime" (#39FF14), used for critical data points, active states, and primary CTAs. Secondary text and non-interactive metadata utilize a muted slate grey (#64748B) to create a clear visual hierarchy. A tertiary olive-tinted dark grey (#1A1D1A) is reserved for subtle UI partitioning, such as table headers and container backgrounds, ensuring that the interface remains legible despite its extreme density.

## Typography
Typography in this design system is strictly limited to **IBM Plex Mono**. This choice ensures that every character, whether Latin or Cyrillic, occupies the same horizontal space, maintaining the integrity of the vertical grid across all data columns.

Russian text must be rendered with careful attention to line heights; the mono-spaced nature of the font can lead to dense blocks of text, so 150% line height is used for body copy to preserve legibility. All labels and metadata should be treated as "data points," often utilizing uppercase transformations and slightly increased letter spacing to differentiate them from standard content.

## Layout & Spacing
The layout follows a **Grid-Heavy Fixed Model**. Every element is snapped to a 4px baseline grid. Unlike consumer interfaces that prioritize whitespace, this design system treats empty space as wasted utility. 

Margins are kept at a functional minimum (12px), and components are separated by 1px "hairline" borders instead of wide gutters. This creates a "paneled" look, where the screen is divided into specific modules. A 12-column grid is used for the primary layout, but sub-modules often employ their own internal micro-grids to display dense streams of telemetry or archival logs. Layouts should expand to fill the container, but maintain rigid alignment on the left and right axes.

## Elevation & Depth
Depth is conveyed through **Bold Borders** and **Tonal Layering** rather than shadows. Shadows are strictly forbidden as they conflict with the flat, terminal-inspired aesthetic.

Visual hierarchy is achieved by layering containers. The base layer is the deepest olive-black. Secondary panels use a slightly lighter fill or a 1px solid border in slate grey. Active or "focused" panels are signaled by a 1px border in the primary lime color. To simulate a premium terminal feel, a subtle "scanline" overlay (0.03 opacity) can be applied to the entire viewport, and focused elements may feature a very low-opacity lime glow effect restricted within their borders.

## Shapes
The shape language is defined by absolute **Sharpness (0px)**. There are no rounded corners in the design system. Every button, input field, card, and window fragment must have 90-degree angles. This reinforces the brutalist, technical nature of the archive and ensures that elements can be packed tightly together without creating awkward gaps at the intersections of components.

## Components
Components are designed for rapid scanning and high-frequency interaction.

- **Buttons:** Rectangular blocks with solid fills for primary actions and 1px lime borders for secondary actions. Text is always centered and uppercase.
- **Inputs:** Terminal-style prompts. The active state is indicated by a blinking underscore cursor in the primary lime color.
- **Data Tables:** The core component of the system. Borders are 1px slate grey. Row hovering triggers a subtle olive-grey background shift. Critical values are highlighted in lime.
- **Chips/Status Badges:** Small, square-cornered boxes. Success states use lime text on a transparent background with a lime border; "Archive" states use slate grey.
- **Scrollbars:** Custom, ultra-thin (4px) bars without rounded ends. The thumb is solid slate grey, turning lime on hover.
- **Grid Dividers:** Vertical and horizontal lines used to segment the screen into logical "Data Panes," often featuring small coordinate markers (e.g., "SEC-01", "LN-402") in the corners.