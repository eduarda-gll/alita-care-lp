import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Circle = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  rgb: string;
};

type ParticlesProps = {
  className?: string;
  quantity?: number;
  size?: number;
  vx?: number;
  vy?: number;
};

export function Particles({
  className,
  quantity = 110,
  size = 0.7,
  vx = 0,
  vy = -0.06,
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const paletteRef = useRef<string[]>(["58, 81, 173", "157, 180, 255"]);
  const frameRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  const readPalette = useCallback(() => {
    const styles = getComputedStyle(document.documentElement);
    const next = ["--color-particle-deep", "--color-particle-soft"]
      .map((token) => toRgb(styles.getPropertyValue(token).trim()))
      .filter(Boolean) as string[];

    if (next.length) paletteRef.current = next;
  }, []);

  const makeCircle = useCallback((): Circle => {
    const { w, h } = canvasSizeRef.current;
    const palette = paletteRef.current;
    const targetAlpha = Number((Math.random() * 0.22 + 0.08).toFixed(2));

    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      size: Math.floor(Math.random() * 2) + size,
      alpha: reduced ? targetAlpha : 0,
      targetAlpha,
      dx: (Math.random() - 0.5) * 0.12,
      dy: (Math.random() - 0.5) * 0.12,
      rgb: palette[Math.floor(Math.random() * palette.length)],
    };
  }, [reduced, size]);

  const drawCircle = useCallback((circle: Circle, update = false) => {
    const context = contextRef.current;
    if (!context) return;

    context.beginPath();
    context.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
    context.fillStyle = `rgba(${circle.rgb}, ${circle.alpha})`;
    context.fill();

    if (!update) circlesRef.current.push(circle);
  }, []);

  const resize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!container || !canvas || !context) return;

    const ratio = dpr();
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    canvasSizeRef.current = { w, h };
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    circlesRef.current = [];
    for (let i = 0; i < quantity; i++) drawCircle(makeCircle());
  }, [drawCircle, makeCircle, quantity]);

  const clear = useCallback(() => {
    const { w, h } = canvasSizeRef.current;
    contextRef.current?.clearRect(0, 0, w, h);
  }, []);

  const animate = useCallback(() => {
    clear();

    const { w, h } = canvasSizeRef.current;

    circlesRef.current.forEach((circle, index) => {
      const closest = Math.min(
        circle.x - circle.size,
        w - circle.x - circle.size,
        circle.y - circle.size,
        h - circle.y - circle.size,
      );
      const fade = remap(closest, 0, 20, 0, 1);

      circle.alpha =
        fade > 1
          ? Math.min(circle.alpha + 0.02, circle.targetAlpha)
          : circle.targetAlpha * fade;

      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;

      drawCircle(circle, true);

      const out =
        circle.x < -circle.size ||
        circle.x > w + circle.size ||
        circle.y < -circle.size ||
        circle.y > h + circle.size;

      if (out) {
        circlesRef.current.splice(index, 1);
        drawCircle(makeCircle());
      }
    });

    frameRef.current = window.requestAnimationFrame(animate);
  }, [clear, drawCircle, makeCircle, vx, vy]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext("2d");
    readPalette();
    resize();

    if (reduced) return;

    frameRef.current = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameRef.current);
  }, [animate, readPalette, reduced, resize]);

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      readPalette();
      resize();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [readPalette, resize]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

function dpr() {
  return typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
}

function remap(value: number, a1: number, a2: number, b1: number, b2: number) {
  const mapped = ((value - a1) * (b2 - b1)) / (a2 - a1) + b1;
  return mapped > 0 ? mapped : 0;
}

function toRgb(hex: string) {
  const clean = hex.replace("#", "").trim();
  if (clean.length !== 6) return null;

  const value = parseInt(clean, 16);
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
}
