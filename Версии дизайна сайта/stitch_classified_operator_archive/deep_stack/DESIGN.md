---
name: Deep Stack
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#b9caca'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#303030'
  outline: '#849495'
  outline-variant: '#3a494a'
  surface-tint: '#00dce5'
  primary: '#e9feff'
  on-primary: '#003739'
  primary-container: '#00f5ff'
  on-primary-container: '#006c71'
  inverse-primary: '#00696e'
  secondary: '#ffb4ab'
  on-secondary: '#690006'
  secondary-container: '#d30017'
  on-secondary-container: '#ffe2de'
  tertiary: '#fdf9f9'
  on-tertiary: '#313030'
  tertiary-container: '#e0dddc'
  on-tertiary-container: '#626161'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#63f7ff'
  primary-fixed-dim: '#00dce5'
  on-primary-fixed: '#002021'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#93000c'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 72px
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
    fontWeight: '500'
    lineHeight: '1.2'
  body-lg:
    fontFamily: IBM Plex Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  code:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
spacing:
  unit: 4px
  stack-offset: 16px
  frame-gap: 0px
  gutter: 24px
  margin-safe: 32px
---

## Brand & Style

This design system is built on the principles of **Cyber-Brutalism**, emphasizing raw structural integrity, vertical density, and high-contrast digital utility. The brand personality is unapologetically technical, cold, and efficient, designed for power users who navigate complex information environments. 

The aesthetic focuses on a "Deep Stack" vertical hierarchy, where information is layered through cascading frames and overlapping data windows rather than flat pages. The visual language should evoke a sense of "digital archeology"—looking down through layers of active processes. Key characteristics include heavy structural borders, exposed scrollbars that serve as primary design motifs, and a relentless focus on monospaced data clarity.

## Colors

The palette is strictly high-contrast and functional. The **Near-black base (#080808)** provides a void-like depth for the cascading layers. **Neon Cyan (#00F5FF)** acts as the primary "energy" color, used for active states, data highlights, and structural accents. **Alert Red (#FF3131)** is reserved exclusively for critical errors, destructive actions, and high-priority system warnings.

Neutral tones should be used sparingly to define frame depth. Borders should predominantly use the primary Cyan or a muted grey (#222222) to indicate inactive layers. There are no gradients or soft transitions; color changes are binary and immediate.

## Typography

Typography in this design system functions as a structural grid element. **Space Grotesk** is used for high-level headers and "Stack Identifiers," providing a modern, technical geometric feel. **IBM Plex Mono** is the workhorse of the system, utilized for all body copy, data readouts, and UI labels to reinforce the brutalist, machine-readable aesthetic.

All labels should be treated as metadata. Use uppercase for labels and small tags to differentiate them from functional data. Paragraphs should maintain a strict vertical rhythm, aligned to a fixed baseline to support the cascading frame structure.

## Layout & Spacing

The layout utilizes a **Vertical Stack Model**. Content does not exist on a single plane; instead, it is organized into cascading frames that offset by 16px (the `stack-offset`) both horizontally and vertically to create a simulated 3D depth of windows.

The grid is rigid and non-fluid. Windows and containers should snap to a 4px baseline. Gutters are strictly defined by 2px heavy borders. Unlike traditional layouts, whitespace is often replaced by "structural density"—filling gaps with technical metadata or decorative scrollbar tracks. Layouts should favor vertical scrolling within individual frames over a single page-wide scroll.

## Elevation & Depth

Elevation is communicated through **overlapping frames and heavy borders**, never shadows. 

1.  **Z-Axis Hierarchy:** Higher-level data windows physically overlap lower-level ones.
2.  **Border Intensity:** The active window or the top-most frame in the stack utilizes the Neon Cyan border (2px). Background frames use a dimmed or muted grey border (1px).
3.  **Frame Insets:** Secondary data within a window is presented in "cut-out" containers with an inner-stroke effect, making the content feel physically recessed into the frame.
4.  **Visible Scrollbars:** Scrollbars are always visible and styled as heavy, blocky tracks (#222222) with Neon Cyan thumbs. They act as "depth indicators," showing how deep the user is within a specific stack layer.

## Shapes

The shape language is strictly **rectangular and sharp**. There are zero rounded corners in this design system. All containers, buttons, and input fields must have 90-degree angles to maintain the brutalist architectural feel. 

Special "notched" corners can be used for primary frame headers to simulate industrial hardware panels. All decorative elements—such as progress bars or selection boxes—must be comprised of blocks and straight lines.

## Components

### Buttons
Buttons are rectangular blocks with heavy 2px borders.
- **Primary:** Black background, Neon Cyan border, Neon Cyan text. On hover: Inverse (Cyan background, Black text).
- **Destructive:** Black background, Alert Red border, Alert Red text.
- **Ghost:** No border, monospaced text with `[ ]` brackets surrounding the label.

### Cascading Frames
The core component of this design system. Each frame features a top "Header Bar" containing the window title in Space Grotesk and a "Stack Index" (e.g., `001`, `002`). Frames should have a slight 10% opacity background to allow the stack underneath to be faintly visible.

### Input Fields
Inputs are underlined or fully boxed with a 1px border. The cursor is a solid Cyan block that blinks. Placeholders are muted grey with a `_` prefix (e.g., `_ENTER_KEY`).

### Scrollbars
Scrollbars are integrated as structural elements. The track is a solid dark grey line that runs the full height of the frame. The thumb is a solid Cyan rectangle. In high-density frames, scrollbars may be placed on both the left and right for symmetry.

### Data Chips
Small, rectangular tags with no padding between the border and the text. Used for status indicators: `[STATUS: ACTIVE]` or `[LVL: 04]`.

### Stack Indicator
A vertical line of blocks on the far left of the viewport that highlights which layer of the "Deep Stack" the user is currently interacting with.