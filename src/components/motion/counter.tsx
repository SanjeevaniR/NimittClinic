'use client';

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  motion,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CounterProps {
  readonly to: number;
  readonly suffix?: string;
  readonly duration?: number;
  readonly className?: string;
}

/**
 * Counts up from zero the first time it enters the viewport.
 * Users who prefer reduced motion see the final value immediately.
 */
export function Counter({ to, suffix = '', duration = 1.8, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const count = useMotionValue(0);
  const formatted = useTransform(count, (v) =>
    new Intl.NumberFormat('en-IN').format(Math.round(v)),
  );

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      count.set(to);
      return;
    }

    const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, prefersReducedMotion, count, to, duration]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {/* aria-hidden on the animating value; the real number is announced once. */}
      <motion.span aria-hidden>{formatted}</motion.span>
      <span className="sr-only">{new Intl.NumberFormat('en-IN').format(to)}</span>
      {suffix}
    </span>
  );
}
