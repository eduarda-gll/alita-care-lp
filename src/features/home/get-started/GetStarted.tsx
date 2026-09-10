import { BookOpen, Plug, Rocket } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/Card";
import { ButtonLink } from "@/components/Button";
import { CTA_URL } from "@/constants";

const STEPS = [
  {
    icon: Plug,
    title: "Conecte o canal",
    description:
      "WhatsApp, Instagram, Messenger ou o chat do site. A conexão é feita uma vez, direto no painel.",
    detail: "Leva poucos minutos, sem depender do time de tecnologia.",
  },
  {
    icon: BookOpen,
    title: "Ensine a IA sobre o seu negócio",
    description:
      "Serviços, preços, convênios, horários e o que ela pode ou não responder. Tudo em texto, sem programar.",
    detail: "Dá para ajustar a qualquer momento e testar antes de publicar.",
  },
  {
    icon: Rocket,
    title: "Publique e receba os leads",
    description:
      "A partir daí a Alita atende sozinha, preenche a ficha e marca a reunião. O time entra quando o lead já está pronto.",
    detail: "Você acompanha cada conversa pelo painel, em tempo real.",
  },
] as const;

export function GetStarted() {
  return (
    <Section id="comecar" labelledBy="comecar-titulo">
      <SectionHeader
        id="comecar-titulo"
        eyebrow="Comece agora"
        title="Três passos até o primeiro lead atendido"
        description="Do primeiro acesso ao atendimento no ar, sem projeto de implantação."
        align="center"
        className="mx-auto items-center"
      />

      <ol className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <Reveal key={step.title} as="li" delay={index * 0.08}>
            <Card className="flex h-full flex-col gap-4 p-6 transition-[translate,scale] duration-300 ease-out-soft hover:-translate-y-1.5 hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                  <step.icon className="size-4.5 text-accent" aria-hidden />
                </span>
                <span className="type-micro tabular-nums text-text-subtle" aria-hidden>
                  Passo {index + 1}
                </span>
              </div>
              <h3 className="type-heading text-balance text-text">{step.title}</h3>
              <p className="type-body text-pretty text-text-muted">
                {step.description}
              </p>
              <p className="type-caption mt-auto border-t border-border pt-4 text-text-subtle">
                {step.detail}
              </p>
            </Card>
          </Reveal>
        ))}
      </ol>

      <div className="mt-10 flex justify-center">
        <ButtonLink href={CTA_URL} size="lg" className="group gap-0">
          Começar agora
          <span className="ml-0 grid w-0 place-items-center overflow-hidden opacity-0 transition-[width,opacity,margin] duration-300 ease-out-soft group-hover:ml-2 group-hover:w-4 group-hover:opacity-100">
            <ArrowRight aria-hidden className="size-4 shrink-0" />
          </span>
        </ButtonLink>
      </div>
    </Section>
  );
}
