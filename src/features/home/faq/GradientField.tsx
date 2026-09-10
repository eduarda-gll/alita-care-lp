import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const BORDER_GRADIENT = "var(--field-border-gradient)";

const INNER_GLOW = "var(--field-inner-glow)";

export function GradientField({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("rounded-xl p-0.5", className)}
      style={{ background: BORDER_GRADIENT }}
    >
      <div
        className="flex flex-col rounded-[0.625rem] bg-surface"
        style={{ boxShadow: INNER_GLOW }}
      >
        {children}
      </div>
    </div>
  );
}
