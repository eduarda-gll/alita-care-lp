/**
 * A nebulosa atrás do hero.
 *
 * ⚠️ Aqui `style` com `var(--color-*)` é a exceção documentada, não desvio: o
 * Tailwind não expressa gradiente radial/cônico arbitrário em utility pura, e a
 * regra da casa proíbe HEX inline, não `var()` de token. Toda cor abaixo sai de
 * `styles/colors.css`, então a nebulosa acompanha o tema sozinha: no escuro ela
 * é o azul profundo do Figma; no claro, a mesma geometria em lavagem clara.
 *
 * `aria-hidden` + `pointer-events-none`: é decoração, não conteúdo, e não pode
 * roubar clique do que está por cima.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Brilho central, atrás da headline */}
      <div
        className="absolute left-1/2 top-[-18%] h-[70vw] max-h-[620px] w-[120vw] max-w-[1500px] -translate-x-1/2 rounded-[50%] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-glow-core), var(--color-glow-halo) 45%, transparent 78%)",
        }}
      />
      {/* Os dois arcos que cruzam a tela, o traço mais reconhecível do Figma */}
      <div
        className="absolute left-1/2 top-[26%] h-[46vw] max-h-[380px] w-[150vw] max-w-[1900px] -translate-x-1/2 -rotate-6 rounded-[50%] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-glow-halo), transparent 70%)",
        }}
      />
      <div
        className="absolute left-1/2 top-[46%] h-[34vw] max-h-[280px] w-[130vw] max-w-[1700px] -translate-x-1/2 rotate-3 rounded-[50%] opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-glow-deep), transparent 72%)",
        }}
      />
      {/* Poeira estelar. Escondida no claro: sobre canvas branco ela vira
          sujeira, não estrela. */}
      <div className="absolute inset-0 hidden dark:block">
        {STARS.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-glow-core"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      {/* Dissolve a nebulosa no canvas, para a seção seguinte não começar com
          uma borda dura de gradiente. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
    </div>
  );
}

/** Posições fixas, não aleatórias: `Math.random()` no render daria uma
    constelação diferente no HTML pré-renderizado e na hidratação. */
const STARS = [
  { x: 12, y: 22, size: 2, opacity: 0.5 },
  { x: 24, y: 58, size: 3, opacity: 0.35 },
  { x: 38, y: 14, size: 2, opacity: 0.45 },
  { x: 47, y: 71, size: 2, opacity: 0.3 },
  { x: 58, y: 26, size: 3, opacity: 0.4 },
  { x: 67, y: 62, size: 2, opacity: 0.5 },
  { x: 78, y: 18, size: 2, opacity: 0.35 },
  { x: 86, y: 48, size: 3, opacity: 0.3 },
  { x: 92, y: 70, size: 2, opacity: 0.45 },
  { x: 6, y: 44, size: 2, opacity: 0.3 },
  { x: 33, y: 84, size: 2, opacity: 0.25 },
  { x: 71, y: 86, size: 2, opacity: 0.3 },
] as const;
