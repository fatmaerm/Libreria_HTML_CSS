import fs from "node:fs";
import path from "node:path";

const targetBase = path.join(process.cwd(), "CreacionesNuevas");

const components = [
  // 26. slider-liquid-color-mixer (HTML + CSS + JS)
  {
    dir: "slider-liquid-color-mixer",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slider Liquid Color Mixer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="mixer-card">
    <div class="color-flask" id="flaskMix"></div>
    <div class="sliders-row">
      <input type="range" min="0" max="255" value="168" id="rSlider">
      <input type="range" min="0" max="255" value="85" id="gSlider">
      <input type="range" min="0" max="255" value="247" id="bSlider">
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080911; font-family: ui-monospace, monospace; color: #fff; }
.mixer-card { width: min(92vw, 360px); background: #121422; border-radius: 18px; border: 1px solid #232840; padding: 2rem; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; box-shadow: 0 20px 45px rgba(0,0,0,0.7); }
.color-flask { width: 120px; height: 120px; border-radius: 50%; background: rgb(168, 85, 247); box-shadow: 0 0 35px rgba(168, 85, 247, 0.5); transition: background 0.1s ease; }
.sliders-row { width: 100%; display: flex; flex-direction: column; gap: 0.75rem; }
input[type="range"] { accent-color: #38bdf8; cursor: pointer; }`,
      "script.js": `const flask = document.getElementById("flaskMix");
const r = document.getElementById("rSlider");
const g = document.getElementById("gSlider");
const b = document.getElementById("bSlider");
function update() {
  const col = \`rgb(\${r.value}, \${g.value}, \${b.value})\`;
  flask.style.background = col;
  flask.style.boxShadow = \`0 0 35px \${col}\`;
}
r.addEventListener("input", update);
g.addEventListener("input", update);
b.addEventListener("input", update);`
    }
  },

  // 27. 3d-cube-rubiks-twist (Pure CSS)
  {
    dir: "3d-cube-rubiks-twist",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Cube Rubiks Twist</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="rubik-scene">
    <div class="cube-3d">
      <div class="face front"></div><div class="face back"></div>
      <div class="face right"></div><div class="face left"></div>
      <div class="face top"></div><div class="face bottom"></div>
    </div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #07080f; perspective: 800px; }
.rubik-scene { display: grid; place-items: center; }
.cube-3d { position: relative; width: 100px; height: 100px; transform-style: preserve-3d; animation: spin-cube 7s linear infinite; }
.face { position: absolute; width: 100px; height: 100px; border: 3px solid #111; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: #222; padding: 2px; }
.face::before { content: ''; grid-column: span 3; height: 100%; border-radius: 4px; }
.front { transform: translateZ(50px); background: #ef4444; }
.back { transform: rotateY(180deg) translateZ(50px); background: #f97316; }
.right { transform: rotateY(90deg) translateZ(50px); background: #3b82f6; }
.left { transform: rotateY(-90deg) translateZ(50px); background: #22c55e; }
.top { transform: rotateX(90deg) translateZ(50px); background: #ffffff; }
.bottom { transform: rotateX(-90deg) translateZ(50px); background: #facc15; }
@keyframes spin-cube { from { transform: rotateX(-20deg) rotateY(0deg); } to { transform: rotateX(-20deg) rotateY(360deg); } }
@media (prefers-reduced-motion: reduce) { .cube-3d { animation: none; } }`
    }
  },

  // 28. origami-fortune-teller-cootie (Pure CSS)
  {
    dir: "origami-fortune-teller-cootie",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Origami Fortune Teller Cootie</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="teller-box">
    <div class="flap f1">1</div><div class="flap f2">2</div>
    <div class="flap f3">3</div><div class="flap f4">4</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #0a0b14; font-family: ui-monospace, monospace; color: #fff; }
.teller-box { position: relative; width: 160px; height: 160px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; animation: flap-cootie 2.5s infinite alternate ease-in-out; }
.flap { display: grid; place-items: center; font-size: 1.5rem; font-weight: 900; border-radius: 6px; }
.f1 { background: #ec4899; clip-path: polygon(0 0, 100% 0, 0 100%); }
.f2 { background: #38bdf8; clip-path: polygon(0 0, 100% 0, 100% 100%); }
.f3 { background: #facc15; color: #000; clip-path: polygon(0 0, 100% 100%, 0 100%); }
.f4 { background: #4ade80; color: #000; clip-path: polygon(100% 0, 100% 100%, 0 100%); }
@keyframes flap-cootie { 0% { transform: scale(0.9); } 100% { transform: scale(1.1); } }`
    }
  },

  // 29. vintage-film-projector-reel (Pure CSS)
  {
    dir: "vintage-film-projector-reel",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vintage Film Projector Reel</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="projector-scene">
    <div class="film-reel">
      <div class="spoke s1"></div><div class="spoke s2"></div><div class="spoke s3"></div>
    </div>
    <div class="light-beam"></div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #050403; }
.projector-scene { display: flex; align-items: center; }
.film-reel { position: relative; width: 140px; height: 140px; border-radius: 50%; border: 4px solid #78350f; background: #1c140d; animation: spin-reel 1.5s linear infinite; }
.spoke { position: absolute; top: 50%; left: 0; right: 0; height: 3px; background: #b45309; }
.s1 { transform: rotate(0deg); } .s2 { transform: rotate(60deg); } .s3 { transform: rotate(120deg); }
.light-beam { width: 140px; height: 90px; background: linear-gradient(90deg, rgba(254,240,138,0.35), transparent); clip-path: polygon(0 40%, 100% 0, 100% 100%, 0 60%); }
@keyframes spin-reel { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .film-reel { animation: none; } }`
    }
  },

  // 30. sand-zen-garden-rake (HTML + CSS + JS)
  {
    dir: "sand-zen-garden-rake",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sand Zen Garden Rake</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="zen-frame">
    <canvas id="zenCanvas" width="340" height="240"></canvas>
    <div class="zen-caption">JARDÍN ZEN // ARRASTRA EL RASTRILLO</div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #0c0d12; font-family: ui-monospace, monospace; color: #fff; }
.zen-frame { display: flex; flex-direction: column; align-items: center; gap: 1.25rem; }
#zenCanvas { background: #d7ccc8; border-radius: 14px; border: 4px solid #5d4037; box-shadow: 0 20px 45px rgba(0,0,0,0.7); cursor: crosshair; }
.zen-caption { font-size: 0.75rem; letter-spacing: 0.15em; color: #a1887f; }`,
      "script.js": `const canvas = document.getElementById("zenCanvas");
const ctx = canvas.getContext("2d");
let isRaking = false;
function drawSand(x, y) {
  ctx.strokeStyle = "#8d6e63";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.stroke();
}
canvas.addEventListener("mousedown", () => isRaking = true);
window.addEventListener("mouseup", () => isRaking = false);
canvas.addEventListener("mousemove", (e) => {
  if (!isRaking) return;
  const rect = canvas.getBoundingClientRect();
  drawSand(e.clientX - rect.left, e.clientY - rect.top);
});`
    }
  },

  // 31. github-contribution-matrix-heat (HTML + CSS + JS)
  {
    dir: "github-contribution-matrix-heat",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub Contribution Matrix Heat</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="contrib-card">
    <div class="c-head">CONTRIBUCIONES // 1,842 ESTE AÑO</div>
    <div class="contrib-grid" id="cGrid"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080911; font-family: ui-monospace, monospace; color: #fff; }
.contrib-card { width: min(92vw, 440px); background: #111422; border-radius: 16px; border: 1px solid #232840; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; box-shadow: 0 20px 45px rgba(0,0,0,0.7); }
.c-head { font-size: 0.75rem; color: #94a3b8; font-weight: 800; }
.contrib-grid { display: grid; grid-template-columns: repeat(14, 1fr); gap: 5px; }
.c-box { width: 18px; height: 18px; border-radius: 4px; background: #161b2c; transition: transform 0.15s; }
.c-box:hover { transform: scale(1.25); }
.l1 { background: #0e4429; } .l2 { background: #006d32; } .l3 { background: #26a641; } .l4 { background: #39d353; }`,
      "script.js": `const grid = document.getElementById("cGrid");
const levels = ["", "l1", "l2", "l3", "l4"];
for (let i = 0; i < 70; i++) {
  const b = document.createElement("div");
  b.className = "c-box " + levels[Math.floor(Math.random() * levels.length)];
  grid.appendChild(b);
}`
    }
  },

  // 32. live-crypto-ticker-ribbon (Pure CSS)
  {
    dir: "live-crypto-ticker-ribbon",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live Crypto Ticker Ribbon</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="ticker-ribbon">
    <div class="ticker-content">
      <span class="coin">BTC $92,450 <strong class="up">+4.2%</strong></span>
      <span class="coin">ETH $3,810 <strong class="up">+2.8%</strong></span>
      <span class="coin">SOL $214 <strong class="down">-1.1%</strong></span>
      <span class="coin">BTC $92,450 <strong class="up">+4.2%</strong></span>
      <span class="coin">ETH $3,810 <strong class="up">+2.8%</strong></span>
      <span class="coin">SOL $214 <strong class="down">-1.1%</strong></span>
    </div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080a12; font-family: ui-monospace, monospace; color: #fff; }
.ticker-ribbon { width: min(92vw, 420px); overflow: hidden; background: #111422; border-radius: 9999px; border: 1px solid #232840; padding: 0.75rem 0; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
.ticker-content { display: flex; gap: 2rem; width: max-content; animation: scroll-ticker 12s linear infinite; }
.coin { font-size: 0.8rem; font-weight: 700; color: #f8fafc; }
.up { color: #22c55e; } .down { color: #ef4444; }
@keyframes scroll-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .ticker-content { animation: none; } }`
    }
  },

  // 33. floating-glass-action-dock (Pure CSS)
  {
    dir: "floating-glass-action-dock",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Floating Glass Action Dock</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="glass-dock">
    <button class="dock-btn" title="Home">🏠</button>
    <button class="dock-btn" title="Search">🔍</button>
    <button class="dock-btn" title="Bookmarks">📑</button>
    <button class="dock-btn" title="Settings">⚙️</button>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: radial-gradient(circle at 50% 50%, #1e1b4b 0%, #080911 100%); }
.glass-dock { display: flex; gap: 1rem; padding: 0.85rem 1.5rem; background: rgba(255,255,255,0.08); border-radius: 9999px; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 20px 45px rgba(0,0,0,0.6); }
.dock-btn { width: 44px; height: 44px; border-radius: 50%; background: transparent; border: none; font-size: 1.3rem; cursor: pointer; transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.dock-btn:hover { transform: scale(1.3) translateY(-4px); }`
    }
  },

  // 34. status-badge-glow-matrix (Pure CSS)
  {
    dir: "status-badge-glow-matrix",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Status Badge Glow Matrix</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="badge-cluster">
    <span class="m-badge b-active"><span class="dot"></span>ACTIVO</span>
    <span class="m-badge b-idle"><span class="dot"></span>EN ESPERA</span>
    <span class="m-badge b-warn"><span class="dot"></span>AVISO</span>
    <span class="m-badge b-crit"><span class="dot"></span>CRÍTICO</span>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080911; font-family: ui-monospace, monospace; color: #fff; }
.badge-cluster { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
.m-badge { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 800; padding: 0.4rem 0.85rem; border-radius: 9999px; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.b-active { background: rgba(34,197,94,0.15); border: 1px solid #22c55e; color: #4ade80; }
.b-active .dot { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
.b-idle { background: rgba(56,189,248,0.15); border: 1px solid #38bdf8; color: #38bdf8; }
.b-idle .dot { background: #38bdf8; box-shadow: 0 0 8px #38bdf8; }
.b-warn { background: rgba(250,204,21,0.15); border: 1px solid #facc15; color: #facc15; }
.b-warn .dot { background: #facc15; box-shadow: 0 0 8px #facc15; }
.b-crit { background: rgba(244,63,94,0.15); border: 1px solid #f43f5e; color: #f43f5e; }
.b-crit .dot { background: #f43f5e; box-shadow: 0 0 8px #f43f5e; }`
    }
  },

  // 35. interactive-card-fan-deck (HTML + CSS + JS)
  {
    dir: "interactive-card-fan-deck",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Card Fan Deck</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="deck-container">
    <div class="f-card c1">01</div>
    <div class="f-card c2">02</div>
    <div class="f-card c3">03</div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080911; font-family: ui-monospace, monospace; color: #fff; }
.deck-container { position: relative; width: 140px; height: 190px; cursor: pointer; }
.f-card { position: absolute; inset: 0; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); display: grid; place-items: center; font-size: 1.5rem; font-weight: 900; transition: transform 0.3s ease; box-shadow: 0 15px 35px rgba(0,0,0,0.6); }
.c1 { background: #ec4899; transform: rotate(-8deg); z-index: 1; }
.c2 { background: #8b5cf6; transform: rotate(0deg); z-index: 2; }
.c3 { background: #38bdf8; transform: rotate(8deg); z-index: 3; }
.deck-container:hover .c1 { transform: rotate(-25deg) translateX(-40px); }
.deck-container:hover .c2 { transform: translateY(-20px); }
.deck-container:hover .c3 { transform: rotate(25deg) translateX(40px); }`,
      "script.js": `console.log("Card fan deck ready.");`
    }
  },

  // 36. circular-activity-rings-fitness (Pure CSS)
  {
    dir: "circular-activity-rings-fitness",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Circular Activity Rings Fitness</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="rings-card">
    <div class="ring-wrap">
      <svg viewBox="0 0 100 100" class="ring-svg">
        <circle cx="50" cy="50" r="42" class="r-red"></circle>
        <circle cx="50" cy="50" r="32" class="r-green"></circle>
        <circle cx="50" cy="50" r="22" class="r-blue"></circle>
      </svg>
    </div>
    <div class="ring-legend">OBJETIVO DIARIO // 100%</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #000; font-family: ui-monospace, monospace; color: #fff; }
.rings-card { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.ring-wrap { width: 170px; height: 170px; }
.ring-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
circle { fill: none; stroke-linecap: round; }
.r-red { stroke: #fa233b; stroke-width: 7; stroke-dasharray: 264; stroke-dashoffset: 40; }
.r-green { stroke: #a0fe00; stroke-width: 7; stroke-dasharray: 201; stroke-dashoffset: 50; }
.r-blue { stroke: #00e5ff; stroke-width: 7; stroke-dasharray: 138; stroke-dashoffset: 20; }
.ring-legend { font-size: 0.75rem; letter-spacing: 0.15em; color: #a1a1aa; }`
    }
  },

  // 37. liquid-pull-to-refresh-spinner (Pure CSS)
  {
    dir: "liquid-pull-to-refresh-spinner",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Liquid Pull to Refresh Spinner</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="pull-box">
    <div class="liquid-drop"></div>
    <span class="pull-text">ACTUALIZANDO...</span>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #090a12; font-family: ui-monospace, monospace; color: #fff; }
.pull-box { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.liquid-drop { width: 36px; height: 36px; border-radius: 50%; border: 3px solid #38bdf8; border-top-color: transparent; animation: spin-drop 0.8s linear infinite; }
.pull-text { font-size: 0.75rem; color: #94a3b8; letter-spacing: 0.15em; }
@keyframes spin-drop { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .liquid-drop { animation: none; } }`
    }
  },

  // 38. dark-mode-solar-lunar-switch (Pure CSS)
  {
    dir: "dark-mode-solar-lunar-switch",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dark Mode Solar Lunar Switch</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <label class="theme-switch" aria-label="Cambiar tema">
    <input type="checkbox">
    <span class="slider">
      <span class="celestial"></span>
    </span>
  </label>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #070913; }
.theme-switch { position: relative; width: 80px; height: 42px; display: block; cursor: pointer; }
.theme-switch input { display: none; }
.slider { position: absolute; inset: 0; border-radius: 9999px; background: #1e293b; border: 2px solid #334155; transition: background 0.3s; }
.celestial { position: absolute; top: 3px; left: 4px; width: 32px; height: 32px; border-radius: 50%; background: #facc15; box-shadow: 0 0 10px #facc15; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s; }
.theme-switch input:checked + .slider { background: #0f172a; }
.theme-switch input:checked + .slider .celestial { transform: translateX(38px); background: #e2e8f0; box-shadow: 0 0 10px #e2e8f0; }`
    }
  },

  // 39. code-snippet-terminal-badge (Pure CSS)
  {
    dir: "code-snippet-terminal-badge",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Snippet Terminal Badge</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="snippet-badge">
    <span class="shell-sign">$</span>
    <code>bun run build</code>
    <span class="check-pill">✓ 42ms</span>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080911; font-family: ui-monospace, monospace; color: #fff; }
.snippet-badge { display: flex; align-items: center; gap: 0.75rem; padding: 0.65rem 1.25rem; background: #121422; border-radius: 12px; border: 1px solid #232840; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
.shell-sign { color: #f43f5e; font-weight: 900; }
code { color: #38bdf8; font-size: 0.85rem; font-weight: 700; }
.check-pill { font-size: 0.65rem; color: #4ade80; background: rgba(34,197,94,0.15); padding: 0.2rem 0.5rem; border-radius: 9999px; }`
    }
  },

  // 40. glassmorphic-calendar-widget (Pure CSS)
  {
    dir: "glassmorphic-calendar-widget",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Glassmorphic Calendar Widget</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="cal-widget">
    <div class="cal-month">SEPTIEMBRE 2026</div>
    <div class="cal-days">
      <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
      <span class="dim">22</span><span class="dim">23</span><span class="dim">24</span><span class="dim">25</span><span class="today">26</span><span>27</span><span>28</span>
    </div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: radial-gradient(circle at 30% 30%, #4338ca 0%, #070912 60%); font-family: system-ui, sans-serif; color: #fff; }
.cal-widget { width: min(92vw, 320px); background: rgba(255,255,255,0.06); border-radius: 20px; border: 1px solid rgba(255,255,255,0.15); padding: 1.5rem; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 20px 45px rgba(0,0,0,0.6); }
.cal-month { font-size: 0.85rem; font-weight: 800; letter-spacing: 0.1em; color: #a5b4fc; text-align: center; margin-bottom: 1.25rem; }
.cal-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center; font-size: 0.8rem; font-weight: 600; }
.dim { color: #64748b; }
.today { background: #6366f1; border-radius: 6px; box-shadow: 0 0 10px #6366f1; }`
    }
  },

  // 41. thunderstorm-lightning-strike (Pure CSS)
  {
    dir: "thunderstorm-lightning-strike",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thunderstorm Lightning Strike</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="storm-cloud">
    <div class="cloud-puff"></div>
    <div class="bolt-flash"></div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #030408; }
.storm-cloud { position: relative; width: 180px; height: 90px; }
.cloud-puff { width: 100%; height: 100%; border-radius: 50px; background: #1e263d; box-shadow: 0 10px 25px rgba(0,0,0,0.8); }
.bolt-flash { position: absolute; bottom: -60px; left: 50%; transform: translateX(-50%); width: 2px; height: 70px; background: #38bdf8; box-shadow: 0 0 15px #38bdf8; opacity: 0; animation: strike 3s infinite; }
@keyframes strike { 0%, 90%, 100% { opacity: 0; } 92%, 96% { opacity: 1; filter: drop-shadow(0 0 25px #fff); } }
@media (prefers-reduced-motion: reduce) { .bolt-flash { animation: none; } }`
    }
  },

  // 42. autumn-leaf-wind-drift (Pure CSS)
  {
    dir: "autumn-leaf-wind-drift",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Autumn Leaf Wind Drift</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="leaf-box">
    <div class="maple-leaf l1">🍁</div>
    <div class="maple-leaf l2">🍂</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #0c0805; font-size: 2.5rem; overflow: hidden; }
.leaf-box { position: relative; width: 220px; height: 260px; }
.maple-leaf { position: absolute; }
.l1 { animation: fall-leaf 4s infinite linear; }
.l2 { animation: fall-leaf 5s infinite linear 2s; }
@keyframes fall-leaf { 0% { top: -40px; left: 20px; transform: rotate(0deg); } 50% { left: 160px; transform: rotate(180deg); } 100% { top: 280px; left: 40px; transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .maple-leaf { animation: none; } }`
    }
  },

  // 43. deep-abyss-submarine-porthole (Pure CSS)
  {
    dir: "deep-abyss-submarine-porthole",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deep Abyss Submarine Porthole</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="porthole">
    <div class="ocean-depth">
      <div class="creature-shadow"></div>
    </div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #020408; }
.porthole { width: 220px; height: 220px; border-radius: 50%; border: 12px solid #52525b; box-shadow: 0 25px 60px rgba(0,0,0,0.9); overflow: hidden; }
.ocean-depth { width: 100%; height: 100%; background: radial-gradient(circle, #0284c7 0%, #032030 60%, #000 100%); display: grid; place-items: center; }
.creature-shadow { width: 110px; height: 24px; border-radius: 50%; background: rgba(0,0,0,0.5); filter: blur(8px); animation: pass-by 6s infinite ease-in-out; }
@keyframes pass-by { 0% { transform: translateX(-150px) scale(0.6); } 100% { transform: translateX(150px) scale(1.1); } }
@media (prefers-reduced-motion: reduce) { .creature-shadow { animation: none; } }`
    }
  },

  // 44. campfire-embers-floating (Pure CSS)
  {
    dir: "campfire-embers-floating",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Campfire Embers Floating</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="camp-scene">
    <div class="fire-glow"></div>
    <div class="sparks">
      <span></span><span></span><span></span><span></span>
    </div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #050201; }
.camp-scene { position: relative; width: 180px; height: 220px; display: flex; justify-content: center; align-items: flex-end; }
.fire-glow { width: 90px; height: 90px; border-radius: 50%; background: radial-gradient(circle, #f97316, #b91c1c, transparent 70%); filter: blur(14px); }
.sparks span { position: absolute; bottom: 30px; width: 4px; height: 4px; border-radius: 50%; background: #fef08a; box-shadow: 0 0 6px #f97316; animation: float-spark 2.5s infinite; }
.sparks span:nth-child(1) { left: 40%; animation-delay: 0.2s; }
.sparks span:nth-child(2) { left: 55%; animation-delay: 0.8s; }
.sparks span:nth-child(3) { left: 48%; animation-delay: 1.4s; }
.sparks span:nth-child(4) { left: 62%; animation-delay: 1.9s; }
@keyframes float-spark { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-160px); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .sparks span { animation: none; } }`
    }
  },

  // 45. frost-crystal-freeze-window (Pure CSS)
  {
    dir: "frost-crystal-freeze-window",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Frost Crystal Freeze Window</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="frost-card">
    <div class="ice-star">❄</div>
    <span class="frost-temp">-18°C CONGELADO</span>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #030810; font-family: ui-monospace, monospace; color: #fff; }
.frost-card { width: 220px; height: 220px; border-radius: 20px; background: rgba(255,255,255,0.08); border: 2px solid rgba(255,255,255,0.3); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; box-shadow: 0 0 35px rgba(56,189,248,0.25); }
.ice-star { font-size: 3rem; color: #bae6fd; animation: spin-ice 12s linear infinite; }
.frost-temp { font-size: 0.75rem; color: #7dd3fc; font-weight: 800; letter-spacing: 0.1em; }
@keyframes spin-ice { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .ice-star { animation: none; } }`
    }
  },

  // 46. desert-dune-heat-haze (Pure CSS)
  {
    dir: "desert-dune-heat-haze",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desert Dune Heat Haze</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="desert-box">
    <div class="mirage-sun"></div>
    <div class="dune"></div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #080302; }
.desert-box { position: relative; width: min(92vw, 380px); height: 220px; border-radius: 18px; background: linear-gradient(180deg, #fdba74, #ea580c); overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; }
.mirage-sun { position: absolute; top: 30px; left: 50%; transform: translateX(-50%); width: 70px; height: 70px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 30px #ffffff; }
.dune { height: 90px; background: #7c2d12; border-radius: 150px 150px 0 0; }`
    }
  },

  // 47. magnetic-compass-rose (HTML + CSS + JS)
  {
    dir: "magnetic-compass-rose",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Magnetic Compass Rose</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="compass-dial">
    <span class="cardinal n">N</span><span class="cardinal s">S</span>
    <span class="cardinal e">E</span><span class="cardinal w">O</span>
    <div class="magnetic-needle" id="compassNeedle"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #060810; font-family: ui-monospace, monospace; color: #fff; }
.compass-dial { position: relative; width: 220px; height: 220px; border-radius: 50%; background: #131728; border: 4px solid #b45309; display: grid; place-items: center; box-shadow: 0 20px 45px rgba(0,0,0,0.8); }
.cardinal { position: absolute; font-weight: 900; color: #cbd5e1; }
.n { top: 12px; color: #ef4444; } .s { bottom: 12px; } .e { right: 14px; } .w { left: 14px; }
.magnetic-needle { width: 6px; height: 140px; background: linear-gradient(180deg, #ef4444 50%, #e2e8f0 50%); border-radius: 3px; transform: rotate(20deg); transition: transform 0.2s ease-out; }`,
      "script.js": `const needle = document.getElementById("compassNeedle");
window.addEventListener("mousemove", (e) => {
  const rect = needle.getBoundingClientRect();
  const angle = Math.atan2(e.clientY - (rect.top + rect.height/2), e.clientX - (rect.left + rect.width/2)) * (180 / Math.PI) + 90;
  needle.style.transform = \`rotate(\${angle}deg)\`;
});`
    }
  },

  // 48. crystal-geode-sparkle-cave (Pure CSS)
  {
    dir: "crystal-geode-sparkle-cave",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Crystal Geode Sparkle Cave</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="geode-shard">
    <div class="facet-sparkle"></div>
    <span class="geode-title">GEODA DE AMATISTA</span>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #05020a; font-family: ui-monospace, monospace; color: #fff; }
.geode-shard { position: relative; width: 170px; height: 210px; border-radius: 12px; background: linear-gradient(135deg, #a855f7, #581c87); clip-path: polygon(50% 0%, 100% 35%, 85% 100%, 15% 100%, 0% 35%); display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding-bottom: 24px; box-shadow: 0 0 35px rgba(168,85,247,0.4); }
.facet-sparkle { position: absolute; inset: 0; background: radial-gradient(circle at 60% 40%, rgba(255,255,255,0.8), transparent 40%); animation: sparkle-geode 2s infinite alternate; }
.geode-title { font-size: 0.65rem; font-weight: 800; color: #f5d0fe; z-index: 5; }
@keyframes sparkle-geode { 0% { opacity: 0.3; } 100% { opacity: 1; } }`
    }
  },

  // 49. rainy-window-glass-droplets (Pure CSS)
  {
    dir: "rainy-window-glass-droplets",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rainy Window Glass Droplets</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="window-pane">
    <div class="rain-drop d1"></div>
    <div class="rain-drop d2"></div>
    <div class="rain-drop d3"></div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #030408; }
.window-pane { position: relative; width: min(92vw, 360px); height: 240px; border-radius: 18px; background: rgba(56,189,248,0.06); border: 1px solid rgba(255,255,255,0.15); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); overflow: hidden; box-shadow: 0 20px 45px rgba(0,0,0,0.7); }
.rain-drop { position: absolute; width: 4px; height: 16px; border-radius: 9999px; background: rgba(255,255,255,0.7); }
.d1 { left: 30%; animation: slide-rain 3s infinite linear; }
.d2 { left: 65%; animation: slide-rain 4s infinite linear 1.2s; }
.d3 { left: 45%; animation: slide-rain 2.5s infinite linear 0.6s; }
@keyframes slide-rain { 0% { top: -20px; } 100% { top: 260px; } }
@media (prefers-reduced-motion: reduce) { .rain-drop { animation: none; } }`
    }
  },

  // 50. lunar-phases-cycle-disc (Pure CSS)
  {
    dir: "lunar-phases-cycle-disc",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lunar Phases Cycle Disc</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="lunar-scene">
    <div class="moon-cycle">
      <div class="moon-shadow"></div>
    </div>
    <div class="lunar-tag">CICLO DE FASES LUNARES // 29.5 DÍAS</div>
  </div>
</body>
</html>`,
      "styles.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; display: grid; place-items: center; background: #030408; font-family: ui-monospace, monospace; color: #fff; }
.lunar-scene { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
.moon-cycle { position: relative; width: 140px; height: 140px; border-radius: 50%; background: #fdfbf7; box-shadow: 0 0 25px rgba(253,251,247,0.4); overflow: hidden; }
.moon-shadow { position: absolute; inset: 0; border-radius: 50%; background: #090b14; animation: lunar-orbit 8s infinite alternate ease-in-out; }
.lunar-tag { font-size: 0.75rem; letter-spacing: 0.15em; color: #cbd5e1; }
@keyframes lunar-orbit { 0% { transform: translateX(-100%); } 50% { transform: translateX(0%); } 100% { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce) { .moon-shadow { animation: none; } }`
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

console.log("50-Part 2 complete: 25 components created.");
