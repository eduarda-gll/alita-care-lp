import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/Button";

export function NotFound() {
  return (
    <Section className="py-28 md:py-36">
      <div className="flex flex-col items-center gap-5 text-center">
        <p className="type-eyebrow text-accent">Erro 404</p>
        <h1 className="type-display max-w-lg text-balance text-text">
          Essa página não existe
        </h1>
        <p className="type-lead max-w-md text-pretty text-text-muted">
          O endereço pode ter mudado de lugar. Volte para o início e siga a
          partir de lá.
        </p>
        <ButtonLink href="/" className="mt-2">
          Voltar para o início
        </ButtonLink>
      </div>
    </Section>
  );
}
