'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';

/**
 * Route-level error boundary. Keeps the clinic reachable by phone and WhatsApp
 * even when the React tree has failed.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    // Replace with your error reporter (Sentry, etc.) when one is added.
    console.error('[error boundary]', error);
  }, [error]);

  return (
    <section className="bg-mist flex min-h-[70vh] items-center">
      <Container size="sm" className="py-20 text-center">
        <h1 className="text-plum-950 text-3xl sm:text-4xl">Something went wrong</h1>
        <p className="text-ink-soft mx-auto mt-4 max-w-md leading-relaxed">
          Sorry — this page failed to load. Please try again. If it keeps happening, call or
          WhatsApp the clinic and we will help you directly.
        </p>
        {error.digest && (
          <p className="text-ink-soft/50 mt-3 font-mono text-xs">Reference: {error.digest}</p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={reset} icon="arrow-right">
            Try again
          </Button>
          <Button
            href={siteConfig.whatsapp.href}
            size="lg"
            variant="whatsapp"
            icon="whatsapp"
            iconPosition="left"
            nudgeIcon={false}
          >
            WhatsApp us
          </Button>
          <Button
            href={siteConfig.contact.phoneHref}
            size="lg"
            variant="outline"
            icon="phone"
            iconPosition="left"
            nudgeIcon={false}
          >
            {siteConfig.contact.phoneDisplay}
          </Button>
        </div>
      </Container>
    </section>
  );
}
