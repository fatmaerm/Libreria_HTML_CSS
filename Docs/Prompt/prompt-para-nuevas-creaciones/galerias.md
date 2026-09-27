# PROMPT: 100 GALERÍAS en `creaciones-primium/galerias/`

Crea componentes hasta que esta carpeta tenga **exactamente 100 galerías**. Si ya hay N, crea 100 - N.

---

## 1. ANTES DE EMPEZAR
1. Lista los slugs que ya existen en `creaciones-primium/galerias/` y en el resto de carpetas de
   `creaciones-primium/`, y también en `CreacionesNuevas/` y `BibliotecaDeHtml_CSS/`. No repitas ninguno.
2. Anota los slugs que vas a crear en una lista y mantenla al día, para que los 100 sean distintos.

## 2. REGLA DE ORO: LA PRESENTACIÓN ES PARTE DEL DISEÑO
**No existe esqueleto común.** No construyas "titulo + tres fotos en fila". Ese patrón queda
prohibido. Cada galería elige **un** modelo de presentación del catálogo, distinto del de sus vecinos
(nunca tres seguidos con el mismo modelo). Dentro de tu modelo, inventa libremente.

## 3. CATÁLOGO DE MODELOS DE PRESENTACIÓN (rota entre ellos)
1. MOSAICO — rejilla tipo masonry que reorganiza al filtrar.
2. CARRUSEL — un panel deslizante con flechas, puntos y arrastre táctil.
3. LIGHTBOX — miniatura que abre un visor a pantalla completa con zoom y gestos.
4. TIRA HORIZONTAL — scroll infinito con anclas laterales.
5. DIAPOSITIVAS - un pase cada vez, con transicion arrastrable con el dedo y con teclado.
6. MARQUESA — cinta de miniaturas que se desplaza, se pausa al pasar el cursor y es navegable.
7. CUBO 3D — galería sobre las caras de un cubo que gira.
8. ESFERA — galería distribuida sobre una esfera que gira con el cursor.
9. CUBO DE ESPEJOS - pila que gira, con la imagen central al frente y las demas en perspectiva.
10. LINEUP DE PELÍCULAS — cartelera horizontal con portadas y sinopsis al seleccionar.
11. TIRA DE CONTACTOS — miniaturas redondas con un avatar seleccionado ampliado.
12. MAPA DE IMÁGENES — zonas sensibles sobre un plano, y la imagen cambia al pasar por ellas.
13. ÁLBUM DESPLEGABLE — rejilla que crece a pantalla completa al pulsar.
14. LÍNEA DE TIEMPO — imágenes en una línea vertical con fecha y texto.
15. ENCIMA — imagen grande con miniaturas superpuestas en una esquina.
16. PANORÁMICA — tira de vistas que se desplaza con efecto de paralaje al hacer scroll.
17. MARCO DE PÁGINAS — un libro que pasa páginas.
18. LISTA CON VISTA PREVIA — una columna de miniaturas y, al lado, la grande.
19. MURO (masonry hover) — las miniaturas crecen al pasar el cursor, como un portfolio.
20. APILADAS — tarjetas apiladas que se despliegan en abanico al hacer clic.
21. EN UNA VITRINA — se ven como piezas de una colección, con marco y luz.
22. DIAGRAMA DE IMÁGENES — las imágenes conectadas por líneas, como un mapa relacional.
23. FILMSTRIP — fotogramas numerados con marcas de tiempo, estilo bobina.
24. MURAL ANCHO — galería a sangre completa, con scroll vertical y paginación por sección.

## 4. CONVENCIÓN DE ARCHIVOS
Una carpeta por componente: `creaciones-primium/galerias/<slug-kebab-case-en-ingles>/`
- `index.html` obligatorio
- `styles.css` obligatorio
- `script.js` **opcional**: solo si la galería necesita JS. Si es puro CSS, no lo crees ni lo referencies.

Nada más. Sin README, sin package.json, sin carpeta de assets.

## 5. REGLAS DURAS
- Solo HTML, CSS y JS. **Sin recursos externos**: nada de CDN, `<img>`, `url()` a archivo, webfonts
  (solo pilas del sistema), `fetch` ni módulos ES. Debe verse igual abierto con `file://`.
