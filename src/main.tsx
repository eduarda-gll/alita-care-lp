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
    
    */}
    <ThemeProvider
      attribute="class"
      storageKey="alita-lp-theme"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);

const container = document.getElementById("root");
if (!container) throw new Error("Elemento #root não encontrado");

if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
