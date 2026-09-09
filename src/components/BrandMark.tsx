import { cn } from "@/lib/cn";

/**
 * O símbolo da marca.
 *
 * Três regras herdadas do `BrandMark` do app:
 * 1. A arte NÃO é quadrada (viewBox 669×598), então dimensione por ALTURA
 *    (`h-7 w-auto`) e nunca por `size-*`, que a espremeria.
 * 2. Ela carrega os próprios gradientes, logo não responde a token de cor nem
 *    a tema — não tente pintá-la.
 * 3. `alt=""` porque o arquivo é só o símbolo, sem o nome desenhado: ela vem
 *    sempre acompanhada do nome em texto, e um alt aqui duplicaria a leitura.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/logotipo_alita.svg"
      alt=""
      width={38}
      height={34}
      className={cn("h-7 w-auto", className)}
    />
  );
}

/** Marca + nome, o par que sempre anda junto (ver regra 3 acima). */
export function BrandLockup({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BrandMark className={markClassName} />
      <span className="type-section text-text">Alita</span>
    </span>
  );
}
