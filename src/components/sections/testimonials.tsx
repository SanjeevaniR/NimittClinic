import { Icon } from '@/components/icons';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { testimonials } from '@/content/site-content';

function Stars({ rating }: { readonly rating: number }) {
  return (
    <p className="flex gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name="star"
          size={14}
          className={i < rating ? 'text-gold-400' : 'text-plum-600'}
        />
      ))}
    </p>
  );
}

/**
 * Patient testimonials as speech bubbles on the plum field, matching the
 * design. Horizontally scrollable on small screens, a 3-up grid above `md`.
 */
export function Testimonials() {
  return (
    <Section tone="plum" spacing="md" id="testimonials">
      <div aria-hidden className="bg-dot-grid absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="bg-gold-600/15 absolute -top-24 right-1/4 size-96 rounded-full blur-[120px]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="In their words"
          title="Patient Testimonials"
          description="What patients say about being listened to, being explained to, and getting better."
          tone="light"
        />

        <StaggerGroup
          as="ul"
          className="scrollbar-plum mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 lg:mt-14 lg:gap-6"
          stagger={0.13}
        >
          {testimonials.map((testimonial) => (
            <StaggerItem
              as="li"
              key={testimonial.author}
              className="min-w-[82%] snap-center sm:min-w-[60%] md:min-w-0"
            >
              <figure className="group flex h-full flex-col">
                {/* Bubble */}
                <blockquote className="glass-plum rounded-card relative flex-1 p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
                  <Icon
                    name="quote"
                    size={30}
                    className="text-gold-400/35 group-hover:text-gold-400/60 mb-3 transition-colors duration-500"
                  />
                  <p className="text-plum-50/90 text-sm leading-relaxed">
                    {testimonial.quote}
                  </p>

                  {/* Bubble tail */}
                  <span
                    aria-hidden
                    className="absolute -bottom-[9px] left-9 size-5 rotate-45 bg-white/8 shadow-[inset_-1px_-1px_0_0_rgb(255_255_255/0.14)] backdrop-blur-md"
                  />
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 pl-2">
                  <span className="bg-gold-sweep text-plum-950 font-display grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold">
                    {testimonial.author.slice(0, 1)}
                  </span>
                  <span className="min-w-0">
                    <span className="text-cream block text-sm font-bold">
                      {testimonial.author}
                    </span>
                    <span className="text-plum-200/70 block text-xs">
                      {testimonial.context}
                    </span>
                  </span>
                  <span className="ml-auto">
                    <Stars rating={testimonial.rating} />
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="text-plum-300/50 mt-8 text-center text-xs md:hidden">
          Swipe to read more →
        </p>
      </Container>
    </Section>
  );
}
