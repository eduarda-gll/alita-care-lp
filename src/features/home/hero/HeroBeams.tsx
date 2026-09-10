export function HeroBeams() {
  return (
    <div
      aria-hidden
      className="hero-beams pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <span className="hero-cone hero-cone--left">
        <span className="hero-cone__shape" />
      </span>
      <span className="hero-cone hero-cone--right">
        <span className="hero-cone__shape" />
      </span>

      <span className="hero-prism hero-prism--left">
        <span className="hero-prism__shape" />
      </span>
      <span className="hero-prism hero-prism--right">
        <span className="hero-prism__shape" />
      </span>

      <span className="hero-core hero-core--left">
        <span className="hero-core__shape" />
      </span>
      <span className="hero-core hero-core--right">
        <span className="hero-core__shape" />
      </span>
    </div>
  );
}
