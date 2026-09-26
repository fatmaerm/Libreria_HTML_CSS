# Plan de mejora — Biblioteca HTML & CSS

> Documento vivo. Cada fase que se termina se registra en [`CHANGELOG.md`](../../CHANGELOG.md).
> Última actualización: 2026-09-26.

## Contexto

Sitio estático (`Web/`) que indexa 116 demos de `BibliotecaDeHtml_CSS/`. Sin frameworks,
sin backend, sin `node_modules`. Objetivo: **desplegar en Vercel** con la colección
completa visible y la descarga de código funcionando, sin necesitar base de datos.

### Diagnóstico (revisión del 2026-09-26)

| # | Hallazgo | Severidad |
|---|---|---|
| 1 | `build-site.mjs` copia solo `downloadable === true` → **0 de 116** componentes; el artefacto quedaría vacío y las previews (`../BibliotecaDeHtml_CSS/…`) darían 404 | 🔴 Bloqueante |
| 2 | No hay `vercel.json` ni instrucciones correctas para Vercel | 🔴 Bloqueante |
| 3 | ZIP deshabilitado en 116/116 componentes | 🔴 Producto |
| 4 | Catálogo: 774 KB `catalog.json` + 733 KB `catalog.js` (~1.5 MB servidos) | 🟠 Rendimiento |
| 5 | ~15 iframes + ~80 peticiones a CDNs en la primera pantalla | 🟠 Rendimiento |
| 6 | `http://` en `flipping-loader/styles.css:9` → mixed content en HTTPS | 🟡 Bug |
| 7 | `.github-pages-file-check/` trackeado; `.gitignore` solo cubre `.github-pages-site*/` | 🟡 Repo |
| 8 | Bugs menores en `app.js` (texto hardcodeado, back link, aviso de publicación) | 🟡 Bug |
| 9 | `build-site.mjs:17` `mkdir` sin `recursive` → EEXIST en el 2º build | 🟡 Bug |
| 10 | Descripciones en español genéricas para 113 de 116 demos | 🟡 i18n |
| 11 | Sin favicon, Open Graph, canonical, sitemap | 🔵 SEO |
| 12 | `Web/README.md` con 3 líneas duplicadas | 🔵 Docs |

---

## Fases

### Fase 0 — Limpieza del repositorio ✅ (2026-09-26)

- [x] Ampliar `.gitignore`: `.github-pages-*`, `.vercel/`, `node_modules/`.
- [x] `git rm -r --cached .github-pages-file-check` (dejar de trackear el artefacto).
- [x] Borrar las carpetas de build locales (`.github-pages-site*`, `-check*`, `-final-check`).
- [x] Verificar `git status` limpio y `git ls-files` sin artefactos.

**Hecho cuando:** `git ls-files | Select-String github-pages` no devuelve nada. ✅

### Fase 1 — Despliegue en Vercel ✅ (2026-09-26)

- [x] Crear `vercel.json`: `framework: null`, `buildCommand: null`, `outputDirectory: "."`
      (despliegue de la raíz del repo, que es lo único que hace funcionar las previews).
- [x] Crear `.vercelignore` (`Docs/`, `.qodo/`, `.github/`, `.vercel/`, `CHANGELOG.md`).
- [x] Redirects: `/` → `/Web/` (307) y `/Web` → `/Web/` (308; sin la barra final las
      rutas relativas `./styles/...` se romperían).
- [x] Cabeceras: `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`.
- [x] Actualizar `README.md` y `Web/README.md`: secciones **Vercel / GitHub Pages / Netlify**
      con la configuración real y aviso de que `build-site.mjs` **no** debe usarse como
      build command hasta verificar licencias.
- [x] Smoke local con servidor estático en la raíz: `/`, `/Web/`, `catalog.js`, `app.js`
      y un demo + su CSS → **200 OK** en todos.

**Hecho cuando:** la raíz se sirve tal cual, `/Web/` carga y las previews resuelven. ✅

### Fase 2 — Bugs y correcciones de código ✅ (2026-09-26)

- [x] `BibliotecaDeHtml_CSS/Flipping-Loader/styles.css`: eliminada la línea
      `background-image: url("http://…")` (host muerto + mixed content en HTTPS).
      La demo conserva `background-color: #012501`.
