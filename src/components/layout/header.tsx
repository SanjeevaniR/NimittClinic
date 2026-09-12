'use client';

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Logo } from '@/components/ui/logo';
import { isNavItemActive, primaryNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

/**
 * Sticky header.
 *
 * Two states: transparent over the hero, then a frosted white bar with a
 * shadow once the page has scrolled past ~40px. The active nav item carries an
 * animated gold underline that slides between items via a shared layoutId.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  // Close the drawer on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll and allow Escape to dismiss while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        scrolled
          ? 'border-plum-100/70 border-b bg-white/85 py-2 shadow-[0_4px_24px_-12px_rgb(43_10_49/0.28)] backdrop-blur-xl'
          : 'border-b border-transparent py-4',
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        <Logo tone="dark" />

        {/* ---------- Desktop navigation ---------- */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = isNavItemActive(item, pathname);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-pill relative block px-3.5 py-2 text-sm font-semibold transition-colors duration-200',
                      active ? 'text-plum-800' : 'text-ink-soft hover:text-plum-700',
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        aria-hidden
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="bg-gold-sweep absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ---------- Right-hand actions ---------- */}
        <div className="flex items-center gap-2">
          <a
            href={siteConfig.contact.phoneHref}
            className="text-plum-800 hover:bg-plum-50 hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors md:inline-flex"
          >
            <Icon name="phone" size={16} className="text-gold-600" />
            <span className="hidden xl:inline">{siteConfig.contact.phoneDisplay}</span>
            <span className="xl:hidden">Call</span>
          </a>

          <Button href={siteConfig.bookingHref} size="sm" className="hidden sm:inline-flex">
            Online Booking
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            // Only reference the panel while it is actually in the DOM.
            aria-controls={menuOpen ? 'mobile-menu' : undefined}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="text-plum-900 hover:bg-plum-50 grid size-11 place-items-center rounded-full transition-colors lg:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </Container>

      {/* ---------- Mobile drawer ---------- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              // `inset-0` (not `top-full`): on a fixed element inside the
              // blurred header, `top:100%` + `bottom:0` collapses to zero
              // height and the tap-to-dismiss target disappears.
              className="bg-plum-950/45 fixed inset-0 -z-10 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              key="drawer"
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="border-plum-100 absolute inset-x-0 top-full border-t bg-white shadow-lift lg:hidden"
            >
              <Container className="py-4">
                <ul className="flex flex-col">
                  {primaryNav.map((item, index) => {
                    const active = isNavItemActive(item, pathname);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * index + 0.06, duration: 0.35 }}
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'border-plum-50 flex items-center justify-between border-b py-3.5 text-base font-semibold transition-colors',
                            active ? 'text-plum-800' : 'text-ink hover:text-plum-700',
                          )}
                        >
                          {item.label}
                          <Icon
                            name="arrow-right"
                            size={16}
                            className={active ? 'text-gold-600' : 'text-plum-300'}
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="mt-5 flex flex-col gap-2.5">
                  <Button href={siteConfig.bookingHref} fullWidth onClick={closeMenu}>
                    Book Appointment
                  </Button>
                  <Button
                    href={siteConfig.whatsapp.href}
                    variant="whatsapp"
                    icon="whatsapp"
                    iconPosition="left"
                    nudgeIcon={false}
                    fullWidth
                  >
                    Chat on WhatsApp
                  </Button>
                  <Button
                    href={siteConfig.contact.phoneHref}
                    variant="outline"
                    icon="phone"
                    iconPosition="left"
                    nudgeIcon={false}
                    fullWidth
                  >
                    {siteConfig.contact.phoneDisplay}
                  </Button>
                </div>
              </Container>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
