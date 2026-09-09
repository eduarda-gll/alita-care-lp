import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Lê `prefers-reduced-motion` e reage a mudanças em tempo real.
 *
 * ⚠️ Começa em `false` de propósito, mesmo no servidor: o valor real chega no
 * primeiro efeito, antes do paint das animações de entrada. Começar em `true`
 * faria a página inteira renderizar sem animação e depois "ligar" o movimento,
 * que é pior que o contrário.
 *
 * Quem consome deve NEUTRALIZAR a animação (zerar `duration`/`initial`), nunca
 * apagar o JSX — assim ela volta a existir se a preferência mudar.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    setReduced(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
