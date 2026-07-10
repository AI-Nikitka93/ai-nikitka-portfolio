---
name: Technical Terminal
colors:
  surface: '#0c141a'
  surface-dim: '#0c141a'
  surface-bright: '#323a40'
  surface-container-lowest: '#070f15'
  surface-container-low: '#151d22'
  surface-container: '#192126'
  surface-container-high: '#232b31'
  surface-container-highest: '#2e363c'
  on-surface: '#dbe3ec'
  on-surface-variant: '#b9cac9'
  inverse-surface: '#dbe3ec'
  inverse-on-surface: '#293138'
  outline: '#839493'
  outline-variant: '#3a4a49'
  surface-tint: '#00dddd'
  primary: '#ffffff'
  on-primary: '#003737'
  primary-container: '#00fbfb'
  on-primary-container: '#007070'
  inverse-primary: '#006a6a'
  secondary: '#c3c6cf'
  on-secondary: '#2d3137'
  secondary-container: '#454950'
  on-secondary-container: '#b5b8c1'
  tertiary: '#ffffff'
  on-tertiary: '#2b3138'
  tertiary-container: '#dde3ec'
  on-tertiary-container: '#5f656d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#00fbfb'
  primary-fixed-dim: '#00dddd'
  on-primary-fixed: '#002020'
  on-primary-fixed-variant: '#004f4f'
  secondary-fixed: '#dfe2eb'
  secondary-fixed-dim: '#c3c6cf'
  on-secondary-fixed: '#181c22'
  on-secondary-fixed-variant: '#43474e'
  tertiary-fixed: '#dde3ec'
  tertiary-fixed-dim: '#c1c7d0'
  on-tertiary-fixed: '#161c23'
  on-tertiary-fixed-variant: '#41474f'
  background: '#0c141a'
  on-background: '#dbe3ec'
  surface-variant: '#2e363c'
typography:
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: 0.01em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  data-viz:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin: 24px
  module-gap: 20px
---

## Brand & Style

This design system is engineered for high-density information environments, evoking the precision of a high-end command center. The personality is analytical, authoritative, and sophisticated, targeting professionals who manage complex data streams. 

The aesthetic direction blends **Cybernetic Brutalism** with **Retro-Futurism**. It utilizes sharp technical grids and monospaced typography to ground the interface in a functional reality, while scanline overlays and phosphor-glow accents provide a cinematic, "near-future" visual layer. The primary emotional response is one of controlled power and absolute clarity amidst complexity.

## Colors

The palette is anchored by a deep navy-grey terminal base, providing a low-light environment that reduces eye strain during long-term monitoring. The primary cyan-phosphor accent is used sparingly for critical data points, active states, and interactive borders, simulating the luminescence of a CRT display.

Text is rendered in "Titanium"—a cool, desaturated neutral that ensures legibility without the harsh contrast of pure white. Success and error states should deviate from the cyan primary, using desaturated greens and ambers to maintain the technical hardware aesthetic.

## Typography

**JetBrains Mono** is the sole typeface, utilized for its exceptional legibility in technical contexts and its robust support for Cyrillic characters. In the Russian primary context, careful attention must be paid to line heights, as Cyrillic ascenders and descenders can appear denser than Latin counterparts.

Headlines should be kept short and impactful. Data visualization labels and metadata use a specialized "label-caps" style to distinguish peripheral information from primary content. All numerical data must use tabular lining figures to ensure vertical alignment in tables and dashboards.

## Layout & Spacing

The layout follows a **Fixed-Module Grid** system. Content is housed within "floating" UI modules that snap to a 12-column underlying structure. These modules are separated by a consistent 20px gap, creating a sense of modular components suspended in a digital void.

Internal module padding adheres to a strict 4px rhythmic scale. Navigation is typically docked to the left or top in a slim, high-contrast bar, maximizing the remaining "screen real estate" for data-heavy widgets. Horizontal scanline effects are applied at the global layout level, subtly moving to give the interface a "live" feel.

## Elevation & Depth

This design system rejects traditional soft shadows in favor of **Tonal Layering and Glow Emission**. 

1.  **Base Level:** The background (#0D1117) with a faint, static scanline texture.
2.  **Module Level:** Surfaces are slightly lighter (#161B22) with 1px solid borders in #30363D.
3.  **Active Level:** Primary interactive elements or focused modules feature a 1px cyan-phosphor border with a soft outer glow (4-8px blur) to simulate light emission.
4.  **Overlay Level:** Modals and tooltips utilize a backdrop blur (12px) to desaturate the data behind them, maintaining focus without losing the "terminal" context.

## Shapes

The shape language is strictly geometric. A "Soft" rounding (4px) is applied to modules and buttons to suggest precision-milled hardware components. Decorative elements, such as corner brackets on data viz windows or progress bars, should maintain sharp 90-degree angles to reinforce the technical nature of the system. Icons must be stroke-based, using a consistent 1.5px weight to match the typography's visual density.

## Components

-   **Buttons:** Rectangular with 4px radius. Default state: subtle border. Hover state: Cyan background with Titanium text and glow effect.
-   **Input Fields:** Styled as terminal prompts. Use a "greater-than" symbol (>) as a prefix. Active inputs feature a blinking underscore cursor.
-   **Chips/Tags:** Minimalist blocks with a desaturated cyan background and dark text, used for filtering data categories.
-   **Data Viz:** Line charts and histograms use the cyan-phosphor color for the primary data line, with a semi-transparent cyan fill (10% opacity) below the line. Grid lines within charts are #30363D.
-   **Lists:** High-density rows with 1px bottom separators. Hover states highlight the entire row in a dark-teal tint.
-   **Floating Modules:** Each module should have a header area featuring a "terminal ID" (e.g., `MOD_084 // DATA_FEED`) in the label-caps style.
-   **Status Indicators:** Use small, glowing circular dots. Pulse animations are encouraged for "Live" or "Recording" states.