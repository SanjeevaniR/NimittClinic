import type { ReactNode, SVGProps } from 'react';

/**
 * Hand-rolled icon set — no icon library, no extra bundle weight.
 * All icons are 24×24, inherit `currentColor`, and use a 1.6 stroke so they
 * read consistently at 20–48px.
 */

export type IconName =
  | 'doctor'
  | 'facility'
  | 'care'
  | 'education'
  | 'pregnancy'
  | 'womens-health'
  | 'internal-medicine'
  | 'surgery'
  | 'whatsapp'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'clock'
  | 'calendar'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'check'
  | 'star'
  | 'quote'
  | 'sparkle'
  | 'shield'
  | 'menu'
  | 'close'
  | 'chevron-down'
  | 'alert'
  | 'stethoscope'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'x';

type IconProps = SVGProps<SVGSVGElement> & {
  readonly name: IconName;
  readonly size?: number | string;
};

const strokeDefaults = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const paths: Record<IconName, { solid?: boolean; body: ReactNode }> = {
  doctor: {
    body: (
      <>
        <circle cx="12" cy="7" r="3.4" />
        <path d="M5 21v-1.6A5.4 5.4 0 0 1 10.4 14h3.2A5.4 5.4 0 0 1 19 19.4V21" />
        <path d="M12 14v3.2" />
        <path d="M10.4 16.6h3.2" />
      </>
    ),
  },
  facility: {
    body: (
      <>
        <path d="M4 21V6.5a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 20 6.5V21" />
        <path d="M2.5 21h19" />
        <path d="M12 8v4M10 10h4" />
        <path d="M8 15h2.5M13.5 15H16M8 18h2.5M13.5 18H16" />
      </>
    ),
  },
  care: {
    body: (
      <>
        <path d="M12 8.6c1.4-2.5 5.4-2.1 5.4 1 0 2.6-3.4 4.6-5.4 6-2-1.4-5.4-3.4-5.4-6 0-3.1 4-3.5 5.4-1Z" />
        <path d="M3 20.2c1.6-1.2 3.2-1.8 4.8-1.8h8.4c1.6 0 3.2.6 4.8 1.8" />
      </>
    ),
  },
  education: {
    body: (
      <>
        <path d="M3 6.5C5 5.5 7 5 9 5s3 .6 3 1.8V19c0-1.2-1-1.8-3-1.8s-4 .5-6 1.5Z" />
        <path d="M21 6.5C19 5.5 17 5 15 5s-3 .6-3 1.8V19c0-1.2 1-1.8 3-1.8s4 .5 6 1.5Z" />
      </>
    ),
  },
  pregnancy: {
    body: (
      <>
        <circle cx="11.6" cy="4.6" r="2.1" />
        <path d="M11 8.2c-2 .3-3.2 2-3.4 4.2l-.5 4.4" />
        <path d="M11 8.2c2.7 0 4.8 1.8 4.8 4.3 0 2.2-1.6 3.7-3.6 3.9" />
        <path d="M9.6 16.4 9 21" />
        <path d="M12.6 16.6 13.4 21" />
      </>
    ),
  },
  'womens-health': {
    body: (
      <>
        <circle cx="12" cy="8.4" r="4.4" />
        <path d="M12 12.8V21" />
        <path d="M8.8 17.6h6.4" />
      </>
    ),
  },
  'internal-medicine': {
    body: (
      <>
        <path d="M7 3v4.6a4 4 0 0 0 8 0V3" />
        <path d="M11 11.4v3.2a4.4 4.4 0 0 0 8.8 0v-1.2" />
        <circle cx="19.8" cy="11.6" r="1.6" />
        <path d="M5.4 3h3.2M13.4 3h3.2" />
      </>
    ),
  },
  surgery: {
    body: (
      <>
        <path d="M4 20.2 14.6 9.6" />
        <path d="M12.6 7.6 16 4.2a3.2 3.2 0 0 1 4.5 4.5l-3.4 3.4Z" />
        <path d="M4 20.2H7l1.4-1.4" />
        <path d="M9.4 14.8 6.2 11.6a2.2 2.2 0 0 1 0-3.2l1-1" />
      </>
    ),
  },
  whatsapp: {
    solid: true,
    body: (
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.09c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.03.24-3.47-.72-2.94-1.16-4.8-4.2-4.95-4.4-.14-.2-1.17-1.56-1.17-2.97 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36l.55.01c.17 0 .41-.07.64.49.24.58.8 1.99.87 2.13.07.15.12.32.02.51-.1.2-.15.32-.29.49l-.44.51c-.14.15-.29.31-.13.6.17.29.74 1.22 1.58 1.98 1.09.97 2 1.28 2.29 1.42.29.15.46.12.63-.07.17-.2.72-.85.92-1.14.19-.29.39-.24.65-.15.27.1 1.69.8 1.98.94.29.15.48.22.55.34.07.12.07.7-.17 1.38Z" />
    ),
  },
  phone: {
    body: (
      <path d="M6.6 3.5h2.2l1.4 3.4-1.9 1.5a11.6 11.6 0 0 0 5.8 5.8l1.5-1.9 3.4 1.4v2.2a2 2 0 0 1-2.2 2A16 16 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
    ),
  },
  mail: {
    body: (
      <>
        <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" />
        <path d="m3.6 7 7.3 5.2a2 2 0 0 0 2.2 0L20.4 7" />
      </>
    ),
  },
  pin: {
    body: (
      <>
        <path d="M12 21.2s6.6-5.4 6.6-10.2a6.6 6.6 0 1 0-13.2 0C5.4 15.8 12 21.2 12 21.2Z" />
        <circle cx="12" cy="10.6" r="2.5" />
      </>
    ),
  },
  clock: {
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.4V12l3.4 2.2" />
      </>
    ),
  },
  calendar: {
    body: (
      <>
        <rect x="3.2" y="5" width="17.6" height="16" rx="2.4" />
        <path d="M3.2 10h17.6M8.4 3v4M15.6 3v4" />
      </>
    ),
  },
  'arrow-right': {
    body: (
      <>
        <path d="M4 12h15.5" />
        <path d="m13.6 6 5.9 6-5.9 6" />
      </>
    ),
  },
  'arrow-up-right': {
    body: (
      <>
        <path d="M7 17 17 7" />
        <path d="M8.6 7H17v8.4" />
      </>
    ),
  },
  check: { body: <path d="m5 12.8 4.4 4.4L19 6.6" /> },
  star: {
    solid: true,
    body: (
      <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5-4.8-4.6 6.6-.9Z" />
    ),
  },
  quote: {
    solid: true,
    body: (
      <path d="M9.6 5.4c-3.4 1.2-5.6 4-5.6 7.7 0 3.3 1.9 5.5 4.5 5.5 2.2 0 3.9-1.6 3.9-3.7 0-2-1.4-3.5-3.3-3.5-.3 0-.6 0-.9.1.4-1.7 1.7-3.1 3.5-3.9Zm9.2 0c-3.4 1.2-5.6 4-5.6 7.7 0 3.3 1.9 5.5 4.5 5.5 2.2 0 3.9-1.6 3.9-3.7 0-2-1.4-3.5-3.3-3.5-.3 0-.6 0-.9.1.4-1.7 1.7-3.1 3.5-3.9Z" />
    ),
  },
  sparkle: {
    solid: true,
    body: (
      <path d="M12 2.4l1.7 5.1a4 4 0 0 0 2.5 2.5l5.1 1.7-5.1 1.7a4 4 0 0 0-2.5 2.5L12 21.6l-1.7-5.1a4 4 0 0 0-2.5-2.5L2.7 12.3l5.1-1.7a4 4 0 0 0 2.5-2.5Z" />
    ),
  },
  shield: {
    body: (
      <>
        <path d="M12 2.8 4.8 5.6v5.9c0 4.4 3 7.7 7.2 9.7 4.2-2 7.2-5.3 7.2-9.7V5.6Z" />
        <path d="m8.9 12 2.2 2.2 4-4.2" />
      </>
    ),
  },
  menu: { body: <path d="M4 7h16M4 12h16M4 17h16" /> },
  close: { body: <path d="M6 6l12 12M18 6 6 18" /> },
  'chevron-down': { body: <path d="m6 9.5 6 5.5 6-5.5" /> },
  alert: {
    body: (
      <>
        <path d="M12 3.6 21 19.4H3Z" />
        <path d="M12 9.6v4.2M12 16.6h.01" />
      </>
    ),
  },
  stethoscope: {
    body: (
      <>
        <path d="M5.4 3.4v5a4.2 4.2 0 0 0 8.4 0v-5" />
        <path d="M9.6 12.6v3a5 5 0 0 0 10 0v-1.4" />
        <circle cx="19.6" cy="12.4" r="1.8" />
        <path d="M3.8 3.4h3.2M12.2 3.4h3.2" />
      </>
    ),
  },
  facebook: {
    solid: true,
    body: (
      <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.49-1.46h1.6V4.4c-.28-.04-1.23-.12-2.34-.12-2.31 0-3.89 1.41-3.89 4v2.23H7.7v3h2.66V21Z" />
    ),
  },
  instagram: {
    body: (
      <>
        <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
        <circle cx="12" cy="12" r="3.9" />
        <path d="M17.1 6.9h.01" strokeWidth={2.4} />
      </>
    ),
  },
  youtube: {
    solid: true,
    body: (
      <path d="M21.3 7.9a2.9 2.9 0 0 0-2-2.05C17.5 5.4 12 5.4 12 5.4s-5.5 0-7.3.45a2.9 2.9 0 0 0-2 2.05C2.25 9.7 2.25 12 2.25 12s0 2.3.45 4.1a2.9 2.9 0 0 0 2 2.05c1.8.45 7.3.45 7.3.45s5.5 0 7.3-.45a2.9 2.9 0 0 0 2-2.05c.45-1.8.45-4.1.45-4.1s0-2.3-.45-4.1ZM10.2 15.3V8.7L15.9 12Z" />
    ),
  },
  x: {
    solid: true,
    body: (
      <path d="M17.2 3h3.3l-7.2 8.23L21.5 21h-6.1l-4.3-5.62L6.1 21H2.8l7.5-8.58L2.5 3h6.25l4 5.28Zm-1.15 16h1.83L7.02 4.9H5.06Z" />
    ),
  },
};

export function Icon({ name, size = 24, ...rest }: IconProps) {
  const entry = paths[name];
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: false as const,
  };

  if (entry.solid) {
    return (
      <svg {...shared} fill="currentColor" {...rest}>
        {entry.body}
      </svg>
    );
  }

  return (
    <svg {...shared} {...strokeDefaults} {...rest}>
      {entry.body}
    </svg>
  );
}
