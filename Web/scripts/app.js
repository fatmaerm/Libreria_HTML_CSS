const catalogPath = "./data/catalog.json";
const fullCatalogPath = "./data/catalog.js";
const previewRevision = "20260926-2";
const pageSize = 12;
const translations = {
  en: {
    categories: {
      All: "All", Animations: "Animations", Buttons: "Buttons", Cards: "Cards", Controls: "Controls",
      Effects: "Effects", Forms: "Forms", Galleries: "Galleries", Loaders: "Loaders", Navigation: "Navigation", Other: "Other",
    },
    brandHome: "HTML and CSS Library home",
    mainNavigation: "Main navigation",
    languageLabel: "Language",
    navHome: "Home",
    navComponents: "Components",
    navCategories: "Categories",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    switchTheme: "Switch theme",
    light: "Light",
    dark: "Dark",
    heroTitleFirst: "HTML & CSS",
    heroTitleSecond: "Library",
    publicationTitle: "Distribution review in progress.",
    publicationText: "This published build includes only demos with verified redistribution rights. No component is cleared for release yet.",
    publicationZipTitle: "ZIP downloads pending verification.",
    publicationZipText: "You can browse, preview, and copy the source of every demo. ZIP downloads stay disabled until each component's redistribution rights are verified.",
    heroEyebrow: "A working library of web experiments",
    heroDescription: "A growing index of interface components, visual effects, and small experiments. Browse the original demos, inspect their source, and take the patterns into your next project.",
    exploreComponents: "Explore components",
    viewGitHub: "View on GitHub",
    librarySummary: "Library summary",
    collectionIndex: "COLLECTION INDEX",
    heroAsideLineOne: "Small pieces.",
    heroAsideLineTwo: "Useful details.",
    experiments: "experiments",
    categoriesLabel: "categories",
    categoriesTitle: "Categories",
    selectedComponents: "SELECTED COMPONENTS",
    featuredTitle: "A few to explore",
    featuredNote: "Real demos from the collection, selected for a quick first look.",
    collectionEyebrow: "THE COLLECTION",
    browseComponents: "Browse components",
    libraryNote: "Search the details. Open a demo. Make it yours.",
    searchPlaceholder: "Search buttons, cards, effects...",
    loadingCollection: "Loading collection...",
    filterByCategory: "Filter by category",
    noComponents: "No components found",
    noComponentsHint: "Try another search or choose a different category.",
    loadMore: "Load more",
    findStartingPoint: "FIND A STARTING POINT",
    categoriesNote: "Grouped from the component names and folders.",
    footerDescription: "Independent HTML, CSS, and JavaScript experiments.",
    footerBuilt: "Built for the open web",
    component: "component",
    components: "components",
    browseCategory: "Browse {category} components",
    viewComponent: "View component",
    liveDemo: "Live demo",
    copied: "Copied!",
    copy: "Copy",
    copiedToClipboard: "{label} copied to clipboard",
    clipboardUnavailable: "Clipboard access is unavailable in this browser",
    noLocalSource: "No local source file found.",
    originalComponentPreview: "Original component · interactive preview",
    openOriginal: "Open original ↗",
    openInNewTab: "Open in new tab ↗",
      livePreviewTitle: "{name} live preview",
      sourceLabel: "Source",
      licenseLabel: "License",
      licenseFileLabel: "License file",
    downloadZip: "Download ZIP",
    zipUnavailable: "ZIP unavailable",
    downloadZipTitle: "Download this component and its local assets",
    zipPermissionTitle: "Source, redistribution permission, and a component license file must be verified first",
    preparingZip: "Preparing ZIP...",
    zipDownloaded: "Component ZIP downloaded",
    zipFailed: "Could not create ZIP: {message}",
    attributionRecorded: "Redistribution cleared.",
    attributionPending: "Distribution not cleared.",
    attributionText: "Source: {source}. License: {license}.",
    attributionPendingText: "ZIP downloads stay disabled until the source, redistribution permission, and a license file for this component are verified.",
    missingFiles: "This original demo references missing local files: {files}. Its preview may be incomplete; the source files have not been changed.",
    backToComponents: "← Back to components",
    sourceCode: "Source code",
    htmlSource: "HTML · index.html",
    cssSource: "CSS",
    javascriptSource: "JavaScript",
    inlineSource: "{label} · inline {number}",
    localFileSource: "{label} · {name}",
    sourceLoadError: "Some source files could not be loaded. Open the original demo to inspect them. {message}",
    libraryTitle: "HTML & CSS Library",
    catalogUnavailable: "Catalog unavailable",
    catalogLoadError: "Could not load the component catalog. Run the site from a local web server and regenerate it if needed. {message}",
    themeNotSaved: "Theme preference will not be saved in this browser",
    languageNotSaved: "Language preference will not be saved in this browser",
    loadingPreview: "Loading preview...",
    previewUnavailable: "Preview unavailable",
  },
  es: {
    categories: {
      All: "Todas", Animations: "Animaciones", Buttons: "Botones", Cards: "Tarjetas", Controls: "Controles",
      Effects: "Efectos", Forms: "Formularios", Galleries: "Galerías", Loaders: "Indicadores de carga", Navigation: "Navegación", Other: "Otros",
    },
    brandHome: "Inicio de la biblioteca HTML y CSS",
    mainNavigation: "Navegación principal",
    languageLabel: "Idioma",
    navHome: "Inicio",
    navComponents: "Componentes",
    navCategories: "Categorías",
    switchToLight: "Cambiar al tema claro",
    switchToDark: "Cambiar al tema oscuro",
    switchTheme: "Cambiar tema",
    light: "Claro",
    dark: "Oscuro",
    heroTitleFirst: "Biblioteca",
    heroTitleSecond: "HTML y CSS",
    publicationTitle: "Revisión de distribución en curso.",
    publicationText: "Esta versión publicada solo incluye demos con derechos de redistribución verificados. Todavía no hay componentes autorizados.",
    publicationZipTitle: "Descargas ZIP pendientes de verificación.",
    publicationZipText: "Puedes explorar, previsualizar y copiar el código de cada demo. Las descargas ZIP siguen deshabilitadas hasta verificar los derechos de redistribución de cada componente.",
    heroEyebrow: "Una biblioteca activa de experimentos web",
    heroDescription: "Un índice en crecimiento de componentes de interfaz, efectos visuales y pequeños experimentos. Explora los demos originales, consulta su código y adapta sus ideas a tu próximo proyecto.",
    exploreComponents: "Explorar componentes",
    viewGitHub: "Ver en GitHub",
    librarySummary: "Resumen de la biblioteca",
    collectionIndex: "ÍNDICE DE LA COLECCIÓN",
    heroAsideLineOne: "Pequeñas piezas.",
    heroAsideLineTwo: "Detalles útiles.",
    experiments: "experimentos",
    categoriesLabel: "categorías",
    categoriesTitle: "Categorías",
    selectedComponents: "COMPONENTES DESTACADOS",
    featuredTitle: "Algunos para explorar",
    featuredNote: "Demos reales de la colección para empezar a explorar.",
    collectionEyebrow: "LA COLECCIÓN",
    browseComponents: "Explorar componentes",
    libraryNote: "Busca detalles. Abre un demo. Hazlo tuyo.",
    searchPlaceholder: "Buscar botones, tarjetas, efectos...",
    loadingCollection: "Cargando colección...",
    filterByCategory: "Filtrar por categoría",
    noComponents: "No se encontraron componentes",
    noComponentsHint: "Prueba otra búsqueda o elige una categoría diferente.",
    loadMore: "Cargar más",
    findStartingPoint: "ENCUENTRA UN PUNTO DE PARTIDA",
    categoriesNote: "Agrupados según los nombres de los componentes y sus carpetas.",
    footerDescription: "Experimentos independientes de HTML, CSS y JavaScript.",
    footerBuilt: "Hecho para la web abierta",
    component: "componente",
    components: "componentes",
    browseCategory: "Explorar componentes de {category}",
    viewComponent: "Ver componente",
    liveDemo: "Demo en vivo",
    copied: "¡Copiado!",
    copy: "Copiar",
    copiedToClipboard: "{label} copiado al portapapeles",
    clipboardUnavailable: "El portapapeles no está disponible en este navegador",
    noLocalSource: "No se encontró un archivo fuente local.",
    originalComponentPreview: "Componente original · vista previa interactiva",
    openOriginal: "Abrir demo original ↗",
    openInNewTab: "Abrir en otra pestaña ↗",
      livePreviewTitle: "Vista previa de {name}",
      sourceLabel: "Fuente",
      licenseLabel: "Licencia",
      licenseFileLabel: "Archivo de licencia",
    downloadZip: "Descargar ZIP",
    zipUnavailable: "ZIP no disponible",
    downloadZipTitle: "Descargar este componente y sus recursos locales",
    zipPermissionTitle: "Primero hay que verificar la fuente, el permiso de redistribución y la licencia del componente",
    preparingZip: "Preparando ZIP...",
    zipDownloaded: "ZIP del componente descargado",
    zipFailed: "No se pudo crear el ZIP: {message}",
    attributionRecorded: "Redistribución autorizada.",
    attributionPending: "Distribución no autorizada.",
    attributionText: "Fuente: {source}. Licencia: {license}.",
    attributionPendingText: "La descarga ZIP seguirá deshabilitada hasta verificar la fuente, el permiso de redistribución y la licencia de este componente.",
    missingFiles: "Este demo original hace referencia a archivos locales que faltan: {files}. La vista previa podría estar incompleta; no se modificaron los archivos fuente.",
    backToComponents: "← Volver a los componentes",
    sourceCode: "Código fuente",
    htmlSource: "HTML · index.html",
    cssSource: "CSS",
    javascriptSource: "JavaScript",
    inlineSource: "{label} · integrado {number}",
    localFileSource: "{label} · {name}",
    sourceLoadError: "No se pudieron cargar algunos archivos fuente. Abre el demo original para consultarlos. {message}",
    libraryTitle: "Biblioteca HTML y CSS",
    catalogUnavailable: "Catálogo no disponible",
    catalogLoadError: "No se pudo cargar el catálogo. Abre el sitio desde un servidor local y, si hace falta, vuelve a generarlo. {message}",
    themeNotSaved: "No se pudo guardar el tema en este navegador",
    languageNotSaved: "No se pudo guardar el idioma en este navegador",
    loadingPreview: "Cargando vista previa...",
    previewUnavailable: "Vista previa no disponible",
  },
};

