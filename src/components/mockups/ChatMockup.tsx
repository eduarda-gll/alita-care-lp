import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/cn";

export type ChatMessage = {
  from: "lead" | "alita";
  text: string;
  time: string;
};

export function ChatMockup({
  channel,
  messages,
  className,
}: {
  channel: string;
  messages: ChatMessage[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-mockup-border bg-mockup-bg",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-mockup-border px-4 py-3">
        <span className="size-2 rounded-full bg-success" aria-hidden />
        <span className="type-caption text-mockup-text">{channel}</span>
        <span className="ml-auto type-micro text-mockup-muted">
          Atendimento da IA
        </span>
      </div>

      <ol className="flex flex-col gap-3 p-4">
        {messages.map((message, index) => {
          const isAlita = message.from === "alita";
          return (
            <li
              key={index}
              className={cn("flex", isAlita ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5",
                  isAlita
                    ? "rounded-br-sm bg-accent-strong text-on-accent"
                    : "rounded-bl-sm bg-surface-recessed text-mockup-text",
                )}
              >
                <p className="type-support text-pretty">{message.text}</p>
                <p
                  className={cn(
                    "mt-1 flex items-center justify-end gap-1 type-micro",
                    isAlita ? "text-on-accent/70" : "text-mockup-muted",
                  )}
                >
                  {message.time}
                  {isAlita ? (
                    <CheckCheck className="size-3" aria-hidden />
                  ) : (
                    <Check className="size-3" aria-hidden />
                  )}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
