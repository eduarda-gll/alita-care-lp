#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const clientDir = join(root, "build");
const ssrEntry = join(root, "build-ssr", "entry-server.js");

const PLACEHOLDER = "<!--app-html-->";

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
