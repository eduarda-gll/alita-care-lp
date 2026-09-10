import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/cn";

export type LeadField = { label: string; value: string };

export function LeadRecordMockup({
  title = "Ficha do lead",
  status,
  fields,
  className,
}: {
  title?: string;
  status: string;
  fields: LeadField[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-mockup-accent bg-mockup-bg",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-mockup-border px-4 py-3">
        <span className="type-caption text-mockup-text">{title}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2 py-1 type-micro text-success">
          <CircleCheck className="size-3" aria-hidden />
          {status}
        </span>
      </div>

      <dl className="divide-y divide-mockup-border">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex items-baseline gap-3 px-4 py-2.5"
          >
            <dt className="w-24 shrink-0 type-micro text-mockup-muted">
              {field.label}
            </dt>
            <dd className="type-support text-mockup-text">{field.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
