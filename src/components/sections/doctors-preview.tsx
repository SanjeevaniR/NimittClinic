import Link from 'next/link';
import { Icon } from '@/components/icons';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Container, Section } from '@/components/ui/container';
import { DoctorAvatar } from '@/components/ui/doctor-avatar';
import { SectionHeading } from '@/components/ui/section-heading';
import { doctors } from '@/content/doctors';

/**
 * "Meet Our Doctors" — the plum cards with a circular portrait from the
 * design, sitting on a mist background with a gold CTA bar underneath.
 */
export function DoctorsPreview() {
  return (
    <Section tone="mist" spacing="md" id="doctors">
      <Container className="relative">
        <SectionHeading
          eyebrow="Meet the team"
          title="Two Specialists, One Standard of Care"
          description="Women’s health and adult medicine, practised side by side — so a pregnancy with high blood pressure or a surgery in a diabetic patient is managed by both doctors, not passed between them."
        />

        <StaggerGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6" stagger={0.14}>
          {doctors.map((doctor) => (
            <StaggerItem as="li" key={doctor.slug} className="h-full">
              <Link
                href={`/doctors/${doctor.slug}`}
                className="rounded-card group block h-full focus-visible:outline-none"
              >
                <article className="rounded-card from-plum-800 via-plum-900 to-plum-950 relative flex h-full items-center gap-5 overflow-hidden bg-gradient-to-br p-5 shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 sm:gap-6 sm:p-6">
                  {/* Rotating gold halo behind the portrait */}
                  <span
                    aria-hidden
                    className="bg-gold-500/20 absolute -top-16 -left-16 size-48 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                  />

                  <div className="relative shrink-0">
                    <span
                      aria-hidden
                      className="from-gold-300 via-gold-500 to-gold-700 absolute -inset-1 rounded-full bg-gradient-to-br opacity-80 transition-transform duration-700 group-hover:rotate-180"
                    />
                    <DoctorAvatar
                      src={doctor.photo}
                      alt={doctor.photoAlt}
                      name={doctor.name}
                      size={104}
                      sizes="104px"
                      className="border-plum-900 relative size-[104px] border-4 sm:size-28"
                    />
                  </div>

                  <div className="relative min-w-0">
                    <h3 className="font-display text-cream text-xl leading-tight font-bold sm:text-2xl">
                      {doctor.name}
                    </h3>
                    <p className="text-gold-300 mt-1.5 text-sm font-semibold">
                      {doctor.specialty}
                    </p>
                    <p className="text-plum-200/75 mt-1 text-xs">{doctor.qualifications}</p>

                    <p className="text-plum-100/70 mt-3 flex items-center gap-1.5 text-xs font-medium">
                      <Icon name="clock" size={13} className="text-gold-400" />
                      {doctor.yearsExperience}+ years of practice
                    </p>

                    <span className="text-gold-200 mt-3.5 inline-flex items-center gap-1.5 text-sm font-semibold">
                      View profile
                      <Icon
                        name="arrow-right"
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                      />
                    </span>
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Gold CTA bar, as in the design */}
        <Reveal delay={0.15} className="mt-6">
          <Link
            href="/doctors"
            className="bg-gold-sweep group text-plum-950 relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl px-6 py-4 shadow-gold transition-shadow duration-500 hover:shadow-[0_16px_44px_-12px_rgb(212_175_55/0.75)]"
          >
            <span
              aria-hidden
              className="animate-shimmer absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/55 to-transparent"
            />
            <Icon name="stethoscope" size={20} className="relative" />
            <span className="font-display relative text-base font-bold tracking-tight sm:text-lg">
              Meet Our Doctors
            </span>
            <Icon
              name="arrow-right"
              size={20}
              className="relative transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
