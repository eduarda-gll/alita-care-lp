import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type OrbitNode = { id: string; label: string; x: number; y: number };

/**
 * O diagrama de órbita: os canais de entrada giram em volta da Alita, que
 * atende todos com a mesma conversa.
 *
 * ⚠️ É DECORATIVO. `aria-hidden` no SVG inteiro, porque a mesma informação já
 * está nos botões de cenário ao lado — que são texto de verdade, focáveis e
 * lidos por leitor de tela. Um SVG com `role="img"` aqui faria o leitor
 * anunciar a lista duas vezes.
 *
 * Coordenadas fixas na constante `ORBIT_NODES` (o consumidor passa), não
 * calculadas por trigonometria em runtime: são três nós, e o valor literal é
 * mais fácil de ajustar contra o Figma do que um ângulo.
 */
export function ChannelOrbit({
  nodes,
  activeId,
}: {
  nodes: readonly OrbitNode[];
  activeId: string;
}) {
  const reduced = usePrefersReducedMotion();
  const cx = 160;
  const cy = 168;

  return (
    <svg
      viewBox="0 0 320 330"
      aria-hidden
      className="h-auto w-full max-w-sm"
    >
      {/* Anéis concêntricos */}
      {[46, 80, 114, 148].map((r, index) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--color-grid-line)"
          strokeWidth={1}
          opacity={1 - index * 0.18}
        />
      ))}

      {nodes.map((node) => {
        const isActive = node.id === activeId;
        return (
          <g key={node.id}>
            {/* Conector até o centro. A opacidade é o que marca o canal ativo —
                anima só opacity/transform, nunca dash offset (regra §11). */}
            <motion.line
              x1={node.x}
              y1={node.y}
              x2={cx}
              y2={cy}
              stroke={isActive ? "var(--color-accent)" : "var(--color-grid-line)"}
              strokeWidth={isActive ? 1.5 : 1}
              strokeDasharray="4 5"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0.45 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={9}
              fill={isActive ? "var(--color-accent)" : "var(--color-surface)"}
              stroke={
                isActive ? "var(--color-accent)" : "var(--color-border-strong)"
              }
              strokeWidth={1.5}
              initial={false}
              animate={{ scale: isActive ? 1.18 : 1 }}
              style={{ originX: `${node.x}px`, originY: `${node.y}px` }}
              transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
            <text
              x={node.x}
              y={node.y - 18}
              textAnchor="middle"
              className="type-micro"
              fill={
                isActive ? "var(--color-accent)" : "var(--color-text-subtle)"
              }
              style={{ fontSize: 11, fontWeight: 500 }}
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {/* Núcleo: a Alita */}
      <circle
        cx={cx}
        cy={cy}
        r={30}
        fill="var(--color-surface)"
        stroke="var(--color-border-strong)"
        strokeWidth={1}
      />
      <image href="/logotipo_alita.svg" x={cx - 17} y={cy - 15} width={34} height={30} />
    </svg>
  );
}
