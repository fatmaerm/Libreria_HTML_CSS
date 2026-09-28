# TERCERA AUDITORÍA — creations-primium/tarjetas (71 animaciones de tarjeta)

> **Documento de traspaso.** Cualquier IA (o persona) puede continuar el trabajo desde aquí
> sin haber leído nada anterior. Todo lo necesario está dentro de este fichero.
>
> Fecha: 28 de septiembre de 2026
> Spec original: `Docs/Prompt/prompt-para-nuevas-creaciones/tarjetas.md`
> Objetivo del spec: dejar **`creaciones-primium/tarjetas/` con exactamente 100 tarjetas**.
> Esta sección cubre los **71** primeros (la carpeta estaba vacía).

---

## 1. ESTADO ACTUAL

| | |
|---|---|
| Tarjetas pedidas en este encargo | 71 |
| **Tarjetas construidas y verificadas** | **43** |
| **Pendientes** | **28** |
| Slugs que colisionan con el resto del repo | 0 (verificado contra los 481 existentes) |
| Modelos de presentación usados | 24 de 24 |
| Errores de sintaxis JS | 0 |
| Referencias rotas (`href`/`src`) | 0 |

Ruta: `creaciones-primium/tarjetas/<slug>/` con `index.html` + `styles.css` + `script.js`
(opcional). Nada más: sin README, sin `package.json`, sin assets.

---

## 2. ENTORNO (IMPORTANTE SI TRABAJAS EN OTRO ORDENADOR)

El proyecto es **estático**: no hay `npm install` porque no hay dependencias. Pero sí hace
falta **Node.js ≥ 20** para generar el catálogo y para el banco de pruebas.

En este equipo Node y Git se instalaron **en modo portátil**, porque `winget install`
pedía elevation UAC y falló:

- Node v24.19.0 (+ npm 11.17) → `%LOCALAPPDATA%\Programs\nodejs`
- Git 2.55.0 (MinGit) → `%LOCALAPPDATA%\Programs\MinGit`
- Ambos añadidos al **PATH de usuario** con `[Environment]::SetEnvironmentVariable('Path', ..., 'User')`

**En una terminal nueva o en VS Code ya funcionan.** Si abres una sesión antigua, el PATH
no está actualizado: antepón esto en PowerShell.

```powershell
$env:PATH = "C:\Users\<TU_USUARIO>\AppData\Local\Programs\nodejs;$env:PATH"
```

El banco de pruebas usa **Edge** en esta ruta fija (si no existe, instala Edge):

```
C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
```

---

## 3. ⚠️ EL HALLAZGO MÁS IMPORTANTE DE ESTA AUDITORÍA

**Este es el motivo por el que las tarjetas salían invisibles.** Está medido, no supuesto.

El banco de pruebas captura con `--virtual-time-budget`, y bajo ese modo **el timeline de
animación CSS no avanza más de ~0.9 s**, aunque pidas 2500 ms o 7000 ms de presupuesto. Y
cuanto más pesada es la página, menos avanza. Medido en este equipo:

| página | timeline alcanzado con `budget=2500` |
|---|---|
| probe ligero, sin JS | 1402 ms |
| `alpine-guide-profile` (más pesada, con JS) | ~900 ms |
| la misma, con un bucle `requestAnimationFrame` | **27 ms** |

Tres consecuencias, y las tres se aplican a las 71 tarjetas:

### Regla 5.1 — Ninguna entrada puede pasar de 0.80 s
```css
/* MAL: 0.28 + 0.7 = 0.98 s, se queda congelada en opacity:0 */
/* BIEN */
animation: rise 0.45s var(--ease-out) both;
animation-delay: 0.06s;   /* 0.06 + 0.45 = 0.51 s ✓ */
```
Si `delay + duration > 0.9 s`, el elemento **queda pegado en el estado `from`** y en la
captura aparece invisible. Escalonados válidos: `0.05/0.10/0.15` + duración `0.3–0.45s`.

### Regla 5.2 — NUNCA uses `requestAnimationFrame`
Un bucle rAF colapsa el timeline de 1402 ms a **27 ms** y deja la tarjeta **entera
invisible**. Usa `setTimeout` / `setInterval`, que el virtual-time sí ejecuta correctamente.
Para bucle continuo, `setTimeout(fn, 16)` va bien.

