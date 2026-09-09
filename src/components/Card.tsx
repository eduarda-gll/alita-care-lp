import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Superfície de conteúdo. Separa do fundo pela BORDA, nunca por sombra — a
 * regra §10 da casa ("sem sombra em conteúdo; sombra só em overlay flutuante")
 * vale aqui igual. No escuro o degrau de tom contra o canvas é de 1,04:1, ou
 * seja praticamente nulo: quem delimita o card é mesmo a borda.
 *
 * Componente PURO, sem motion. Quem quiser animar importa `MotionCard` de
 * `motion-wrappers.tsx` — mesma divisão que o typebot faz.
 */
export function Card({
  children,
  className,
  raised = false,
}: {
  children: ReactNode;
  className?: string;
  raised?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border",
        raised ? "bg-surface-raised" : "bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}
