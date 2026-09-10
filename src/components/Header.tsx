import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CTA_URL, NAV_LINKS } from "@/constants";
import { BrandMark } from "./BrandMark";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

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
            "flex items-center gap-2 rounded-full border p-2 pr-3",
            "transition-[background-color,border-color,backdrop-filter] duration-300 ease-out-soft",
            scrolled || open
              ? "border-border/60 bg-surface/70 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Link
            to="/"
            aria-label="Alita Care, ir para o início"
            className="ml-1 inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <BrandMark className="h-9" />
            <span className="type-label text-brand-blue max-sm:sr-only">
              Care
            </span>
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

          <div className="ml-auto flex items-center gap-5 md:ml-0">
            <ButtonLink
              href={CTA_URL}
              variant="metal"
              size="sm"
              className="max-sm:hidden"
            >
              Acessar Care
            </ButtonLink>

            {/* Menu mobile */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="inline-flex size-9 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
            >
              {open ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </nav>

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

          <ButtonLink
            href={CTA_URL}
            variant="metal"
            size="md"
            className="mt-2 w-full"
          >
            Acessar Care
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}