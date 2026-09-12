'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  FieldShell,
  HoneypotField,
  Select,
  TextArea,
  TextInput,
} from '@/components/ui/field';
import { doctors } from '@/content/doctors';
import { services } from '@/content/services';
import { siteConfig } from '@/config/site';
import {
  contactFormSchema,
  contactSubjectLabels,
  contactSubjects,
  type ContactApiResponse,
  type ContactFormValues,
} from '@/lib/validation/contact';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const MESSAGE_MAX = 1500;

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    // Same schema the API route enforces — the browser can never disagree
    // with the server about what is valid.
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      subject: 'appointment',
      preferredDoctor: 'any',
      service: '',
      message: '',
      consent: undefined,
      companyWebsite: '',
    },
  });

  const messageLength = watch('message')?.length ?? 0;

  const onSubmit = handleSubmit(async (values) => {
    setStatus('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as ContactApiResponse;

      if (!response.ok || !result.ok) {
        // Re-project server-side field errors back onto the form.
        if (result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            if (message) {
              setError(field as keyof ContactFormValues, { type: 'server', message });
            }
          }
        }
        setStatus('error');
        setServerMessage(result.message || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setServerMessage(result.message);
      reset();
    } catch {
      setStatus('error');
      setServerMessage(
        'We could not reach the clinic just now. Please check your connection, or call us directly.',
      );
    }
  });

  const busy = status === 'submitting' || isSubmitting;

  /* ------------------------- Success state ------------------------- */
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        role="status"
        aria-live="polite"
        className="rounded-card border-plum-100 flex flex-col items-center border bg-white px-6 py-12 text-center shadow-soft"
      >
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.12, type: 'spring', stiffness: 260, damping: 16 }}
          className="bg-gold-sweep text-plum-950 grid size-16 place-items-center rounded-full shadow-gold"
        >
          <Icon name="check" size={32} />
        </motion.span>

        <h3 className="font-display text-plum-950 mt-6 text-2xl font-bold">
          Message received
        </h3>
        <p className="text-ink-soft mt-3 max-w-md leading-relaxed">{serverMessage}</p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button
            href={siteConfig.whatsapp.href}
            variant="whatsapp"
            icon="whatsapp"
            iconPosition="left"
            nudgeIcon={false}
          >
            Continue on WhatsApp
          </Button>
          <Button variant="outline" icon="arrow-right" onClick={() => setStatus('idle')}>
            Send another message
          </Button>
        </div>
      </motion.div>
    );
  }

  /* ---------------------------- The form --------------------------- */
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-card border-plum-100 relative border bg-white p-6 shadow-soft sm:p-8"
    >
      <h3 className="font-display text-plum-950 text-xl font-bold">Send us a message</h3>
      <p className="text-ink-soft mt-1.5 text-sm">
        Fields marked <span className="text-gold-600 font-bold">*</span> are required. We
        reply during consultation hours.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <FieldShell id="name" label="Full name" required error={errors.name?.message}>
          <TextInput
            id="name"
            autoComplete="name"
            placeholder="e.g. Priya Sharma"
            invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
        </FieldShell>

        <FieldShell
          id="phone"
          label="Mobile number"
          required
          hint="We will call you back on this number."
          error={errors.phone?.message}
        >
          <TextInput
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
            {...register('phone')}
          />
        </FieldShell>

        <FieldShell
          id="email"
          label="Email"
          hint="Optional — for a written acknowledgement."
          error={errors.email?.message}
        >
          <TextInput
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : 'email-hint'}
            {...register('email')}
          />
        </FieldShell>

        <FieldShell
          id="subject"
          label="Reason for enquiry"
          required
          error={errors.subject?.message}
        >
          <Select id="subject" invalid={Boolean(errors.subject)} {...register('subject')}>
            {contactSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {contactSubjectLabels[subject]}
              </option>
            ))}
          </Select>
        </FieldShell>

        <FieldShell id="preferredDoctor" label="Preferred doctor">
          <Select id="preferredDoctor" {...register('preferredDoctor')}>
            <option value="any">No preference — advise me</option>
            {doctors.map((doctor) => (
              <option key={doctor.slug} value={doctor.slug}>
                {doctor.name} — {doctor.specialtyShort}
              </option>
            ))}
          </Select>
        </FieldShell>

        <FieldShell id="service" label="Related service">
          <Select id="service" {...register('service')}>
            <option value="">Not sure / not applicable</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.shortTitle}
              </option>
            ))}
          </Select>
        </FieldShell>

        <FieldShell
          id="message"
          label="How can we help?"
          required
          className="sm:col-span-2"
          hint={`${messageLength}/${MESSAGE_MAX} characters. Please do not send sensitive medical details.`}
          error={errors.message?.message}
        >
          <TextArea
            id="message"
            rows={5}
            maxLength={MESSAGE_MAX}
            placeholder="Describe your concern in a few lines, and mention any days or times that suit you."
            invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : 'message-hint'}
            {...register('message')}
          />
        </FieldShell>
      </div>

      {/* Consent */}
      <div className="mt-6">
        <label
          htmlFor="consent"
          className="text-ink-soft flex cursor-pointer items-start gap-3 text-sm leading-relaxed"
        >
          <input
            id="consent"
            type="checkbox"
            className="accent-plum-700 border-plum-200 mt-0.5 size-5 shrink-0 cursor-pointer rounded"
            aria-invalid={Boolean(errors.consent) || undefined}
            {...register('consent')}
          />
          <span>
            I agree that {siteConfig.name} may contact me by phone, WhatsApp or email about
            this enquiry.
            <span className="text-gold-600 ml-1 font-bold" aria-hidden>
              *
            </span>
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-600">
            <Icon name="alert" size={14} />
            {errors.consent.message}
          </p>
        )}
      </div>

      <HoneypotField {...register('companyWebsite')} />

      {/* Server-level error banner */}
      <AnimatePresence>
        {status === 'error' && serverMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="overflow-hidden"
          >
            <p className="mt-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <Icon name="alert" size={17} className="mt-0.5 shrink-0" />
              {serverMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={busy}
          icon={busy ? undefined : 'arrow-right'}
          className="sm:w-auto"
          fullWidth
        >
          {busy ? (
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="border-plum-950/30 border-t-plum-950 size-4 animate-spin rounded-full border-2"
              />
              Sending…
            </span>
          ) : (
            'Send Message'
          )}
        </Button>

        <p className="text-ink-soft/70 text-xs sm:max-w-xs">
          In an emergency, call{' '}
          <a
            href={siteConfig.contact.phoneHref}
            className="text-plum-700 font-semibold underline"
          >
            {siteConfig.contact.phoneDisplay}
          </a>{' '}
          — do not wait for a reply.
        </p>
      </div>
    </form>
  );
}
