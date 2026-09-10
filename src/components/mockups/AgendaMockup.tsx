import { CalendarCheck } from "lucide-react";
import { cn } from "@/lib/cn";

export type AgendaSlot = {
  day: string;
  time: string;
  /** `taken` é horário já ocupado; `picked` é o que o lead escolheu. */
  state: "free" | "taken" | "picked";
};

export function AgendaMockup({
  slots,
  className,
}: {
  slots: AgendaSlot[];
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
        <CalendarCheck className="size-4 text-accent" aria-hidden />
        <span className="type-caption text-mockup-text">Agenda da clínica</span>
        <span className="ml-auto type-micro text-mockup-muted">
          Consultada em tempo real
        </span>
      </div>

      <ul className="flex flex-col gap-1.5 p-3">
        {slots.map((slot) => (
          <li
            key={`${slot.day}-${slot.time}`}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2.5",
              slot.state === "picked"
                ? "border-accent bg-accent-strong/12"
                : "border-mockup-border bg-surface-recessed",
            )}
          >
            <span className="type-support w-20 shrink-0 text-mockup-text">
              {slot.day}
            </span>
            <span
              className={cn(
                "type-body-strong tabular-nums",
                slot.state === "taken"
                  ? "text-mockup-muted line-through"
                  : "text-mockup-text",
              )}
            >
              {slot.time}
            </span>
            <span
              className={cn(
                "type-micro ml-auto rounded-full px-2 py-0.5",
                slot.state === "picked" && "bg-success-soft text-success",
                slot.state === "taken" && "text-mockup-muted",
                slot.state === "free" && "text-mockup-muted",
              )}
            >
              {slot.state === "picked"
                ? "Escolhido"
                : slot.state === "taken"
                  ? "Ocupado"
                  : "Livre"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
