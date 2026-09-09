import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { ChatMockup } from "@/components/mockups/ChatMockup";
import { LeadRecordMockup } from "@/components/mockups/LeadRecordMockup";
import { CTA_URL } from "@/constants";
import { HeroBackdrop } from "./HeroBackdrop";

/** As três linhas da headline. A do meio é a que recebe a cor de marca. */
const HEADLINE = [
  { text: "O lead chega.", accent: false },
  { text: "A IA conversa.", accent: true },
  { text: "O cadastro se preenche.", accent: false },
] as const;

export function Hero() {
  return (
    <Section bleed className="overflow-hidden pt-16 md:pt-24">
      <HeroBackdrop />

      <Container className="flex flex-col items-center text-center">
        {/* ⚠️ O ÚNICO type-hero e o ÚNICO <h1> da página. */}
        <h1 className="type-hero max-w-3xl text-balance text-text">
          {HEADLINE.map((line, index) => (
            <span
              key={line.text}
              className="rise-in block"
              // A cascata é o que dá a leitura de frase revelando-se linha a
              // linha, em vez de um bloco só aparecendo de uma vez.
              style={{ "--rise-delay": `${0.08 + index * 0.12}s` } as CSSProperties}
            >
              <span className={line.accent ? "text-accent" : undefined}>
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="rise-in type-lead mt-6 max-w-lg text-pretty text-text-muted"
          style={{ "--rise-delay": "0.44s" } as CSSProperties}
        >
          A Alita atende quem procura você, entende o que a pessoa precisa e
          devolve o lead qualificado, com os dados preenchidos e a reunião
          marcada. 24 horas por dia, 7 dias por semana.
        </p>

        <div
          className="rise-in mt-8 flex flex-col items-center gap-3 sm:flex-row"
          style={{ "--rise-delay": "0.56s" } as CSSProperties}
        >
          <ButtonLink href={CTA_URL} size="lg">
            Começar agora
            <ArrowRight aria-hidden />
          </ButtonLink>
          <ButtonLink href="/#como-funciona" variant="outline" size="lg">
            Ver como funciona
          </ButtonLink>
        </div>

        {/* O par de mockups sobe conforme a página rola.
            `scroll-rise` é CSS view timeline (styles/index.css): o navegador
            dirige a animação, sem passar por JS. Onde não há suporte, a regra é
            ignorada e o bloco fica no estado final, que é o estado legível. */}
        <div className="scroll-rise mt-16 grid w-full gap-4 text-left md:mt-20 md:grid-cols-[1.15fr_1fr] md:items-start">
          <ChatMockup
            channel="WhatsApp"
            messages={[
              {
                from: "lead",
                text: "Olá, boa tarde. Quanto custa a consulta?",
                time: "14:02",
              },
              {
                from: "alita",
                text: "Boa tarde! A primeira consulta é R$ 280 e já inclui o plano de acompanhamento. Você prefere manhã ou tarde?",
                time: "14:02",
              },
              {
                from: "lead",
                text: "De manhã seria melhor pra mim",
                time: "14:03",
              },
            ]}
          />
          <LeadRecordMockup
            status="Qualificado"
            fields={[
              { label: "Nome", value: "Mariana Souza" },
              { label: "Contato", value: "(11) 9 9812-4407" },
              { label: "Necessidade", value: "Primeira consulta" },
              { label: "Origem", value: "WhatsApp" },
              { label: "Reunião", value: "Quinta, 9h30" },
            ]}
          />
        </div>
      </Container>
    </Section>
  );
}
