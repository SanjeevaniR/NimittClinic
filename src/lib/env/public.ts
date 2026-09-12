import { z } from 'zod';

/**
 * Browser-safe environment.
 *
 * Every `process.env.NEXT_PUBLIC_*` access below MUST be a static member
 * expression — that is how the Next.js compiler finds and inlines the value.
 * Never iterate over `process.env` for public vars.
 */

const optionalUrl = z
  .string()
  .trim()
  .url()
  .or(z.literal(''))
  .optional()
  .transform((v) => (v ? v : undefined));

const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined));

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .trim()
    .url('NEXT_PUBLIC_SITE_URL must be an absolute URL')
    .transform((v) => v.replace(/\/+$/, ''))
    .default('http://localhost:3000'),

  NEXT_PUBLIC_CLINIC_NAME: z.string().trim().min(1).default('Nimitt Clinic'),
  NEXT_PUBLIC_CLINIC_TAGLINE: z
    .string()
    .trim()
    .min(1)
    .default('Leading Specialists, Personalized Care'),

  NEXT_PUBLIC_CLINIC_PHONE: z.string().trim().min(6).default('+91 70000 00000'),
  NEXT_PUBLIC_CLINIC_EMAIL: z.string().trim().email().default('contact@nimittclinic.com'),

  /** Digits only, international format (country code + number). */
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string()
    .trim()
    .regex(/^\d{8,15}$/, 'NEXT_PUBLIC_WHATSAPP_NUMBER must be 8-15 digits, no "+" or spaces')
    .default('917000000000'),
  NEXT_PUBLIC_WHATSAPP_MESSAGE: z
    .string()
    .trim()
    .default('Hello Nimitt Clinic, I would like to book an appointment.'),

  NEXT_PUBLIC_ADDRESS_LINE1: z.string().trim().min(1).default('TODO Building name, Floor'),
  NEXT_PUBLIC_ADDRESS_LINE2: optionalText,
  NEXT_PUBLIC_ADDRESS_CITY: z.string().trim().min(1).default('Indore'),
  NEXT_PUBLIC_ADDRESS_STATE: z.string().trim().min(1).default('Madhya Pradesh'),
  NEXT_PUBLIC_ADDRESS_POSTAL_CODE: z.string().trim().min(1).default('452010'),
  NEXT_PUBLIC_ADDRESS_COUNTRY: z.string().trim().length(2).default('IN'),
  NEXT_PUBLIC_GEO_LAT: z.coerce.number().min(-90).max(90).default(22.7196),
  NEXT_PUBLIC_GEO_LNG: z.coerce.number().min(-180).max(180).default(75.8577),

  NEXT_PUBLIC_MAP_EMBED_URL: z
    .string()
    .trim()
    .url()
    .default('https://www.google.com/maps?q=Indore&output=embed'),

  NEXT_PUBLIC_SOCIAL_FACEBOOK: optionalUrl,
  NEXT_PUBLIC_SOCIAL_INSTAGRAM: optionalUrl,
  NEXT_PUBLIC_SOCIAL_YOUTUBE: optionalUrl,
  NEXT_PUBLIC_SOCIAL_X: optionalUrl,

  NEXT_PUBLIC_BOOKING_URL: optionalUrl,
});

const parsed = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_CLINIC_NAME: process.env.NEXT_PUBLIC_CLINIC_NAME,
  NEXT_PUBLIC_CLINIC_TAGLINE: process.env.NEXT_PUBLIC_CLINIC_TAGLINE,
  NEXT_PUBLIC_CLINIC_PHONE: process.env.NEXT_PUBLIC_CLINIC_PHONE,
  NEXT_PUBLIC_CLINIC_EMAIL: process.env.NEXT_PUBLIC_CLINIC_EMAIL,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_WHATSAPP_MESSAGE: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE,
  NEXT_PUBLIC_ADDRESS_LINE1: process.env.NEXT_PUBLIC_ADDRESS_LINE1,
  NEXT_PUBLIC_ADDRESS_LINE2: process.env.NEXT_PUBLIC_ADDRESS_LINE2,
  NEXT_PUBLIC_ADDRESS_CITY: process.env.NEXT_PUBLIC_ADDRESS_CITY,
  NEXT_PUBLIC_ADDRESS_STATE: process.env.NEXT_PUBLIC_ADDRESS_STATE,
  NEXT_PUBLIC_ADDRESS_POSTAL_CODE: process.env.NEXT_PUBLIC_ADDRESS_POSTAL_CODE,
  NEXT_PUBLIC_ADDRESS_COUNTRY: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY,
  NEXT_PUBLIC_GEO_LAT: process.env.NEXT_PUBLIC_GEO_LAT,
  NEXT_PUBLIC_GEO_LNG: process.env.NEXT_PUBLIC_GEO_LNG,
  NEXT_PUBLIC_MAP_EMBED_URL: process.env.NEXT_PUBLIC_MAP_EMBED_URL,
  NEXT_PUBLIC_SOCIAL_FACEBOOK: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
  NEXT_PUBLIC_SOCIAL_INSTAGRAM: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
  NEXT_PUBLIC_SOCIAL_YOUTUBE: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE,
  NEXT_PUBLIC_SOCIAL_X: process.env.NEXT_PUBLIC_SOCIAL_X,
  NEXT_PUBLIC_BOOKING_URL: process.env.NEXT_PUBLIC_BOOKING_URL,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
    .join('\n');
  throw new Error(`Invalid public environment variables:\n${issues}`);
}

export const publicEnv = parsed.data;
export type PublicEnv = typeof publicEnv;
