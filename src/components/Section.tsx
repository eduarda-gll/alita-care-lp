import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";


export function Section({
  id,
  children,
  className,
  innerClassName,
  as: Tag = "section",
  bleed = false,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  as?: ElementType;
  bleed?: boolean;
  labelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative px-5 py-20 sm:px-6 md:py-28", className)}
    >
      {bleed ? children : <Container className={innerClassName}>{children}</Container>}
    </Tag>
  );
}

 
export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="type-eyebrow text-accent">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="type-display max-w-2xl text-balance text-text">
        {title}
      </h2>
      {description ? (
        <p className="type-lead max-w-xl text-pretty text-text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