- [x] `Web/scripts/app.js`: texto hardcodeado `"No local source file found."` → `t("noLocalSource")`.
- [x] `Web/scripts/app.js` back link: añadido `preventDefault()` y `scrollIntoView`
      (antes el clic empujaba dos entradas de historial y podía volver al detalle).
- [x] `Web/scripts/app.js`: `updatePublicationNotice()` sustituye a
      `hidden = components.length > 0`. Ahora distingue tres estados: catálogo vacío
      (build filtrado), componentes sin verificar (aviso sobre ZIP) y todo verificado
      (sin aviso). Nuevas claves `publicationZipTitle`/`publicationZipText` EN+ES.
- [x] `Web/scripts/build-site.mjs`: `mkdir(..., { recursive: true })` → dos builds
      seguidos sin `EEXIST` (verificado).
- [x] `index.html` raíz: añadido `<meta http-equiv="refresh" content="0; url=./Web/">`
      como fallback sin JS.
- [x] `Web/README.md`: eliminadas las 3 líneas duplicadas del generador de catálogo.
- [x] Regenerado el catálogo: solo cambia el CSS embebido de `Flipping-Loader`.
- [x] Smoke: `node --check` en `app.js` y `zip.js` OK; servidor local → todos 200;
      el catálogo ya no contiene `subtlepatterns`.

**Hecho cuando:** catálogo regenerado sin errores, build dos veces sin EEXIST. ✅

### Fase 3 — Catálogo ligero (rendimiento) ✅ (2026-09-26)

- [x] Medición inicial: `catalog.json` 774 KB + `catalog.js` 733 KB servidos en la
      home. Desglose: código CSS embebido **43 %**, `html` **32 %**, scripts **5 %**,
      `files` **6,5 %**, metadatos **10 %** → el 83 % era código fuente.
- [x] Nuevo módulo compartido `Web/scripts/catalog-format.mjs` con `toIndexEntry`,
      `toSourceEntry`, `writeSources` y `readSource`.
- [x] `generate-catalog.mjs` ahora escribe tres artefactos:
      `catalog.json` (**índice ligero**, sin `html`/`inline*`/`files`/`code`),
      `sources/<id>.json` (pago del detalle, 116 ficheros) y `catalog.js`
      (catálogo completo, solo para `file://`).
- [x] `app.js`: `loadCatalog()` usa `fetch(catalog.json)` en HTTP y solo inyecta
      `catalog.js` en `file://` (o como fallback si el JSON falla);
      `ensureComponentSource()` baja `sources/<id>.json` al abrir un detalle y lo
      cachea en `state.components`.
- [x] `renderDetail` muestra primero cabecera y preview y **después** paga la
      fuente; `downloadComponentZip` también la pide por si acaso.
- [x] `Web/index.html` ya **no** carga `catalog.js` en HTTP; versiones de caché a
      `?v=20260926-3`.
- [x] `build-site.mjs` reensambla el catálogo completo desde `sources/`, filtra y
      limpia los ficheros de fuentes no autorizados.

**Resultado**: home de **84,5 KB** en vez de 733 KB (**−89 %**); el detalle baja
~2,7 KB por componente.

**Hecho cuando:** la home descarga < 100 KB de catálogo y el detalle sigue
mostrando HTML/CSS/JS completos con *Copiar* funcionando. ✅

### Fase 4 — Previews bajo demanda ✅ (2026-09-26)

- [x] No montar el `iframe` al pintar la tarjeta: `IntersectionObserver`
      (`rootMargin: "400px 0px"`) en `createPreview()`; el `src` se guarda en
      `frame.dataset.previewSrc` y solo se asigna al entrar en viewport
      (`mountQueuedPreview()`).
- [x] `refreshQueuedPreviews()` al final de `renderComponents`,
      `renderFeaturedComponents` y `renderDetail`: `disconnect()` + re-observar
      solo los iframes aún en cola (evita retener nodos ya desechados).
- [x] Placeholder con estado `loading` mientras tanto: `armPreviewListeners()`
      registra `load`/`error` **al montar**, no al crear (un iframe sin `src`
      dispara `load` con `about:blank` y marcaba `ready` falso).
- [x] Fallback sin `IntersectionObserver`: `src` directo (comportamiento anterior).
- [x] Iframes concurrentes en la primera pantalla: **3 (< 6)**.

