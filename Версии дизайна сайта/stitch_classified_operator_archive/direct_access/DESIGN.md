---
name: Direct Access
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d7c4ac'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#9f8e78'
  outline-variant: '#524533'
  surface-tint: '#ffba43'
  primary: '#ffd597'
  on-primary: '#432c00'
  primary-container: '#ffb000'
  on-primary-container: '#6a4700'
  inverse-primary: '#805600'
  secondary: '#c8c6c6'
  on-secondary: '#303030'
  secondary-container: '#474747'
  on-secondary-container: '#b6b5b4'
  tertiary: '#dddbda'
  on-tertiary: '#313030'
  tertiary-container: '#c1bfbe'
  on-tertiary-container: '#4e4e4d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddaf'
  primary-fixed-dim: '#ffba43'
  on-primary-fixed: '#281800'
  on-primary-fixed-variant: '#614000'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  headline-lg:
    fontFamily: IBM Plex Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: IBM Plex Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: IBM Plex Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  char-unit: 1ch
  line-unit: 1em
  gutter: 2ch
  container-padding: 4ch
---

## Brand & Style

The design system is rooted in the "Direct Access" philosophy: a raw, unmediated interface between the user and the machine. It prioritizes technical efficiency and high-density information over decorative artifice. The aesthetic is strictly Brutalist, drawing inspiration from early terminal emulators and industrial control systems.

The target audience consists of power users and specialists who value speed, precision, and low-latency interaction. The UI evokes a sense of deep-system authority and nostalgic futurism. Visual storytelling is achieved through simulated CRT artifacts—specifically low-fidelity scanlines and rhythmic blinking cursors—creating an environment that feels alive with data.

## Colors

The palette is a high-contrast tri-tone scheme designed for maximum legibility in low-light environments. 

- **Pure Black (#000000):** The foundational void. Used for all primary backgrounds to simulate a powered-down phosphor screen.
- **Amber (#FFB000):** The primary signal color. Used for all text, interactive borders, and high-priority indicators. It mimics the P3 phosphor common in vintage monochrome monitors.
- **Dim Grey (#333333):** Used for inactive states, secondary information, and subtle structural dividers to prevent visual "blooming" of the amber text.

A global "Scanline Overlay" is applied using a 2px repeating linear gradient of `rgba(0,0,0,0)` and `rgba(0,0,0,0.1)` to simulate hardware textures.

## Typography

This design system utilizes **IBM Plex Mono** exclusively across all hierarchy levels. As a monospaced typeface, it ensures that all characters occupy the same horizontal space, allowing for perfect vertical alignment in tables and ASCII-based layouts.

To maintain the terminal aesthetic, typography relies on capitalization and weight rather than varied font families. Large headers should be used sparingly, often enclosed in box-drawing characters. All interactive labels are set in uppercase with increased letter spacing to facilitate rapid scanning.

## Layout & Spacing

The layout is governed by a strict character-based grid. Spacing is never arbitrary; it is always a multiple of the character width (`1ch`) or line height (`1em`). This ensures that ASCII box-drawing characters align perfectly across different components.

The system uses a 12-column fluid grid, but content blocks are primary defined by their borders. Margin and padding should follow an 8px (0.5rem) base rhythm to align with the standard IBM Plex Mono metrics, ensuring that the "grid" feels mathematically sound. Components should feel "locked" to the edges of the screen, emphasizing a dense, data-rich environment.

## Elevation & Depth

In this design system, depth is represented through logic and containment rather than physical shadows or blurs. There are no Z-axis shadows.

- **Tonal Layering:** The primary background is Black (#000000). Secondary panels or "pop-up" windows use a Dim Grey (#333333) fill or a simple Amber border to denote focus.
- **Bold Borders:** High-contrast outlines using box-drawing characters (┌ ─ ┐ │ └ ┘) create the primary sense of separation.
- **ASCII Stippling:** To indicate a "disabled" or "background" layer, an ASCII pattern (e.g., `░░░`) can be used as an overlay to reduce the visual weight of a section without using transparency.

## Shapes

The shape language is strictly orthogonal. Every element features 0px roundedness. The use of curves is prohibited, as the UI is intended to look as though it were rendered on a character-grid display.

Interactive elements are defined by their borders. A "selected" state is represented by an inverted color block (Amber background with Black text) rather than a change in shape. All containers must terminate in 90-degree angles to maintain the structural integrity of the box-drawing character system.

## Components

### Buttons
Buttons are rendered as text strings wrapped in ASCII borders.
- **Default:** `[ SUBMIT ]` (Amber border and text).
- **Hover/Active:** A full Amber block with Black text.
- **Focus:** Indicated by a blinking underscore `_` immediately following the text.

### Input Fields
Inputs consist of a Dim Grey background line with a blinking "block" cursor `█` (animation: steps(2, start), 500ms).
- **Label:** Positioned at the top-left of the field using `label-md` styling.
- **Active State:** The border changes from Dim Grey to Amber.

### Cards & Panels
Panels must use Unicode box-drawing characters for borders.
- **Header:** A card title is "interwoven" into the top border line: `┌─[ SYSTEM_STATUS ]──────┐`.
- **Content:** Padded by `2ch` to ensure text doesn't touch the borders.

### Progress Bars
Progress is visualized using block characters: `[████████░░░░░] 60%`.

### Lists
Lists use the `>` character as a bullet point for the selected item, creating a command-line "prompt" feel for navigation.