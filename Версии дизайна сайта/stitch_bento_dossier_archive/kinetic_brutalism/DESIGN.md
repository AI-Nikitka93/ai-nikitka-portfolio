---
name: Kinetic Brutalism
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
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
  on-tertiary: '#601400'
  tertiary-container: '#ffdbd1'
  on-tertiary-container: '#bc3000'
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
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb5a0'
  on-tertiary-fixed: '#3b0900'
  on-tertiary-fixed-variant: '#872000'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  h1-display:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '0.9'
    letterSpacing: -0.05em
  h2-headline:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: -0.03em
  h3-subhead:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  body-technical:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-mono:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  data-heavy:
    fontFamily: IBM Plex Mono
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
spacing:
  unit: 4px
  gutter: 16px
  margin: 24px
  module-padding: 20px
  overlap-offset: -12px
---

## Brand & Style

This design system is engineered for AI_Nikitka93 to project an image of absolute technical authority and high-velocity processing. The aesthetic is rooted in **Kinetic Brutalism**, characterized by raw structural honesty and aggressive information density. It avoids traditional decorative elements in favor of functional intensity.

The target audience consists of power users who demand immediate access to deep technical data. The UI evokes a sense of "digital workshop" or "command center" through an aggressive bento-box layout where modules often overlap or break the grid slightly to suggest movement and urgency. The personality is uncompromising, high-tech, and authored, utilizing Russian Cyrillic as a core design element where the sharp glyphs of the selected fonts reinforce the system's structural rigidity.

## Colors

The palette is anchored in a high-contrast dark mode to emphasize its industrial roots.

- **Deep Charcoal (#121212):** The foundation. Used for the primary background and structural containment.
- **Bright Lime (#CCFF00):** The primary kinetic trigger. Used for call-to-action buttons, active states, and critical success indicators.
- **Ember (#FF4500):** The alert state. Reserved for critical highlights, warnings, and destructive actions. It must be used sparingly to maintain its disruptive impact.
- **Titanium Grey (#A0A0A0):** The data carrier. Used for secondary text, borders, and inactive interface elements to ensure a clear hierarchy against the lime accents.

## Typography

Typography is the primary visual driver of this design system. We utilize a dual-font strategy:

- **Space Grotesk** is used for all headers. It must be styled with tight tracking and uppercase transforms to create dense, impactful blocks of text. In the Russian locale, the geometric nature of the Cyrillic characters should be used to create "walls of type."
- **IBM Plex Mono** handles all technical data, body copy, and labels. This reinforces the "machine-read" aesthetic and ensures that complex data strings remain legible and structured.

Vertical rhythm is intentionally tight. Large headlines should feel as though they are physically pressing against the content below them.

## Layout & Spacing

This design system employs an **Aggressive Bento Layout**. Unlike traditional grids that seek balance, this layout prioritizes "module collision."

1.  **Bento Modules:** Content is housed in discrete rectangles of varying sizes.
2.  **Overlapping Elements:** Certain modules or images should use the `overlap-offset` to break the container boundary, creating a sense of three-dimensional layers without using shadows.
3.  **Grid:** A 12-column fluid grid is used for the base, but internal module components use a strict 4px hard-grid for alignment.
4.  **Density:** High information density is preferred. Whitespace is used not for "breathing room," but as a structural separator between high-intensity data zones.

## Elevation & Depth

Depth is conveyed through **Bold Borders and Tonal Stacking** rather than shadows.

- **Stacking:** Use the Deep Charcoal base for the background, with modules using a slightly lighter grey or a 1px Titanium Grey border.
- **Borders:** Every container must have a visible 1px or 2px border. Use `primary_color` (Lime) for active containers and `secondary_color` (Grey) for idle ones.
- **Z-Index Visuals:** When modules overlap, the top module should have a solid 2px border to clearly "cut" through the module beneath it. No blurs or soft shadows are permitted.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Every element—including buttons, input fields, and cards—must have 90-degree corners. This reinforces the brutalist, architectural nature of the design system. The only exception to the "no curves" rule is the inherent geometry of the typography itself. Circular elements (like radio buttons) should be replaced with square checkboxes or high-contrast toggle boxes to maintain the aggressive aesthetic.

## Components

- **Buttons:** High-impact rectangles. The primary button is solid Bright Lime with black text. Hover states invert the colors or trigger a 4px offset "ghost" border.
- **Input Fields:** Styled as underlined boxes or fully enclosed rectangles with a 1px Titanium Grey border. Labels (IBM Plex Mono) sit above the field in all-caps.
- **Chips/Tags:** Small, sharp-edged rectangles with a solid background and tiny mono-type labels.
- **Bento Cards:** The primary container. These should feature internal "gutters" and often contain secondary technical readouts in the corners.
- **Status Indicators:** Use the Ember color for critical errors. Indicators should be "glitchy" or highly visible, such as a solid block of color behind a label.
- **Data Tables:** Use 1px borders for all cells. No zebra-striping; use border highlights to indicate row selection.
- **Micro-Interactions:** Transitions should be instant (0-100ms) or "mechanical" (stepped animations) rather than smooth fades.