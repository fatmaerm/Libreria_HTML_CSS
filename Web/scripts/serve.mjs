import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const port = Number(process.env.PORT ?? 8000);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function resolveRequest(url) {
  const requested = decodeURIComponent(url.split("?")[0].split("#")[0]);
  const base = path.resolve(repositoryDirectory, `.${path.posix.sep}${requested}`);
  // Nunca dejar que una ruta salga de la raiz del repositorio. path.relative es
  // la comprobacion correcta: un startsWith sin separador final dejaria pasar
  // una carpeta vecina cuyo nombre empiece por el del repositorio.
  const relative = path.relative(repositoryDirectory, base);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return base;
}

const server = http.createServer(async (request, response) => {
  let file = resolveRequest(request.url ?? "/");
  if (!file) {
    response.writeHead(403).end("403");
    return;
  }
  try {
    const info = await stat(file);
    if (info.isDirectory()) file = path.join(file, "index.html");
    const body = await readFile(file);
    response.writeHead(200, {
      "content-type": contentTypes[path.extname(file).toLowerCase()] ?? "application/octet-stream",
      "cache-control": "no-cache",
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("404");
  }
});

server.listen(port, () => {
  console.log(`Sirviendo el repositorio en http://localhost:${port}/`);
  console.log(`La web esta en http://localhost:${port}/Web/`);
});
