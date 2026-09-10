import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { Testimonial } from "./quotes";

const FADE_MASK =
  "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)";

const SECONDS_PER_LOGO = 13;

function LogoButton({
  item,
  isActive,
  onSelect,
  decorative = false,
}: {
  item: Testimonial;
  isActive: boolean;
  onSelect: (id: string) => void;
  decorative?: boolean;
}) {
  return (
    <button
      type="button"
      data-client-id={item.id}
      onClick={() => onSelect(item.id)}
      tabIndex={decorative ? -1 : undefined}
      aria-hidden={decorative || undefined}
      aria-current={!decorative && isActive ? "true" : undefined}
      aria-label={decorative ? undefined : `Ver o depoimento de ${item.company}`}
      className={cn(
        "relative inline-flex h-11 shrink-0 items-center justify-center rounded-lg px-3",
        "transition-[opacity,color,scale] duration-700 ease-out-soft",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isActive
          ? "z-10 scale-115 text-text opacity-100"
          : "scale-100 text-text-subtle opacity-55 hover:text-text-muted hover:opacity-100",
      )}
    >
      {item.logo ? (
        <img
          src={item.logo}
          alt=""
          className={cn(
            "h-7 w-auto transition-[filter] duration-700 ease-out-soft",
            isActive ? "grayscale-0" : "grayscale",
          )}
        />
      ) : (
        <span className="type-eyebrow whitespace-nowrap">{item.company}</span>
      )}
    </button>
  );
}

export function ClientLogoTrack({
  items,
  activeId,
  onSelect,
  onCenter,
  animated,
}: {
  items: readonly Testimonial[];
  activeId: string;
  onSelect: (id: string) => void;
  onCenter?: (id: string) => void;
  animated: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLUListElement>(null);
  const [repeats, setRepeats] = useState(2);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const block = blockRef.current;
    if (!viewport || !block) return;

    const blockWidth = block.getBoundingClientRect().width;
    if (blockWidth <= 0) return;

    setRepeats(Math.max(2, Math.ceil(viewport.clientWidth / blockWidth) + 1));
  }, []);

  useEffect(() => {
    if (!animated) return;

    const viewport = viewportRef.current;
    const block = blockRef.current;
    if (!viewport || !block) return;

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(block);

    return () => observer.disconnect();
  }, [animated, items.length, measure]);

  useEffect(() => {
    if (!animated || !onCenter) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const centered = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const id = centered?.target.getAttribute("data-client-id");
        if (id) onCenter(id);
      },
      { root: viewport, rootMargin: "0px -48% 0px -48%", threshold: 0 },
    );

    viewport
      .querySelectorAll("[data-client-id]")
      .forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [animated, items, onCenter, repeats]);

  if (items.length === 0) return null;

  if (!animated) {
    return (
      <ul className="flex flex-wrap items-center justify-center gap-x-32 gap-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <LogoButton
              item={item}
              isActive={item.id === activeId}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    );
  }

  const blocks = Array.from({ length: repeats }, (_, index) => index);

  return (
    <>
      <style>
        {`
          @keyframes alita-logo-marquee {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-50%, 0, 0); }
          }

          .alita-logo-marquee {
            animation-name: alita-logo-marquee;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-duration: var(--marquee-duration);
            will-change: transform;
          }

          .alita-logo-marquee:hover,
          .alita-logo-marquee:focus-within {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .alita-logo-marquee {
              animation: none;
            }
          }
        `}
      </style>

      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
      >
        <div
          className="alita-logo-marquee flex w-max"
          style={
            {
              "--marquee-duration": `${items.length * SECONDS_PER_LOGO}s`,
            } as CSSProperties
          }
        >
          <ul
            ref={blockRef}
            className="flex shrink-0 items-center gap-x-32 pr-32"
          >
            {items.map((item) => (
              <li key={item.id}>
                <LogoButton
                  item={item}
                  isActive={item.id === activeId}
                  onSelect={onSelect}
                />
              </li>
            ))}
          </ul>

          {blocks.slice(1).map((blockIndex) => (
            <ul
              key={`repeat-${blockIndex}`}
              aria-hidden
              className="flex shrink-0 items-center gap-x-32 pr-32"
            >
              {items.map((item) => (
                <li key={item.id}>
                  <LogoButton
                    item={item}
                    isActive={item.id === activeId}
                    onSelect={onSelect}
                    decorative
                  />
                </li>
              ))}
            </ul>
          ))}

          <ul
            aria-hidden
            className="flex shrink-0 items-center gap-x-32 pr-32"
          >
            {items.map((item) => (
              <li key={`final-${item.id}`}>
                <LogoButton
                  item={item}
                  isActive={item.id === activeId}
                  onSelect={onSelect}
                  decorative
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
