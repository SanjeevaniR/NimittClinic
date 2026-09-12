import 'server-only';

/**
 * Fixed-window in-memory rate limiter.
 *
 * Deliberately dependency-free and good enough for a single-clinic marketing
 * site: it stops a bot hammering the contact endpoint from one address.
 *
 * Limitation to be aware of before scaling: the counter lives in the Node
 * process, so each serverless instance keeps its own window. If this site ever
 * runs across many instances and abuse becomes real, swap the body of
 * `checkRateLimit` for Upstash Redis or Vercel KV — the signature is designed
 * so nothing else has to change.
 */

interface Window {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Window>();

/** Drop expired windows so the map cannot grow without bound. */
function sweep(now: number): void {
  if (buckets.size < 500) return;
  for (const [key, window] of buckets) {
    if (window.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly remaining: number;
  /** Seconds until the window resets — surfaced as `Retry-After`. */
  readonly retryAfter: number;
}

export function checkRateLimit(
  key: string,
  max: number,
  windowSeconds: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true, remaining: max - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  if (existing.count > max) {
    return { allowed: false, remaining: 0, retryAfter };
  }

  return { allowed: true, remaining: Math.max(0, max - existing.count), retryAfter };
}

/**
 * Best-effort client IP.
 * `x-forwarded-for` is set by Vercel and most reverse proxies; the leftmost
 * entry is the original client. Falls back to a constant so the limiter still
 * applies (globally) when no header is present.
 */
export function clientIpFrom(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip') ?? headers.get('cf-connecting-ip') ?? 'unknown';
}
