'use client';

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@/components/icons';
import { siteConfig } from '@/config/site';

/**
 * Floating WhatsApp action.
 *
 * Deep-links to the clinic's WhatsApp Business number via wa.me with a
 * prefilled message, which opens the native app on mobile, the desktop app if
 * installed, and WhatsApp Web otherwise. Appears after the hero so it never
 * covers the hero CTA on first paint.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 380);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
        >
          <a
            href={siteConfig.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
            className="group relative flex items-center gap-3"
          >
            {/* Expanding label — animates open on hover/focus. */}
            <AnimatePresence>
              {hovered && (
                <motion.span
                  initial={{ opacity: 0, x: 12, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: 12, width: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-plum-950 rounded-pill hidden overflow-hidden px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-lift sm:block"
                >
                  Chat with us on WhatsApp
                </motion.span>
              )}
            </AnimatePresence>

            <span className="relative grid size-14 place-items-center">
              {/* Pulse rings */}
              <span
                aria-hidden
                className="animate-pulse-ring absolute inset-0 rounded-full bg-[#25D366]/45"
              />
              <span
                aria-hidden
                className="animate-pulse-ring absolute inset-0 rounded-full bg-[#25D366]/30 [animation-delay:1.2s]"
              />
              <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.75)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                <Icon name="whatsapp" size={30} />
              </span>
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
