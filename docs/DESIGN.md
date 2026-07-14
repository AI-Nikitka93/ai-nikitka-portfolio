# Design Notes

## Goal

Create a serious music portfolio for AI Nikitka93 that shows the catalog, not a fake label fantasy.

## Audience

- Listener checking who the artists are.
- Distributor / collaborator checking release consistency.
- Future agent updating the discography and site.

## Visual System

- Composition: archive/index first.
- Typography: serif display headings for catalog authority; system UI for readable metadata.
- Palette: paper/ink base with strong artist accents.
- Radius: maximum 8px.
- Motion: subtle reveal only; no decorative delay.
- Asset style: code-generated album-cover marks until real artwork is available.

## Components

- Sticky header with four navigation anchors.
- Hero release map.
- Artist panels.
- Spotlight release.
- Searchable and filterable release grid.
- Timeline.
- Publication-status block.

## Responsive Rules

- Desktop: two-column hero and multi-column release grid.
- Tablet: two-column catalog.
- Mobile: single-column layout, full-width controls, no horizontal overflow.

## Accessibility / QA Targets

- Semantic headings and landmarks.
- Keyboard-visible focus.
- Interactive controls at least 44px high where possible.
- No fake links.
- Reduced-motion support.
- Browser screenshots and layout measurement before claiming site-ready.
