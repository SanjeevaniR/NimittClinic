'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Scroll-reveal primitives.
 *
 * Motion components are created once at module scope — calling
 * `motion.create()` during render would produce a new component type on every
 * pass and remount the subtree.
 */
const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  h2: motion.h2,
  h3: motion.h3,
  article: motion.article,
  figure: motion.figure,
} as const;

export type MotionTag = keyof typeof MOTION_TAGS;

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSET = 28;

function offsetFor(direction: RevealDirection): { x: number; y: number } {
  switch (direction) {
    case 'up':
      return { x: 0, y: OFFSET };
    case 'down':
      return { x: 0, y: -OFFSET };
    case 'left':
      return { x: OFFSET, y: 0 };
    case 'right':
      return { x: -OFFSET, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly direction?: RevealDirection;
  readonly delay?: number;
  readonly duration?: number;
  readonly as?: MotionTag;
  /** Re-animate on every entry instead of only the first. */
  readonly repeat?: boolean;
}

/**
 * Fade-and-rise as the element scrolls into view. Only opacity and transform
 * animate, so layout is never shifted and no CLS is introduced.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  as = 'div',
  repeat = false,
}: RevealProps) {
  const Tag = MOTION_TAGS[as];
  const { x, y } = offsetFor(direction);

  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: !repeat, amount: 0.2, margin: '0px 0px -80px 0px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger group                                                      */
/* ------------------------------------------------------------------ */

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

interface StaggerGroupProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly stagger?: number;
  readonly delay?: number;
  readonly as?: MotionTag;
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
  delay = 0.05,
  as = 'div',
}: StaggerGroupProps) {
  const Tag = MOTION_TAGS[as];
  return (
    <Tag
      className={cn(className)}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: MotionTag;
}) {
  const Tag = MOTION_TAGS[as];
  return (
    <Tag className={cn(className)} variants={itemVariants}>
      {children}
    </Tag>
  );
}
