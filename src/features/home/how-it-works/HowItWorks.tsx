import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section, SectionHeader } from "@/components/Section";
import { ChatMockup } from "@/components/mockups/ChatMockup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ChannelOrbit, type OrbitNode } from "./ChannelOrbit";
import { SCENARIOS } from "./scenarios";

const ORBIT_NODES: readonly OrbitNode[] = [
  { id: "whatsapp", label: "WhatsApp", x: 58, y: 106 },
  { id: "site", label: "Site", x: 240, y: 100 },
  { id: "campanha", label: "Campanha", x: 168, y: 288 },
];

export function HowItWorks() {
  const [index, setIndex] = useState(0);
  const previousIndex = useRef(0);
  const reduced = usePrefersReducedMotion();

  const select = (id: string) => {
    const next = SCENARIOS.findIndex((scenario) => scenario.id === id);
    if (next < 0 || next === index) return;
    previousIndex.current = index;
    setIndex(next);
  };

  const direction = index >= previousIndex.current ? 1 : -1;
  const active = SCENARIOS[index];

  return (
    <Section
      id="como-funciona"
      labelledBy="como-funciona-titulo"
      className="pt-10 md:pt-16"
    >
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

      <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-2 md:items-center md:gap-14">
        <div className="flex justify-center">
          <ChannelOrbit
            nodes={ORBIT_NODES}
            activeId={active.id}
            onSelect={select}
          />
        </div>

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
