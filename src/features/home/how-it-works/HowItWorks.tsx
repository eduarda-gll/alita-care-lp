import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Section, SectionHeader } from "@/components/Section";
import { ChatMockup } from "@/components/mockups/ChatMockup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import { ChannelOrbit, type OrbitNode } from "./ChannelOrbit";
import { SCENARIOS } from "./scenarios";

const ORBIT_NODES: readonly OrbitNode[] = [
  { id: "whatsapp", label: "WhatsApp", x: 58, y: 106 },
  { id: "site", label: "Site", x: 240, y: 100 },
  { id: "campanha", label: "Campanha", x: 168, y: 288 },
];

/** Quanto cada cenário fica em cena antes do avanço automático. */
const DWELL_MS = 6000;

export function HowItWorks() {
  const [index, setIndex] = useState(0);
  // Guarda o índice anterior só para saber a DIREÇÃO da animação: avançar
  // desliza para um lado, voltar desliza para o outro. Sem isso a troca lê
  // igual nos dois sentidos e o carrossel perde a noção de ordem.
  const previousIndex = useRef(0);
  // Seleção manual desliga o avanço automático de vez: quem escolheu um
  // cenário está lendo aquele, e trocar debaixo do dedo é hostil.
  const [autoplay, setAutoplay] = useState(true);
  const reduced = usePrefersReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  // Pausa o avanço quando a seção sai da viewport: sem isso o carrossel corre
  // sozinho enquanto ninguém olha, e o visitante volta no meio de um cenário.
  const inView = useInView(containerRef, { amount: 0.35 });
  const running = autoplay && inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      previousIndex.current = index;
      setIndex((current) => (current + 1) % SCENARIOS.length);
    }, DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [running, index]);

  const select = (next: number) => {
    previousIndex.current = index;
    setAutoplay(false);
    setIndex(next);
  };

  const direction = index >= previousIndex.current ? 1 : -1;
  const active = SCENARIOS[index];

  return (
    <Section id="como-funciona" labelledBy="como-funciona-titulo">
      <SectionHeader
        id="como-funciona-titulo"
        eyebrow="Como funciona"
        title={
          <>
            Um atendimento só, em todos os{" "}
            <span className="text-accent">canais</span> de entrada
          </>
        }
        description="Não importa por onde a pessoa chegou. A mesma IA responde, entende o caso e devolve o lead pronto para o time."
      />

      <div
        ref={containerRef}
        className="mt-12 grid gap-10 md:mt-14 md:grid-cols-2 md:items-center md:gap-14"
      >
        <div className="flex flex-col items-center gap-8">
          <ChannelOrbit nodes={ORBIT_NODES} activeId={active.id} />

          {/* Os cenários são <button> de verdade, não pontinhos: dão teclado,
              rótulo lido por leitor de tela e área de clique bem acima dos 24px
              que a WCAG 2.5.8 pede. */}
          <ul className="flex w-full flex-col gap-1">
            {SCENARIOS.map((scenario, scenarioIndex) => {
              const isActive = scenarioIndex === index;
              return (
                <li key={scenario.id}>
                  <button
                    type="button"
                    onClick={() => select(scenarioIndex)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "w-full rounded-lg px-3 py-2.5 text-left transition-colors duration-200",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      isActive ? "bg-surface-hover" : "hover:bg-surface-hover",
                    )}
                  >
                    <span
                      className={cn(
                        "type-body-strong block",
                        isActive ? "text-text" : "text-text-muted",
                      )}
                    >
                      {scenario.title}
                    </span>
                    <span className="type-caption mt-0.5 block text-text-muted">
                      {scenario.description}
                    </span>
                    {/* Barra de progresso do avanço automático. Ela só corre
                        enquanto o autoplay está vivo: parada, prometeria um
                        avanço que não vem. */}
                    <span
                      aria-hidden
                      className="mt-2 block h-0.5 w-full overflow-hidden rounded-full bg-border"
                    >
                      <motion.span
                        key={`${scenarioIndex}-${index}-${String(running)}`}
                        className="block h-full origin-left rounded-full bg-accent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{
                          duration: isActive && running ? DWELL_MS / 1000 : 0,
                          ease: "linear",
                        }}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* `mode="wait"` evita os dois cenários ocuparem o mesmo espaço no meio
            da troca, o que faria a coluna saltar de altura. O `min-h` reserva a
            altura do cenário mais alto pelo mesmo motivo. */}
        <div className="min-h-88">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={reduced ? false : { opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, x: direction * -24 }}
              transition={{
                duration: reduced ? 0 : 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ChatMockup channel={active.channel} messages={active.messages} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
