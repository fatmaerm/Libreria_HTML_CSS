# PENDIENTES — cierre de las 71 tarjetas de `creaciones-primium/tarjetas/`

> **Documento de tareas.** Está pensado para trabajar en casa con otra IA que no ha visto
> esta conversación. Todo lo que necesita está aquí o en el fichero de traspaso.
>
> Fecha: 28 de septiembre de 2026
> Traspaso completo (reglas, hallazgos, errores): `Docs/auditoria/tercera-auditoria-tarjetas.md`
> Spec original: `Docs/Prompt/prompt-para-nuevas-creaciones/tarjetas.md`

---

## 0. ESTADO A LA SALIDA

| | |
|---|---|
| Tarjetas del encargo | 71 |
| **Construidas** | **71 (todas)** |
| Verificadas con `ok` en el banco | 71 (según los lotes; falta re-validar en bloque) |
| `prefers-reduced-motion` | presente en las 71 |
| `description-es` | presente en las 71 |
| Carpetas trackeadas en git | 43 de 71 — **faltan 28 por dar de alta** |
| Auditoría final ejecutada | **NO** |
| Capturas revisadas por mí | 43; las 28 restantes las revisaron los subagentes, **sin validación independiente** |
| Catálogo regenerado | **NO** |
| Commit | **NO** |

**En resumen: lo que queda no es crear tarjetas, es verificarlas, corregir lo que salga mal y cerrar.**

---

## 1. PREPARAR EL ENTORNO (5 segundos, obligatorio)

Node y Git están instalados en modo portátil en `%LOCALAPPDATA%\Programs\`. En terminal
nueva o en VS Code ya funcionan. Si no:

```powershell
$env:PATH = "$env:LOCALAPPDATA\Programs\nodejs;$env:LOCALAPPDATA\Programs\MinGit\cmd;$env:PATH"
node --version    # debe decir v24.19.0
```

El banco de pruebas usa Edge en esta ruta fija (si no existe, instálalo):

```
C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
```

---

## 2. TAREA A — AUDITORÍA FINAL SOBRE LAS 71 (lo más importante)

`ok` en el banco **no significa que la tarjeta se vea bien**. Se ha comprobado que tarjetas
daban `ok` estando sin estilos o con partes invisibles. Hay que pasar las cinco baterías.

### 2.1 Sintaxis de todos los `script.js`

```powershell
Get-ChildItem creaciones-primium\tarjetas -Directory | ForEach-Object {
  $f = Join-Path $_.FullName 'script.js'
  if (Test-Path $f) { node --check $f 2>&1 | ForEach-Object { "$($_.Exception.Message) $f" } }
}
```

Sin salida = todo correcto.

### 2.2 Banco de pruebas en los 71, de una vez

PowerShell pasa listas como un solo argumento: **hay que usar splatting**, si no da `ENOENT`.

```powershell
$slugs = (Get-ChildItem creaciones-primium\tarjetas -Directory).Name
$rel = @('Docs/Prompt/prompt-para-nuevas-creaciones/banco-de-pruebas.mjs','tarjetas') + $slugs
& node $rel
```

**Debe decir `ok` en las 71.** Códigos de fallo y qué significan:

| Código | Causa probable |
|---|---|
| `ERROR-JS` | Excepción en el `script.js` |
| `SIN-MOVIMIENTO` | Falta movimiento continuo: un `transform` en bucle o un escalonado |
| `SIN-REPORTE` | La página no llegó a producir la sonda (JS que no corre) |
| *implícito* — la tarjeta se ve a partes o en blanco | Violaste las reglas 5.1/5.2/5.3 de la auditoría. Es el fallo más común |

### 2.3 Recursos externos, comentarios y archivos extra

Nada de CDN, `<img>`, webfonts, `url()` a fichero externo, `fetch`, módulos ES, emojis,
lorem ipsum, ni comentarios (`//` ni `/* */`) en el código.

```powershell
Get-ChildItem creaciones-primium\tarjetas -Directory | ForEach-Object {
  $d = $_
  $js = Join-Path $d.FullName 'script.js'
  if ((Test-Path $js) -and (Get-Content $js -Raw) -match '//|/\*') { "COMENTARIO JS : $($d.Name)" }
  $extra = Get-ChildItem $d.FullName -File | Where-Object { $_.Name -notin 'index.html','styles.css','script.js' }
  $extra | ForEach-Object { "ARCHIVO EXTRA [$($_.Name)] : $($d.Name)" }
}
```

