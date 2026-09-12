import { Icon, type IconName } from '@/components/icons';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { siteConfig } from '@/config/site';

interface ContactRow {
  readonly icon: IconName;
  readonly label: string;
  readonly value: string;
  readonly href?: string;
  readonly external?: boolean;
}

const rows: readonly ContactRow[] = [
  {
    icon: 'phone',
    label: 'Call the clinic',
    value: siteConfig.contact.phoneDisplay,
    href: siteConfig.contact.phoneHref,
  },
  {
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: 'Message us for appointments',
    href: siteConfig.whatsapp.href,
    external: true,
  },
  {
    icon: 'mail',
    label: 'Email',
    value: siteConfig.contact.email,
    href: siteConfig.contact.emailHref,
  },
  {
    icon: 'pin',
    label: 'Visit us',
    value: siteConfig.address.oneLine,
    href: siteConfig.address.directionsUrl,
    external: true,
  },
];

/** Contact details beside an embedded map. Reused on Home and Contact. */
export function LocationSection({ tone = 'cream' }: { readonly tone?: 'cream' | 'mist' }) {
  return (
    <Section tone={tone} spacing="md" id="location">
      <Container>
        <SectionHeading
          eyebrow="Find us"
          title="Visit Nimitt Clinic"
          description={`We are in ${siteConfig.address.city}, easy to reach and easy to park at. Call ahead and we will have your file ready.`}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
          {/* --- Details --- */}
          <StaggerGroup as="ul" className="flex flex-col gap-4" stagger={0.1}>
            {rows.map((row) => {
              const content = (
                <>
                  <span className="bg-plum-50 text-plum-700 group-hover:bg-gold-sweep group-hover:text-plum-950 grid size-12 shrink-0 place-items-center rounded-2xl transition-all duration-500 group-hover:scale-110">
                    <Icon name={row.icon} size={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="text-gold-700 block text-xs font-bold tracking-[0.14em] uppercase">
                      {row.label}
                    </span>
                    <span className="text-plum-950 mt-1 block font-semibold break-words">
                      {row.value}
                    </span>
                  </span>
                </>
              );

              return (
                <StaggerItem as="li" key={row.label}>
                  {row.href ? (
                    <a
                      href={row.href}
                      {...(row.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="rounded-card group border-plum-100 flex items-start gap-4 border bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="rounded-card group border-plum-100 flex items-start gap-4 border bg-white p-5 shadow-soft">
                      {content}
                    </div>
                  )}
                </StaggerItem>
              );
            })}

            <StaggerItem as="li">
              <div className="rounded-card from-plum-800 to-plum-950 bg-gradient-to-br p-5">
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
            </StaggerItem>
          </StaggerGroup>

          {/* --- Map --- */}
          <Reveal direction="left" delay={0.12} className="flex flex-col gap-4">
            <div className="rounded-card ring-hairline-gold relative aspect-[4/3] w-full overflow-hidden shadow-lift lg:aspect-auto lg:h-full lg:min-h-[420px]">
              <iframe
                src={siteConfig.address.mapEmbedUrl}
                title={`Map showing the location of ${siteConfig.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            </div>
            <Button
              href={siteConfig.address.directionsUrl}
              variant="plum"
              icon="arrow-up-right"
              nudgeIcon={false}
              fullWidth
            >
              Get Directions
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
