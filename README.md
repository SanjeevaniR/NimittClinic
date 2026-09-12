# Nimitt Clinic — Website

Marketing and appointment site for **Nimitt Clinic, Indore** — Obstetrics,
Gynaecology and Internal Medicine. Built with Next.js 15 (App Router),
TypeScript in strict mode, Tailwind CSS v4 and Framer Motion.

---

## Quick start

```bash
nvm use              # Node 20.11+ (22 LTS also fine)
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

`MAIL_TRANSPORT` defaults to `console`, so the contact form works end to end
with no credentials — submissions are printed in the terminal instead of sent.

### Scripts

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                          |
| `npm run build`     | Production build (fails on type or lint errors)     |
| `npm start`         | Serve the production build                          |
| `npm run typecheck` | `tsc --noEmit`                                      |
| `npm run lint`      | ESLint (flat config, `next/core-web-vitals`)        |
| `npm run format`    | Prettier, with Tailwind class sorting               |
| `npm run verify`    | typecheck → lint → build. Run before every deploy.  |

---

## Before you go live

Four things in the codebase are deliberately marked and must be corrected —
grep for `TODO` and `VERIFY BEFORE LAUNCH`.

1. **`.env.local`** — real phone number, email, WhatsApp number, address,
   coordinates and map embed URL. Every placeholder is listed in
   `.env.example`.
2. **`src/content/doctors.ts`** — degrees, fellowships, medical council
   registration numbers and years of experience are realistic *placeholders*.
   Publishing unverified medical credentials is a regulatory risk. Confirm
   every line with each doctor.
3. **`src/content/site-content.ts`** — `testimonials` are written examples.
   Replace them with real, consented patient reviews before launch. So are the
   figures in `stats`.
4. **`src/content/legal.ts`** — the privacy policy, terms and disclaimer are
   drafts, not legal advice. Have them reviewed against India's DPDP Act 2023
   and the applicable medical council advertising rules.

Then add the two doctor photographs — see
`public/images/doctors/README.md` for the spec. Until they exist the site
renders a plum-and-gold monogram, so nothing looks broken in the meantime.

---

## Architecture

```
src/
├── app/                        Routes (App Router)
│   ├── layout.tsx              Shell: fonts, metadata, header/footer, JSON-LD
│   ├── page.tsx                Homepage — composes section components
│   ├── about/ contact/ patient-care/
│   ├── doctors/                Index + [slug] (statically generated)
│   ├── services/               Index + [slug] (statically generated)
│   ├── privacy-policy/ terms/ disclaimer/
│   ├── api/contact/route.ts    Contact form endpoint (Node runtime)
│   ├── sitemap.ts robots.ts    Generated from the content layer
│   ├── opengraph-image.tsx     Social card, rendered with next/og
│   └── globals.css             Design tokens + custom utilities
│
├── components/
│   ├── layout/                 Header, Footer, WhatsApp FAB
│   ├── sections/               Page-level compositions (Hero, Services, …)
│   ├── ui/                     Primitives (Button, Container, Field, …)
│   ├── motion/                 Reveal, StaggerGroup, Counter, TiltCard, …
│   ├── forms/contact-form.tsx  react-hook-form + shared zod schema
│   ├── seo/json-ld.tsx         Structured-data renderer
│   └── icons.tsx               Hand-rolled icon set (no icon library)
│
├── config/                     site.ts (env-driven), navigation.ts
├── content/                    Typed content: doctors, services, FAQs, legal
└── lib/
    ├── env/                    public.ts + server.ts, both zod-validated
    ├── mail/                   Pluggable mailer: smtp | resend | console
    ├── validation/contact.ts   One schema, shared by client and server
    ├── rate-limit.ts           Fixed-window limiter
    ├── seo.ts                  Metadata + JSON-LD builders
    └── utils.ts
```

### Principles worth knowing before you edit

- **Nothing about the clinic is hardcoded.** Name, phone, email, WhatsApp
  number, address, hours and social links all come from `src/config/site.ts`,
  which reads validated environment variables. The same build serves staging
  and production.
- **Content is data, not markup.** Doctors, services, FAQs and legal copy live
  in `src/content/` as typed objects. Adding a third doctor means adding one
  entry — the homepage cards, `/doctors`, the detail page, the sitemap, the
  contact-form dropdown and the JSON-LD all pick it up automatically.
- **One validation schema.** `src/lib/validation/contact.ts` is imported by
  both the browser form and the API route, so the two can never disagree about
  what counts as valid.
- **Server/client boundary is explicit.** Only files that genuinely need
  interactivity carry `'use client'`. Everything else — including the whole
  footer, all service and doctor pages — renders on the server.
- **Motion respects the user.** `MotionConfig reducedMotion="user"` plus a
  `prefers-reduced-motion` block in `globals.css` mean every animation is
  disabled for users who ask for that, and no animation shifts layout.

---

## The contact form

```
Browser                          Server
───────                          ──────
ContactForm  ──POST /api/contact──▶  validate env
 (zod, RHF)                          rate-limit by IP
                                     parse with the SAME zod schema
                                     honeypot check
                                     mailer.send()  → clinic inbox
                                     mailer.send()  → patient acknowledgement
