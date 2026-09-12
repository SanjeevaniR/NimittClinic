import { Icon } from '@/components/icons';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { features } from '@/content/site-content';
import { siteConfig } from '@/config/site';

/** "Why Choose Nimitt?" — four differentiator cards. */
export function WhyChoose() {
  return (
    <Section tone="cream" spacing="md" id="why-choose">
      {/* Faint plum wash behind the grid */}
      <div
        aria-hidden
        className="from-plum-50/70 pointer-events-none absolute inset-x-0 top-1/3 h-2/3 bg-gradient-to-b to-transparent"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Why patients stay with us"
          title={
            <>
              Why Choose <span className="text-gradient-gold">{siteConfig.shortName}</span>?
            </>
          }
          description="Specialist expertise, modern facilities and the kind of attention that is getting harder to find — in one clinic, for your whole family’s adult and women’s health needs."
        />

        <StaggerGroup
          as="ul"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6"
          stagger={0.11}
        >
          {features.map((feature) => (
            <StaggerItem as="li" key={feature.title} className="h-full">
              <article className="rounded-card group border-plum-100 relative flex h-full flex-col items-center overflow-hidden border bg-white p-6 text-center shadow-soft transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-transparent hover:shadow-lift lg:p-7">
                {/* Plum wash that rises in on hover */}
                <span
                  aria-hidden
                  className="from-plum-900 to-plum-700 absolute inset-0 translate-y-full bg-gradient-to-br transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                />

                <span className="relative mb-5 grid size-16 place-items-center">
                  <span
                    aria-hidden
                    className="bg-plum-50 group-hover:bg-gold-500/20 absolute inset-0 rounded-2xl rotate-6 transition-all duration-500 group-hover:rotate-[14deg]"
                  />
                  <Icon
                    name={feature.icon}
                    size={30}
                    className="text-plum-700 group-hover:text-gold-300 relative transition-colors duration-500"
                  />
                </span>

                <h3 className="font-display text-plum-950 relative text-lg font-bold transition-colors duration-500 group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="text-ink-soft group-hover:text-plum-100/90 relative mt-2.5 text-sm leading-relaxed transition-colors duration-500">
                  {feature.description}
                </p>

                {/* Gold rule that draws itself under the card on hover */}
                <span
                  aria-hidden
                  className="bg-gold-sweep absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 ease-out group-hover:w-full"
                />
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
