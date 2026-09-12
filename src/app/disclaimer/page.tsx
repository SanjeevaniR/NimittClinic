import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/legal-page';
import { disclaimerBlocks, LEGAL_UPDATED } from '@/content/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Medical Disclaimer',
    description:
      'Information on this website is general and is not a substitute for a consultation, diagnosis or treatment.',
    path: '/disclaimer',
  }),
  robots: { index: true, follow: false },
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Medical Disclaimer"
      crumbLabel="Disclaimer"
      path="/disclaimer"
      updated={LEGAL_UPDATED}
      intro="Please read this before acting on anything you find on this site. General health information is not the same as medical advice for you."
      blocks={disclaimerBlocks}
    />
  );
}
