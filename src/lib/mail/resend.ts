import 'server-only';
import type { ServerEnv } from '@/lib/env/server';
import type { Mailer, MailMessage, MailResult } from './types';

/**
 * Resend transport.
 *
 * Free tier: 3,000 emails/month, 100/day. Note that sending to an arbitrary
 * address (the clinic's inbox) requires a verified sending domain — until the
 * domain is verified, Resend only delivers to the account owner's own address.
 * If that is a blocker, use MAIL_TRANSPORT=smtp instead.
 */
export function createResendMailer(env: ServerEnv): Mailer {
  return {
    name: 'resend',
    async send(message: MailMessage): Promise<MailResult> {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
          from: message.from,
          to: [...message.to],
          subject: message.subject,
          html: message.html,
          text: message.text,
          replyTo: message.replyTo,
        });

        if (error) return { ok: false, error: error.message };
        return { ok: true, id: data?.id };
      } catch (error) {
        return {
          ok: false,
          error: error instanceof Error ? error.message : 'Unknown Resend error',
        };
      }
    },
  };
}
