---
name: AI_Nikitka93
colors:
  surface: '#0d1418'
  surface-dim: '#0d1418'
  surface-bright: '#323a3f'
  surface-container-lowest: '#080f13'
  surface-container-low: '#151d21'
  surface-container: '#192125'
  surface-container-high: '#232b2f'
  surface-container-highest: '#2e363a'
  on-surface: '#dce4e9'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#dce4e9'
  inverse-on-surface: '#2a3136'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#ffb5a0'
  on-secondary: '#601400'
  secondary-container: '#ff5625'
  on-secondary-container: '#541100'
  tertiary: '#ffffff'
  on-tertiary: '#353024'
  tertiary-container: '#ebe2d0'
  on-tertiary-container: '#6a6456'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb5a0'
  on-secondary-fixed: '#3b0900'
  on-secondary-fixed-variant: '#872000'
  tertiary-fixed: '#ebe2d0'
  tertiary-fixed-dim: '#cec6b5'
  on-tertiary-fixed: '#1f1b11'
  on-tertiary-fixed-variant: '#4c463a'
  background: '#0d1418'
  on-background: '#dce4e9'
  surface-variant: '#2e363a'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  h1-editorial:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2-module:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-main:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  ui-label:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
  data-mono:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 12px
  margin-page: 32px
  module-padding: 20px
---

## Brand & Style

This design system is built on the philosophy of **Dense Bento Maximalism**. It rejects the vast emptiness of modern minimalism in favor of a "highly authored" editorial environment. The brand personality is intellectually curious, technically sophisticated, and unapologetically busy—evoking the feeling of a premium physical magazine fused with a high-end command center.

The aesthetic draws from **Brutalism** (through heavy lines and monospaced type) and **Modern Editorial Design** (through intentional white space within modules and dramatic scale shifts). The goal is to present a high volume of information without descending into the chaos of a generic dashboard. Every module is a curated surface, contributing to a rich, layered tapestry that feels like a singular, premium artifact.

## Colors

The color palette is anchored in a **Dark Editorial Base**. The foundation is a near-black charcoal, providing a deep, non-reflective canvas that allows the high-chroma accents to vibrate.

- **Bone (#E3DAC9):** Used for primary body text and significant headers. It is softer than pure white, reinforcing the editorial/paper feel.
- **Lime (#CCFF00):** The primary brand signal. Use this for call-to-actions, active states, and critical paths. It represents the "AI energy."
- **Ember (#FF4500):** A micro-highlight color. Used sparingly for alerts, recording states, or "hot" data points.
- **Titanium (#71797E):** Reserved for technical metadata, labels, and secondary UI borders. It recedes into the background to keep the "busy" layout legible.

## Typography

The typography strategy relies on a sharp contrast between the geometric, futuristic **Space Grotesk** and the mechanical, utilitarian **IBM Plex Mono**.

**Space Grotesk** handles the "Editorial" voice. Large headlines should use tight letter-spacing to create a blocky, impactful presence. **IBM Plex Mono** is used for the "System" voice—technical specs, numbers, small labels, and the RU/EN toggle.

For the **Russian (RU)** locale, ensure that the Cyrillic glyphs in Space Grotesk are monitored for descender collisions in dense blocks. The IBM Plex Mono provides a necessary grounding effect for data-heavy modules.

## Layout & Spacing

This system utilizes a **12-column Fluid Grid** designed for bento-style modularity. The density is achieved through narrow gutters (12px) and a high frequency of "micro-surfaces."

Modules (cards) should span varied column counts: 2, 3, 4, 6, or 8. Avoid a repetitive 3x3 grid; instead, mix vertical spans (1x2) with horizontal spans (2x1) to create an authored, asymmetrical balance. The "Busy" feel is maintained by ensuring that at least 8-10 modules are visible on a standard desktop viewport. The RU/EN toggle is always anchored to the top-right module of the primary header section.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** rather than traditional shadows. Surfaces do not "float"; they are "etched" or "stacked."

- **Level 0:** Background Base (#0A0A0A).
- **Level 1:** Module Surfaces (#161616).
- **Level 2:** Nested interactive elements or hovered cards (#222222).

Borders are the primary separators. Use **1px solid borders** in Titanium (#71797E) at 30% opacity for internal module divisions. For high-priority modules, use a thin Lime (#CCFF00) top-border to signify "active" status. Glassmorphism is used very selectively—only for global navigation overlays—using a 20px backdrop blur and a 5% Bone fill.

## Shapes

To soften the technical "brutalist" edge and provide a premium "hardware" feel, this design system uses **Rounded** geometry.

Standard modules use a 1rem (16px) corner radius. Internal elements like buttons and input fields use a 0.5rem (8px) radius. This creates a "nested" aesthetic where the outer containers feel like sturdy chassis and the inner elements feel like integrated components. The RU/EN toggle should be a pill-shaped container to distinguish it from the rectangular module logic.

## Components

### Cards (Bento Modules)
The core component. Every card must have a `ui-label` in the top-left corner using IBM Plex Mono. High-priority cards can utilize an Ember (#FF4500) dot next to the label.

### Buttons
- **Primary:** Solid Lime (#CCFF00) background, Rich Black (#0A0A0A) Space Grotesk text. Bold and high-contrast.
- **Secondary:** Ghost style. Titanium (#71797E) border, Bone (#E3DAC9) text.
- **Technical:** IBM Plex Mono text with a small Ember highlight on hover.

### RU/EN Toggle
A specialized component in the top-right. It features a segmented pill design. The active locale is highlighted in Lime (#CCFF00) text with a subtle Titanium underline.

### Data Inputs
Input fields are "flush" with the module background, defined only by a bottom Titanium border. When focused, the border transitions to Lime. Use IBM Plex Mono for input text to emphasize the "data entry" nature of the UI.

### Micro-Lists
Used within small modules. Items are separated by a 1px Titanium hairline. Each item should have a monospaced index (e.g., 01, 02) to reinforce the high-information density.