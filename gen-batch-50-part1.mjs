import fs from "node:fs";
import path from "node:path";

const targetBase = path.join(process.cwd(), "CreacionesNuevas");

const components = [
  // 1. supernova-remnant-nebula (Pure CSS)
  {
    dir: "supernova-remnant-nebula",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Supernova Remnant Nebula</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="nebula-scene" aria-label="Remanente de supernova con nebulosa brillante">
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="cloud cloud-3"></div>
    <div class="pulsar-star"></div>
    <div class="nebula-title">NEBULOSA SUPERNOVA // VELA-X</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #020206; font-family: ui-monospace, monospace; overflow: hidden; color: #fff; }
.nebula-scene { position: relative; width: 320px; height: 320px; display: grid; place-items: center; }
.cloud { position: absolute; border-radius: 50%; filter: blur(35px); opacity: 0.65; mix-blend-mode: screen; }
.cloud-1 { width: 220px; height: 220px; background: radial-gradient(circle, #ec4899, #8b5cf6, transparent 70%); animation: cloud-drift-1 8s infinite alternate ease-in-out; }
.cloud-2 { width: 200px; height: 180px; background: radial-gradient(circle, #38bdf8, #06b6d4, transparent 70%); animation: cloud-drift-2 7s infinite alternate ease-in-out; }
.cloud-3 { width: 170px; height: 190px; background: radial-gradient(circle, #facc15, #f97316, transparent 70%); animation: cloud-drift-3 9s infinite alternate ease-in-out; }
.pulsar-star { position: absolute; width: 16px; height: 16px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 25px 8px #ffffff, 0 0 60px 20px #38bdf8; z-index: 10; animation: pulsar-flash 1.2s infinite ease-in-out; }
.nebula-title { position: absolute; bottom: -40px; font-size: 0.75rem; letter-spacing: 0.2em; color: #c084fc; border: 1px solid rgba(192, 132, 252, 0.3); padding: 0.4rem 1.2rem; border-radius: 9999px; }
@keyframes cloud-drift-1 { 0% { transform: scale(1) translate(0, 0); } 100% { transform: scale(1.15) translate(-15px, 15px); } }
@keyframes cloud-drift-2 { 0% { transform: scale(1) translate(0, 0); } 100% { transform: scale(1.2) translate(20px, -10px); } }
@keyframes cloud-drift-3 { 0% { transform: scale(1) translate(0, 0); } 100% { transform: scale(0.9) translate(-10px, -20px); } }
@keyframes pulsar-flash { 0%, 100% { transform: scale(0.9); opacity: 0.8; } 50% { transform: scale(1.3); opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .cloud, .pulsar-star { animation: none; } }`
    }
  },

  // 2. holographic-wrist-watch (Pure CSS)
  {
    dir: "holographic-wrist-watch",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Holographic Wrist Watch</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="watch-casing">
    <div class="holo-ring-outer"></div>
    <div class="holo-ring-mid"></div>
    <div class="watch-face">
      <div class="time-readout">10:42<span class="sec">38</span></div>
      <div class="vital-stats">
        <span class="stat">PULSO: 72</span>
        <span class="stat">BAT: 94%</span>
      </div>
    </div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #060810; font-family: ui-monospace, monospace; color: #fff; }
.watch-casing { position: relative; width: 230px; height: 230px; border-radius: 50%; background: #0f1322; border: 4px solid #1e263d; display: grid; place-items: center; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
.holo-ring-outer { position: absolute; inset: 12px; border-radius: 50%; border: 2px dashed rgba(56, 189, 248, 0.5); animation: spin-ring 12s linear infinite; }
.holo-ring-mid { position: absolute; inset: 24px; border-radius: 50%; border: 2px solid transparent; border-top-color: #ec4899; border-bottom-color: #ec4899; animation: spin-rev 8s linear infinite; }
.watch-face { text-align: center; z-index: 5; }
.time-readout { font-size: 2.2rem; font-weight: 900; color: #38bdf8; text-shadow: 0 0 15px rgba(56, 189, 248, 0.6); }
.sec { font-size: 1rem; color: #f43f5e; margin-left: 4px; }
.vital-stats { display: flex; gap: 0.75rem; justify-content: center; margin-top: 0.5rem; font-size: 0.65rem; color: #94a3b8; }
@keyframes spin-ring { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes spin-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
@media (prefers-reduced-motion: reduce) { .holo-ring-outer, .holo-ring-mid { animation: none; } }`
    }
  },

  // 3. cyberpunk-glitch-barcode (Pure CSS)
  {
    dir: "cyberpunk-glitch-barcode",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cyberpunk Glitch Barcode</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="barcode-card">
    <div class="code-header">ID SINTÉTICO // GEN-5</div>
    <div class="barcode-strip">
      <div class="scan-laser"></div>
      <div class="bars">
        <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
    </div>
    <div class="code-footer">0948-CYBER-8842</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #07080e; font-family: ui-monospace, monospace; color: #fff; }
.barcode-card { width: min(92vw, 360px); background: #121422; border-radius: 14px; border: 1px solid #232a42; padding: 1.5rem; box-shadow: 0 20px 45px rgba(0,0,0,0.7); display: flex; flex-direction: column; gap: 1rem; align-items: center; }
.code-header { font-size: 0.75rem; color: #38bdf8; font-weight: 800; }
.barcode-strip { position: relative; width: 100%; height: 90px; background: #fdfbf7; border-radius: 6px; padding: 10px; overflow: hidden; display: flex; align-items: center; }
.bars { display: flex; justify-content: space-between; width: 100%; height: 100%; }
.bars span { background: #0f172a; height: 100%; width: 3px; }
.bars span:nth-child(2n) { width: 6px; }
.bars span:nth-child(3n) { width: 2px; }
.bars span:nth-child(5n) { width: 8px; }
.scan-laser { position: absolute; left: 0; right: 0; height: 3px; background: #f43f5e; box-shadow: 0 0 10px #f43f5e; animation: scan-bar 2s ease-in-out infinite alternate; }
.code-footer { font-size: 0.85rem; font-weight: 800; color: #94a3b8; letter-spacing: 0.2em; }
@keyframes scan-bar { 0% { top: 10px; } 100% { top: 78px; } }
@media (prefers-reduced-motion: reduce) { .scan-laser { animation: none; } }`
    }
  },

  // 4. gravitational-wormhole-vortex (Pure CSS)
  {
    dir: "gravitational-wormhole-vortex",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gravitational Wormhole Vortex</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="wormhole-scene" aria-label="Túnel vórtice de puente de Einstein-Rosen">
    <div class="vortex-ring vr-1"></div>
    <div class="vortex-ring vr-2"></div>
    <div class="vortex-ring vr-3"></div>
    <div class="vortex-core"></div>
    <div class="vortex-tag">PUENTE EINSTEIN-ROSEN</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #030107; font-family: ui-monospace, monospace; overflow: hidden; color: #fff; }
.wormhole-scene { position: relative; width: 260px; height: 260px; display: grid; place-items: center; }
.vortex-ring { position: absolute; border-radius: 50%; border: 2px solid transparent; animation: spin-vortex 4s linear infinite; }
.vr-1 { width: 240px; height: 240px; border-top-color: #8b5cf6; border-right-color: #ec4899; box-shadow: 0 0 30px rgba(139, 92, 246, 0.4); }
.vr-2 { width: 170px; height: 170px; border-bottom-color: #38bdf8; border-left-color: #06b6d4; animation-duration: 3s; animation-direction: reverse; }
.vr-3 { width: 100px; height: 100px; border-top-color: #facc15; border-bottom-color: #f43f5e; animation-duration: 2s; }
.vortex-core { width: 40px; height: 40px; border-radius: 50%; background: #000; box-shadow: 0 0 25px #a855f7; }
.vortex-tag { position: absolute; bottom: -45px; font-size: 0.75rem; letter-spacing: 0.2em; color: #a78bfa; border: 1px solid rgba(167, 139, 250, 0.3); padding: 0.4rem 1.2rem; border-radius: 9999px; }
@keyframes spin-vortex { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .vortex-ring { animation: none; } }`
    }
  },

  // 5. cryo-stasis-chamber-pod (Pure CSS)
  {
    dir: "cryo-stasis-chamber-pod",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cryo Stasis Chamber Pod</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="pod-scene">
    <div class="cryo-pod">
      <div class="frost-glass">
        <div class="silhouette"></div>
        <div class="vapor"></div>
      </div>
      <div class="pod-cap top-cap"></div>
      <div class="pod-cap btm-cap">
        <span class="status-indicator">HIBERNACIÓN: ACTIVA</span>
      </div>
    </div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #040810; font-family: ui-monospace, monospace; color: #fff; }
.pod-scene { display: flex; flex-direction: column; align-items: center; }
.cryo-pod { position: relative; width: 140px; height: 260px; display: flex; flex-direction: column; align-items: center; filter: drop-shadow(0 0 35px rgba(56, 189, 248, 0.35)); }
.pod-cap { width: 100%; height: 28px; background: linear-gradient(180deg, #334155, #1e293b); border: 2px solid #475569; }
.top-cap { border-radius: 16px 16px 4px 4px; }
.btm-cap { border-radius: 4px 4px 16px 16px; height: 42px; display: grid; place-items: center; }
.status-indicator { font-size: 0.6rem; color: #38bdf8; font-weight: 800; letter-spacing: 0.05em; }
.frost-glass { position: relative; width: 120px; height: 190px; background: rgba(56, 189, 248, 0.12); border-left: 2px solid rgba(255, 255, 255, 0.3); border-right: 2px solid rgba(255, 255, 255, 0.15); overflow: hidden; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); display: grid; place-items: center; }
.silhouette { width: 45px; height: 130px; border-radius: 20px; background: rgba(15, 23, 42, 0.7); filter: blur(3px); }
.vapor { position: absolute; inset: 0; background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%); animation: pulse-vapor 3s infinite alternate ease-in-out; }
@keyframes pulse-vapor { 0% { opacity: 0.3; } 100% { opacity: 0.8; } }
@media (prefers-reduced-motion: reduce) { .vapor { animation: none; } }`
    }
  },

  // 6. plasma-orb-touch-lightning (HTML + CSS + JS)
  {
    dir: "plasma-orb-touch-lightning",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plasma Orb Touch Lightning</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="orb-container">
    <div class="glass-globe">
      <canvas id="plasmaCanvas" width="220" height="220"></canvas>
    </div>
    <div class="orb-base">BOLA DE PLASMA // TOCA LA ESFERA</div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #050308; font-family: ui-monospace, monospace; color: #fff; }
.orb-container { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.glass-globe { width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.1), transparent 60%); border: 3px solid rgba(236, 72, 153, 0.4); box-shadow: 0 0 50px rgba(236, 72, 153, 0.35); overflow: hidden; cursor: crosshair; }
#plasmaCanvas { width: 100%; height: 100%; display: block; }
.orb-base { font-size: 0.75rem; letter-spacing: 0.15em; color: #f472b6; border: 1px solid rgba(244, 114, 182, 0.3); padding: 0.4rem 1.2rem; border-radius: 9999px; }`,
      "script.js": `const canvas = document.getElementById("plasmaCanvas");
const ctx = canvas.getContext("2d");
let touch = { x: 110, y: 40 };
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  touch.x = e.clientX - rect.left;
  touch.y = e.clientY - rect.top;
});
function draw() {
  ctx.fillStyle = "rgba(5, 3, 8, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  const segments = 8;
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const px = cx + (touch.x - cx) * t + (Math.random() - 0.5) * 20;
    const py = cy + (touch.y - cy) * t + (Math.random() - 0.5) * 20;
    ctx.lineTo(px, py);
  }
  ctx.strokeStyle = "#ec4899";
  ctx.lineWidth = 2.5;
  ctx.shadowColor = "#f472b6";
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.shadowBlur = 0;
  // Core
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fillStyle = "#a855f7";
  ctx.fill();
  requestAnimationFrame(draw);
}
draw();`
    }
  },

  // 7. mech-robot-hud-targeting (Pure CSS)
  {
    dir: "mech-robot-hud-targeting",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mech Robot HUD Targeting</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="hud-frame" aria-label="HUD militar de robot mech">
    <div class="reticle-box">
      <div class="bracket top-left"></div>
      <div class="bracket top-right"></div>
      <div class="bracket btm-left"></div>
      <div class="bracket btm-right"></div>
      <div class="target-cross"></div>
    </div>
    <div class="hud-stats">
      <span>DIST: 840m</span>
      <span class="locked">OBJETIVO FIJADO</span>
      <span>CALIBRE: 40mm</span>
    </div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #030806; font-family: ui-monospace, monospace; color: #22c55e; }
.hud-frame { width: min(92vw, 380px); display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.reticle-box { position: relative; width: 180px; height: 180px; display: grid; place-items: center; }
.bracket { position: absolute; width: 24px; height: 24px; border-color: #22c55e; border-style: solid; }
.top-left { top: 0; left: 0; border-width: 3px 0 0 3px; }
.top-right { top: 0; right: 0; border-width: 3px 3px 0 0; }
.btm-left { bottom: 0; left: 0; border-width: 0 0 3px 3px; }
.btm-right { bottom: 0; right: 0; border-width: 0 3px 3px 0; }
.target-cross { width: 12px; height: 12px; border-radius: 50%; border: 2px solid #22c55e; animation: pulse-lock 1.5s infinite; }
.hud-stats { display: flex; justify-content: space-between; width: 100%; font-size: 0.75rem; font-weight: 800; border-top: 1px dashed rgba(34, 197, 94, 0.4); padding-top: 0.75rem; }
.locked { color: #f43f5e; animation: blink-locked 0.8s infinite; }
@keyframes pulse-lock { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.4); } }
@keyframes blink-locked { 50% { opacity: 0.3; } }
@media (prefers-reduced-motion: reduce) { .target-cross, .locked { animation: none; } }`
    }
  },

  // 8. hyperspace-speedometer-gauge (Pure CSS)
  {
    dir: "hyperspace-speedometer-gauge",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hyperspace Speedometer Gauge</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="gauge-card">
    <div class="gauge-arc">
      <div class="speed-needle"></div>
    </div>
    <div class="speed-display">
      <span class="val">WARP 8.6</span>
      <span class="unit">VELOCIDAD LUZ // C</span>
    </div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #070914; font-family: ui-monospace, monospace; color: #fff; }
.gauge-card { width: min(92vw, 340px); background: #111424; border-radius: 20px; border: 1px solid #232840; padding: 2rem; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; box-shadow: 0 20px 45px rgba(0,0,0,0.7); }
.gauge-arc { position: relative; width: 180px; height: 95px; border-radius: 95px 95px 0 0; border: 8px solid #1e263d; border-bottom: none; overflow: hidden; display: flex; justify-content: center; align-items: flex-end; }
.gauge-arc::after { content: ''; position: absolute; inset: 0; border-radius: inherit; border: 8px solid transparent; border-top-color: #38bdf8; border-right-color: #ec4899; }
.speed-needle { width: 4px; height: 80px; background: #f43f5e; transform-origin: bottom center; transform: rotate(35deg); box-shadow: 0 0 10px #f43f5e; animation: rev-engine 3s infinite ease-in-out alternate; }
.speed-display { text-align: center; }
.val { font-size: 1.5rem; font-weight: 900; color: #f8fafc; display: block; }
.unit { font-size: 0.7rem; color: #94a3b8; }
@keyframes rev-engine { 0% { transform: rotate(-40deg); } 50% { transform: rotate(20deg); } 100% { transform: rotate(50deg); } }
@media (prefers-reduced-motion: reduce) { .speed-needle { animation: none; } }`
    }
  },

  // 9. alien-glyph-translator (HTML + CSS + JS)
  {
    dir: "alien-glyph-translator",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alien Glyph Translator</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="glyph-card">
    <div class="glyph-row" id="glyphRow">
      <span>⍙</span><span>⍾</span><span>⍡</span><span>⎈</span><span>⎔</span>
    </div>
    <div class="translation" id="transText">"PAZ UNIVERSAL"</div>
    <button class="translate-btn" id="transBtn">Traducir mensaje</button>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #06050b; font-family: ui-monospace, monospace; color: #fff; }
.glyph-card { width: min(92vw, 380px); background: #11101e; border-radius: 18px; border: 1px solid #26223d; padding: 2rem; text-align: center; display: flex; flex-direction: column; gap: 1.5rem; box-shadow: 0 25px 50px rgba(0,0,0,0.8); }
.glyph-row { font-size: 2.2rem; color: #a855f7; display: flex; justify-content: center; gap: 1rem; text-shadow: 0 0 15px #a855f7; }
.translation { font-size: 1.1rem; font-weight: 800; color: #38bdf8; min-height: 1.5rem; }
.translate-btn { padding: 0.65rem 1.4rem; background: #26223d; border: 1px solid #4a3e7a; color: #f1f5f9; border-radius: 8px; font-family: inherit; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
.translate-btn:hover { background: #a855f7; color: #000; }`,
      "script.js": `const btn = document.getElementById("transBtn");
const trans = document.getElementById("transText");
const msgs = ['"PAZ UNIVERSAL"', '"CONTACTO ESTABLECIDO"', '"VIAJEROS DE LAS ESTRELLAS"'];
let idx = 0;
btn.addEventListener("click", () => {
  idx = (idx + 1) % msgs.length;
  trans.innerText = msgs[idx];
});`
    }
  },

  // 10. solar-flare-prominence (Pure CSS)
  {
    dir: "solar-flare-prominence",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solar Flare Prominence</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="sun-arena" aria-label="Bucle de llamarada solar de plasma">
    <div class="sun-orb"></div>
    <div class="prominence-loop loop-1"></div>
    <div class="prominence-loop loop-2"></div>
    <div class="flare-label">PROMINENCIA SOLAR CLASE-X</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #060201; font-family: ui-monospace, monospace; overflow: hidden; color: #fff; }
.sun-arena { position: relative; width: 280px; height: 280px; display: grid; place-items: center; }
.sun-orb { width: 170px; height: 170px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff 0%, #fde047 30%, #ea580c 70%, #7c2d12 100%); box-shadow: 0 0 50px #ea580c; z-index: 2; }
.prominence-loop { position: absolute; border-radius: 50%; border: 3px solid transparent; border-top-color: #f97316; filter: drop-shadow(0 0 10px #f97316); }
.loop-1 { width: 230px; height: 180px; transform: rotate(-35deg); animation: pulse-loop 3s infinite ease-in-out alternate; }
.loop-2 { width: 210px; height: 160px; transform: rotate(45deg); animation: pulse-loop 4s infinite ease-in-out alternate 1s; }
.flare-label { position: absolute; bottom: -40px; font-size: 0.75rem; letter-spacing: 0.15em; color: #fed7aa; }
@keyframes pulse-loop { 0% { transform: scale(0.95) rotate(-35deg); } 100% { transform: scale(1.15) rotate(-30deg); } }
@media (prefers-reduced-motion: reduce) { .prominence-loop { animation: none; } }`
    }
  },

  // 11. aurora-borealis-mountain-sky (Pure CSS)
  {
    dir: "aurora-borealis-mountain-sky",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aurora Borealis Mountain Sky</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="sky-box" aria-label="Cielo ártico con aurora boreal sobre montañas">
    <div class="aurora-curtain"></div>
    <div class="mountains"></div>
    <div class="sky-title">AURORA BOREAL // ÁRTICO</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #02060b; font-family: ui-monospace, monospace; color: #fff; }
.sky-box { position: relative; width: min(92vw, 420px); height: 260px; background: radial-gradient(ellipse at bottom, #06202a 0%, #010810 100%); border-radius: 20px; overflow: hidden; border: 1px solid #1a2a38; box-shadow: 0 25px 60px rgba(0,0,0,0.8); }
.aurora-curtain { position: absolute; top: 0; left: -20%; right: -20%; height: 170px; background: linear-gradient(135deg, rgba(34, 197, 94, 0.45), rgba(6, 182, 212, 0.4), transparent 70%); filter: blur(20px); animation: wave-aurora 6s infinite alternate ease-in-out; }
.mountains { position: absolute; bottom: 0; left: 0; right: 0; height: 80px; background: #050b14; clip-path: polygon(0 100%, 0 50%, 25% 10%, 45% 60%, 70% 20%, 85% 55%, 100% 30%, 100% 100%); }
.sky-title { position: absolute; bottom: 12px; left: 0; right: 0; text-align: center; font-size: 0.75rem; letter-spacing: 0.15em; color: #a7f3d0; z-index: 10; }
@keyframes wave-aurora { 0% { transform: skewX(-8deg) scaleY(0.9); } 100% { transform: skewX(8deg) scaleY(1.15); } }
@media (prefers-reduced-motion: reduce) { .aurora-curtain { animation: none; } }`
    }
  },

  // 12. fluid-wave-radio-tuner (HTML + CSS + JS)
  {
    dir: "fluid-wave-radio-tuner",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fluid Wave Radio Tuner</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="radio-card">
    <div class="wave-screen">
      <canvas id="radioWave" width="340" height="100"></canvas>
    </div>
    <div class="tuner-bar">
      <input type="range" min="88" max="108" step="0.1" value="98.5" id="freqSlider">
      <div class="freq-readout"><span id="freqVal">98.5</span> MHz FM</div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080911; font-family: ui-monospace, monospace; color: #fff; }
.radio-card { width: min(92vw, 380px); background: #121422; border-radius: 18px; border: 1px solid #232840; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; box-shadow: 0 20px 45px rgba(0,0,0,0.7); }
.wave-screen { background: #080a14; border-radius: 10px; border: 1px solid #1c2236; overflow: hidden; }
#radioWave { width: 100%; height: 100px; display: block; }
.tuner-bar { display: flex; flex-direction: column; gap: 0.5rem; }
input[type="range"] { accent-color: #38bdf8; cursor: pointer; }
.freq-readout { text-align: center; font-size: 0.85rem; font-weight: 800; color: #38bdf8; }`,
      "script.js": `const canvas = document.getElementById("radioWave");
const ctx = canvas.getContext("2d");
const slider = document.getElementById("freqSlider");
const val = document.getElementById("freqVal");
let t = 0;
slider.addEventListener("input", (e) => val.innerText = e.target.value);
function draw() {
  ctx.fillStyle = "rgba(8, 10, 20, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  const freq = parseFloat(slider.value) * 0.005;
  for (let x = 0; x < canvas.width; x += 2) {
    const y = 50 + Math.sin(x * freq + t) * 30;
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 2;
  ctx.stroke();
  t += 0.08;
  requestAnimationFrame(draw);
}
draw();`
    }
  },

  // 13. liquid-mercury-droplet (Pure CSS)
  {
    dir: "liquid-mercury-droplet",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Liquid Mercury Droplet</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="mercury-scene" aria-label="Gota de mercurio líquido con reflejos metálicos">
    <div class="mercury-blob">
      <div class="mercury-reflection"></div>
    </div>
    <div class="mercury-caption">MERCURIO LÍQUIDO // TENSIÓN SUPERFICIAL</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #0a0b12; font-family: ui-monospace, monospace; color: #fff; }
.mercury-scene { display: flex; flex-direction: column; align-items: center; gap: 3rem; }
.mercury-blob { width: 140px; height: 140px; border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; background: linear-gradient(135deg, #f8fafc, #94a3b8 50%, #334155 100%); box-shadow: 0 20px 45px rgba(0,0,0,0.8), inset -8px -8px 20px rgba(0,0,0,0.6); position: relative; animation: wobble-mercury 5s infinite ease-in-out; }
.mercury-reflection { position: absolute; top: 20px; left: 25px; width: 35px; height: 20px; border-radius: 50%; background: #ffffff; filter: blur(2px); transform: rotate(-25deg); opacity: 0.9; }
.mercury-caption { font-size: 0.75rem; letter-spacing: 0.15em; color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1); padding: 0.4rem 1.2rem; border-radius: 9999px; }
@keyframes wobble-mercury { 0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%; } 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } }
@media (prefers-reduced-motion: reduce) { .mercury-blob { animation: none; } }`
    }
  },

  // 14. kaleidoscope-mandala-spin (Pure CSS)
  {
    dir: "kaleidoscope-mandala-spin",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kaleidoscope Mandala Spin</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="kaleido-wrap" aria-label="Mandala caleidoscópica giratoria">
    <div class="petal p1"></div><div class="petal p2"></div>
    <div class="petal p3"></div><div class="petal p4"></div>
    <div class="petal p5"></div><div class="petal p6"></div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #05040a; }
.kaleido-wrap { position: relative; width: 220px; height: 220px; animation: spin-kaleido 10s linear infinite; }
.petal { position: absolute; inset: 0; border: 2px solid #ec4899; border-radius: 50% / 20%; background: rgba(168, 85, 247, 0.12); box-shadow: 0 0 15px rgba(236, 72, 153, 0.4); }
.p1 { transform: rotate(0deg); } .p2 { transform: rotate(30deg); } .p3 { transform: rotate(60deg); }
.p4 { transform: rotate(90deg); } .p5 { transform: rotate(120deg); } .p6 { transform: rotate(150deg); }
@keyframes spin-kaleido { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .kaleido-wrap { animation: none; } }`
    }
  },

  // 15. neon-cassette-audio-visualizer (Pure CSS)
  {
    dir: "neon-cassette-audio-visualizer",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neon Cassette Audio Visualizer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="neon-cassette">
    <div class="cassette-label">RETROWAVE 1984</div>
    <div class="wheels">
      <div class="wheel left"></div>
      <div class="wheel right"></div>
    </div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080310; font-family: ui-monospace, monospace; color: #fff; }
.neon-cassette { width: 260px; height: 160px; border-radius: 14px; background: #130a1c; border: 2px solid #ec4899; box-shadow: 0 0 30px rgba(236, 72, 153, 0.4); display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 1.25rem; }
.cassette-label { font-size: 0.8rem; font-weight: 900; color: #facc15; letter-spacing: 0.15em; }
.wheels { display: flex; gap: 3.5rem; }
.wheel { width: 45px; height: 45px; border-radius: 50%; border: 3px dashed #06b6d4; animation: spin-wheel 2s linear infinite; }
@keyframes spin-wheel { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .wheel { animation: none; } }`
    }
  },

  // 16. magma-volcano-crack-surface (Pure CSS)
  {
    dir: "magma-volcano-crack-surface",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Magma Volcano Crack Surface</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="magma-rock" aria-label="Roca volcánica con grietas de magma pulsante">
    <div class="magma-core"></div>
    <div class="magma-title">CORTEZA MAGMÁTICA // 1200°C</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #050201; font-family: ui-monospace, monospace; color: #fff; }
.magma-rock { position: relative; width: 260px; height: 260px; border-radius: 20px; background: #0f0a07; border: 2px solid #331508; overflow: hidden; display: grid; place-items: center; box-shadow: 0 20px 50px rgba(0,0,0,0.9); }
.magma-core { width: 140px; height: 140px; background: radial-gradient(circle, #fde047 0%, #ea580c 60%, transparent 80%); filter: blur(15px); animation: pulse-magma 2.5s infinite alternate ease-in-out; }
.magma-title { position: absolute; bottom: 16px; font-size: 0.7rem; color: #fed7aa; font-weight: 800; letter-spacing: 0.1em; }
@keyframes pulse-magma { 0% { transform: scale(0.85); opacity: 0.7; } 100% { transform: scale(1.2); opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .magma-core { animation: none; } }`
    }
  },

  // 17. bioluminescent-jellyfish-glow (Pure CSS)
  {
    dir: "bioluminescent-jellyfish-glow",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bioluminescent Jellyfish Glow</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="jelly-scene">
    <div class="jellyfish">
      <div class="bell"></div>
      <div class="tentacles">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
    <div class="jelly-tag">MEDUSA ABISAL BIOLUMINISCENTE</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #01050c; font-family: ui-monospace, monospace; color: #fff; }
.jelly-scene { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
.jellyfish { position: relative; width: 100px; display: flex; flex-direction: column; align-items: center; animation: float-jelly 3.5s infinite alternate ease-in-out; }
.bell { width: 90px; height: 60px; border-radius: 50px 50px 10px 10px; background: radial-gradient(circle at 50% 30%, #38bdf8, #0284c7 60%, transparent 90%); box-shadow: 0 0 25px #0284c7; }
.tentacles { display: flex; gap: 14px; margin-top: -6px; }
.tentacles span { width: 3px; height: 90px; background: linear-gradient(180deg, #38bdf8, transparent); border-radius: 2px; }
.jelly-tag { font-size: 0.75rem; letter-spacing: 0.15em; color: #38bdf8; }
@keyframes float-jelly { 0% { transform: translateY(-15px); } 100% { transform: translateY(15px); } }
@media (prefers-reduced-motion: reduce) { .jellyfish { animation: none; } }`
    }
  },

  // 18. fireworks-celebration-burst (HTML + CSS + JS)
  {
    dir: "fireworks-celebration-burst",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fireworks Celebration Burst</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="fireworks-scene">
    <canvas id="fwCanvas"></canvas>
    <div class="fw-hint">HAZ CLIC EN EL CIELO PARA LANZAR FUEGOS ARTIFICIALES</div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #020206; font-family: ui-monospace, monospace; overflow: hidden; color: #fff; }
.fireworks-scene { position: relative; width: 100vw; height: 100vh; display: grid; place-items: center; }
#fwCanvas { position: absolute; inset: 0; width: 100%; height: 100%; cursor: pointer; }
.fw-hint { position: absolute; bottom: 2rem; font-size: 0.75rem; letter-spacing: 0.15em; color: #facc15; padding: 0.4rem 1.2rem; border-radius: 9999px; background: rgba(15,15,25,0.7); border: 1px solid rgba(250,204,21,0.3); pointer-events: none; }`,
      "script.js": `const canvas = document.getElementById("fwCanvas");
const ctx = canvas.getContext("2d");
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener("resize", resize);
let sparks = [];
canvas.addEventListener("click", (e) => {
  const colors = ["#f43f5e", "#38bdf8", "#facc15", "#4ade80", "#c084fc"];
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 5;
    sparks.push({
      x: e.clientX, y: e.clientY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }
});
function draw() {
  ctx.fillStyle = "rgba(2, 2, 6, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  sparks.forEach((s, idx) => {
    s.x += s.vx; s.y += s.vy; s.vy += 0.05; s.alpha -= 0.015;
    ctx.beginPath();
    ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.globalAlpha = Math.max(0, s.alpha);
    ctx.fill();
    ctx.globalAlpha = 1;
    if (s.alpha <= 0) sparks.splice(idx, 1);
  });
  requestAnimationFrame(draw);
}
draw();`
    }
  },

  // 19. ink-drop-water-diffusion (Pure CSS)
  {
    dir: "ink-drop-water-diffusion",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ink Drop Water Diffusion</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="ink-card" aria-label="Difusión de gota de tinta en agua">
    <div class="drop d1"></div>
    <div class="drop d2"></div>
    <div class="ink-title">DIFUSIÓN DE TINTA // AGUA CLARA</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080911; font-family: ui-monospace, monospace; color: #fff; }
.ink-card { position: relative; width: 260px; height: 260px; border-radius: 20px; background: #0f121d; border: 1px solid #232840; overflow: hidden; display: grid; place-items: center; box-shadow: 0 20px 45px rgba(0,0,0,0.7); }
.drop { position: absolute; border-radius: 50%; filter: blur(20px); opacity: 0.75; }
.d1 { width: 140px; height: 140px; background: radial-gradient(circle, #38bdf8 0%, #1e1b4b 70%, transparent 100%); animation: ink-spread 4s infinite alternate ease-in-out; }
.d2 { width: 100px; height: 100px; background: radial-gradient(circle, #a855f7 0%, transparent 70%); animation: ink-spread 3s infinite alternate ease-in-out 1s; }
.ink-title { position: absolute; bottom: 16px; font-size: 0.65rem; color: #94a3b8; letter-spacing: 0.1em; }
@keyframes ink-spread { 0% { transform: scale(0.6); } 100% { transform: scale(1.3); } }
@media (prefers-reduced-motion: reduce) { .drop { animation: none; } }`
    }
  },

  // 20. prismatic-soap-bubble-float (Pure CSS)
  {
    dir: "prismatic-soap-bubble-float",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prismatic Soap Bubble Float</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="bubble-scene">
    <div class="soap-bubble">
      <div class="highlight"></div>
    </div>
    <div class="bubble-tag">BURBUJA PRISMÁTICA</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #06070c; font-family: ui-monospace, monospace; color: #fff; }
.bubble-scene { display: flex; flex-direction: column; align-items: center; gap: 2.5rem; }
.soap-bubble { position: relative; width: 150px; height: 150px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.2), rgba(236,72,153,0.2) 40%, rgba(56,189,248,0.25) 70%, transparent 100%); border: 1.5px solid rgba(255,255,255,0.4); box-shadow: 0 0 25px rgba(56,189,248,0.3); animation: float-bubble 4s infinite alternate ease-in-out; }
.highlight { position: absolute; top: 20px; left: 25px; width: 25px; height: 14px; border-radius: 50%; background: #ffffff; transform: rotate(-30deg); filter: blur(1px); opacity: 0.8; }
.bubble-tag { font-size: 0.75rem; letter-spacing: 0.15em; color: #cbd5e1; }
@keyframes float-bubble { 0% { transform: translateY(-12px) scale(1); } 100% { transform: translateY(12px) scale(1.04); } }
@media (prefers-reduced-motion: reduce) { .soap-bubble { animation: none; } }`
    }
  },

  // 21. mechanical-gear-clockwork-train (Pure CSS)
  {
    dir: "mechanical-gear-clockwork-train",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mechanical Gear Clockwork Train</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="gears-box" aria-label="Engranajes mecánicos sincronizados">
    <div class="gear g-large"></div>
    <div class="gear g-small"></div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #090910; }
.gears-box { position: relative; width: 220px; height: 180px; }
.gear { position: absolute; border-radius: 50%; border: 6px dashed #d97706; background: #1a1510; }
.g-large { width: 120px; height: 120px; top: 10px; left: 10px; animation: spin-gear 6s linear infinite; }
.g-small { width: 80px; height: 80px; bottom: 10px; right: 10px; animation: spin-gear-rev 4s linear infinite; border-color: #f59e0b; }
@keyframes spin-gear { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes spin-gear-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
@media (prefers-reduced-motion: reduce) { .gear { animation: none; } }`
    }
  },

  // 22. steampunk-pressure-manometer (Pure CSS)
  {
    dir: "steampunk-pressure-manometer",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Steampunk Pressure Manometer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="steampunk-gauge">
    <div class="brass-dial">
      <div class="dial-needle"></div>
      <span class="psi-tag">120 PSI</span>
    </div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #0c0805; font-family: 'Times New Roman', serif; }
.steampunk-gauge { width: 180px; height: 180px; border-radius: 50%; background: linear-gradient(145deg, #d97706, #78350f); border: 6px solid #b45309; padding: 12px; box-shadow: 0 20px 45px rgba(0,0,0,0.9); }
.brass-dial { position: relative; width: 100%; height: 100%; border-radius: 50%; background: #fef3c7; border: 2px solid #78350f; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding-bottom: 16px; overflow: hidden; }
.dial-needle { position: absolute; bottom: 50%; width: 3px; height: 60px; background: #991b1b; transform-origin: bottom center; transform: rotate(15deg); animation: jitter-gauge 1.5s infinite ease-in-out alternate; }
.psi-tag { font-size: 0.8rem; font-weight: 900; color: #78350f; }
@keyframes jitter-gauge { 0% { transform: rotate(10deg); } 50% { transform: rotate(25deg); } 100% { transform: rotate(18deg); } }
@media (prefers-reduced-motion: reduce) { .dial-needle { animation: none; } }`
    }
  },

  // 23. magnetic-ball-newton-cradle (Pure CSS)
  {
    dir: "magnetic-ball-newton-cradle",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Magnetic Ball Newton Cradle</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="cradle-frame" aria-label="Péndulo de Newton clásico">
    <div class="string-ball b1"><div class="ball"></div></div>
    <div class="string-ball b2"><div class="ball"></div></div>
    <div class="string-ball b3"><div class="ball"></div></div>
    <div class="string-ball b4"><div class="ball"></div></div>
    <div class="string-ball b5"><div class="ball"></div></div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080911; }
.cradle-frame { display: flex; width: 220px; height: 170px; border-top: 4px solid #475569; justify-content: space-around; }
.string-ball { width: 28px; height: 100%; display: flex; flex-direction: column; align-items: center; transform-origin: top center; }
.string-ball::before { content: ''; width: 1px; height: 120px; background: #64748b; }
.ball { width: 28px; height: 28px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff, #94a3b8 60%, #334155); }
.b1 { animation: swing-left 1.2s infinite ease-in-out; }
.b5 { animation: swing-right 1.2s infinite ease-in-out 0.6s; }
@keyframes swing-left { 0%, 50%, 100% { transform: rotate(0deg); } 25% { transform: rotate(35deg); } }
@keyframes swing-right { 0%, 50%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-35deg); } }
@media (prefers-reduced-motion: reduce) { .b1, .b5 { animation: none; } }`
    }
  },

  // 24. rotary-combination-safe-lock (HTML + CSS + JS)
  {
    dir: "rotary-combination-safe-lock",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rotary Combination Safe Lock</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="safe-door">
    <div class="safe-dial" id="safeDial">
      <div class="marker">▲</div>
      <span class="safe-num">40</span>
    </div>
    <div class="safe-status" id="safeStatus">GIRAR DIAL</div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080a12; font-family: ui-monospace, monospace; color: #fff; }
.safe-door { width: 220px; height: 220px; background: #131726; border-radius: 24px; border: 3px solid #283350; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; box-shadow: 0 20px 45px rgba(0,0,0,0.8); }
.safe-dial { width: 110px; height: 110px; border-radius: 50%; background: #1e263d; border: 4px solid #cbd5e1; display: grid; place-items: center; cursor: pointer; transition: transform 0.25s ease; position: relative; }
.marker { position: absolute; top: -14px; color: #f43f5e; font-size: 0.75rem; }
.safe-num { font-size: 1.2rem; font-weight: 900; color: #fff; }
.safe-status { font-size: 0.75rem; font-weight: 800; color: #38bdf8; }`,
      "script.js": `const dial = document.getElementById("safeDial");
const status = document.getElementById("safeStatus");
let rot = 0;
dial.addEventListener("click", () => {
  rot += 45;
  dial.style.transform = \`rotate(\${rot}deg)\`;
  if (rot % 360 === 180) {
    status.innerText = "¡BÓVEDA ABIERTA!";
    status.style.color = "#22c55e";
  } else {
    status.innerText = "BLOQUEADO";
    status.style.color = "#38bdf8";
  }
});`
    }
  },

  // 25. typewriter-mechanical-key-press (HTML + CSS + JS)
  {
    dir: "typewriter-mechanical-key-press",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Typewriter Mechanical Key Press</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="tw-card">
    <div class="tw-sheet" id="twSheet">PULSA LAS TECLAS...</div>
    <div class="tw-keyboard">
      <button class="tw-key">Q</button><button class="tw-key">W</button><button class="tw-key">E</button>
      <button class="tw-key">R</button><button class="tw-key">T</button><button class="tw-key">Y</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #0c0d14; font-family: 'Courier New', monospace; color: #fff; }
.tw-card { width: min(92vw, 360px); background: #161824; border-radius: 16px; border: 1px solid #282d42; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; box-shadow: 0 20px 45px rgba(0,0,0,0.8); }
.tw-sheet { background: #fdfbf7; color: #1e293b; padding: 1rem; border-radius: 6px; min-height: 70px; font-weight: 800; font-size: 0.95rem; }
.tw-keyboard { display: flex; justify-content: center; gap: 8px; }
.tw-key { width: 40px; height: 40px; border-radius: 50%; background: #262c44; border: 2px solid #4a557e; color: #fff; font-weight: 900; font-size: 1rem; cursor: pointer; transition: transform 0.1s; }
.tw-key:active { transform: scale(0.9) translateY(4px); background: #38bdf8; color: #000; }`,
      "script.js": `const sheet = document.getElementById("twSheet");
document.querySelectorAll(".tw-key").forEach(k => {
  k.addEventListener("click", () => {
    sheet.innerText += k.innerText;
  });
});`
    }
  }
];

for (const comp of components) {
  const compDir = path.join(targetBase, comp.dir);
  if (!fs.existsSync(compDir)) {
    fs.mkdirSync(compDir, { recursive: true });
  }
  for (const [filename, content] of Object.entries(comp.files)) {
    fs.writeFileSync(path.join(compDir, filename), content, "utf8");
  }
}

console.log("50-Part 1 complete: 25 components created.");