const state = {
  components: [],
  catalogLoaded: false,
  language: "en",
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
  languageButtons: [...document.querySelectorAll(".language-button")],
};

function t(key, values = {}) {
  const dictionary = translations[state.language] ?? translations.en;
  const template = dictionary[key] ?? translations.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function getCategoryLabel(category) {
  return translations[state.language]?.categories[category] ?? category;
}

function getComponentDescription(component) {
  if (state.language === "en") return component.description;
  return component.descriptionEs || component.description;
}

function applyStaticTranslations() {
  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = t(element.dataset.i18n);
  }
  for (const element of document.querySelectorAll("[data-i18n-placeholder]")) {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  }
  for (const element of document.querySelectorAll("[data-i18n-aria-label]")) {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  }
  document.documentElement.lang = state.language;
  if (elements.detailView.hidden) updateLocalizedMetadata();
  for (const button of elements.languageButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.language === state.language));
  }
}

function updatePublicationNotice() {
  if (!state.catalogLoaded) return;
  const hasComponents = state.components.length > 0;
  const allCleared = hasComponents && state.components.every((entry) => entry.downloadable === true);
  elements.publicationNotice.hidden = allCleared;
  const [title, text] = elements.publicationNotice.querySelectorAll("[data-i18n]");
  const keys = hasComponents
    ? ["publicationZipTitle", "publicationZipText"]
    : ["publicationTitle", "publicationText"];
  title.dataset.i18n = keys[0];
  text.dataset.i18n = keys[1];
  title.textContent = t(keys[0]);
  text.textContent = t(keys[1]);
}

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
    const button = createElement("button", "filter-button", getCategoryLabel(category));
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

