# Biblioteca HTML y CSS

Biblioteca estática y con búsqueda de demos independientes de interfaces hechos con HTML, CSS y JavaScript. El repositorio contiene actualmente **116 páginas de demos** de botones, tarjetas, navegación, formularios, loaders, galerías, controles y efectos visuales.

La aplicación web está separada en `Web/`; los demos originales permanecen en `BibliotecaDeHtml_CSS/` y se cargan directamente para mostrar vistas previas reales.

## Características

- Búsqueda por nombre, categoría, descripción y etiquetas.
- Filtros por categorías inferidas de los nombres de los demos.
- Sección de destacados con demos existentes.
- Vistas previas interactivas que cargan el HTML original.
- Inspección y copia del HTML, CSS y JavaScript local de cada demo.
- Descargas ZIP solo después de verificar la fuente, los permisos de redistribución y la licencia individual.
- Tema oscuro y claro con preferencia guardada en el navegador.
- Interfaz en inglés y español, con idioma recordado de forma independiente al tema.
- Diseño adaptable, controles accesibles con teclado y compatibilidad con movimiento reducido.
- Sin frameworks, backend, instalación de paquetes ni dependencias de compilación.

## Ejecutar en local

Regenera el catálogo después de añadir o modificar demos:

```powershell
node Web/scripts/generate-catalog.mjs
```

Para abrir la biblioteca directamente, abre `Web/index.html` en el navegador. Antes, regenera el catálogo con el comando anterior si cambiaste o añadiste demos. El archivo `Web/data/catalog.js` permite cargar el catálogo al usar `file://`.

Para probarla mediante HTTP, inicia un servidor estático desde la raíz del repositorio. En Windows puedes usar Python:

```powershell
py -m http.server 8000
```

Abre <http://localhost:8000/>. La página raíz redirige a `/Web/`. También puedes iniciar Live Server en VS Code desde la raíz del repositorio. El servidor HTTP es recomendable para probar el portapapeles y las descargas ZIP; al abrir con `file://`, la compatibilidad de esas API depende del navegador.

Node.js 18 o posterior solo hace falta para regenerar el catálogo. El sitio utiliza HTML, CSS y módulos JavaScript.

## Estructura

```text
.
|-- BibliotecaDeHtml_CSS/       # Demos originales independientes y sus recursos
|-- Web/
|   |-- data/
|   |   |-- catalog.json        # Índice generado de componentes
|   |   `-- component-overrides.json
|   |-- scripts/
|   |   |-- app.js              # Búsqueda, filtros, detalle, copia y tema
|   |   |-- build-site.mjs      # Prepara solo demos autorizados
|   |   |-- generate-catalog.mjs
|   |   `-- zip.js              # Crea archivos ZIP en el navegador
|   |-- styles/site.css
|   `-- index.html
|-- .github/workflows/          # Despliegue con GitHub Pages
|-- index.html                  # Entrada a la aplicación web
|-- LICENSE
|-- THIRD_PARTY_NOTICES.md
`-- README.md
```

## Añadir un demo

1. Crea una carpeta dentro de `BibliotecaDeHtml_CSS/` con un `index.html` y sus recursos locales. Usa `kebab-case` en minúsculas y un nombre que describa el componente, por ejemplo `image-gallery/`.
2. Enlaza el CSS y JavaScript locales desde ese HTML con `<link rel="stylesheet">` y `<script src="...">`.
3. Ejecuta `node Web/scripts/generate-catalog.mjs`. El generador busca también en carpetas anidadas, lee títulos y referencias locales a CSS/JS, y actualiza `Web/data/catalog.json`.
4. Si hace falta, añade metadatos revisados a `Web/data/component-overrides.json`. El ID del demo se forma con la ruta de su carpeta en minúsculas y guiones como separadores.

Por ejemplo, la carpeta `My-Hover-Card/` produce el ID `my-hover-card`:

```json
{
  "my-hover-card": {
    "category": "Cards",
    "description": "A concise, accurate description of the demo.",
    "tags": ["card", "hover"],
    "source": "https://example.com/original-source",
    "license": "MIT",
    "licenseFile": "LICENSE",
    "redistributable": true
  }
}
```

Establece `redistributable` en `true` solo después de confirmar los permisos del código y de todos los recursos incluidos. Guarda la licencia completa o el aviso requerido en la ruta indicada por `licenseFile` dentro de la carpeta del demo. Sin esos campos revisados y un archivo de licencia válido, el botón ZIP permanece deshabilitado y el demo queda fuera del artefacto de despliegue.

Las categorías se infieren de los nombres de carpetas y páginas, y se añaden automáticamente cuando aparecen. Usa un override si hay que corregir una categoría o descripción. La búsqueda no distingue mayúsculas y minúsculas.

## Vistas previas y código

Cada tarjeta y página de detalle carga el `index.html` original en un `iframe`, no una captura. El detalle muestra ese HTML y obtiene los archivos CSS y JavaScript locales para los controles de copia. Algunos demos dependen de imágenes, fuentes, iconos o bibliotecas remotas y pueden necesitar conexión a Internet. Los recursos de terceros no se copian automáticamente al repositorio.

Se repararon las cinco referencias locales que estaban rotas: se eliminaron o reemplazaron scripts ausentes, el demo del cursor utiliza su hoja de estilos existente y la tarjeta de película apunta a su `pngwing.png` local con un fondo CSS. La auditoría ya no encuentra referencias locales rotas en HTML. Los derechos de esa imagen y de otros recursos de terceros aún deben verificarse.

## Procedencia y licencias

La MIT de la raíz se limita al código original de la aplicación y a la documentación de `kindred-98`; no cubre los demos ni recursos de terceros. **Los 116 demos siguen sin estar verificados para redistribución.** El catálogo mantiene `source` y `license` como `Unverified` hasta que se revisen. Consulta [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Una URL de origen o un repositorio público no constituyen por sí mismos una licencia de redistribución.

Antes de publicar o distribuir un demo, verifica su procedencia y las condiciones de su código, imágenes, fuentes, iconos y dependencias. Conserva los avisos necesarios, solicita permiso cuando corresponda o excluye el material cuyos derechos no estén claros.

## Despliegue

La aplicación es estática y no necesita backend. El [workflow de GitHub Actions](.github/workflows/deploy-pages.yml) regenera el catálogo, prepara solo los componentes autorizados y despliega el artefacto. En la configuración del repositorio, selecciona **Settings → Pages → Source → GitHub Actions**. Para Netlify o Vercel, usa el comando `node Web/scripts/generate-catalog.mjs && node Web/scripts/build-site.mjs .github-pages-site` y configura `.github-pages-site` como directorio de publicación. Hasta que se autorice algún demo, Pages publicará la aplicación sin código de demos ni descargas ZIP.

## Contribuir

Mantén cada demo independiente, conserva su comportamiento original y evita añadir dependencias a la aplicación del catálogo. Regenera `Web/data/catalog.json` después de cambiar demos, revisa los overrides y prueba las vistas previas y los controles de copia mediante un servidor HTTP local.
