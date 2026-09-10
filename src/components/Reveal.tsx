import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
  style?: CSSProperties;
}) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={
        delay
          ? ({
              ...style,
              "--reveal-shift": `${Math.round(delay * 40)}%`,
            } as CSSProperties)
          : style
      }
    >
      {children}
    </Tag>
  );
}
