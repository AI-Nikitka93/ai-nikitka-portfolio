---
name: Radar Grid
colors:
  surface: '#0a0f35'
  surface-dim: '#0a0f35'
  surface-bright: '#31365d'
  surface-container-lowest: '#050930'
  surface-container-low: '#13183d'
  surface-container: '#171c41'
  surface-container-high: '#21274c'
  surface-container-highest: '#2c3258'
  on-surface: '#dfe0ff'
  on-surface-variant: '#c8c8ab'
  inverse-surface: '#dfe0ff'
  inverse-on-surface: '#282d53'
  outline: '#929277'
  outline-variant: '#474832'
  surface-tint: '#c5cf00'
  primary: '#ffffff'
  on-primary: '#303300'
  primary-container: '#e1ec00'
  on-primary-container: '#646900'
  inverse-primary: '#5e6300'
  secondary: '#ecb1ff'
  on-secondary: '#520070'
  secondary-container: '#d05bff'
  on-secondary-container: '#480063'
  tertiary: '#ffffff'
  on-tertiary: '#00363a'
  tertiary-container: '#7df4ff'
  on-tertiary-container: '#006f77'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1ec00'
  primary-fixed-dim: '#c5cf00'
  on-primary-fixed: '#1b1d00'
  on-primary-fixed-variant: '#464a00'
  secondary-fixed: '#f9d8ff'
  secondary-fixed-dim: '#ecb1ff'
  on-secondary-fixed: '#320046'
  on-secondary-fixed-variant: '#75009e'
  tertiary-fixed: '#7df4ff'
  tertiary-fixed-dim: '#00dbe9'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#0a0f35'
  on-background: '#dfe0ff'
  surface-variant: '#2c3258'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0em
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.2em
spacing:
  base: 4px
  unit: 8px
  gutter: 16px
  margin: 24px
  fragment-gap: 2px
---

## Brand & Style

This design system is built on the aesthetic of high-stakes surveillance, tactical command centers, and data-dense environments. It adopts a **Cyber-Brutalist** style that prioritizes technical utility and raw visual impact over traditional "friendliness."

The interface should evoke the feeling of a mission-critical terminal. It utilizes a fragmented modular grid to break information into logical but distinct clusters, suggesting a complex system that is constantly being scanned and updated. The emotional response is one of urgency, precision, and technological dominance. Visual interest is driven by the tension between rigid rectangular containers and fluid, circular HUD (Heads-Up Display) elements.

## Colors

The palette is anchored in **Deep Navy (#050A30)**, representing the infinite void of the digital workspace. **High-vis Yellow (#F3FF00)** serves as the primary action and alert color, demanding immediate attention against the dark background. **Electric Purple (#BF00FF)** is used for data visualization, secondary navigation, and interactive states, providing a high-energy contrast.

Accent colors should be used sparingly to represent "active" states or data blips. The system relies on high-contrast ratios to ensure legibility under simulated "low-light" terminal conditions. Glitch effects should cycle through these primary and secondary hues rapidly to create a sense of digital instability.

## Typography

Typography in the design system is split between two distinct roles. **Space Grotesk** is the voice of the system, used for high-level headers and navigational anchors; its geometric construction fits the futuristic, technical aesthetic. 

**JetBrains Mono** is used for all functional data, body text, and UI labels. The monospaced nature of the font reinforces the "terminal" feel and ensures that numerical data aligns perfectly across different rows and grid modules, which is essential for the radar and scanning components. All labels should be treated with high tracking (letter spacing) and uppercase styling to mimic technical readouts.

## Layout & Spacing

The layout utilizes a **fragmented modular grid**. Unlike a traditional fluid grid, this system treats the screen as a series of "panes" that can be subdivided. Containers should feel like they are floating or snapped into a larger motherboard-style arrangement.

A strict 8px rhythm governs the padding and margins, but the "fragmented" look is achieved by using 2px gaps between nested modules to create thin, hair-line divisions. Radar elements and circular HUDs should occupy square grid cells (e.g., a 4x4 or 6x6 module block) to maintain their geometry amidst the rectangular fragments.

## Elevation & Depth

This design system rejects ambient shadows. Depth is conveyed through **tonal layering and light overlays**. 

1.  **Background:** The deepest navy (#050A30).
2.  **Middle Ground:** Surface containers (#0A1145) with 1px solid borders in Electric Purple or High-vis Yellow.
3.  **Foreground:** HUD elements and "blips" that utilize glows (CSS filters: `drop-shadow` with 0 blur) rather than soft shadows.
4.  **Overlay Layer:** A global "scanning line" overlay—a repeating horizontal linear gradient with 10% opacity—covers the entire UI to simulate a CRT or digital monitor.

Glitch effects should be applied to the z-axis, where "elevated" elements may momentarily fragment or shift horizontally, revealing the background colors beneath.

## Shapes

The primary shape language is **sharp and aggressive**. All standard containers, buttons, and input fields must have a 0px border radius. 

To contrast this, **HUD elements must be perfectly circular**. This includes radar sweeps, coordinate rings, and status indicators. This duality—the "grid" versus the "circle"—is the core visual hook of the design system. Special "cut-corner" (chamfered) shapes may be used for buttons to enhance the tactical feel, achieved via CSS `clip-path` rather than border-radius.

## Components

### Buttons
Buttons are high-contrast blocks. The primary state is High-vis Yellow with black text. Hover states should trigger a "glitch" animation where the button shifts 2px and changes color to Electric Purple for a fraction of a second.

### Radar Scanners
A signature component of the design system. These are circular containers with a rotating 45-degree gradient "sweep." Points of interest (blips) are rendered as small, flickering squares that pulse when the sweep passes over them.

### Fragmented Cards
Data containers should not have rounded corners. They should use a 1px border. If a card is "active," the border should glow. Include "corner-bracket" accents on larger modules to frame technical data.

### Input Fields
Inputs are underlined with a 2px stroke or fully boxed with 1px borders. Use JetBrains Mono for all input text. The cursor should be a solid, blinking block rather than a thin line.

### Scanning Line Overlays
A persistent UI component that sits on the top layer. It consists of a subtle animated scanline that moves vertically across the screen, occasionally jittering to reinforce the cyber-brutalist aesthetic.

### Status Chips
Small, rectangular badges with no rounding. Use a "label-caps" typographic style. Backgrounds should use the Electric Purple or High-vis Yellow at 20% opacity with 100% opacity borders.