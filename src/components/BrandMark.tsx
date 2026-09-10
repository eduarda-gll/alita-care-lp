import { cn } from "@/lib/cn";

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/logotipo_alita.svg"
      alt=""
      width={38}
      height={34}
      className={cn("h-7 w-auto", className)}
    />
  );
}

export function BrandLockup({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BrandMark className={markClassName} />
      <span className="type-section text-text">Alita</span>
    </span>
  );
}
