---
name: The Archival Void
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3938'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a29'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e0'
  on-surface-variant: '#c5c7c1'
  inverse-surface: '#e5e2e0'
  inverse-on-surface: '#313030'
  outline: '#8f928c'
  outline-variant: '#444843'
  surface-tint: '#c5c7c2'
  primary: '#c5c7c2'
  on-primary: '#2e312e'
  primary-container: '#050705'
  on-primary-container: '#767974'
  inverse-primary: '#5d5f5b'
  secondary: '#c7c7be'
  on-secondary: '#2f312b'
  secondary-container: '#484a43'
  on-secondary-container: '#b8b9b0'
  tertiary: '#abd600'
  on-tertiary: '#283500'
  tertiary-container: '#050800'
  on-tertiary-container: '#678200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e3de'
  primary-fixed-dim: '#c5c7c2'
  on-primary-fixed: '#1a1c19'
  on-primary-fixed-variant: '#454744'
  secondary-fixed: '#e3e3d9'
  secondary-fixed-dim: '#c7c7be'
  on-secondary-fixed: '#1a1c16'
  on-secondary-fixed-variant: '#464740'
  tertiary-fixed: '#c3f400'
  tertiary-fixed-dim: '#abd600'
  on-tertiary-fixed: '#161e00'
  on-tertiary-fixed-variant: '#3c4d00'
  background: '#141313'
  on-background: '#e5e2e0'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '300'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '300'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '300'
    lineHeight: '1.2'
  body-base:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  meta-xs:
    fontFamily: IBM Plex Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: '1'
    letterSpacing: 0.05em
  meta-sm:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.2'
spacing:
  void-xs: 4px
  void-sm: 12px
  void-md: 32px
  void-lg: 80px
  void-xl: 160px
  gutter: 40px
  margin: 64px
---

## Brand & Style

This design system is a study in digital silence and archival precision. Designed for an AI-centric environment, it treats data as precious artifacts suspended in a deep, infinite vacuum. The aesthetic is strictly minimalist gallery-style, evoking the feeling of a high-end exhibition space where the content is the sole protagonist. 

The emotional response is one of focus, calm, and intellectual rigor. By utilizing massive whitespace and eliminating traditional containers, the UI feels unburdened and boundless. It avoids all decorative flourishes, relying entirely on typographic hierarchy and microscopic indicators to guide the user through the void.

## Colors

The palette is extremely restricted to maintain the archival atmosphere. The background uses an absolute black-green to provide more depth and "air" than a pure hex black. Text is rendered in Bone, a softened white that reduces eye strain and feels more like physical parchment or stone. 

The accent color, Lime, is reserved strictly for functional utility. It is never used for large surfaces, only for 1px-wide indicators to signal active states, notifications, or specific data points.

## Typography

Typography is the primary structural element of this design system. **Space Grotesk** is used for all narrative and display content, specifically in light weights to maintain an ethereal, elegant quality. 

**IBM Plex Mono** serves as the functional "archival label." It is used for precise metadata, timestamps, and technical specifications. This font should always be used at small scales, appearing like the fine print on a museum specimen tag. All metadata should be in uppercase or sentence case with slight letter spacing to enhance legibility at tiny sizes.

## Layout & Spacing

The layout follows a "No Grid" philosophy, prioritizing contextual isolation over rigid columns. Elements are treated as isolated units floating in a massive expanse of empty space. 

Standard margins are intentionally oversized (`void-xl`) to force focus toward the center of the screen or specific clusters of information. Objects should never feel crowded; if two elements are related, they are grouped with `void-md`, but disparate thoughts should be separated by at least `void-lg`. The "Void" is the most important component of the layout.

## Elevation & Depth

This design system is intentionally flat and devoid of traditional depth cues. There are no shadows, no blurs, and no tonal layering. Hierarchy is achieved solely through:
1. **Scale:** Larger typography indicates primary importance.
2. **Isolation:** The more whitespace surrounding an object, the higher its priority.
3. **Contrast:** Bone text on the black-green background creates the primary layer, while Lime indicators create a "piercing" secondary layer that sits visually "on top" of the void.

Elements do not stack; they coexist on a single infinite plane.

## Shapes

The shape language is strictly architectural and sharp. There are no rounded corners in this design system. Every interactive zone, image container, or decorative line ends in a precise 90-degree angle. This reinforces the "archival" and "technical" nature of the interface, avoiding the friendliness of rounded UI in favor of a cold, sophisticated precision.

## Components

### Buttons
Buttons are text-only. They do not have backgrounds or borders. An active state is indicated by a 1px Lime line placed 4px below the text, or by a Lime dot appearing to the left of the label.

### Indicators
The 1px Lime indicator is the primary functional component. Use it as a vertical sliver next to an active list item, a small square for a checkbox, or a single pixel dot for "on" states.

### Cards & Containers
Containers do not exist. Content is grouped by proximity and alignment. If a "card" is needed for an image gallery, the image simply sits in the void with a label in IBM Plex Mono placed precisely below it. No borders or shadows are permitted.

### Inputs
Input fields are indicated by a simple Bone-colored text prompt. The cursor should be a 1px Lime block. There is no box surrounding the input; typing occurs directly onto the background.

### Lists
Lists are spacious. Each item is separated by at least 24px of vertical space. Hovering over a list item reveals a 1px Lime indicator to the far left of the text.

### Artifacts (Additional Component)
An "Artifact" is a cluster consisting of a large image or data visualization, a Space Grotesk headline, and a block of IBM Plex Mono metadata. These clusters should be treated as single units and given maximum whitespace on all sides.