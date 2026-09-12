import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/icons';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { EmergencyCta } from '@/components/sections/emergency-cta';
import { PageHero } from '@/components/sections/page-hero';
import { JsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { DoctorAvatar } from '@/components/ui/doctor-avatar';
import { doctors, getDoctorBySlug } from '@/content/doctors';
import { getServicesForDoctor } from '@/content/services';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd, doctorJsonLd, pageMetadata } from '@/lib/seo';

interface PageParams {
  readonly params: Promise<{ readonly slug: string }>;
}

/** Statically pre-render both doctor pages at build time. */
export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) return { title: 'Doctor not found' };

  return pageMetadata({
    title: `${doctor.name} — ${doctor.specialty}`,
    description: doctor.summary,
    path: `/doctors/${doctor.slug}`,
    type: 'profile',
    keywords: [
      doctor.name,
      `${doctor.specialty} ${siteConfig.address.city}`,
      ...doctor.expertise.slice(0, 5),
    ],
  });
}

export default async function DoctorPage({ params }: PageParams) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) notFound();

  const doctorServices = getServicesForDoctor(doctor.slug);
  const colleague = doctors.find((d) => d.slug !== doctor.slug);

  return (
    <>
      <JsonLd data={doctorJsonLd(doctor)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Doctors', path: '/doctors' },
          { name: doctor.name, path: `/doctors/${doctor.slug}` },
        ])}
      />

      <PageHero
        eyebrow={doctor.specialty}
        title={doctor.name}
        description={doctor.summary}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Doctors', path: '/doctors' },
          { name: doctor.name, path: `/doctors/${doctor.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={siteConfig.bookingHref} size="lg" icon="calendar" nudgeIcon={false}>
            Book Appointment
          </Button>
          <Button
            href={siteConfig.whatsapp.href}
            size="lg"
            variant="whatsapp"
            icon="whatsapp"
            iconPosition="left"
            nudgeIcon={false}
          >
            WhatsApp
          </Button>
        </div>
      </PageHero>

      {/* --- Bio + sidebar --- */}
      <Section tone="cream" spacing="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-12">
            <div>
              <Reveal>
                <h2 className="text-section text-plum-950">{doctor.headline}</h2>
              </Reveal>

              <div className="mt-6 space-y-5">
                {doctor.bio.map((paragraph, index) => (
                  <Reveal key={index} delay={0.06 * index}>
                    <p className="text-ink-soft leading-relaxed">{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              {/* Credentials */}
              <h3 className="font-display text-plum-950 mt-12 text-2xl font-bold">
                Qualifications & Training
              </h3>
              <StaggerGroup as="ul" className="mt-6 space-y-4" stagger={0.09}>
                {doctor.credentials.map((credential) => (
                  <StaggerItem as="li" key={credential.abbr}>
                    <div className="rounded-card border-plum-100 group flex gap-4 border bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                      <span className="bg-plum-50 text-plum-700 group-hover:bg-gold-sweep group-hover:text-plum-950 grid size-11 shrink-0 place-items-center rounded-xl transition-all duration-500">
                        <Icon name="shield" size={20} />
                      </span>
                      <div>
                        <p className="font-display text-plum-950 font-bold">
                          {credential.abbr}
                        </p>
                        <p className="text-gold-700 mt-0.5 text-sm font-semibold">
                          {credential.title}
                        </p>
                        <p className="text-ink-soft mt-1.5 text-sm leading-relaxed">
                          {credential.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              {/* Expertise */}
              <h3 className="font-display text-plum-950 mt-12 text-2xl font-bold">
                Conditions & Procedures
              </h3>
              <StaggerGroup
                as="ul"
                className="mt-6 grid gap-3 sm:grid-cols-2"
                stagger={0.05}
              >
                {doctor.expertise.map((item) => (
                  <StaggerItem as="li" key={item}>
                    <p className="text-ink-soft flex items-start gap-2.5 text-sm leading-relaxed">
                      <span className="bg-gold-sweep text-plum-950 mt-0.5 grid size-5 shrink-0 place-items-center rounded-full">
                        <Icon name="check" size={12} />
                      </span>
                      {item}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            {/* --- Sticky sidebar --- */}
            <Reveal direction="left" delay={0.1}>
              <aside className="lg:sticky lg:top-28">
                <div className="rounded-card from-plum-800 via-plum-900 to-plum-950 relative overflow-hidden bg-gradient-to-br p-6 shadow-lift">
                  <div aria-hidden className="bg-dot-grid absolute inset-0 opacity-40" />

                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative">
                      <span
                        aria-hidden
                        className="from-gold-300 via-gold-500 to-gold-700 absolute -inset-1 rounded-full bg-gradient-to-br"
                      />
                      <DoctorAvatar
                        src={doctor.photo}
                        alt={doctor.photoAlt}
                        name={doctor.name}
                        size={132}
                        sizes="132px"
                        priority
                        className="border-plum-900 relative size-[132px] border-4"
                      />
                    </div>

                    <p className="font-display text-cream mt-5 text-lg font-bold">
                      {doctor.name}
                    </p>
                    <p className="text-gold-300 mt-1 text-sm font-semibold">
                      {doctor.specialty}
                    </p>
                    {doctor.registration && (
                      <p className="text-plum-300/60 mt-1 text-xs">{doctor.registration}</p>
                    )}
                  </div>

                  <dl className="border-plum-700/50 relative mt-6 space-y-4 border-t pt-5">
                    {[
                      { label: 'Consultation days', value: doctor.consultationDays, icon: 'calendar' as const },
                      { label: 'Timings', value: doctor.consultationTime, icon: 'clock' as const },
                      { label: 'Languages', value: doctor.languages.join(', '), icon: 'care' as const },
                      { label: 'Location', value: siteConfig.address.oneLine, icon: 'pin' as const },
                    ].map((row) => (
                      <div key={row.label} className="flex gap-3">
                        <Icon name={row.icon} size={17} className="text-gold-400 mt-0.5 shrink-0" />
                        <div>
                          <dt className="text-gold-400/80 text-[0.65rem] font-bold tracking-[0.12em] uppercase">
                            {row.label}
                          </dt>
                          <dd className="text-plum-50 mt-0.5 text-sm">{row.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>

                  <div className="relative mt-6 flex flex-col gap-2.5">
                    <Button href={siteConfig.bookingHref} fullWidth icon="calendar" nudgeIcon={false}>
                      Book Appointment
                    </Button>
                    <Button
                      href={siteConfig.contact.phoneHref}
                      variant="white"
                      fullWidth
                      icon="phone"
                      iconPosition="left"
                      nudgeIcon={false}
                    >
                      {siteConfig.contact.phoneDisplay}
                    </Button>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --- Services by this doctor --- */}
      {doctorServices.length > 0 && (
        <Section tone="mist" spacing="md">
          <Container>
            <Reveal>
              <h2 className="text-section text-plum-950">
                Services led by {doctor.name.split(' ').slice(0, 2).join(' ')}
              </h2>
            </Reveal>

            <StaggerGroup as="ul" className="mt-9 grid gap-5 sm:grid-cols-2" stagger={0.1}>
              {doctorServices.map((service) => (
                <StaggerItem as="li" key={service.slug} className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="rounded-card group border-plum-100 flex h-full gap-4 border bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                  >
                    <span className="bg-plum-50 text-plum-700 group-hover:bg-gold-sweep group-hover:text-plum-950 grid size-12 shrink-0 place-items-center rounded-2xl transition-all duration-500">
                      <Icon name={service.icon} size={22} />
                    </span>
                    <span>
                      <span className="font-display text-plum-950 block font-bold">
                        {service.shortTitle}
                      </span>
                      <span className="text-ink-soft mt-1.5 block text-sm leading-relaxed">
                        {service.excerpt}
                      </span>
                      <span className="text-plum-700 mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                        Read more
                        <Icon
                          name="arrow-right"
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1.5"
                        />
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {colleague && (
              <Reveal delay={0.15} className="mt-10">
                <Link
                  href={`/doctors/${colleague.slug}`}
                  className="rounded-card group border-plum-100 flex flex-wrap items-center gap-4 border bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <DoctorAvatar
                    src={colleague.photo}
                    alt={colleague.photoAlt}
                    name={colleague.name}
                    size={56}
                    sizes="56px"
                    className="ring-hairline-gold size-14"
                  />
                  <span className="flex-1">
                    <span className="text-gold-700 block text-xs font-bold tracking-[0.14em] uppercase">
                      Also at the clinic
                    </span>
                    <span className="font-display text-plum-950 mt-1 block font-bold">
                      {colleague.name}
                    </span>
                    <span className="text-ink-soft block text-sm">{colleague.specialty}</span>
                  </span>
                  <Icon
                    name="arrow-right"
                    size={20}
                    className="text-plum-400 transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </Link>
              </Reveal>
            )}
          </Container>
        </Section>
      )}

      <EmergencyCta />
    </>
  );
}
