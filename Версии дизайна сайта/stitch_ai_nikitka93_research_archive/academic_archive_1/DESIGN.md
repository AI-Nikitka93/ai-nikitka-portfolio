---
name: Academic Archive
colors:
  surface: '#10150f'
  surface-dim: '#10150f'
  surface-bright: '#353b34'
  surface-container-lowest: '#0a0f0a'
  surface-container-low: '#181d17'
  surface-container: '#1c211b'
  surface-container-high: '#262b25'
  surface-container-highest: '#313630'
  on-surface: '#dfe4db'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#dfe4db'
  inverse-on-surface: '#2c322c'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#cbc6ba'
  on-secondary: '#333028'
  secondary-container: '#4a473e'
  on-secondary-container: '#bab5a9'
  tertiary: '#ffffff'
  on-tertiary: '#2c322e'
  tertiary-container: '#dfe4de'
  on-tertiary-container: '#606661'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#e8e2d6'
  secondary-fixed-dim: '#cbc6ba'
  on-secondary-fixed: '#1e1c14'
  on-secondary-fixed-variant: '#4a473e'
  tertiary-fixed: '#dfe4de'
  tertiary-fixed-dim: '#c3c8c2'
  on-tertiary-fixed: '#181d19'
  on-tertiary-fixed-variant: '#434844'
  background: '#10150f'
  on-background: '#dfe4db'
  surface-variant: '#313630'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  metadata-lg:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
  metadata-sm:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
  label:
    fontFamily: IBM Plex Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: '1.0'
spacing:
  grid-columns: '12'
  gutter: 1rem
  margin: 2rem
  unit: 4px
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 4rem
---

## Brand & Style

This design system is built on the principles of Swiss Rationalism and the functional clarity of research posters. It prioritizes information density and structural discipline over decorative elements, evoking a sense of "gallery-grade" archival precision. The aesthetic is academic and intellectual, designed for users who value data integrity and technical rigor.

The style is a fusion of **Minimalism** and **Brutalism**: it utilizes a rigid grid and raw typographic hierarchies while maintaining a refined, high-contrast finish. It avoids all forms of skeuomorphism, focusing instead on the honest expression of digital surfaces and technical metadata.

## Colors

The palette is rooted in a deep "Black-green" void, providing a high-contrast foundation for "Bone" text. The "Lime" accent is used sparingly to draw attention to critical actions or active states, functioning as a digital highlighter. 

- **Primary (Lime):** Reserved for interaction cues, status indicators, and high-priority highlights.
- **Secondary (Bone):** The primary color for all reading content and structural lines.
- **Tertiary (Titanium):** Used for metadata, labels, and secondary technical information to create a visual "depth" through lower contrast.
- **Neutral (Black-green):** The singular background color, ensuring the interface feels like a unified, continuous surface.

## Typography

The typographic system uses a dual-font approach to distinguish between narrative content and technical data. 

**Space Grotesk** handles the core interface and headlines. Large headlines must be left-aligned with tight tracking to mimic mid-century poster layouts. 

**IBM Plex Mono** is used for all "non-narrative" elements: timestamps, file sizes, technical specs, and UI labels. This font serves as the "voice of the machine," providing a precise, monospaced counterpoint to the bold geometric nature of the primary typeface. All labels and metadata should strictly follow an uppercase or sentence-case convention to maintain a disciplined, document-like appearance.

## Layout & Spacing

This design system employs a rigid 12-column fixed grid. All elements must align precisely to the grid lines. Whitespace is used as a structural tool rather than a mere separator; large "voids" in the layout are intentional, directing focus toward the content-heavy clusters.

Spacing follows a strict 4px base unit. Vertical rhythm is critical: headlines should be stacked with minimal leading, while metadata groups should be separated by clear, consistent intervals of "stack-md" or "stack-lg." Alignment is exclusively left-justified; center alignment is prohibited to maintain the disciplined research-poster aesthetic.

## Elevation & Depth

This system is strictly 2D. Depth is communicated through color hierarchy and thin, high-contrast lines rather than shadows or blurs.

- **Flat Planes:** All UI elements exist on the same Z-index. No drop shadows are permitted.
- **Bold Borders:** Use 1px "Bone" or "Titanium" borders to define containers. 
- **Inversion:** To show focus or selection, invert the colors (e.g., Background becomes Lime, Text becomes Black-green) rather than raising the element's elevation.
- **Section Dividers:** Horizontal lines extending the full width of the grid are the primary method of separating content sections, mimicking the layout of a scientific table.

## Shapes

The shape language is uncompromisingly sharp. All corners are 0px (Sharp). This reinforces the grid and the architectural "blueprint" feel of the system. 

Buttons, input fields, and containers are rectangular blocks. Circles or rounded corners are only permitted if they serve a functional purpose (e.g., a radio button), though even those should lean toward a "square-peg" or "diamond" aesthetic if the platform allows.

## Components

### Buttons & Interaction
Buttons are text-based or bordered rectangles. The primary state is a "Bone" border with "Bone" text; the hover/active state is a solid "Lime" fill with "Black-green" text. There are no gradients or rounded edges.

### Navigation (The Index)
The primary navigation is an "Index-style" vertical list. Each item is prefixed with a monospaced index number (e.g., 01/, 02/). Use "IBM Plex Mono" for the numbers and "Space Grotesk" for the labels.

### Input Fields
Inputs are underlined with a 1px "Titanium" border that turns "Lime" on focus. Labels must sit above the field in "metadata-sm" IBM Plex Mono, always visible.

### RU/EN Switch
A purely typographic element. The active language is shown in "Lime" with an underscore, while the inactive language is "Titanium." It should appear as a simple string of text: `RU / EN`.

### Research Cards
Cards are not elevated blocks but segments of the grid separated by 1px horizontal and vertical rules. They resemble cells in a complex technical drawing or a spreadsheet.

### Metadata Chips
Small, rectangular containers with "Titanium" borders. Text inside is always "metadata-sm" and uppercase.