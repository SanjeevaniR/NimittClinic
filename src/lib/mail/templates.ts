import 'server-only';
import { getDoctorBySlug } from '@/content/doctors';
import { getServiceBySlug } from '@/content/services';
import { siteConfig } from '@/config/site';
import type { ContactFormData } from '@/lib/validation/contact';
import { contactSubjectLabels } from '@/lib/validation/contact';

/** Escape user-supplied text before it goes anywhere near an HTML email. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatSubmittedAt(): string {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date());
}

interface Row {
  readonly label: string;
  readonly value: string;
  readonly href?: string;
}

function buildRows(data: ContactFormData): Row[] {
  const doctor =
    data.preferredDoctor && data.preferredDoctor !== 'any'
      ? getDoctorBySlug(data.preferredDoctor)?.name
      : 'No preference';

  const service = data.service ? getServiceBySlug(data.service)?.title : undefined;
  const digits = data.phone.replace(/[^\d]/g, '');
  const waNumber = digits.length === 10 ? `91${digits}` : digits;

  const rows: Row[] = [
    { label: 'Patient name', value: data.name },
    { label: 'Phone', value: data.phone, href: `tel:+${waNumber}` },
    { label: 'WhatsApp', value: `Message ${data.name}`, href: `https://wa.me/${waNumber}` },
  ];

  if (data.email) rows.push({ label: 'Email', value: data.email, href: `mailto:${data.email}` });
  rows.push({ label: 'Reason', value: contactSubjectLabels[data.subject] });
  if (service) rows.push({ label: 'Service', value: service });
  rows.push({ label: 'Preferred doctor', value: doctor ?? 'No preference' });
  rows.push({ label: 'Submitted', value: formatSubmittedAt() });

  return rows;
}

export interface RenderedEmail {
  readonly subject: string;
  readonly html: string;
  readonly text: string;
}

/**
 * Notification sent to the clinic inbox.
 *
 * Table-based layout with inline styles — the only thing that renders
 * consistently across Gmail, Outlook and mobile clients.
 */
export function renderContactEmail(data: ContactFormData): RenderedEmail {
  const rows = buildRows(data);
  const subject = `New enquiry — ${data.name} (${contactSubjectLabels[data.subject]})`;

  const rowsHtml = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #f3e6f7;font:600 12px/1.4 Arial,sans-serif;color:#7d3190;text-transform:uppercase;letter-spacing:.06em;white-space:nowrap;vertical-align:top">${esc(
            row.label,
          )}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #f3e6f7;font:400 15px/1.5 Arial,sans-serif;color:#1c1720">${
            row.href
              ? `<a href="${esc(row.href)}" style="color:#6b2a7b;text-decoration:underline">${esc(
                  row.value,
                )}</a>`
              : esc(row.value)
          }</td>
        </tr>`,
    )
    .join('');

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(subject)}</title></head>
<body style="margin:0;padding:24px 12px;background:#f7f4f9">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px -12px rgba(43,10,49,.22)">
    <tr>
      <td style="background:linear-gradient(112deg,#2b0a31 0%,#43124c 40%,#6b2a7b 75%,#b8912c 100%);padding:26px 28px">
        <p style="margin:0;font:700 20px/1.3 Arial,sans-serif;color:#fffdf8">${esc(
          siteConfig.name,
        )} — Website Enquiry</p>
        <p style="margin:6px 0 0;font:400 13px/1.4 Arial,sans-serif;color:#f4df99">A patient submitted the contact form</p>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 12px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 28px 8px">
        <p style="margin:0 0 8px;font:600 12px/1.4 Arial,sans-serif;color:#7d3190;text-transform:uppercase;letter-spacing:.06em">Message</p>
        <div style="padding:14px 16px;background:#faf4fc;border-left:4px solid #d4af37;border-radius:8px;font:400 15px/1.65 Arial,sans-serif;color:#1c1720;white-space:pre-wrap">${esc(
          data.message,
        )}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 28px 28px">
        <a href="tel:${esc(data.phone)}" style="display:inline-block;padding:12px 22px;border-radius:999px;background:linear-gradient(100deg,#b8912c,#ebc965);color:#2b0a31;font:700 14px/1 Arial,sans-serif;text-decoration:none">Call ${esc(
          data.name,
        )}</a>
        <p style="margin:18px 0 0;font:400 12px/1.6 Arial,sans-serif;color:#6b6472">
          Sent from the contact form at
          <a href="${esc(siteConfig.url)}" style="color:#6b2a7b">${esc(siteConfig.url)}</a>.
          Reply to this email to respond to the patient directly.
        </p>
      </td>
    </tr>
  </table>
</body></html>`;

  const text = [
    `${siteConfig.name} — website enquiry`,
    '',
    ...rows.map((row) => `${row.label}: ${row.value}`),
    '',
    'Message:',
    data.message,
    '',
    `Sent from ${siteConfig.url}`,
  ].join('\n');

  return { subject, html, text };
}