const previewObserver = typeof IntersectionObserver === "function"
  ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) mountQueuedPreview(entry.target);
      }
    }, { rootMargin: "400px 0px" })
  : null;

function armPreviewListeners(frame, preview) {
  frame.addEventListener("load", () => {
    preview.dataset.previewState = "ready";
  }, { once: true });
  frame.addEventListener("error", () => {
    preview.dataset.previewState = "error";
  }, { once: true });
}

function mountQueuedPreview(container) {
  previewObserver?.unobserve(container);
  const frame = container.querySelector("iframe[data-preview-src]");
  if (!frame) return;
  const src = frame.dataset.previewSrc;
  delete frame.dataset.previewSrc;
  armPreviewListeners(frame, container);
  frame.src = src;
}

function refreshQueuedPreviews() {
  if (!previewObserver) return;
  previewObserver.disconnect();
  const pending = document.querySelectorAll(
    ".live-preview[data-preview-state='loading'] iframe[data-preview-src]",
  );
  for (const frame of pending) previewObserver.observe(frame.parentElement);
}

function createPreview(component, className) {
  const preview = createElement("div", className);
  preview.classList.add("live-preview");
  preview.dataset.previewState = "loading";
  const frame = document.createElement("iframe");
  frame.title = t("livePreviewTitle", { name: component.name });
  frame.loading = "lazy";
  frame.referrerPolicy = "no-referrer";
  frame.setAttribute("scrolling", "no");
  frame.setAttribute("sandbox", "allow-scripts allow-forms allow-popups");
  preview.append(frame);
  const previewUrl = new URL(component.preview, document.baseURI);
  previewUrl.searchParams.set("previewRevision", previewRevision);
  if (previewObserver) {
    frame.dataset.previewSrc = previewUrl.href;
    previewObserver.observe(preview);
  } else {
    armPreviewListeners(frame, preview);
    frame.src = previewUrl.href;
  }
  return preview;
}

