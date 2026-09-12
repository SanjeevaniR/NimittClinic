import type { Metadata } from 'next';
import { doctors } from '@/content/doctors';
import { services } from '@/content/services';
import { faqs } from '@/content/site-content';
import type { Doctor, Faq, Service } from '@/content/types';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Metadata helpers                                                   */
/* ------------------------------------------------------------------ */

interface PageMetaInput {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly keywords?: readonly string[];
  readonly type?: 'website' | 'article' | 'profile';
}

/** Per-page metadata with canonical URL and OG/Twitter cards filled in. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = 'website',
}: PageMetaInput): Metadata {
  const url = absoluteUrl(siteConfig.url, path);

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: absoluteUrl(siteConfig.url, '/opengraph-image'),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name}, ${siteConfig.address.city}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                   */
/* ------------------------------------------------------------------ */

type JsonLd = Record<string, unknown>;

const postalAddress: JsonLd = {
  '@type': 'PostalAddress',
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.city,
  addressRegion: siteConfig.address.state,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.country,
};

function physicianNode(doctor: Doctor): JsonLd {
  return {
    '@type': 'Physician',
    '@id': absoluteUrl(siteConfig.url, `/doctors/${doctor.slug}#physician`),
    name: doctor.name,
    url: absoluteUrl(siteConfig.url, `/doctors/${doctor.slug}`),
    image: absoluteUrl(siteConfig.url, doctor.photo),
    description: doctor.summary,
    medicalSpecialty: doctor.specialty,
    knowsAbout: [...doctor.expertise],
    knowsLanguage: [...doctor.languages],
    address: postalAddress,
    telephone: siteConfig.contact.phoneDisplay,
    hasCredential: doctor.credentials.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      credentialCategory: c.abbr,
    })),
  };
}

/** MedicalClinic — the primary local-business entity for this site. */
export function clinicJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': absoluteUrl(siteConfig.url, '/#clinic'),
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneDisplay,
    email: siteConfig.contact.email,
    address: postalAddress,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.address.geo.lat,
      longitude: siteConfig.address.geo.lng,
    },
    hasMap: siteConfig.address.directionsUrl,
    areaServed: {
      '@type': 'City',
      name: siteConfig.address.city,
    },
    medicalSpecialty: [...siteConfig.specialties],
    availableService: services.map((service) => ({
      '@type': 'MedicalProcedure',
      name: service.title,
      description: service.excerpt,
      url: absoluteUrl(siteConfig.url, `/services/${service.slug}`),
    })),
    employee: doctors.map(physicianNode),
    openingHoursSpecification: siteConfig.openingHoursSpec.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...spec.days],
      opens: spec.opens,
      closes: spec.closes,
    })),
    sameAs: siteConfig.socials.map((s) => s.href),
    isAcceptingNewPatients: true,
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl(siteConfig.url, '/#website'),
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'en-IN',
    publisher: { '@id': absoluteUrl(siteConfig.url, '/#clinic') },
  };
}

export function doctorJsonLd(doctor: Doctor): JsonLd {
  return { '@context': 'https://schema.org', ...physicianNode(doctor) };
}

export function serviceJsonLd(service: Service): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.title,
    description: service.excerpt,
    url: absoluteUrl(siteConfig.url, `/services/${service.slug}`),
    howPerformed: service.description.join(' '),
    provider: { '@id': absoluteUrl(siteConfig.url, '/#clinic') },
  };
}

export function faqJsonLd(items: readonly Faq[] = faqs): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  trail: readonly { readonly name: string; readonly path: string }[],
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(siteConfig.url, crumb.path),
    })),
  };
}
