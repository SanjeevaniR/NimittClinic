import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const widths = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
} as const;

interface ContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly size?: keyof typeof widths;
  readonly as?: ElementType;
}

export function Container({
  children,
  className,
  size = 'xl',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', widths[size], className)}>
      {children}
    </Tag>
  );
}

interface SectionProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
  /** `plum` inverts the type colours for light-on-dark sections. */
  readonly tone?: 'cream' | 'mist' | 'plum' | 'transparent';
  readonly spacing?: 'sm' | 'md' | 'lg';
}

const tones = {
  cream: 'bg-cream text-ink',
  mist: 'bg-mist text-ink',
  plum: 'bg-plum-900 text-plum-50',
  transparent: '',
} as const;

const spacings = {
  sm: 'py-14 sm:py-16',
  md: 'py-16 sm:py-20 lg:py-24',
  lg: 'py-20 sm:py-28 lg:py-32',
} as const;

export function Section({
  children,
  className,
  id,
  tone = 'cream',
  spacing = 'md',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative overflow-hidden', tones[tone], spacings[spacing], className)}
    >
      {children}
    </section>
  );
}
