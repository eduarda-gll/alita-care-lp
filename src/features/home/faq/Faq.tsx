import { Plus } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { QUESTIONS } from "./questions";
import { ContactCard } from "./ContactCard";

/**
 * FAQ em `<details>`/`<summary>` NATIVO.
 *
 * Não é um accordion custom de propósito: o elemento nativo já entrega teclado,
 * estado de expandido para leitor de tela e busca do navegador (Ctrl+F acha
 * texto dentro de um item fechado), tudo sem estado em React. É a mesma escolha
 * do FAQ do typebot.
 *
 * ⚠️ O "+" gira com `transition-[rotate]`, não `transition-transform`: o
 * Tailwind v4 emite `rotate-45` como a propriedade independente `rotate`, e
 * uma transição em `transform` deixaria o giro sem interpolação — falha
 * silenciosa, porque a classe aplica e o estado final fica certo.
 */
export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-titulo">
      <div className="rounded-card border border-border bg-surface p-6 md:p-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="type-eyebrow text-accent">Dúvidas frequentes</p>
            <h2
              id="faq-titulo"
              className="type-display mt-3 max-w-md text-balance text-text"
            >
              Cada lead sem resposta é uma agenda vazia amanhã
            </h2>

            <ul className="mt-10 flex flex-col">
              {QUESTIONS.map((item) => (
                <li key={item.question}>
                  <details className="group border-b border-border">
                    <summary className="flex items-center gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                      <span className="type-body-strong flex-1 text-pretty text-text">
                        {item.question}
                      </span>
                      <Plus
                        aria-hidden
                        className="size-4 shrink-0 text-text-muted transition-[rotate] duration-200 group-open:rotate-45"
                      />
                    </summary>
                    <p className="type-body pb-5 pr-8 text-pretty text-text-muted">
                      {item.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.05} className="lg:pt-16">
            <ContactCard />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
