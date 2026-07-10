---
name: Academic Archive
colors:
  surface: '#111508'
  surface-dim: '#111508'
  surface-bright: '#373b2c'
  surface-container-lowest: '#0c0f04'
  surface-container-low: '#1a1d10'
  surface-container: '#1e2113'
  surface-container-high: '#282b1d'
  surface-container-highest: '#333627'
  on-surface: '#e2e4cf'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e2e4cf'
  inverse-on-surface: '#2f3223'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#c7c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#484949'
  on-secondary-container: '#b8b8b8'
  tertiary: '#ffffff'
  on-tertiary: '#21323e'
  tertiary-container: '#d2e5f5'
  on-tertiary-container: '#556774'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#d2e5f5'
  tertiary-fixed-dim: '#b6c9d8'
  on-tertiary-fixed: '#0b1d29'
  on-tertiary-fixed-variant: '#374956'
  background: '#111508'
  on-background: '#e2e4cf'
  surface-variant: '#333627'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '0.9'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  mono-label:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  mono-data:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0em
spacing:
  unit: 4px
  gutter: 16px
  margin: 32px
  column_count: '12'
---

## Brand & Style
This design system is rooted in the **International Typographic Style (Swiss Style)**, emphasizing legibility, objectivity, and a strict mathematical grid. It is designed for an archival environment where information density is high and visual clarity is paramount. The personality is intellectual, authoritative, and uncompromising.

The aesthetic leans into **Brutalism** through its raw, unadorned structural elements and high-contrast palette, but maintains a **Minimalist** discipline by removing any element that does not serve a functional purpose. There are no gradients, soft shadows, or decorative flourishes. Every line and character exists to facilitate the retrieval and analysis of data.

## Colors
The palette is a high-contrast triad designed to eliminate visual "mud" common in dark-mode interfaces. 

- **The Void (#0a0f0a):** A deep, black-green that provides more depth than pure black while remaining neutral enough to recede entirely.
- **Bone (#e5e5e5):** The primary typographic color. It offers high readability without the harsh ocular strain of pure #FFFFFF.
- **Titanium (#a1a1a1):** A clean, cool silver reserved for metadata, borders, and secondary labels. It is strictly neutral, avoiding the warmth or brown-tones of standard greys.
- **Electric Lime (#CCFF00):** The singular accent color. It is used sparingly for interactive states, critical alerts, and active archival tags to draw immediate visual focus.

## Typography
Typography is the core structural element of this design system. 

- **Space Grotesk** is used for all headlines and body copy. Its idiosyncratic terminals and geometric construction align with the technical, futuristic tone of the archive. Headlines should use tight leading and negative letter spacing to create dense, impactful blocks of text.
- **IBM Plex Mono** is used for all metadata, technical specs, and interface labels. This creates a clear visual distinction between "content" (Grotesk) and "utility/data" (Mono). 

Text is treated as a physical object on the grid. Large-scale display type should feel architectural, often interacting directly with the boundaries of the viewport or container.

## Layout & Spacing
The layout follows a **Strict 12-Column Grid**. All elements must align to the grid lines; floating or centered elements are prohibited. 

- **Gutters:** 16px constant across all breakpoints to maintain tight information density.
- **Margins:** 32px standard, providing a "frame" for the content that mimics a printed broadsheet.
- **Rhythm:** All vertical spacing must be a multiple of 4px. Use 8px/16px for component internal padding and 32px/64px for section separation.

The "Swiss poster" discipline requires that whitespace is not just "empty," but an active part of the composition. Use large blocks of empty space to push content into specific grid quadrants, creating tension and focus.

## Elevation & Depth
Depth is communicated through **structural layering and borders**, never through shadows or blurs. 

- **Flat Architecture:** The UI exists on a single plane. To differentiate sections, use solid 1px borders in *Titanium* or high-contrast fills.
- **Borders:** Use 1px *Titanium* lines to divide the grid. For active or selected states, the border weight remains 1px but shifts to *Electric Lime*.
- **Inversion:** High-priority elements or "active" cards should use color inversion (e.g., a Bone background with Black text) to simulate physical depth and focus without using Z-axis effects.

## Shapes
The shape language is **strictly orthogonal**. 

Corners are sharp (0px radius) to reinforce the grid-based, industrial nature of the system. This applies to buttons, input fields, cards, and image containers. Circles are permitted only for specific functional icons or status indicators to provide a singular point of contrast against the otherwise rectangular interface.

## Components
Components are designed with a "zero-fluff" mentality, appearing more like technical diagrams than traditional UI elements.

- **Buttons:** Rectangular with sharp corners. Primary buttons are solid *Electric Lime* with black text. Secondary buttons use a 1px *Bone* outline with *Bone* text. Interactive states trigger an immediate background fill change.
- **Inputs:** Simple bottom-borders or full 1px outlines in *Titanium*. Labels are always in *IBM Plex Mono* and positioned above the input field, never as placeholders.
- **Chips/Tags:** Monospaced text inside a 1px *Titanium* border. Active tags switch to a solid *Electric Lime* fill.
- **Cards:** Defined by 1px *Titanium* borders. No background elevation. Content within cards must adhere to their own internal sub-grid.
- **Data Tables:** Minimalist with horizontal dividers only. Use *IBM Plex Mono* for all cell content to ensure alignment and readability of numerical data.
- **Lists:** Unstyled lists with 1px dividers. Use *Electric Lime* "markers" (small squares) to denote list items or active states.