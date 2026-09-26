import { createStoredZip } from "./zip.js";

const catalogPath = "./data/catalog.json";
const previewRevision = "20260926-2";
const pageSize = 12;
const state = {
  components: [],
  category: "All",
  query: "",
  visibleCount: pageSize,
  toastTimer: null,
};

const elements = {
  catalogView: document.querySelector("#catalog-view"),
  detailView: document.querySelector("#component-detail"),
  publicationNotice: document.querySelector("#publication-notice"),
  featuredGrid: document.querySelector("#featured-grid"),
  search: document.querySelector("#component-search"),
  filters: document.querySelector("#category-filters"),
  grid: document.querySelector("#component-grid"),
  categoryGrid: document.querySelector("#category-grid"),
  resultsCount: document.querySelector("#results-count"),
  emptyState: document.querySelector("#empty-state"),
  loadMore: document.querySelector("#load-more"),
  toast: document.querySelector("#toast"),
  themeToggle: document.querySelector("#theme-toggle"),
};

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function getCategories() {
  return [...new Set(state.components.map((component) => component.category))].sort((first, second) => first.localeCompare(second));
}

function getFilteredComponents() {
  const query = normalizeText(state.query);
  return state.components.filter((component) => {
    const matchesCategory = state.category === "All" || component.category === state.category;
    const searchableText = normalizeText([
      component.name,
      component.category,
      component.description,
      ...(component.tags ?? []),
    ].join(" "));
    return matchesCategory && (!query || searchableText.includes(query));
  });
}

function renderFilters() {
  elements.filters.replaceChildren();
  for (const category of ["All", ...getCategories()]) {
    const button = createElement("button", "filter-button", category);
    button.type = "button";
    button.setAttribute("aria-pressed", String(state.category === category));
    button.addEventListener("click", () => {
      state.category = category;
      state.visibleCount = pageSize;
      renderFilters();
      renderComponents();
    });
    elements.filters.append(button);
  }
}

function createPreview(component, className) {
  const preview = createElement("div", className);
  preview.classList.add("live-preview");
  preview.dataset.previewState = "loading";
  const frame = document.createElement("iframe");
  frame.title = `${component.name} live preview`;
  frame.loading = "lazy";
  frame.referrerPolicy = "no-referrer";
  frame.setAttribute("sandbox", "allow-scripts allow-forms allow-popups");
  frame.addEventListener("load", () => {
    preview.dataset.previewState = "ready";
  }, { once: true });
  frame.addEventListener("error", () => {
    preview.dataset.previewState = "error";
  }, { once: true });
  preview.append(frame);
  const previewUrl = new URL(component.preview, document.baseURI);
  previewUrl.searchParams.set("previewRevision", previewRevision);
  frame.src = previewUrl.href;
  return preview;
}

function createComponentCard(component, index) {
  const article = createElement("article", "component-card");
  article.append(createPreview(component, "card-preview"));

  const previewLabel = createElement("span", "card-preview-label", "Live demo");
  article.querySelector(".card-preview").append(previewLabel);

  const content = createElement("div", "card-content");
  const top = createElement("div", "component-card-top");
  top.append(
    createElement("span", "component-category", component.category),
    createElement("span", "component-number", String(index + 1).padStart(3, "0")),
  );
  const heading = createElement("h3", "", component.name);
  const description = createElement("p", "", component.description);
  const link = createElement("a", "card-link", "View component");
  link.href = `?component=${encodeURIComponent(component.id)}`;
  const arrow = createElement("span", "", "→");
  arrow.setAttribute("aria-hidden", "true");
  link.append(arrow);
  content.append(top, heading, description, link);
  article.append(content);
  return article;
}

