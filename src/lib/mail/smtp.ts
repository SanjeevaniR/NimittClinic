import 'server-only';
import type { Transporter } from 'nodemailer';
import type { ServerEnv } from '@/lib/env/server';
import type { Mailer, MailMessage, MailResult } from './types';

/**
 * SMTP transport via Nodemailer — the zero-cost option.
 *
 * Gmail / Google Workspace:
 *   SMTP_HOST=smtp.gmail.com  SMTP_PORT=465  SMTP_SECURE=true
 *   SMTP_USER=<full address>  SMTP_PASSWORD=<16-char App Password>
 * App Passwords need 2FA enabled: https://myaccount.google.com/apppasswords
 * A normal account password will be rejected.
 *
 * The transporter is created once per server instance and reused — creating a
 * connection pool per request would exhaust Gmail's rate limits quickly.
 */
let transporter: Transporter | undefined;

async function getTransporter(env: ServerEnv): Promise<Transporter> {
  if (transporter) return transporter;

  const nodemailer = await import('nodemailer');

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE, // true for 465, false for 587 (STARTTLS)
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
    pool: true,
    maxConnections: 3,
    maxMessages: 50,
    connectionTimeout: 12_000,
    greetingTimeout: 8_000,
    socketTimeout: 20_000,
  });

  return transporter;
}

export function createSmtpMailer(env: ServerEnv): Mailer {
  return {
    name: 'smtp',
    async send(message: MailMessage): Promise<MailResult> {
      try {
        const tx = await getTransporter(env);
        const info = await tx.sendMail({
          to: [...message.to],
          from: message.from,
          subject: message.subject,
          html: message.html,
          text: message.text,
          replyTo: message.replyTo,
        });
        return { ok: true, id: info.messageId };
      } catch (error) {
        // Reset so a transient auth/DNS failure does not poison the pool.
        transporter = undefined;
        return {
          ok: false,
          error: error instanceof Error ? error.message : 'Unknown SMTP error',
        };
      }
    },
  };
}
