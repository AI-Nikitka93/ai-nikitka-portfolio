---
name: Focused Command
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#383939'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#d7c4ac'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#303031'
  outline: '#9f8e78'
  outline-variant: '#524533'
  surface-tint: '#ffba43'
  primary: '#ffd597'
  on-primary: '#432c00'
  primary-container: '#ffb000'
  on-primary-container: '#6a4700'
  inverse-primary: '#805600'
  secondary: '#c6c6c6'
  on-secondary: '#303030'
  secondary-container: '#474747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#dddbdb'
  on-tertiary: '#303030'
  tertiary-container: '#c1bfbf'
  on-tertiary-container: '#4e4e4e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddaf'
  primary-fixed-dim: '#ffba43'
  on-primary-fixed: '#281800'
  on-primary-fixed-variant: '#614000'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e4e2e2'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  h1:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0em
  body-mono:
    fontFamily: Monaspace Neon
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  terminal-sm:
    fontFamily: Monaspace Neon
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  container-max-width: 800px
  gutter: 2rem
  stack-sm: 1rem
  stack-md: 2.5rem
  stack-lg: 5rem
  indent-terminal: 1.5rem
---

## Brand & Style

The design system is built for high-stakes technical environments where clarity and focus are paramount. It evokes the feeling of an advanced command-line interface, stripping away the visual noise of modern consumer web design in favor of a "terminal-first" philosophy. The aesthetic is rooted in technical minimalism and digital brutalism, prioritizing content hierarchy and verticality.

The target audience is power users, developers, and system administrators who value speed and precision. The emotional response is one of total control, intellectual rigor, and calm authority. By utilizing a single-column flow, the design system eliminates lateral distractions, guiding the user through a linear narrative of data and commands.

## Colors

The palette is strictly functional, inspired by legacy monochrome phosphor monitors. The base is an absolute pure black (#000000), ensuring maximum contrast and zero light bleed on OLED displays. 

Highlights and primary actions use a soft amber-phosphor (#FFB000), which provides high visibility without the eye strain associated with pure white or harsh blue. Secondary text and non-essential information are rendered in "dim grey" tones (#4D4D4D and #808080), creating a clear visual hierarchy where the most important information "glows" against the void.

## Typography

This design system uses a dual-font strategy. **Space Grotesk** is utilized for headers and structural labels, providing a technical, geometric look that remains legible in Russian (Cyrillic). Its idiosyncratic letterforms add a touch of futuristic character to an otherwise utilitarian interface.

For all data-heavy content, logs, and interactive elements, **Monaspace Neon** is the standard. This monospace typeface reinforces the CLI-native feel, ensuring that characters align perfectly for data scanning and code readability. Russian text should be set with generous line heights (1.6) to accommodate the density of Cyrillic characters.

## Layout & Spacing

The layout is strictly a single-column flow, centered within the viewport. The maximum width is capped at 800px to ensure optimal line length for readability. This system eschews complex multi-column grids in favor of a vertical "stack" of information, mimicking a scrollback buffer or a document.

Spacing follows a rigid vertical rhythm. Large gaps (#stack-lg) are used to separate major conceptual sections, while smaller increments (#stack-sm) handle the relationship between labels and their corresponding data. Horizontal indentation (#indent-terminal) is used to show nesting or hierarchy within the flow, rather than using boxes or cards.

## Elevation & Depth

This design system is intentionally flat. Depth is conveyed through **tonal layers** and **line work** rather than shadows. 

1. **Surface Layers:** All primary content sits on the pure black base. Modals or overlays do not "float" with shadows; instead, they use a dim grey border (1px) and a solid black background to punch through the base layer.
2. **Dividers:** Horizontal rules are used sparingly to separate high-level sections. These are rendered in #4D4D4D with a thickness of 1px.
3. **Indentation:** Hierarchy is achieved through horizontal offsets. Nested information is pushed to the right, creating a visual "tree" without the need for physical containers.

## Shapes

The shape language is uncompromisingly sharp. All buttons, input fields, and containers use a 0px border radius. This "Sharp" aesthetic reinforces the machine-like, precise nature of the system. Curved lines are strictly reserved for the letterforms of the typography, creating a distinct contrast between the organic nature of language and the rigid structure of the interface.

## Components

### Buttons
Buttons are text-based or outlined. The primary action button is a solid amber block (#FFB000) with black text. Secondary actions are outlined in dim grey with amber text on hover. Every button should have a `[ STATUS ]` indicator if applicable.

### Input Fields
Inputs are modeled after command lines. They consist of a prompt character (`> ` or `_ `) in amber, followed by a monospace text string. There are no bounding boxes; only a bottom border that activates (glows amber) when the field is focused.

### Chips & Tags
Tags are displayed in square brackets, e.g., `[ ВЫПОЛНЕНО ]` or `[ ОШИБКА ]`. They use the label-caps typography style. Amber signifies active/important status; dim grey signifies metadata.

### Lists
Lists are never bulleted with circles. They use technical markers like numbers (`01.`, `02.`) or dashes (`--`). For interactive lists, the active item is indicated by a trailing cursor or a solid amber background for the entire line.

### Terminal Blocks
Large segments of data are wrapped in a subtle 1px dim grey border. These blocks should look like a "view into the system," using the `terminal-sm` typography and a slightly lighter black background (#050505) to distinguish from the main page background.