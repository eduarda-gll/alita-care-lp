import { ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { CTA_URL } from "@/constants";


export function Cta() {
  return (
    <Section labelledBy="cta-titulo">
      <Reveal>
        <div className="relative overflow-hidden rounded-card border border-border bg-surface px-6 py-14 text-center md:px-12 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, var(--color-glow-core), transparent 72%)",
            }}
          />

          <div className="relative flex flex-col items-center gap-8">
            <h2
              id="cta-titulo"
              className="type-display max-w-2xl text-balance text-text"
            >
              Enquanto ninguém responde, o lead está falando com outra empresa
            </h2>
            <p className="type-lead max-w-md text-pretty text-text-muted">
              Coloque a Alita para atender o primeiro contato e receba o lead já
              qualificado, com a reunião marcada.
            </p>
            <ButtonLink href={CTA_URL} size="lg" className="group mt-2 gap-0">
              Começar agora
              <span className="ml-0 grid w-0 place-items-center overflow-hidden opacity-0 transition-[width,opacity,margin] duration-300 ease-out-soft group-hover:ml-2 group-hover:w-4 group-hover:opacity-100">
                <ArrowRight aria-hidden className="size-4 shrink-0" />
              </span>
            </ButtonLink>
            {}
            <p className="type-caption text-text-subtle">
              Comece pelo plano gratuito e evolua quando fizer sentido.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
