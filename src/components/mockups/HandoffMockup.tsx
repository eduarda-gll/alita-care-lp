import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

export function HandoffMockup({
  summary,
  checks,
  className,
}: {
  summary: string;
  checks: string[];
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
        <Sparkles className="size-4 text-accent" aria-hidden />
        <span className="type-caption text-mockup-text">
          Resumo do atendimento
        </span>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <p className="type-support text-pretty text-mockup-text">{summary}</p>

        <ul className="flex flex-col gap-2">
          {checks.map((check) => (
            <li key={check} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-success-soft"
                aria-hidden
              >
                <Check className="size-2.5 text-success" />
              </span>
              <span className="type-caption text-mockup-muted">{check}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
