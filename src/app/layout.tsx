import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { MotionProvider } from '@/components/motion/motion-provider';
import { ScrollProgress } from '@/components/motion/scroll-progress';
import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/config/site';
import { clinicJsonLd, websiteJsonLd } from '@/lib/seo';
import './globals.css';

// Both faces are variable fonts, so no `weight` list is passed — next/font
// self-hosts the full axis and the whole 400–800 range is available.
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}, ${siteConfig.address.city} | Obstetrics, Gynaecology & Internal Medicine`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    `gynaecologist in ${siteConfig.address.city}`,
    `obstetrician in ${siteConfig.address.city}`,
    `internal medicine doctor in ${siteConfig.address.city}`,
    'pregnancy care Indore',
    'laparoscopic surgery Indore',
    'women’s health clinic Indore',
    'diabetes doctor Indore',
    siteConfig.name,
  ],
  alternates: { canonical: siteConfig.url },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name}, ${siteConfig.address.city}`,
    description: siteConfig.description,
  },
  twitter: { card: 'summary_large_image' },
  category: 'health',
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fffdf8' },
    { media: '(prefers-color-scheme: dark)', color: '#43124c' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a href="#main" className="sr-only-focusable">
          Skip to main content
        </a>

        <JsonLd data={clinicJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <MotionProvider>
          <ScrollProgress />
          <Header />
          {/* Offset for the fixed header. */}
          <main id="main" className="flex-1 pt-[76px]">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
