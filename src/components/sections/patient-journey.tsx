import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { patientJourney } from '@/content/site-content';

/** Four-step "what happens when you visit" timeline. */
export function PatientJourney() {
  return (
    <Section tone="cream" spacing="md" id="journey">
      <Container>
        <SectionHeading
          eyebrow="No stress, no guesswork"
          title="What Your Visit Looks Like"
          description="Four steps, start to finish. You should never have to wonder what happens next."
        />

        <div className="relative mt-12 lg:mt-16">
          {/* Connecting rule behind the cards on wide screens */}
          <Reveal
            direction="none"
            className="via-gold-400/60 absolute inset-x-0 top-9 hidden h-px bg-gradient-to-r from-transparent to-transparent lg:block"
          >
            <span className="sr-only" />
          </Reveal>

          <StaggerGroup
            as="ol"
            className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            stagger={0.13}
          >
            {patientJourney.map((step) => (
              <StaggerItem as="li" key={step.step} className="group relative">
                <span className="font-display bg-gold-sweep text-plum-950 relative z-10 grid size-[4.5rem] place-items-center rounded-full text-xl font-extrabold shadow-gold transition-transform duration-500 group-hover:scale-110">
                  {step.step}
                </span>
                <h3 className="font-display text-plum-950 mt-5 text-lg font-bold">
                  {step.title}
                </h3>
                <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                  {step.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </Section>
  );
}
