# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).

**Documentación relacionada**: [README](./README.md) · plan de fases ([`Docs/Opencode/Plan.md`](./Docs/Opencode/Plan.md)) · [Web/README.md](./Web/README.md) · [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

Cada fase terminada se registra aquí con su fecha. Las fases están definidas en
[`Docs/Opencode/Plan.md`](./Docs/Opencode/Plan.md).

## [Fase 5 — i18n: descripciones reales en español] — 2026-09-26

### Contexto

Medido sobre `Web/data/catalog.json`: **113 de 116** demos no tenían descripción
real. Su campo `description` era la genérica auto-generada por el generador
(`Standalone <categoría> demo from the component collection.`), y en español
todas las tarjetas mostraban la misma frase
«Demo independiente de *<categoría>* de la colección de componentes». Solo los
3 destacados tenían texto propio, traducido en duro dentro de `app.js`.

### Hecho

- **`Web/data/component-overrides.json` reescrito**: ahora tiene **116 entradas**
  (antes 3), cada una con `description` (inglés) y `descriptionEs` (español)
  redactados a partir del nombre, la categoría y los tags de cada demo. Las 3
  destacadas conservan `name`, `category`, `tags` y `featured`.
  `featuredDescriptions`/`standaloneDescription` dejan de vivir en el código.
- **`Web/scripts/generate-catalog.mjs`**: añade `descriptionEs` al componente
  cuando el override lo define (`...(descriptionEs ? { descriptionEs } : {})`),
  de modo que los demos sin traducir no inflan el índice con `null`.
- **`Web/scripts/app.js`**:
  - `getComponentDescription()` → en inglés `description`; en español
    `descriptionEs || description`. **Desaparece el fallback genérico**: si no hay
    traducción, se muestra el texto original en inglés.
  - Eliminados de los diccionarios EN y ES las claves `standaloneDescription` y
    `featuredDescriptions` (sin uso y ahora redundantes con los datos).
- **`Web/scripts/build-site.mjs`**: sin cambios; `{ ...entry, ...readSource(...) }`
  y `toIndexEntry` propagan el campo automáticamente.
- **`README.md` y `Web/README.md`**: el ejemplo de `component-overrides.json`
  incluye `descriptionEs` y se explica la regla de reserva.

### Verificado

- `node --check Web/scripts/app.js` y `generate-catalog.mjs` → 0.
- Catálogo regenerado: **116/116** con `description` **y** `descriptionEs`;
  0 descripciones que empiecen por `Standalone`; 0 `descriptionEs` genéricos.
- **Chrome headless, EN** (`--dump-dom`, `/Web/`): `lang="en"`, 15 tarjetas,
  **0** textos `Standalone …` visibles, y se ven las descripciones nuevas
  (p. ej. la del 404 y la de `blur-text-reveal`), `stat-components` = 116.
- **Chrome headless, ES** (CDP: se fija `component-field-language = es` y se
  recarga): `lang="es"`, 15 tarjetas, **0** «Demo independiente…», **0**
  `Standalone …`, y las descripciones salen en español
  («Página de error 404 con un diseño minimalista…»,
  «Superficie tipo tarjeta con un resplandor inferior…»).

### Pendiente / limitaciones

- Las 116 descripciones están redactadas a partir del nombre, la categoría y los
  tags del demo (más la lectura directa de los casos ambiguos:
  `skillet-toggle-switch`, `trick-and-treat-toggle`, `stack-glitch-effect`).
  Conviene revisarlas frente al render real de cada demo y ajustar las que
  describan algo que no se vea.
- El `<title>` de los demos sigue mostrando la marca original en algunos casos;
  se limpia en `name` al generar el catálogo, pero no dentro de la propia demo.

## [Fase 4 — Previews bajo demanda] — 2026-09-26

### Hecho

- `Web/scripts/app.js`: las previews dejan de cargarse al pintar la tarjeta.
  - Nuevo `IntersectionObserver` con `rootMargin: "400px 0px"`. `createPreview()`
    guarda la URL en `frame.dataset.previewSrc` y observa el contenedor;
    `mountQueuedPreview()` asigna el `src` solo cuando este entra en viewport.
  - `refreshQueuedPreviews()` se llama al final de `renderComponents`,
    `renderFeaturedComponents` y `renderDetail`: hace `disconnect()` y vuelve a
    observar **solo** los iframes aún en cola. Los ya montados no tienen
    `data-preview-src`, así que no se re observan y no quedan referencias a
    nodos desechados tras cada re-render de la cuadrícula.
  - **Bug corregido de camino**: los listeners `load`/`error` se registraban al
    crear el iframe. Un iframe **sin `src`** navega a `about:blank` y dispara
    `load`, con lo que el contenedor pasaba a `data-preview-state="ready"` con la
    preview vacía, se ocultaba el placeholder y el selector de cola
    (`[data-preview-state='loading']`) dejaba de encontrar nada → ninguna
    preview llegaba a montarse. Ahora `armPreviewListeners()` los registra justo
    antes de asignar el `src`.
  - Si el navegador no tiene `IntersectionObserver`, se asigna el `src`
    directamente (comportamiento anterior).

### Verificado

- `node --check Web/scripts/app.js` → 0; Chrome headless sin mensajes de consola
  con error (`--enable-logging=stderr --v=1`).
- **Chrome headless** (`--dump-dom`, ventana 1280×800) en `/Web/`:
  **3 iframes montados** (fila visible), **12 en cola**, **0** en `error`,
  `stat-components` = 116.
- **Chrome headless** en `?component=among-us-button`: **1 iframe montado** (la
  preview del detalle) y los 3 del catálogo oculto en cola → el detalle no espera.
- Prueba de control con un `IntersectionObserver` aislado: sí dispara en el mismo
  entorno headless, descartando una limitación del navegador de pruebas.

### Pendiente / limitaciones

- El placeholder ("Cargando vista previa…") se muestra también mientras la
  tarjeta está **en cola** fuera del viewport; no se distingue *pendiente* de
  *cargando* en el texto (solo en `data-preview-state`).
- Las previews con CDNs externos suman sus peticiones al montarse; la revisión
  de las que fallen queda para la Fase 8.

## [Fase 3 — Catálogo ligero] — 2026-09-26

### Hecho

- **Diagnóstico de peso** (sobre `catalog.json` de 716 KB medido con
  `JSON.stringify`): código CSS embebido **43 %**, campo `html` **32 %**,
  scripts **5 %**, `files` **6,5 %**, metadatos **10 %**. El **83 %** del catálogo
  era código fuente que solo se necesita al abrir un detalle.
- Nuevo módulo `Web/scripts/catalog-format.mjs` (compartido por los dos scripts
  de build) con `toIndexEntry`, `toSourceEntry`, `writeSources` y `readSource`.
- `generate-catalog.mjs` pasa a escribir **tres** artefactos:
  - `Web/data/catalog.json` → **índice ligero**: `id`, `name`, `category`,
    `featured`, `description`, `tags`, `folder`, `preview`, `missingReferences`,
    `license`, `source`, `licenseFile`, `downloadable` y
    `stylesheets`/`scripts` con **solo `name` y `path`**. Sin `html`, sin
    `inlineCss`/`inlineJavaScript`, sin `files` y sin el `code` de cada hoja.
  - `Web/data/sources/<id>.json` → 116 ficheros (~2,7 KB de media) con
    `html`, `inlineCss`, `inlineJavaScript` y `files`.
  - `Web/data/catalog.js` → catálogo **completo**, solo para el modo `file://`.
- `Web/scripts/app.js`:
  - `loadCatalog()` hace `fetch("./data/catalog.json")` en HTTP. Solo inyecta
    `catalog.js` cuando `location.protocol === "file:"` (donde `fetch` está
    bloqueado por CORS) y como *fallback* si el JSON falla.
  - `ensureComponentSource(component)` baja `sources/<id>.json` la primera vez
    que se abre un detalle y lo mezcla en `state.components` (cacheado: solo se
    paga una vez).
  - `renderDetail` ya no bloquea: pinta primero enlace, cabecera y preview, y
    **después** paga la fuente; si falla, muestra `sourceLoadError` y el bloque
    HTML cae a `noLocalSource` (traducido).
  - `downloadComponentZip` también llama a `ensureComponentSource` antes de
    leer `component.files`.
  - `renderRoute` envuelve `renderDetail` en `.catch` para que una promesa
    rechazada no se quede como *unhandled rejection*.
- `Web/index.html`: eliminada la etiqueta `<script defer src="./data/catalog.js">`
  (ahora se inyecta bajo demanda); caché a `?v=20260926-3`.
- `Web/scripts/build-site.mjs`: reensambla cada entrada aprobada leyendo
  `sources/<id>.json`, escribe el índice ligero + `catalog.js` completo y
  **borra los `sources/*.json` de los componentes no autorizados** del artefacto.

### Verificado

| Métrica | Antes | Después |
|---|---|---|
| Home descarga `catalog.json`/`catalog.js` | **733 KB** | **84,5 KB** (−89 %) |
| Ficheros de detalle | — | 116 × ~2,7 KB (bajo demanda) |
| `catalog.js` (solo `file://`) | 733 KB | 733 KB (no se pide en HTTP) |

- `node --check Web/scripts/app.js` → 0. `generate-catalog.mjs` → 116+116.
- `build-site.mjs` dos veces seguidas → exit 0, `sources` del artefacto = 0
  (correcto: 0 componentes aprobados), `catalog.json` = `[]`.
- Servidor local: `catalog.json` 200/84 551 B, `sources/among-us-button.json`
  200/3 995 B, `sources/404-page-not-found.json` 200/14 409 B, preview 200.
- **Chrome headless** (`--dump-dom`) sobre `http://localhost:8126/Web/`:
  `stat-components` = **116**, `results-count` = "116 components", **15 tarjetas**
  (3 destacadas + 12 de la primera página) y aviso de publicación **visible**.
- **Chrome headless** sobre `?component=among-us-button`: `<title>` y `<h1>`
  correctos, **2 bloques de código** (HTML + CSS), **0** `error-message`,
  4 iframes (3 destacados + el del detalle).

### Pendiente / limitaciones

- El modo `file://` sigue funcionando (catálogo completo inyectado), pero en el
  **artefacto de despliegue** `catalog.js` también es completo: si alguien abre
  ese artefacto con `file://`, el detalle usa el catálogo embebido y no necesita
  `sources/`.
- `Web/data/sources/` es generado y **se versiona** igual que `catalog.json`;
  hay que regenerarlo después de tocar cualquier demo.
- Se detectó que hay demos editándose de forma concurrente en el repositorio
  (rebranding "Gev Stack" → "Kindred" en `Blur-Text-Reveal`,
  `Button-Hover-Effect-Part-02` y `Card-Hover-Effect`). El catálogo se
  regeneró después y los refleja; hay que volver a ejecutar
  `generate-catalog.mjs` tras cualquier edición de demos.

## [Fase 2 — Bugs y correcciones de código] — 2026-09-26

### Hecho

- **Mixed content eliminado.** `BibliotecaDeHtml_CSS/Flipping-Loader/styles.css`
  (la carpeta real es `Flipping-Loader`, con mayúsculas) dejaba de cargar
  `http://subtlepatterns.subtlepatterns.netdna-cdn.com/patterns/kindajean.png`:
  host muerto *y* `http://` bloqueado en HTTPS. Se elimina la línea y se conserva
  `background-color: #012501`. Era la única URL `http://` real del proyecto
  (el resto eran `xmlns` de SVG, inofensivos).
- `Web/scripts/app.js`:
  - `appendSourceGroup` usaba el literal inglés `"No local source file found."`
    en vez de `t("noLocalSource")` → traducible.
  - Enlace "← Volver a componentes": añadido `event.preventDefault()` y
    `scrollIntoView`. Antes se empujaba el estado con `pushState` **y** actuaba
    el navegador sobre `href="#components"`, creando una entrada de historial
    que podía regresar al detalle.
  - **Aviso de publicación con estado real.** Nuevo `updatePublicationNotice()`
    (llamado tras cargar el catálogo y en cada cambio de idioma) con tres estados:
    catálogo vacío (build filtrado → texto original), componentes presentes pero
    ninguno verificado (nuevas claves `publicationZipTitle`/`publicationZipText`,
    EN+ES: "ZIP downloads pending verification") y todos verificados (sin aviso).
    Antes solo aparecía cuando el catálogo estaba vacío, así que al desplegar la
    raíz no se comunicaba por qué el botón ZIP estaba deshabilitado.
  - Nuevo flag `state.catalogLoaded` para que el aviso no parpadee antes de cargar.
- `Web/scripts/build-site.mjs`: `mkdir(outputDirectory, { recursive: true })`.
  **Reproducido antes**: dos ejecuciones seguidas → `EEXIST`; ahora ambas → exit 0.
- `index.html` raíz: añadido `<meta http-equiv="refresh" content="0; url=./Web/">`
  en `<head>` como fallback sin JavaScript. (Se descartó un `<noscript>` con
  `<meta>` dentro del `<body>`, que es inválido y no funciona.)
- `Web/README.md`: eliminadas 3 líneas casi idénticas sobre
  `generate-catalog.mjs` (27–29); queda una sola con el comportamiento correcto
  (genera `catalog.json` **y** `catalog.js`).

### Verificado

- `node --check Web/scripts/app.js` y `node --check Web/scripts/zip.js` → 0.
- `node Web/scripts/generate-catalog.mjs` → 116 componentes; el único diff es el
  CSS embebido de `Flipping-Loader`.
- `node Web/scripts/build-site.mjs` dos veces seguidas → `Prepared 0 cleared
  component(s)` en ambas, exit 0 (regresión del `EEXIST` corregida).
- Servidor local: `/`, `/Web/`, `catalog.json`, `Flipping-Loader/index.html` y su
  `styles.css` → 200; el `catalog.json` ya **no** contiene `subtlepatterns`.

### Pendiente / limitaciones

- El aviso de ZIP ahora es visible en la home mientras no haya ningún componente
  verificado. Es intencionado (explica el estado real); si resulta demasiado
  prominente, se puede degradar a un texto en el pie.
- No se modificó el comportamiento visual de `Flipping-Loader`: solo se quitó una
  textura de fondo que ya no se cargaba.

## [Fase 1 — Despliegue en Vercel] — 2026-09-26

### Hecho

- `vercel.json` nuevo (JSON validado): `framework: null`, `buildCommand: null`,
  `outputDirectory: "."`, `cleanUrls: false`.
  - `redirects`: `/` → `/Web/` (307, sustituye la redirección solo-JS del
    `index.html` raíz) y `/Web` → `/Web/` (308). Este último es obligatorio:
    sin la barra final, `./styles/site.css` se resolvería contra `/` y daría 404.
  - `headers` globales: `X-Content-Type-Options: nosniff`,
    `X-Frame-Options: SAMEORIGIN` (impide que otros sitios emmarquen los demos;
    nuestras propias previews siguen permitidas por ser mismo origen) y
    `Referrer-Policy: strict-origin-when-cross-origin`.
- `.vercelignore` nuevo: excluye `Docs/`, `.qodo/`, `.github/`, `.vercel/`,
  `CHANGELOG.md` y `.github-pages-*`. **No** excluye `Web/` ni
  `BibliotecaDeHtml_CSS/`, que son imprescindibles para las previews.
- `README.md`: la sección *Despliegue* pasa a tener **Vercel / GitHub Pages /
  Netlify** por separado, con tabla de configuración y una advertencia explícita
  de que `node Web/scripts/build-site.mjs` **no** debe usarse como build command
  (publicaría 0 de 116 demos y rompería las previews).
- `Web/README.md`: sección *Despliegue* reescrita con el mismo criterio.
- Verificación local (`py -m http.server 8123` sobre la raíz del repositorio):
  `/`, `/Web/`, `/Web/index.html`, `/Web/data/catalog.js`, `/Web/scripts/app.js`,
  `/BibliotecaDeHtml_CSS/among-us-button/index.html` y su `style.css`
  → **todos 200 OK**. Confirma que desplegar la raíz hace funcionar la cadena
  `Web/ → BibliotecaDeHtml_CSS/`.
- `node Web/scripts/generate-catalog.mjs` ejecutado sin diffs: el catálogo
  versionado sigue estando actualizado.

### Pendiente / limitaciones

- Los redirects y headers solo aplican en **Vercel**; GitHub Pages sigue
  dependiendo del JS del `index.html` raíz para ir a `/Web/` (mitigado en Fase 2
  con `<meta http-equiv="refresh">`).
- El despliegue real en Vercel (crear el proyecto y ver la URL) queda fuera de
  este plan: requiere la cuenta y el CLI del usuario.
- Tamaño a vigilar: 304 archivos, ~34 MB, con un GIF de 9,3 MB
  (`modern-contact-card/MOSHED-2023-10-17-13-58-25.gif`).

## [Fase 0 — Limpieza del repositorio] — 2026-09-26

### Hecho

- `.gitignore` ampliado: `.github-pages-*` (antes solo `.github-pages-site*/`),
  `.vercel/` y `node_modules/`.
- `.github-pages-file-check/` **dejó de estar trackeado** (`git rm -r --cached`):
  era un artefacto de `build-site.mjs` versionado por accidente (14 archivos:
  copia de `Web/`, `index.html`, `LICENSE` y `.nojekyll`).
- Borradas 5 carpetas de build locales regenerables:
  `.github-pages-file-check/`, `.github-pages-site/`, `.github-pages-site-check/`,
  `.github-pages-site-check-2/`, `.github-pages-site-final-check/`.
- Verificación: `git ls-files` ya **no contiene ninguna ruta `github-pages*`**.
- Se creó este `CHANGELOG.md` y el plan de fases en
  [`Docs/Opencode/Plan.md`](./Docs/Opencode/Plan.md) (Fases 0–8).

### Pendiente / limitaciones

- Los cambios de la Fase 0 están **en el árbol de trabajo y en el índice, sin
  commitear** (no se hace commit sin petición explícita).
- `Docs/Legalizacion/THIRD_PARTY_NOTICES.md` es una copia sin trackear que no
  pertenece a esta fase: se conserva tal cual. La copia canónica sigue en la raíz
  (la referencian `README.md`, `Web/README.md` y `Web/scripts/build-site.mjs`).
