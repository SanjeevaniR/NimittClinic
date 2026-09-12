import Link from 'next/link';
import { Icon } from '@/components/icons';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { services } from '@/content/services';
import { cn } from '@/lib/utils';

interface ServicesSectionProps {
  /** Show every service, or only the first N on the homepage. */
  readonly limit?: number;
  readonly showCta?: boolean;
  readonly tone?: 'cream' | 'mist';
}

/**
 * Service grid — numbered plum cards with an icon medallion, matching the
 * card treatment in the design.
 */
export function ServicesSection({
  limit,
  showCta = true,
  tone = 'cream',
}: ServicesSectionProps) {
  const items = typeof limit === 'number' ? services.slice(0, limit) : services;

  return (
    <Section tone={tone} spacing="md" id="services">
      <Container className="relative">
        <SectionHeading
          eyebrow="Where care meets precision"
          title="Our Services"
          description="From a first pregnancy scan to long-term diabetes control — comprehensive care, delivered by the doctor who is actually qualified for it."
        />

        <StaggerGroup
          as="ul"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6"
          stagger={0.1}
        >
          {items.map((service, index) => (
            <StaggerItem as="li" key={service.slug} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className="rounded-card group block h-full focus-visible:outline-none"
              >
                <article
                  className={cn(
                    'rounded-card from-plum-700 via-plum-800 to-plum-950 relative flex h-full flex-col overflow-hidden bg-gradient-to-br p-6 shadow-lift',
                    'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2',
                  )}
                >
                  {/* Ordinal watermark */}
                  <span
                    aria-hidden
                    className="font-display text-gold-400/15 absolute -top-3 right-3 text-6xl font-extrabold transition-all duration-500 group-hover:text-gold-400/25"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Gold glow that blooms from the corner */}
                  <span
                    aria-hidden
                    className="bg-gold-500/25 absolute -right-10 -bottom-10 size-32 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span className="bg-plum-500/30 group-hover:bg-gold-500 group-hover:text-plum-950 text-gold-300 relative mb-5 grid size-14 place-items-center rounded-2xl transition-all duration-500 group-hover:scale-110">
                    <Icon name={service.icon} size={28} />
                  </span>

                  <h3 className="font-display text-cream relative text-lg leading-snug font-bold">
                    {service.shortTitle}
                  </h3>
                  <p className="text-plum-100/75 relative mt-2.5 flex-1 text-sm leading-relaxed">
                    {service.excerpt}
                  </p>

                  <span className="text-gold-300 relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Learn more
                    <Icon
                      name="arrow-right"
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {showCta && (
          <Reveal delay={0.15} className="mt-11 flex justify-center">
            <Button href="/services" variant="outline" size="lg" icon="arrow-right">
              Explore All Services
            </Button>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
