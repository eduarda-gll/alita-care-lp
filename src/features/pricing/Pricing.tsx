import { Check } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { CTA_URL } from "@/constants";
import { cn } from "@/lib/cn";
import { PLANS } from "./plans";

/**
 * Página de planos.
 *
 * A malha de fundo é o traço do Figma para esta página. Ela sai de
 * `--color-grid-line`, então acompanha o tema: quase invisível no claro, um
 * reticulado discreto no escuro.
 */
export function Pricing() {
  return (
    <Section labelledBy="planos-titulo" className="pt-14 md:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)",
        }}
      />

      <div className="flex flex-col items-center gap-4 text-center">
        <p className="type-eyebrow text-accent">Planos</p>
        <h1
          id="planos-titulo"
          className="type-hero max-w-3xl text-balance text-text"
        >
          Planos sob medida para o seu ritmo de vendas
        </h1>
        <p className="type-lead max-w-2xl text-pretty text-text-muted">
          Escolha o tamanho ideal para o seu time hoje e mude de plano quando
          precisar. O limite é por uso simultâneo: ao concluir uma prospecção, a vaga
          libera na hora para o próximo lead.
        </p>
      </div>

      <ul className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan, index) => (
          <Reveal key={plan.id} as="li" delay={index * 0.06} className="h-full">
            <div
              className={cn(
                "flex h-full flex-col gap-6 rounded-card border p-6",
                // O plano em destaque se separa por BORDA e por um fundo
                // levemente tingido, nunca por sombra (regra §10).
                plan.highlighted
                  ? "border-accent bg-accent-soft"
                  : "border-border bg-surface",
              )}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h2 className="type-heading text-text">{plan.name}</h2>
                  {plan.highlighted ? (
                    <span className="rounded-full border border-accent-border bg-surface px-2 py-0.5 type-micro text-accent">
                      Mais escolhido
                    </span>
                  ) : null}
                </div>
                <p className="type-caption text-text-muted">{plan.tagline}</p>
              </div>

              <div className="border-t border-border pt-5">
                {plan.pricePrefix ? (
                  <p className="type-caption text-text-muted">
                    {plan.pricePrefix}
                  </p>
                ) : null}
                {plan.price ? (
                  <p className="type-display text-text">
                    {/* `tabular-nums` só no número: aplicado na linha inteira,
                        ele desalinharia o "/mês" ao lado. */}
                    <span className="tabular-nums">{plan.price}</span>
                    <span className="type-body text-text-muted"> /mês</span>
                  </p>
                ) : (
                  /* Um papel menor que o do preço, de propósito: "Monte seu
                     plano" é texto, não número, e em `type-display` ele quebra
                     em duas linhas na coluna estreita, desalinhando a lista de
                     itens em relação aos cards vizinhos. */
                  <p className="type-title text-text">{plan.priceLabel}</p>
                )}
              </div>

              {plan.featuresIntro ? (
                <p className="type-caption -mb-2 text-text-muted">
                  {plan.featuresIntro}
                </p>
              ) : null}

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span className="type-support text-text-muted">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={CTA_URL}
                variant={plan.highlighted ? "primary" : "outline"}
                className="mt-auto w-full"
              >
                {plan.ctaLabel}
              </ButtonLink>
            </div>
          </Reveal>
        ))}
      </ul>

      <p className="mt-10 text-center type-caption text-text-subtle">
        Todos os planos trabalham com crédito mensal, e o crédito avulso fica
        disponível quando o volume passa do contratado.
      </p>
    </Section>
  );
}