Para recursos externos, revisar con `Select-String` sobre los 71 HTML buscando `http`,
`<img`, `@import`, `fonts.googleapis`, `fetch(`, `import `.

### 2.4 Estructura HTML: exactamente una `description` y una `description-es`

```powershell
Get-ChildItem creaciones-primium\tarjetas -Directory | ForEach-Object {
  $h = Get-Content (Join-Path $_.FullName 'index.html') -Raw
  $de = ([regex]::Matches($h, 'name="description"')).Count
  $dd = ([regex]::Matches($h, 'name="description-es"')).Count
  $iE = $h.IndexOf('name="description"')
  $iEs = $h.IndexOf('name="description-es"')
  if ($de -ne 1 -or $dd -ne 1) { "CONTEO desc=$de desc-es=$dd : $($d.Name)$($dd -ne 1 -and ' FALTA-ES')" }
  elseif ($iEs -lt $iE) { "description-es NO va justo debajo : $($_.Name)" }
}
```

Ojo con defectos ya vistos: `class="description-es"` en vez de `name=`, entidades HTML en
vez de acentos reales, comillas dobles dentro del atributo, y BOM UTF-8.

### 2.5 Llaves CSS balanceadas, `prefers-reduced-motion`, referencias locales

```powershell
Get-ChildItem creaciones-primium\tarjetas -Directory | ForEach-Object {
  $n = $_.Name
  $c = Get-Content (Join-Path $_.FullName 'styles.css') -Raw
  if ($c -notmatch 'prefers-reduced-motion') { "SIN REDUCED-MOTION : $n" }
  $open = ([regex]::Matches($c, '\{')).Count
  $close = ([regex]::Matches($c, '\}')).Count
  if ($open -ne $close) { "LLAVES $open/$close : $n" }

  $idx = Join-Path $_.FullName 'index.html'
  $h = Get-Content $idx -Raw
  [regex]::Matches($h, '(?:href|src)="([^"]+)"') | ForEach-Object { $_.Groups[1].Value } |
    Where-Object { $_ -notmatch '^(https?:|data:|#)' } |
    ForEach-Object { if (-not (Test-Path (Join-Path $_.FullName $_))) { "ROTO [$($_)] : $n" } }
  if ($h -notmatch 'src="script\.js"' -and (Test-Path (Join-Path $_.FullName 'script.js'))) { "script.js SIN REFERENCIAR : $n" }
}
```

También: sin scroll horizontal a 380 px (`min-width: 0` en contenedores flex/grid) y que la
tarjeta no se corte en alto a 780 px.

---

## 3. TAREA B — REVISAR LAS CAPTURAS DE LAS 28 NUEVAS

Es obligatorio. Las capturas están en:

```
%TEMP%\opencode\banco\shots\<slug>-2500.png
%TEMP%\opencode\banco\shots\<slug>-7000.png
```

Los 28 slugs que **nadie ha revisado de forma independiente** (los crearon subagentes y
dicen haberlos mirado, pero está sin confirmar):

```
sourdough-starter-log     utility-invoice-breakdown   crystal-swatch-mosaic      street-net-access-card
vinyl-side-b-player       pipeline-notify-timeline     glow-tube-token-card      kraft-paper-voucher
single-column-feature     fitness-bento-panels         hologram-id-reverse       treasure-map-hunt-card
ethereum-gas-gauge        crew-member-dossier          ceramic-mug-detail        cloud-storage-plans
column-op-ed-note         street-food-review-post      home-energy-meter         monsoon-rain-radar
tavern-quest-board        thai-curry-recipe-scaler     busker-tip-song-card      desert-rally-waypoints
airline-baggage-tag       festival-wristband-pass      field-notes-pocket-book   campaign-approval-flow
```

Comprobar en cada par:

- [ ] La tarjeta se ve **completa**: nada invisible, nada a medio dibujar, ningún valor en `0`.
- [ ] Está **bien compuesta**, centrada, con buen contraste.
- [ ] Las dos capturas **difieren** entre sí (si son idénticas, la animación no corre).
- [ ] A 380x700 sin scroll horizontal ni texto cortado.

