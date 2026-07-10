---
name: Technical Monolith
colors:
  surface: '#121412'
  surface-dim: '#121412'
  surface-bright: '#383a37'
  surface-container-lowest: '#0d0f0d'
  surface-container-low: '#1a1c1a'
  surface-container: '#1e201e'
  surface-container-high: '#282a28'
  surface-container-highest: '#333533'
  on-surface: '#e2e3df'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e2e3df'
  inverse-on-surface: '#2f312f'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#c6c7c2'
  on-secondary: '#2f312e'
  secondary-container: '#484a46'
  on-secondary-container: '#b8b9b4'
  tertiary: '#ffffff'
  on-tertiary: '#2f312e'
  tertiary-container: '#e2e3de'
  on-tertiary-container: '#636562'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#e3e3de'
  secondary-fixed-dim: '#c6c7c2'
  on-secondary-fixed: '#1a1c19'
  on-secondary-fixed-variant: '#454744'
  tertiary-fixed: '#e2e3de'
  tertiary-fixed-dim: '#c6c7c3'
  on-tertiary-fixed: '#1a1c1a'
  on-tertiary-fixed-variant: '#454744'
  background: '#121412'
  on-background: '#e2e3df'
  surface-variant: '#333533'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 84px
    fontWeight: '700'
    lineHeight: '0.9'
    letterSpacing: -0.04em
  h1:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.02em
  h2:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  data-mono:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-caps:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
spacing:
  base: 4px
  gutter: 16px
  margin: 32px
  column-count: '12'
---

## Brand & Style
This design system is a manifestation of industrial precision and digital brutalism. It draws heavy inspiration from mid-century Swiss International Style, repurposed for a high-performance technical environment. The brand personality is authoritative, transparent, and unapologetically engineered. It rejects the softness of modern consumer web design in favor of a rigid, schematic-like aesthetic that prioritizes information density and structural clarity.

The emotional response should be one of "controlled power." By stripping away decorative elements like shadows and gradients, the UI communicates a "no-nonsense" toolset intended for expert users who value raw data and logical hierarchy over aesthetic comfort.

## Colors
The palette is hyper-limited to maximize contrast and focus.
- **Background (#080A08):** A deep, "obsidian-green" that provides a more sophisticated depth than pure black while maintaining maximum contrast for the accent colors.
- **Action/Accent (#CCFF00):** A high-visibility Lime used exclusively for primary calls to action, active states, and critical data points.
- **Content (#F5F5F0):** A Bone white used for all primary text and structural lines to reduce the harshness of pure white-on-black while remaining crisp.
- **Sub-surfaces (#2A2C2A):** Used sparingly for 1px borders and distinct section backgrounds to maintain the "schematic" feel without breaking the dark-mode immersion.

## Typography
Typography is the primary driver of the visual hierarchy.
- **Space Grotesk** is used for all narrative and structural headers. Headlines should be left-aligned, tightly tracked, and often set in large blocks that bleed toward the margins.
- **IBM Plex Mono** is reserved for technical metadata, labels, and tabular data. 
- **All-caps** should be used for labels and secondary navigation to reinforce the "technical blueprint" aesthetic.
- **Alignment:** Never center text. All elements must be hard-aligned to the left or right of the grid columns to maintain the rigid Swiss structure.

## Layout & Spacing
The layout follows a **rigid 12-column grid**. Every element must snap to a column edge. 
- **Borders over Padding:** Spatial relationships are defined by 1px Bone (#F5F5F0) or Dark Green (#2A2C2A) lines rather than whitespace. 
- **The Schematic Feel:** Components should feel like they are "plugged into" a motherboard. Use vertical and horizontal rules to separate content blocks.
- **Density:** Information density should be high. Minimize "empty" whitespace in favor of structural grids and data-rich sidebars.

## Elevation & Depth
This system uses **Zero Depth**. 
- **No Shadows:** Shadows are strictly prohibited. They imply a light source that contradicts the flat, schematic nature of the design.
- **No Gradients:** Colors are flat and architectural.
- **Layering:** Hierarchy is achieved through "Tonal Inversion." A primary surface is #080A08; a secondary "raised" surface is simply a container bounded by a 1px #F5F5F0 border. For extreme focus, a block may use a #F5F5F0 background with #080A08 text.

## Shapes
The shape language is **fully geometric and sharp**. 
- **0px Radius:** Every corner, button, input field, and container must have a 90-degree angle. 
- **The 1px Rule:** All strokes must be exactly 1px. Do not use varying border weights.
- **Geometric Accents:** Use simple 45-degree chamfers or small square icons to indicate interactivity, avoiding any curves or "organic" forms.

## Components
- **Buttons:** Rectangular with a 1px border. Default state is Bone text on Transparent background. Hover state is Lime background with Black text. Active state is a solid Lime background.
- **Inputs:** Simple bottom-border or full 1px box. Use IBM Plex Mono for placeholder text. The cursor should be a solid Lime block.
- **Cards:** Defined by 1px borders. Use a "Header Strip" at the top of the card separated by a horizontal 1px line to house labels or IDs in IBM Plex Mono.
- **Chips/Status:** Small, sharp-edged rectangles. Active status uses the Lime accent; inactive uses the Bone text with a 1px border.
- **Data Grids:** Heavy use of 1px rules. Headers should be all-caps IBM Plex Mono. Cells should have no padding on the left/right to align text perfectly with the column grid.
- **Technical Symbols:** Use simple SVG lines, plus signs (+), and coordinate-style marks (e.g., [01], [02]) to denote list items or section breaks.