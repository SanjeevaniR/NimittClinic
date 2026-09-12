import type { Metadata } from 'next';
import { FaqSection } from '@/components/sections/faq-section';
import { PageHero } from '@/components/sections/page-hero';
import { ServicesSection } from '@/components/sections/services-section';
import { JsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Our Services',
  description: `Pregnancy care, women's health, internal medicine and laparoscopic gynaecological surgery at ${siteConfig.name}, ${siteConfig.address.city}.`,
  path: '/services',
  keywords: [
    `pregnancy care ${siteConfig.address.city}`,
    `laparoscopic surgery ${siteConfig.address.city}`,
    `diabetes doctor ${siteConfig.address.city}`,
    `women's health clinic ${siteConfig.address.city}`,
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />

      <PageHero
        eyebrow="Comprehensive care"
        title="Our Services"
        description="Four service lines that cover a woman's health across her whole life, plus adult internal medicine for the entire family. All under one roof, by the doctor actually qualified for it."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      >
        <Button href={siteConfig.bookingHref} size="lg" icon="calendar" nudgeIcon={false}>
          Book a Consultation
        </Button>
      </PageHero>

      <ServicesSection showCta={false} />
      <FaqSection />
    </>
  );
}
