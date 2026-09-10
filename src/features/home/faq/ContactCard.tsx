import { useId, useState } from "react";
import { CircleCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/Button";
import { SITE } from "@/constants";
import { cn } from "@/lib/cn";
import { GradientField } from "./GradientField";

const WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL as
  | string
  | undefined;

type WebhookPayload = { success?: unknown; message?: unknown };

const INTRO = "Ainda ficou com alguma dúvida? Fale com nosso time.";

type Status = "idle" | "sending" | "sent" | "error";

function mailtoHref(email: string, message: string) {
  const subject = encodeURIComponent("Dúvida pelo site do Alita Care");
  const body = encodeURIComponent(
    `${message}

---
Responder para: ${email}`,
  );

  return `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`;
}

export function ContactCard() {
  const messageId = useId();
  const emailId = useId();
  const errorId = useId();
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    if (!WEBHOOK_URL) {
      window.location.href = mailtoHref(email, message);
      setStatus("sent");
      form.reset();
      return;
    }

    data.append("to", SITE.contactEmail);
    data.append("_subject", `Dúvida pelo site do Alita Care (${email})`);
    data.append("_replyto", email);
    setStatus("sending");
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: data,
      });
      if (!response.ok) throw new Error(String(response.status));

      const payload = (await response
        .json()
        .catch(() => null)) as WebhookPayload | null;

      if (payload?.success !== undefined && String(payload.success) !== "true") {
        throw new Error(String(payload.message ?? "envio recusado"));
      }

      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error("[contato] o envio não foi aceito", error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <p className="type-body text-pretty text-text-muted">{INTRO}</p>

      <GradientField>
        <label htmlFor={emailId} className="sr-only">
          Seu e-mail
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          spellCheck={false}
          placeholder="nome@empresa.com"
          className={cn(
            "h-11 rounded-t-[0.6875rem] bg-transparent px-4",
            "type-body text-text placeholder:text-text-muted max-md:text-base",
            "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
          )}
        />
        <span aria-hidden className="mx-4 h-px bg-border" />
        <label htmlFor={messageId} className="sr-only">
          Sua dúvida
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={8}
          aria-describedby={status === "error" ? errorId : undefined}
          aria-invalid={status === "error" || undefined}
          placeholder="Conte o que você precisa saber…"
          className={cn(
            "resize-y rounded-b-[0.6875rem] bg-transparent p-4",
            "type-body text-text placeholder:text-text-muted max-md:text-base",
            "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
          )}
        />
      </GradientField>

      <p
        id={errorId}
        aria-live="polite"
        className={cn(
          "type-caption",
          status === "error" && "text-text",
          status === "sent" && "flex items-center gap-1.5 text-success",
          status !== "error" && status !== "sent" && "sr-only",
        )}
      >
        {status === "sent" ? (
          <>
            <CircleCheck className="size-3.5" aria-hidden />
            {WEBHOOK_URL
              ? "Recebemos a sua dúvida. O time responde no e-mail informado."
              : "Abrimos o seu e-mail com a dúvida pronta. Basta enviar."}
          </>
        ) : null}
        {status === "error" ? (
          <>
            Não foi possível enviar agora. Tente de novo em instantes ou escreva
            direto para{" "}
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="underline underline-offset-4"
            >
              {SITE.contactEmail}
            </a>
            .
          </>
        ) : null}
      </p>

              <Button
            type="submit"
            variant="metal"
            disabled={status === "sending"}
            className="self-end"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="animate-spin" aria-hidden />
                Enviando…
              </>
            ) : (
              "Enviar dúvida"
            )}
          </Button>
    </form>
  );
}
