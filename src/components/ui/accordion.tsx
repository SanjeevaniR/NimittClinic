'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@/components/icons';
import type { Faq } from '@/content/types';
import { cn } from '@/lib/utils';

/**
 * FAQ accordion. Uses buttons with `aria-expanded`/`aria-controls` rather than
 * <details> so the open/close height can be animated.
 */
export function Accordion({ items, className }: { readonly items: readonly Faq[]; readonly className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn('divide-plum-100 divide-y', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                // The panel is unmounted when closed, so only point at it
                // while the id actually exists.
                aria-controls={isOpen ? panelId : undefined}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span
                  className={cn(
                    'font-display text-base font-semibold transition-colors sm:text-lg',
                    isOpen ? 'text-plum-700' : 'text-plum-950 group-hover:text-plum-700',
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    'grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300',
                    isOpen
                      ? 'bg-gold-sweep text-plum-950 rotate-180'
                      : 'bg-plum-50 text-plum-600 group-hover:bg-plum-100',
                  )}
                >
                  <Icon name="chevron-down" size={16} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-ink-soft pr-12 pb-6 leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
