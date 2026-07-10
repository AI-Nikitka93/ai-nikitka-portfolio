---
name: Monolith
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#cfc4c5'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#988e90'
  outline-variant: '#4c4546'
  surface-tint: '#c6c6c6'
  primary: '#c6c6c6'
  on-primary: '#303030'
  primary-container: '#000000'
  on-primary-container: '#757575'
  inverse-primary: '#5e5e5e'
  secondary: '#cdc6b6'
  on-secondary: '#343025'
  secondary-container: '#4d493d'
  on-secondary-container: '#beb8a8'
  tertiary: '#a7d700'
  on-tertiary: '#273500'
  tertiary-container: '#000000'
  on-tertiary-container: '#627f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e9e2d1'
  secondary-fixed-dim: '#cdc6b6'
  on-secondary-fixed: '#1e1b11'
  on-secondary-fixed-variant: '#4b473b'
  tertiary-fixed: '#bff50e'
  tertiary-fixed-dim: '#a7d700'
  on-tertiary-fixed: '#151f00'
  on-tertiary-fixed-variant: '#3a4d00'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 120px
    fontWeight: '700'
    lineHeight: 110%
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 100%
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 110%
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 150%
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 160%
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 100%
    letterSpacing: 0.1em
spacing:
  unit: 8px
  gutter: 32px
  margin-edge: 64px
  block-gap: 128px
  slab-padding: 40px
---

## Brand & Style

This design system is anchored in **Cinematic Brutalism**. It rejects the ephemeral nature of modern web interfaces in favor of something that feels permanent, architectural, and imposing. The aesthetic draws inspiration from museum installations and monumental stone structures, utilizing massive scale and stark contrasts to command attention.

The target audience consists of high-end galleries, architectural firms, and avant-garde technology platforms that require a digital presence with significant "weight." The UI should evoke an emotional response of awe and quiet contemplation—feeling less like a software tool and more like an eternal monolith. 

The style combines the raw, structural integrity of Brutalism with the atmospheric depth of cinema. It utilizes layered "slabs" of interface, dramatic lighting (conveyed through shadows), and a disciplined color palette to create a tactile, physical environment.

## Colors

The palette is a high-contrast study in texture and light. **Deep Black (#000000)** serves as the primary void, representing the infinite background of a gallery space. **Archive Bone (#D6CFBF)** is used for the primary structural elements; its slightly warm, off-white hue provides a tactile, paper-like or stone-like quality that prevents the interface from feeling sterile.

**Phosphor Lime (#C9FF22)** is the sole accent, used sparingly for critical interactions, data highlights, or active states. It mimics the glow of a monochromatic terminal or a laser-guided exhibition marker. Tertiary neutrals are derived from desaturated versions of the Bone and Black to create subtle depth within the monolithic structures.

## Typography

Typography in this design system is treated as an architectural element. We exclusively use **Space Grotesk** for its technical, geometric precision and its ability to remain legible at massive scales.

Headlines should be set with tight tracking and leading to create "blocks" of text that feel like engraved inscriptions. Large display sizes are encouraged, often bleeding off the edges of containers to emphasize the scale. For body copy, generous line height ensures readability against the high-contrast background. All labels and auxiliary metadata should be set in uppercase with increased letter spacing to mimic the archival labeling found in museum exhibits.

## Layout & Spacing

The layout philosophy follows a **Fixed-Grid Monolith** model. Content is organized into massive, heavy slabs that stack vertically or intersect with surgical precision. 

- **The Grid:** A 12-column grid with wide gutters (32px) and substantial outer margins (64px). 
- **Rhythm:** We use a base 8px unit, but structural gaps between major sections (Blocks) are intentionally oversized (128px+) to create "air" and a sense of cinematic pacing.
- **Composition:** Avoid centralizing everything; use asymmetrical compositions where text blocks are pushed to the corners of large containers to emphasize the vastness of the digital space.

## Elevation & Depth

Depth in this design system is not achieved through light "fluff," but through **Mass and Shadow**. 

- **The Slab:** Elements do not "float"; they are stacked or extruded. 
- **Heavy Shadows:** Use "Brutalist Shadows"—hard-edged or very slightly diffused, high-opacity black shadows (#000000 at 40-60% alpha). Shadows should have a significant offset (e.g., 20px 20px) to give the impression of a physical slab hovering inches above the base surface.
- **Inverted Depth:** Interactive areas can use "inner shadows" to appear as if they have been carved out of the Bone-colored material.
- **Layers:** Use no more than three layers of depth: the Void (Background), the Monolith (Surface), and the Interactive (Foreground).

## Shapes

The shape language is strictly **Sharp (0px roundedness)**. 

To maintain the architectural integrity of the design, there are no rounded corners. Every button, card, and input field is a perfect rectangle or square. This reinforces the "hard" feel of stone and metal. Structural dividers should be thick (2px to 4px) and use the Archive Bone color against the Black background to create clear, unyielding boundaries.

## Components

Components in this design system must feel industrial and heavy.

- **Buttons:** Large, rectangular blocks. Primary buttons use Archive Bone background with Black text. Hover states shift the background to Phosphor Lime.
- **Input Fields:** Thick 2px Archive Bone borders with no background. Focus states trigger a Phosphor Lime border and a heavy external shadow.
- **Cards (Slabs):** Massive containers using the Archive Bone color. Content inside should have significant internal padding (40px+) to maintain a "gallery" feel.
- **Chips:** Small, sharp-edged rectangles with `label-caps` typography. They should look like physical inventory tags.
- **Progress Bars:** Thick, monolithic bars. The empty state is a dark grey (#1A1A1A), and the fill is Phosphor Lime.
- **Navigation:** Vertical sidebars that feel like structural beams, or minimalist top-right corners that stay out of the way of the monumental content.
- **Custom Component (The Pedestal):** A specific container used for showcasing imagery or key data, featuring a "dropped shadow" that is twice as large as standard cards to denote extreme importance.