import 'server-only';
import { z } from 'zod';

/**
 * Server-only environment.
 *
 * Parsed lazily (not at module load) so that `next build` never fails just
 * because mail credentials are absent in CI. The contact API route validates
 * on first use and returns a clean 503 if the transport is misconfigured.
 */

const booleanish = z
  .enum(['true', 'false', '1', '0'])
  .transform((v) => v === 'true' || v === '1');

const emailList = z
  .string()
  .trim()
  .min(1)
  .transform((v) =>
    v
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.string().email()).min(1));

const serverEnvSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    MAIL_TRANSPORT: z.enum(['smtp', 'resend', 'console']).default('console'),

    CONTACT_TO_EMAIL: emailList,
    /** Either `you@example.com` or `Name <you@example.com>`. */
    CONTACT_FROM_EMAIL: z
      .string()
      .trim()
      .min(3)
      .refine((v) => /^[^<>]*<[^<>@\s]+@[^<>@\s]+>$|^[^<>@\s]+@[^<>@\s]+$/.test(v), {
        message: 'CONTACT_FROM_EMAIL must be "email" or "Name <email>"',
      }),

    SMTP_HOST: z.string().trim().optional(),
    SMTP_PORT: z.coerce.number().int().positive().max(65535).default(465),
    SMTP_SECURE: booleanish.default('true'),
    SMTP_USER: z.string().trim().optional(),
    SMTP_PASSWORD: z.string().optional(),

    RESEND_API_KEY: z.string().trim().optional(),

    RATE_LIMIT_MAX: z.coerce.number().int().positive().max(1000).default(5),
    RATE_LIMIT_WINDOW_SECONDS: z.coerce.number().int().positive().default(900),
  })
  .superRefine((env, ctx) => {
    if (env.MAIL_TRANSPORT === 'smtp') {
      for (const key of ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD'] as const) {
        if (!env[key]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [key],
            message: `${key} is required when MAIL_TRANSPORT="smtp"`,
          });
        }
      }
    }
    if (env.MAIL_TRANSPORT === 'resend' && !env.RESEND_API_KEY) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['RESEND_API_KEY'],
        message: 'RESEND_API_KEY is required when MAIL_TRANSPORT="resend"',
      });
    }
  });

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export type ServerEnvResult =
  | { ok: true; env: ServerEnv }
  | { ok: false; errors: string[] };

let cached: ServerEnvResult | undefined;

/** Validate (once) and return the server environment. */
export function getServerEnv(): ServerEnvResult {
  if (cached) return cached;

  const parsed = serverEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    MAIL_TRANSPORT: process.env.MAIL_TRANSPORT,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX,
    RATE_LIMIT_WINDOW_SECONDS: process.env.RATE_LIMIT_WINDOW_SECONDS,
  });

  cached = parsed.success
    ? { ok: true, env: parsed.data }
    : {
        ok: false,
        errors: parsed.error.issues.map((i) => `${i.path.join('.') || 'env'}: ${i.message}`),
      };

  return cached;
}
