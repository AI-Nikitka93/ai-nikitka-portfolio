# Asset Manifest

## Current Assets

No external images, videos, fonts or audio files are used.

Visual assets are code-generated in:

- `styles.css` - artist panels, release cover marks, record grooves, spines.
- `app.js` - release cover markup generated from catalog data.

Status: handcrafted local visual system, not real album artwork.

## Future Real Artwork Route

When approved covers are available, add them under:

```text
portfolio-site/assets/covers/
```

Recommended filename pattern:

```text
<artist-id>__<release-id>.webp
```

Then add `coverImage` fields in `site-data.js` and update `releaseCover()` in `app.js`.

## Heavy Generation Skipped

Local image/video generation was not run for v1 because the project folder did not contain approved cover assets, and generated cover-like media would risk misrepresenting the catalog before release artwork is confirmed.
