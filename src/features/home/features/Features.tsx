import type { ReactNode } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { LeadRecordMockup } from "@/components/mockups/LeadRecordMockup";
import { AgendaMockup } from "@/components/mockups/AgendaMockup";
import { HandoffMockup } from "@/components/mockups/HandoffMockup";

type Feature = {
  id: string;
  title: string;
  description: string;
  visual: ReactNode;
};

const FEATURES: Feature[] = [
  {
    id: "cadastro",
    title: "A IA preenche o cadastro conversando",
    description:
      "Nome, contato, necessidade e origem entram na ficha durante a conversa, sem formulário. Cadastro manual passa a ser exceção.",
    visual: (
      <LeadRecordMockup
        status="Preenchido pela IA"
        fields={[
          { label: "Nome", value: "Mariana Souza" },
          { label: "Contato", value: "(11) 9 9812-4407" },
          { label: "Necessidade", value: "Primeira consulta" },
          { label: "Convênio", value: "Unimed" },
          { label: "Origem", value: "Anúncio, Instagram" },
        ]}
      />
    ),
  },
  {
    id: "agenda",
    title: "A reunião sai na própria conversa",
    description:
      "A IA consulta a agenda, oferece horários que existem de verdade e confirma com o lead. Sem vaivém por e-mail para achar uma data.",
    visual: (
      <AgendaMockup
        slots={[
          { day: "Quarta", time: "08:00", state: "taken" },
          { day: "Quinta", time: "09:30", state: "picked" },
          { day: "Quinta", time: "14:00", state: "free" },
          { day: "Sexta", time: "15:00", state: "free" },
        ]}
      />
    ),
  },
  {
    id: "handoff",
    title: "O lead chega qualificado ao time",
    description:
      "Resumo do atendimento, dados validados e histórico completo. Quem assume a conversa já sabe o contexto na primeira linha.",
    visual: (
      <HandoffMockup
        summary="Mariana procurou a clínica pelo anúncio do Instagram, tem Unimed e quer uma primeira consulta de manhã. Já confirmou quinta às 9h30."
        checks={[
          "Telefone validado no formato de WhatsApp",
          "Convênio conferido contra a lista de aceitos",
          "Horário reservado e confirmado com a lead",
        ]}
      />
    ),
  },
];

export function Features() {
  return (
    <Section id="recursos" labelledBy="recursos-titulo">
      <SectionHeader
        id="recursos-titulo"
        eyebrow="Funcionalidades"
        title="Três coisas que deixam de ser trabalho do time"
      />

      <ul className="mt-12 divide-y divide-accent md:mt-14">
        {FEATURES.map((feature, index) => (
          <li key={feature.id} className="py-10 first:pt-0 last:pb-0 md:py-14">
            <div className="scroll-focus grid gap-6 md:grid-cols-2 md:items-center md:gap-12">
              <div className="flex flex-col gap-3">
                <span
                  className="type-micro tabular-nums text-accent"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="type-title text-balance text-accent">
                  {feature.title}
                </h3>
                <p className="type-body text-pretty text-text-muted">
                  {feature.description}
                </p>
              </div>
              <div>{feature.visual}</div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
