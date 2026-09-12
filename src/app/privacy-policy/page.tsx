import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/legal-page';
import { LEGAL_UPDATED, privacyBlocks } from '@/content/legal';
import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Privacy Policy',
    description: `How ${siteConfig.name} handles the information you submit through this website.`,
    path: '/privacy-policy',
  }),
  robots: { index: true, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      crumbLabel="Privacy Policy"
      path="/privacy-policy"
      updated={LEGAL_UPDATED}
      intro="What we collect through this website, why we collect it, and what we will never do with it."
      blocks={privacyBlocks}
    />
  );
}
