import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export function ShinyText({
  text,
  className,
  speed = 5,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  return (
    <span
      className={cn("shiny-text", className)}
      style={{ "--shiny-duration": `${speed}s` } as CSSProperties}
    >
      {text}
      <span aria-hidden="true" className="shiny-text__glint">
        {text}
      </span>
    </span>
  );
}
