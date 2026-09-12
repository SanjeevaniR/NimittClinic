import type { IconName } from '@/components/icons';

export interface Credential {
  readonly abbr: string;
  readonly title: string;
  readonly description: string;
}

export interface Doctor {
  readonly slug: string;
  readonly name: string;
  readonly honorific: string;
  readonly specialty: string;
  readonly specialtyShort: string;
  readonly qualifications: string;
  readonly registration?: string;
  readonly yearsExperience: number;
  readonly languages: readonly string[];
  /** Path under /public. A tasteful monogram is rendered if the file is absent. */
  readonly photo: string;
  readonly photoAlt: string;
  readonly headline: string;
  readonly summary: string;
  readonly bio: readonly string[];
  readonly credentials: readonly Credential[];
  readonly expertise: readonly string[];
  readonly consultationDays: string;
  readonly consultationTime: string;
}

export interface Service {
  readonly slug: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly icon: IconName;
  readonly excerpt: string;
  readonly description: readonly string[];
  readonly includes: readonly string[];
  readonly whoIsItFor: string;
  /** Doctor slugs who deliver this service. */
  readonly doctors: readonly string[];
}

export interface Feature {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly context: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
}

export interface Faq {
  readonly question: string;
  readonly answer: string;
}

export interface Stat {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}
