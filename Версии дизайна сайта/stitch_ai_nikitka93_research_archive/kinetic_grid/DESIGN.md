---
name: Kinetic Grid
colors:
  surface: '#111411'
  surface-dim: '#111411'
  surface-bright: '#373a36'
  surface-container-lowest: '#0c0f0c'
  surface-container-low: '#191c19'
  surface-container: '#1d201d'
  surface-container-high: '#282b27'
  surface-container-highest: '#333632'
  on-surface: '#e1e3dd'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e1e3dd'
  inverse-on-surface: '#2e312e'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#c6c7bf'
  on-secondary: '#2f312c'
  secondary-container: '#484a44'
  on-secondary-container: '#b8b9b2'
  tertiary: '#ffffff'
  on-tertiary: '#2d322c'
  tertiary-container: '#dfe4dc'
  on-tertiary-container: '#616660'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#e3e3db'
  secondary-fixed-dim: '#c6c7bf'
  on-secondary-fixed: '#1a1c18'
  on-secondary-fixed-variant: '#464742'
  tertiary-fixed: '#dfe4dc'
  tertiary-fixed-dim: '#c3c8c0'
  on-tertiary-fixed: '#181d18'
  on-tertiary-fixed-variant: '#434842'
  background: '#111411'
  on-background: '#e1e3dd'
  surface-variant: '#333632'
typography:
  display-vertical:
    fontFamily: Space Grotesk
    fontSize: 120px
    fontWeight: '700'
    lineHeight: 100px
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 24px
  margin: 48px
  container-sm: 400px
  container-md: 800px
  container-lg: 1200px
---

## Brand & Style

This design system is rooted in **Dynamic Swiss Modernism**, prioritizing mathematical precision with an aggressive, technical edge. The brand personality is intellectual, cold, and hyper-efficient, designed for high-performance AI environments where clarity and speed are paramount.

The aesthetic leans heavily into **Brutalism** and **High-Contrast** styles. It rejects traditional decorative elements like gradients and shadows in favor of structural depth created through overlapping lines, container nesting, and asymmetric arrangements. The interface should feel like a living blueprint—functional, urgent, and sophisticated.

## Colors

The palette is restricted to three core tones to maintain high visual tension and Swiss-inspired minimalism.

*   **Background:** The "Dark Charcoal-Green" (#0C0F0C) provides a deep, non-neutral base that feels more organic and sophisticated than pure black.
*   **Typography:** "Bone" (#F0F0E8) is used for all primary reading surfaces to reduce eye strain and provide a premium, archival feel.
*   **Accent:** "Lime" (#CCFF00) is the high-visibility signal color. Use it exclusively for primary actions, status indicators, and critical data points.
*   **Structural:** A tertiary dark olive (#242924) is used for hairline strokes and box backgrounds to create internal hierarchy.

## Typography

This design system uses **Space Grotesk** exclusively to leverage its technical, geometric character. 

Hierarchy is established through extreme scale shifts rather than font variety. Large "Display Vertical" elements should be rotated -90 degrees and placed along the margins of the grid to act as structural anchors. Headlines use tight tracking and heavy weights, while body text remains light and spacious to ensure legibility against the dark background. All labels must be set in uppercase with increased letter spacing to evoke a "serialized" or "data-stamped" feel.

## Layout & Spacing

The layout is built on a **12-column asymmetric fluid grid**. Unlike standard layouts, content blocks should intentionally break horizontal alignment to create a "kinetic" sense of movement.

Use a hard-line grid system where 1px "Bone" or "Tertiary" strokes define the boundaries of the layout. Avoid centered content; instead, anchor elements to the far left or right of the viewport. Vertical rhythm is dictated by the 4px base unit, with large sections separated by significant whitespace (64px+) to prevent the dense technical details from becoming overwhelming.

## Elevation & Depth

Shadows and blurs are strictly forbidden. Depth is achieved through **structural layering and stroke overlaps**:

1.  **Z-Axis via Lines:** Elements appear "closer" to the user when they overlap the 1px grid lines of the background.
2.  **Inversion:** Use the Lime accent color to fill a background container, forcing the text to the Background Charcoal color. This "punched-out" effect creates a focal point that sits on the top layer.
3.  **Box-in-Box:** Create hierarchy by nesting boxes with slightly lighter borders (#242924). 
4.  **Offset Outlines:** Buttons or cards can have a secondary "ghost" border offset by 4px to the bottom-right, suggesting a physical thickness without using a drop shadow.

## Shapes

The shape language is **strictly orthogonal**. All corners are set to 0px (Sharp).

The use of sharp 90-degree angles reinforces the Swiss architectural influence. To add visual interest, use "clipped corners" (45-degree chamfers) on primary action buttons or decorative elements to suggest a military or industrial UI. Containers should feel like tectonic plates—interlocking but distinct.

## Components

*   **Buttons:** Primary buttons are solid Lime (#CCFF00) with Charcoal text. Secondary buttons are transparent with a 1px Bone border. All buttons use a "hover-fill" state where the text and background colors invert instantly with 0ms transition.
*   **Chips:** Rectangular with 1px borders. Use the `label-caps` typography style. For active states, use a small Lime square icon (4px x 4px) next to the text.
*   **Lists:** Divided by solid 1px horizontal lines that extend to the edge of the container. No padding on the left of list items to keep the vertical alignment sharp.
*   **Inputs:** Bottom-border only. Labels sit above the input in `label-caps` style. On focus, the bottom border changes from Bone to Lime.
*   **Cards:** Defined by a 1px border. Card titles should be large and bold, often overlapping the top border of the card itself to create the "kinetic" layered effect.
*   **Status Indicators:** Use "Glitch" or "Scanline" textures sparingly within Lime containers to indicate active AI processing or real-time data streams.