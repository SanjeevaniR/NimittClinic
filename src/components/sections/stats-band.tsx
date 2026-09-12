import { Counter } from '@/components/motion/counter';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { stats } from '@/content/site-content';

/**
 * Thin plum band of animated counters, sandwiched between the pale sections
 * to break up the page rhythm.
 */
export function StatsBand() {
  return (
    <section className="from-plum-900 via-plum-950 to-plum-900 relative overflow-hidden bg-gradient-to-r py-12 lg:py-14">
      <div aria-hidden className="bg-dot-grid absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="bg-gold-500/15 absolute top-1/2 left-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
      />

      <Container className="relative">
        <StaggerGroup
          as="ul"
          className="divide-plum-700/50 grid grid-cols-2 gap-y-8 sm:divide-x lg:grid-cols-4"
          stagger={0.12}
        >
          {stats.map((stat) => (
            <StaggerItem as="li" key={stat.label} className="px-2 text-center">
              <p className="font-display text-gradient-gold text-3xl font-extrabold sm:text-4xl lg:text-[2.75rem]">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-plum-200/80 mt-1.5 text-xs font-semibold tracking-[0.12em] uppercase sm:text-sm sm:tracking-[0.14em]">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
