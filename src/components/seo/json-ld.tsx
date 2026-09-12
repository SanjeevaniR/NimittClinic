/**
 * Renders a structured-data block.
 *
 * The payload is built server-side from typed content in `src/content`, never
 * from user input, so serialising it into a script tag is safe. `<` is still
 * escaped as a belt-and-braces guard against script-tag breakout.
 */
export function JsonLd({ data }: { readonly data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
