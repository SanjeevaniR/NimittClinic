import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/contact-form';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/motion/reveal';
import { LocationSection } from '@/components/sections/location-section';
import { PageHero } from '@/components/sections/page-hero';
import { JsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact & Appointments',
  description: `Book an appointment at ${siteConfig.name}, ${siteConfig.address.city}. Call, WhatsApp or send us a message — we reply during consultation hours.`,
  path: '/contact',
  keywords: [
    `book appointment gynaecologist ${siteConfig.address.city}`,
    `${siteConfig.name} contact`,
    `clinic appointment ${siteConfig.address.city}`,
  ],
});

const quickActions = [
  {
    icon: 'phone' as const,
    title: 'Call the clinic',
    body: 'Fastest for same-day appointments and urgent questions.',
    cta: siteConfig.contact.phoneDisplay,
    href: siteConfig.contact.phoneHref,
    variant: 'plum' as const,
  },
  {
    icon: 'whatsapp' as const,
    title: 'WhatsApp us',
    body: 'Send your query, a report photo, or ask for the next free slot.',
    cta: 'Open WhatsApp',
    href: siteConfig.whatsapp.href,
    variant: 'whatsapp' as const,
  },
  {
    icon: 'mail' as const,
    title: 'Email',
    body: 'For non-urgent enquiries, records and administrative matters.',
    cta: siteConfig.contact.email,
    href: siteConfig.contact.emailHref,
    variant: 'outline' as const,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <PageHero
        eyebrow="Secure & confidential"
        title="Book an Appointment"
        description="Tell us what is going on in a line or two and we will route you to the right doctor with the earliest available slot. Urgent cases are always accommodated."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            href={siteConfig.contact.phoneHref}
            icon="phone"
            iconPosition="left"
            nudgeIcon={false}
            size="lg"
          >
            {siteConfig.contact.phoneDisplay}
          </Button>
          <Button
            href={siteConfig.whatsapp.href}
            variant="whatsapp"
            icon="whatsapp"
            iconPosition="left"
            nudgeIcon={false}
            size="lg"
          >
            WhatsApp Us
          </Button>
        </div>
      </PageHero>

      {/* --- Quick actions --- */}
      <Section tone="cream" spacing="sm">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {quickActions.map((action, index) => (
              <Reveal as="li" key={action.title} delay={index * 0.08}>
                <div className="rounded-card border-plum-100 flex h-full flex-col border bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <span className="bg-plum-50 text-plum-700 mb-4 grid size-12 place-items-center rounded-2xl">
                    <Icon name={action.icon} size={22} />
                  </span>
                  <h2 className="font-display text-plum-950 text-lg font-bold">
                    {action.title}
                  </h2>
                  <p className="text-ink-soft mt-2 flex-1 text-sm leading-relaxed">
                    {action.body}
                  </p>
                  <Button
                    href={action.href}
                    variant={action.variant}
                    size="sm"
                    className="mt-5 self-start"
                    icon="arrow-up-right"
                    nudgeIcon={false}
                  >
                    {action.cta}
                  </Button>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* --- Form --- */}
      <Section tone="mist" spacing="md" id="appointment">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
            <Reveal>
              <h2 className="text-section text-plum-950">
                Prefer to <span className="text-gradient-gold">write to us?</span>
              </h2>
              <p className="text-ink-soft mt-4 leading-relaxed">
                Fill in the form and it lands in the clinic inbox straight away. The front
                desk works through enquiries during consultation hours and will call you
                back on the number you give us.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  'Your details go only to the clinic — never to a third party.',
                  'We usually respond the same working day.',
                  'For anything urgent, please call instead of writing.',
                  'Do not send detailed medical history or reports by email.',
                ].map((point) => (
                  <li key={point} className="text-ink-soft flex gap-3 text-sm leading-relaxed">
                    <span className="bg-gold-sweep text-plum-950 mt-0.5 grid size-5 shrink-0 place-items-center rounded-full">
                      <Icon name="check" size={12} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="rounded-card from-plum-800 to-plum-950 mt-8 bg-gradient-to-br p-5">
                <h3 className="text-gold-300 flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase">
                  <Icon name="clock" size={15} />
                  Consultation Hours
                </h3>
                <ul className="mt-3 space-y-2">
                  {siteConfig.hours.map((slot) => (
                    <li
                      key={slot.days}
                      className="text-plum-100/85 flex flex-wrap justify-between gap-x-4 text-sm"
                    >
                      <span className="font-semibold text-white">{slot.days}</span>
                      <span>{slot.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      <LocationSection tone="cream" />
    </>
  );
}