function renderComponents() {
  const filteredComponents = getFilteredComponents();
  const visibleComponents = filteredComponents.slice(0, state.visibleCount);
  elements.grid.replaceChildren(...visibleComponents.map((component, index) => createComponentCard(component, index)));
  elements.resultsCount.textContent = `${filteredComponents.length} ${filteredComponents.length === 1 ? "component" : "components"}`;
  elements.emptyState.hidden = filteredComponents.length > 0;
  elements.loadMore.hidden = visibleComponents.length >= filteredComponents.length;
}

function renderFeaturedComponents() {
  const featuredComponents = state.components.filter((component) => component.featured);
  elements.featuredGrid.replaceChildren(...featuredComponents.map((component, index) => createComponentCard(component, index)));
  elements.featuredGrid.closest(".featured-section").hidden = featuredComponents.length === 0;
}

function renderCategories() {
  const counts = new Map();
  for (const component of state.components) {
    counts.set(component.category, (counts.get(component.category) ?? 0) + 1);
  }

  elements.categoryGrid.replaceChildren();
  for (const category of getCategories()) {
    const button = createElement("button", "category-card");
    button.type = "button";
    button.setAttribute("aria-label", `Browse ${category} components`);
    button.append(
      createElement("span", "category-card-name", category),
      createElement("span", "category-card-count", `${counts.get(category)} components`),
    );
    button.addEventListener("click", () => {
      state.category = category;
      state.visibleCount = pageSize;
      renderFilters();
      renderComponents();
      document.querySelector("#components").scrollIntoView({ behavior: "smooth" });
    });
    elements.categoryGrid.append(button);
  }
}

function createCodeBlock(label, code) {
  const block = createElement("section", "code-block");
  const header = createElement("div", "code-block-header");
  const title = createElement("span", "code-label", label);
  const copyButton = createElement("button", "copy-button", "Copy");
  copyButton.type = "button";
  copyButton.addEventListener("click", async () => {
    try {
      await copyText(code);
      copyButton.textContent = "Copied!";
      showToast(`${label} copied to clipboard`);
      window.setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1400);
    } catch {
      showToast("Clipboard access is unavailable in this browser");
    }
  });
  header.append(title, copyButton);
  const pre = document.createElement("pre");
  const codeElement = document.createElement("code");
  codeElement.textContent = code || "No local source file found.";
  pre.append(codeElement);
  block.append(header, pre);
  return block;
}

async function copyText(value) {
  if (!navigator.clipboard?.writeText) throw new Error("Clipboard access is unavailable");
  await navigator.clipboard.writeText(value);
}

async function loadSourceFiles(files) {
  return Promise.all(files.map(async (file) => {
    const response = await fetch(new URL(file.path, document.baseURI));
    if (!response.ok) throw new Error(`Could not load ${file.name}`);
    return { name: file.name, code: await response.text() };
  }));
}

function appendSourceGroup(container, heading, files, inlineBlocks = []) {
  container.append(createElement("h3", "visually-hidden", heading));
  let blockIndex = 0;
  for (const file of files) {
    container.append(createCodeBlock(`${heading} · ${file.name}`, file.code));
    blockIndex += 1;
  }
  for (const [index, code] of inlineBlocks.entries()) {
    container.append(createCodeBlock(`${heading} · inline ${index + 1}`, code));
    blockIndex += 1;
  }
  if (blockIndex === 0) {
    container.append(createCodeBlock(heading, "No local source file found."));
  }
}

async function downloadComponentZip(component) {
  const files = await Promise.all(component.files.map(async (file) => {
    const response = await fetch(new URL(file.path, document.baseURI));
    if (!response.ok) throw new Error(`Could not load ${file.name}`);
    return {
      name: file.archivePath,
      bytes: new Uint8Array(await response.arrayBuffer()),
    };
  }));
  const attribution = [
    `Source: ${component.source}`,
    `License: ${component.license}`,
    `License file: ${component.licenseFile}`,
  ].join("\n");
  files.push({
    name: `${component.id}/ATTRIBUTION.txt`,
    bytes: new TextEncoder().encode(`${attribution}\n`),
  });

  const archive = createStoredZip(files);
  const archiveUrl = URL.createObjectURL(archive);
  const downloadLink = createElement("a");
  downloadLink.href = archiveUrl;
  downloadLink.download = `${component.id}.zip`;
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.setTimeout(() => URL.revokeObjectURL(archiveUrl), 1000);
}

