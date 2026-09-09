import type { RouteObject } from "react-router-dom";
import { App } from "./App";
import { Home } from "./features/home/Home";
import { Pricing } from "./features/pricing/Pricing";
import { NotFound } from "./features/NotFound";

/**
 * As rotas ficam num array simples (não em `createBrowserRouter` aqui) porque
 * o mesmo array é montado de dois jeitos: `createBrowserRouter` no navegador e
 * `createStaticHandler`/`StaticRouter` no pré-render. Uma fonte só de rotas
 * para os dois — se divergirem, o HTML gerado deixa de bater com o que hidrata.
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "planos", element: <Pricing /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

/** Rotas que o build pré-renderiza. Somar página nova aqui, senão ela sobe sem HTML. */
export const PRERENDER_ROUTES = ["/", "/planos"] as const;
