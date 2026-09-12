import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/section-heading';

export interface Crumb {
  readonly name: string;
  readonly path: string;
}

interface PageHeroProps {
  readonly eyebrow?: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly breadcrumbs: readonly Crumb[];
  readonly children?: ReactNode;
}

/** Compact plum banner used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: PageHeroProps) {
  return (
    <section className="from-plum-950 via-plum-900 to-plum-800 relative isolate overflow-hidden bg-gradient-to-br">
      <div aria-hidden className="bg-dot-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="bg-gold-500/20 animate-blob absolute -top-20 right-0 size-80 rounded-full blur-[100px]"
      />
      <div
        aria-hidden
        className="bg-plum-500/25 animate-float-slow absolute -bottom-24 left-1/4 size-72 rounded-full blur-[100px]"
      />

      <Container className="relative py-14 sm:py-16 lg:py-20">
        {/* Breadcrumbs */}
        <Reveal duration={0.5}>
          <nav aria-label="Breadcrumb">
            <ol className="text-plum-200/70 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.path} className="flex items-center gap-1.5">
                    {index > 0 && (
                      <Icon name="chevron-down" size={12} className="-rotate-90 opacity-50" />
                    )}
                    {isLast ? (
                      <span aria-current="page" className="text-gold-300 font-semibold">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        href={crumb.path}
                        className="hover:text-gold-300 transition-colors"
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </Reveal>

        <div className="mt-6 max-w-3xl">
          {eyebrow && (
            <Reveal duration={0.5} delay={0.05}>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <h1 className="text-cream mt-4 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              {title}
            </h1>
          </Reveal>

          {description && (
            <Reveal delay={0.18}>
              <p className="text-plum-100/85 mt-5 text-base leading-relaxed sm:text-lg">
                {description}
              </p>
            </Reveal>
          )}

          {children && (
            <Reveal delay={0.26} className="mt-8">
              {children}
            </Reveal>
          )}
        </div>
      </Container>

      <div
        aria-hidden
        className="from-cream absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t to-transparent"
      />
    </section>
  );
}