**Hecho cuando:** al abrir la home se montan ≤ 6 iframes y el resto aparece al hacer scroll. ✅

### Fase 5 — i18n: descripciones reales en español ✅ (2026-09-26)

- [x] **Medición previa**: 113 de 116 demos no tenían descripción real; su
      `description` era la genérica auto-generada
      `Standalone <categoría> demo from the component collection.` Solo los 3
      destacados tenían texto, y el español de esos 3 estaba en duro en `app.js`.
- [x] `Web/data/component-overrides.json`: 116 entradas con `description` (EN) y
      `descriptionEs` (ES) redactadas a partir del nombre, la categoría y los
      tags de cada demo; los 3 destacados conservan `name`, `category`, `tags` y
      `featured`.
- [x] `generate-catalog.mjs` propaga `descriptionEs` al índice y a `catalog.js`
      (solo si existe, para no inflar el JSON de los demos sin traducir).
- [x] `app.js`: `getComponentDescription()` pasa a `descriptionEs || description`
      y se eliminan `standaloneDescription` y `featuredDescriptions` de los
      diccionarios EN y ES (ya no existe texto genérico).
- [x] `build-site.mjs` no necesita cambios: `{ ...entry, ...source }` y
      `toIndexEntry` conservan el campo.
- [x] `README.md` y `Web/README.md` documentan `descriptionEs` y la regla de
      reserva (sin traducción → texto original en inglés).

**Resultado**: 0 descripciones genéricas en inglés y 0 textos
«Demo independiente de …» en español, en las 116 entradas.

**Hecho cuando:** en ES ninguna tarjeta muestra "Demo independiente de X de la colección"
salvo los demos aún sin traducir, y esos muestran el texto original en inglés. ✅

### Fase 6 — ZIP: compresión y habilitación progresiva

- [ ] `zip.js`: comprimir con `CompressionStream("deflate-raw")` y fallback a `stored`.
- [ ] Verificar procedencia por lotes: para cada demo candidato, confirmar licencia del
      código **y** de imágenes/fuentes/iconos incluidos.
- [ ] Por cada demo verificado: crear `LICENSE` en su carpeta, rellenar `source`,
      `license`, `licenseFile` y `redistributable: true` en `component-overrides.json`.
- [ ] Actualizar `THIRD_PARTY_NOTICES.md` con cada componente autorizado.
- [ ] `node Web/scripts/build-site.mjs` debe empezar a reportar `N cleared component(s) > 0`.
- [ ] Documentar en el README el criterio de verificación (qué se mira, qué se descarta).

**Hecho cuando:** al menos un componente tiene el botón ZIP activo y el ZIP resultante
abre correctamente con su `ATTRIBUTION.txt`.

### Fase 7 — SEO y pulido

- [ ] Favicon (SVG inline o `/favicon.svg`) + `apple-touch-icon`.
- [ ] Open Graph y Twitter Card en `Web/index.html`.
- [ ] `canonical` + `robots.txt` + `sitemap.xml` (los `?component=` no se indexan).
- [ ] Comprobar `lang`, meta description por detalle (ya se actualiza el `document.title`).

**Hecho cuando:** las URLs principales pasan la auditoría básica de metadatos.

### Fase 8 — Verificación final

- [ ] Servidor estático local (`py -m http.server 8000`) + smoke:
      home, búsqueda, filtros, detalle, copiar código, tema, idioma, "volver".
- [ ] Comprobar previews con recursos externos (CDNs) y anotar las que fallen.
- [ ] Comprobar que `git status` está limpio y el changelog refleja todas las fases.
- [ ] Releer `README.md` y `Web/README.md` para que no contradigan el estado real.

---

## Fuera de alcance (por ahora)

- **Base de datos / backend:** no hace falta. Solo se requeriría con cuentas de usuario,
  favoritos en servidor, envío de componentes desde la UI o analytics propios.
- Frameworks, bundlers, `node_modules`.
- Reescribir los demos originales (se mantienen intactos).

## Criterios transversales

1. La app sigue sin dependencias de compilación: `node` solo para scripts puntuales.
2. Cada fase termina con: regenerar catálogo → smoke local → entrada en `CHANGELOG.md`.
3. No se marca ningún demo como `redistributable` sin licencia verificada y archivo
   `LICENSE` presente en su carpeta.
4. No se hace `git commit` salvo petición explícita.
