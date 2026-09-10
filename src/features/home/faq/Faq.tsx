import { Plus } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { QUESTIONS } from "./questions";
import { ContactCard } from "./ContactCard";

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-titulo">
      <div className="rounded-card border-[3px] border-accent bg-surface p-6 md:p-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="type-eyebrow uppercase text-accent">Dúvidas frequentes</p>
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
                      <span className="type-label flex-1 text-pretty uppercase tracking-[0.06em] text-text transition-colors duration-200 group-hover:text-accent group-open:text-accent">
                        {item.question}
                      </span>
                      <Plus
                        aria-hidden
                        className="size-4 shrink-0 text-text-muted transition-[rotate,color] duration-200 group-hover:text-accent group-open:rotate-45 group-open:text-accent"
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
