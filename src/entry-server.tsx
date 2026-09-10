import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, useRoutes } from "react-router";
import { routes } from "./routes";

export { PRERENDER_ROUTES } from "./routes";

function AppRoutes() {
  return useRoutes(routes);
}


export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
}
