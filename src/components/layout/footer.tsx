import Link from 'next/link';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Logo } from '@/components/ui/logo';
import { footerNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';

function ColumnHeading({ children }: { readonly children: string }) {
  return (
    <h2 className="text-gold-300 mb-4 text-xs font-bold tracking-[0.18em] uppercase">
      {children}
    </h2>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-plum-950 text-plum-100 relative overflow-hidden">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="bg-plum-600/25 pointer-events-none absolute -top-32 -left-24 size-80 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-gold-600/15 pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full blur-3xl"
      />
      <div aria-hidden className="bg-gold-sweep h-1 w-full" />

      <Container className="relative py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* --- Brand + address --- */}
          <Reveal className="lg:col-span-1">
            <Logo tone="light" />
            <p className="text-plum-200/80 mt-5 max-w-xs text-sm leading-relaxed">
              {siteConfig.tagline}. Obstetrics, Gynaecology and Internal Medicine under one
              roof in {siteConfig.address.city}.
            </p>

            <address className="mt-5 not-italic">
              <ColumnHeading>Location</ColumnHeading>
              <p className="flex gap-2.5 text-sm leading-relaxed">
                <Icon name="pin" size={17} className="text-gold-400 mt-0.5 shrink-0" />
                <span>
                  {siteConfig.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <a
                href={siteConfig.address.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-300 hover:text-gold-200 mt-3 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
              >
                Get Directions
                <Icon name="arrow-up-right" size={14} />
              </a>
            </address>
          </Reveal>

          {/* --- Find us --- */}
          <Reveal delay={0.08}>
            <ColumnHeading>Find Us</ColumnHeading>
            <ul className="space-y-2.5">
              {footerNav.findUs.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-plum-200/85 hover:text-gold-300 group inline-flex items-center gap-2 text-sm transition-colors"
                  >
                    <span className="bg-gold-500/60 group-hover:bg-gold-400 h-px w-0 transition-all duration-300 group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ColumnHeading>Consultation Hours</ColumnHeading>
            <ul className="space-y-2">
              {siteConfig.hours.map((slot) => (
                <li key={slot.days} className="text-plum-200/80 text-sm">
                  <span className="text-plum-50 block font-semibold">{slot.days}</span>
                  {slot.time}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* --- Quick links --- */}
          <Reveal delay={0.14}>
            <ColumnHeading>Our Services</ColumnHeading>
            <ul className="space-y-2.5">
              {footerNav.quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-plum-200/85 hover:text-gold-300 group inline-flex items-center gap-2 text-sm transition-colors"
                  >
                    <span className="bg-gold-500/60 group-hover:bg-gold-400 h-px w-0 transition-all duration-300 group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ColumnHeading>Legal</ColumnHeading>
            <ul className="space-y-2.5">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-plum-200/70 hover:text-gold-300 text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* --- Contact + social --- */}
          <Reveal delay={0.2}>
            <ColumnHeading>Contact Us</ColumnHeading>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="hover:text-gold-300 group flex items-center gap-3 text-sm font-semibold transition-colors"
                >
                  <span className="glass-plum grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110">
                    <Icon name="phone" size={16} className="text-gold-400" />
                  </span>
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.emailHref}
                  className="hover:text-gold-300 group flex items-center gap-3 text-sm font-semibold break-all transition-colors"
                >
                  <span className="glass-plum grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110">
                    <Icon name="mail" size={16} className="text-gold-400" />
                  </span>
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm font-semibold transition-colors hover:text-[#25D366]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#25D366]/15 transition-transform duration-300 group-hover:scale-110">
                    <Icon name="whatsapp" size={17} className="text-[#25D366]" />
                  </span>
                  WhatsApp us
                </a>
              </li>
            </ul>

            {siteConfig.socials.length > 0 && (
              <>
                <ColumnHeading>Follow Us</ColumnHeading>
                <ul className="flex flex-wrap gap-2.5">
                  {siteConfig.socials.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${siteConfig.name} on ${social.label}`}
                        className="glass-plum hover:bg-gold-500 hover:text-plum-950 grid size-10 place-items-center rounded-full transition-all duration-300 hover:-translate-y-1"
                      >
                        <Icon name={social.icon} size={17} />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
        </div>

        {/* --- Bottom bar --- */}
        <div className="border-plum-800/60 mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <p className="text-plum-300/70 text-xs">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-plum-300/60 max-w-md text-center text-xs sm:text-right">
            This website is for information only and is not a substitute for professional
            medical advice.
          </p>
        </div>
      </Container>
    </footer>
  );
}
