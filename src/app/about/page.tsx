import type { Metadata } from 'next';
import { Icon } from '@/components/icons';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { DoctorsPreview } from '@/components/sections/doctors-preview';
import { LocationSection } from '@/components/sections/location-section';
import { PageHero } from '@/components/sections/page-hero';
import { PatientJourney } from '@/components/sections/patient-journey';
import { StatsBand } from '@/components/sections/stats-band';
import { JsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { features } from '@/content/site-content';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description: `${siteConfig.name} in ${siteConfig.address.city} brings obstetrics, gynaecology and internal medicine together in one clinic, with unhurried consultations and care that is explained, not just prescribed.`,
  path: '/about',
});

const values = [
  {
    icon: 'care' as const,
    title: 'We explain before we treat',
    body: 'A patient who understands their diagnosis takes their treatment properly. So we spend the time on the explanation, every visit, however routine the problem looks to us.',
  },
  {
    icon: 'shield' as const,
    title: 'The minimum effective intervention',
    body: 'Tests are ordered when they will change the plan. Medicines are prescribed when they will help. Surgery is recommended when the alternatives have genuinely been considered.',
  },
  {
    icon: 'stethoscope' as const,
    title: 'Two specialities, one plan',
    body: 'Gynaecology and internal medicine practising together means a pregnancy with diabetes, or surgery in a hypertensive patient, is managed by both doctors at once — not passed back and forth.',
  },
  {
    icon: 'clock' as const,
    title: 'Your time is worth something',
    body: 'Appointments are spaced so consultations are not rushed and waiting is short. If we are running late, the front desk tells you before you leave home.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ])}
      />

      <PageHero
        eyebrow="Your health, our priority"
        title="We Care Like Family"
        description={`${siteConfig.name} was set up around a simple idea: a clinic where women's health and adult medicine sit side by side, and where nobody leaves a consultation still wondering what is wrong with them.`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      >
        <Button href="/doctors" size="lg" icon="arrow-right">
          Meet Our Doctors
        </Button>
      </PageHero>

      {/* --- Story --- */}
      <Section tone="cream" spacing="md">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <h2 className="text-section text-plum-950">
                A clinic built around{' '}
                <span className="text-gradient-gold">how care should work</span>
              </h2>
              <div className="text-ink-soft mt-6 space-y-4 leading-relaxed">
                <p>
                  Most patients in {siteConfig.address.city} know the routine: a rushed
                  consultation, a prescription slid across the desk, and no clear answer to
                  the only question that mattered — what is actually wrong, and what happens
                  next.
                </p>
                <p>
                  Nimitt exists to do the opposite. Dr. Sapna Chauhan handles obstetrics and
                  gynaecology; Dr. Manoj Kumar PK handles internal medicine. Between them
                  they cover pregnancy and delivery, gynaecological surgery, diabetes and
                  blood pressure, thyroid disease, infections and preventive health — with
                  in-house ultrasound and sample collection, so most visits are settled in
                  one trip.
                </p>
                <p>
                  Because both doctors practise in the same rooms, the cases that usually
                  fall between specialities are the ones we handle best: a pregnancy
                  complicated by gestational diabetes, a surgery in a patient whose blood
                  pressure needs optimising first, a woman whose fatigue turns out to be
                  thyroid rather than gynaecological.
                </p>
              </div>
            </Reveal>

            <StaggerGroup as="ul" className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
              {values.map((value) => (
                <StaggerItem as="li" key={value.title} className="h-full">
                  <div className="rounded-card border-plum-100 group flex h-full flex-col border bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                    <span className="bg-plum-50 text-plum-700 group-hover:bg-gold-sweep group-hover:text-plum-950 mb-4 grid size-12 place-items-center rounded-2xl transition-all duration-500 group-hover:scale-110">
                      <Icon name={value.icon} size={22} />
                    </span>
                    <h3 className="font-display text-plum-950 text-base font-bold">
                      {value.title}
                    </h3>
                    <p className="text-ink-soft mt-2 text-sm leading-relaxed">{value.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </Section>

      <StatsBand />

      {/* --- What we offer --- */}
      <Section tone="mist" spacing="md">
        <Container>
          <SectionHeading
            eyebrow="Our commitment to you"
            title="What You Can Expect"
            description="Four things we hold ourselves to, on every visit."
          />

          <StaggerGroup
            as="ul"
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.1}
          >
            {features.map((feature) => (
              <StaggerItem as="li" key={feature.title} className="h-full">
                <div className="rounded-card flex h-full flex-col border border-white bg-white p-6 shadow-soft">
                  <span className="bg-gold-sweep text-plum-950 mb-4 grid size-12 place-items-center rounded-2xl">
                    <Icon name={feature.icon} size={22} />
                  </span>
                  <h3 className="font-display text-plum-950 text-base font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      <DoctorsPreview />
      <PatientJourney />
      <LocationSection tone="mist" />
    </>
  );
}
