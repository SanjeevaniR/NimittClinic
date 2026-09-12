import 'server-only';
import type { ServerEnv } from '@/lib/env/server';
import { createConsoleMailer } from './console';
import { createResendMailer } from './resend';
import { createSmtpMailer } from './smtp';
import type { Mailer } from './types';

export type { Mailer, MailMessage, MailResult } from './types';

/**
 * Transport factory. Swapping providers is an env change, not a code change —
 * `MAIL_TRANSPORT` selects between SMTP (free via Gmail/Workspace), Resend and
 * a console logger for local development.
 */
export function getMailer(env: ServerEnv): Mailer {
  switch (env.MAIL_TRANSPORT) {
    case 'smtp':
      return createSmtpMailer(env);
    case 'resend':
      return createResendMailer(env);
    case 'console':
    default:
      return createConsoleMailer();
  }
}
