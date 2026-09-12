import { z } from 'zod';
import { doctorSlugs } from '@/content/doctors';
import { serviceSlugs } from '@/content/services';

/**
 * Contact-form contract, shared verbatim by the client form and the API route.
 * One schema means the browser and the server can never disagree about what
 * counts as valid.
 */

/** Indian mobile numbers, with or without +91 / 0 prefix and separators. */
const phoneRegex = /^(?:\+?91[-\s]?)?[6-9]\d{9}$/;

export const contactSubjects = [
  'appointment',
  'pregnancy-care',
  'womens-health',
  'internal-medicine',
  'surgery-opinion',
  'report-query',
  'other',
] as const;

export type ContactSubject = (typeof contactSubjects)[number];

export const contactSubjectLabels: Record<ContactSubject, string> = {
  appointment: 'Book an appointment',
  'pregnancy-care': 'Pregnancy / antenatal care',
  'womens-health': "Women's health concern",
  'internal-medicine': 'Internal medicine / general health',
  'surgery-opinion': 'Surgery second opinion',
  'report-query': 'Question about a report',
  other: 'Something else',
};

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(80, 'That name is too long')
    .regex(/^[\p{L}\p{M}\s.'-]+$/u, 'Please use letters only'),

  phone: z
    .string()
    .trim()
    .min(1, 'A phone number lets us call you back')
    .transform((v) => v.replace(/[\s-]/g, ''))
    .refine((v) => phoneRegex.test(v), 'Enter a valid 10-digit Indian mobile number'),

  email: z
    .string()
    .trim()
    .max(160)
    .email('Enter a valid email address')
    .or(z.literal(''))
    .optional()
    .transform((v) => (v ? v : undefined)),

  subject: z.enum(contactSubjects, { message: 'Please choose a reason for your enquiry' }),

  preferredDoctor: z
    .enum(['any', ...doctorSlugs] as [string, ...string[]])
    .default('any'),

  service: z
    .enum(['', ...serviceSlugs] as [string, ...string[]])
    .optional()
    .transform((v) => (v ? v : undefined)),

  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more — at least 10 characters')
    .max(1500, 'Please keep your message under 1500 characters'),

  consent: z.literal(true, {
    message: 'Please confirm you are happy for us to contact you',
  }),

  /**
   * Honeypot. Deliberately permissive: the schema must ACCEPT a filled value
   * so the API route can answer 200 and tell the bot nothing. Rejecting it
   * here would leak the trap — and would silently block a real user whose
   * password manager autofilled the hidden "Company website" field.
   */
  companyWebsite: z.string().max(200).optional(),
});

export type ContactFormValues = z.input<typeof contactFormSchema>;
export type ContactFormData = z.output<typeof contactFormSchema>;

/** Shape returned by POST /api/contact. */
export interface ContactApiResponse {
  readonly ok: boolean;
  readonly message: string;
  /** Field-level errors, keyed by form field name. */
  readonly fieldErrors?: Partial<Record<keyof ContactFormValues, string>>;
}
