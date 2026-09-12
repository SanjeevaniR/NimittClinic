import { Reveal } from '@/components/motion/reveal';
import { PageHero } from '@/components/sections/page-hero';
import { Container, Section } from '@/components/ui/container';

export interface LegalBlock {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
}

interface LegalPageProps {
  readonly title: string;
  readonly intro: string;
  readonly path: string;
  readonly crumbLabel: string;
  readonly updated: string;
  readonly blocks: readonly LegalBlock[];
}

/** Shared shell for the three policy pages, so the prose styling lives once. */
export function LegalPage({
  title,
  intro,
  path,
  crumbLabel,
  updated,
  blocks,
}: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description={intro}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: crumbLabel, path },
        ]}
      />

      <Section tone="cream" spacing="md">
        <Container size="sm">
          <p className="text-ink-soft/70 text-sm">Last updated: {updated}</p>

          <div className="mt-8 space-y-10">
            {blocks.map((block, index) => (
              <Reveal key={block.heading} delay={index * 0.04}>
                <h2 className="font-display text-plum-950 text-xl font-bold">
                  {block.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {block.paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-ink-soft leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {block.bullets && (
                  <ul className="mt-4 space-y-2">
                    {block.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-ink-soft flex gap-3 text-sm leading-relaxed"
                      >
                        <span className="bg-gold-500 mt-2 size-1.5 shrink-0 rotate-45" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
