import { mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Entrada de índice: todo lo que la lista necesita, sin el código fuente.
 * Los `stylesheets`/`scripts` conservan solo `name` y `path`; el código se
 * pide con `fetch` al abrir el detalle.
 */
export function toIndexEntry(component) {
  const { html, inlineCss, inlineJavaScript, files, stylesheets, scripts, ...index } = component;
  return {
    ...index,
    stylesheets: (stylesheets ?? []).map(({ name, path: entryPath }) => ({ name, path: entryPath })),
    scripts: (scripts ?? []).map(({ name, path: entryPath }) => ({ name, path: entryPath })),
  };
}

/** Pago del detalle: HTML de la página, bloques inline y lista de archivos del ZIP. */
export function toSourceEntry(component) {
  return {
    html: component.html,
    inlineCss: component.inlineCss ?? [],
    inlineJavaScript: component.inlineJavaScript ?? [],
    files: component.files ?? [],
  };
}

export async function writeSources(sourcesDirectory, components, { removeOrphans = true } = {}) {
  await mkdir(sourcesDirectory, { recursive: true });
  const expected = new Set(components.map((component) => `${component.id}.json`));

  if (removeOrphans) {
    for (const name of await readdir(sourcesDirectory)) {
      if (name.endsWith(".json") && !expected.has(name)) {
        await unlink(path.join(sourcesDirectory, name));
      }
    }
  }

  for (const component of components) {
    await writeFile(
      path.join(sourcesDirectory, `${component.id}.json`),
      `${JSON.stringify(toSourceEntry(component))}\n`,
      "utf8",
    );
  }
}

export async function readSource(sourcesDirectory, componentId) {
  return JSON.parse(await readFile(path.join(sourcesDirectory, `${componentId}.json`), "utf8"));
}
