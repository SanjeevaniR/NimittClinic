import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/legal-page';
import { LEGAL_UPDATED, termsBlocks } from '@/content/legal';
import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Terms of Use',
    description: `The terms that apply when you use the ${siteConfig.name} website.`,
    path: '/terms',
  }),
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      crumbLabel="Terms of Use"
      path="/terms"
      updated={LEGAL_UPDATED}
      intro="The ground rules for using this website, and what submitting an enquiry does and does not mean."
      blocks={termsBlocks}
    />
  );
}
