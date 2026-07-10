---
name: Monolith Archive
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
  on-surface-variant: '#e3beb8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#aa8984'
  outline-variant: '#5a403c'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690000'
  primary-container: '#8b0000'
  on-primary-container: '#ff907f'
  inverse-primary: '#b52619'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#414343'
  on-tertiary-container: '#afafb0'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#920703'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  system-warning:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.05em
  data-primary:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.02em
  data-mono-alt:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.2em
spacing:
  unit: 4px
  gutter: 24px
  margin: 40px
  terminal-padding: 16px
---

## Brand & Style

This design system is built to evoke the sensation of interacting with a cold, heavy-set subterranean terminal. It sits at the intersection of **Industrial Brutalism** and **Tactile Retro-Futurism**. The aesthetic is defined by its "declassified military" atmosphere: high-stakes, permanent, and slightly decayed.

The interface should feel like hardware. This is achieved through high-contrast surfaces, intentional flickering, and a persistent CRT scanline overlay. Every interaction must feel heavy, as if moving physical magnetic tapes or triggering mechanical relays. The emotional goal is to instill a sense of solemnity and absolute data integrity in the user.

## Colors

The palette is restricted to a severe, high-contrast spectrum.
- **Base Black:** The background is an absolute, non-reflective black (#000000 or #050505), representing the void of deep storage.
- **Oxide Red:** A deep, aggressive red (#8B0000) is used exclusively for interactive states, critical warnings, and system status indicators.
- **Zinc & Bone:** Neutral grays and off-whites are reserved for technical data readouts, providing a stark contrast against the dark void.

The UI avoids gradients entirely, opting for solid blocks of color and high-opacity dithering patterns to create depth.

## Typography

Typography is treated as a mechanical output. 

**Space Grotesk** serves as the system's "Warning" and "Identity" typeface. It should be used in all-caps for headers, system status updates, and bold alerts. Its geometric tension mimics mid-century aerospace signage.

**Public Sans** is utilized for primary data entry and record reading. While not a true monospace font, it is to be implemented with wide tracking and tabular lining figures to simulate the rhythm of printed archival logs. 

All text should have a slight "glow" effect (text-shadow) of 1px to mimic CRT phosphor bleed, and critical headers should feature a 1-2% horizontal jitter/flicker animation.

## Layout & Spacing

The layout follows a **Fixed Grid** model, resembling a hardware monitor. The screen is divided into strict quadrants using 2px solid borders.

Elements do not "float"; they are "contained." There is no fluid white space—only "void space" where data has not yet been populated. Padding is tight and uniform (16px), creating a sense of density and efficiency. The layout should feel like a physical console, where every module has a fixed, dedicated location.

## Elevation & Depth

This system rejects shadows and modern layering. Depth is communicated through **Bold Borders** and **Tonal Inversion**.

- **Level 0 (Background):** Absolute black.
- **Level 1 (Panels):** Deep charcoal (#1A1A1A) with 2px Oxide Red or Zinc borders.
- **Level 2 (Active Elements):** Inverted colors (White or Red backgrounds with Black text).

Depth is further enhanced by the **CRT Overlay**, a semi-transparent fixed layer consisting of horizontal scanlines and a slight vignette at the screen corners. When a user "drills down" into data, the transition should be a rapid horizontal wipe or a "zoom-in" flicker rather than a smooth fade.

## Shapes

The design system employs **Sharp (0px)** roundedness for all elements. There are no curves in this system. 

Buttons, input fields, and container panels must have hard 90-degree corners to maintain the industrial, monolithic feel. Any sense of "softness" is intentionally purged to reinforce the machine-led nature of the interface.

## Components

### Buttons
Buttons are rectangular blocks. In their default state, they are outlined in Zinc. On hover, they fill with Oxide Red (#8B0000) and the text inverts to Black. Pressing a button triggers a brief "screen shake" or flicker effect.

### Input Fields
Inputs are preceded by a blinking underscore cursor `_`. The border is active only on the bottom edge (a "data line"). All input text is automatically converted to uppercase.

### Chips / Status Tags
Tags are rendered as solid blocks of color with black text. A "CRITICAL" status tag should flicker at a frequency of 2Hz.

### Lists & Tables
Data is presented in "Dense Rows" separated by 1px dotted lines. Every 5th row should be highlighted with a subtle charcoal background to assist in eye-tracking across large data sets.

### The Monolith Card
A special container for high-level data. It features heavy 4px borders and a "header block" where the title is housed in a solid Oxide Red bar. This component should feel like the heaviest object on the screen.