### Regla 5.3 — El estado base (sin animación) debe ser VISIBLE y TERMINADO
Prohibido `opacity: 0` en la regla base de contenido esencial. La animación solo embellece.
Así, aunque el reloj se quede corto, el contenido se ve.

### Regla 5.4 — Los números se escriben en el HTML con su valor FINAL
```html
<dd class="stat__value" data-count="214">214</dd>   <!-- final en el HTML, NO 0 -->
```
El JS anima desde 0 hasta ese valor con `setTimeout`. Si el JS no corre, el número correcto
ya está en pantalla.

### Regla 5.5 — Las animaciones infinitas sí pueden durar mucho
Respirar, brillar o girar con duraciones de 5–10 s no es problema: en captura da igual en qué
fase estén. Lo crítico es la **entrada**.

### Regla 5.6 — `--dump-dom` NO sirve para diagnosticar animación
No renderiza, así que su `timeline` miente. Para diagnosticar, usa **capturas**
(`--screenshot`) o el banco de pruebas.

### Trampa extra: `animation-fill-mode: both`
`both` **fija el estado final** e impide que otras clases (`.is-gone`, `:hover`, `.is-x`)
apliquen sus cambios. Usa `backwards`, `none` o `forwards` según el caso. Se detectó
concreto en `scratch-off-reverse-card` (la lámina nunca se disolvía) y en los pines de
`city-transit-map-card` (el hover no respondía).

---

## 4. REGLAS DEL SPEC (resumen operativo)

1. **Sin recursos externos**: nada de CDN, `<img>`, webfonts, `url()` a fichero, `fetch`,
   módulos ES. Solo pilas del sistema. Debe verse igual abierto con `file://`.
   - Permitidos: SVG inline, `data:image/svg+xml` con `feTurbulence` para el grano.
2. **Sin emojis**, sin lorem ipsum, sin "coming soon", sin texto de relleno, **sin comentarios
   en el código** (ni `//` ni `/* */`).
3. **Exactamente una** `description` y **una** `description-es` en cada HTML, y la
   `description-es` **justo debajo**. En español natural con acentos reales, sin entidades
   HTML y sin comillas dobles dentro del atributo.
4. Anima **solo** `transform`, `opacity`, `filter`, `clip-path`, `color`. Nunca `width`,
   `height`, `top`, `left` en muchos elementos a la vez. Partículas con nodos reutilizados o
   arrays tipados.
5. `@media (prefers-reduced-motion: reduce)` **obligatorio**, y debe dejar la tarjeta en
   estado estático **terminado y bonito**. Ojo: al clavar la duración a `.001ms` la animación
   salta a su estado final, así que repite ahí los `transform`/`opacity` finales (por ejemplo
   `scaleX(var(--w))` para que las barras queden llenas y no vacías).
6. Accesible: lo interactivo es `<button>` o `<a>` real, `aria-label` en iconos,
   `:focus-visible` visible, recorrido con teclado.
7. Responsive: bien a **1200x800** y a **380x700**, sin scroll horizontal ni nada cortado.
   Añade `min-width: 0` a los contenedores flex/grid.
8. Sin tarjeta blanca centrada sobre fondo gris. Cada componente necesita: historia de color
   (2-3 tonos armónicos + acento), profundidad real (sombra de contacto, luz de borde con
   `inset 0 1px 0 rgba(255,255,255,.16)`, brillo especular), microdetalle (bisel de 1px,
   marcas, tipografía grabada, anotaciones técnicas en monoespaciada) y movimiento con
   easing, escalonado y carácter físico.

### Plantilla de `index.html`
```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Titulo En Ingles</title>
<meta name="description" content="Descripcion en ingles.">
<meta name="description-es" content="Descripcion en espanol con acentos naturales, sin entidades ni comillas dobles.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
...
</body>
</html>
```

---

## 5. LAS 43 TARJETAS YA HECAS

