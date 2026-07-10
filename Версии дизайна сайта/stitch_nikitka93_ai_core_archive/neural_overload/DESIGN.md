---
name: Neural Overload
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
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ffabf3'
  on-secondary: '#5b005b'
  secondary-container: '#fe00fe'
  on-secondary-container: '#500050'
  tertiary: '#f5f5f5'
  on-tertiary: '#2f3131'
  tertiary-container: '#d9d9d9'
  on-tertiary-container: '#5d5f5f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffd7f5'
  secondary-fixed-dim: '#ffabf3'
  on-secondary-fixed: '#380038'
  on-secondary-fixed-variant: '#810081'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: 0.05em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  mono-label:
    fontFamily: monospace
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  data-dense:
    fontFamily: monospace
    fontSize: 10px
    fontWeight: '400'
    lineHeight: '1.0'
spacing:
  grid-unit: 4px
  gutter: 16px
  margin: 24px
  container-max: 1440px
---

## Brand & Style

This design system is engineered for high-velocity data ingestion and intense AI monitoring environments. The brand personality is aggressive, technical, and uncompromising, designed to evoke the feeling of a direct neural interface where information density is a feature, not a burden. The aesthetic draws heavily from **Cyberpunk-inspired Brutalism** and **High-Contrast Digitalism**, prioritizing raw data visibility over whitespace.

The emotional response should be one of urgent focus and systemic power. Expect sharp edges, flickering "glitch" transitions, and a persistent sense of a live, scanning machine. This system does not hide complexity; it weaponizes it through dense data grids and glowing structural elements.

## Colors

The palette is anchored in **Deepest Black (#050505)** to maximize the luminosity of the accent colors. **Electric Cyan** serves as the primary action and "online" state color, while **Hot Magenta** is reserved for critical alerts, high-priority AI processing, and secondary accents. **Stark White** provides maximum legibility for high-density data.

Use saturated glows sparingly but deliberately to indicate active processes. Backgrounds remain pitch black to ensure the "scanning lines" and "grid" overlays maintain high contrast without muddying the interface.

## Typography

This design system utilizes **Space Grotesk** for its technical, geometric sans-serif qualities, specifically leveraging its condensed feel in headlines. To achieve the "Neural Overload" aesthetic, all labels and data-rich elements must utilize a system **Monospace** font. 

Headlines should be styled with tight line-height and uppercase transforms to mimic military dossier headers. Data blocks should use ultra-small mono fonts to maximize information density on screen.

## Layout & Spacing

The layout follows a **Fixed Grid** system based on a strict 4px rhythm. The interface is composed of modular "cells" that snap to a 12-column structure. 

- **Grid Overlays:** A subtle, 5% opacity cyan grid must be visible in the background of all workspaces.
- **Density:** Information density is high. Use minimal padding within containers (8px–12px) to pack data points closely.
- **Scanning Lines:** Apply a global CSS scanline animation (horizontal 1px line moving vertically) at 0.03 opacity to simulate a live cathode-ray or neural stream.

## Elevation & Depth

Depth is conveyed through **High-Contrast Outlines** and **Luminous Borders** rather than shadows. 

- **Level 0 (Floor):** Pure #050505 with the global scanning grid.
- **Level 1 (Containers):** 1px solid Electric Cyan or Hot Magenta borders. No background tint (keep transparent to show grid).
- **Active State:** Elements gain an outer "neon" glow (`box-shadow: 0 0 10px var(--glow-cyan)`).
- **Glitch Offset:** Interactive elements may have a pseudo-element offset by 2px in Magenta to create a "chromatic aberration" effect on hover.

## Shapes

The design system utilizes **zero roundedness (Sharp)**. All corners are 90-degree angles to reinforce the cold, industrial, and digital nature of the interface. 

Where decorative elements are needed, use "clipped corners" (45-degree chamfers) on container edges or buttons to evoke a ruggedized hardware feel.

## Components

- **Buttons:** Sharp 1px borders. Default state is Cyan border/text. Hover state is solid Cyan background with Black text and a subtle Magenta "glitch" shadow.
- **Chips/Status Tags:** Monospace text enclosed in a solid block of color. Use Magenta for "ERROR/CRITICAL" and Cyan for "STABLE/ACTIVE."
- **Input Fields:** Bottom-border only or full 1px border. Focus state triggers a vertical "flicker" animation of the border color.
- **Cards/Modules:** Must include a "Header Bar" with a Monospace ID tag (e.g., `[SECTION_08_A]`) in the top-left corner.
- **Data Grids:** Use 1px Cyan lines to separate rows and columns. Alternate row backgrounds are not used; use subtle brightness shifts instead.
- **Progress Bars:** Segmented blocks rather than a smooth fill to simulate loading discrete data packets.
- **Additional Component: The "Terminal Console":** A persistent bottom-docked feed of system logs in `data-dense` monospace typography, constantly scrolling.