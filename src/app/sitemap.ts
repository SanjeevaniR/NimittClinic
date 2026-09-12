import type { MetadataRoute } from 'next';
import { doctors } from '@/content/doctors';
import { services } from '@/content/services';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '/', priority: 1, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'yearly' as const },
    { path: '/doctors', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/patient-care', priority: 0.7, changeFrequency: 'yearly' as const },
    { path: '/contact', priority: 0.9, changeFrequency: 'yearly' as const },
    { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' as const },
    { path: '/disclaimer', priority: 0.2, changeFrequency: 'yearly' as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(siteConfig.url, path),
    lastModified,
    changeFrequency,
    priority,
  }));

  const doctorRoutes: MetadataRoute.Sitemap = doctors.map((doctor) => ({
    url: absoluteUrl(siteConfig.url, `/doctors/${doctor.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(siteConfig.url, `/services/${service.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...doctorRoutes, ...serviceRoutes];
}
