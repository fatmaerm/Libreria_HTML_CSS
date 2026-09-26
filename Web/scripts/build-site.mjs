import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readSource, toIndexEntry, writeSources } from "./catalog-format.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryDirectory = path.resolve(scriptDirectory, "../..");
const libraryRoots = ["BibliotecaDeHtml_CSS", "CreacionesNuevas"].map((name) => ({
  name,
  directory: path.join(repositoryDirectory, name),
}));
const catalogFile = path.join(repositoryDirectory, "Web", "data", "catalog.json");
const sourcesDirectory = path.join(repositoryDirectory, "Web", "data", "sources");
const outputDirectory = path.resolve(repositoryDirectory, process.argv[2] ?? ".github-pages-site");

if (outputDirectory === repositoryDirectory || !outputDirectory.startsWith(`${repositoryDirectory}${path.sep}`)) {
  throw new Error("Choose a new output directory inside the repository.");
}

const catalog = JSON.parse(await readFile(catalogFile, "utf8"));
const approvedIndex = catalog.filter((component) => component.downloadable === true);
const approvedComponents = [];
for (const entry of approvedIndex) {
  approvedComponents.push({ ...entry, ...(await readSource(sourcesDirectory, entry.id)) });
}

const noticesCandidates = [
  path.join(repositoryDirectory, "THIRD_PARTY_NOTICES.md"),
  path.join(repositoryDirectory, "Docs", "Legalizacion", "THIRD_PARTY_NOTICES.md"),
];
const noticesSource = noticesCandidates.find((candidate) => existsSync(candidate));
if (!noticesSource) {
  throw new Error(`THIRD_PARTY_NOTICES.md not found. Looked in: ${noticesCandidates.join(", ")}`);
}

await mkdir(outputDirectory, { recursive: true });
await cp(path.join(repositoryDirectory, "Web"), path.join(outputDirectory, "Web"), { recursive: true });
await cp(path.join(repositoryDirectory, "index.html"), path.join(outputDirectory, "index.html"));
await cp(path.join(repositoryDirectory, "LICENSE"), path.join(outputDirectory, "LICENSE"));
await cp(noticesSource, path.join(outputDirectory, "THIRD_PARTY_NOTICES.md"));

for (const component of approvedComponents) {
  const root = libraryRoots.find((candidate) => candidate.name === component.root);
  if (!root) {
    throw new Error(`Unknown library root for ${component.id}: ${component.root}`);
  }
  const sourceDirectory = path.resolve(root.directory, ...component.folder.split("/"));
  if (!sourceDirectory.startsWith(`${root.directory}${path.sep}`)) {
    throw new Error(`Component path escapes the library: ${component.id}`);
  }
  const destinationDirectory = path.join(outputDirectory, component.root, ...component.folder.split("/"));
  await mkdir(path.dirname(destinationDirectory), { recursive: true });
  await cp(sourceDirectory, destinationDirectory, { recursive: true });
}

const outputSourcesDirectory = path.join(outputDirectory, "Web", "data", "sources");
await writeSources(outputSourcesDirectory, approvedComponents);

await writeFile(
  path.join(outputDirectory, "Web", "data", "catalog.json"),
  `${JSON.stringify(approvedComponents.map(toIndexEntry), null, 2)}\n`,
  "utf8",
);
await writeFile(
  path.join(outputDirectory, "Web", "data", "catalog.js"),
  `window.COMPONENT_CATALOG = ${JSON.stringify(approvedComponents)};\n`,
  "utf8",
);
await writeFile(path.join(outputDirectory, ".nojekyll"), "", "utf8");
console.log(`Prepared ${approvedComponents.length} cleared component(s) in ${path.relative(repositoryDirectory, outputDirectory)}.`);