/** Optional auto-acknowledgement to the patient, when they gave an email. */
export function renderAcknowledgementEmail(data: ContactFormData): RenderedEmail {
  const subject = `We have received your message — ${siteConfig.name}`;

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(subject)}</title></head>
<body style="margin:0;padding:24px 12px;background:#f7f4f9">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">
    <tr>
      <td style="background:linear-gradient(112deg,#2b0a31,#6b2a7b);padding:26px 28px">
        <p style="margin:0;font:700 19px/1.3 Arial,sans-serif;color:#fffdf8">${esc(
          siteConfig.name,
        )}</p>
        <p style="margin:6px 0 0;font:400 13px/1.4 Arial,sans-serif;color:#f4df99">${esc(
          siteConfig.tagline,
        )}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:26px 28px">
        <p style="margin:0 0 14px;font:400 16px/1.6 Arial,sans-serif;color:#1c1720">Dear ${esc(
          data.name,
        )},</p>
        <p style="margin:0 0 14px;font:400 15px/1.7 Arial,sans-serif;color:#4a4351">
          Thank you for contacting ${esc(
            siteConfig.name,
          )}. We have received your message and our front desk will call you back on
          <strong>${esc(data.phone)}</strong> during clinic hours.
        </p>
        <p style="margin:0 0 18px;font:400 15px/1.7 Arial,sans-serif;color:#4a4351">
          If your concern is urgent, please call us directly on
          <a href="${esc(siteConfig.contact.phoneHref)}" style="color:#6b2a7b;font-weight:bold">${esc(
            siteConfig.contact.phoneDisplay,
          )}</a>
          or message us on WhatsApp — do not wait for this email.
        </p>
        <a href="${esc(
          siteConfig.whatsapp.href,
        )}" style="display:inline-block;padding:12px 22px;border-radius:999px;background:#25D366;color:#ffffff;font:700 14px/1 Arial,sans-serif;text-decoration:none">Chat on WhatsApp</a>
        <p style="margin:24px 0 0;font:400 12px/1.6 Arial,sans-serif;color:#6b6472">
          ${esc(siteConfig.address.oneLine)}<br>
          This is an automated acknowledgement. Please do not send medical
          emergencies or clinical details by email.
        </p>
      </td>
    </tr>
  </table>
</body></html>`;

  const text = [
    `Dear ${data.name},`,
    '',
    `Thank you for contacting ${siteConfig.name}. We have received your message and will call you back on ${data.phone} during clinic hours.`,
    '',
    `If your concern is urgent, call us on ${siteConfig.contact.phoneDisplay} or message us on WhatsApp instead of waiting for this email.`,
    '',
    siteConfig.address.oneLine,
    '',
    'This is an automated acknowledgement — please do not reply with clinical details.',
  ].join('\n');

  return { subject, html, text };
}
