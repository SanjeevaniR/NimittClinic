import type { Metadata } from 'next';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { primaryNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="from-plum-950 via-plum-900 to-plum-800 relative isolate flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-br">
      <div aria-hidden className="bg-dot-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="bg-gold-500/20 animate-blob absolute top-1/4 right-1/4 size-80 rounded-full blur-[110px]"
      />

      <Container size="md" className="relative py-20 text-center">
        <p className="font-display text-gradient-gold text-7xl font-extrabold sm:text-8xl">
          404
        </p>
        <h1 className="text-cream mt-4 text-3xl sm:text-4xl">This page has moved on</h1>
        <p className="text-plum-100/85 mx-auto mt-4 max-w-lg leading-relaxed">
          The page you were looking for is not here. It may have been renamed, or the link
          you followed might be out of date. Everything else is still where it should be.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg" icon="arrow-right">
            Back to home
          </Button>
          <Button
            href={siteConfig.contact.phoneHref}
            size="lg"
            variant="white"
            icon="phone"
            iconPosition="left"
            nudgeIcon={false}
          >
            Call the clinic
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {primaryNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="glass-plum rounded-pill text-plum-100 hover:text-gold-200 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                  <Icon name="arrow-up-right" size={13} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
