import { NextResponse } from 'next/server';
import { getServerEnv } from '@/lib/env/server';
import { getMailer } from '@/lib/mail';
import { renderAcknowledgementEmail, renderContactEmail } from '@/lib/mail/templates';
import { checkRateLimit, clientIpFrom } from '@/lib/rate-limit';
import {
  contactFormSchema,
  type ContactApiResponse,
  type ContactFormValues,
} from '@/lib/validation/contact';

/** Nodemailer needs the Node runtime — it does not run on the Edge. */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 16 * 1024;

function json(body: ContactApiResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: Request): Promise<NextResponse<ContactApiResponse>> {
  /* ---------- 1. Environment ---------- */
  const envResult = getServerEnv();
  if (!envResult.ok) {
    console.error('[contact] invalid server env:', envResult.errors.join('; '));
    return json(
      {
        ok: false,
        message:
          'The contact form is temporarily unavailable. Please call or WhatsApp us instead.',
      },
      503,
    );
  }
  const env = envResult.env;

  /* ---------- 2. Rate limit ---------- */
  const ip = clientIpFrom(request.headers);
  const limit = checkRateLimit(
    `contact:${ip}`,
    env.RATE_LIMIT_MAX,
    env.RATE_LIMIT_WINDOW_SECONDS,
  );

  if (!limit.allowed) {
    return json(
      {
        ok: false,
        message: `Too many messages from this device. Please try again in ${Math.ceil(
          limit.retryAfter / 60,
        )} minute(s), or call us directly.`,
      },
      429,
      { 'Retry-After': String(limit.retryAfter) },
    );
  }

  /* ---------- 3. Parse body ---------- */
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, message: 'That message is too large.' }, 413);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: 'Could not read the submitted form.' }, 400);
  }

  /* ---------- 4. Validate ---------- */
  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === 'string' && !(field in fieldErrors)) {
        fieldErrors[field as keyof ContactFormValues] = issue.message;
      }
    }
    return json(
      { ok: false, message: 'Please check the highlighted fields.', fieldErrors },
      422,
    );
  }

  const data = parsed.data;

  /* ---------- 5. Honeypot ---------- */
  // A filled decoy field means a bot. Answer 200 so it learns nothing.
  if (data.companyWebsite) {
    return json({ ok: true, message: 'Thank you — your message has been sent.' }, 200);
  }

  /* ---------- 6. Send ---------- */
  const mailer = getMailer(env);
  const notification = renderContactEmail(data);

  const sent = await mailer.send({
    to: env.CONTACT_TO_EMAIL,
    from: env.CONTACT_FROM_EMAIL,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    // Reply in the inbox goes straight back to the patient.
    replyTo: data.email,
  });

  if (!sent.ok) {
    console.error(`[contact] ${mailer.name} send failed: ${sent.error}`);
    return json(
      {
        ok: false,
        message:
          'We could not send your message just now. Please call or WhatsApp us — we do not want you to wait.',
      },
      502,
    );
  }

  /* ---------- 7. Acknowledge the patient (best effort) ---------- */
  if (data.email) {
    const ack = renderAcknowledgementEmail(data);
    const ackResult = await mailer.send({
      to: [data.email],
      from: env.CONTACT_FROM_EMAIL,
      subject: ack.subject,
      html: ack.html,
      text: ack.text,
    });
    // A failed acknowledgement must not fail the request — the clinic already
    // has the enquiry, which is the part that matters.
    if (!ackResult.ok) {
      console.warn(`[contact] acknowledgement not sent: ${ackResult.error}`);
    }
  }

  return json(
    {
      ok: true,
      message:
        'Thank you — your message has reached the clinic. We will call you back during consultation hours.',
    },
    200,
    { 'X-RateLimit-Remaining': String(limit.remaining) },
  );
}

/** Anything other than POST is not allowed on this endpoint. */
export function GET(): NextResponse<ContactApiResponse> {
  return json({ ok: false, message: 'Method not allowed.' }, 405, { Allow: 'POST' });
}
