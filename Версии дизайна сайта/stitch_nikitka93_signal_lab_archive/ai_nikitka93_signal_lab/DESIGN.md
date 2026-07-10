---
name: AI_Nikitka93 Signal Lab
colors:
  surface: '#111413'
  surface-dim: '#111413'
  surface-bright: '#373a38'
  surface-container-lowest: '#0c0f0e'
  surface-container-low: '#191c1b'
  surface-container: '#1d201f'
  surface-container-high: '#282b29'
  surface-container-highest: '#323534'
  on-surface: '#e1e3e1'
  on-surface-variant: '#c2caaf'
  inverse-surface: '#e1e3e1'
  inverse-on-surface: '#2e3130'
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
  background: '#111413'
  on-background: '#e1e3e1'
  surface-variant: '#323534'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 120px
    fontWeight: '700'
    lineHeight: 100%
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 110%
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 120%
  body-large:
    fontFamily: IBM Plex Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 160%
  body-main:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 150%
  label-tiny:
    fontFamily: IBM Plex Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 120%
    letterSpacing: 0.1em
  metadata:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 140%
spacing:
  unit: 4px
  gutter: 24px
  margin: 40px
  container-max: 1440px
---

## Brand & Style

This design system establishes a high-end editorial aesthetic for a technical signal lab. The brand personality is curatorial, authoritative, and clinical, functioning as a bridge between raw artificial intelligence data and premium investigative journalism. 

The visual direction is a fusion of **Minimalism** and **Brutalism**, leaning into a "proof-led" aesthetic. It treats information as evidence. The user experience should feel like navigating a classified digital archive—structured, high-contrast, and intellectually demanding. Key visual drivers include rigid grid alignment, technical annotation lines (0.5pt strokes), and dense metadata blocks that suggest a deep layer of underlying data.

## Colors

The palette is rooted in a "Void" foundation to ensure maximum focus on technical signals. 

- **Void Black (#0A0D0C)** serves as the primary canvas, providing a deep, non-reflective background.
- **Carbon Fog (#161B19)** is used for structural grounding, such as card surfaces and header containers.
- **Archive Bone (#D6CFBF)** acts as the primary ink color, offering a softer, more sophisticated legibility than pure white.
- **Phosphor Lime (#B7FF3C)** is the high-visibility signal color, used for active states, success metrics, and "live" data.
- **Ember Orange (#FF6A2A)** provides a critical alert or archival marking tone.
- **Raw Titanium (#8E968C)** is reserved for technical annotations, grid lines, and secondary metadata that should not distract from the main narrative.

## Typography

The typography system creates a hierarchy between "Editorial Impact" and "Technical Precision." 

**Space Grotesk** is used for oversized, dramatic headers. These should often be used with tight tracking to create a massive, structural feel. **IBM Plex Mono** is the workhorse of the system, handling all body copy, technical labels, and data points. 

All text must be in Russian. In accordance with the editorial style, use "label-tiny" for all structural annotations (e.g., [СЕКЦИЯ_01], [ДАТА_ОБРАБОТКИ]). Numerical data should always be set in Mono to maintain tabular alignment.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model based on a 12-column editorial layout. The layout is defined by its mathematical rigidity.

- **Grid Lines:** Vertical and horizontal dividers (0.5pt Raw Titanium) should be visible to define content zones.
- **Rhythm:** A 4px baseline grid ensures vertical alignment of mono-spaced text and technical markers.
- **Margins:** Generous outer margins (40px) frame the content like a printed magazine.
- **Modules:** Content is grouped into "Data Blocks" that span specific column counts (e.g., metadata in 3 columns, main narrative in 6 columns, sidebars in 3 columns).

## Elevation & Depth

Depth is conveyed through **structural layering and bold borders** rather than shadows. In this design system, shadows are prohibited to maintain a flat, archival aesthetic.

- **Tier 1 (Base):** Void Black (#0A0D0C) for the primary viewport.
- **Tier 2 (Surface):** Carbon Fog (#161B19) for modules and inset areas.
- **Tier 3 (Active):** Phosphor Lime (#B7FF3C) used as a flat fill to indicate selection.
- **Separation:** Hierarchy is established through the use of Raw Titanium (#8E968C) hair-lines. When an element needs to feel "raised," it is given a solid 1px Archive Bone border rather than a shadow.

## Shapes

The shape language is strictly **Sharp (0px)**. To reflect a technical, high-end laboratory environment, no rounded corners are permitted. Every button, input field, card, and image container must have 90-degree angles. This reinforces the grid and creates a sense of uncompromising precision.

## Components

- **Buttons:** Rectangular with a 1px border of Archive Bone. Text is IBM Plex Mono, centered, uppercase. The hover state fills the button with Phosphor Lime and changes text to Void Black.
- **Chips/Tags:** Small rectangular boxes with a "label-tiny" font. They should include a prefix character (e.g., `> СИГНАЛ`).
- **Technical Annotation Lines:** Horizontal or vertical 0.5pt strokes in Raw Titanium that "anchor" labels to specific data points.
- **Input Fields:** Bottom-border only (Archive Bone). The label sits above in a smaller mono font. The caret/cursor is a solid Phosphor Lime block.
- **Metadata Blocks:** Tables with no external borders, only internal horizontal dividers. Left column holds the key (e.g., [ID_ОБЪЕКТА]), right column holds the value.
- **Status Indicators:** A solid square (8px) using Phosphor Lime for "Active," Ember Orange for "Alert," and Raw Titanium for "Idle."
- **Progress Bars:** Segmented blocks rather than a smooth fill, representing discrete data steps.