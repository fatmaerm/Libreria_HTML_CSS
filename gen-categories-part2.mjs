import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "CreacionesNuevas");

async function write(folder, files) {
  const dir = path.join(OUT, folder);
  await mkdir(dir, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    await writeFile(path.join(dir, name), content, "utf8");
  }
}

const components = [

  /* ─────────────────────────────────────────
     CONTROLS (10)
  ───────────────────────────────────────── */
  {
    folder: "neon-toggle-switch",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Neon Toggle Switch</title>
<meta name="description" content="Cyberpunk neon glow toggle switch with animated track.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<label class="neon-toggle">
  <input type="checkbox" id="nt">
  <div class="track">
    <div class="thumb"></div>
    <span class="label-off">OFF</span>
    <span class="label-on">ON</span>
  </div>
</label>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a16}
.neon-toggle input{display:none}
.track{position:relative;width:100px;height:46px;border-radius:23px;background:#111;
  border:2px solid #334155;cursor:pointer;overflow:hidden;transition:border-color .3s,box-shadow .3s}
.thumb{position:absolute;top:5px;left:5px;width:32px;height:32px;border-radius:50%;
  background:#334155;transition:all .4s cubic-bezier(.34,1.56,.64,1)}
.label-off,.label-on{position:absolute;top:50%;transform:translateY(-50%);font-size:.65rem;
  font-weight:700;letter-spacing:.08em;font-family:monospace}
.label-off{right:10px;color:#475569}
.label-on{left:10px;color:#0ff;opacity:0;transition:opacity .3s}
input:checked~.track{border-color:#0ff;box-shadow:0 0 12px #0ff5,0 0 24px #0ff2}
input:checked~.track .thumb{transform:translateX(54px);background:#0ff;box-shadow:0 0 10px #0ff}
input:checked~.track .label-on{opacity:1}
input:checked~.track .label-off{opacity:0}
@media(prefers-reduced-motion:reduce){.thumb,.track,.label-on{transition:none}}`
    }
  },

  {
    folder: "3d-range-slider",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>3D Range Slider</title>
<meta name="description" content="Custom range slider with 3D depth track and glowing thumb.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="slider-wrap">
  <input type="range" class="slider3d" id="sl" min="0" max="100" value="40">
  <div class="value-badge" id="vb">40</div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a}
.slider-wrap{position:relative;width:300px;display:flex;flex-direction:column;align-items:center;gap:20px}
.slider3d{-webkit-appearance:none;appearance:none;width:100%;height:12px;border-radius:6px;outline:none;cursor:pointer;
  background:linear-gradient(180deg,#1e293b 0%,#0f172a 100%);
  box-shadow:inset 0 2px 4px #0008,inset 0 -1px 2px #ffffff10}
.slider3d::-webkit-slider-thumb{-webkit-appearance:none;width:28px;height:28px;border-radius:50%;cursor:pointer;
  background:radial-gradient(circle at 35% 35%,#a5b4fc,#6366f1);
  box-shadow:0 4px 12px #6366f188,0 0 0 3px #6366f133;transition:transform .2s}
.slider3d::-webkit-slider-thumb:hover{transform:scale(1.15)}
.slider3d::-moz-range-thumb{width:28px;height:28px;border-radius:50%;border:none;
  background:radial-gradient(circle at 35% 35%,#a5b4fc,#6366f1);box-shadow:0 4px 12px #6366f188}
.value-badge{background:#6366f1;color:#fff;padding:6px 16px;border-radius:20px;font-family:sans-serif;
  font-size:1rem;font-weight:700;min-width:60px;text-align:center}
@media(prefers-reduced-motion:reduce){.slider3d::-webkit-slider-thumb{transition:none}}`,
      "script.js": `const sl=document.getElementById('sl');
const vb=document.getElementById('vb');
sl.addEventListener('input',()=>vb.textContent=sl.value);`
    }
  },

  {
    folder: "color-swatch-toggle",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Color Swatch Toggle</title>
<meta name="description" content="Color theme swatch picker with animated selection ring.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="picker">
  <h3>Choose Theme</h3>
  <div class="swatches" id="swatches">
    ${['#6366f1','#10b981','#f59e0b','#ef4444','#06b6d4','#a855f7','#ec4899','#84cc16'].map((c,i)=>`<button class="swatch${i===0?' active':''}" style="--c:${c}" data-color="${c}"></button>`).join('')}
  </div>
  <div class="preview" id="preview">Selected: #6366f1</div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.picker{background:#1e293b;border-radius:20px;padding:28px;width:300px;border:1px solid #334155}
h3{color:#f1f5f9;margin-bottom:20px;font-size:1rem}
.swatches{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:20px}
.swatch{width:36px;height:36px;border-radius:50%;border:2px solid transparent;
  background:var(--c);cursor:pointer;transition:transform .2s,box-shadow .2s;position:relative}
.swatch::after{content:'';position:absolute;inset:-5px;border-radius:50%;border:2px solid var(--c);
  opacity:0;transition:opacity .2s}
.swatch.active{transform:scale(1.15)}
.swatch.active::after{opacity:1;box-shadow:0 0 8px var(--c)}
.preview{background:#0f172a;border-radius:10px;padding:10px 16px;color:#94a3b8;font-size:.85rem;
  border:1px solid #334155;transition:border-color .3s}
@media(prefers-reduced-motion:reduce){.swatch,.preview,.swatch::after{transition:none}}`,
      "script.js": `const swatches=document.querySelectorAll('.swatch');
const preview=document.getElementById('preview');
swatches.forEach(s=>s.addEventListener('click',()=>{
  swatches.forEach(x=>x.classList.remove('active'));s.classList.add('active');
  const c=s.dataset.color;
  preview.textContent='Selected: '+c;preview.style.borderColor=c;
}));`
    }
  },

  {
    folder: "multi-range-slider",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Multi Range Slider</title>
<meta name="description" content="Dual-handle price range slider with fill track between handles.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="mrange-wrap">
  <h3>Price Range</h3>
  <div class="mrange">
    <div class="fill-track" id="fillTrack"></div>
    <input type="range" id="rmin" min="0" max="1000" value="200">
    <input type="range" id="rmax" min="0" max="1000" value="700">
  </div>
  <div class="labels"><span id="lmin">\$200</span><span id="lmax">\$700</span></div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.mrange-wrap{width:320px;background:#1e293b;border-radius:20px;padding:28px;border:1px solid #334155}
h3{color:#f1f5f9;margin-bottom:24px;font-size:1rem}
.mrange{position:relative;height:20px;margin-bottom:12px}
input[type=range]{position:absolute;top:50%;transform:translateY(-50%);left:0;right:0;width:100%;
  -webkit-appearance:none;appearance:none;background:transparent;pointer-events:none}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;
  background:#6366f1;box-shadow:0 0 8px #6366f188;cursor:pointer;pointer-events:all;transition:transform .2s}
input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.2)}
.fill-track{position:absolute;top:50%;transform:translateY(-50%);height:4px;background:#6366f1;border-radius:2px;pointer-events:none}
.mrange::before{content:'';position:absolute;top:50%;transform:translateY(-50%);height:4px;width:100%;background:#334155;border-radius:2px}
.labels{display:flex;justify-content:space-between;color:#94a3b8;font-size:.85rem}
@media(prefers-reduced-motion:reduce){input[type=range]::-webkit-slider-thumb{transition:none}}`,
      "script.js": `const rmin=document.getElementById('rmin'),rmax=document.getElementById('rmax');
const lmin=document.getElementById('lmin'),lmax=document.getElementById('lmax');
const ft=document.getElementById('fillTrack');
function update(){
  let min=+rmin.value,max=+rmax.value;
  if(min>max){[min,max]=[max,min];}
  const pmin=min/1000*100,pmax=max/1000*100;
  ft.style.left=pmin+'%';ft.style.width=(pmax-pmin)+'%';
  lmin.textContent='\$'+min;lmax.textContent='\$'+max;
}
rmin.addEventListener('input',update);rmax.addEventListener('input',update);update();`
    }
  },

  {
    folder: "icon-segmented-switch",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Icon Segmented Switch</title>
<meta name="description" content="Segmented control switcher with animated sliding pill indicator.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="seg-wrap">
  <div class="seg" id="seg">
    <div class="seg-pill" id="pill"></div>
    <button class="seg-btn active" data-i="0">☀️ Light</button>
    <button class="seg-btn" data-i="1">🌙 Dark</button>
    <button class="seg-btn" data-i="2">💻 System</button>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.seg-wrap{padding:24px}
.seg{position:relative;display:flex;background:#1e293b;border-radius:14px;padding:4px;border:1px solid #334155}
.seg-pill{position:absolute;top:4px;left:4px;height:calc(100% - 8px);background:#6366f1;
  border-radius:10px;transition:left .3s cubic-bezier(.34,1.56,.64,1),width .3s;z-index:0}
.seg-btn{position:relative;z-index:1;background:none;border:none;padding:10px 20px;
  color:#6b7280;cursor:pointer;font-size:.85rem;border-radius:10px;transition:color .25s;
  font-family:sans-serif;white-space:nowrap}
.seg-btn.active{color:#fff;font-weight:600}
@media(prefers-reduced-motion:reduce){.seg-pill,.seg-btn{transition:none}}`,
      "script.js": `const btns=document.querySelectorAll('.seg-btn');
const pill=document.getElementById('pill');
function move(btn){
  pill.style.left=(btn.offsetLeft)+'px';pill.style.width=btn.offsetWidth+'px';
  btns.forEach(b=>b.classList.toggle('active',b===btn));
}
btns.forEach(b=>b.addEventListener('click',()=>move(b)));
move(document.querySelector('.seg-btn.active'));`
    }
  },

  {
    folder: "haptic-checkbox-toggle",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Haptic Checkbox Toggle</title>
<meta name="description" content="Custom animated checkbox with checkmark stroke draw animation.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="checks">
  ${['Enable notifications','Dark mode','Auto-save','Send analytics'].map(l=>`<label class="hcheck"><input type="checkbox"><div class="box"><svg viewBox="0 0 20 20"><polyline class="check-mark" points="4,10 8,14 16,6"/></svg></div><span>${l}</span></label>`).join('')}
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.checks{display:flex;flex-direction:column;gap:12px}
.hcheck{display:flex;align-items:center;gap:14px;cursor:pointer}
.hcheck input{display:none}
.box{width:24px;height:24px;border-radius:6px;border:2px solid #334155;background:#1e293b;
  display:grid;place-items:center;transition:background .2s,border-color .2s;flex-shrink:0}
.check-mark{fill:none;stroke:#fff;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;
  stroke-dasharray:20;stroke-dashoffset:20;transition:stroke-dashoffset .3s ease}
.hcheck input:checked~.box{background:#6366f1;border-color:#6366f1}
.hcheck input:checked~.box .check-mark{stroke-dashoffset:0}
.hcheck span{color:#94a3b8;font-size:.9rem;transition:color .2s}
.hcheck input:checked~span{color:#f1f5f9}
@media(prefers-reduced-motion:reduce){.check-mark,.box,.hcheck span{transition:none}}`
    }
  },

  {
    folder: "vertical-volume-slider",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Vertical Volume Slider</title>
<meta name="description" content="Vertical audio volume fader with level meter visualization.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="vol-panel">
  <div class="vol-meter" id="meter">
    ${Array.from({length:12},(_,i)=>`<div class="meter-bar" data-i="${11-i}"></div>`).join('')}
  </div>
  <div class="fader-wrap">
    <input type="range" orient="vertical" class="fader" id="fader" min="0" max="100" value="70">
  </div>
  <div class="vol-label" id="volLbl">70</div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#111;font-family:sans-serif}
.vol-panel{display:flex;flex-direction:column;align-items:center;gap:12px;background:#1e1e1e;
  border-radius:20px;padding:24px;border:1px solid #333}
.vol-meter{display:flex;flex-direction:column;gap:3px}
.meter-bar{width:60px;height:10px;border-radius:2px;background:#2a2a2a;transition:background .15s}
.meter-bar.active{background:#22c55e}
.meter-bar[data-i="0"]{background:#2a2a2a}
.meter-bar[data-i="1"].active,.meter-bar[data-i="2"].active{background:#f59e0b}
.meter-bar[data-i="0"].active{background:#ef4444}
.fader-wrap{width:40px;height:180px;display:flex;align-items:center;justify-content:center}
input[type=range][orient=vertical],.fader{-webkit-appearance:slider-vertical;appearance:slider-vertical;
  width:8px;height:100%;writing-mode:vertical-lr;direction:rtl;cursor:pointer;
  accent-color:#6366f1}
.vol-label{color:#94a3b8;font-size:.85rem}
@media(prefers-reduced-motion:reduce){.meter-bar{transition:none}}`,
      "script.js": `const fader=document.getElementById('fader');
const bars=document.querySelectorAll('.meter-bar');
const lbl=document.getElementById('volLbl');
function update(){
  const v=+fader.value;lbl.textContent=v;
  const active=Math.round(v/100*12);
  bars.forEach((b,i)=>b.classList.toggle('active',(12-i)<=active));
}
fader.addEventListener('input',update);update();`
    }
  },

  {
    folder: "slider-bar-opacity",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Slider Bar Opacity Control</title>
<meta name="description" content="Transparency opacity slider bar with checkerboard preview.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="op-ctrl">
  <div class="preview-box" id="pbox"><div class="color-layer" id="clayer"></div></div>
  <div class="slider-row">
    <span class="icon">🔳</span>
    <input type="range" id="opSlider" min="0" max="100" value="80">
    <span class="val" id="opVal">80%</span>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.op-ctrl{background:#1e293b;border-radius:20px;padding:24px;width:300px;border:1px solid #334155}
.preview-box{width:100%;height:100px;border-radius:12px;overflow:hidden;margin-bottom:20px;position:relative;
  background-image:repeating-conic-gradient(#334155 0% 25%,#1e293b 0% 50%);background-size:20px 20px}
.color-layer{position:absolute;inset:0;background:linear-gradient(135deg,#6366f1,#ec4899);transition:opacity .1s}
.slider-row{display:flex;align-items:center;gap:12px}
.icon{font-size:1.2rem}
input[type=range]{flex:1;accent-color:#6366f1}
.val{color:#94a3b8;font-size:.85rem;min-width:40px;text-align:right}
@media(prefers-reduced-motion:reduce){.color-layer{transition:none}}`,
      "script.js": `const sl=document.getElementById('opSlider');
const cl=document.getElementById('clayer');
const val=document.getElementById('opVal');
sl.addEventListener('input',()=>{
  cl.style.opacity=sl.value/100;val.textContent=sl.value+'%';
});`
    }
  },

  {
    folder: "knob-rotary-switch",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Knob Rotary Switch</title>
<meta name="description" content="Draggable rotary knob control with value readout.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="knob-panel">
  <div class="knob" id="knob">
    <div class="knob-body">
      <div class="knob-mark"></div>
    </div>
    <svg class="knob-arc" viewBox="0 0 100 100">
      <circle class="arc-track" cx="50" cy="50" r="40"/>
      <circle class="arc-fill" cx="50" cy="50" r="40" id="arcFill"/>
    </svg>
  </div>
  <div class="knob-label" id="knobLbl">50</div>
  <div class="knob-name">Volume</div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#111;font-family:sans-serif}
.knob-panel{display:flex;flex-direction:column;align-items:center;gap:8px}
.knob{position:relative;width:100px;height:100px;cursor:grab;user-select:none}
.knob:active{cursor:grabbing}
.knob-arc{position:absolute;inset:0;transform:rotate(135deg)}
.arc-track{fill:none;stroke:#2a2a2a;stroke-width:8;stroke-linecap:round;stroke-dasharray:188.5;stroke-dashoffset:0}
.arc-fill{fill:none;stroke:#6366f1;stroke-width:8;stroke-linecap:round;stroke-dasharray:188.5;stroke-dashoffset:94.25;transition:stroke-dashoffset .05s}
.knob-body{position:absolute;inset:12px;border-radius:50%;
  background:radial-gradient(circle at 40% 35%,#2a2a2a,#111);box-shadow:0 4px 16px #0008,inset 0 1px 2px #fff1}
.knob-mark{position:absolute;top:8px;left:50%;transform:translateX(-50%);
  width:3px;height:12px;background:#6366f1;border-radius:2px}
.knob-label{font-size:1.4rem;font-weight:700;color:#f1f5f9}
.knob-name{font-size:.75rem;color:#6b7280;text-transform:uppercase;letter-spacing:.1em}
@media(prefers-reduced-motion:reduce){.arc-fill{transition:none}}`,
      "script.js": `const knob=document.getElementById('knob');
const body=knob.querySelector('.knob-body');
const mark=knob.querySelector('.knob-mark');
const arcFill=document.getElementById('arcFill');
const lbl=document.getElementById('knobLbl');
let val=50,dragging=false,startY=0,startVal=50;
const max=188.5,half=max/2;
function update(v){
  val=Math.max(0,Math.min(100,v));
  const rot=val/100*270-135;
  body.style.transform='rotate('+rot+'deg)';
  const offset=half-(val/100*max*0.75);
  arcFill.style.strokeDashoffset=offset;
  lbl.textContent=Math.round(val);
}
knob.addEventListener('mousedown',e=>{dragging=true;startY=e.clientY;startVal=val;});
document.addEventListener('mousemove',e=>{if(!dragging)return;update(startVal-(e.clientY-startY)/2);});
document.addEventListener('mouseup',()=>dragging=false);
knob.addEventListener('wheel',e=>{e.preventDefault();update(val-(e.deltaY>0?1:-1)*2);},{passive:false});
update(50);`
    }
  },

  {
    folder: "toggle-switch-group",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Toggle Switch Group</title>
<meta name="description" content="Grouped settings panel with multiple toggle switches.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="settings-panel">
  <h3>Settings</h3>
  ${[
    ['Notifications','🔔','checked'],
    ['Analytics','📊',''],
    ['Dark mode','🌙','checked'],
    ['Beta features','🧪',''],
    ['Cloud sync','☁️','checked'],
  ].map(([l,i,c])=>`<div class="setting-row"><div class="setting-info"><span class="setting-icon">${i}</span><span>${l}</span></div><label class="tog"><input type="checkbox" ${c}><div class="tog-track"><div class="tog-thumb"></div></div></label></div>`).join('')}
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.settings-panel{background:#1e293b;border-radius:20px;padding:24px;width:320px;border:1px solid #334155}
h3{color:#f1f5f9;margin-bottom:20px;font-size:1rem}
.setting-row{display:flex;align-items:center;justify-content:space-between;
  padding:12px 0;border-bottom:1px solid #1f2937}
.setting-row:last-child{border-bottom:none}
.setting-info{display:flex;align-items:center;gap:12px;color:#cbd5e1;font-size:.9rem}
.setting-icon{font-size:1.2rem}
.tog input{display:none}
.tog-track{width:44px;height:24px;border-radius:12px;background:#334155;position:relative;cursor:pointer;transition:background .25s}
.tog-thumb{position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#94a3b8;transition:all .25s cubic-bezier(.34,1.56,.64,1)}
.tog input:checked~.tog-track{background:#6366f1}
.tog input:checked~.tog-track .tog-thumb{transform:translateX(20px);background:#fff}
@media(prefers-reduced-motion:reduce){.tog-track,.tog-thumb{transition:none}}`
    }
  },

  /* ─────────────────────────────────────────
     FORMS (10)
  ───────────────────────────────────────── */
  {
    folder: "floating-label-input",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Floating Label Input</title>
<meta name="description" content="Material Design floating label form inputs with animated border.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<form class="fform">
  ${[['Name','text','person'],['Email','email','email'],['Password','password','lock']].map(([l,t,i])=>`<div class="ffield"><input type="${t}" id="${i}" class="finput" placeholder=" " required><label for="${i}" class="flabel">${l}</label></div>`).join('')}
  <button class="fsub" type="submit">Sign Up</button>
</form>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.fform{display:flex;flex-direction:column;gap:24px;width:300px}
.ffield{position:relative}
.finput{width:100%;padding:14px 16px 6px;background:#1e293b;border:2px solid #334155;border-radius:10px;
  color:#f1f5f9;font-size:.95rem;outline:none;transition:border-color .2s;font-family:sans-serif}
.finput:focus{border-color:#6366f1}
.flabel{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#6b7280;font-size:.9rem;
  pointer-events:none;transition:all .2s cubic-bezier(.4,0,.2,1);background:transparent}
.finput:focus~.flabel,.finput:not(:placeholder-shown)~.flabel{
  top:4px;transform:none;font-size:.7rem;color:#6366f1}
.fsub{padding:14px;background:#6366f1;border:none;border-radius:10px;color:#fff;font-size:1rem;
  cursor:pointer;font-family:sans-serif;transition:background .2s}
.fsub:hover{background:#4f46e5}
@media(prefers-reduced-motion:reduce){.flabel,.finput,.fsub{transition:none}}`
    }
  },

  {
    folder: "otp-code-input-form",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>OTP Code Input Form</title>
<meta name="description" content="Six-digit OTP verification code input with auto-advance and paste support.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="otp-wrap">
  <h2>Verification Code</h2>
  <p>Enter the 6-digit code sent to your device.</p>
  <div class="otp-inputs" id="otpInputs">
    ${Array.from({length:6},(_,i)=>`<input class="otp-cell" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]" data-i="${i}">`).join('')}
  </div>
  <button class="otp-btn" id="otpBtn">Verify</button>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.otp-wrap{background:#1e293b;border-radius:24px;padding:36px;text-align:center;
  border:1px solid #334155;width:360px}
h2{color:#f1f5f9;margin-bottom:8px}.otp-wrap p{color:#6b7280;font-size:.9rem;margin-bottom:28px}
.otp-inputs{display:flex;gap:10px;justify-content:center;margin-bottom:24px}
.otp-cell{width:48px;height:56px;text-align:center;font-size:1.4rem;font-weight:700;
  background:#0f172a;border:2px solid #334155;border-radius:10px;color:#f1f5f9;
  outline:none;transition:border-color .2s;caret-color:transparent}
.otp-cell:focus{border-color:#6366f1;box-shadow:0 0 0 3px #6366f133}
.otp-cell.filled{border-color:#10b981;background:#10b98111}
.otp-btn{width:100%;padding:14px;background:#6366f1;border:none;border-radius:12px;
  color:#fff;font-size:1rem;cursor:pointer;font-family:sans-serif;transition:background .2s}
.otp-btn:hover{background:#4f46e5}
@media(prefers-reduced-motion:reduce){.otp-cell,.otp-btn{transition:none}}`,
      "script.js": `const cells=[...document.querySelectorAll('.otp-cell')];
cells.forEach((c,i)=>{
  c.addEventListener('input',e=>{
    c.value=c.value.replace(/[^0-9]/g,'');
    c.classList.toggle('filled',c.value!=='');
    if(c.value&&i<5)cells[i+1].focus();
  });
  c.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!c.value&&i>0)cells[i-1].focus();});
});
cells[0].parentElement.addEventListener('paste',e=>{
  const data=(e.clipboardData||window.clipboardData).getData('text').replace(/[^0-9]/g,'');
  cells.forEach((c,i)=>{c.value=data[i]||'';c.classList.toggle('filled',!!c.value);});
  cells[Math.min(data.length,5)].focus();e.preventDefault();
});
document.getElementById('otpBtn').addEventListener('click',()=>{
  const code=cells.map(c=>c.value).join('');
  alert(code.length===6?'Code: '+code:'Please enter all 6 digits.');
});`
    }
  },

  {
    folder: "search-autocomplete-input",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Search Autocomplete Input</title>
<meta name="description" content="Search input with animated dropdown autocomplete suggestions.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="ac-wrap">
  <div class="ac-input-wrap">
    <span class="ac-icon">⌕</span>
    <input type="search" class="ac-input" id="acInput" placeholder="Search components..." autocomplete="off">
  </div>
  <ul class="ac-list" id="acList"></ul>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:start center;background:#0f172a;font-family:sans-serif;padding-top:80px}
.ac-wrap{position:relative;width:360px}
.ac-input-wrap{display:flex;align-items:center;background:#1e293b;border:2px solid #334155;
  border-radius:12px;padding:0 14px;transition:border-color .2s}
.ac-input-wrap:focus-within{border-color:#6366f1}
.ac-icon{color:#64748b;font-size:1.2rem}
.ac-input{flex:1;padding:14px 10px;background:transparent;border:none;color:#f1f5f9;
  font-size:.95rem;outline:none;font-family:sans-serif}
.ac-list{position:absolute;top:calc(100% + 6px);left:0;right:0;background:#1e293b;
  border:1px solid #334155;border-radius:12px;list-style:none;max-height:0;overflow:hidden;
  transition:max-height .3s ease,opacity .2s;opacity:0;z-index:100}
.ac-list.open{max-height:240px;opacity:1}
.ac-list li{padding:10px 16px;cursor:pointer;color:#94a3b8;font-size:.9rem;transition:background .15s}
.ac-list li:hover,.ac-list li.active{background:#334155;color:#f1f5f9}
.ac-list li mark{background:transparent;color:#6366f1;font-weight:700}
@media(prefers-reduced-motion:reduce){.ac-list,.ac-input-wrap{transition:none}}`,
      "script.js": `const items=['Button hover effect','Card flip animation','Neon glow text','Progress loader','Toggle switch dark','Skeleton shimmer','Modal dialog','Tooltip hover','Dropdown select','Range slider','Glassmorphism card','Form floating label'];
const inp=document.getElementById('acInput');
const list=document.getElementById('acList');
let sel=-1;
inp.addEventListener('input',()=>{
  const q=inp.value.trim().toLowerCase();
  list.innerHTML='';sel=-1;
  if(!q){list.classList.remove('open');return;}
  const res=items.filter(i=>i.toLowerCase().includes(q));
  if(!res.length){list.classList.remove('open');return;}
  res.forEach((r,i)=>{
    const li=document.createElement('li');
    li.innerHTML=r.replace(new RegExp('('+q+')','gi'),'<mark>$1</mark>');
    li.addEventListener('click',()=>{inp.value=r;list.classList.remove('open');});
    list.appendChild(li);
  });
  list.classList.add('open');
});
inp.addEventListener('keydown',e=>{
  const lis=[...list.querySelectorAll('li')];
  if(e.key==='ArrowDown'){sel=Math.min(sel+1,lis.length-1);}
  else if(e.key==='ArrowUp'){sel=Math.max(sel-1,0);}
  else if(e.key==='Enter'&&sel>=0){inp.value=lis[sel].textContent;list.classList.remove('open');return;}
  else if(e.key==='Escape'){list.classList.remove('open');}
  lis.forEach((l,i)=>l.classList.toggle('active',i===sel));
});
document.addEventListener('click',e=>{if(!e.target.closest('.ac-wrap'))list.classList.remove('open');});`
    }
  },

  {
    folder: "contact-form-animated",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Contact Form Animated</title>
<meta name="description" content="Minimal contact form with send animation and success state.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<form class="cform" id="cform" novalidate>
  <h2>Get in Touch</h2>
  <div class="cfield"><input type="text" placeholder="Your name" required id="cname"></div>
  <div class="cfield"><input type="email" placeholder="Email address" required id="cemail"></div>
  <div class="cfield"><textarea rows="4" placeholder="Your message…" required id="cmsg"></textarea></div>
  <button type="submit" class="csend" id="csend"><span id="cslbl">Send Message</span><span class="arrow">→</span></button>
  <div class="success" id="csuccess" hidden>✅ Message sent! I'll reply soon.</div>
</form>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.cform{background:#1e293b;border-radius:24px;padding:36px;width:360px;
  border:1px solid #334155;display:flex;flex-direction:column;gap:16px}
h2{color:#f1f5f9;font-size:1.2rem}
.cfield input,.cfield textarea{width:100%;padding:12px 16px;background:#0f172a;
  border:2px solid #334155;border-radius:10px;color:#f1f5f9;font-size:.9rem;
  font-family:sans-serif;outline:none;transition:border-color .2s;resize:none}
.cfield input:focus,.cfield textarea:focus{border-color:#6366f1}
.csend{display:flex;align-items:center;justify-content:center;gap:8px;
  padding:14px;background:#6366f1;border:none;border-radius:12px;color:#fff;
  font-size:1rem;cursor:pointer;font-family:sans-serif;transition:background .2s}
.csend:hover{background:#4f46e5}
.csend .arrow{transition:transform .3s}
.csend:hover .arrow{transform:translateX(4px)}
.success{color:#10b981;font-size:.9rem;text-align:center}
@media(prefers-reduced-motion:reduce){.csend,.arrow,.cfield input,.cfield textarea{transition:none}}`,
      "script.js": `document.getElementById('cform').addEventListener('submit',e=>{
  e.preventDefault();
  const btn=document.getElementById('csend');
  btn.disabled=true;btn.querySelector('#cslbl').textContent='Sending…';
  setTimeout(()=>{
    btn.hidden=true;document.getElementById('csuccess').removeAttribute('hidden');
  },1500);
});`
    }
  },

  {
    folder: "newsletter-subscription-form",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Newsletter Subscription Form</title>
<meta name="description" content="Animated newsletter email subscription form with success animation.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="nl-card">
  <div class="nl-icon">✉️</div>
  <h2>Stay in the loop</h2>
  <p>Get the latest components, tips and inspiration.</p>
  <form class="nl-form" id="nlForm" novalidate>
    <input type="email" class="nl-input" id="nlEmail" placeholder="you@example.com" required>
    <button type="submit" class="nl-btn" id="nlBtn">Subscribe</button>
  </form>
  <p class="nl-small">No spam. Unsubscribe anytime.</p>
  <div class="nl-success" id="nlSuccess" hidden>🎉 You're subscribed!</div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.nl-card{background:#1e293b;border-radius:24px;padding:36px;width:360px;text-align:center;border:1px solid #334155}
.nl-icon{font-size:3rem;margin-bottom:12px;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
h2{color:#f1f5f9;margin-bottom:8px}
.nl-card p{color:#6b7280;font-size:.9rem;margin-bottom:20px}
.nl-form{display:flex;gap:0;border:2px solid #334155;border-radius:12px;overflow:hidden;transition:border-color .2s}
.nl-form:focus-within{border-color:#6366f1}
.nl-input{flex:1;padding:12px 16px;background:#0f172a;border:none;color:#f1f5f9;font-family:sans-serif;outline:none}
.nl-btn{padding:12px 20px;background:#6366f1;border:none;color:#fff;cursor:pointer;font-family:sans-serif;transition:background .2s}
.nl-btn:hover{background:#4f46e5}
.nl-small{color:#374151;font-size:.75rem;margin-top:12px}
.nl-success{color:#10b981;font-size:1rem;margin-top:16px;font-weight:600}
@media(prefers-reduced-motion:reduce){.nl-icon{animation:none}}`,
      "script.js": `document.getElementById('nlForm').addEventListener('submit',e=>{
  e.preventDefault();
  const input=document.getElementById('nlEmail');
  if(!input.validity.valid)return input.focus();
  document.getElementById('nlForm').hidden=true;
  document.getElementById('nlSuccess').removeAttribute('hidden');
});`
    }
  },

  {
    folder: "file-upload-dropzone-modern",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>File Upload Dropzone Modern</title>
<meta name="description" content="Modern drag-and-drop file upload zone with animated border and file list.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="dropzone" id="dz" tabindex="0">
  <div class="dz-inner">
    <span class="dz-icon">📁</span>
    <p class="dz-main">Drop files here or <label class="dz-browse" for="fileInput">browse</label></p>
    <p class="dz-hint">PNG, JPG, PDF up to 10MB</p>
    <input type="file" id="fileInput" multiple hidden>
  </div>
</div>
<ul class="file-list" id="fileList"></ul>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif;padding:24px}
.dropzone{width:380px;border:2px dashed #334155;border-radius:16px;padding:48px 24px;
  text-align:center;transition:border-color .2s,background .2s;cursor:pointer}
.dropzone.over{border-color:#6366f1;background:#6366f10a}
.dz-icon{font-size:3rem;display:block;margin-bottom:12px;transition:transform .3s}
.dropzone.over .dz-icon{transform:scale(1.2) translateY(-4px)}
.dz-main{color:#94a3b8;font-size:.95rem;margin-bottom:4px}
.dz-browse{color:#6366f1;cursor:pointer;text-decoration:underline}
.dz-hint{color:#475569;font-size:.8rem}
.file-list{list-style:none;width:380px;margin-top:12px;display:flex;flex-direction:column;gap:6px}
.file-list li{display:flex;align-items:center;gap:10px;background:#1e293b;border-radius:10px;
  padding:10px 14px;color:#94a3b8;font-size:.85rem;border:1px solid #334155;animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.file-list li span{flex:1}
.file-list li button{background:none;border:none;color:#64748b;cursor:pointer;font-size:1.1rem;transition:color .2s}
.file-list li button:hover{color:#ef4444}
@media(prefers-reduced-motion:reduce){.dz-icon,.file-list li,.dropzone,.file-list button{transition:none;animation:none}}`,
      "script.js": `const dz=document.getElementById('dz');
const fi=document.getElementById('fileInput');
const fl=document.getElementById('fileList');
['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('over')}));
['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('over')}));
dz.addEventListener('drop',e=>addFiles(e.dataTransfer.files));
fi.addEventListener('change',()=>addFiles(fi.files));
dz.addEventListener('click',e=>{if(!e.target.closest('label'))fi.click();});
function addFiles(files){
  [...files].forEach(f=>{
    const li=document.createElement('li');
    const icon=f.type.includes('image')?'🖼️':f.type.includes('pdf')?'📄':'📎';
    const size=(f.size/1024).toFixed(1)+'KB';
    li.innerHTML='<span>'+icon+' '+f.name+'</span><span style="color:#475569">'+size+'</span><button title="Remove">✕</button>';
    li.querySelector('button').onclick=()=>li.remove();
    fl.appendChild(li);
  });
}`
    }
  },

  {
    folder: "login-form-split",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Login Form Split</title>
<meta name="description" content="Split-panel login form with branded illustration side.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="login-wrap">
  <div class="login-brand">
    <div class="brand-icon">⟨/⟩</div>
    <h1>ComponentField</h1>
    <p>The web's component library</p>
  </div>
  <div class="login-form-side">
    <h2>Welcome back</h2>
    <p class="sub">Sign in to your account</p>
    <div class="lfield"><label>Email</label><input type="email" placeholder="you@example.com"></div>
    <div class="lfield"><label>Password</label><input type="password" placeholder="••••••••"></div>
    <div class="options"><label><input type="checkbox"> Remember me</label><a href="#">Forgot password?</a></div>
    <button class="lbtn">Sign In</button>
    <p class="lalt">Don't have an account? <a href="#">Sign up</a></p>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a14;font-family:sans-serif}
.login-wrap{display:flex;border-radius:24px;overflow:hidden;width:720px;box-shadow:0 24px 80px #0008}
.login-brand{flex:1;background:linear-gradient(135deg,#4f46e5,#7c3aed,#db2777);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:12px;padding:48px;color:#fff;text-align:center}
.brand-icon{font-size:3rem;font-weight:900;font-family:monospace}
.login-brand h1{font-size:1.8rem}.login-brand p{opacity:.75;font-size:.9rem}
.login-form-side{flex:1;background:#1e293b;padding:48px;display:flex;flex-direction:column;gap:16px}
.login-form-side h2{color:#f1f5f9;font-size:1.4rem}
.sub{color:#6b7280;font-size:.85rem;margin-bottom:4px}
.lfield{display:flex;flex-direction:column;gap:6px}
.lfield label{color:#94a3b8;font-size:.8rem}
.lfield input{padding:12px;background:#0f172a;border:2px solid #334155;border-radius:8px;
  color:#f1f5f9;outline:none;transition:border-color .2s;font-family:sans-serif}
.lfield input:focus{border-color:#6366f1}
.options{display:flex;justify-content:space-between;align-items:center;font-size:.8rem;color:#6b7280}
.options a{color:#6366f1;text-decoration:none}
.lbtn{padding:13px;background:#6366f1;border:none;border-radius:10px;color:#fff;
  font-size:1rem;cursor:pointer;font-family:sans-serif;transition:background .2s}
.lbtn:hover{background:#4f46e5}
.lalt{text-align:center;color:#6b7280;font-size:.85rem}
.lalt a{color:#6366f1;text-decoration:none}
@media(prefers-reduced-motion:reduce){.lfield input,.lbtn{transition:none}}`
    }
  },

  {
    folder: "reservation-form-modern",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Reservation Form Modern</title>
<meta name="description" content="Restaurant table reservation form with date picker and party size.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="res-card">
  <div class="res-header"><span>🍽️</span><h2>Reserve a Table</h2></div>
  <form class="res-form" id="resForm" novalidate>
    <div class="res-row">
      <div class="res-field"><label>Date</label><input type="date" id="resDate" required></div>
      <div class="res-field"><label>Time</label>
        <select id="resTime">
          ${['12:00','12:30','13:00','18:00','18:30','19:00','19:30','20:00','20:30','21:00'].map(t=>`<option>${t}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="res-field"><label>Guests</label>
      <div class="stepper-ctrl">
        <button type="button" id="rdec">−</button><span id="guestCount">2</span><button type="button" id="rinc">+</button>
      </div>
    </div>
    <div class="res-field"><label>Name</label><input type="text" placeholder="Full name" required></div>
    <button class="res-btn" type="submit">Confirm Reservation</button>
    <div class="res-ok" id="resOk" hidden>✅ Reservation confirmed!</div>
  </form>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.res-card{background:#1e293b;border-radius:24px;padding:32px;width:380px;border:1px solid #334155}
.res-header{display:flex;align-items:center;gap:12px;margin-bottom:24px;font-size:1.5rem}
.res-header h2{color:#f1f5f9;font-size:1.1rem}
.res-form{display:flex;flex-direction:column;gap:16px}
.res-row{display:flex;gap:12px}
.res-field{flex:1;display:flex;flex-direction:column;gap:6px}
.res-field label{color:#94a3b8;font-size:.8rem}
.res-field input,.res-field select{padding:10px 12px;background:#0f172a;border:2px solid #334155;
  border-radius:8px;color:#f1f5f9;outline:none;font-family:sans-serif;transition:border-color .2s}
.res-field input:focus,.res-field select:focus{border-color:#6366f1}
.res-field select{appearance:none}
.stepper-ctrl{display:flex;align-items:center;gap:0;border:2px solid #334155;border-radius:8px;overflow:hidden}
.stepper-ctrl button{background:#334155;border:none;color:#f1f5f9;width:36px;height:40px;font-size:1.2rem;cursor:pointer;transition:background .2s}
.stepper-ctrl button:hover{background:#475569}
.stepper-ctrl span{flex:1;text-align:center;color:#f1f5f9;font-size:1rem}
.res-btn{padding:13px;background:#6366f1;border:none;border-radius:10px;color:#fff;font-size:1rem;cursor:pointer;font-family:sans-serif;transition:background .2s}
.res-btn:hover{background:#4f46e5}
.res-ok{color:#10b981;text-align:center;font-size:.9rem}
@media(prefers-reduced-motion:reduce){.res-field input,.res-field select,.stepper-ctrl button,.res-btn{transition:none}}`,
      "script.js": `let guests=2;const gc=document.getElementById('guestCount');
document.getElementById('rinc').onclick=()=>{if(guests<12){guests++;gc.textContent=guests;}};
document.getElementById('rdec').onclick=()=>{if(guests>1){guests--;gc.textContent=guests;}};
document.getElementById('resForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('resForm').querySelectorAll('button[type=submit]')[0].hidden=true;
  document.getElementById('resOk').removeAttribute('hidden');
});`
    }
  },

  {
    folder: "email-validation-form",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Email Validation Form</title>
<meta name="description" content="Real-time email validation form with animated feedback indicators.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="val-card">
  <h2>Email Validation</h2>
  <div class="vfield" id="vfield">
    <input type="email" class="vinput" id="vemail" placeholder="Enter your email">
    <span class="vstatus" id="vstatus"></span>
  </div>
  <ul class="vhints" id="vhints">
    <li data-rule="nonempty">Not empty</li>
    <li data-rule="atsign">Contains @</li>
    <li data-rule="domain">Has valid domain</li>
    <li data-rule="tld">Has TLD (.com etc.)</li>
  </ul>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.val-card{background:#1e293b;border-radius:20px;padding:28px;width:320px;border:1px solid #334155}
h2{color:#f1f5f9;margin-bottom:20px;font-size:1rem}
.vfield{position:relative;margin-bottom:16px}
.vinput{width:100%;padding:12px 44px 12px 14px;background:#0f172a;border:2px solid #334155;
  border-radius:10px;color:#f1f5f9;outline:none;transition:border-color .2s;font-family:sans-serif}
.vinput.valid{border-color:#10b981}.vinput.invalid{border-color:#ef4444}
.vstatus{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:1.1rem}
.vhints{list-style:none;display:flex;flex-direction:column;gap:6px}
.vhints li{font-size:.8rem;color:#64748b;display:flex;align-items:center;gap:8px;transition:color .3s}
.vhints li::before{content:'○';font-size:.8rem}
.vhints li.pass{color:#10b981}.vhints li.pass::before{content:'●';color:#10b981}
@media(prefers-reduced-motion:reduce){.vinput,.vhints li{transition:none}}`,
      "script.js": `const inp=document.getElementById('vemail');
const status=document.getElementById('vstatus');
const hints=document.getElementById('vhints');
const rules={
  nonempty:v=>v.length>0,
  atsign:v=>v.includes('@'),
  domain:v=>v.split('@')[1]?.length>1,
  tld:v=>/\.[a-z]{2,}$/i.test(v),
};
inp.addEventListener('input',()=>{
  const v=inp.value;
  let pass=0;
  hints.querySelectorAll('li').forEach(li=>{
    const ok=rules[li.dataset.rule](v);
    li.classList.toggle('pass',ok);if(ok)pass++;
  });
  const valid=pass===4;
  inp.className='vinput '+(v?valid?'valid':'invalid':'');
  status.textContent=v?(valid?'✅':'❌'):'';
});`
    }
  },

  {
    folder: "tag-input-chip-form",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tag Input Chip Form</title>
<meta name="description" content="Tag chip input field with add and remove animations.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="tag-card">
  <h3>Add Tags</h3>
  <div class="tag-field" id="tagField">
    <div class="tags" id="tags">
      <span class="chip" data-v="CSS">CSS <button>×</button></span>
      <span class="chip" data-v="JavaScript">JavaScript <button>×</button></span>
    </div>
    <input class="tag-input" id="tagInput" placeholder="Type and press Enter…" autocomplete="off">
  </div>
  <p class="tag-hint">Press Enter or comma to add</p>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.tag-card{background:#1e293b;border-radius:20px;padding:28px;width:380px;border:1px solid #334155}
h3{color:#f1f5f9;margin-bottom:16px;font-size:1rem}
.tag-field{background:#0f172a;border:2px solid #334155;border-radius:10px;padding:8px;display:flex;flex-wrap:wrap;gap:6px;cursor:text;transition:border-color .2s}
.tag-field:focus-within{border-color:#6366f1}
.chip{background:#6366f120;color:#a5b4fc;border:1px solid #6366f140;border-radius:20px;
  padding:3px 10px;font-size:.8rem;display:flex;align-items:center;gap:6px;
  animation:pop .2s cubic-bezier(.34,1.56,.64,1)}
@keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}
.chip button{background:none;border:none;color:#a5b4fc;cursor:pointer;font-size:.9rem;padding:0;line-height:1}
.chip button:hover{color:#ef4444}
.tag-input{background:transparent;border:none;outline:none;color:#f1f5f9;font-family:sans-serif;font-size:.9rem;min-width:120px;flex:1}
.tag-hint{margin-top:8px;color:#475569;font-size:.75rem}
@media(prefers-reduced-motion:reduce){.chip{animation:none}}`,
      "script.js": `const input=document.getElementById('tagInput');
const tags=document.getElementById('tags');
function addTag(val){
  val=val.trim();
  if(!val||[...tags.querySelectorAll('.chip')].some(c=>c.dataset.v===val))return;
  const chip=document.createElement('span');chip.className='chip';chip.dataset.v=val;
  chip.innerHTML=val+' <button>×</button>';
  chip.querySelector('button').addEventListener('click',()=>chip.remove());
  tags.appendChild(chip);
}
input.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===','){e.preventDefault();addTag(input.value);input.value='';}
  else if(e.key==='Backspace'&&!input.value){const last=tags.querySelector('.chip:last-child');if(last)last.remove();}
});`
    }
  },

  /* ─────────────────────────────────────────
     EFFECTS (10)
  ───────────────────────────────────────── */
  {
    folder: "text-scramble-hover-effect",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Text Scramble Hover Effect</title>
<meta name="description" content="Hover text scramble effect that randomly cycles characters before settling.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="scramble-wrap">
  <h1 class="scramble-text" data-text="SCRAMBLE" id="stxt">SCRAMBLE</h1>
  <p class="sub-hint">Hover to glitch</p>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#050505;font-family:'Courier New',monospace;flex-direction:column;gap:16px}
body{flex-direction:column;display:flex;align-items:center;justify-content:center;gap:16px}
.scramble-text{font-size:4rem;font-weight:900;color:#f1f5f9;cursor:pointer;letter-spacing:.15em;
  text-shadow:0 0 20px #6366f155;user-select:none}
.sub-hint{color:#374151;font-size:.8rem;font-family:sans-serif}`,
      "script.js": `const el=document.getElementById('stxt');
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
const orig=el.dataset.text;
let raf,iter=0;
el.addEventListener('mouseenter',()=>{
  cancelAnimationFrame(raf);iter=0;
  raf=requestAnimationFrame(function tick(){
    el.textContent=orig.split('').map((c,i)=>i<iter?c:chars[Math.floor(Math.random()*chars.length)]).join('');
    if(iter<orig.length){iter+=.3;raf=requestAnimationFrame(tick);}
    else el.textContent=orig;
  });
});`
    }
  },

  {
    folder: "cursor-trail-effect",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cursor Trail Effect</title>
<meta name="description" content="Custom cursor with glowing particle trail following the mouse.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="info">Move your cursor</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;background:#040408;cursor:none;overflow:hidden;display:grid;place-items:center;font-family:sans-serif}
.info{color:#334155;font-size:.9rem}
.cursor-dot{position:fixed;pointer-events:none;border-radius:50%;transform:translate(-50%,-50%);z-index:9999}`,
      "script.js": `const dots=[];const colors=['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#f0abfc'];
document.addEventListener('mousemove',e=>{
  const d=document.createElement('div');d.className='cursor-dot';
  const size=12;d.style.cssText='width:'+size+'px;height:'+size+'px;background:'+colors[dots.length%5]+';left:'+e.clientX+'px;top:'+e.clientY+'px;box-shadow:0 0 8px currentColor';
  document.body.appendChild(d);dots.push(d);
  if(dots.length>24)dots.shift().remove();
  d.animate([{opacity:1,transform:'translate(-50%,-50%) scale(1)'},{opacity:0,transform:'translate(-50%,-50%) scale(0)'}],{duration:500,easing:'ease-out',fill:'forwards'});
  setTimeout(()=>d.remove(),500);
});`
    }
  },

  {
    folder: "liquid-hover-background",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Liquid Hover Background</title>
<meta name="description" content="Animated liquid gradient background that responds to cursor position.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="liquid-bg" id="lbg">
  <div class="liquid-content">
    <h1>Liquid<br>Background</h1>
    <p>Move your cursor</p>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;overflow:hidden;font-family:sans-serif}
.liquid-bg{min-height:100vh;display:grid;place-items:center;
  background:radial-gradient(circle at var(--mx,50%) var(--my,50%),#6366f1 0%,#1e1b4b 30%,#0f0a1e 70%);
  transition:background .1s ease}
.liquid-content{text-align:center;color:#fff}
.liquid-content h1{font-size:3.5rem;font-weight:800;margin-bottom:12px;
  background:linear-gradient(135deg,#c4b5fd,#f0abfc);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.liquid-content p{color:#a5b4fc;font-size:1rem}
@media(prefers-reduced-motion:reduce){.liquid-bg{transition:none}}`,
      "script.js": `const bg=document.getElementById('lbg');
document.addEventListener('mousemove',e=>{
  const x=(e.clientX/window.innerWidth*100).toFixed(1);
  const y=(e.clientY/window.innerHeight*100).toFixed(1);
  bg.style.setProperty('--mx',x+'%');bg.style.setProperty('--my',y+'%');
});`
    }
  },

  {
    folder: "glitch-image-hover-effect",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Glitch Image Hover Effect</title>
<meta name="description" content="CSS RGB channel-split glitch effect on image hover.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="glitch-img" aria-label="Glitch effect preview">
  <div class="layer r"></div>
  <div class="layer g"></div>
  <div class="layer b"></div>
  <div class="content">HOVER<br>ME</div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#050505}
.glitch-img{position:relative;width:300px;height:200px;cursor:pointer;overflow:hidden;border-radius:12px}
.layer{position:absolute;inset:0;border-radius:12px;
  background:linear-gradient(135deg,#1e1b4b 0%,#4c1d95 50%,#1e1b4b 100%);
  transition:transform .1s}
.glitch-img:hover .r{transform:translate(-4px,-2px);mix-blend-mode:screen;background:linear-gradient(135deg,#ff000055,#1e1b4b)}
.glitch-img:hover .g{transform:translate(3px,3px);mix-blend-mode:screen;background:linear-gradient(135deg,#1e1b4b,#00ff0055)}
.glitch-img:hover .b{transform:translate(-2px,4px);mix-blend-mode:screen;background:linear-gradient(135deg,#0000ff55,#1e1b4b);
  animation:glitch-flick .15s steps(1) infinite}
@keyframes glitch-flick{0%{transform:translate(-2px,4px)}50%{transform:translate(4px,-3px)}100%{transform:translate(-2px,4px)}}
.content{position:absolute;inset:0;display:grid;place-items:center;color:#fff;
  font-size:2rem;font-weight:900;font-family:'Courier New',monospace;letter-spacing:.2em;z-index:2}
@media(prefers-reduced-motion:reduce){.layer,.glitch-img:hover .b{animation:none;transition:none}}`
    }
  },

  {
    folder: "scroll-reveal-text-effect",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Scroll Reveal Text Effect</title>
<meta name="description" content="Words that fade and slide into view as you scroll down the page.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="hero-space"><p>↓ Scroll down</p></div>
<div class="reveal-section">
  ${['Design','beautifully.','Build','efficiently.','Ship','confidently.'].map(w=>`<span class="reveal-word">${w}</span>`).join(' ')}
</div>
<div class="hero-space"></div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a14;font-family:sans-serif;color:#94a3b8}
.hero-space{min-height:60vh;display:grid;place-items:center;color:#374151;font-size:.9rem}
.reveal-section{min-height:40vh;display:flex;flex-wrap:wrap;gap:12px 20px;
  max-width:700px;margin:0 auto;padding:60px 24px;align-content:center}
.reveal-word{font-size:3rem;font-weight:800;color:#1e293b;
  transition:color .6s ease,transform .6s ease,opacity .6s ease;
  opacity:0;transform:translateY(20px);display:inline-block}
.reveal-word.visible{color:#f1f5f9;opacity:1;transform:translateY(0)}
.reveal-word:nth-child(2n){color:#6366f1}
.reveal-word.visible:nth-child(2n){color:#a5b4fc}
@media(prefers-reduced-motion:reduce){.reveal-word{transition:none;opacity:1;transform:none;color:#f1f5f9}}`,
      "script.js": `const words=document.querySelectorAll('.reveal-word');
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');})},{threshold:.5});
words.forEach(w=>obs.observe(w));`
    }
  },

  {
    folder: "noise-grain-texture-background",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Noise Grain Texture Background</title>
<meta name="description" content="Animated CSS noise grain texture overlay for cinematic backgrounds.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="grain-bg">
  <div class="grain-overlay"></div>
  <div class="grain-content">
    <h1>Film Grain</h1>
    <p>Cinematic texture overlay</p>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{overflow:hidden}
.grain-bg{position:relative;min-height:100vh;display:grid;place-items:center;
  background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);font-family:sans-serif}
.grain-overlay{position:absolute;inset:0;z-index:1;pointer-events:none;
  animation:grain .4s steps(1) infinite;opacity:.35}
@keyframes grain{
  0%{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")}
  25%{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")}
  50%{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")}
  75%{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")}
}
.grain-content{position:relative;z-index:2;text-align:center;color:#fff}
.grain-content h1{font-size:4rem;font-weight:800;letter-spacing:.05em;
  text-shadow:0 2px 20px #0008}
.grain-content p{color:#a5b4fc;margin-top:8px}
@media(prefers-reduced-motion:reduce){.grain-overlay{animation:none}}`
    }
  },

  {
    folder: "magnetic-field-background",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Magnetic Field Background</title>
<meta name="description" content="Canvas magnetic field particle simulation that reacts to mouse.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<canvas id="c"></canvas>
<div class="info"><h1>Magnetic Field</h1><p>Move your cursor</p></div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{overflow:hidden;background:#050510;font-family:sans-serif}
canvas{position:fixed;inset:0}
.info{position:relative;z-index:1;text-align:center;padding-top:30vh;color:#a5b4fc}
.info h1{font-size:3rem;font-weight:800;margin-bottom:8px}
.info p{color:#4c4f8a}`,
      "script.js": `const c=document.getElementById('c');const ctx=c.getContext('2d');
c.width=window.innerWidth;c.height=window.innerHeight;
window.addEventListener('resize',()=>{c.width=window.innerWidth;c.height=window.innerHeight;});
let mx=c.width/2,my=c.height/2;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
const pts=Array.from({length:60},()=>({
  x:Math.random()*c.width,y:Math.random()*c.height,
  vx:0,vy:0,
  color:'hsl('+(Math.random()*60+220)+',70%,60%)'
}));
function draw(){
  ctx.fillStyle='rgba(5,5,16,.15)';ctx.fillRect(0,0,c.width,c.height);
  pts.forEach(p=>{
    const dx=mx-p.x,dy=my-p.y;
    const dist=Math.sqrt(dx*dx+dy*dy)||1;
    const force=Math.min(2000/(dist*dist),2);
    p.vx=(p.vx+(dx/dist)*force)*.9;
    p.vy=(p.vy+(dy/dist)*force)*.9;
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>c.width)p.vx*=-1;
    if(p.y<0||p.y>c.height)p.vy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fillStyle=p.color;ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();`
    }
  },

  {
    folder: "image-reveal-hover-effect",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Image Reveal Hover Effect</title>
<meta name="description" content="Circular spotlight image reveal following the cursor on hover.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="reveal-wrap" id="rw">
  <div class="layer dark"><h2>Before</h2><p>Default state</p></div>
  <div class="layer light" id="lightLayer"><h2>Revealed</h2><p>Hover spotlight</p></div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a0a;font-family:sans-serif}
.reveal-wrap{position:relative;width:500px;height:300px;border-radius:20px;overflow:hidden;cursor:none}
.layer{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
.dark{background:linear-gradient(135deg,#0f172a,#1e1b4b);color:#334155}
.dark h2{color:#334155;font-size:2rem}
.light{background:linear-gradient(135deg,#6366f1,#a855f7,#ec4899);color:#fff;
  clip-path:circle(0px at 50% 50%);transition:clip-path .05s linear}
.light h2{font-size:2rem}`,
      "script.js": `const wrap=document.getElementById('rw');
const layer=document.getElementById('lightLayer');
wrap.addEventListener('mousemove',e=>{
  const r=wrap.getBoundingClientRect();
  const x=e.clientX-r.left,y=e.clientY-r.top;
  layer.style.clipPath='circle(80px at '+x+'px '+y+'px)';
});
wrap.addEventListener('mouseleave',()=>{layer.style.clipPath='circle(0px at 50% 50%)';});`
    }
  },

  {
    folder: "particle-explosion-hover",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Particle Explosion Hover</title>
<meta name="description" content="Canvas particle explosion effect triggered by clicking anywhere.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<canvas id="c"></canvas>
<div class="info">Click anywhere to explode</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{overflow:hidden;background:#030308;font-family:sans-serif;cursor:crosshair}
canvas{position:fixed;inset:0}
.info{position:relative;z-index:1;color:#334155;text-align:center;padding-top:45vh;font-size:.9rem}`,
      "script.js": `const c=document.getElementById('c');const ctx=c.getContext('2d');
c.width=window.innerWidth;c.height=window.innerHeight;
window.addEventListener('resize',()=>{c.width=window.innerWidth;c.height=window.innerHeight;});
const particles=[];
function explode(x,y){
  const hue=Math.random()*360;
  for(let i=0;i<60;i++){
    const angle=Math.random()*Math.PI*2;
    const speed=Math.random()*6+1;
    particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,
      r:Math.random()*4+1,a:1,color:'hsl('+hue+','+(60+Math.random()*40)+'%,'+(50+Math.random()*30)+'%)'});
  }
}
document.addEventListener('click',e=>explode(e.clientX,e.clientY));
function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.1;p.a-=.015;
    if(p.a<=0){particles.splice(i,1);continue;}
    ctx.globalAlpha=p.a;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color;ctx.fill();
  }
  ctx.globalAlpha=1;requestAnimationFrame(draw);
}
draw();`
    }
  },

  {
    folder: "background-aurora-gradient",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Background Aurora Gradient</title>
<meta name="description" content="Pure CSS animated aurora borealis gradient mesh background.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="aurora">
  <div class="a1"></div>
  <div class="a2"></div>
  <div class="a3"></div>
  <div class="a4"></div>
</div>
<div class="content">
  <h1>Aurora</h1>
  <p>Pure CSS gradient animation</p>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;background:#020c1b;overflow:hidden;font-family:sans-serif;display:grid;place-items:center}
.aurora{position:fixed;inset:0;overflow:hidden}
.aurora>div{position:absolute;border-radius:50%;filter:blur(80px);opacity:.6}
.a1{width:600px;height:600px;background:#6366f1;top:-200px;left:-100px;
  animation:drift1 12s ease-in-out infinite alternate}
.a2{width:500px;height:500px;background:#22d3ee;top:-100px;right:-100px;
  animation:drift2 10s ease-in-out infinite alternate}
.a3{width:400px;height:400px;background:#10b981;bottom:-100px;left:30%;
  animation:drift3 14s ease-in-out infinite alternate}
.a4{width:350px;height:350px;background:#a855f7;bottom:-50px;right:20%;
  animation:drift4 11s ease-in-out infinite alternate}
@keyframes drift1{to{transform:translate(100px,80px)}}
@keyframes drift2{to{transform:translate(-80px,60px)}}
@keyframes drift3{to{transform:translate(60px,-60px)}}
@keyframes drift4{to{transform:translate(-40px,-80px)}}
.content{position:relative;z-index:1;text-align:center;color:#fff}
.content h1{font-size:4rem;font-weight:800;letter-spacing:.05em}
.content p{color:#a5b4fc;margin-top:8px}
@media(prefers-reduced-motion:reduce){.aurora>div{animation:none}}`
    }
  },

  /* ─────────────────────────────────────────
     ANIMATIONS (10)
  ───────────────────────────────────────── */
  {
    folder: "morphing-shape-animation",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Morphing Shape Animation</title>
<meta name="description" content="Pure CSS SVG path morphing blob animation with gradient fill.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="morph-wrap">
  <svg class="morph-svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="mg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6366f1"/>
        <stop offset="100%" stop-color="#ec4899"/>
      </linearGradient>
    </defs>
    <path class="blob" fill="url(#mg)"/>
  </svg>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a}
.morph-wrap{width:300px;height:300px;display:grid;place-items:center}
.morph-svg{width:100%;height:100%}
.blob{animation:morph 8s ease-in-out infinite;transform-origin:center}
@keyframes morph{
  0%,100%{d:path("M100,30 C140,20 170,60 180,100 C190,140 160,175 120,185 C80,195 40,170 25,130 C10,90 30,45 60,30 C75,23 85,33 100,30Z")}
  25%{d:path("M100,25 C145,15 175,50 185,95 C195,140 170,180 125,188 C80,196 35,175 20,130 C5,85 25,40 55,28 C70,22 85,28 100,25Z")}
  50%{d:path("M100,20 C150,10 185,55 190,100 C195,145 165,185 118,192 C71,199 28,178 15,132 C2,86 22,38 55,24 C72,17 88,23 100,20Z")}
  75%{d:path("M100,28 C138,18 172,58 182,100 C192,142 162,178 120,186 C78,194 38,168 23,125 C8,82 32,42 62,28 C78,21 88,32 100,28Z")}
}
@media(prefers-reduced-motion:reduce){.blob{animation:none;d:path("M100,30 C140,20 170,60 180,100 C190,140 160,175 120,185 C80,195 40,170 25,130 C10,90 30,45 60,30 C75,23 85,33 100,30Z")}}`
    }
  },

  {
    folder: "wave-text-animation",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Wave Text Animation</title>
<meta name="description" content="Individual letter wave bounce animation with staggered delays.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1 class="wave-text" aria-label="Wave Animation">
  ${[...'Wave Animation'].map((c,i)=>c===' '?'&nbsp;':`<span style="--i:${i}">${c}</span>`).join('')}
</h1>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a14;font-family:sans-serif}
.wave-text{font-size:3rem;font-weight:800;display:flex;letter-spacing:.05em}
.wave-text span{display:inline-block;animation:wave 1.4s ease-in-out infinite;animation-delay:calc(var(--i)*0.08s);
  background:linear-gradient(135deg,#6366f1,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
@keyframes wave{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@media(prefers-reduced-motion:reduce){.wave-text span{animation:none;transform:none}}`
    }
  },

  {
    folder: "css-animated-counter",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CSS Animated Counter</title>
<meta name="description" content="Number count-up animation triggered by Intersection Observer.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="hero-stats">
  <div class="stat"><span class="count" data-target="10000">0</span><span class="unit">+</span><p>Components</p></div>
  <div class="stat"><span class="count" data-target="500">0</span><span class="unit">K</span><p>Downloads</p></div>
  <div class="stat"><span class="count" data-target="99">0</span><span class="unit">%</span><p>Satisfaction</p></div>
  <div class="stat"><span class="count" data-target="48">0</span><span class="unit">h</span><p>Support</p></div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.hero-stats{display:flex;gap:40px;flex-wrap:wrap;justify-content:center}
.stat{text-align:center}
.count{font-size:3.5rem;font-weight:800;background:linear-gradient(135deg,#6366f1,#a855f7);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent}
.unit{font-size:2rem;font-weight:700;color:#6366f1}
.stat p{color:#6b7280;font-size:.85rem;margin-top:4px;text-transform:uppercase;letter-spacing:.1em}`,
      "script.js": `function countUp(el){
  const target=+el.dataset.target;const dur=2000;const start=performance.now();
  requestAnimationFrame(function tick(now){
    const pct=Math.min((now-start)/dur,1);
    const ease=1-Math.pow(1-pct,3);
    el.textContent=Math.floor(ease*target).toLocaleString();
    if(pct<1)requestAnimationFrame(tick);
  });
}
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){countUp(e.target);obs.unobserve(e.target);}});
},{threshold:.5});
document.querySelectorAll('.count').forEach(el=>obs.observe(el));`
    }
  },

  {
    folder: "bouncing-ball-animation",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Bouncing Ball Animation</title>
<meta name="description" content="Physics-based bouncing ball CSS animation with squash and stretch.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="stage">
  <div class="ball"></div>
  <div class="shadow"></div>
  <div class="floor"></div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a}
.stage{position:relative;width:120px;height:260px}
.ball{position:absolute;width:60px;height:60px;left:50%;transform:translateX(-50%);
  background:radial-gradient(circle at 35% 35%,#a5b4fc,#6366f1);border-radius:50%;
  box-shadow:0 8px 24px #6366f155;
  animation:bounce 0.8s cubic-bezier(.4,0,1,1) infinite alternate}
@keyframes bounce{
  0%{top:10px;transform:translateX(-50%) scaleX(.9) scaleY(1.1)}
  100%{top:190px;transform:translateX(-50%) scaleX(1.15) scaleY(.85)}}
.shadow{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);
  width:60px;height:14px;border-radius:50%;background:#6366f133;
  animation:shadow .8s ease-in-out infinite alternate}
@keyframes shadow{0%{width:30px;opacity:.3}100%{width:60px;opacity:.8}}
.floor{position:absolute;bottom:0;left:-20px;right:-20px;height:4px;background:#1e293b;border-radius:2px}
@media(prefers-reduced-motion:reduce){.ball,.shadow{animation:none}}`
    }
  },

  {
    folder: "infinite-loader-animation",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Infinite Loader Animation</title>
<meta name="description" content="Smooth infinite CSS line loader animation with color cycling.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="inf-loader">
  <div class="inf-track">
    <div class="inf-fill"></div>
  </div>
  <p>Loading…</p>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#111;font-family:sans-serif}
.inf-loader{display:flex;flex-direction:column;align-items:center;gap:20px;width:300px}
.inf-track{width:100%;height:4px;background:#1f2937;border-radius:2px;overflow:hidden;position:relative}
.inf-fill{position:absolute;top:0;left:0;height:100%;border-radius:2px;
  background:linear-gradient(90deg,#6366f1,#a855f7,#ec4899,#f59e0b,#6366f1);background-size:200%;
  animation:slide 2s linear infinite,colors 4s linear infinite}
@keyframes slide{0%{left:-60%;width:60%}50%{left:30%;width:50%}100%{left:100%;width:60%}}
@keyframes colors{to{background-position:-200%}}
p{color:#6b7280;font-size:.85rem}
@media(prefers-reduced-motion:reduce){.inf-fill{animation:none;width:60%;left:20%}}`
    }
  },

  {
    folder: "stagger-fade-in-animation",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Stagger Fade-in Animation</title>
<meta name="description" content="Card grid with staggered CSS fade-in reveal on page load.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="stag-grid">
  ${Array.from({length:9},(_,i)=>`<div class="stag-card" style="--d:${i*0.1}s"><div class="stag-icon">${['⚡','🌌','🎯','💡','🔥','🌊','🪐','💎','🎨'][i]}</div><p>Item ${i+1}</p></div>`).join('')}
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif;padding:24px}
.stag-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:480px}
.stag-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:24px;
  text-align:center;opacity:0;transform:translateY(20px);
  animation:fadein .5s ease forwards;animation-delay:var(--d)}
@keyframes fadein{to{opacity:1;transform:none}}
.stag-icon{font-size:2.5rem;margin-bottom:8px}
.stag-card p{color:#6b7280;font-size:.8rem}
@media(prefers-reduced-motion:reduce){.stag-card{animation:none;opacity:1;transform:none}}`
    }
  },

  {
    folder: "liquid-morph-blob-animation",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Liquid Morph Blob Animation</title>
<meta name="description" content="Multi-blob animated morph with gooey CSS filter.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="goo-filter">
  <svg><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10"/><feColorMatrix mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"/></filter></defs></svg>
  <div class="goo-wrap">
    <div class="goo-blob g1"></div>
    <div class="goo-blob g2"></div>
    <div class="goo-blob g3"></div>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f0f1e;overflow:hidden}
svg{width:0;height:0;position:absolute}
.goo-filter{filter:url(#goo)}
.goo-wrap{position:relative;width:200px;height:200px}
.goo-blob{position:absolute;border-radius:50%}
.g1{width:100px;height:100px;background:#6366f1;top:50px;left:50px;
  animation:move1 4s ease-in-out infinite alternate}
.g2{width:80px;height:80px;background:#a855f7;top:60px;left:60px;
  animation:move2 3.5s ease-in-out infinite alternate}
.g3{width:70px;height:70px;background:#ec4899;top:70px;left:70px;
  animation:move3 5s ease-in-out infinite alternate}
@keyframes move1{to{transform:translate(-40px,-50px)}}
@keyframes move2{to{transform:translate(50px,-30px)}}
@keyframes move3{to{transform:translate(-30px,50px)}}
@media(prefers-reduced-motion:reduce){.goo-blob{animation:none}}`
    }
  },

  {
    folder: "css-particle-orbit-animation",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CSS Particle Orbit Animation</title>
<meta name="description" content="Multiple orbiting particles around a glowing core in pure CSS.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="orbit-system">
  <div class="core"></div>
  ${Array.from({length:6},(_,i)=>`<div class="orbit-ring r${i+1}"><div class="particle"></div></div>`).join('')}
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#040410}
.orbit-system{position:relative;width:300px;height:300px}
.core{position:absolute;width:30px;height:30px;border-radius:50%;
  background:#fff;box-shadow:0 0 20px #a5b4fc,0 0 40px #6366f1,0 0 60px #4f46e5;
  top:50%;left:50%;transform:translate(-50%,-50%)}
.orbit-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:50%;border:1px solid #ffffff08}
.r1{width:80px;height:80px;animation:spin 2s linear infinite}
.r2{width:120px;height:120px;animation:spin 3s linear infinite reverse}
.r3{width:160px;height:160px;animation:spin 4s linear infinite}
.r4{width:200px;height:200px;animation:spin 5s linear infinite reverse}
.r5{width:240px;height:240px;animation:spin 6s linear infinite}
.r6{width:280px;height:280px;animation:spin 8s linear infinite reverse}
.particle{position:absolute;top:-5px;left:50%;width:10px;height:10px;border-radius:50%;
  background:hsl(calc(var(--hue,220) + 30),80%,65%);transform:translateX(-50%)}
.r1 .particle{background:#6366f1;box-shadow:0 0 6px #6366f1;--hue:240}
.r2 .particle{background:#a855f7;box-shadow:0 0 6px #a855f7;--hue:270}
.r3 .particle{background:#ec4899;box-shadow:0 0 6px #ec4899;--hue:320}
.r4 .particle{background:#f59e0b;box-shadow:0 0 6px #f59e0b;--hue:40}
.r5 .particle{background:#10b981;box-shadow:0 0 6px #10b981;--hue:160}
.r6 .particle{background:#22d3ee;box-shadow:0 0 6px #22d3ee;--hue:190}
@keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.orbit-ring{animation:none}}`
    }
  },

  {
    folder: "animated-gradient-border",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Animated Gradient Border</title>
<meta name="description" content="Card with continuously rotating conic gradient animated border.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="agb-wrap">
  <div class="agb-card">
    <h2>Gradient Border</h2>
    <p>Pure CSS rotating conic gradient trick</p>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#050510;font-family:sans-serif}
.agb-wrap{position:relative;padding:3px;border-radius:20px;background:conic-gradient(from var(--angle,0deg),#6366f1,#a855f7,#ec4899,#f59e0b,#10b981,#6366f1);animation:rotate 3s linear infinite}
@property --angle{syntax:'<angle>';initial-value:0deg;inherits:false}
@keyframes rotate{to{--angle:360deg}}
.agb-card{background:#0f172a;border-radius:18px;padding:36px 48px;text-align:center}
.agb-card h2{color:#f1f5f9;font-size:1.4rem;margin-bottom:8px}
.agb-card p{color:#6b7280;font-size:.9rem}
@media(prefers-reduced-motion:reduce){.agb-wrap{animation:none}}`
    }
  },

  /* ─────────────────────────────────────────
     OTHER (10)
  ───────────────────────────────────────── */
  {
    folder: "tilt-perspective-card",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tilt Perspective Card</title>
<meta name="description" content="Mouse-tracking 3D tilt card with specular highlight.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="scene">
  <div class="tilt-card" id="tc">
    <div class="shine" id="shine"></div>
    <div class="tilt-content">
      <div class="tc-icon">🌌</div>
      <h2>Tilt Card</h2>
      <p>Move your cursor over me</p>
    </div>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a14;font-family:sans-serif;perspective:800px}
.scene{perspective:800px}
.tilt-card{position:relative;width:300px;height:380px;border-radius:20px;
  background:linear-gradient(135deg,#1e1b4b,#312e81);border:1px solid #4338ca44;
  transform-style:preserve-3d;transition:transform .1s ease;overflow:hidden;cursor:pointer}
.shine{position:absolute;inset:0;border-radius:20px;pointer-events:none;
  background:radial-gradient(circle at var(--x,50%) var(--y,50%),rgba(255,255,255,.15),transparent 60%);transition:opacity .2s}
.tilt-content{position:relative;z-index:1;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px}
.tc-icon{font-size:4rem}
.tilt-card h2{color:#f1f5f9;font-size:1.3rem}
.tilt-card p{color:#94a3b8;font-size:.85rem;text-align:center}
@media(prefers-reduced-motion:reduce){.tilt-card{transition:none}}`,
      "script.js": `const card=document.getElementById('tc');const shine=document.getElementById('shine');
card.addEventListener('mousemove',e=>{
  const r=card.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  const rx=(y-.5)*20,ry=(x-.5)*-20;
  card.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)';
  shine.style.setProperty('--x',(x*100)+'%');shine.style.setProperty('--y',(y*100)+'%');
});
card.addEventListener('mouseleave',()=>{card.style.transform='';});`
    }
  },

  {
    folder: "dev-console-easter-egg",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dev Console Easter Egg</title>
<meta name="description" content="Fun ASCII art console easter egg that triggers on the Konami code.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="page">
  <h1>🥚 Easter Egg</h1>
  <p>Type the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A</p>
  <div class="konami-hint" id="kh"></div>
  <div class="unlocked" id="unlocked" hidden>
    <div class="egg">🎉 You found it! +30 lives</div>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif;color:#94a3b8}
.page{text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px}
h1{color:#f1f5f9;font-size:2rem}
.konami-hint{font-size:1.5rem;letter-spacing:4px;height:36px}
.unlocked{margin-top:16px}
.egg{background:linear-gradient(135deg,#6366f1,#ec4899);border-radius:16px;padding:24px 40px;
  color:#fff;font-size:1.4rem;font-weight:700;animation:pop .4s cubic-bezier(.34,1.56,.64,1)}
@keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}
@media(prefers-reduced-motion:reduce){.egg{animation:none}}`,
      "script.js": `const code=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
const display={'ArrowUp':'↑','ArrowDown':'↓','ArrowLeft':'←','ArrowRight':'→','KeyB':'B','KeyA':'A'};
let pos=0;const hint=document.getElementById('kh');
document.addEventListener('keydown',e=>{
  if(e.code===code[pos]){pos++;hint.textContent=code.slice(0,pos).map(k=>display[k]).join(' ');}
  else{pos=0;hint.textContent='';}
  if(pos===code.length){document.getElementById('unlocked').removeAttribute('hidden');pos=0;hint.textContent='';}
});`
    }
  },

  {
    folder: "color-palette-generator",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Color Palette Generator</title>
<meta name="description" content="Random color palette generator with copy-to-clipboard on click.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="palette-wrap">
  <h2>Color Palette</h2>
  <p class="sub">Click a swatch to copy the hex</p>
  <div class="palette" id="palette"></div>
  <button class="gen-btn" id="genBtn">🎲 Generate</button>
  <div class="toast" id="toast"></div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#111;font-family:sans-serif}
.palette-wrap{text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px}
h2{color:#f1f5f9}.sub{color:#6b7280;font-size:.85rem}
.palette{display:flex;gap:8px}
.swatch{width:80px;height:200px;border-radius:12px;cursor:pointer;transition:transform .2s;display:flex;flex-direction:column;justify-content:flex-end;padding:8px}
.swatch:hover{transform:scaleY(1.05)}
.sw-hex{font-size:.65rem;color:rgba(255,255,255,.8);text-align:center;background:rgba(0,0,0,.3);border-radius:4px;padding:2px 0}
.gen-btn{padding:12px 28px;background:#6366f1;border:none;border-radius:10px;color:#fff;
  cursor:pointer;font-size:.95rem;font-family:sans-serif;transition:background .2s}
.gen-btn:hover{background:#4f46e5}
.toast{background:#10b981;color:#fff;padding:8px 20px;border-radius:8px;font-size:.85rem;
  opacity:0;transition:opacity .3s;position:fixed;bottom:24px;left:50%;transform:translateX(-50%)}
.toast.show{opacity:1}
@media(prefers-reduced-motion:reduce){.swatch,.toast{transition:none}}`,
      "script.js": `const palette=document.getElementById('palette');
const toast=document.getElementById('toast');
function rndHex(){return '#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0');}
function gen(){
  palette.innerHTML='';
  for(let i=0;i<5;i++){
    const c=rndHex();const s=document.createElement('div');s.className='swatch';
    s.style.background=c;s.innerHTML='<span class="sw-hex">'+c+'</span>';
    s.addEventListener('click',()=>{navigator.clipboard?.writeText(c);showToast(c+' copied!');});
    palette.appendChild(s);
  }
}
function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800);}
document.getElementById('genBtn').addEventListener('click',gen);gen();`
    }
  },

  {
    folder: "ascii-art-generator",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ASCII Art Generator</title>
<meta name="description" content="Simple ASCII art banner generator from text input.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="ascii-wrap">
  <h2>ASCII Banner</h2>
  <div class="ascii-input-row">
    <input id="aInput" type="text" value="HELLO" maxlength="8" placeholder="Type here…">
    <button id="aGen">Generate</button>
  </div>
  <pre id="aOutput" class="ascii-out"></pre>
  <button id="aCopy" class="copy-btn">Copy</button>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a0a;font-family:'Courier New',monospace}
.ascii-wrap{display:flex;flex-direction:column;align-items:center;gap:16px}
h2{color:#33ff33;font-size:1rem;letter-spacing:.2em}
.ascii-input-row{display:flex;gap:8px}
#aInput{padding:8px 12px;background:#111;border:1px solid #333;color:#33ff33;
  font-family:monospace;font-size:1rem;border-radius:6px;outline:none}
#aGen,.copy-btn{padding:8px 16px;background:#222;border:1px solid #333;color:#33ff33;cursor:pointer;border-radius:6px;font-family:monospace;transition:background .2s}
#aGen:hover,.copy-btn:hover{background:#333}
.ascii-out{color:#33ff33;font-size:.65rem;line-height:1.1;background:#050505;padding:16px;border-radius:8px;border:1px solid #1a1a1a;white-space:pre;overflow-x:auto;min-width:400px}
@media(prefers-reduced-motion:reduce){#aGen,.copy-btn{transition:none}}`,
      "script.js": `const chars={
  A:['  ██  ',' ████ ','██  ██','██████','██  ██'],B:['█████ ','██  ██','█████ ','██  ██','█████ '],
  C:[' █████','██    ','██    ','██    ',' █████'],D:['████  ','██ ██ ','██  ██','██  ██','████  '],
  E:['██████','██    ','█████ ','██    ','██████'],F:['██████','██    ','█████ ','██    ','██    '],
  G:[' █████','██    ','██ ███','██  ██',' █████'],H:['██  ██','██  ██','██████','██  ██','██  ██'],
  I:['██████','  ██  ','  ██  ','  ██  ','██████'],J:['██████','   ██ ','   ██ ','██ ██ ',' ████ '],
  K:['██  ██','██ ██ ','████  ','██ ██ ','██  ██'],L:['██    ','██    ','██    ','██    ','██████'],
  M:['██  ██','██████','██████','██  ██','██  ██'],N:['██  ██','███ ██','██████','██ ███','██  ██'],
  O:[' ████ ','██  ██','██  ██','██  ██',' ████ '],P:['█████ ','██  ██','█████ ','██    ','██    '],
  Q:[' ████ ','██  ██','██ ███','██ ██ ',' ██ █ '],R:['█████ ','██  ██','█████ ','██ ██ ','██  ██'],
  S:[' █████','██    ',' ████ ','    ██','█████ '],T:['██████','  ██  ','  ██  ','  ██  ','  ██  '],
  U:['██  ██','██  ██','██  ██','██  ██',' ████ '],V:['██  ██','██  ██','██  ██',' ████ ','  ██  '],
  W:['██  ██','██  ██','██████','██████','██  ██'],X:['██  ██',' ████ ','  ██  ',' ████ ','██  ██'],
  Y:['██  ██',' ████ ','  ██  ','  ██  ','  ██  '],Z:['██████','   ██ ','  ██  ',' ██   ','██████'],
  '0':[' ████ ','██  ██','██  ██','██  ██',' ████ '],'1':['  ██  ',' ███  ','  ██  ','  ██  ','██████'],
  '!':[' ██ ','  ██  ','  ██  ','      ','  ██  '],' ':['      ','      ','      ','      ','      '],
};
function render(text){
  const rows=['','','','',''];
  text.toUpperCase().split('').forEach(c=>{
    const g=chars[c]||chars[' '];
    g.forEach((row,i)=>{rows[i]+=row+' ';});
  });
  return rows.join('\n');
}
const inp=document.getElementById('aInput');
const out=document.getElementById('aOutput');
document.getElementById('aGen').addEventListener('click',()=>{out.textContent=render(inp.value);});
document.getElementById('aCopy').addEventListener('click',()=>{navigator.clipboard?.writeText(out.textContent);});
out.textContent=render('HELLO');`
    }
  },

  {
    folder: "pomodoro-timer-widget",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pomodoro Timer Widget</title>
<meta name="description" content="Minimal Pomodoro productivity timer with work/break cycle tracking.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="pomo">
  <div class="pomo-mode" id="modeLabel">Work</div>
  <svg class="pomo-ring" viewBox="0 0 120 120">
    <circle class="ring-bg" cx="60" cy="60" r="52"/>
    <circle class="ring-fill" cx="60" cy="60" r="52" id="ringFill"/>
  </svg>
  <div class="pomo-time" id="pomoTime">25:00</div>
  <div class="pomo-controls">
    <button id="pStart">▶</button>
    <button id="pReset">↺</button>
    <button id="pSkip">⏭</button>
  </div>
  <div class="pomo-sessions">Session <span id="sess">1</span>/4</div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.pomo{display:flex;flex-direction:column;align-items:center;gap:16px;position:relative}
.pomo-mode{color:#6b7280;font-size:.85rem;text-transform:uppercase;letter-spacing:.15em}
.pomo-ring{width:200px;height:200px;transform:rotate(-90deg)}
.ring-bg{fill:none;stroke:#1e293b;stroke-width:8}
.ring-fill{fill:none;stroke:#6366f1;stroke-width:8;stroke-linecap:round;stroke-dasharray:326.7;
  stroke-dashoffset:0;transition:stroke-dashoffset .5s linear,stroke .3s}
.pomo-time{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) translateY(8px);
  font-size:2.2rem;font-weight:700;color:#f1f5f9;letter-spacing:.05em}
.pomo-controls{display:flex;gap:12px}
.pomo-controls button{width:44px;height:44px;border-radius:50%;border:1px solid #334155;
  background:#1e293b;color:#f1f5f9;cursor:pointer;font-size:1rem;transition:background .2s}
.pomo-controls button:hover{background:#334155}
.pomo-sessions{color:#6b7280;font-size:.8rem}
@media(prefers-reduced-motion:reduce){.ring-fill{transition:none}}`,
      "script.js": `const modes=[{label:'Work',dur:25*60,color:'#6366f1'},{label:'Break',dur:5*60,color:'#10b981'}];
let modeIdx=0,session=1,remaining=modes[0].dur,running=false,timer;
const circ=326.7;
const timeEl=document.getElementById('pomoTime');const modeEl=document.getElementById('modeLabel');
const ring=document.getElementById('ringFill');const sessEl=document.getElementById('sess');
function fmt(s){return Math.floor(s/60)+':'+(s%60+'').padStart(2,'0');}
function update(){
  const m=modes[modeIdx];const pct=remaining/m.dur;
  timeEl.textContent=fmt(remaining);
  ring.style.strokeDashoffset=circ*(1-pct);ring.style.stroke=m.color;
  modeEl.textContent=m.label;sessEl.textContent=session;
}
document.getElementById('pStart').addEventListener('click',function(){
  if(running){clearInterval(timer);running=false;this.textContent='▶';}
  else{timer=setInterval(()=>{if(--remaining<=0)skip();update();},1000);running=true;this.textContent='⏸';}
});
document.getElementById('pReset').addEventListener('click',()=>{clearInterval(timer);running=false;
  remaining=modes[modeIdx].dur;document.getElementById('pStart').textContent='▶';update();});
document.getElementById('pSkip').addEventListener('click',skip);
function skip(){clearInterval(timer);running=false;document.getElementById('pStart').textContent='▶';
  modeIdx=(modeIdx+1)%2;if(modeIdx===0)session=Math.min(session+1,4);remaining=modes[modeIdx].dur;update();}
update();`
    }
  },

  {
    folder: "keyboard-shortcut-display",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Keyboard Shortcut Display</title>
<meta name="description" content="Interactive keyboard shortcut reference card with key press highlight.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="kb-wrap">
  <h2>Keyboard Shortcuts</h2>
  <div class="shortcuts">
    ${[
      [['⌘','K'],'Command palette'],
      [['⌘','P'],'Quick open'],
      [['⌘','⇧','P'],'Run command'],
      [['⌘','B'],'Toggle sidebar'],
      [['⌘','/'],'Toggle comment'],
    ].map(([keys,desc])=>`<div class="shortcut"><div class="keys">${keys.map(k=>`<kbd>${k}</kbd>`).join('<span>+</span>')}</div><span class="desc">${desc}</span></div>`).join('')}
  </div>
  <p class="hint" id="kbHint">Press any key to highlight</p>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.kb-wrap{background:#1e293b;border-radius:20px;padding:28px;width:380px;border:1px solid #334155}
h2{color:#f1f5f9;margin-bottom:20px;font-size:1rem}
.shortcuts{display:flex;flex-direction:column;gap:10px}
.shortcut{display:flex;align-items:center;justify-content:space-between;
  padding:10px;border-radius:8px;transition:background .15s}
.shortcut:hover{background:#334155}
.keys{display:flex;align-items:center;gap:4px}
kbd{background:#0f172a;border:1px solid #334155;border-bottom-width:3px;border-radius:6px;
  padding:4px 10px;color:#94a3b8;font-family:monospace;font-size:.8rem;transition:all .15s}
kbd.active{border-color:#6366f1;color:#a5b4fc;box-shadow:0 0 8px #6366f155}
.keys span{color:#475569;font-size:.75rem}
.desc{color:#64748b;font-size:.85rem}
.hint{margin-top:16px;color:#334155;font-size:.75rem;text-align:center}
@media(prefers-reduced-motion:reduce){.shortcut,kbd{transition:none}}`,
      "script.js": `const hint=document.getElementById('kbHint');
document.addEventListener('keydown',e=>{
  document.querySelectorAll('kbd').forEach(k=>{
    if(k.textContent.trim()===e.key||
       (e.key==='Meta'&&k.textContent==='⌘')||
       (e.key==='Shift'&&k.textContent==='⇧')){k.classList.add('active');}
  });
  hint.textContent='Key: '+e.key;
});
document.addEventListener('keyup',()=>{document.querySelectorAll('kbd').forEach(k=>k.classList.remove('active'));});`
    }
  },

  {
    folder: "markdown-preview-live",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Markdown Preview Live</title>
<meta name="description" content="Split-pane live Markdown editor and preview panel.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="md-wrap">
  <div class="md-pane editor-pane">
    <div class="pane-header"><span>📝 Markdown</span></div>
    <textarea id="mdInput" spellcheck="false"># Hello World

## Features
- **Bold text**
- *Italic text*
- \`inline code\`

> A blockquote here

\`\`\`
const x = 42;
\`\`\`</textarea>
  </div>
  <div class="md-pane preview-pane">
    <div class="pane-header"><span>👁️ Preview</span></div>
    <div class="md-preview" id="mdPreview"></div>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;background:#0f172a;font-family:sans-serif;display:flex;flex-direction:column}
.md-wrap{display:flex;flex:1;min-height:100vh;gap:1px;background:#1e293b}
.md-pane{display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden}
.pane-header{padding:10px 16px;background:#1e293b;color:#6b7280;font-size:.8rem;
  border-bottom:1px solid #334155;flex-shrink:0}
textarea{flex:1;resize:none;background:#0f172a;border:none;outline:none;color:#94a3b8;
  font-family:'Courier New',monospace;font-size:.85rem;padding:16px;line-height:1.6;min-height:400px}
.md-preview{flex:1;padding:20px;color:#cbd5e1;line-height:1.7;overflow-y:auto;min-height:400px}
.md-preview h1,.md-preview h2,.md-preview h3{color:#f1f5f9;margin:16px 0 8px}
.md-preview code{background:#1e293b;color:#a5b4fc;padding:2px 6px;border-radius:4px;font-size:.85em}
.md-preview pre{background:#1e293b;border-radius:8px;padding:16px;margin:12px 0;overflow-x:auto}
.md-preview pre code{background:none;padding:0}
.md-preview blockquote{border-left:3px solid #6366f1;padding-left:16px;color:#94a3b8;margin:12px 0}
.md-preview ul,.md-preview ol{padding-left:20px}
.md-preview a{color:#6366f1}`,
      "script.js": `const inp=document.getElementById('mdInput');const prev=document.getElementById('mdPreview');
function parse(md){
  return md.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/\`\`\`([\s\S]*?)\`\`\`/g,'<pre><code>$1</code></pre>').replace(/\`(.+?)\`/g,'<code>$1</code>')
    .replace(/^> (.+)$/gm,'<blockquote>$1</blockquote>').replace(/^- (.+)$/gm,'<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s,'<ul>$1</ul>').replace(/\n\n/g,'<br>');
}
inp.addEventListener('input',()=>prev.innerHTML=parse(inp.value));
prev.innerHTML=parse(inp.value);`
    }
  },

  {
    folder: "url-qr-code-generator",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>URL QR Code Generator</title>
<meta name="description" content="Canvas-drawn QR code generator for URLs using the QR Server API.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="qr-card">
  <h2>QR Generator</h2>
  <div class="qr-input-row">
    <input type="url" id="qrUrl" placeholder="https://example.com" value="https://github.com">
    <button id="qrGen">Generate</button>
  </div>
  <div class="qr-preview" id="qrPreview">
    <img id="qrImg" src="" alt="QR Code" hidden>
    <p class="qr-hint" id="qrHint">Click generate to create QR</p>
  </div>
  <button class="dl-btn" id="dlBtn" hidden>⬇️ Download</button>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.qr-card{background:#1e293b;border-radius:20px;padding:28px;width:340px;border:1px solid #334155;
  display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center}
h2{color:#f1f5f9;font-size:1rem}
.qr-input-row{display:flex;gap:8px;width:100%}
#qrUrl{flex:1;padding:10px 12px;background:#0f172a;border:2px solid #334155;border-radius:8px;
  color:#f1f5f9;outline:none;font-family:sans-serif;transition:border-color .2s}
#qrUrl:focus{border-color:#6366f1}
#qrGen,.dl-btn{padding:10px 14px;background:#6366f1;border:none;border-radius:8px;color:#fff;
  cursor:pointer;font-family:sans-serif;transition:background .2s;white-space:nowrap}
#qrGen:hover,.dl-btn:hover{background:#4f46e5}
.qr-preview{background:#fff;border-radius:12px;width:200px;height:200px;display:grid;place-items:center}
#qrImg{width:180px;height:180px}
.qr-hint{color:#9ca3af;font-size:.8rem;padding:16px}
@media(prefers-reduced-motion:reduce){#qrUrl,#qrGen,.dl-btn{transition:none}}`,
      "script.js": `const genBtn=document.getElementById('qrGen');
const urlIn=document.getElementById('qrUrl');
const img=document.getElementById('qrImg');
const hint=document.getElementById('qrHint');
const dlBtn=document.getElementById('dlBtn');
genBtn.addEventListener('click',()=>{
  const url=urlIn.value.trim();if(!url)return;
  const api='https://api.qrserver.com/v1/create-qr-code/?size=180x180&data='+encodeURIComponent(url);
  img.src=api;img.hidden=false;hint.hidden=true;dlBtn.removeAttribute('hidden');
});
dlBtn.addEventListener('click',()=>{const a=document.createElement('a');a.href=img.src;a.download='qrcode.png';a.click();});`
    }
  },

  {
    folder: "theme-switcher-multi",
    files: {
      "index.html": `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Multi Theme Switcher</title>
<meta name="description" content="Multi-theme color switcher with CSS custom properties and smooth transition.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="theme-demo">
  <div class="theme-bar" id="themeBar">
    ${['dark','light','ocean','forest','candy'].map(t=>`<button class="theme-btn${t==='dark'?' active':''}" data-theme="${t}">${{dark:'🌑 Dark',light:'☀️ Light',ocean:'🌊 Ocean',forest:'🌲 Forest',candy:'🍭 Candy'}[t]}</button>`).join('')}
  </div>
  <div class="demo-card">
    <h2>Theme Preview</h2>
    <p>Watch colors change across the entire page.</p>
    <button class="demo-btn">Action Button</button>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0f172a;--surface:#1e293b;--border:#334155;--text:#f1f5f9;--muted:#94a3b8;--accent:#6366f1}
[data-theme=light]{--bg:#f8fafc;--surface:#fff;--border:#e2e8f0;--text:#0f172a;--muted:#64748b;--accent:#6366f1}
[data-theme=ocean]{--bg:#0c1e3c;--surface:#0f2545;--border:#1d4ed8;--text:#e0f2fe;--muted:#7dd3fc;--accent:#38bdf8}
[data-theme=forest]{--bg:#052e16;--surface:#14532d;--border:#166534;--text:#dcfce7;--muted:#86efac;--accent:#22c55e}
[data-theme=candy]{--bg:#2d0036;--surface:#4a0050;--border:#9333ea;--text:#fce7f3;--muted:#f0abfc;--accent:#e879f9}
html{transition:all .4s ease}
body{min-height:100vh;background:var(--bg);display:grid;place-items:center;font-family:sans-serif;transition:background .4s}
.theme-demo{display:flex;flex-direction:column;align-items:center;gap:24px}
.theme-bar{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.theme-btn{padding:8px 16px;border-radius:50px;border:1px solid var(--border);background:var(--surface);
  color:var(--muted);cursor:pointer;font-family:sans-serif;font-size:.8rem;transition:all .2s}
.theme-btn.active,.theme-btn:hover{background:var(--accent);color:#fff;border-color:var(--accent)}
.demo-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:28px;
  width:300px;text-align:center;transition:all .4s}
.demo-card h2{color:var(--text);margin-bottom:8px}
.demo-card p{color:var(--muted);font-size:.9rem;margin-bottom:20px}
.demo-btn{padding:12px 28px;background:var(--accent);border:none;border-radius:10px;color:#fff;
  cursor:pointer;font-family:sans-serif;transition:opacity .2s}
.demo-btn:hover{opacity:.85}
@media(prefers-reduced-motion:reduce){html,body,.demo-card,.theme-btn{transition:none}}`,
      "script.js": `document.querySelectorAll('.theme-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.documentElement.setAttribute('data-theme',btn.dataset.theme);
    document.querySelectorAll('.theme-btn').forEach(b=>b.classList.toggle('active',b===btn));
  });
});`
    }
  },

  {
    folder: "notification-toast-system",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Notification Toast System</title>
<meta name="description" content="Stacking notification toast system with different types and auto-dismiss.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="demo-btns">
  <button class="trigger" data-type="success">✅ Success</button>
  <button class="trigger" data-type="error">❌ Error</button>
  <button class="trigger" data-type="warning">⚠️ Warning</button>
  <button class="trigger" data-type="info">ℹ️ Info</button>
</div>
<div class="toast-stack" id="stack"></div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.demo-btns{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.trigger{padding:10px 20px;border:none;border-radius:8px;background:#1e293b;color:#94a3b8;
  cursor:pointer;font-family:sans-serif;border:1px solid #334155;transition:all .2s}
.trigger:hover{background:#334155;color:#f1f5f9}
.toast-stack{position:fixed;top:20px;right:20px;display:flex;flex-direction:column;gap:8px;z-index:999;min-width:280px}
.toast{padding:14px 16px;border-radius:12px;color:#fff;font-size:.875rem;
  display:flex;align-items:flex-start;gap:10px;box-shadow:0 8px 24px #0008;
  animation:slideIn .35s cubic-bezier(.34,1.56,.64,1);max-width:320px}
.toast.removing{animation:slideOut .3s ease forwards}
.toast-success{background:#065f46;border:1px solid #059669}
.toast-error{background:#7f1d1d;border:1px solid #dc2626}
.toast-warning{background:#78350f;border:1px solid #d97706}
.toast-info{background:#1e3a5f;border:1px solid #3b82f6}
.toast-icon{font-size:1.1rem;flex-shrink:0}
.toast-body strong{display:block;margin-bottom:2px}
.toast-body span{opacity:.8;font-size:.8rem}
.toast-close{margin-left:auto;background:none;border:none;color:#fff;cursor:pointer;opacity:.6;font-size:1rem}
.toast-close:hover{opacity:1}
@keyframes slideIn{from{transform:translateX(120%);opacity:0}to{transform:none;opacity:1}}
@keyframes slideOut{to{transform:translateX(120%);opacity:0;height:0;padding:0;margin:0}}
@media(prefers-reduced-motion:reduce){.toast,.toast.removing{animation:none}}`,
      "script.js": `const msgs={success:['Saved!','Your changes have been saved.'],error:['Error!','Something went wrong.'],warning:['Warning','Please review your input.'],info:['Info','New update available.']};
const icons={success:'✅',error:'❌',warning:'⚠️',info:'ℹ️'};
document.querySelectorAll('.trigger').forEach(btn=>btn.addEventListener('click',()=>toast(btn.dataset.type)));
function toast(type){
  const [title,sub]=msgs[type];const t=document.createElement('div');
  t.className='toast toast-'+type;
  t.innerHTML='<span class="toast-icon">'+icons[type]+'</span><div class="toast-body"><strong>'+title+'</strong><span>'+sub+'</span></div><button class="toast-close">✕</button>';
  document.getElementById('stack').prepend(t);
  t.querySelector('.toast-close').onclick=()=>remove(t);
  setTimeout(()=>remove(t),4000);
}
function remove(t){t.classList.add('removing');setTimeout(()=>t.remove(),300);}`
    }
  },

];

let count = 0;
for (const comp of components) {
  await write(comp.folder, comp.files);
  count++;
}
console.log(`Part 2 complete: ${count} components created.`);
