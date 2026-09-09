import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Alterna claro/escuro.
 *
 * ⚠️ O `mounted` não é cerimônia: no primeiro render (servidor e hidratação) o
 * `next-themes` ainda não leu o `localStorage`, então renderizar o ícone real
 * ali daria mismatch de hidratação e um piscar do ícone errado. Antes de montar
 * sai um placeholder do MESMO tamanho, pra nada saltar de lugar.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const base = cn(
    "inline-flex size-9 shrink-0 items-center justify-center rounded-full",
    "text-text-muted transition-[color,background-color] duration-200",
    "hover:bg-surface-hover hover:text-text",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    className,
  );

  if (!mounted) {
    return <span aria-hidden className={base} />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      className={base}
    >
      {isDark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
    </button>
  );
}