- **No hay imágenes de verdad**: todas las "fotos" se generan con CSS (gradientes, conic-gradient,
  `radial-gradient`, `repeating-linear-gradient`) o SVG. Cada pieza tiene su propio autorretrato
  (paleta y formas distintas) para que la galería no parezca un muestrario repetido.
- `index.html` necesita: `<!doctype html>`, `<html lang="en">`, `meta charset`, viewport,
  `<title>` en inglés, `<meta name="description" content="...">` en inglés y, **justo debajo**,
  `<meta name="description-es" content="...">` en español natural con acentos correctos, sin
  entidades HTML y sin comillas dobles dentro del atributo.
- Sin emojis, sin lorem ipsum, sin "coming soon", sin texto de relleno, **sin comentarios en el código**.
- Anima solo `transform`, `opacity`, `filter`, `clip-path`, `color`. Nunca `width`/`height`/`top`/`left`
  en muchos elementos a la vez. Objetivo 60fps.
- Obligatorio `@media (prefers-reduced-motion:reduce)` que deje la galería en un estado estático,
  terminado y navegable.
- Accesible: la navegación funciona con teclado (flechas, `Home`/`End`, `Escape` para cerrar el
  visor), foco visible, y el visor es un diálogo con `role="dialog"` y `aria-modal`.
- Responsive: se ve bien a 1200x800 y a 380x700. Sin scroll horizontal, nada cortado.
- No toques archivos fuera de tu carpeta. No ejecutes comandos de git.

## 6. BARRA DE CALIDAD
Nada de tres cuadros grises con "foto 1". Cada galería tiene: historia de color propia, profundidad
real (sombra de contacto, luz de borde, reflejo en el suelo), microdetalle (números, nombres, marcos,
marcas de página) y movimiento con easing y escalonado. La transición entre imágenes tiene que tener
calidad: nada de saltos ni de parpadeo.

## 7. CONCEPTOS (extrae 100 distintos de estas familias, 2-4 por familia)
Producto · Moda · Viajes y destino · Comida · Arquitectura · Retratos · Paisaje · Abstracto ·
Monocromo · Vintage/retro · Sci-fi · Cyberpunk · Editorial · Bodegón · Bodegón de producto · Deco ·
Galería de arte · Ilustración · Cine y fotogramas · Cosplay · Surf y deporte · Moto · Coches ·
Minimalismo · Geometría · Luz y color · Fotografía analógica · Polaroid · Panorámica 360º · Tira de
  contacto - Collage - Album de recuerdo - Exposicion - Catalogo de marca - Showreel.

## 8. VERIFICACIÓN (obligatoria, no te la saltes)
1. `node --check <carpeta>/<slug>/script.js` en cada `script.js` que crees.
2. Movimiento y errores, con el banco del repo:
   `node Docs/Prompt/prompt-para-nuevas-creaciones/banco-de-pruebas.mjs galerias <slug>`
   Debe salir `ok`: nada de `ERROR-JS`, `SIN-MOVIMIENTO` ni `SIN-REPORTE`.
   **AVISO IMPORTANTE:** Edge headless con `--virtual-time-budget` ejecuta solo unos 4
   `requestAnimationFrame`, así que una captura a pelo siempre sale congelada en el frame 0.
   Nunca deduzcas "está roto" de una sola imagen: usa la sonda de movimiento del banco.
3. Mira las dos capturas de cada galería (2500 ms y 7000 ms) con la herramienta de lectura, y
   comprueba que las "fotos" generadas con CSS se distinguen entre sí.
4. Cada `href`/`src` del `index.html` apunta a un archivo que existe en la misma carpeta.

## 9. AUDITORÍA FINAL
Sobre los 100: sin errores de sintaxis, sin referencias rotas, sin archivos extra, sin recursos
externos, con `prefers-reduced-motion` en todos, con exactamente una meta `description` y una
`description-es` por archivo, y llaves CSS balanceadas (ignora las que estén dentro de `content:"..."`).

## 10. GIT
Al terminar, si el usuario lo pide: `node Web/scripts/generate-catalog.mjs` para el catálogo y un
commit **solo con las rutas de tu carpeta**, nunca con `git add -A` (hay cambios de otras sesiones en
el working tree).

## 11. ENTREGA
Informe con: los 100 slugs, el modelo de presentación de cada uno, el estado de verificación y una
línea describiendo el tipo de galería y su navegación.
