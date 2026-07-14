# Skipped Asset Generation

Дата: 05.06.2026.

## Decision

Heavy media generation through `M:\AI\IMAGEN`, `ComfyUI`, `VIDEO` or `3D` was skipped for this first portfolio site.

## Reason

- The task is a catalog portfolio, and the local project folder currently has no approved cover image files.
- Fake-looking generated covers would make the site less truthful.
- The stronger v1 route is a handcrafted catalog visual system with explicit future cover integration.

## Future Asset Job

If the user wants a visual upgrade, create a scoped cover/poster pass:

- Zone: `M:\AI\IMAGEN` or `M:\AI\ComfyUI` through `M:\AI\COMFY_CONTROL`.
- Output: one square cover/poster per artist lane first, then per release.
- Target folder: `M:\Проекты промты\Музыка\portfolio-site\assets\covers\`.
- Acceptance: readable at thumbnail size, no fake artist photos, no copyrighted artist imitation, artist lane fit, mobile crop safe.