function createComponentCard(component, index) {
  const article = createElement("article", "component-card");
  article.append(createPreview(component, "card-preview"));

  const previewLabel = createElement("span", "card-preview-label", t("liveDemo"));
  article.querySelector(".card-preview").append(previewLabel);

  const content = createElement("div", "card-content");
  const top = createElement("div", "component-card-top");
  top.append(
    createElement("span", "component-category", getCategoryLabel(component.category)),
    createElement("span", "component-number", String(index + 1).padStart(3, "0")),
  );
  const heading = createElement("h3", "", component.name);
  const description = createElement("p", "", getComponentDescription(component));
  const link = createElement("a", "card-link", t("viewComponent"));
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
  const countLabel = filteredComponents.length === 1 ? t("component") : t("components");
  elements.resultsCount.textContent = `${filteredComponents.length} ${countLabel}`;
  elements.emptyState.hidden = filteredComponents.length > 0;
  elements.loadMore.hidden = visibleComponents.length >= filteredComponents.length;
  refreshQueuedPreviews();
}

function renderFeaturedComponents() {
  const featuredComponents = state.components.filter((component) => component.featured);
  elements.featuredGrid.replaceChildren(...featuredComponents.map((component, index) => createComponentCard(component, index)));
  elements.featuredGrid.closest(".featured-section").hidden = featuredComponents.length === 0;
  refreshQueuedPreviews();
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
    const translatedCategory = getCategoryLabel(category);
    button.setAttribute("aria-label", t("browseCategory", { category: translatedCategory }));
    button.append(
      createElement("span", "category-card-name", translatedCategory),
      createElement("span", "category-card-count", `${counts.get(category)} ${counts.get(category) === 1 ? t("component") : t("components")}`),
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
  const copyButton = createElement("button", "copy-button", t("copy"));
  copyButton.type = "button";
  copyButton.addEventListener("click", async () => {
    try {
      await copyText(code);
      copyButton.textContent = t("copied");
      showToast(t("copiedToClipboard", { label }));
      window.setTimeout(() => {
        copyButton.textContent = t("copy");
      }, 1400);
    } catch {
      showToast(t("clipboardUnavailable"));
    }
  });
  header.append(title, copyButton);
  const pre = document.createElement("pre");
  const codeElement = document.createElement("code");
  codeElement.textContent = code || t("noLocalSource");
  pre.append(codeElement);
  block.append(header, pre);
  return block;
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Sin permiso o sin foco: se intenta el respaldo de abajo.
    }
  }
  const helper = document.createElement("textarea");
  helper.value = value;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.append(helper);
  helper.select();
  const copied = document.execCommand("copy");
  helper.remove();
  if (!copied) throw new Error("Clipboard access is unavailable");
}

