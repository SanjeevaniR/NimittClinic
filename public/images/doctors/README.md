# Doctor photographs

Drop the two portraits here with these exact filenames:

| File                      | Doctor              |
| ------------------------- | ------------------- |
| `dr-sapna-chauhan.jpg`    | Dr. Sapna Chauhan   |
| `dr-manoj-kumar-pk.jpg`   | Dr. Manoj Kumar PK  |

Until they exist, the site renders a plum-and-gold monogram in their place —
the layout is identical, so nothing looks broken.

## Specification

- **Aspect ratio** — 3:4 portrait (the hero cards crop to this).
- **Minimum size** — 900 × 1200 px. Larger is fine; Next.js resizes and serves
  AVIF/WebP automatically.
- **Framing** — head and shoulders, eyes roughly one-third down the frame. The
  circular crops on `/doctors` and in the sidebar cut a circle from the top
  portion, so leave a little headroom.
- **Background** — plain and light. A clinic wall or a soft grey backdrop keeps
  the plum cards clean.
- **Format** — JPEG at ~85% quality, or WebP. Aim for under 400 KB each.

To change a filename, update `photo` in `src/content/doctors.ts`.
