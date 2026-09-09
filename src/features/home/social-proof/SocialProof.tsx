import { CalendarDays, Globe, Instagram, MessageCircle, Phone, Send } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CLIENTS, METRICS } from "./clients";

/**
 * Faixa de confiança, com três modos e uma ordem de precedência:
 *
 * 1. logos de cliente, se houver autorização (`CLIENTS`);
 * 2. métricas reais, se houver número apurado (`METRICS`);
 * 3. integrações — o modo padrão.
 *
 * O modo 3 existe porque os dois primeiros dependem de permissão de terceiro ou
 * de dado apurado, e nenhum dos dois pode ser inventado para preencher a
 * seção. A lista de canais é verificável no próprio produto, então diz algo
 * verdadeiro sem depender de ninguém. Ver a nota em `clients.ts`.
 */
const INTEGRATIONS = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Instagram", icon: Instagram },
  { label: "Messenger", icon: Send },
  { label: "Chat no site", icon: Globe },
  { label: "Google Agenda", icon: CalendarDays },
  { label: "Telefonia", icon: Phone },
] as const;

export function SocialProof() {
  if (CLIENTS.length > 0) {
    return (
      <Section id="integracoes" className="py-14 md:py-16">
        <p className="type-caption text-center text-text-subtle">
          Empresas que já atendem com a Alita
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {CLIENTS.map((client) => (
            <li key={client.name}>
              {/* Cinza em repouso, cor no hover: a faixa não pode competir com
                  o conteúdo em volta dela. */}
              <img
                src={client.src}
                alt={client.name}
                className="h-7 w-auto opacity-60 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (METRICS.length > 0) {
    return (
      <Section id="integracoes" className="py-14 md:py-16">
        <ul className="grid gap-8 sm:grid-cols-3">
          {METRICS.map((metric) => (
            <li key={metric.label} className="text-center">
              <p className="type-stat text-accent">{metric.value}</p>
              <p className="type-caption mt-1 text-text-muted">{metric.label}</p>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  return (
    <Section id="integracoes" className="py-14 md:py-16">
      <Reveal className="flex flex-col items-center gap-7">
        <p className="type-caption text-center text-text-subtle">
          Funciona com os canais que a sua operação já usa
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-2.5">
          {INTEGRATIONS.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2"
            >
              <Icon className="size-4 shrink-0 text-accent" aria-hidden />
              <span className="type-caption text-text-muted">{label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
