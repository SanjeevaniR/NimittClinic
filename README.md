# Nimitt Clinic — Website

Marketing and appointment site for **Nimitt Clinic, Indore** — Obstetrics,
Gynaecology and Internal Medicine. Built with Next.js 15 (App Router),
TypeScript in strict mode, Tailwind CSS v4 and Framer Motion.

---

## Quick start

```bash
nvm use              
npm install
npm run dev          
```


## Architecture
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

Set every variable from `.env.example` in the host's environment.
`NEXT_PUBLIC_SITE_URL` must be the real HTTPS origin