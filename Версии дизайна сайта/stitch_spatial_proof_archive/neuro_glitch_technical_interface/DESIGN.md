---
name: Neuro-Glitch Technical Interface
colors:
  surface: '#101509'
  surface-dim: '#101509'
  surface-bright: '#363b2d'
  surface-container-lowest: '#0b1005'
  surface-container-low: '#191d11'
  surface-container: '#1d2115'
  surface-container-high: '#272c1f'
  surface-container-highest: '#323629'
  on-surface: '#e0e5d1'
  on-surface-variant: '#c2caaf'
  inverse-surface: '#e0e5d1'
  inverse-on-surface: '#2d3225'
  outline: '#8c947b'
  outline-variant: '#424935'
  surface-tint: '#96da06'
  primary: '#ffffff'
  on-primary: '#223600'
  primary-container: '#b0f734'
  on-primary-container: '#4a6f00'
  inverse-primary: '#456800'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffffff'
  on-tertiary: '#67001f'
  tertiary-container: '#ffd9dc'
  on-tertiary-container: '#c90045'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b0f734'
  primary-fixed-dim: '#96da06'
  on-primary-fixed: '#121f00'
  on-primary-fixed-variant: '#334f00'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffd9dc'
  tertiary-fixed-dim: '#ffb2ba'
  on-tertiary-fixed: '#400010'
  on-tertiary-fixed-variant: '#910030'
  background: '#101509'
  on-background: '#e0e5d1'
  surface-variant: '#323629'
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
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: IBM Plex Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  meta-sm:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  code-xs:
    fontFamily: IBM Plex Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1.2'
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin: 32px
---

## Brand & Style

This design system embodies a "Neuro-Glitch" aesthetic, blending high-tech precision with intentional digital instability. The brand personality is aggressive, cerebral, and cutting-edge, simulating a high-level hacking terminal or a futuristic neural-link interface. 

The style is a fusion of **Brutalism** and **Experimental Cyberpunk**. It utilizes a "perfectly broken" approach where layouts appear highly structured yet are frequently interrupted by digital noise, chromatic aberration, and scanline overlays. The emotional response should be one of intense focus and "system-access" urgency, catering to a power-user demographic that values speed and technical depth over friendly hand-holding.

## Colors

The palette is anchored in a pure black (`#000000`) void, providing the highest possible contrast for the **Phosphor Lime** (`#B7FF3C`) primary accent. This lime is used for all "active" data, interactive states, and glowing artifacts. 

A tertiary **Glitch Crimson** (`#FF2E63`) is introduced sparingly to represent system errors, high-priority alerts, or chromatic shift effects. Neutrals are kept in the dark gray spectrum to maintain the depth of the interface without distracting from the neon luminance of the primary data points. All lime elements should implement an outer glow (bloom) effect to simulate old-school CRT phosphor bleeding.

## Typography

The typographic strategy creates a hierarchy between "Executive Commands" and "System Data." **Space Grotesk** is reserved for large-scale headings and structural titles, providing a futuristic, geometric weight. 

**IBM Plex Mono** handles all body copy, metadata, and technical readouts. This monospaced choice reinforces the "hacking" aesthetic and ensures that numerical data aligns perfectly in grids. For an authentic glitch feel, small metadata labels should occasionally use `text-transform: uppercase` and extreme letter spacing to mimic serial numbers or system IDs.

## Layout & Spacing

This design system uses a **Rigid Technical Grid**. The layout philosophy is inspired by command-line interfaces and heads-up displays (HUDs). It utilizes a 12-column grid with strict 4px increments (base unit).

While the grid is rigid, "glitch offsets" are encouraged. Content modules should occasionally be shifted 4px or 8px off-axis to create an "unstable" visual rhythm. Large margins are used to separate technical modules, ensuring that even with high-density data, the interface remains legible. Borders are often used instead of padding to define space, creating a "wired" feel.

## Elevation & Depth

In this design system, depth is conveyed through **Optical Luminance** rather than traditional shadows. There are no ambient shadows. Instead, elevation is achieved via:

1.  **Phosphor Glow:** The more critical or "active" an element is, the stronger its Lime `#B7FF3C` outer glow.
2.  **Scanline Density:** Background layers have a heavy scanline texture; foreground elements are clearer and "brighter," appearing to sit closer to the glass.
3.  **Z-Axis Noise:** High-elevation modals or tooltips may feature a subtle "digital noise" grain that moves slightly, making them feel physically distinct from the static background.
4.  **Wireframe Layering:** Use 1px Phosphor Lime borders for containers to create a "skeletal" depth, suggesting multiple layers of data stacked on a single screen.

## Shapes

The shape language is strictly **Sharp (0px)**. Roundness is perceived as too "soft" for this high-tech environment. Every button, card, and input field must feature hard 90-degree angles.

To add complexity without using curves, use "clipped corners" (45-degree chamfers) on primary containers. This creates a technical, machined look. Vertical and horizontal lines should be used excessively to frame content, acting as "traces" on a circuit board.

## Components

### Buttons
Primary buttons are solid `#B7FF3C` with black text. On hover, they should trigger a "flicker" animation and a slight chromatic aberration (red/blue ghosting). Secondary buttons are ghost-style with a 1px lime border.

### Input Fields
Inputs are simple 1px bottom-borders. When focused, the border should glow intensely and a "scanning" horizontal line should animate once across the field. Use IBM Plex Mono for all user input.

### Chips & Tags
Technical tags should look like raw data strings (e.g., `[ STATUS: ACTIVE ]`). They are always monospaced and frequently wrapped in square brackets.

### Cards & Modules
Containers do not have background colors; they use 1px borders and a subtle, semi-transparent "scanline" fill. The header of every card should include a "module ID" in the top-right corner (e.g., `0x-442`).

### Glitch Artifacts
Non-interactive decorative elements—like randomly placed "corrupted" pixel blocks or static-filled bars—should be used to fill dead space in the layout, reinforcing the unstable system narrative.

### Status Indicators
Use "Pulse" animations for status lights. A heartbeat-style glow on a 4x4px square is more effective than a circular dot in this sharp-edged system.