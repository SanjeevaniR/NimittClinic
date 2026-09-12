'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@/components/icons';
import { TiltCard } from '@/components/motion/tilt-card';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { DoctorAvatar } from '@/components/ui/doctor-avatar';
import { doctors } from '@/content/doctors';
import { siteConfig } from '@/config/site';

// Mutable tuple, not `as const` — framer-motion's BezierDefinition is
// `[number, number, number, number]` and will not accept a readonly tuple.
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const trustPoints = [
  { icon: 'shield', label: 'Board-certified specialists' },
  { icon: 'clock', label: 'Same-day appointments' },
  { icon: 'care', label: 'Unhurried consultations' },
] as const;

/**
 * Homepage hero — the plum-to-gold sweep from the design, with the two doctor
 * cards on the left and the value proposition on the right.
 *
 * On mobile the copy comes first (it carries the CTA), and the doctor cards
 * follow underneath; on large screens the order matches the mockup.
 */
export function Hero() {
  return (
    <section className="bg-brand-sweep relative isolate overflow-hidden">
      {/* --- Ambient background --- */}
      <div aria-hidden className="bg-dot-grid absolute inset-0 opacity-60" />
      <motion.div
        aria-hidden
        className="bg-gold-400/20 absolute -top-24 -right-16 size-[26rem] rounded-full blur-[110px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="bg-plum-400/25 absolute -bottom-32 -left-20 size-[24rem] rounded-full blur-[110px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          {/* ================= Doctor cards ================= */}
          <div className="order-2 grid grid-cols-2 gap-4 sm:gap-5 lg:order-1">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.slug}
                initial={{ opacity: 0, y: 44, rotate: index === 0 ? -3 : 3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.85, delay: 0.15 + index * 0.14, ease: EASE }}
              >
                <TiltCard className="group h-full">
                  <Link
                    href={`/doctors/${doctor.slug}`}
                    className="rounded-card block h-full overflow-hidden"
                  >
                    <article className="rounded-card ring-hairline-gold relative flex h-full flex-col overflow-hidden bg-white/10 shadow-lift backdrop-blur-sm">
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <DoctorAvatar
                          src={doctor.photo}
                          alt={doctor.photoAlt}
                          name={doctor.name}
                          fill
                          rounded="card"
                          priority={index === 0}
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 260px"
                          className="rounded-none transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                        {/* Legibility scrim */}
                        <span
                          aria-hidden
                          className="from-plum-950/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                        />
                      </div>

                      <div className="bg-gold-sweep text-plum-950 relative px-3.5 py-3 sm:px-4">
                        <span
                          aria-hidden
                          className="animate-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        />
                        <h2 className="font-display relative truncate text-[0.9rem] leading-tight font-bold sm:text-base">
                          {doctor.name}
                        </h2>
                        <p className="relative mt-0.5 truncate text-[0.68rem] font-medium opacity-85 sm:text-xs">
                          {doctor.specialtyShort}
                        </p>
                      </div>
                    </article>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* ================= Copy ================= */}
          <div className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="glass-plum rounded-pill text-gold-200 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase sm:text-sm sm:tracking-[0.16em]"
            >
              <Icon name="sparkle" size={14} className="text-gold-400" />
              Welcome to {siteConfig.name}, {siteConfig.address.city}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
              className="text-hero text-cream mt-5 leading-[1.04]"
            >
              Leading Specialists,
              <span className="text-gradient-gold block">Personalized Care</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
              className="text-plum-100/85 mt-5 max-w-xl text-base leading-relaxed sm:text-lg"
            >
              Obstetrics, Gynaecology and Internal Medicine under one roof. Two specialists
              who take the time to explain, so you always know what is happening and why.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button href={siteConfig.bookingHref} size="lg" icon="calendar" iconPosition="left" nudgeIcon={false}>
                Book Appointment
              </Button>
              <Button
                href={siteConfig.whatsapp.href}
                size="lg"
                variant="whatsapp"
                icon="whatsapp"
                iconPosition="left"
                nudgeIcon={false}
              >
                WhatsApp Us
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-9 flex flex-wrap gap-x-6 gap-y-3"
            >
              {trustPoints.map((point) => (
                <li
                  key={point.label}
                  className="text-plum-100/80 flex items-center gap-2 text-sm font-medium"
                >
                  <span className="bg-gold-500/20 text-gold-300 grid size-7 place-items-center rounded-full">
                    <Icon name={point.icon} size={14} />
                  </span>
                  {point.label}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </Container>

      {/* Soft transition into the next (cream) section */}
      <div
        aria-hidden
        className="from-cream absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t to-transparent"
      />
    </section>
  );
}
