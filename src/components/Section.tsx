import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * O ritmo vertical da página inteira mora AQUI.
 *
 * ⚠️ Nenhuma seção escolhe o próprio `py`. É essa regra que impede o ritmo de
 * desandar quando a oitava seção entra — se uma precisar de respiro diferente,
 * o lugar de mexer é este componente, não a seção. (Convenção herdada do
 * `Section.tsx` do typebot, que faz exatamente isso.)
 *
 * `bleed` desliga o Container interno para a seção que precisa desenhar de
 * borda a borda (o hero, com a nebulosa).
 */
export function Section({
  id,
  children,
  className,
  innerClassName,
  as: Tag = "section",
  bleed = false,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  as?: ElementType;
  bleed?: boolean;
  labelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative px-5 py-20 sm:px-6 md:py-28", className)}
    >
      {bleed ? children : <Container className={innerClassName}>{children}</Container>}
    </Tag>
  );
}

/**
 * Cabeçalho padrão de seção: eyebrow + título + (opcional) linha de apoio.
 *
 * O eyebrow é `<p>`, nunca heading — ele rotula a seção, não estrutura o
 * documento; e o título é `<h2>`, porque o único `<h1>` da página é o do hero.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="type-eyebrow text-accent">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="type-display max-w-2xl text-balance text-text">
        {title}
      </h2>
      {description ? (
        <p className="type-lead max-w-xl text-pretty text-text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
