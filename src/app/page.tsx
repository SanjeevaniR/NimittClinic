import { DoctorsPreview } from '@/components/sections/doctors-preview';
import { EmergencyCta } from '@/components/sections/emergency-cta';
import { FaqSection } from '@/components/sections/faq-section';
import { Hero } from '@/components/sections/hero';
import { LocationSection } from '@/components/sections/location-section';
import { PatientJourney } from '@/components/sections/patient-journey';
import { ServicesSection } from '@/components/sections/services-section';
import { StatsBand } from '@/components/sections/stats-band';
import { Testimonials } from '@/components/sections/testimonials';
import { WhyChoose } from '@/components/sections/why-choose';
import { JsonLd } from '@/components/seo/json-ld';
import { faqJsonLd } from '@/lib/seo';

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />

      <Hero />
      <WhyChoose />
      <DoctorsPreview />
      <StatsBand />
      <ServicesSection limit={4} />
      <PatientJourney />
      <Testimonials />
      <EmergencyCta />
      <FaqSection />
      <LocationSection />
    </>
  );
}
