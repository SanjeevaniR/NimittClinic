/** Route-transition skeleton. Deliberately minimal — pages are mostly static. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <span className="sr-only">Loading</span>
      <span className="relative grid size-16 place-items-center">
        <span className="border-plum-100 border-t-gold-500 absolute inset-0 animate-spin rounded-full border-4" />
        <span className="bg-plum-900 size-2.5 rounded-full" />
      </span>
    </div>
  );
}