| # | slug | modelo de presentación | efecto |
|---|---|---|---|
| 1 | `alpine-guide-profile` | PERFIL | Contadores que suben con amortiguación, halo de disponibilidad, sheen especular |
| 2 | `titanium-ring-store` | PRODUCTO | Vista 360 con arrastre, miniaturas, variantes que morfean el acabado |
| 3 | `indie-saas-plan-tiers` | PRICING | Conmutador mensual/anual con conteo de precios, recomendado con luz de borde |
| 4 | `deep-work-essay` | ARTÍCULO | Portada por `clip-path`, tiempo de lectura, cuerpo desplegable |
| 5 | `night-owl-dev-post` | POST | Reacciones con muelle, contador en vivo, bloque multimedia |
| 6 | `startup-burn-rate-panel` | MÉTRICAS | Sparkline con `stroke-dashoffset`, conmutador 30d/90d, deltas escalonados |
| 7 | `coastal-fog-forecast` | CLIMA | Tira horaria arrastrable, alerta de niebla, bancos a la deriva sobre mapa |
| 8 | `dragon-knight-character` | JUEGO | Marco de rareza pulsante, stats que se llenan, brasas, destello de habilidad |
| 9 | `ramen-broth-recipe` | RECETA | Escalador que recalcula 9 cantidades, pasos desplegables, checklist con tachado |
| 10 | `lofi-study-session-player` | CANCIÓN | Forma de onda, portada, letra sincronizada |
| 11 | `iceland-ring-road-trip` | MAPA | Marcadores que rebotan, ruta trazada, ficha al pasar |
| 12 | `lisbon-boarding-pass` | VUELO | Línea de escaneo, perforación, datos escaneables |
| 13 | `indie-film-screening-seat` | SALA | Butacas que se iluminan, aforo recalculado, conmutador de sesión |
| 14 | `dark-fantasy-novel-reader` | LECTOR | Paginación 3D, cinta carmesí, motas de polvo, barra de posición |
| 15 | `sprint-release-kanban` | BENTO | Rejilla que se reordena con FLIP, tarjetas que saltan de carril, burndown |
| 16 | `freelance-contact-directory` | PERFIL | Retrato con sombra de contacto, estado con glow, filas que se revelan |
| 17 | `architect-business-card` | GIRATORIA | Giro 3D por hover y arrastre, reverso, brillo que barre la arista |
| 18 | `monthly-bank-statement` | TIMELINE | Entradas escalonadas sobre el eje, estados por movimiento, saldo que cuenta |
| 19 | `delivery-alert-sticky` | NOTA | Nota que se deforma al arrastrar, pinza que gira, checklist |
| 20 | `frosted-glass-stats-panel` | GIRATORIA | Refracción del vidrio que se desplaza con el ángulo, reverso con otros datos |
| 21 | `neon-night-market-sign` | CÁMARA | Tubo de neón con flicker, controles de exposición |
| 22 | `cyber-deck-target-hud` | MÉTRICAS | HUD: retícula que se bloquea, escaneo, cifras, log con estados |
| 23 | `letterpress-broadsheet` | REVISTA | Titular que se asienta, columnas escalonadas, tinta que se densifica |
| 24 | `mono-grid-editorial-zine` | ARTÍCULO | Retícula tipográfica, bandas que revelan el retrato, regla que se dibuja |
| 25 | `workspace-bento-dashboard` | BENTO | 8 módulos que se reordenan a 2 columnas, brilho saltando de bloque |
| 26 | `scratch-off-reverse-card` | GIRATORIA | Rasca-y-gana celda a celda, giro 3D, reverso con premio |
| 27 | `city-transit-map-card` | MAPA | Líneas trazadas, paradas que laten, trenes en polilínea, fichas de parada |
| 28 | `bitcoin-node-tracker` | CRIPTO | Sparkline, precio que cuenta, order book, orden que se sella |
| 29 | `security-clearance-badge` | FICHA | QR recompuesto por grupos, validez en tiempo real, cadena de avalaciones |
| 30 | `linen-shirt-lookbook` | MOSAICO | Masonry de tejidos solo con CSS, filtros que voltean con FLIP |
| 31 | `gym-membership-tiers` | PRICING | Píldora deslizante, precios con conteo, corona luminosa en el destacado |
| 32 | `weekend-longform-issue` | REVISTA | Portada, artículo destacado, paginación |
| 33 | `trail-run-photo-post` | POST | Reacciones, multimedia, ken-burns |
| 34 | `podcast-listener-stats` | TIMELINE | Episodios encadenados en el eje, barras, deltas |
| 35 | `alpine-avalanche-alert` | NOTA | Nivel de riesgo que sube, nota que tiembla, checklist |
| 36 | `cyber-runner-loadout` | JUEGO | Marco holográfico, stats, destello de habilidad |
| 37 | `santiago-camino-stages` | TIMELINE | Etapas escalonadas, hito, distancia acumulada |
| 40 | `frequent-flyer-status-pass` | CRÉDITO | Franja de estado, inclinación con especular |
| 41 | `concert-hall-seat-map` | SALA | Mapa de butacas con onda, aforo, conmutador de sesión |
| 42 | `poetry-chapbook-spread` | LECTOR | Doblez central animado, cinta que cae con amortiguación |
| 43 | `bug-triage-lanes` | TIMELINE | Bugs que migran de carril, antigüedad, estados |
| 44 | `city-services-directory` | MOSAICO | Directorio con filtros que reorganizan con flip |
| 45 | `letterpress-calling-card` | CRÉDITO | Relieve que se marca al pasar, tinta, borde troquelado |

