#!/usr/bin/env node
/**
 * Gera um HTML estático por rota, em tempo de build.
 *
 * POR QUE ISTO EXISTE: uma SPA Vite entrega `<div id="root"></div>` vazio para
 * o crawler. Numa LP, cujo trabalho inteiro é ser encontrada, isso é o bastante
 * para não ranquear. Este passo resolve sem trocar o stack por Next/TanStack
 * Start: o mesmo React renderiza para string no build, e o cliente HIDRATA em
 * cima (ver `main.tsx`).
 *
 * O resultado é `build/index.html` e `build/planos/index.html`, servidos por
 * qualquer host estático. O SPA fallback continua valendo para rota não
 * pré-renderizada.
 *
 * Rodar depois de `vite build` e `vite build --ssr`. O `npm run build` encadeia
 * os três.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const clientDir = join(root, "build");
const ssrEntry = join(root, "build-ssr", "entry-server.js");

const PLACEHOLDER = "<!--app-html-->";

// `render` e a lista de rotas vêm do MESMO bundle, que por sua vez lê
// `src/routes.tsx`: uma fonte só, então página nova entra no pré-render só de
// ser somada lá.
const { render, PRERENDER_ROUTES } = await import(pathToFileURL(ssrEntry).href);

const template = await readFile(join(clientDir, "index.html"), "utf8");

if (!template.includes(PLACEHOLDER)) {
  throw new Error(
    `O index.html gerado não contém ${PLACEHOLDER}. Sem o marcador não há onde ` +
      "injetar o HTML — confira o index.html da raiz.",
  );
}

for (const route of PRERENDER_ROUTES) {
  const html = render(route);
  const page = template.replace(PLACEHOLDER, html);
  const outPath =
    route === "/"
      ? join(clientDir, "index.html")
      : join(clientDir, route.replace(/^\//, ""), "index.html");

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, page, "utf8");
  console.log(`pré-renderizado  ${route.padEnd(10)} -> ${outPath.replace(root, ".")}`);
}

console.log(`\n${PRERENDER_ROUTES.length} rota(s) com HTML estático.`);
