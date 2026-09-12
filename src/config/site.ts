import { publicEnv as e } from '@/lib/env/public';

/**
 * Single source of truth for clinic identity, contact details and links.
 * Values come from environment variables — see `.env.example`.
 * Nothing here is hardcoded, so the same build serves staging and production.
 */

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: 'facebook' | 'instagram' | 'youtube' | 'x';
}

/** Strip everything that isn't a digit or a leading plus — for `tel:` hrefs. */
function toTelHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  return `tel:${digits.startsWith('+') ? digits : `+${digits}`}`;
}

/** Only the socials that were actually configured get an icon in the footer. */
const socialCandidates: readonly {
  label: string;
  href?: string;
  icon: SocialLink['icon'];
}[] = [
  { label: 'Facebook', href: e.NEXT_PUBLIC_SOCIAL_FACEBOOK, icon: 'facebook' },
  { label: 'Instagram', href: e.NEXT_PUBLIC_SOCIAL_INSTAGRAM, icon: 'instagram' },
  { label: 'YouTube', href: e.NEXT_PUBLIC_SOCIAL_YOUTUBE, icon: 'youtube' },
  { label: 'X', href: e.NEXT_PUBLIC_SOCIAL_X, icon: 'x' },
];

const socials: SocialLink[] = socialCandidates.filter((s): s is SocialLink =>
  Boolean(s.href),
);

const addressLines = [
  e.NEXT_PUBLIC_ADDRESS_LINE1,
  e.NEXT_PUBLIC_ADDRESS_LINE2,
  `${e.NEXT_PUBLIC_ADDRESS_CITY}, ${e.NEXT_PUBLIC_ADDRESS_STATE} ${e.NEXT_PUBLIC_ADDRESS_POSTAL_CODE}`,
].filter((l): l is string => Boolean(l));

export const siteConfig = {
  name: e.NEXT_PUBLIC_CLINIC_NAME,
  shortName: 'Nimitt',
  tagline: e.NEXT_PUBLIC_CLINIC_TAGLINE,
  description:
    'Nimitt Clinic, Indore — expert care in Obstetrics, Gynaecology and Internal Medicine. Pregnancy care, women’s health checks, gynaecological surgery and adult medicine under one roof.',
  url: e.NEXT_PUBLIC_SITE_URL,
  locale: 'en_IN',
  specialties: ['Obstetrics', 'Gynaecology', 'Internal Medicine'] as const,

  contact: {
    phoneDisplay: e.NEXT_PUBLIC_CLINIC_PHONE,
    phoneHref: toTelHref(e.NEXT_PUBLIC_CLINIC_PHONE),
    email: e.NEXT_PUBLIC_CLINIC_EMAIL,
    emailHref: `mailto:${e.NEXT_PUBLIC_CLINIC_EMAIL}`,
  },

  whatsapp: {
    number: e.NEXT_PUBLIC_WHATSAPP_NUMBER,
    defaultMessage: e.NEXT_PUBLIC_WHATSAPP_MESSAGE,
    /** wa.me works on mobile apps, desktop app and web alike. */
    href: `https://wa.me/${e.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      e.NEXT_PUBLIC_WHATSAPP_MESSAGE,
    )}`,
  },

  address: {
    lines: addressLines,
    oneLine: addressLines.join(', '),
    street: [e.NEXT_PUBLIC_ADDRESS_LINE1, e.NEXT_PUBLIC_ADDRESS_LINE2]
      .filter(Boolean)
      .join(', '),
    city: e.NEXT_PUBLIC_ADDRESS_CITY,
    state: e.NEXT_PUBLIC_ADDRESS_STATE,
    postalCode: e.NEXT_PUBLIC_ADDRESS_POSTAL_CODE,
    country: e.NEXT_PUBLIC_ADDRESS_COUNTRY,
    geo: { lat: e.NEXT_PUBLIC_GEO_LAT, lng: e.NEXT_PUBLIC_GEO_LNG },
    mapEmbedUrl: e.NEXT_PUBLIC_MAP_EMBED_URL,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${e.NEXT_PUBLIC_GEO_LAT},${e.NEXT_PUBLIC_GEO_LNG}`,
  },

  /** Displayed in the footer and emitted as schema.org openingHoursSpecification. */
  hours: [
    { days: 'Monday – Friday', time: '10:00 AM – 2:00 PM, 5:00 PM – 8:00 PM' },
    { days: 'Saturday', time: '10:00 AM – 2:00 PM' },
    { days: 'Sunday', time: 'Emergencies only' },
  ] as const,

  openingHoursSpec: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '20:00',
    },
    { days: ['Saturday'], opens: '10:00', closes: '14:00' },
  ] as const,

  socials,
  bookingUrl: e.NEXT_PUBLIC_BOOKING_URL,
  /** Where every "Book Appointment" CTA points. */
  bookingHref: e.NEXT_PUBLIC_BOOKING_URL ?? '/contact#appointment',
} as const;

export type SiteConfig = typeof siteConfig;
