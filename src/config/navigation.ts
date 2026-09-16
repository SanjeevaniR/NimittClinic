export interface NavItem {
  readonly label: string;
  readonly href: string;
  /** Also highlight the item for these path prefixes. */
  readonly matches?: readonly string[];
}

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Doctors', href: '/doctors', matches: ['/doctors'] },
  { label: 'Services', href: '/services', matches: ['/services'] },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerNav = {
  findUs: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Doctors', href: '/doctors' },
    { label: 'Contact Us', href: '/contact' },
  ],
  quickLinks: [
    { label: 'Pregnancy Care', href: '/services/pregnancy-care' },
    { label: "Women's Health Check", href: '/services/womens-health-check' },
    { label: 'Internal Medicine', href: '/services/internal-medicine' },
    { label: 'Gynaecological Surgery', href: '/services/gynaecological-surgery' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
} as const satisfies Record<string, readonly NavItem[]>;

/** True when `pathname` should mark `item` as the active nav entry. */
export function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.href === '/') return pathname === '/';
  if (pathname === item.href) return true;
  return (item.matches ?? []).some((prefix) => pathname.startsWith(`${prefix}/`));
}