function createDetailHeading(component) {
  const heading = createElement("div", "detail-heading");
  const copy = createElement("div");
  copy.append(
    createElement("p", "detail-kicker", `${component.category} / ${component.folder}`),
    createElement("h1", "", component.name),
    createElement("p", "detail-description", component.description),
  );
  const actions = createElement("div", "detail-actions");
  const originalLink = createElement("a", "button button-secondary", "Open original ↗");
  const originalUrl = new URL(component.preview, document.baseURI);
  originalUrl.searchParams.set("previewRevision", previewRevision);
  originalLink.href = originalUrl.href;
  originalLink.target = "_blank";
  originalLink.rel = "noreferrer";
  const zipButton = createElement("button", "button button-secondary download-button", component.downloadable ? "Download ZIP" : "ZIP unavailable");
  zipButton.type = "button";
  zipButton.disabled = !component.downloadable;
  zipButton.title = component.downloadable
    ? "Download this component and its local assets"
    : "Source, redistribution permission, and a component license file must be verified first";
  zipButton.setAttribute("aria-label", zipButton.title);
  if (component.downloadable) {
    zipButton.addEventListener("click", async () => {
      zipButton.disabled = true;
      zipButton.textContent = "Preparing ZIP...";
      try {
        await downloadComponentZip(component);
        showToast("Component ZIP downloaded");
      } catch (error) {
        showToast(`Could not create ZIP: ${error.message}`);
      } finally {
        zipButton.disabled = false;
        zipButton.textContent = "Download ZIP";
      }
    });
  }
  actions.append(originalLink, zipButton);
  heading.append(copy, actions);
  return heading;
}

function createProvenanceNote(component) {
  const isVerified = component.downloadable === true;
  const note = createElement("p", "provenance-note");
  note.append(
    createElement("strong", "", isVerified ? "Redistribution cleared." : "Distribution not cleared."),
    document.createTextNode(isVerified
      ? `Source: ${component.source}. License: ${component.license}.`
      : "ZIP downloads stay disabled until the source, redistribution permission, and a license file for this component are verified."),
  );
  return note;
}

function createMissingReferencesNote(component) {
  const missingReferences = component.missingReferences ?? [];
  if (!missingReferences.length) return null;
  const references = missingReferences.join(", ");
  return createElement(
    "p",
    "error-message",
    `This original demo references missing local files: ${references}. Its preview may be incomplete; the source files have not been changed.`,
  );
}

async function renderDetail(component) {
  elements.catalogView.hidden = true;
  elements.detailView.hidden = false;
  elements.detailView.replaceChildren();
  document.title = `${component.name} · HTML & CSS Library`;

  const backLink = createElement("a", "detail-back", "← Back to components");
  backLink.href = "#components";
  backLink.addEventListener("click", () => {
    window.history.pushState({}, "", `${window.location.pathname}#components`);
    renderRoute();
  });

  const previewPanel = createElement("section", "preview-panel");
  const previewHeader = createElement("div", "preview-panel-header");
  previewHeader.append(
    createElement("span", "", "Original component · interactive preview"),
  );
  const previewLink = createElement("a", "preview-open-link", "Open in new tab ↗");
  const previewUrl = new URL(component.preview, document.baseURI);
  previewUrl.searchParams.set("previewRevision", previewRevision);
  previewLink.href = previewUrl.href;
  previewLink.target = "_blank";
  previewLink.rel = "noreferrer";
  previewHeader.append(previewLink);
  previewPanel.append(previewHeader, createPreview(component, ""));

  const sourceSection = createElement("section", "source-section");
  sourceSection.append(createElement("h2", "", "Source code"));
  sourceSection.append(createCodeBlock("HTML · index.html", component.html));

  elements.detailView.append(backLink, createDetailHeading(component));
  const missingReferencesNote = createMissingReferencesNote(component);
  if (missingReferencesNote) elements.detailView.append(missingReferencesNote);
  elements.detailView.append(previewPanel, sourceSection, createProvenanceNote(component));

  try {
    const [stylesheets, scripts] = await Promise.all([
      loadSourceFiles(component.stylesheets ?? []),
      loadSourceFiles(component.scripts ?? []),
    ]);
    appendSourceGroup(sourceSection, "CSS", stylesheets, component.inlineCss ?? []);
    if (scripts.length || component.inlineJavaScript?.length) {
      appendSourceGroup(sourceSection, "JavaScript", scripts, component.inlineJavaScript ?? []);
    }
  } catch (error) {
    const message = createElement("p", "error-message", `Some source files could not be loaded. Open the original demo to inspect them. ${error.message}`);
    sourceSection.append(message);
  }
}

