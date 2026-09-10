import { Fragment, type CSSProperties } from "react";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroBeams } from "./HeroBeams";

const HEADLINE = [
  { text: "O lead chega.", accent: false },
  { text: "A IA faz o trabalho.", accent: true },
  { text: "Seu time fecha.", accent: false },
] as const;

const WORD_LEAD = 0.12;
const WORD_STAGGER = 0.065;

const HEADLINE_LINES = (() => {
  let cursor = 0;

  return HEADLINE.map((line) => ({
    key: line.text,
    accent: line.accent,
    words: line.text.split(" ").map((word) => ({
      word,
      delay: WORD_LEAD + cursor++ * WORD_STAGGER,
    })),
  }));
})();

export function Hero() {
  return (
    <Section
      bleed
      className="flex min-h-[82vh] items-start overflow-hidden pt-24 md:pt-28"
    >
      <HeroBeams />
      <HeroBackdrop />
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />

      <Container className="flex flex-col items-center text-center">
        <h1 className="type-hero max-w-3xl text-balance text-text">
          {HEADLINE_LINES.map((line) => (
            <span
              key={line.key}
              className={line.accent ? "block text-accent" : "block"}
            >
              {line.words.map(({ word, delay }, index) => (
                <Fragment key={`${word}-${delay}`}>
                  {index > 0 ? " " : null}
                  <span
                    className="word-in"
                    style={{ "--word-delay": `${delay}s` } as CSSProperties}
                  >
                    {word}
                  </span>
                </Fragment>
              ))}
            </span>
          ))}
        </h1>
      </Container>
    </Section>
  );
}
