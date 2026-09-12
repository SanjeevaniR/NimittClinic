'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin gold bar pinned under the header that tracks reading progress.
 * Purely decorative, so it is hidden from assistive technology.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="bg-gold-sweep fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    />
  );
}
