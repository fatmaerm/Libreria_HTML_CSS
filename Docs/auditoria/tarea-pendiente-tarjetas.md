# QUÉ QUEDA POR HACER — tarjetas de `creaciones-primium/tarjetas/`

> Documento para terminar en casa con otra IA. Autocontenido.
> Reglas y hallazgos técnicos: `Docs/auditoria/tercera-auditoria-tarjetas.md`
> Spec original: `Docs/Prompt/prompt-para-nuevas-creaciones/tarjetas.md`
>
> Actualizado: 30 de septiembre de 2026

---

## 1. ESTADO AHORA MISMO

| | |
|---|---|
| Tarjetas de este encargo | 71 de 71 **construidas** |
| `node --check` en todos los `script.js` | **0 fallos** |
| Banco de pruebas en los 71 | **71 `ok`, 0 fallos** |
| `prefers-reduced-motion` | 71 de 71 |
| `meta description` + `meta description-es` (1 cada una, en su sitio) | 71 de 71 |
| Llaves CSS balanceadas | 71 de 71 |
| Recursos externos, emojis, comentarios, archivos extra | ninguno |
| Referencias `href`/`src` locales | ninguna rota (`mailto:` y `tel:` son válidas) |
| Defectos corregidos hoy | 6 `description-es` mal acentuadas (2 con mojibake doble) |
| Capturas revisadas a fondo | **NO** |
| Catálogo regenerado | **NO** |
| Commit / push | Ver §4 |

---

## 2. LO QUE FALTA (en este orden)

### A. Revisar las capturas — lo único que queda de calidad

`ok` en el banco **no garantiza que la tarjeta se vea bien**: se han encontrado tarjetas
con `ok` que estaban sin estilos o con partes invisibles. Hay que mirarlas.

```
%TEMP%\opencode\banco\shots\<slug>-2500.png
%TEMP%\opencode\banco\shots\<slug>-7000.png
```

71 tarjetas × 2 capturas. Prioridad a estas 28, que las crearon subagentes y nadie ha
validado por su cuenta:

```
sourdough-starter-log      utility-invoice-breakdown    crystal-swatch-mosaic     street-net-access-card
vinyl-side-b-player        pipeline-notify-timeline      glow-tube-token-card     kraft-paper-voucher
single-column-feature      fitness-bento-panels          hologram-id-reverse      treasure-map-hunt-card
ethereum-gas-gauge         crew-member-dossier           ceramic-mug-detail       cloud-storage-plans
column-op-ed-note          street-food-review-post       home-energy-meter        monsoon-rain-radar
tavern-quest-board         thai-curry-recipe-scaler      busker-tip-song-card     desert-rally-waypoints
airline-baggage-tag        festival-wristband-pass       field-notes-pocket-book  campaign-approval-flow
```

En cada par comprobar: se ve **completa** (nada invisible ni a `0`), bien compuesta, y que
**las dos capturas difieren** (si son idénticas, la animación no corre).

> Si alguna sale en blanco son solo tres causas: entrada con `delay + duration > 0.80s`,
> un `requestAnimationFrame` en el JS, o `opacity: 0` en el estado base. Corregir y volver
> a pasar el banco. Si el lector de imágenes sirve un PNG equivocado, copiarlo antes a
> otro nombre (`copia1.png`) y mirar ese.

### B. Actualizar `tercera-auditoria-tarjetas.md`

Sigue poniendo **43 hechas / 28 pendientes**. Ya es falso: hay 71.
- Sección 1 → 71 construidas, pendientes 0.
- Sección 6 → los 28 marcados como construidos.
- Añadir los resultados de la auditoría de hoy (todo `ok`) y las 6 correcciones de acentos:
  `freelance-contact-directory` y `sprint-release-kanban` (mojibake `estadÃ­sticas`,
  `tamaÃ±os`, `microgrÃ¡fico`), `architect-business-card` (presentacion), 
  `dark-fantasy-novel-reader` (fantastica, pagina, carmesi, posicion) e
  `iceland-ring-road-trip` (linea).

### C. Las 29 tarjetas que faltan para el total del spec (100)

El spec `tarjetas.md` pide **100 tarjetas** en total. Este encargo cubrió las 71 primeras.
Para llegar a 100 faltan **29 nuevas**, con estas condiciones:

- Una carpeta nueva por tarjeta: `index.html` + `styles.css` (+ `script.js` si hace falta).
- **Los 24 modelos de presentación no se pueden repetir con la vecina** en la rotación.
- Ningún slug de los ya existentes (hay ~550 en el repo).
- Las mismas reglas técnicas de la auditoría: entradas ≤ 0.80 s, **nunca rAF**, estado base
  visible, números en el HTML con su valor final, `prefers-reduced-motion` terminado,
  sin recursos externos, sin comentarios, sin emojis, `description-es` justo debajo de
  `description` con acentos reales, responsive 1200x800 y 380x700 sin scroll horizontal.

**Procedimiento que ha funcionado:** generar el manifiesto (slug, modelo, familia, idea,
efecto) con la rotación de modelos, validar que no hay colisiones, y construir en lotes de 7
con subagentes (máximo 2 en paralelo), verificando cada lote con el banco y las capturas
antes de lanzar el siguiente.

### D. Servidor local para verlas (opcional)

```powershell
node Web/scripts/serve.mjs      # http://localhost:8000/
```
Las tarjetas se ven en `http://localhost:8000/creaciones-primium/tarjetas/<slug>/`; en la
portada hacen falta el catálogo (§3).

---

## 3. COMANDOS QUE HAY QUE USAR

```powershell
# PATH (solo si la terminal es vieja; Node v24.19.0 y Git 2.55.0 en modo portátil)
$env:PATH = "$env:LOCALAPPDATA\Programs\nodejs;$env:LOCALAPPDATA\Programs\MinGit\cmd;$env:PATH"

# sintaxis de todos los JS
Get-ChildItem creaciones-primium\tarjetas -Directory | ForEach-Object {
  $f = Join-Path $_.FullName 'script.js'
  if (Test-Path $f) { node --check $f }
}

# banco de pruebas en los 71 de una vez (splatling, si no da ENOENT)
$slugs = (Get-ChildItem creaciones-primium\tarjetas -Directory).Name
$rel = @('Docs/Prompt/prompt-para-nuevas-creaciones/banco-de-pruebas.mjs','tarjetas') + $slugs
node $rel

# catálogo (Web/data/ es generado, no versionado)
node Web/scripts/generate-catalog.mjs
```

Fallo del banco y su significado: `ERROR-JS` = excepción en el JS · `SIN-MOVIMIENTO` = falta
un `transform` en bucle o un escalonado · `SIN-REPORTE` = la página no produjo la sonda.

---

## 4. GIT

**Nunca `git add -A`**: hay cambios de otras sesiones en el working tree. Solo rutas de
`creaciones-primium/tarjetas/` y de `Docs/`.

```powershell
git add creaciones-primium/tarjetas
git add Docs/auditoria
git status --porcelain
git commit -m "..."
git push
```

Si el remoto pide usuario/contraseña, avisar antes de hacer `push`.
