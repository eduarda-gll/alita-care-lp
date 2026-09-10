import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/Section";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ClientLogoTrack } from "./ClientLogoTrack";
import { TESTIMONIALS } from "./quotes";

const MANUAL_HOLD_MS = 10_000;
const SWAP_DURATION = 0.7;
const SWAP_EXIT = 0.4;
const SWAP_EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const [activeId, setActiveId] = useState(TESTIMONIALS[0]?.id ?? "");
  const reduced = usePrefersReducedMotion();
  const holdRef = useRef(0);
  const [manual, setManual] = useState(false);

  useEffect(() => () => window.clearTimeout(holdRef.current), []);

  const handleSelect = useCallback((id: string) => {
    window.clearTimeout(holdRef.current);
    holdRef.current = window.setTimeout(() => {
      holdRef.current = 0;
      setManual(false);
    }, MANUAL_HOLD_MS);

    setManual(true);
    setActiveId(id);
  }, []);

  const handleCenter = useCallback((id: string) => {
    if (holdRef.current) return;
    setActiveId(id);
  }, []);

  if (TESTIMONIALS.length === 0) return null;

  const active =
    TESTIMONIALS.find((item) => item.id === activeId) ?? TESTIMONIALS[0];

  const initial = active.company.trim().charAt(0).toUpperCase();

  return (
    <Section labelledBy="depoimentos-titulo" className="py-16 md:py-24">
      <div className="rounded-card border border-border bg-surface p-6 md:p-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:items-center md:gap-14">
          
          {/* Foto do cliente */}
          <div className="relative mx-auto aspect-square w-full max-w-64">
            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                className="absolute inset-0 overflow-hidden rounded-full bg-accent-soft"
                initial={reduced ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  reduced
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        scale: 1.015,
                        transition: { duration: SWAP_EXIT, ease: "easeIn" },
                      }
                }
                transition={{
                  duration: reduced ? 0 : SWAP_DURATION,
                  ease: SWAP_EASE,
                }}
              >
                {active.avatar ? (
                  <img
                    src={active.avatar}
                    alt={`Retrato de ${active.name}, ${active.role} na ${active.company}`}
                    className="size-full object-cover"
                  />
                ) : active.logo ? (
                  <span className="flex size-full items-center justify-center p-8">
                    <img
                      src={active.logo}
                      alt={active.company}
                      className="max-h-full w-full object-contain"
                    />
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className="type-stat flex size-full items-center justify-center text-accent"
                  >
                    {initial}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Conteúdo do depoimento */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 id="depoimentos-titulo" className="type-eyebrow text-accent">
              Opiniões reais
            </h2>

            <div aria-live={manual ? "polite" : "off"}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={active.id}
                  className="flex flex-col gap-5"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduced
                      ? { opacity: 1 }
                      : {
                          opacity: 0,
                          y: -8,
                          transition: { duration: SWAP_EXIT, ease: "easeIn" },
                        }
                  }
                  transition={{
                    duration: reduced ? 0 : SWAP_DURATION,
                    ease: SWAP_EASE,
                  }}
                >
                  <blockquote className="type-display text-balance text-text">
                    {active.quote}
                  </blockquote>

                  <figcaption className="type-support text-text-muted">
                    <span className="text-text">{active.name}</span>
                    {", "}
                    {active.role}
                    {" na "}
                    {active.company}
                  </figcaption>

                  {active.stats?.length ? (
                    <ul className="mt-2 grid gap-6 sm:grid-cols-3">
                      {active.stats.map((stat) => (
                        <li key={stat.label}>
                          <p className="type-stat text-accent">
                            {stat.value}
                          </p>

                          <p className="type-caption mt-1 text-text-muted">
                            {stat.label}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {TESTIMONIALS.length > 1 ? (
          <div className="-mx-6 mt-10 border-t border-border pt-6 md:-mx-12 md:mt-12">
            <ClientLogoTrack
              items={TESTIMONIALS}
              activeId={active.id}
              onSelect={handleSelect}
              onCenter={handleCenter}
              animated={!reduced}
            />
          </div>
        ) : null}
      </div>
    </Section>
  );
}