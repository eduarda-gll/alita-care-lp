import type { RouteObject } from "react-router-dom";
import { App } from "./App";
import { Home } from "./features/home/Home";
import { Pricing } from "./features/pricing/Pricing";
import { PrivacyPolicy } from "./features/legal/PrivacyPolicy";
import { TermsOfService } from "./features/legal/TermsOfService";
import { NotFound } from "./features/NotFound";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "planos", element: <Pricing /> },
      { path: "politica-de-privacidade", element: <PrivacyPolicy /> },
      { path: "termos-de-servico", element: <TermsOfService /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

/** Rotas que o build pré-renderiza. Somar página nova aqui, senão ela sobe sem HTML. */
export const PRERENDER_ROUTES = [
  "/",
  "/planos",
  "/politica-de-privacidade",
  "/termos-de-servico",
] as const;
