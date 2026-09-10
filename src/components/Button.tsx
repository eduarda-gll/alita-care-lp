import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg",
    "type-label whitespace-nowrap",
    "transition-[color,background-color,border-color,box-shadow,transform] duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:cursor-not-allowed disabled:opacity-70",
    "[&>svg]:size-4 [&>svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "gradient-accent bg-accent-strong text-on-accent",

        metal:
        "bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-slate-900 hover:text-slate-900 hover:from-blue-300 hover:via-blue-200 hover:to-blue-300",

        outline:
          "border border-border-strong bg-transparent text-text hover:bg-surface-hover",

        soft:
          "border border-accent-border bg-accent-soft text-accent hover:bg-accent-soft/70",

        ghost:
          "bg-transparent text-text-muted hover:bg-surface-hover hover:text-text",
      },

      size: {
        sm: "h-9 px-4",
        md: "h-10 px-5",
        lg: "h-12 px-6 text-[0.875rem]",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

type BaseProps = Variants & {
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  external = true,
  ...rest
}: BaseProps & { href: string; external?: boolean } & Omit<
    ComponentProps<"a">,
    "href" | "className" | "children"
  >) {
  const isInternal = href.startsWith("#") || href.startsWith("/");

  if (isInternal && !href.startsWith("/#")) {
    return (
      <Link
        to={href}
        className={cn(buttonVariants({ variant, size }), className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...(external && !isInternal
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: BaseProps &
  Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export { buttonVariants };