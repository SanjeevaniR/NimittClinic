import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icons';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { EmergencyCta } from '@/components/sections/emergency-cta';
import { PageHero } from '@/components/sections/page-hero';
import { JsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { DoctorAvatar } from '@/components/ui/doctor-avatar';
import { doctors } from '@/content/doctors';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd, doctorJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Our Doctors',
  description: `Meet the specialists at ${siteConfig.name}, ${siteConfig.address.city} — Dr. Sapna Chauhan (Obstetrics & Gynaecology) and Dr. Manoj Kumar PK (Internal Medicine).`,
  path: '/doctors',
  keywords: [
    `best gynaecologist in ${siteConfig.address.city}`,
    `internal medicine specialist ${siteConfig.address.city}`,
    'Dr. Sapna Chauhan',
    'Dr. Manoj Kumar PK',
  ],
});

export default function DoctorsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Doctors', path: '/doctors' },
        ])}
      />
      {doctors.map((doctor) => (
        <JsonLd key={doctor.slug} data={doctorJsonLd(doctor)} />
      ))}

      <PageHero
        eyebrow="Board-certified specialists"
        title="Our Doctors"
        description="Two consultants whose specialities complement each other, practising in the same clinic — which is why your obstetric and medical care never pull in different directions."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Doctors', path: '/doctors' },
        ]}
      />

      <Section tone="cream" spacing="md">
        <Container>
          <StaggerGroup as="ul" className="flex flex-col gap-8 lg:gap-10" stagger={0.15}>
            {doctors.map((doctor, index) => (
              <StaggerItem as="li" key={doctor.slug}>
                <article className="rounded-card border-plum-100 grid gap-0 overflow-hidden border bg-white shadow-soft lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                  {/* --- Portrait panel --- */}
                  <div
                    className={`from-plum-800 via-plum-900 to-plum-950 relative flex items-center justify-center bg-gradient-to-br p-8 ${
                      index % 2 === 1 ? 'lg:order-2' : ''
                    }`}
                  >
                    <div aria-hidden className="bg-dot-grid absolute inset-0 opacity-40" />
                    <div
                      aria-hidden
                      className="bg-gold-500/20 absolute -top-10 -right-10 size-48 rounded-full blur-3xl"
                    />

                    <div className="relative text-center">
                      <div className="relative inline-block">
                        <span
                          aria-hidden
                          className="from-gold-300 via-gold-500 to-gold-700 absolute -inset-1.5 rounded-full bg-gradient-to-br opacity-85"
                        />
                        <DoctorAvatar
                          src={doctor.photo}
                          alt={doctor.photoAlt}
                          name={doctor.name}
                          size={184}
                          sizes="184px"
                          priority={index === 0}
                          className="border-plum-900 relative size-[184px] border-4"
                        />
                      </div>

                      <h2 className="font-display text-cream mt-6 text-2xl font-bold">
                        {doctor.name}
                      </h2>
                      <p className="text-gold-300 mt-1.5 text-sm font-semibold">
                        {doctor.specialty}
                      </p>
                      <p className="text-plum-200/70 mt-1 text-xs">{doctor.qualifications}</p>

                      <dl className="border-plum-700/50 mt-6 grid grid-cols-2 gap-4 border-t pt-5 text-left">
                        <div>
                          <dt className="text-gold-400/80 text-[0.65rem] font-bold tracking-[0.12em] uppercase">
                            Experience
                          </dt>
                          <dd className="text-plum-50 mt-1 text-sm font-semibold">
                            {doctor.yearsExperience}+ years
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gold-400/80 text-[0.65rem] font-bold tracking-[0.12em] uppercase">
                            Languages
                          </dt>
                          <dd className="text-plum-50 mt-1 text-sm font-semibold">
                            {doctor.languages.join(', ')}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* --- Detail panel --- */}
                  <div className="p-7 sm:p-9">
                    <h3 className="font-display text-plum-950 text-xl font-bold">
                      {doctor.headline}
                    </h3>
                    <p className="text-ink-soft mt-3 leading-relaxed">{doctor.summary}</p>

                    <h4 className="text-gold-700 mt-7 text-xs font-bold tracking-[0.14em] uppercase">
                      Areas of expertise
                    </h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {doctor.expertise.slice(0, 8).map((item) => (
                        <li
                          key={item}
                          className="rounded-pill bg-plum-50 text-plum-800 px-3 py-1.5 text-xs font-medium"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="border-plum-100 mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t pt-5">
                      <p className="text-ink-soft flex items-center gap-2 text-sm">
                        <Icon name="calendar" size={16} className="text-gold-600" />
                        {doctor.consultationDays}
                      </p>
                      <p className="text-ink-soft flex items-center gap-2 text-sm">
                        <Icon name="clock" size={16} className="text-gold-600" />
                        {doctor.consultationTime}
                      </p>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button href={`/doctors/${doctor.slug}`} icon="arrow-right">
                        Full profile
                      </Button>
                      <Button href={siteConfig.bookingHref} variant="outline" icon="calendar" nudgeIcon={false}>
                        Book with {doctor.name.split(' ')[1]}
                      </Button>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1} className="mt-10 text-center">
            <p className="text-ink-soft text-sm">
              Not sure who you should see?{' '}
              <Link href="/contact" className="text-plum-700 font-semibold underline">
                Tell us your concern
              </Link>{' '}
              and we will route you correctly.
            </p>
          </Reveal>
        </Container>
      </Section>

      <EmergencyCta />
    </>
  );
}
