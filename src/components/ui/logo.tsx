import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface LogoProps {
  readonly tone?: 'light' | 'dark';
  readonly className?: string;
  readonly asLink?: boolean;
}

/**
 * Wordmark + monogram. The mark is a stylised lotus over a caduceus stem —
 * feminine care and general medicine, which is exactly this clinic's mix.
 *
 * The gradient id is scoped per tone so the header (dark) and footer (light)
 * marks on the same page never emit a duplicate DOM id. Keeping this a server
 * component is worth more than `useId()` here — a logo needs no JavaScript.
 */
function Mark({ tone }: { tone: 'light' | 'dark' }) {
  const gradientId = `nimitt-mark-gold-${tone}`;

  return (
    <svg
      viewBox="0 0 32 32"
      className="size-8 shrink-0"
      aria-hidden
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ebc965" />
          <stop offset="55%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b8912c" />
        </linearGradient>
      </defs>
      <path
        d="M16 29V14"
        stroke={tone === 'light' ? '#f3e6f7' : '#43124c'}
        strokeWidth="2"
      />
      <path d="M16 14c0-4.4 2.2-8.2 5-11-.6 4.4-1.9 8.2-5 11Z" fill={`url(#${gradientId})`} />
      <path
        d="M16 14c0-4.4-2.2-8.2-5-11 .6 4.4 1.9 8.2 5 11Z"
        fill={`url(#${gradientId})`}
        opacity="0.75"
      />
      <path
        d="M16 15.2c-2.6-2.6-6-3.6-9.4-3.4 1.4 3.4 4.6 5.6 9.4 5.8Z"
        fill={tone === 'light' ? '#d3a6dd' : '#7d3190'}
      />
      <path
        d="M16 15.2c2.6-2.6 6-3.6 9.4-3.4-1.4 3.4-4.6 5.6-9.4 5.8Z"
        fill={tone === 'light' ? '#e7cced' : '#58215f'}
      />
      <circle cx="16" cy="13.4" r="1.7" fill={`url(#${gradientId})`} />
    </svg>
  );
}

export function Logo({ tone = 'dark', className, asLink = true }: LogoProps) {
  const content = (
    <span className={cn('group inline-flex items-center gap-2.5', className)}>
      <span className="transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
        <Mark tone={tone} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-2xl font-bold tracking-tight',
            tone === 'light' ? 'text-cream' : 'text-plum-950',
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            'mt-0.5 text-[0.6rem] font-semibold tracking-[0.2em] uppercase',
            tone === 'light' ? 'text-gold-300' : 'text-gold-600',
          )}
        >
          {siteConfig.address.city}
        </span>
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link href="/" aria-label={`${siteConfig.name} — home`} className="rounded-pill">
      {content}
    </Link>
  );
}