> **Aviso:** si una sale en blanco o a partes, casi siempre es una de estas tres cosas:
> una entrada con `delay + duration > 0.80s`, un `requestAnimationFrame` en el JS, o un
> `opacity: 0` en el estado base. Corregir y volver a ejecutar el banco.
>
> Nota: a veces el lector de imágenes sirve un fichero equivocado. Si algo no cuadra,
> copiar el PNG a un nombre nuevo (`copia1.png`) antes de mirarlo.

---

## 4. TAREA C — CORREGIR LO QUE SALGA MAL

Reparar dentro de la carpeta de la tarjeta afectada. No tocar nada fuera de esa carpeta.
Patrones ya usados con éxito en esta misma librería:

- **Red de seguridad:** `setTimeout` de ~660–800 ms que añada una clase `.is-settled` con
  `animation-name: none`, dejando el estado base ya terminado. Evita tarjetas en blanco
  cuando el reloj virtual no avanza.
- **Estados en el HTML con su valor final** (`<dd>214</dd>`, no `0`), y el JS anima desde 0.
- **`animation-fill-mode: both`** fija el estado final y bloquea `.is-*`/`:hover`: usar
  `backwards`, `none` o `forwards` según convenga.
- **No mezclar `transition` CSS conmutada por JS**: bajo virtual time el reloj CSS va muchísimo
  más lento que `setTimeout` y el estado no asienta.
- **Normalizar** UTF-8 sin BOM y saltos LF al final. Si se reescribe un fichero con Node,
  verificar después que no se perdió el primer carácter.

---

## 5. TAREA D — ACTUALIZAR LA AUDITORÍA

`Docs/auditoria/tercera-auditoria-tarjetas.md`, sección 1 y sección 6, siguen diciendo
**43 hechas / 28 pendientes**. Ya es antiguo: hay 71 hechas. Actualizar:

- Tabla de estado de la sección 1 → 71 construidas, pendientes 0.
- Marcar la sección 6 (los 28) como **construidos**, con su fecha.
- Añadir el resultado de la auditoría final (Tarea A) y de la revisión de capturas (Tarea B),
  incluyendo cualquier defecto encontrado y corregido, para no repetirlo en el futuro.

---

## 6. TAREA E — CATÁLOGO Y COMMIT (SOLO SI EL USUARIO LO PIDE)

No ejecutar nada de esta sección sin permiso explícito.

### 6.1 Catálogo

```powershell
node Web/scripts/generate-catalog.mjs
```

`Web/data/` es generado y **no se versiona**. Hay que regenerarlo para que las tarjetas
nuevas aparezcan en el servidor local.

### 6.2 Commit

**Nunca `git add -A`**: hay cambios de otras sesiones en el working tree.

```powershell
git add creaciones-primium/tarjetas
git status --porcelain creaciones-primium/tarjetas
git commit -m "feat(tarjetas): ..."
git push
```

Estado actual de git: **43 carpetas ya trackeadas, 28 sin dar de alta** (`??`):

```
airline-baggage-tag      busker-tip-song-card     campaign-approval-flow   ceramic-mug-detail
cloud-storage-plans      column-op-ed-note        crew-member-dossier      crystal-swatch-mosaic
desert-rally-waypoints   ethereum-gas-gauge       festival-wristband-pass  field-notes-pocket-book
fitness-bento-panels     glow-tube-token-card     hologram-id-reverse      home-energy-meter
kraft-paper-voucher      monsoon-rain-radar       pipeline-notify-timeline single-column-feature
sourdough-starter-log    street-food-review-post  street-net-access-card   tavern-quest-board
thai-curry-recipe-scaler treasure-map-hunt-card   utility-invoice-breakdown vinyl-side-b-player
```

Si el repositorio remoto pedirá usuario/contraseña, avisar antes de hacer `push`.

---

## 7. SERVIDOR LOCAL (opcional, para verlas en el navegador)

```powershell
node Web/scripts/serve.mjs      # -> http://localhost:8000/
```

La raíz redirige a `/Web/`. Las tarjetas se ven directamente en
`http://localhost:8000/creaciones-primium/tarjetas/<slug>/`, aunque para que salgan en el
catálogo de la portada hay que regenerarlo (Tarea E).

---

## ORDEN RECOMENDADO

1. Preparar el PATH (sección 1).
2. Tarea A — auditoría en bloque, 2.1 → 2.5.
3. Tarea B — mirar las 48 capturas de las 28 tarjetas.
4. Tarea C — corregir y revalidar todo lo que falle.
5. Tarea D — actualizar la auditoría.
6. Tarea E — catálogo y commit, **solo con luz verde**.