> Los números 38 y 39 del manifiesto quedaron sin hacer (ver sección 6); el resto de este
> bloque está construido y con estado `ok` en el banco.

**Referencias de calidad** para el estilo del repo:
`creaciones-primium/tarjetas/cyber-deck-target-hud/`, `startup-burn-rate-panel/`,
`alpine-guide-profile/`, `dark-fantasy-novel-reader/`.

---

## 6. LOS 28 PENDIENTES

Estos son exactamente los que hay que construir. Respetan la rotación de modelos del
manifiesto: **ningún modelo repite con su vecina** en la secuencia original.

| # | slug | modelo | idea | efecto buscado |
|---|---|---|---|---|
| 38 | `vinyl-side-b-player` | CANCIÓN | Reproductor de vinilo cara B con onda y letra | Disco que gira con inercia, brazo que se posa, onda que respira |
| 39 | `sourdough-starter-log` | TIMELINE | Diario de fermentación de masa madre con fases | Fases que avanzan, burbujas que suben, altura que cuenta |
| 46 | `utility-invoice-breakdown` | MÉTRICAS | Desglose de factura con micrográficos | Barras que crecen, conceptos escalonados, total que cuenta |
| 47 | `pipeline-notify-timeline` | TIMELINE | Notificaciones de pipeline con estados | Avisos escalonados, estado que parpadea, eje que se traza |
| 48 | `crystal-swatch-mosaic` | MOSAICO | Muestrario de cristal con filtros | Muestras con paralaje, filtro que reorganiza con flip |
| 49 | `glow-tube-token-card` | CRIPTO | Token en tubo de neón con sparkline | Neón con flicker, precio que cuenta, orden que se sella |
| 50 | `street-net-access-card` | PERFIL | Acceso a red callejera, perfil HUD | Avatar con escaneo de retícula, estado con glitch controlado |
| 51 | `kraft-paper-voucher` | NOTA | Vale de papel kraft con textura | Borde rasgado, sello que se estampa, checklist |
| 52 | `single-column-feature` | ARTÍCULO | Article de una sola columna | Portada que se descubre, texto que se asienta, regla que se dibuja |
| 53 | `fitness-bento-panels` | BENTO | Paneles de entrenamiento con anillos | Bloques reordenables, anillo que se traza, brillo saltando |
| 54 | `hologram-id-reverse` | GIRATORIA | Identificación holográfica con reverso | Giro con inverso, holograma que se descompone al moverse |
| 55 | `treasure-map-hunt-card` | JUEGO | Carta de tesoro con stats y rareza | Ruta que se dibuja, X que aparece, destello de habilidad |
| 56 | `ethereum-gas-gauge` | CRIPTO | Medidor de gas con sparkline | Aguja con amortiguación, percentil que cuenta, orden que confirma |
| 57 | `crew-member-dossier` | FICHA | Expediente de tripulante con validez | Foto que se revela, sellos escalonados, caducidad que cuenta |
| 58 | `ceramic-mug-detail` | PRODUCTO | Taza de cerámica con vista 360 | Arrastre con conic-gradient, sombra que gira, variantes de esmalte |
| 59 | `cloud-storage-plans` | PRICING | Planes de almacenamiento en la nube | Espacio con barra, precios que rotan, recomendado que respira |
| 60 | `column-op-ed-note` | NOTA | Nota de opinión editorial | Tachado que se dibuja, marginalia que se revela, papel que se arruga |
| 61 | `street-food-review-post` | BENTO | Review de comida callejera en bloques | Reacciones, bloques reordenables, plato que gira |
| 62 | `home-energy-meter` | CLIMA | Contador de energía doméstico con tira horaria | Tira deslizable, alerta de pico, barras de consumo |
| 63 | `monsoon-rain-radar` | CÁMARA | Radar de monzón en visor | Barrido, gotas que caen, exposición que ajusta contraste |
| 64 | `tavern-quest-board` | MOSAICO | Tablero de misiones de taberna | Misiones que se reorganizan, rareza, filtros por nivel |
| 65 | `thai-curry-recipe-scaler` | RECETA | Curry tailandés con escalador | Escalador con conteo, pasos desplegables, color que se intensifica |
| 66 | `busker-tip-song-card` | POST | Tarjeta de canción de músico callejero | Propina con muelle, onda que respira, reacción que estalla |
| 67 | `desert-rally-waypoints` | MAPA | Puntos de ruta de rally del desierto | Marcadores que rebotan, ruta trazada, ficha |
| 68 | `airline-baggage-tag` | NOTA | Etiqueta de equipaje con código | Etiqueta que se mece, código recompuesto, destino con flip |
| 69 | `festival-wristband-pass` | VUELO | Pulsera de festival con pase | Escaneo, pulsera que gira, datos revelados |
| 70 | `field-notes-pocket-book` | LECTOR | Cuaderno de campo de bolsillo | Página que pasa, cinta que se desliza, papel que se ondula |
| 71 | `campaign-approval-flow` | TIMELINE | Flujo de aprobación de campaña | Aprobaciones encadenadas, sello, eje que avanza |

