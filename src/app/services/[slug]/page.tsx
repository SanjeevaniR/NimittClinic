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
import { getDoctorBySlug } from '@/content/doctors';
import { getServiceBySlug, services } from '@/content/services';
import type { Doctor } from '@/content/types';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from '@/lib/seo';

interface PageParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service not found' };

  return pageMetadata({
    title: service.title,
    description: service.excerpt,
    path: `/services/${service.slug}`,
    keywords: [
      `${service.shortTitle} ${siteConfig.address.city}`,
      ...service.includes.slice(0, 5),
    ],
  });
}

export default async function ServicePage({ params }: PageParams) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const serviceDoctors: Doctor[] = service.doctors
    .map((s) => getDoctorBySlug(s))
    .filter((d): d is Doctor => d !== undefined);

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ])}
      />

      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.excerpt}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.shortTitle, path: `/services/${service.slug}` },
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
            Ask a Question
          </Button>
        </div>
      </PageHero>

      <Section tone="cream" spacing="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-12">
            {/* --- Body --- */}
            <div>
              <Reveal>
                <span className="bg-plum-50 text-plum-700 ring-hairline-gold mb-6 grid size-16 place-items-center rounded-2xl">
                  <Icon name={service.icon} size={32} />
                </span>
              </Reveal>

              <div className="space-y-5">
                {service.description.map((paragraph, index) => (
                  <Reveal key={index} delay={0.06 * index}>
                    <p className="text-ink-soft leading-relaxed">{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              <h2 className="font-display text-plum-950 mt-11 text-2xl font-bold">
                What this includes
              </h2>
              <StaggerGroup as="ul" className="mt-6 grid gap-3 sm:grid-cols-2" stagger={0.05}>
                {service.includes.map((item) => (
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

              <Reveal delay={0.1}>
                <div className="rounded-card border-gold-200 bg-gold-50 mt-11 border p-6">
                  <h3 className="font-display text-plum-950 flex items-center gap-2 text-lg font-bold">
                    <Icon name="care" size={20} className="text-gold-600" />
                    Who this is for
                  </h3>
                  <p className="text-ink-soft mt-2.5 leading-relaxed">{service.whoIsItFor}</p>
                </div>
              </Reveal>
            </div>

            {/* --- Sidebar --- */}
            <Reveal direction="left" delay={0.1}>
              <aside className="lg:sticky lg:top-28 lg:space-y-6">
                <div className="rounded-card border-plum-100 border bg-white p-6 shadow-soft">
                  <h3 className="text-gold-700 text-xs font-bold tracking-[0.14em] uppercase">
                    Your doctor{serviceDoctors.length > 1 ? 's' : ''}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {serviceDoctors.map((doctor) => (
                      <li key={doctor.slug}>
                        <Link
                          href={`/doctors/${doctor.slug}`}
                          className="group hover:bg-plum-50 flex items-center gap-3 rounded-2xl p-2 transition-colors"
                        >
                          <DoctorAvatar
                            src={doctor.photo}
                            alt={doctor.photoAlt}
                            name={doctor.name}
                            size={52}
                            sizes="52px"
                            className="ring-hairline-gold size-13"
                          />
                          <span className="min-w-0">
                            <span className="font-display text-plum-950 block text-sm font-bold">
                              {doctor.name}
                            </span>
                            <span className="text-ink-soft block text-xs">
                              {doctor.specialtyShort}
                            </span>
                          </span>
                          <Icon
                            name="arrow-right"
                            size={16}
                            className="text-plum-300 ml-auto transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="border-plum-100 mt-5 flex flex-col gap-2.5 border-t pt-5">
                    <Button href={siteConfig.bookingHref} fullWidth icon="calendar" nudgeIcon={false}>
                      Book Appointment
                    </Button>
                    <Button
                      href={siteConfig.contact.phoneHref}
                      variant="outline"
                      fullWidth
                      icon="phone"
                      iconPosition="left"
                      nudgeIcon={false}
                    >
                      Call the clinic
                    </Button>
                  </div>
                </div>

                <div className="rounded-card from-plum-800 to-plum-950 mt-6 bg-gradient-to-br p-6 lg:mt-0">
                  <h3 className="text-gold-300 text-xs font-bold tracking-[0.14em] uppercase">
                    Other services
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {others.map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/services/${other.slug}`}
                          className="text-plum-100/85 hover:text-gold-300 group flex items-center gap-2.5 text-sm transition-colors"
                        >
                          <Icon name={other.icon} size={16} className="text-gold-400/70" />
                          <span className="flex-1">{other.shortTitle}</span>
                          <Icon
                            name="arrow-right"
                            size={14}
                            className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      <EmergencyCta />
    </>
  );
}
