import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/Section";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import { TESTIMONIALS } from "./quotes";

/**
 * Depoimento de cliente, no arranjo do Figma: retrato à esquerda, citação e
 * números à direita.
 *
 * ⚠️ A seção é CONDICIONAL. Com `TESTIMONIALS` vazio ela devolve `null` e some
 * da página inteira, em vez de renderizar uma citação inventada (ver a nota
 * em `quotes.ts`). Com um item ela vira depoimento único; com vários, ganha os
 * controles de troca.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  if (TESTIMONIALS.length === 0) return null;

  const active = TESTIMONIALS[index];
  const initial = active.name.trim().charAt(0).toUpperCase();

  return (
    <Section labelledBy="depoimentos-titulo" className="py-16 md:py-24">
      <div className="rounded-card border border-border bg-surface p-6 md:p-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:items-center md:gap-14">
          <div className="mx-auto w-full max-w-64">
            {active.avatar ? (
              <img
                src={active.avatar}
                alt={`Retrato de ${active.name}`}
                className="aspect-square w-full rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden
                className="type-stat flex aspect-square w-full items-center justify-center rounded-full bg-accent-soft text-accent"
              >
                {initial}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6 text-center md:text-left">
            {/* O título visível da seção É o eyebrow. Ele fica como <h2> de
                verdade (não um <p> com um heading escondido ao lado), senão a
                seção entra na árvore de acessibilidade sem nome. */}
            <h2 id="depoimentos-titulo" className="type-eyebrow text-accent">
              Opiniões reais
            </h2>

            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={active.name}
                className="flex flex-col gap-5"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
              >
                <blockquote className="type-display text-balance text-text">
                  {active.quote}
                </blockquote>
                <figcaption className="type-support text-text-muted">
                  <span className="text-text">{active.name}</span>
                  {", "}
                  {active.role}
                </figcaption>

                {active.stats?.length ? (
                  <ul className="mt-2 grid gap-6 sm:grid-cols-3">
                    {active.stats.map((stat) => (
                      <li key={stat.label}>
                        <p className="type-stat text-accent">{stat.value}</p>
                        <p className="type-caption mt-1 text-text-muted">
                          {stat.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.figure>
            </AnimatePresence>

            {TESTIMONIALS.length > 1 ? (
              <div className="flex justify-center gap-2 md:justify-start">
                {TESTIMONIALS.map((testimonial, testimonialIndex) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => setIndex(testimonialIndex)}
                    aria-label={`Ver o depoimento de ${testimonial.name}`}
                    aria-current={testimonialIndex === index ? "true" : undefined}
                    // A área de clique é de 24px (a caixa), mesmo o traço
                    // visível tendo 2px de altura — é o mínimo da WCAG 2.5.8.
                    className="group inline-flex h-6 w-10 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span
                      className={cn(
                        "block h-0.5 w-full rounded-full transition-colors duration-200",
                        testimonialIndex === index
                          ? "bg-accent"
                          : "bg-border group-hover:bg-border-strong",
                      )}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