◀── { ok, message, fieldErrors } ──
```

Protections in place: a shared zod schema, an off-screen honeypot field, a
16 KB body cap, a fixed-window per-IP rate limit, and `Reply-To` set to the
patient so the front desk can just hit reply.

The in-memory rate limiter is per Node process. On a single instance that is
fine; if this ever runs across many serverless instances and abuse becomes
real, swap the body of `checkRateLimit` for Upstash Redis or Vercel KV — the
signature is designed so no caller has to change.

### Choosing a mail transport

Set `MAIL_TRANSPORT` to one of:

**`console`** (default) — logs the email, sends nothing. For local development.

**`smtp`** — free, and the recommended production option for a single clinic.
With Gmail or Google Workspace:

```env
MAIL_TRANSPORT=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=frontdesk@yourdomain.com
SMTP_PASSWORD=<16-character App Password>
CONTACT_TO_EMAIL=frontdesk@yourdomain.com
CONTACT_FROM_EMAIL=Nimitt Clinic Website <frontdesk@yourdomain.com>
```

The App Password comes from <https://myaccount.google.com/apppasswords> and
requires 2-step verification on the account. A normal account password will be
rejected. `CONTACT_FROM_EMAIL` must be the authenticated mailbox, or Gmail will
rewrite or reject the message. Limit is roughly 500 messages a day, which is
far more than a clinic contact form will ever use.

**`resend`** — 3,000 emails/month free, nicer deliverability reporting. Note
that sending to the clinic's own inbox requires a **verified sending domain**;
until the domain is verified Resend only delivers to the account owner's
address. Set `RESEND_API_KEY` and a `CONTACT_FROM_EMAIL` on the verified
domain.

Adding a fourth provider means one file in `src/lib/mail/` implementing the
`Mailer` interface, plus one line in the `getMailer` switch.

---

## WhatsApp

`NEXT_PUBLIC_WHATSAPP_NUMBER` is the business number in **international format,
digits only** — no `+`, no spaces, no dashes. For India that means country code
`91` followed by the ten-digit number, e.g. `917000000000`. The env schema
rejects anything else, so a mistake fails fast at boot rather than producing a
dead link.

All WhatsApp entry points (the floating button, the header drawer, the footer,
and the buttons on every page) build their link from
`siteConfig.whatsapp.href`, which is a `wa.me` deep link carrying the
prefilled message from `NEXT_PUBLIC_WHATSAPP_MESSAGE`. `wa.me` opens the native
app on mobile, the desktop app if installed, and WhatsApp Web otherwise — no
SDK, no script, nothing to load.

---

## SEO

- Per-page metadata with canonical URLs, Open Graph and Twitter cards, via
  `pageMetadata()`.
- `MedicalClinic` + `LocalBusiness` structured data with both physicians as
  `employee` nodes, opening hours, geo coordinates and `availableService`.
- `Physician`, `MedicalProcedure`, `FAQPage` and `BreadcrumbList` on the pages
  where each applies.
- `sitemap.xml` and `robots.txt` generated from the content layer. Non-HTTPS
  origins are set to `disallow: /`, so staging cannot be indexed by accident.
- A `next/og` social card at `/opengraph-image`, using system fonts so no
  font file is fetched at build time.

---

## Accessibility

- Skip-to-content link, semantic landmarks, one `h1` per page.
- Every interactive element is keyboard reachable with a visible gold focus
  ring; the mobile drawer traps nothing but closes on `Escape` and locks body
  scroll while open.
- Icons are `aria-hidden`; icon-only controls carry `aria-label`.
- Form fields are properly labelled, with `aria-invalid` and
  `aria-describedby` pointing at the error or hint text, and errors announced
  via `role="alert"`.
- The animated stat counters expose the final value to screen readers rather
  than the ticking one.
- Colour pairings target WCAG AA; the plum/gold combination is the one place
  worth re-checking if you change the palette.

---

## Deployment

Works unchanged on Vercel; also fine on any Node host or in a container.

```bash
npm run verify        # must pass
```

Set every variable from `.env.example` in the host's environment.
`NEXT_PUBLIC_SITE_URL` must be the real HTTPS origin — canonical URLs, the
sitemap and `robots.txt` all derive from it, and a wrong value here is the
single easiest way to damage the site's SEO.

Security headers (HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`) are set in `next.config.ts`. The CSP allows Google Fonts
and a Google Maps iframe and nothing else — if you later add an analytics
script or a booking widget, that policy is the file to update.
