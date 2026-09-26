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

- `scripts/generate-catalog.mjs` busca cada `index.html`, incluidos los demos anidados, lee el título y las referencias locales a CSS/JavaScript, y genera `data/catalog.json`.
- `scripts/generate-catalog.mjs` busca cada `index.html`, incluidos los demos anidados, lee el título y las referencias locales a CSS/JavaScript, e genera `data/catalog.json` y `data/catalog.js` con las fuentes locales incrustadas.
- `scripts/generate-catalog.mjs` busca cada `index.html`, incluidos los demos anidados, lee el título y las referencias locales a CSS/JavaScript, y genera `data/catalog.json` y `data/catalog.js` con las fuentes locales incrustadas.
- `data/component-overrides.json` permite añadir nombres, categorías, descripciones, etiquetas, destacados, fuentes y licencias revisados para cada ID. El estado predeterminado es `Unverified`; no marques una fuente o licencia como verificada sin comprobarla.
- `scripts/app.js` muestra la búsqueda, los filtros, las vistas previas reales, los controles para copiar el código y los botones ZIP sujetos a la verificación de derechos.
- `scripts/zip.js` crea archivos ZIP en el navegador sin paquetes externos.
- `scripts/build-site.mjs` excluye del artefacto de publicación todos los demos que no estén autorizados para redistribución.
- `styles/site.css` contiene el tema y el diseño adaptable de la aplicación.
- La interfaz ofrece inglés y español; guarda el idioma en `localStorage` con la clave `component-field-language`, separada de `component-field-theme`.
- Las vistas previas cargan el `index.html` original en un `iframe`. El detalle muestra ese HTML y lee los archivos CSS y JavaScript locales para poder copiarlos.

El catálogo local detecta actualmente 116 páginas de demos. Las categorías se infieren de los nombres de carpetas y páginas. Las referencias locales faltantes se muestran en el detalle. Ninguno de los demos está autorizado todavía para redistribución; por eso, el artefacto público no incluye su código hasta que se confirmen los derechos.

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
    "tags": ["card", "hover"],
    "source": "https://example.com/original-source",
    "license": "MIT",
    "licenseFile": "LICENSE",
    "redistributable": true
  }
}
```

Introduce una fuente y licencia solo después de verificar los derechos de redistribución del código y de todos los recursos incluidos. Guarda la licencia completa o el aviso dentro de la carpeta del componente, define `licenseFile` con su ruta relativa y establece `redistributable` en `true`. Si no se cumplen esas condiciones, el ZIP seguirá deshabilitado y el constructor excluirá el componente. La MIT de la raíz no autoriza contenido de terceros.

## Despliegue

Ejecuta `node Web/scripts/generate-catalog.mjs` y luego `node Web/scripts/build-site.mjs .github-pages-site` para crear el artefacto filtrado por licencias. GitHub Actions realiza estos pasos; configura **Settings → Pages → Source** como **GitHub Actions**. Netlify y Vercel pueden usar el mismo comando y `.github-pages-site` como directorio de publicación. Con los metadatos actuales, el artefacto contiene la aplicación, pero ningún demo hasta que se verifiquen los derechos.