function renderRoute() {
  const componentId = new URLSearchParams(window.location.search).get("component");
  const component = state.components.find((entry) => entry.id === componentId);
  if (component) {
    renderDetail(component);
    return;
  }

  elements.detailView.hidden = true;
  elements.catalogView.hidden = false;
  document.title = "HTML & CSS Library";
  renderComponents();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2200);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const nextTheme = theme === "dark" ? "light" : "dark";
  elements.themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  elements.themeToggle.querySelector(".theme-label").textContent = nextTheme === "light" ? "Light" : "Dark";
  elements.themeToggle.querySelector(".theme-icon").textContent = theme === "dark" ? "☼" : "◐";
  try {
    localStorage.setItem("component-field-theme", theme);
  } catch {
    showToast("Theme preference will not be saved in this browser");
  }
}

function initializeTheme() {
  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem("component-field-theme") ?? "dark";
  } catch {
    savedTheme = "dark";
  }
  applyTheme(savedTheme === "light" ? "light" : "dark");
  elements.themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

function initializeNavigation() {
  document.querySelectorAll('.main-nav a[href^="#"], .brand[href^="#"], .hero-actions a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (new URLSearchParams(window.location.search).has("component")) {
        event.preventDefault();
        const destination = link.getAttribute("href");
        window.history.pushState({}, "", `${window.location.pathname}${destination}`);
        renderRoute();
        document.querySelector(destination)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  window.addEventListener("popstate", renderRoute);
  window.addEventListener("hashchange", () => {
    if (!new URLSearchParams(window.location.search).has("component")) renderRoute();
  });
}

function initializeSearch() {
  elements.search.addEventListener("input", () => {
    state.query = elements.search.value;
    state.visibleCount = pageSize;
    renderComponents();
  });
  elements.loadMore.addEventListener("click", () => {
    state.visibleCount += pageSize;
    renderComponents();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      elements.search.focus();
    }
    if (event.key === "Escape" && document.activeElement === elements.search) {
      elements.search.value = "";
      state.query = "";
      state.visibleCount = pageSize;
      renderComponents();
    }
  });
}

async function initializeApp() {
  initializeTheme();
  initializeNavigation();
  initializeSearch();
  document.querySelector("#footer-year").textContent = String(new Date().getFullYear());

  try {
    const response = await fetch(catalogPath);
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
    state.components = await response.json();
    elements.publicationNotice.hidden = state.components.length > 0;
    document.querySelector("#stat-components").textContent = String(state.components.length);
    document.querySelector("#stat-categories").textContent = String(getCategories().length);
    renderFeaturedComponents();
    renderFilters();
    renderCategories();
    renderRoute();
  } catch (error) {
    elements.resultsCount.textContent = "Catalog unavailable";
    elements.grid.replaceChildren(createElement("p", "error-message", `Could not load the component catalog. Run the site from a local web server and regenerate it if needed. ${error.message}`));
  }
}

await initializeApp();
