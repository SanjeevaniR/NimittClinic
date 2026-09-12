import { Icon } from '@/components/icons';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';

/**
 * The gold "Emergency Care" bar from the design — a single tap-to-call target
 * with a sweeping sheen. Anchored as a link rather than a button so it works
 * with no JavaScript.
 */
export function EmergencyCta() {
  return (
    <section className="bg-plum-950 relative overflow-hidden py-12 lg:py-14">
      <div aria-hidden className="bg-dot-grid absolute inset-0 opacity-30" />

      <Container className="relative">
        <Reveal>
          <a
            href={siteConfig.contact.phoneHref}
            className="bg-gold-sweep group text-plum-950 relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl px-6 py-6 shadow-gold transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_54px_-14px_rgb(212_175_55/0.8)] sm:flex-row sm:gap-6 sm:px-9 sm:py-7"
          >
            <span
              aria-hidden
              className="animate-shimmer absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />

            <span className="bg-plum-950/12 relative grid size-14 shrink-0 place-items-center rounded-2xl">
              <Icon name="alert" size={28} />
            </span>

            <span className="relative flex-1 text-center sm:text-left">
              <span className="font-display block text-xl leading-tight font-extrabold sm:text-2xl">
                Emergency Care
              </span>
              <span className="mt-1 block text-sm font-medium opacity-85">
                Bleeding, severe pain, reduced fetal movement, chest pain or very high sugar —
                call us now on {siteConfig.contact.phoneDisplay}.
              </span>
            </span>

            <span className="bg-plum-950 text-gold-300 relative grid size-12 shrink-0 place-items-center rounded-full transition-transform duration-500 group-hover:translate-x-2 group-hover:scale-110">
              <Icon name="arrow-right" size={22} />
            </span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
