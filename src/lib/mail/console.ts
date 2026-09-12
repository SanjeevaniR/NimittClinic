import 'server-only';
import type { Mailer, MailMessage, MailResult } from './types';

/**
 * Development transport: logs the message instead of sending it, so the whole
 * contact flow can be exercised locally with no credentials at all.
 * This is the default (`MAIL_TRANSPORT=console`).
 */
export function createConsoleMailer(): Mailer {
  return {
    name: 'console',
    async send(message: MailMessage): Promise<MailResult> {
      console.warn(
        [
          '',
          '─────────── ✉  MAIL (console transport — not sent) ───────────',
          `To:       ${message.to.join(', ')}`,
          `From:     ${message.from}`,
          `Reply-To: ${message.replyTo ?? '—'}`,
          `Subject:  ${message.subject}`,
          '',
          message.text,
          '──────────────────────────────────────────────────────────────',
          '',
        ].join('\n'),
      );
      return { ok: true, id: `console-${Date.now()}` };
    },
  };
}
