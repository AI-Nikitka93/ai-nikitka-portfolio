---
name: Noir Technical
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
  on-surface-variant: '#c5c9ac'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8e9378'
  outline-variant: '#444933'
  surface-tint: '#aed500'
  primary: '#ffffff'
  on-primary: '#293500'
  primary-container: '#c7f300'
  on-primary-container: '#576c00'
  inverse-primary: '#526600'
  secondary: '#c4c6cc'
  on-secondary: '#2d3135'
  secondary-container: '#46494e'
  on-secondary-container: '#b6b8be'
  tertiary: '#ffffff'
  on-tertiary: '#313030'
  tertiary-container: '#e5e2e1'
  on-tertiary-container: '#656464'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c7f300'
  primary-fixed-dim: '#aed500'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#3d4d00'
  secondary-fixed: '#e0e2e8'
  secondary-fixed-dim: '#c4c6cc'
  on-secondary-fixed: '#181c20'
  on-secondary-fixed-variant: '#44474b'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  meta-technical:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  meta-data:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.02em
spacing:
  unit: 4px
  gutter: 16px
  margin: 24px
  container-max: 1440px
---

## Brand & Style

The design system is engineered to evoke the atmosphere of a high-end surveillance terminal or a clandestine digital archive. It prioritizes information density and clarity over decorative flair, channeling a "Mission Control" aesthetic that feels both elite and utilitarian.

The style is a fusion of **Technical Minimalism** and **Digital Brutalism**. It relies on high-contrast interactions, where deep voids of black are punctuated by vibrant functional accents. The emotional response is one of serious authority, precision, and forensic focus. Every pixel serves a purpose, mimicking the interface of an advanced operating system built for intelligence and data analysis.

## Colors

The palette is strictly functional, rooted in a "True Black" (`#000000`) foundation to ensure maximum contrast and minimize visual fatigue in low-light environments. 

- **Primary (Electric Lime):** Used exclusively for high-priority actions, active states, and critical data points. It is the "signal" in the noise.
- **Secondary (Titanium):** A muted, metallic grey used for structural elements, borders, and secondary text. It provides the "hardware" feel of the interface.
- **Tertiary (Carbon):** A deep charcoal used for container backgrounds to create subtle separation from the primary black void.
- **Status Colors:** Use highly saturated reds for alerts and deep ambers for warnings, ensuring they feel like dashboard indicators.

## Typography

This design system utilizes a tiered typographic approach to separate narrative from data. 

**Space Grotesk** is used for headlines and section titles, providing a geometric, forward-looking character that remains highly legible. **Inter** handles standard body text for readability in long-form reports. 

The "soul" of the system lies in **IBM Plex Mono**. This monospaced typeface is used for all technical metadata, labels, timestamps, and coordinate data. It should be used at smaller scales to reinforce the archive aesthetic. Text sizes are kept moderate and controlled to maintain a sophisticated, dense information display rather than an oversized consumer-web look.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy within a 12-column system, emphasizing a structured, modular organization of data. 

Content is housed in defined "modules" or "cells." Use a strict 4px baseline shift to ensure all elements—text, icons, and borders—align perfectly. Gutters are kept tight (16px) to maximize screen real estate, reflecting a professional tool rather than a marketing site. Negative space is used strategically to group related data sets, but the overall feel should be one of "controlled density."

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **High-Contrast Outlines** rather than traditional shadows. 

1.  **Level 0 (Floor):** Pure black (`#000000`).
2.  **Level 1 (Containers):** Carbon (`#1A1A1A`) surfaces with a 1px Titanium (`#333333`) border.
3.  **Level 2 (Popovers/Modals):** Carbon surfaces with a slightly brighter Titanium border and a subtle background blur (8px) for elements passing beneath.

Avoid ambient shadows. If an element needs to "pop," use a thin, 1px Electric Lime border to indicate focus or active state. This mimics a backlit screen where light comes from the elements themselves.

## Shapes

The shape language is **Sharp (0)**. 

Every element—buttons, cards, input fields, and tags—must use 90-degree corners. This reinforces the architectural and technical nature of the design system. Rounded corners are seen as "soft" or "consumer-grade," whereas sharp corners project a sense of mathematical precision and efficiency. Subtle "corner-cut" motifs (45-degree angles on small UI accents) can be used sparingly to indicate "active" or "scanning" zones.

## Components

### Buttons
Primary buttons are solid Electric Lime with Black text, using IBM Plex Mono in Bold. Secondary buttons are ghost-style with a 1px Titanium border and Titanium text. Interactions should be instant, with no transition delays, emphasizing high-performance hardware.

### Inputs
Fields are transparent with a bottom-only Titanium border. When focused, the border becomes Electric Lime. Placeholder text should look like terminal prompts (e.g., `_ENTER_ID_`).

### Chips & Tags
Small, rectangular boxes with IBM Plex Mono text. For status indicators, use a "filled dot" prefix (e.g., a lime dot for `LIVE`).

### Cards & Modules
Modules must have visible borders on all sides or be separated by thin 1px dividers. Every module should ideally have a "header" strip containing technical metadata (timestamps, file sizes, or UUIDs) in the top-right corner.

### Data Visualization
Charts should use thin lines and no fills. Grids within charts must be visible but faint, using the Titanium color at 20% opacity. All labels on axes must use the `meta-data` typographic style.