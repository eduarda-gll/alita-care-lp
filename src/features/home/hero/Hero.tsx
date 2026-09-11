import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { ShinyText } from "@/components/ShinyText";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroBeams } from "./HeroBeams";

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
        <h1 className="type-hero max-w-3xl space-y-2 text-balance text-text">
          <span className="block">O lead chega.</span>
          <span className="block text-accent">
            <ShinyText text="A IA faz o trabalho." />
          </span>
          <span className="block">Seu time fecha.</span>
        </h1>
      </Container>
    </Section>
  );
}