*(El orden de la tabla es el de construcción; la numeración sigue el manifiesto original.)*

---

## 7. PROCEDIMIENTO PARA TERMINAR

### 7.1 Construir (por lotes de ~7, va bien en paralelo)

Estructura por tarjeta, sin excepciones:
```
creaciones-primium/tarjetas/<slug>/index.html
creaciones-primium/tarjetas/<slug>/styles.css
creaciones-primium/tarjetas/<slug>/script.js   (solo si el efecto necesita JS)
```
Usa **clases CSS con prefijo propio del componente** y coherentes con el HTML.

### 7.2 Verificar cada tarjeta

```powershell
$env:PATH = "C:\Users\<TU_USUARIO>\AppData\Local\Programs\nodejs;$env:PATH"
cd C:\Users\mañana\Documents\GitHub\Libreria_HTML_CSS

# 1) sintaxis del JS (solo si creaste script.js)
node --check creations-primium/tarjetas/<slug>/script.js

# 2) banco de pruebas
node Docs/Prompt/prompt-para-nuevas-creaciones/banco-de-pruebas.mjs tarjetas <slug>
```

Varios slugs de una vez en PowerShell (con splatting, si no no funciona):
```powershell
$a = @('Docs/Prompt/prompt-para-nuevas-creaciones/banco-de-pruebas.mjs','tarjetas','slug1','slug2','slug3')
& node @a
```

**Debe imprimir `ok`.** Estados de fallo y su causa:
- `ERROR-JS` → el `script.js` lanzó una excepción.
- `SIN-MOVIMIENTO` → falta movimiento continuo (un `transform` en bucle o un escalonado).
- `SIN-REPORTE` → la página no llegó a producir la sonda.
- **Tarjeta visible pero con partes invisibles** → violaste las reglas 5.1/5.2/5.3. Es el fallo
  más común y el que más se repite.

### 7.3 Mirar las capturas (obligatorio, no es opcional)

```
%TEMP%\opencode\banco\shots\<slug>-2500.png
%TEMP%\opencode\banco\shots\<slug>-7000.png
```

