---
name: AI_Nikitka93 Terminal
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#383939'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#baccb1'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#85967d'
  outline-variant: '#3c4b36'
  surface-tint: '#00e61a'
  primary: '#eeffe4'
  on-primary: '#003a01'
  primary-container: '#32ff32'
  on-primary-container: '#007206'
  inverse-primary: '#006e06'
  secondary: '#c8c7bb'
  on-secondary: '#303128'
  secondary-container: '#494a40'
  on-secondary-container: '#b9b9ad'
  tertiary: '#fff8f7'
  on-tertiary: '#690000'
  tertiary-container: '#ffd3cc'
  on-tertiary-container: '#b8291c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#76ff65'
  primary-fixed-dim: '#00e61a'
  on-primary-fixed: '#002201'
  on-primary-fixed-variant: '#005303'
  secondary-fixed: '#e4e3d6'
  secondary-fixed-dim: '#c8c7bb'
  on-secondary-fixed: '#1b1c14'
  on-secondary-fixed-variant: '#47473e'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#ffb4a8'
  on-tertiary-fixed: '#410000'
  on-tertiary-fixed-variant: '#920703'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-base:
    fontFamily: IBM Plex Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
  label-code:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 16px
  margin: 32px
  grid-size: 24px
---

## Brand & Style

This design system is built upon a **Retro-futurist Brutalist** aesthetic, simulating a high-security declassified terminal. It evokes a serious, premium, and archival atmosphere, blending the utilitarian nature of 1980s mainframe computers with the precision of modern aerospace interfaces.

The visual language focuses on the concept of "The Living Archive"—information that is being retrieved in real-time from a deep-storage monolith. The tone is authoritative and cold, yet visually rich through the use of textural simulations like scanlines, phosphor persistence (ghosting), and digital artifacts. Every interface element must feel like a physical component of a heavy industrial machine, where data is permanent and high-stakes.

## Colors

The palette is strictly functional, mirroring the technical limitations of cathode-ray tube monitors.

- **Primary (Phosphor-lime):** Used for all active data, primary interactions, and the characteristic glow of the terminal.
- **Secondary (Archive Bone):** Reserved for metadata, document headers, and secondary labels to provide a "paper-on-glass" contrast.
- **Tertiary (Oxide Red):** Exclusively for critical alerts, "Top Secret" stamps, and system-level failures.
- **Neutral (Titanium):** Used for structural scaffolding, grid lines, and inactive state borders.
- **Background (Black-green):** A deep, saturated near-black that provides the canvas for the glowing phosphor elements.

## Typography

This design system utilizes a dual-font strategy to balance technical data density with structural authority.

- **Space Grotesk** is used for high-level headers and "stamped" metadata. It provides a geometric, futuristic feel that contrasts against the monospaced environment.
- **IBM Plex Mono** is the workhorse of the system, used for all dynamic data, body text, and input fields. It ensures every character occupies a predictable width, reinforcing the monospaced grid.

All text should have a slight `text-shadow` in the primary color (#32FF32) at low opacity to simulate the glow of a CRT phosphor.

## Layout & Spacing

The layout follows a **Fixed Monospaced Grid**. All elements must align to a strict 4px baseline and a secondary 24px structural grid. 

Margins and gutters are intentionally generous to suggest a "window within a window" terminal effect. Layouts should be framed by heavy industrial borders (2px to 4px thickness) using the Titanium color. Content blocks should be separated by thin, horizontal scanlines or dashed monospaced dividers. Headers should feel like fixed status bars, and the main content area should utilize a fluid column system within its fixed container.

## Elevation & Depth

In this design system, depth is achieved through **Tonal Layering and Optical Effects** rather than shadows.

- **Z-Axis:** Instead of drop shadows, "raised" elements are indicated by a change in border weight or a subtle background tint of the primary color at 5% opacity.
- **CRT Overlay:** A persistent, global overlay of horizontal scanlines and a subtle "vignette" at the screen corners creates the illusion of depth within the monitor glass.
- **Active State:** Elements that are "focused" or "active" should flicker slightly or utilize a "block cursor" background (solid #32FF32 with #0A0F0A text).
- **Physical Stamps:** High-priority alerts (Oxide Red) should be treated as "overlays" with a slight rotation (2-3 degrees) to look like physical ink stamps applied to the screen.

## Shapes

The shape language is strictly **Sharp (0px)**. To maintain the industrial terminal aesthetic, avoid all rounded corners. 

Buttons, inputs, and containers must be perfectly rectangular. Any "softness" in the UI should come from the glow effect of the typography rather than the geometry of the components. Functional decorations such as "notched" corners (using 45-degree clips) are permitted for primary action buttons to emphasize their mechanical nature.

## Components

- **Buttons:** Solid Titanium or Phosphor-lime borders (2px). Text is centered and uppercase. Hover states should trigger a "negative" effect (background fills with text color, text becomes background color).
- **Inputs:** Simple underscores (`_`) or full-box outlines with a blinking block cursor. Labels are placed at the top-left, integrated into the border line.
- **Chips/Tags:** Minimalist monospaced text wrapped in square brackets, e.g., `[ STATUS: OK ]`.
- **Lists:** Bulleted with technical characters like `>` or `+`. Each item is separated by a 1px dashed line.
- **Cards:** Defined by heavy "Industrial Borders." Corners may feature "corner marks" (L-shaped brackets) to denote the boundaries of a data module.
- **System Stamps:** Rectangular containers with thick 4px borders, rotated slightly, containing Space Grotesk text in Oxide Red for "CLASSIFIED" or "FAILED" status.
- **Scanline Overlay:** A global fixed `div` with a linear gradient repeating every 4px to simulate monitor lines.