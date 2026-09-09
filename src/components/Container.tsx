import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Largura de leitura da LP. Um valor só, consumido por toda seção — é o que
 * mantém título, texto e mockup no mesmo eixo vertical de uma seção pra outra.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl", className)}>{children}</div>
  );
}
