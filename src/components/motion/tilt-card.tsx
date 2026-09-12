'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useCallback, type PointerEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  readonly children: ReactNode;
  readonly className?: string;
  /** Maximum rotation in degrees on each axis. */
  readonly intensity?: number;
  readonly glare?: boolean;
}

/**
 * Subtle pointer-tracking 3D tilt with a moving specular highlight.
 * Skipped entirely for reduced-motion users and for touch input (pointer
 * events from a finger would make the card lurch).
 */
export function TiltCard({
  children,
  className,
  intensity = 7,
  glare = true,
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 180, damping: 20, mass: 0.4 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), spring);
  const glareX = useTransform(px, [0, 1], ['20%', '80%']);
  const glareY = useTransform(py, [0, 1], ['10%', '90%']);

  const handleMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || event.pointerType !== 'mouse') return;
      const rect = event.currentTarget.getBoundingClientRect();
      px.set((event.clientX - rect.left) / rect.width);
      py.set((event.clientY - rect.top) / rect.height);
    },
    [prefersReducedMotion, px, py],
  );

  const handleLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  if (prefersReducedMotion) {
    return <div className={cn('relative', className)}>{children}</div>;
  }

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      whileHover={{ scale: 1.015 }}
      className={cn('relative [transform-style:preserve-3d]', className)}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          style={{ left: glareX, top: glareY }}
          className="pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
}
