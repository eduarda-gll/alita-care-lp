import { useId } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type OrbitNode = { id: string; label: string; x: number; y: number };

const VIEW_W = 320;
const VIEW_H = 330;
const CX = 160;
const CY = 168;
const NODE_GAP = 0;
const HUB_GAP = 31;
const BEND = 0.16;

const BEAM_SPAN = 0.55;
const BEAM_DURATION = 2.8;
const BEAM_OVERLAP = 0.6;
const GLOW_BASE = 0.4;
const GLOW_PEAK = 1;
const GLOW_PEAK_SCALE = 1.14;
const GLOW_RISE = 0.3;
const GLOW_FALL = 0.75;

function beamSchedule(count: number) {
  const step = Math.max(0.4, BEAM_DURATION - BEAM_OVERLAP);
  const cycle = Math.max(step, count * step);

  const arrivals = Array.from(
    { length: count },
    (_, index) => (index * step + BEAM_DURATION) % cycle,
  ).sort((a, b) => a - b);

  const times: number[] = [];
  const opacity: number[] = [];
  const scale: number[] = [];

  const push = (at: number, value: number) => {
    const time = Math.min(1, Math.max(0, at / cycle));
    if (times.length && time <= times[times.length - 1]) return;
    times.push(time);
    opacity.push(value);
    scale.push(value === GLOW_PEAK ? GLOW_PEAK_SCALE : 1);
  };

  push(0, arrivals[0] <= GLOW_RISE ? GLOW_PEAK : GLOW_BASE);

  for (const arrival of arrivals) {
    push(arrival - GLOW_RISE, GLOW_BASE);
    push(arrival, GLOW_PEAK);
    push(arrival + GLOW_FALL, GLOW_BASE);
  }

  push(cycle, GLOW_BASE);

  return { step, cycle, glow: { times, opacity, scale } };
}

function curveGeometry(node: OrbitNode) {
  const dx = CX - node.x;
  const dy = CY - node.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;

  const startX = node.x + ux * NODE_GAP;
  const startY = node.y + uy * NODE_GAP;
  const endX = CX - ux * HUB_GAP;
  const endY = CY - uy * HUB_GAP;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const bend = length * BEND;
  const controlX = midX - uy * bend;
  const controlY = midY + ux * bend;

  const span = length * BEAM_SPAN;

  return {
    d: `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`,
    from: { x1: startX - span * ux, y1: startY - span * uy, x2: startX, y2: startY },
    to: { x1: endX, y1: endY, x2: endX + span * ux, y2: endY + span * uy },
  };
}

export function ChannelOrbit({
  nodes,
  activeId,
  onSelect,
}: {
  nodes: readonly OrbitNode[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const uid = useId();
  const beamId = (id: string) => `${uid}-beam-${id}`.replace(/:/g, "");
  const hubGlowId = `${uid}-hub-glow`.replace(/:/g, "");
  const schedule = beamSchedule(nodes.length);
  const activeIndex = Math.max(
    0,
    nodes.findIndex((node) => node.id === activeId),
  );
  const beamSlot = (index: number) =>
    (index - activeIndex + nodes.length) % nodes.length;

  return (
    <div className="relative w-full max-w-sm">
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden className="h-auto w-full">
        <defs>
          <radialGradient id={hubGlowId}>
            <stop offset="45%" stopColor="var(--color-accent)" stopOpacity="0.32" />
            <stop offset="72%" stopColor="var(--color-brand-blue)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--color-brand-blue)" stopOpacity="0" />
          </radialGradient>

          {!reduced &&
            nodes.map((node, index) => {
              const { from, to } = curveGeometry(node);

              return (
                <motion.linearGradient
                  key={`${node.id}-${activeId}`}
                  id={beamId(node.id)}
                  gradientUnits="userSpaceOnUse"
                  initial={from}
                  animate={{
                    x1: [from.x1, to.x1],
                    y1: [from.y1, to.y1],
                    x2: [from.x2, to.x2],
                    y2: [from.y2, to.y2],
                  }}
                  transition={{
                    duration: BEAM_DURATION,
                    delay: beamSlot(index) * schedule.step,
                    repeat: Infinity,
                    repeatDelay: schedule.cycle - BEAM_DURATION,
                    ease: "linear",
                  }}
                >
                  <stop stopColor="var(--color-accent)" stopOpacity="0" />
                  <stop offset="22%" stopColor="var(--color-accent)" stopOpacity="0.9" />
                  <stop offset="52%" stopColor="var(--color-brand-blue)" />
                  <stop offset="100%" stopColor="var(--color-brand-blue)" stopOpacity="0" />
                </motion.linearGradient>
              );
            })}
        </defs>

        {[46, 80, 114, 148].map((r, index) => (
          <circle
            key={r}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke="var(--color-grid-line)"
            strokeWidth={1}
            opacity={1 - index * 0.18}
          />
        ))}

        {nodes.map((node) => {
          const isActive = node.id === activeId;
          const { d } = curveGeometry(node);
          return (
            <g key={node.id}>
              {reduced ? null : (
                <path
                  d={d}
                  fill="none"
                  stroke={`url(#${beamId(node.id)})`}
                  strokeWidth={isActive ? 2.5 : 2}
                  strokeLinecap="round"
                />
              )}
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
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
              <text
                x={node.x}
                y={node.y > CY ? node.y + 26 : node.y - 20}
                textAnchor="middle"
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

        <motion.circle
          key={activeId}
          cx={CX}
          cy={CY}
          r={56}
          fill={`url(#${hubGlowId})`}
          initial={{ opacity: GLOW_BASE, scale: 1 }}
          animate={
            reduced
              ? { opacity: GLOW_BASE, scale: 1 }
              : { opacity: schedule.glow.opacity, scale: schedule.glow.scale }
          }
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: schedule.cycle,
                  times: schedule.glow.times,
                  repeat: Infinity,
                  ease: "easeOut",
                }
          }
        />
        <circle
          cx={CX}
          cy={CY}
          r={30}
          fill="var(--color-surface)"
          stroke="var(--color-border-strong)"
          strokeWidth={1}
        />
        <image href="/logotipo_alita.svg" x={CX - 17} y={CY - 15} width={34} height={30} />
      </svg>

      {nodes.map((node) => (
        <button
          key={node.id}
          type="button"
          onClick={() => onSelect(node.id)}
          aria-current={node.id === activeId ? "true" : undefined}
          style={{
            left: `${(node.x / VIEW_W) * 100}%`,
            top: `${(node.y / VIEW_H) * 100}%`,
          }}
          className="absolute size-12 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="sr-only">Ver o atendimento por {node.label}</span>
        </button>
      ))}
    </div>
  );
}
