import { useId, useState } from "react";
import { ArrowRight, CircleCheck, Loader2 } from "lucide-react";
import { Button, ButtonLink } from "@/components/Button";
import { CTA_URL } from "@/constants";
import { cn } from "@/lib/cn";

/**
 * Endpoint que recebe a dúvida. Fica em variável de ambiente porque é
 * infraestrutura, não conteúdo: muda por ambiente sem tocar no código.
 *
 * ⚠️ Vazia é o estado ESPERADO enquanto o webhook não existir. Nesse caso o
 * card não renderiza um formulário morto — ele troca por um caminho de contato
 * que funciona de verdade. Formulário que aceita o envio e joga fora é pior que
 * formulário nenhum: o visitante acha que pediu ajuda e fica esperando.
 */
const WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL as
  | string
  | undefined;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactCard() {
  const messageId = useId();
  const emailId = useId();
  const errorId = useId();
  const [status, setStatus] = useState<Status>("idle");

  if (!WEBHOOK_URL) {
    return (
      <div className="flex flex-col gap-4 rounded-card border border-border bg-surface-recessed p-6">
        <p className="type-body-strong text-text">
          Ainda ficou com alguma dúvida?
        </p>
        <p className="type-body text-pretty text-text-muted-on-recessed">
          Fale com o nosso time. A gente responde o que a página não respondeu e
          mostra a Alita atendendo de verdade.
        </p>
        <ButtonLink href={CTA_URL} className="mt-1 self-start">
          Falar com o time
          <ArrowRight aria-hidden />
        </ButtonLink>
      </div>
    );
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: data,
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-card border border-border bg-surface-recessed p-6"
    >
      <p className="type-body-strong text-text">Ainda ficou com alguma dúvida?</p>
      <p className="type-body text-pretty text-text-muted-on-recessed">
        Escreva aqui e o nosso time responde.
      </p>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={emailId} className="type-label text-text">
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
          className="h-10 rounded-lg border border-border bg-surface px-3 type-body text-text placeholder:text-text-subtle max-md:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={messageId} className="type-label text-text">
          Sua dúvida
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={4}
          aria-describedby={status === "error" ? errorId : undefined}
          aria-invalid={status === "error" || undefined}
          placeholder="Conte o que você precisa saber…"
          className="resize-y rounded-lg border border-border bg-surface p-3 type-body text-text placeholder:text-text-subtle max-md:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </div>

      {/* `aria-live` porque o resultado aparece sem ação direta sobre ele. */}
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
            Recebemos a sua dúvida. O time responde no e-mail informado.
          </>
        ) : null}
        {status === "error"
          ? "Não foi possível enviar agora. Tente de novo em instantes ou fale com o time pelo botão do topo."
          : null}
      </p>

      {/* Submit fica habilitado até o envio começar: desabilitar antes disso
          seria especulação sobre o que o visitante ainda vai digitar. */}
      <Button type="submit" disabled={status === "sending"} className="self-end">
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
