export type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Minimal class-name joiner. Deliberately not `tailwind-merge` — this project
 * composes classes additively and never needs conflict resolution, so there is
 * no reason to ship 6 kB for it.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }
  return out.join(' ');
}

/** "Dr. Sapna Chauhan" → "SC" */
export function initials(name: string): string {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms|Prof)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** Locale-aware compact number, e.g. 12000 → "12,000". */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}

/**
 * Build a wa.me deep link with a prefilled message.
 * Works on WhatsApp mobile, desktop and web.
 */
export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(base: string, path: string): string {
  return `${base.replace(/\/+$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}
