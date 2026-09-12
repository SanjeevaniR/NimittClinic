import type { ReactNode } from 'react';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  readonly children: ReactNode;
  readonly tone?: 'light' | 'dark';
  readonly className?: string;
}

/** Small pill above a heading — "Trusted in Indore", "Meet the team". */
export function Eyebrow({ children, tone = 'dark', className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'rounded-pill inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase',
        tone === 'dark'
          ? 'bg-plum-50 text-plum-700 ring-hairline-gold'
          : 'glass-plum text-gold-200',
        className,
      )}
    >
      <Icon name="sparkle" size={13} className="text-gold-500" />
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly align?: 'center' | 'left';
  readonly tone?: 'light' | 'dark';
  readonly className?: string;
  readonly as?: 'h1' | 'h2';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'dark',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal duration={0.5}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <Tag
          className={cn(
            'text-section',
            tone === 'dark' ? 'text-plum-950' : 'text-cream',
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {/* Gold rule with a diamond — echoes the divider in the mockup. */}
      <Reveal delay={0.14} className={cn(align === 'center' ? 'mx-auto' : '')}>
        <span aria-hidden className="flex items-center gap-2">
          <span className="bg-gold-sweep h-px w-10 opacity-70" />
          <span className="bg-gold-500 size-1.5 rotate-45" />
          <span className="bg-gold-sweep h-px w-10 opacity-70" />
        </span>
      </Reveal>

      {description && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed sm:text-lg',
              tone === 'dark' ? 'text-ink-soft' : 'text-plum-100/85',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