async function loadSourceFiles(files) {
  return Promise.all(files.map(async (file) => {
    if (typeof file.code === "string") return { name: file.name, code: file.code };
    const response = await fetch(new URL(file.path, document.baseURI));
    if (!response.ok) throw new Error(`Could not load ${file.name}`);
    return { name: file.name, code: await response.text() };
  }));
}

function appendSourceGroup(container, heading, files, inlineBlocks = []) {
  container.append(createElement("h3", "visually-hidden", heading));
  let blockIndex = 0;
  for (const file of files) {
    container.append(createCodeBlock(t("localFileSource", { label: heading, name: file.name }), file.code));
    blockIndex += 1;
  }
  for (const [index, code] of inlineBlocks.entries()) {
    container.append(createCodeBlock(t("inlineSource", { label: heading, number: index + 1 }), code));
    blockIndex += 1;
  }
  if (blockIndex === 0) {
    container.append(createCodeBlock(heading, t("noLocalSource")));
  }
}

function loadFullCatalogScript() {
  return new Promise((resolve, reject) => {
    if (Array.isArray(window.COMPONENT_CATALOG)) {
      resolve(window.COMPONENT_CATALOG);
      return;
    }
    const script = document.createElement("script");
    script.src = fullCatalogPath;
    script.addEventListener("load", () => resolve(window.COMPONENT_CATALOG), { once: true });
    script.addEventListener("error", () => reject(new Error(`Could not load ${fullCatalogPath}`)), { once: true });
    document.head.append(script);
  });
}

async function loadCatalog() {
  if (window.location.protocol === "file:") {
    const fullCatalog = await loadFullCatalogScript();
    if (!Array.isArray(fullCatalog)) throw new Error("The full catalog is unavailable.");
    return fullCatalog;
  }

  try {
    const response = await fetch(catalogPath);
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
    return await response.json();
  } catch (error) {
    const fallback = await loadFullCatalogScript().catch(() => null);
    if (Array.isArray(fallback)) return fallback;
    throw error;
  }
}

async function ensureComponentSource(component) {
  if (typeof component.html === "string") return component;
  const response = await fetch(
    new URL(`./data/sources/${encodeURIComponent(component.id)}.json`, document.baseURI),
  );
  if (!response.ok) throw new Error(`Source request failed (${response.status})`);
  Object.assign(component, await response.json());
  return component;
}

