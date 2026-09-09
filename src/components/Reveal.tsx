import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Entrada de um bloco quando ele encosta na viewport.
 *
 * ⚠️ É CSS, não `motion`, e isso é decisão de arquitetura, não preferência. O
 * build pré-renderiza o HTML, e o `motion` grava o estado inicial como `style`
 * inline no servidor: com `initial={{ opacity: 0 }}` o HTML chegava ao crawler
 * com o conteúdo invisível, anulando o pré-render inteiro. A classe `.reveal`
 * deixa o HTML no estado VISÍVEL e põe a animação por cima (ver o bloco
 * "ENTRADA DE CONTEÚDO" em `styles/index.css`).
 *
 * `delay` vira deslocamento da FAIXA de scroll, não atraso de tempo: numa
 * animação ligada ao scroll não existe relógio, existe posição. Serve para
 * escalonar itens de um mesmo grid.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  /** Escalonamento, em segundos, convertido para deslocamento da faixa. */
  delay?: number;
  as?: "div" | "li" | "section";
  style?: CSSProperties;
}) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={
        delay
          ? ({
              ...style,
              // A escala é arbitrária: só precisa ser consistente entre os
              // itens de um mesmo grid para a cascata ler como cascata.
              "--reveal-shift": `${Math.round(delay * 40)}%`,
            } as CSSProperties)
          : style
      }
    >
      {children}
    </Tag>
  );
}