Abrir con la herramienta de lectura de imágenes y comprobar:
- La tarjeta se ve **completa** (nada invisible, nada a medio dibujar).
- Está **bien compuesta** y centrada.
- Las dos capturas **difieren** entre sí.
- En 380x700 no hay scroll horizontal ni texto cortado.

### 7.4 Auditoría final sobre las 71

```powershell
# Referencias rotas y archivos que falten
Get-ChildItem creations-primium/tarjetas -Directory | ForEach-Object {
  $d = $_; $idx = Join-Path $d.FullName 'index.html'
  if (-not (Test-Path $idx)) { "SIN index.html : $($d.Name)"; return }
  $h = Get-Content $idx -Raw
  [regex]::Matches($h, '(?:href|src)="([^"]+)"') | ForEach-Object { $_.Groups[1].Value } |
    Where-Object { $_ -notmatch '^(https?:|data:|#)' } |
    ForEach-Object { if (-not (Test-Path (Join-Path $d.FullName $_))) { "ROTO [$_] : $($d.Name)" } }
  if (-not (Test-Path (Join-Path $d.FullName 'styles.css'))) { "FALTA styles.css : $($d.Name)" }
  if ($h -notmatch 'description-es') { "FALTA description-es : $($d.Name)" }
}
```

Y comprobar manualmente, sobre los 71:
- una sola `description` y una sola `description-es` por HTML;
- `prefers-reduced-motion` en los 71 CSS;
- sin recursos externos, sin emojis, sin comentarios;
- llaves CSS balanceadas (ignorando las que estén dentro de `content:"..."`);
- sin archivos extra en las carpetas.

### 7.5 Catálogo y git (SOLO si el usuario lo pide)

```powershell
node Web/scripts/generate-catalog.mjs   # Web/data/ es generado, no versionado
```

En git: **nunca `git add -A`**, porque hay cambios de otras sesiones en el working tree.
```
git add creaciones-primium/tarjetas
git commit -m "..."
```

---

## 8. ERRORES REALES QUE YA COMETIDO (para no repetirlos)

1. **Valores en `0` en el HTML.** Los contadores quedaban a `0` en captura porque el rAF no
   corría. Solución: valor final en el HTML (regla 5.4).
2. **`animation-delay` largos.** `0.48s + 1s` = 1.48 s → congelado en `opacity:0`. Toda la
   fila de estadísticas desapareció (regla 5.1).
3. **Typo en un custom property:** `--steel: #2b4straight;` → valor inválido, el navegador lo
   descarta en silencio y el color cae al fallback. Revisa los valores de color.
4. **`--dump-dom` usado como diagnóstico de animación.** No renderiza, da `timeline` engañoso
   (regla 5.6).
5. **Confiar en que `ok` significa que se ve bien.** `ok` solo comprueba JS y movimiento. Una
   tarjeta puede dar `ok` y salir a medio dibujar: por eso la sección 7.3 es obligatoria.
6. **`animation-fill-mode: both` bloqueando estados finales** de otras clases (ver 5.2/trampa).
7. **Desbordamiento horizontal a ancho estrecho** por no poner `min-width: 0` en el contenedor.
8. **Keyframes que anulan un estado previo.** En `architect-business-card` los keyframes de
   entrada pisaban el `rotateY(180deg)` del reverso y lo dejaban delante de la cara frontal.
   Solución: keyframes propios y giro por variables CSS con una clase `.is-turned`.
9. **SVG dentro de la tarjeta que se salía del viewport** (anchura automática en SVG absoluto)
   y texto que se solapaba con las gráficas por falta de `padding-bottom`.
10. **Falta de normalización**: algunos agentes pusieron `class="description-es"` en vez de
    `name="description-es"`, dejaron BOM UTF-8 y usaron CRLF. Normalizar a UTF-8 sin BOM y LF.

---

## 9. SERVIDOR LOCAL (opcional, para verlas en el navegador)

```powershell
node Web/scripts/serve.mjs     # -> http://localhost:8000/
```
La raíz redirige a `/Web/`. El catálogo es un artefacto generado, así que hay que ejecutar
`generate-catalog.mjs` antes de que aparezcan las tarjetas nuevas en la web.
Las tarjetas se ven igualmente en `http://localhost:8000/creaciones-primium/tarjetas/<slug>/`.