async function downloadComponentZip(component) {
  await ensureComponentSource(component);
  const files = await Promise.all(component.files.map(async (file) => {
    const response = await fetch(new URL(file.path, document.baseURI));
    if (!response.ok) throw new Error(`Could not load ${file.name}`);
    return {
      name: file.archivePath,
      bytes: new Uint8Array(await response.arrayBuffer()),
    };
  }));
  const attribution = [
    `${t("sourceLabel")}: ${component.source}`,
    `${t("licenseLabel")}: ${component.license}`,
    `${t("licenseFileLabel")}: ${component.licenseFile}`,
  ].join("\n");
  files.push({
    name: `${component.id}/ATTRIBUTION.txt`,
    bytes: new TextEncoder().encode(`${attribution}\n`),
  });

  const archive = await window.createZip(files);
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
    createElement("p", "detail-kicker", `${getCategoryLabel(component.category)} / ${component.folder}`),
    createElement("h1", "", component.name),
    createElement("p", "detail-description", getComponentDescription(component)),
  );
  const actions = createElement("div", "detail-actions");
  const originalLink = createElement("a", "button button-secondary", t("openOriginal"));
  const originalUrl = new URL(component.preview, document.baseURI);
  originalUrl.searchParams.set("previewRevision", previewRevision);
  originalLink.href = originalUrl.href;
  originalLink.target = "_blank";
  originalLink.rel = "noreferrer";
  const zipButton = createElement("button", "button button-secondary download-button", component.downloadable ? t("downloadZip") : t("zipUnavailable"));
  zipButton.type = "button";
  zipButton.disabled = !component.downloadable;
  zipButton.title = component.downloadable
    ? t("downloadZipTitle")
    : t("zipPermissionTitle");
  zipButton.setAttribute("aria-label", zipButton.title);
  if (component.downloadable) {
    zipButton.addEventListener("click", async () => {
      zipButton.disabled = true;
      zipButton.textContent = t("preparingZip");
      try {
        await downloadComponentZip(component);
        showToast(t("zipDownloaded"));
      } catch (error) {
        showToast(t("zipFailed", { message: error.message }));
      } finally {
        zipButton.disabled = false;
        zipButton.textContent = t("downloadZip");
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
  note.append(createElement("strong", "", isVerified ? t("attributionRecorded") : t("attributionPending")));
  if (isVerified) {
    note.append(document.createTextNode(` ${t("attributionText", { source: component.source, license: component.license })}`));
    return note;
  }
  if (component.source && component.source !== "Unverified") {
    note.append(document.createElement("br"));
    note.append(document.createTextNode(`${t("sourceLabel")}: ${component.source}`));
  }
  if (component.license && component.license !== "Unverified") {
    note.append(document.createElement("br"));
    note.append(document.createTextNode(`${t("licenseLabel")}: ${component.license}`));
  }
  note.append(document.createElement("br"));
  note.append(document.createTextNode(t("attributionPendingText")));
  return note;
}

function createMissingReferencesNote(component) {
  const missingReferences = component.missingReferences ?? [];
  if (!missingReferences.length) return null;
  const references = missingReferences.join(", ");
  return createElement(
    "p",
    "error-message",
    t("missingFiles", { files: references }),
  );
}

const siteOrigin = "https://libreria-html-css.vercel.app";
const sitePath = "/Web/";
const defaultMetadata = {
  description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
  image: `${siteOrigin}${sitePath}og-image.png`,
};

function setMetaContent(selector, content) {
  const element = document.querySelector(selector);
  if (element && content) element.setAttribute("content", content);
}

function updateDocumentMetadata({ title, description, url, robots = "index, follow" }) {
  if (title) document.title = title;
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[name="robots"]', robots);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:url"]', url);
  setMetaContent('meta[property="og:image"]', defaultMetadata.image);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  setMetaContent('meta[name="twitter:image"]', defaultMetadata.image);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", url);
}

function updateLocalizedMetadata() {
  updateDocumentMetadata({
    title: t("libraryTitle"),
    description: t("heroDescription"),
    url: `${siteOrigin}${sitePath}`,
  });
}

async function renderDetail(component) {
  elements.catalogView.hidden = true;
  elements.detailView.hidden = false;
  elements.detailView.replaceChildren();
  updateDocumentMetadata({
    title: `${component.name} · ${t("libraryTitle")}`,
    description: getComponentDescription(component),
    url: `${siteOrigin}${sitePath}?component=${encodeURIComponent(component.id)}`,
    robots: "noindex, follow",
  });

  const backLink = createElement("a", "detail-back", t("backToComponents"));
  backLink.href = "#components";
  backLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.history.pushState({}, "", `${window.location.pathname}#components`);
    renderRoute();
    document.querySelector("#components")?.scrollIntoView({ behavior: "smooth" });
  });

  const previewPanel = createElement("section", "preview-panel");
  const previewHeader = createElement("div", "preview-panel-header");
  previewHeader.append(
    createElement("span", "", t("originalComponentPreview")),
  );
  const previewLink = createElement("a", "preview-open-link", t("openInNewTab"));
  const previewUrl = new URL(component.preview, document.baseURI);
  previewUrl.searchParams.set("previewRevision", previewRevision);
  previewLink.href = previewUrl.href;
  previewLink.target = "_blank";
  previewLink.rel = "noreferrer";
  previewHeader.append(previewLink);
  previewPanel.append(previewHeader, createPreview(component, ""));

  elements.detailView.append(backLink, createDetailHeading(component));
  const missingReferencesNote = createMissingReferencesNote(component);
  if (missingReferencesNote) elements.detailView.append(missingReferencesNote);
  elements.detailView.append(previewPanel);
  refreshQueuedPreviews();

  let sourceError = null;
  try {
    await ensureComponentSource(component);
  } catch (error) {
    sourceError = error;
  }

  const sourceSection = createElement("section", "source-section");
  sourceSection.append(createElement("h2", "", t("sourceCode")));
  if (sourceError) {
    sourceSection.append(createElement("p", "error-message", t("sourceLoadError", { message: sourceError.message })));
  }
  sourceSection.append(createCodeBlock(t("htmlSource"), component.html));
  elements.detailView.append(sourceSection, createProvenanceNote(component));

  try {
    const [stylesheets, scripts] = await Promise.all([
      loadSourceFiles(component.stylesheets ?? []),
      loadSourceFiles(component.scripts ?? []),
    ]);
    appendSourceGroup(sourceSection, "CSS", stylesheets, component.inlineCss ?? []);
    if (scripts.length || component.inlineJavaScript?.length) {
      appendSourceGroup(sourceSection, t("javascriptSource"), scripts, component.inlineJavaScript ?? []);
    }
  } catch (error) {
    const message = createElement("p", "error-message", t("sourceLoadError", { message: error.message }));
    sourceSection.append(message);
  }
}

