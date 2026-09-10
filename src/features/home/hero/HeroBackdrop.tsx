import type { CSSProperties } from "react";

export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {ORBS.map((orb, index) => (
        <span
          key={index}
          className="hero-orb"
          style={
            {
              ...orb.position,
              "--orb-size": orb.size,
              "--orb-blur": orb.blur,
              "--orb-opacity": orb.opacity,
            } as CSSProperties
          }
        />
      ))}

      {/* Estrelas somente no dark mode */}
      <div className="absolute inset-0 hidden dark:block">
        {STARS.map((star, index) => (
          <span
            key={index}
            className="hero-spark absolute rounded-full bg-glow-core"
            style={
              {
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                "--spark-opacity": star.opacity,
                "--spark-duration": star.duration,
                "--spark-delay": star.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Fade inferior */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
    </div>
  );
}

const ORBS: readonly {
  position: CSSProperties;
  size: string;
  blur: string;
  opacity: number;
}[] = [
  {
    position: { left: "-14%", top: "-24%" },
    size: "clamp(24rem, 42vw, 48rem)",
    blur: "90px",
    opacity: 0.1,
  },
  {
    position: { right: "4%", top: "22%" },
    size: "clamp(11rem, 19vw, 23rem)",
    blur: "64px",
    opacity: 0.08,
  },
];

/* ═══════════════════════════════════════
   ESTRELAS
   ═══════════════════════════════════════ */

const STARS = [
  {
    x: 12,
    y: 22,
    size: 2,
    opacity: 0.5,
    duration: "6s",
    delay: "-1s",
  },
  {
    x: 24,
    y: 58,
    size: 3,
    opacity: 0.35,
    duration: "8s",
    delay: "-4s",
  },
  {
    x: 38,
    y: 14,
    size: 2,
    opacity: 0.45,
    duration: "7s",
    delay: "-2s",
  },
  {
    x: 47,
    y: 71,
    size: 2,
    opacity: 0.3,
    duration: "9s",
    delay: "-6s",
  },
  {
    x: 58,
    y: 26,
    size: 3,
    opacity: 0.4,
    duration: "6.5s",
    delay: "-3s",
  },
  {
    x: 67,
    y: 62,
    size: 2,
    opacity: 0.5,
    duration: "8.5s",
    delay: "-5s",
  },
  {
    x: 78,
    y: 18,
    size: 2,
    opacity: 0.35,
    duration: "7.5s",
    delay: "-1.5s",
  },
  {
    x: 86,
    y: 48,
    size: 3,
    opacity: 0.3,
    duration: "9.5s",
    delay: "-7s",
  },
  {
    x: 92,
    y: 70,
    size: 2,
    opacity: 0.45,
    duration: "6s",
    delay: "-2.5s",
  },
  {
    x: 6,
    y: 44,
    size: 2,
    opacity: 0.3,
    duration: "8s",
    delay: "-5.5s",
  },
  {
    x: 33,
    y: 84,
    size: 2,
    opacity: 0.25,
    duration: "7s",
    delay: "-3.5s",
  },
  {
    x: 71,
    y: 86,
    size: 2,
    opacity: 0.3,
    duration: "9s",
    delay: "-0.5s",
  },
] as const;