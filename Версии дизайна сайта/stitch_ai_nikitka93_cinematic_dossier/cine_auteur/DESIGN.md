---
name: Cine-Auteur
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
  on-surface-variant: '#cfc4c5'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#988e90'
  outline-variant: '#4c4546'
  surface-tint: '#c6c6c6'
  primary: '#c6c6c6'
  on-primary: '#303030'
  primary-container: '#000000'
  on-primary-container: '#757575'
  inverse-primary: '#5e5e5e'
  secondary: '#cec6b5'
  on-secondary: '#353024'
  secondary-container: '#4e493c'
  on-secondary-container: '#c0b8a7'
  tertiary: '#abd600'
  on-tertiary: '#283500'
  tertiary-container: '#000000'
  on-tertiary-container: '#647f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ebe2d0'
  secondary-fixed-dim: '#cec6b5'
  on-secondary-fixed: '#1f1b11'
  on-secondary-fixed-variant: '#4c463a'
  tertiary-fixed: '#c3f400'
  tertiary-fixed-dim: '#abd600'
  on-tertiary-fixed: '#161e00'
  on-tertiary-fixed-variant: '#3c4d00'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 180px
    fontWeight: '700'
    lineHeight: '0.9'
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  mono-label:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  mono-data:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0em
spacing:
  unit: 4px
  xs: 8px
  sm: 16px
  md: 32px
  lg: 64px
  xl: 128px
  xxl: 256px
  gutter: 24px
  margin-safe: 5vw
---

## Brand & Style
This design system is built on the principles of **Cinematic Minimalism** and **Editorial Dramaturgy**. It draws inspiration from film title sequences, where negative space is as communicative as the content itself. The target audience is high-end creative directors, studio leads, and luxury curators who value intentionality over density.

The atmosphere is "Noir-Futurism"—unapologetically dark, high-contrast, and authoritative. Every layout is treated as a "scene," utilizing massive scale shifts and a stark color palette to create an auteur-focused digital experience. The movement should feel deliberate, like a slow camera pan, emphasizing a premium, boutique aesthetic.

## Colors
The palette is rooted in **Deep Black (#000000)** to ensure absolute depth and infinite canvas perception. **Bone (#E3DAC9)** serves as the primary ink, providing a warmer, more sophisticated alternative to pure white, reducing eye strain while feeling archival.

**Lime (#CCFF00)** is reserved for micro-accents—the "HUD" elements—signaling interactivity or status with electric precision. **Ember (#FF4500)** acts as the cinematic highlight, used sparingly for focal points, hover states, or "now playing" indicators to evoke the warmth of a film projector’s bulb. **Titanium (#A0A0A0)** recedes into the background, strictly for metadata, timestamps, and non-essential technical labels.

## Typography
Typography is the primary vehicle for the "Film Title" energy. **Space Grotesk** is used for all narrative content and headlines, pushed to extreme scales for Display usage to create a sense of monumental presence. Headlines should often overlap or bleed toward edges to disrupt standard grid expectations.

**IBM Plex Mono** provides the technical counterpoint. It is used for all "utility" information—timestamps, focal lengths, project dates, and navigational cues. This creates a "Director’s Cut" metadata layer over the artistic headlines. Use `text-transform: uppercase` and tracking (letter-spacing) for mono labels to reinforce the archival/technical aesthetic.

## Layout & Spacing
This design system utilizes a **Fixed-Fluid Hybrid Grid**. While content adheres to a 12-column structure for readability, key visual elements and Display typography should break the grid, utilizing wide `margin-safe` areas (5vw) to create "breathing room" typical of high-end cinematography.

The spacing rhythm is aggressive. Use `xxl` (256px) vertical spacing between major sections to force a "pause" in the user’s scroll, emphasizing each project as a standalone event. Layouts should be sparse; avoid clusters. Align technical metadata (IBM Plex Mono) to the edges of the frame to act as "bounding markers" for the central content.

## Elevation & Depth
In this design system, depth is achieved through **Tonal Opacity** and **Selective Illuminance** rather than traditional shadows. 

1. **Surface Layers:** The base is #000000. Elevated cards or modals use a slightly lifted #0A0A0A with a 1px border of #E3DAC9 at 10% opacity (Low-contrast outline).
2. **Backdrop Blurs:** Use heavy saturation and brightness reduction on background elements when modals appear to maintain the cinematic focus.
3. **Glow Accents:** Interacting with specific elements may trigger a subtle "Ember" outer glow (0px blur 15px spread at low opacity) to mimic light leak or projection flare. 
Avoid all soft ambient shadows; the look must remain crisp, flat, and graphic.

## Shapes
The shape language is strictly **Sharp (0px)**. To maintain the "film strip" and "architectural" aesthetic, all buttons, containers, and media assets must have hard 90-degree corners. This reinforces the serious, auteur-driven personality and mirrors the framing of a cinema screen. Rounded corners are prohibited as they soften the impact of the high-contrast composition.

## Components
- **Primary Buttons:** Sharp-edged boxes with Bone (#E3DAC9) background and Deep Black (#000000) text. On hover, the background shifts to Lime (#CCFF00).
- **Project Cards:** Full-bleed imagery with a "Letterbox" overlay. Metadata (Titanium) sits outside the frame in Mono font. 
- **Micro-Accents:** Use 2px x 2px Lime squares or 1px Lime horizontal lines to denote "System Active" states or to divide mono-label sections.
- **Cinematic Indicators:** Use Ember (#FF4500) for "Live" indicators, recording icons, or to highlight the "Current" page in a list.
- **Input Fields:** A single 1px Bone stroke at the bottom of the field. The label sits above in IBM Plex Mono (Titanium). On focus, the stroke turns Lime.
- **Project Navigation:** Large-scale "Next Project" links in Display-XL typography, centered, using Ember highlights on hover to simulate a "Curtain Call" effect.