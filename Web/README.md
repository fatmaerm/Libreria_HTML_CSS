# Aplicación web Component/Field

Catálogo estático y sin dependencias para los demos independientes de `../BibliotecaDeHtml_CSS/`. Los demos originales permanecen separados; la aplicación los indexa sin reescribir su HTML, CSS ni JavaScript.

## Ejecución local

Desde la raíz del repositorio, regenera el catálogo después de añadir o modificar un demo:

```powershell
node Web/scripts/generate-catalog.mjs
```

Sirve la raíz del repositorio por HTTP. Por ejemplo, si tienes Python instalado:

```powershell
py -m http.server 8000
```

Abre <http://localhost:8000/>. La página raíz redirige a `/Web/`. También puedes iniciar Live Server en VS Code desde la raíz.

Para abrirla sin servidor, regenera el catálogo y abre `Web/index.html` directamente. `data/catalog.js` contiene el índice y las fuentes locales que necesita esa modalidad. Usa HTTP para probar el portapapeles y las descargas ZIP, ya que su disponibilidad bajo `file://` depende del navegador.

El generador requiere Node.js 18 o posterior. La aplicación usa HTML, CSS, módulos JavaScript y API del navegador; no requiere instalar paquetes ni ejecutar un paso de compilación.

## Funcionamiento

- `scripts/generate-catalog.mjs` busca cada `index.html`, incluidos los demos anidados, lee el título y las referencias locales a CSS/JavaScript, y genera tres artefactos: `data/catalog.json` (índice ligero, sin código), `data/sources/<id>.json` (el código de cada componente, que la web pide solo al abrir su detalle) y `data/catalog.js` (catálogo completo para el modo `file://`).
- `data/component-overrides.json` permite añadir nombres, categorías, descripciones, descripciones en español, etiquetas, destacados, fuentes y licencias revisados para cada ID. `license` mantiene el valor predeterminado `Unverified`; no marques una licencia como verificada sin comprobarla.
- `scripts/app.js` muestra la búsqueda, los filtros, las vistas previas reales, los controles para copiar el código y los botones ZIP sujetos a la verificación de derechos.
- La web se reparte en tres páginas que comparten `scripts/app.js`: `index.html` (hero, destacados y categorías), `components.html` (la colección con buscador y filtros, además del detalle de cada componente) y `team-core.html` (equipo y donaciones). Cada una declara su propia canonical; el detalle vive en `components.html?component=<id>`.
- `scripts/zip.js` crea archivos ZIP en el navegador sin paquetes externos.
- `scripts/build-site.mjs` excluye del artefacto de publicación todos los demos que no estén autorizados para redistribución.
- `styles/site.css` contiene el tema y el diseño adaptable de la aplicación.
- La interfaz ofrece inglés y español; guarda el idioma en `localStorage` con la clave `component-field-language`, separada de `component-field-theme`.
- Las vistas previas cargan el `index.html` original en un `iframe`. El detalle muestra ese HTML y lee los archivos CSS y JavaScript locales para poder copiarlos.

El catálogo local detecta actualmente 364 páginas de demos en dos colecciones: los 248 de `CreacionesNuevas/` (creaciones del autor, con `LICENSE` MIT propia y **ZIP habilitado**) y los 116 de `BibliotecaDeHtml_CSS/` (terceros, trazados a `gevendra2004/gevstack`, que **no declara licencia**, por lo que su ZIP sigue deshabilitado y el constructor los excluye). Las categorías se infieren de los nombres de carpetas y páginas. Las referencias locales faltantes se muestran en el detalle. Consulta [`../Docs/Legalizacion/THIRD_PARTY_NOTICES.md`](../Docs/Legalizacion/THIRD_PARTY_NOTICES.md).

## Añadir un componente

1. Crea una carpeta independiente dentro de `BibliotecaDeHtml_CSS/` con un `index.html` y los recursos locales necesarios. Usa `kebab-case` en minúsculas y un nombre que describa el componente.
2. Enlaza el CSS y JavaScript locales mediante etiquetas `<link rel="stylesheet">` y `<script src="...">`.
3. Regenera el catálogo con `node Web/scripts/generate-catalog.mjs`.
4. Escribe el `<title>` con el nombre funcional del componente, sin añadir marcas como `GevStack`.
5. Si hace falta, añade metadatos a `data/component-overrides.json` con el ID generado. El ID usa la ruta de la carpeta en minúsculas y convierte los separadores en guiones.

Por ejemplo, una carpeta llamada `My-Hover-Card` produce el ID `my-hover-card`:

```json
{
  "my-hover-card": {
    "category": "Cards",
    "description": "A short, accurate summary of the demo.",
    "descriptionEs": "Resumen corto y preciso del demo en español.",
    "tags": ["card", "hover"],
    "source": "https://example.com/original-source",
    "license": "MIT",
    "licenseFile": "LICENSE",
    "redistributable": true
  }
}
```

Introduce una fuente y licencia solo después de verificar los derechos de redistribución del código y de todos los recursos incluidos. Guarda la licencia completa o el aviso dentro de la carpeta del componente, define `licenseFile` con su ruta relativa y establece `redistributable` en `true`. Si no se cumplen esas condiciones, el ZIP seguirá deshabilitado y el constructor excluirá el componente. La MIT de la raíz no autoriza contenido de terceros.

`description` es el texto en inglés de la tarjeta y `descriptionEs` el español. Si falta la traducción, la interfaz en español muestra el texto original en inglés.

## Despliegue

La app es estática: **no necesita backend ni base de datos**.

**Vercel:** usa la raíz del repositorio con `vercel.json` (framework `Other`, sin build command, output `.`). No ejecutes `build-site.mjs` como build: filtra por licencia y hoy publicaría **0 demos**, rompiendo las previews (`../BibliotecaDeHtml_CSS/...`).

**GitHub Pages:** ejecuta `node Web/scripts/generate-catalog.mjs` y luego `node Web/scripts/build-site.mjs .github-pages-site` para crear el artefacto filtrado por licencias. GitHub Actions realiza estos pasos; configura **Settings → Pages → Source** como **GitHub Actions**.

**Netlify:** publica la raíz sin build command, igual que Vercel.

Con los metadatos actuales, el artefacto filtrado de Pages contiene la aplicación, pero ningún demo hasta que se verifiquen los derechos.
