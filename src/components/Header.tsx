import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CTA_URL, NAV_LINKS } from "@/constants";
import { BrandMark } from "./BrandMark";
import { ButtonLink } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

/**
 * Nav sticky em pílula flutuante, como no Figma.
 *
 * ⚠️ O `<header>` é `sticky top-0` mas NÃO pinta fundo próprio: o fundo é da
 * pílula interna. É o que faz a nav flutuar sobre a nebulosa do hero em vez de
 * cortá-la com uma faixa opaca.
 *
 * A âncora que a nav aponta não pode parar atrás dela — quem resolve isso é o
 * `scroll-padding-top` da `<html>` (styles/index.css), não um offset em JS.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Fecha ao navegar. Sem isso o painel fica aberto por cima da página nova.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  // Esc e clique fora. O menu é montado à mão (não é Radix), então nenhum dos
  // dois vem de graça.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const linkClasses =
    "type-label rounded-full px-3 py-2 text-text-muted transition-colors duration-200 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <Container>
        <nav
          aria-label="Principal"
          className={cn(
            "flex items-center gap-2 rounded-full border border-border/80 p-2",
            // A translucidez é o que deixa a nebulosa do hero passar por baixo.
            "bg-surface/80 backdrop-blur-xl",
          )}
        >
          <Link
            to="/"
            aria-label="Alita Care, ir para o início"
            className="ml-1 inline-flex shrink-0 items-center gap-2 rounded-full px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <BrandMark className="h-6" />
            <span className="type-label text-text max-sm:sr-only">Alita</span>
          </Link>

          <ul className="mx-auto hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className={linkClasses}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <ThemeToggle />
            <ButtonLink href={CTA_URL} size="sm" className="max-sm:hidden">
              Fale com a Alita
            </ButtonLink>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="inline-flex size-9 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Painel mobile. `hidden` em vez de desmontar mantém o alvo do
            `aria-controls` sempre no DOM, que é o que o atributo pressupõe. */}
        <div
          id="menu-mobile"
          ref={panelRef}
          hidden={!open}
          className="mt-2 rounded-card border border-border bg-surface p-2 md:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="block rounded-lg px-3 py-2.5 type-label text-text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href={CTA_URL} size="md" className="mt-2 w-full">
            Fale com a Alita
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
