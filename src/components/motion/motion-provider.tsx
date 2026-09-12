'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * `reducedMotion="user"` makes every Framer Motion animation in the tree
 * honour the OS "reduce motion" setting: transforms and opacity changes are
 * skipped, layout still settles correctly.
 */
export function MotionProvider({ children }: { readonly children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
