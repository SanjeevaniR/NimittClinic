import type { Metadata } from 'next';
import { Icon } from '@/components/icons';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { EmergencyCta } from '@/components/sections/emergency-cta';
import { FaqSection } from '@/components/sections/faq-section';
import { PageHero } from '@/components/sections/page-hero';
import { PatientJourney } from '@/components/sections/patient-journey';
import { JsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { emergencySigns } from '@/content/site-content';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Patient Care',
  description: `What to bring, what to expect and when to call urgently — practical guidance for patients of ${siteConfig.name}, ${siteConfig.address.city}.`,
  path: '/patient-care',
});

const firstVisit = [
  {
    icon: 'calendar' as const,
    title: 'Before you come',
    items: [
      'Book by phone or WhatsApp — mention the problem in one line so we allot enough time.',
      'Fasting is needed only if we tell you; ask when booking.',
      'For a gynaecology visit, note the first day of your last period.',
    ],
  },
  {
    icon: 'facility' as const,
    title: 'What to bring',
    items: [
      'All previous prescriptions, reports and scan films.',
      'A written list of every medicine and supplement you take, with doses.',
      'Photo ID, and your insurance card if you have one.',
      'Your antenatal card, if you are already pregnant.',
    ],
  },
  {
    icon: 'stethoscope' as const,
    title: 'During the consultation',
    items: [
      'History and examination first — investigations only where they change the plan.',
      'Ultrasound, where needed, is usually done in the same visit.',
      'Ask anything. If something is unclear, say so and we will explain it again.',
    ],
  },
  {
    icon: 'shield' as const,
    title: 'After your visit',
    items: [
      'You leave with a written prescription and a review date.',
      'Reports are explained when they arrive — we call you if anything needs action.',
      'For follow-up questions, WhatsApp the clinic during consultation hours.',
    ],
  },
];

const policies = [
  {
    title: 'Consultation fees',
    body: 'Fees are displayed at the front desk and quoted when you book. Clinic consultations are self-pay; hospital admissions, deliveries and surgery support cashless and reimbursement claims at our partner hospitals.',
  },
  {
    title: 'Your records',
    body: 'Records are kept digitally and are available to you on request. We do not share your clinical information with anyone outside your care without your consent.',
  },
  {
    title: 'Rescheduling',
    body: 'Let us know as early as you can and we will move your slot at no charge. That freed slot usually goes to someone who needs it urgently.',
  },
  {
    title: 'Accompanying persons',
    body: 'You are welcome to bring a family member into the consultation. For examinations, a female attendant is present for every gynaecological examination.',
  },
];

export default function PatientCarePage() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Patient Care', path: '/patient-care' },
        ])}
      />

      <PageHero
        eyebrow="Patient education"
        title="Patient Care & Guidance"
        description="Everything you need to know before, during and after your visit — plus the symptoms that should never wait for an appointment."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Patient Care', path: '/patient-care' },
        ]}
      >
        <Button href={siteConfig.bookingHref} size="lg" icon="calendar" nudgeIcon={false}>
          Book Appointment
        </Button>
      </PageHero>

      {/* --- First visit guide --- */}
      <Section tone="cream" spacing="md">
        <Container>
          <SectionHeading
            eyebrow="Come prepared"
            title="Your First Visit"
            description="Ten minutes of preparation saves a repeat trip. Here is exactly what helps."
          />

          <StaggerGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-2" stagger={0.11}>
            {firstVisit.map((block) => (
              <StaggerItem as="li" key={block.title} className="h-full">
                <div className="rounded-card border-plum-100 flex h-full flex-col border bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift sm:p-7">
                  <span className="bg-plum-50 text-plum-700 mb-5 grid size-12 place-items-center rounded-2xl">
                    <Icon name={block.icon} size={22} />
                  </span>
                  <h3 className="font-display text-plum-950 text-lg font-bold">
                    {block.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="text-ink-soft flex items-start gap-2.5 text-sm leading-relaxed"
                      >
                        <span className="bg-gold-sweep text-plum-950 mt-0.5 grid size-5 shrink-0 place-items-center rounded-full">
                          <Icon name="check" size={12} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      <PatientJourney />

      {/* --- Warning signs --- */}
      <Section tone="plum" spacing="md">
        <div aria-hidden className="bg-dot-grid absolute inset-0 opacity-40" />
        <Container className="relative">
          <SectionHeading
            tone="light"
            eyebrow="Do not wait"
            title="When to Call Us Urgently"
            description="If you have any of the following, call the clinic straight away — or go to the nearest emergency department and call us on the way. Do not book a routine appointment and do not wait for an email reply."
          />

          <StaggerGroup
            as="ul"
            className="mt-12 grid gap-3.5 sm:grid-cols-2"
            stagger={0.06}
          >
            {emergencySigns.map((sign) => (
              <StaggerItem as="li" key={sign}>
                <p className="glass-plum text-plum-50 flex items-start gap-3 rounded-2xl p-4 text-sm leading-relaxed">
                  <Icon name="alert" size={18} className="text-gold-400 mt-0.5 shrink-0" />
                  {sign}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.15} className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              href={siteConfig.contact.phoneHref}
              size="lg"
              icon="phone"
              iconPosition="left"
              nudgeIcon={false}
            >
              Call {siteConfig.contact.phoneDisplay}
            </Button>
            <Button
              href={siteConfig.whatsapp.href}
              size="lg"
              variant="whatsapp"
              icon="whatsapp"
              iconPosition="left"
              nudgeIcon={false}
            >
              WhatsApp the clinic
            </Button>
          </Reveal>

          <p className="text-plum-300/60 mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed">
            This list is guidance, not a diagnosis, and it is not exhaustive. If something
            feels seriously wrong, seek medical attention immediately — trust that instinct
            over any website.
          </p>
        </Container>
      </Section>

      {/* --- Policies --- */}
      <Section tone="cream" spacing="md">
        <Container size="lg">
          <SectionHeading
            eyebrow="Clinic policies"
            title="Fees, Records & Practicalities"
          />
          <StaggerGroup as="ul" className="mt-11 grid gap-5 sm:grid-cols-2" stagger={0.1}>
            {policies.map((policy) => (
              <StaggerItem as="li" key={policy.title} className="h-full">
                <div className="rounded-card border-plum-100 h-full border bg-white p-6 shadow-soft">
                  <h3 className="font-display text-plum-950 text-base font-bold">
                    {policy.title}
                  </h3>
                  <p className="text-ink-soft mt-2 text-sm leading-relaxed">{policy.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      <FaqSection tone="mist" />
      <EmergencyCta />
    </>
  );
}
