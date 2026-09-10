import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  raised = false,
}: {
  children: ReactNode;
  className?: string;
  raised?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border",
        raised ? "bg-surface-raised" : "bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}
