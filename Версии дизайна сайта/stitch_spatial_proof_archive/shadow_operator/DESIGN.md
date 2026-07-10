---
name: Shadow Operator
colors:
  surface: '#0e150f'
  surface-dim: '#0e150f'
  surface-bright: '#343b33'
  surface-container-lowest: '#09100a'
  surface-container-low: '#161d16'
  surface-container: '#1a211a'
  surface-container-high: '#242c24'
  surface-container-highest: '#2f372f'
  on-surface: '#dde5d9'
  on-surface-variant: '#c4c7c1'
  inverse-surface: '#dde5d9'
  inverse-on-surface: '#2b322b'
  outline: '#8e928c'
  outline-variant: '#444843'
  surface-tint: '#c1c9be'
  primary: '#c1c9be'
  on-primary: '#2b322b'
  primary-container: '#8e968c'
  on-primary-container: '#272e27'
  inverse-primary: '#596058'
  secondary: '#c3c8c4'
  on-secondary: '#2c312f'
  secondary-container: '#454a48'
  on-secondary-container: '#b5b9b6'
  tertiary: '#c5c7c5'
  on-tertiary: '#2e3130'
  tertiary-container: '#929492'
  on-tertiary-container: '#2a2d2c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde5d9'
  primary-fixed-dim: '#c1c9be'
  on-primary-fixed: '#161d16'
  on-primary-fixed-variant: '#414941'
  secondary-fixed: '#dfe4e0'
  secondary-fixed-dim: '#c3c8c4'
  on-secondary-fixed: '#181d1b'
  on-secondary-fixed-variant: '#434845'
  tertiary-fixed: '#e1e3e1'
  tertiary-fixed-dim: '#c5c7c5'
  on-tertiary-fixed: '#191c1b'
  on-tertiary-fixed-variant: '#444746'
  background: '#0e150f'
  on-background: '#dde5d9'
  surface-variant: '#2f372f'
typography:
  headline-lg:
    fontFamily: IBM Plex Mono
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: IBM Plex Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: IBM Plex Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  body-sm:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-caps:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  data-mono:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
spacing:
  unit: 4px
  gutter: 16px
  margin: 24px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for high-stakes, low-light environments where clarity and speed of information retrieval are paramount. It adopts a **Tactical Minimalism** style—a hybrid of Brutalism and strict functionalism. The brand personality is cold, disciplined, and utilitarian, mimicking the head-up displays (HUD) of advanced reconnaissance hardware.

The target audience consists of specialists who require an interface that stays out of the way until needed, then provides data with mathematical precision. Every element exists for a functional reason; if a component does not serve a direct purpose, it is removed. The emotional response is one of total control and professional detachment.

## Colors

The palette is strictly limited to low-signature tones to maintain "stealth" visual dominance. 
- **Void Black (#0A0D0C)**: The absolute base layer. Used for the primary background to minimize screen glare.
- **Carbon Fog (#161B19)**: The secondary layer. Used for containers, cards, and distinct UI sections to create subtle depth without relying on shadows.
- **Raw Titanium (#8E968C)**: The primary mechanical color. Used for all text, icons, and borders. It provides a high-contrast, "metallic" readability against the dark backgrounds.
- **Phosphor Lime (#CCFF00)**: The only chromatic exception. Reserved exclusively for critical alerts, system failures, or active combat/operation states. Use sparingly to maintain its psychological impact.

## Typography

This design system relies exclusively on **IBM Plex Mono**. The monospaced nature of the typeface ensures that data—particularly numerical values and coordinates—remains perfectly aligned across different states. 

Headlines should be kept short and authoritative. Labels should almost always be set in uppercase with increased letter spacing to mimic technical equipment markings. Avoid using italics; emphasis is achieved through weight changes or Phosphor Lime highlights.

## Layout & Spacing

The layout is built on a **Rigid 8px Grid** with a 4px sub-grid for micro-adjustments. This design system utilizes a **Fixed Grid** model to ensure that information density remains consistent across professional-grade displays.

- **Grid**: 12-column system.
- **Gutters**: 16px fixed.
- **Margins**: 24px minimum safe area.
- **Density**: Extremely high. Elements are packed tightly to allow for maximum data visualization on a single screen, mirroring a flight deck or tactical terminal.

## Elevation & Depth

In this design system, depth is communicated through **Tonal Layering** and **1px Borders** rather than shadows. 

1.  **Level 0 (Base)**: Void Black. Used for the application background.
2.  **Level 1 (Surface)**: Carbon Fog. Used for sidebars, toolbars, and inactive panels.
3.  **Level 2 (Active Container)**: Carbon Fog with a 1px Raw Titanium border. Used for active windows or modals.

Do not use blurs or soft shadows. Transitions between layers should be immediate and sharp. Visual hierarchy is established by the presence or absence of a 1px Raw Titanium outline.

## Shapes

The shape language is strictly **Rectilinear**. All corners must have a **0px radius**. Rounded corners are viewed as a waste of space and a softening of the "Shadow Operator" aesthetic. This sharp-edged approach reinforces the military-grade, precision-tooled feel of the interface. Buttons, input fields, and windows are all hard-edged rectangles.

## Components

### Buttons
Primary buttons are Raw Titanium blocks with Void Black text. Secondary buttons are 1px Raw Titanium outlines with Raw Titanium text. There are no hover "glows"—instead, use a 100% color inversion on hover/active states.

### Inputs
Text inputs are Void Black rectangles with a 1px Raw Titanium bottom border. When focused, the border becomes a full rectangle. Placeholder text should be 40% opacity Raw Titanium.

### Chips / Status Indicators
Chips are small, rectangular tags. Default status is Raw Titanium text on a Carbon Fog background. Critical status uses Phosphor Lime text on a Void Black background with a 1px Phosphor Lime border.

### Data Lists
Lists are separated by 1px Carbon Fog dividers. Each row should have a fixed height to maintain the rhythmic grid.

### Special Component: Tactical HUD Overlay
A decorative but functional component consisting of "crosshair" corner brackets in 1px Raw Titanium, used to frame the most critical piece of data on a dashboard.

### Checkboxes & Radios
Custom-built square boxes (0px radius). Checked states use a "X" mark or a solid Raw Titanium inner square, never a checkmark.