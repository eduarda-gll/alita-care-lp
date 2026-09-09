import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/**
 * Leva a página até a âncora quando o hash muda.
 *
 * O React Router não faz isso sozinho: `<Link to="/#faq">` troca o hash e para
 * por aí. Cobre os dois casos com o mesmo efeito — clicar numa âncora estando
 * na home, e vir de `/planos` (aí o pathname muda primeiro e o alvo só existe
 * depois do render, daí o `requestAnimationFrame`).
 *
 * Sem hash, volta ao topo: é o que se espera ao trocar de página.
 */
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const frame = requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <>
      {/* Primeiro foco da página, escondido até receber foco pelo teclado. */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-accent-strong focus:px-4 focus:py-2 focus:type-label focus:text-on-accent"
      >
        Pular para o conteúdo
      </a>
      <ScrollToHash />
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
