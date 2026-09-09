import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import "@fontsource-variable/manrope";
import "./styles/index.css";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

const tree = (
  <StrictMode>
    {/*
      `storageKey` tem que bater com a do script inline do index.html, senão o
      script pinta um tema e o toggle salva noutro lugar.

      `enableSystem={false}` + `defaultTheme="dark"`: a LP abre no escuro, que é
      o tema em que a marca foi desenhada, e quem preferir claro troca no botão
      da nav — a escolha fica salva. `disableTransitionOnChange` evita a página
      inteira animar cor no clique do toggle.
    */}
    <ThemeProvider
      attribute="class"
      storageKey="alita-lp-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);

const container = document.getElementById("root");
if (!container) throw new Error("Elemento #root não encontrado");

// O build pré-renderiza o HTML de cada rota (scripts/prerender.mjs). Quando ele
// existe, hidrata em cima; em `vite dev` o container vem vazio e é montagem
// normal. Hidratar um container vazio dispararia aviso e re-render à toa.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
