import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, useRoutes } from "react-router";
import { routes } from "./routes";

/** Re-exportado para o `scripts/prerender.mjs` ler a lista do MESMO lugar que o
 *  app: duas listas de rotas divergiriam em silêncio na primeira página nova. */
export { PRERENDER_ROUTES } from "./routes";

function AppRoutes() {
  return useRoutes(routes);
}

/**
 * Renderiza uma rota para HTML, em tempo de BUILD (ver `scripts/prerender.mjs`).
 * Não há servidor em produção: o resultado é gravado como arquivo estático.
 *
 * ⚠️ Aqui as rotas são montadas com `StaticRouter` + `useRoutes`, enquanto o
 * cliente usa `createBrowserRouter`. As duas montagens leem o MESMO array de
 * `routes.tsx`, então a árvore renderizada é a mesma — é isso que faz a
 * hidratação bater. Se alguém declarar rota só num dos lados, o HTML gerado
 * deixa de corresponder ao que hidrata.
 *
 * ⚠️ Sem `ThemeProvider` aqui, de propósito: o tema é aplicado pelo script
 * inline do `index.html`, antes do React existir. O `ThemeToggle` renderiza um
 * placeholder até montar, então servidor e primeiro render do cliente coincidem.
 */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
}
