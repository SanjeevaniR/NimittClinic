import { Reveal } from '@/components/motion/reveal';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { faqs } from '@/content/site-content';
import type { Faq } from '@/content/types';
import { siteConfig } from '@/config/site';

interface FaqSectionProps {
  readonly items?: readonly Faq[];
  readonly tone?: 'cream' | 'mist';
}

export function FaqSection({ items = faqs, tone = 'mist' }: FaqSectionProps) {
  return (
    <Section tone={tone} spacing="md" id="faq">
      <Container size="lg">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Good to know"
              title="Frequently Asked Questions"
              description="The things patients ask us on the phone every week. If yours is not here, message us on WhatsApp — we answer during clinic hours."
            />

            <Reveal delay={0.2} className="mt-7">
              <Button
                href={siteConfig.whatsapp.href}
                variant="whatsapp"
                icon="whatsapp"
                iconPosition="left"
                nudgeIcon={false}
              >
                Ask us on WhatsApp
              </Button>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <div className="rounded-card border-plum-100 border bg-white px-6 py-2 shadow-soft sm:px-8">
              <Accordion items={items} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
