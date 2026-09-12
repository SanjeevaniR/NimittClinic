import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  const isProduction = siteConfig.url.startsWith('https://');

  // Never let a staging or preview origin get indexed.
  if (!isProduction) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: absoluteUrl(siteConfig.url, '/sitemap.xml'),
    host: siteConfig.url,
  };
}