function renderRoute() {
  const componentId = new URLSearchParams(window.location.search).get("component");
  const component = state.components.find((entry) => entry.id === componentId);
  if (component) {
    renderDetail(component).catch((error) => {
      showToast(t("sourceLoadError", { message: error.message }));
    });
    return;
  }

  elements.detailView.hidden = true;
  elements.catalogView.hidden = false;
  updateLocalizedMetadata();
  renderComponents();
}

function updateThemeControls() {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  elements.themeToggle.setAttribute("aria-label", t(nextTheme === "light" ? "switchToLight" : "switchToDark"));
  elements.themeToggle.title = t("switchTheme");
  elements.themeToggle.querySelector(".theme-label").textContent = t(nextTheme);
  elements.themeToggle.querySelector(".theme-icon").textContent = nextTheme === "light" ? "☼" : "◐";
}

function applyLanguage(language, rerender = true) {
  state.language = language === "es" ? "es" : "en";
  applyStaticTranslations();
  updateThemeControls();
  updatePublicationNotice();
  try {
    localStorage.setItem("component-field-language", state.language);
  } catch {
    if (rerender) showToast(t("languageNotSaved"));
  }
  if (rerender && state.components.length > 0) {
    renderFeaturedComponents();
    renderFilters();
    renderCategories();
    renderRoute();
  }
}

function initializeLanguage() {
  let savedLanguage = "en";
  try {
    savedLanguage = localStorage.getItem("component-field-language") ?? "en";
  } catch {
    savedLanguage = "en";
  }
  applyLanguage(savedLanguage, false);
  for (const button of elements.languageButtons) {
    button.addEventListener("click", () => applyLanguage(button.dataset.language));
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2200);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  updateThemeControls();
  try {
    localStorage.setItem("component-field-theme", theme);
  } catch {
    showToast(t("themeNotSaved"));
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
  initializeLanguage();
  initializeTheme();
  initializeNavigation();
  initializeSearch();
  document.querySelector("#footer-year").textContent = String(new Date().getFullYear());

  try {
    state.components = await loadCatalog();
    state.catalogLoaded = true;
    updatePublicationNotice();
    document.querySelector("#stat-components").textContent = String(state.components.length);
    document.querySelector("#stat-categories").textContent = String(getCategories().length);
    renderFeaturedComponents();
    renderFilters();
    renderCategories();
    renderRoute();
  } catch (error) {
    elements.resultsCount.textContent = t("catalogUnavailable");
    elements.grid.replaceChildren(createElement("p", "error-message", t("catalogLoadError", { message: error.message })));
  }
}

window.addEventListener("DOMContentLoaded", () => {
  void initializeApp();
}, { once: true });
