import type { LegalBlock } from '@/components/sections/legal-page';
import { siteConfig } from '@/config/site';

/**
 * ⚠️ VERIFY BEFORE LAUNCH
 * These are reasonable starting drafts, not legal advice. Have them reviewed
 * against India's DPDP Act 2023, the NMC's Telemedicine Practice Guidelines and
 * MCI advertising rules before publishing.
 */

export const LEGAL_UPDATED = '8 September 2026';

export const privacyBlocks: readonly LegalBlock[] = [
  {
    heading: 'What this policy covers',
    paragraphs: [
      `This policy explains what ${siteConfig.name} does with the information you give us through this website. It does not cover the clinical records we keep as your treating doctors, which are governed by medical record-keeping obligations and our duty of confidentiality.`,
    ],
  },
  {
    heading: 'Information we collect',
    paragraphs: [
      'We only collect what you type into the contact form, plus basic technical data your browser sends with any web request.',
    ],
    bullets: [
      'Your name, mobile number and, if you choose to give it, your email address.',
      'The reason for your enquiry, the doctor or service you selected, and your message.',
      'Your confirmation that we may contact you about the enquiry.',
      'Your IP address, used solely to rate-limit the form against automated abuse.',
    ],
  },
  {
    heading: 'How we use it',
    paragraphs: [
      'Contact-form submissions are emailed to the clinic inbox and used to respond to your enquiry — to call you back, book an appointment or answer a question. If you supplied an email address, we send you an automatic acknowledgement.',
      'We do not use your details for marketing, we do not sell them, and we do not share them with advertisers or data brokers.',
    ],
  },
  {
    heading: 'Please do not send clinical details by email',
    paragraphs: [
      'Email and web forms are not secure channels for sensitive health information. Send only enough detail for us to route your enquiry — the clinical conversation belongs in the consultation room, on a phone call, or in the clinic.',
    ],
  },
  {
    heading: 'Cookies and analytics',
    paragraphs: [
      'This website sets no advertising or tracking cookies and embeds no third-party analytics or social pixels. Fonts are served from the site itself rather than a third-party CDN.',
      'The location map is an embedded Google Maps frame. If you interact with it, Google receives that request under its own privacy policy; if you do not, no personal data is sent to it by us.',
    ],
  },
  {
    heading: 'How long we keep it',
    paragraphs: [
      'Enquiry emails are retained in the clinic mailbox for as long as needed to deal with your request and to keep a record of the correspondence, and are then deleted. Rate-limiting records are held in memory only and expire within minutes.',
    ],
  },
  {
    heading: 'Your rights',
    paragraphs: [
      `You can ask us what enquiry data we hold about you, ask for it to be corrected, or ask us to delete it. Write to ${siteConfig.contact.email} and we will respond within a reasonable period. Requests relating to your clinical records should be made at the clinic in person, with proof of identity.`,
    ],
  },
  {
    heading: 'Changes and contact',
    paragraphs: [
      `We may update this policy; the date at the top will change when we do. Questions about it can go to ${siteConfig.contact.email} or ${siteConfig.contact.phoneDisplay}.`,
    ],
  },
];

export const termsBlocks: readonly LegalBlock[] = [
  {
    heading: 'Acceptance',
    paragraphs: [
      `By using this website you agree to these terms. If you do not agree with them, please do not use the site — you are always welcome to contact ${siteConfig.name} by phone instead.`,
    ],
  },
  {
    heading: 'The website is information, not treatment',
    paragraphs: [
      'The content here describes the services offered at the clinic and gives general health information. It is not medical advice, it does not create a doctor–patient relationship, and it must not be used to diagnose or treat any condition. Only a consultation can do that.',
    ],
  },
  {
    heading: 'Appointments and enquiries',
    paragraphs: [
      'Submitting the contact form is a request, not a confirmed appointment. An appointment exists only once the clinic has confirmed it with you by phone, WhatsApp or in person. We may need to reschedule occasionally — for example when a delivery or an emergency overruns — and will tell you as early as we can.',
    ],
  },
  {
    heading: 'Acceptable use',
    paragraphs: ['When using this site, please do not:'],
    bullets: [
      'Submit false information, or another person’s details without their consent.',
      'Use the contact form to send bulk, automated or commercial messages.',
      'Attempt to disrupt, probe or gain unauthorised access to the site or its systems.',
      'Copy the text, images or design of this site for use elsewhere without permission.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      `All text, images, logos and design on this site belong to ${siteConfig.name} unless stated otherwise, and may not be reproduced without written permission.`,
    ],
  },
  {
    heading: 'Third-party links',
    paragraphs: [
      'Where we link to external sites — a partner hospital, a health resource, a map — we do not control their content and are not responsible for it.',
    ],
  },
  {
    heading: 'Limitation of liability',
    paragraphs: [
      'We work to keep this site accurate and available, but we do not guarantee that it is error-free or uninterrupted. To the extent permitted by law, we are not liable for any loss arising from reliance on the information here. Nothing in these terms limits our professional responsibility to patients we actually treat.',
    ],
  },
  {
    heading: 'Governing law',
    paragraphs: [
      `These terms are governed by the laws of India, and the courts at ${siteConfig.address.city}, ${siteConfig.address.state} have exclusive jurisdiction over any dispute arising from them.`,
    ],
  },
];

export const disclaimerBlocks: readonly LegalBlock[] = [
  {
    heading: 'No doctor–patient relationship',
    paragraphs: [
      'Reading this website, or sending an enquiry through it, does not make you a patient of this clinic. A doctor–patient relationship begins only at a consultation, in person or in a scheduled teleconsultation.',
    ],
  },
  {
    heading: 'Not a substitute for medical advice',
    paragraphs: [
      'The health information here is general, written for a wide audience, and cannot account for your history, your medications or your circumstances. Never delay seeking care, and never stop or change a prescribed medicine, on the basis of something you read on a website — including this one.',
    ],
  },
  {
    heading: 'Emergencies',
    paragraphs: [
      `This website is not monitored around the clock and the contact form is not an emergency channel. In an emergency, call ${siteConfig.contact.phoneDisplay} or go to the nearest emergency department immediately.`,
    ],
  },
  {
    heading: 'Outcomes vary',
    paragraphs: [
      'Any description of a treatment, procedure or recovery time is typical, not promised. Individual outcomes depend on the condition, its stage, coexisting illness and factors that cannot be known before assessment. No guarantee of result is given or implied.',
    ],
  },
  {
    heading: 'Patient testimonials',
    paragraphs: [
      'Testimonials are shared with the patient’s consent and describe one person’s experience. They are not a prediction of what your treatment or outcome will be.',
    ],
  },
  {
    heading: 'Credentials and no solicitation',
    paragraphs: [
      'Qualifications and registration details are published in good faith and can be verified with the relevant State Medical Council. In keeping with Indian medical council guidance, this site is intended to inform patients — not to solicit or advertise treatment.',
    ],
  },
];
