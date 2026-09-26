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
     LOADERS (10)
  ───────────────────────────────────────── */
  {
    folder: "dna-helix-loader",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DNA Helix Loader</title>
<meta name="description" content="Pure CSS double-helix DNA strand loading animation.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="scene">
  <div class="helix">
    ${Array.from({length:12},(_,i)=>`<div class="pair" style="--i:${i}"><span class="dot a"></span><span class="dot b"></span></div>`).join('\n    ')}
  </div>
</div>
</body>
</html>`,
      "styles.css": `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0d0d1a}
.scene{perspective:400px}
.helix{position:relative;width:80px;height:240px;transform-style:preserve-3d}
.pair{position:absolute;width:100%;display:flex;justify-content:space-between;align-items:center;
  top:calc(var(--i)*20px);animation:spin 2s linear infinite;animation-delay:calc(var(--i)*-0.16s)}
.dot{width:16px;height:16px;border-radius:50%}
.dot.a{background:#00ffe5;box-shadow:0 0 8px #00ffe5}
.dot.b{background:#ff3cac;box-shadow:0 0 8px #ff3cac}
.pair::after{content:'';position:absolute;left:18px;right:18px;height:2px;
  background:linear-gradient(90deg,#00ffe5,#ff3cac);opacity:.6}
@keyframes spin{from{transform:rotateY(0deg)}to{transform:rotateY(360deg)}}
@media(prefers-reduced-motion:reduce){.pair{animation:none;transform:rotateY(calc(var(--i)*30deg))}}`
    }
  },

  {
    folder: "pulse-ring-sonar-loader",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pulse Ring Sonar Loader</title>
<meta name="description" content="Expanding sonar pulse rings CSS loader.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="sonar">
  <div class="ring" style="--d:0s"></div>
  <div class="ring" style="--d:.4s"></div>
  <div class="ring" style="--d:.8s"></div>
  <div class="ring" style="--d:1.2s"></div>
  <div class="core"></div>
</div>
</body>
</html>`,
      "styles.css": `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#060a12}
.sonar{position:relative;width:120px;height:120px}
.ring{position:absolute;inset:0;border-radius:50%;border:2px solid #22d3ee;
  animation:pulse 2s ease-out infinite;animation-delay:var(--d);opacity:0}
@keyframes pulse{0%{transform:scale(.2);opacity:.8}100%{transform:scale(1.6);opacity:0}}
.core{position:absolute;inset:40px;border-radius:50%;background:#22d3ee;box-shadow:0 0 20px #22d3ee}
@media(prefers-reduced-motion:reduce){.ring{animation:none;opacity:.3;transform:scale(1)}}`
    }
  },

  {
    folder: "liquid-blob-loader",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Liquid Blob Loader</title>
<meta name="description" content="Gooey CSS morphing blob preloader animation.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="wrap">
  <div class="blob"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f0f1e;filter:blur(0)}
.wrap{display:flex;gap:0;filter:url(#goo);width:120px;height:60px;position:relative}
.blob{width:50px;height:50px;border-radius:50%;background:#a78bfa;position:absolute;
  top:5px;animation:move 1.6s ease-in-out infinite alternate}
.b2{animation-delay:.4s;background:#818cf8}
.b3{animation-delay:.8s;background:#60a5fa}
@keyframes move{0%{transform:translateX(0)}100%{transform:translateX(70px)}}
@media(prefers-reduced-motion:reduce){.blob{animation:none}}`
    }
  },

  {
    folder: "terminal-cursor-loader",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Terminal Cursor Loader</title>
<meta name="description" content="Retro terminal blinking cursor loading text effect.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="terminal">
  <span class="prompt">$ </span>
  <span class="text">Loading system</span>
  <span class="dots"><span>.</span><span>.</span><span>.</span></span>
  <span class="cursor">▋</span>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a0a;font-family:'Courier New',monospace}
.terminal{color:#33ff33;font-size:1.4rem;display:flex;align-items:center;gap:.1em}
.prompt{color:#ff5f57}
.dots span{animation:fade 1.5s ease infinite;opacity:0}
.dots span:nth-child(1){animation-delay:.3s}
.dots span:nth-child(2){animation-delay:.6s}
.dots span:nth-child(3){animation-delay:.9s}
@keyframes fade{0%,100%{opacity:0}50%{opacity:1}}
.cursor{animation:blink .7s step-end infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@media(prefers-reduced-motion:reduce){.dots span,.cursor{animation:none;opacity:1}}`
    }
  },

  {
    folder: "quantum-spin-loader",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Quantum Spin Loader</title>
<meta name="description" content="Three concentric CSS orbiting rings quantum loader.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="atom">
  <div class="ring r1"></div>
  <div class="ring r2"></div>
  <div class="ring r3"></div>
  <div class="nucleus"></div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#050510}
.atom{position:relative;width:120px;height:120px}
.ring{position:absolute;border-radius:50%;border:2px solid transparent;top:50%;left:50%;
  transform:translate(-50%,-50%)}
.r1{width:120px;height:40px;border-top-color:#f472b6;border-bottom-color:#f472b6;
  animation:spin1 1.5s linear infinite}
.r2{width:120px;height:40px;border-top-color:#818cf8;border-bottom-color:#818cf8;
  transform:translate(-50%,-50%) rotateY(60deg);animation:spin1 2s linear infinite reverse}
.r3{width:120px;height:40px;border-top-color:#34d399;border-bottom-color:#34d399;
  transform:translate(-50%,-50%) rotateY(120deg);animation:spin1 2.5s linear infinite}
.nucleus{position:absolute;width:18px;height:18px;border-radius:50%;
  background:#fff;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 15px #fff}
@keyframes spin1{to{transform:translate(-50%,-50%) rotateZ(360deg)}}
@media(prefers-reduced-motion:reduce){.ring{animation:none}}`
    }
  },

  {
    folder: "neon-bar-equalizer-loader",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Neon Bar Equalizer Loader</title>
<meta name="description" content="Neon glowing equalizer bars preloader animation.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="eq">
  ${Array.from({length:8},(_,i)=>`<div class="bar" style="--d:${i*0.12}s;--h:${30+Math.round(Math.random()*50)}px"></div>`).join('\n  ')}
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#000}
.eq{display:flex;align-items:flex-end;gap:6px;height:80px}
.bar{width:10px;height:var(--h,40px);border-radius:4px 4px 0 0;
  background:linear-gradient(to top,#ff3cac,#784ba0,#2b86c5);
  box-shadow:0 0 8px #ff3cac;
  animation:beat .8s ease-in-out infinite alternate;animation-delay:var(--d)}
@keyframes beat{0%{transform:scaleY(.2)}100%{transform:scaleY(1)}}
@media(prefers-reduced-motion:reduce){.bar{animation:none;transform:scaleY(1)}}`
    }
  },

  {
    folder: "metaball-skeleton-loader",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Metaball Skeleton Loader</title>
<meta name="description" content="Modern skeleton shimmer card loader with gradient sweep.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="skeleton-card">
  <div class="sk-avatar"></div>
  <div class="sk-lines">
    <div class="sk-line wide"></div>
    <div class="sk-line medium"></div>
    <div class="sk-line short"></div>
    <div class="sk-line wide"></div>
    <div class="sk-line medium"></div>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#111827}
.skeleton-card{background:#1f2937;border-radius:16px;padding:24px;display:flex;gap:16px;width:340px}
.sk-avatar{width:64px;height:64px;border-radius:50%;flex-shrink:0;background:#374151;overflow:hidden}
.sk-lines{flex:1;display:flex;flex-direction:column;gap:10px;justify-content:center}
.sk-line{height:12px;border-radius:6px;background:#374151;overflow:hidden}
.sk-line.wide{width:100%}.sk-line.medium{width:70%}.sk-line.short{width:45%}
.sk-avatar,.sk-line{position:relative}
.sk-avatar::after,.sk-line::after{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent 0%,#4b556340 50%,transparent 100%);
  animation:shimmer 1.5s infinite}
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@media(prefers-reduced-motion:reduce){.sk-avatar::after,.sk-line::after{animation:none}}`
    }
  },

  {
    folder: "circular-progress-loader",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Circular Progress Loader</title>
<meta name="description" content="SVG circular progress spinner with gradient stroke.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="wrap">
  <svg class="ring" viewBox="0 0 100 100">
    <circle class="track" cx="50" cy="50" r="42"/>
    <circle class="progress" cx="50" cy="50" r="42"/>
  </svg>
  <span class="label">Loading…</span>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#111}
.wrap{position:relative;width:120px;height:120px}
.ring{width:120px;height:120px;transform:rotate(-90deg)}
.track{fill:none;stroke:#1f2937;stroke-width:10}
.progress{fill:none;stroke:url(#g);stroke-width:10;stroke-linecap:round;
  stroke-dasharray:264;stroke-dashoffset:264;animation:fill 2s linear infinite}
@keyframes fill{0%{stroke-dashoffset:264}70%{stroke-dashoffset:30}100%{stroke-dashoffset:264}}
.label{position:absolute;inset:0;display:grid;place-items:center;color:#e5e7eb;font-size:.75rem;font-family:sans-serif}
svg{overflow:visible}
@media(prefers-reduced-motion:reduce){.progress{animation:none;stroke-dashoffset:100}}`
    }
  },

  {
    folder: "wifi-signal-preloader",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>WiFi Signal Preloader</title>
<meta name="description" content="Animated WiFi signal arc bars loading indicator.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="wifi">
  <div class="arc a4"></div>
  <div class="arc a3"></div>
  <div class="arc a2"></div>
  <div class="arc a1"></div>
  <div class="dot"></div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0d1117}
.wifi{position:relative;width:80px;height:60px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end}
.arc{position:absolute;border-radius:50% 50% 0 0 / 100% 100% 0 0;border:3px solid transparent;
  border-top-color:#38bdf8;animation:glow 2s ease-in-out infinite}
.a1{width:16px;height:8px;bottom:12px;animation-delay:0s}
.a2{width:32px;height:16px;bottom:12px;animation-delay:.3s}
.a3{width:50px;height:25px;bottom:12px;animation-delay:.6s}
.a4{width:68px;height:34px;bottom:12px;animation-delay:.9s}
.dot{width:8px;height:8px;border-radius:50%;background:#38bdf8;box-shadow:0 0 8px #38bdf8}
@keyframes glow{0%,100%{opacity:.2}50%{opacity:1;border-top-color:#38bdf8}}
@media(prefers-reduced-motion:reduce){.arc{animation:none;opacity:.8;border-top-color:#38bdf8}}`
    }
  },

  {
    folder: "hourglass-sand-loader",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hourglass Sand Loader</title>
<meta name="description" content="CSS animated hourglass with falling sand particles.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="hourglass">
  <div class="glass top"></div>
  <div class="neck"></div>
  <div class="glass bot"></div>
  <div class="sand-stream"></div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#1a1a2e}
.hourglass{position:relative;width:70px;height:130px;animation:flip 4s ease-in-out infinite}
@keyframes flip{0%,45%{transform:none}50%,95%{transform:rotate(180deg)}}
.glass{width:70px;height:50px;background:linear-gradient(180deg,#f59e0b99 0%,transparent 100%);
  clip-path:polygon(0 0,100% 0,75% 100%,25% 100%);position:absolute}
.glass.top{top:0}
.glass.bot{bottom:0;background:linear-gradient(0deg,#f59e0b 0%,#f59e0b40 100%);clip-path:polygon(25% 0,75% 0,100% 100%,0 100%)}
.neck{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:6px;height:30px;background:#f59e0b99}
.sand-stream{position:absolute;top:50px;left:50%;transform:translateX(-50%);width:2px;height:30px;
  background:linear-gradient(180deg,#fbbf24,transparent);animation:stream 4s ease-in-out infinite}
@keyframes stream{0%,50%{opacity:1}49%,51%,100%{opacity:0}}
@media(prefers-reduced-motion:reduce){.hourglass{animation:none}.sand-stream{animation:none;opacity:1}}`
    }
  },

  /* ─────────────────────────────────────────
     BUTTONS (10)
  ───────────────────────────────────────── */
  {
    folder: "glitch-neon-button",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Glitch Neon Button</title>
<meta name="description" content="Neon glitch effect button with RGB channel shift on hover.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<button class="glitch-btn" data-text="EXECUTE">EXECUTE</button>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#000;font-family:'Courier New',monospace}
.glitch-btn{position:relative;padding:16px 48px;font-size:1.1rem;letter-spacing:.2em;
  border:2px solid #0ff;background:transparent;color:#0ff;cursor:pointer;
  text-transform:uppercase;overflow:hidden;transition:background .2s}
.glitch-btn:hover{background:#0ff1;box-shadow:0 0 20px #0ff,inset 0 0 20px #0ff2}
.glitch-btn::before,.glitch-btn::after{content:attr(data-text);position:absolute;
  inset:0;display:flex;align-items:center;justify-content:center;opacity:0}
.glitch-btn:hover::before{color:#f0f;opacity:.8;animation:glitch-r .3s infinite}
.glitch-btn:hover::after{color:#ff0;opacity:.6;animation:glitch-l .3s infinite .15s}
@keyframes glitch-r{0%{clip-path:inset(20% 0 60% 0);transform:translateX(4px)}
  50%{clip-path:inset(60% 0 10% 0);transform:translateX(-4px)}100%{clip-path:inset(40% 0 30% 0);transform:translateX(3px)}}
@keyframes glitch-l{0%{clip-path:inset(10% 0 70% 0);transform:translateX(-3px)}
  50%{clip-path:inset(50% 0 20% 0);transform:translateX(3px)}100%{clip-path:inset(70% 0 5% 0);transform:translateX(-2px)}}
@media(prefers-reduced-motion:reduce){.glitch-btn::before,.glitch-btn::after{animation:none}}`
    }
  },

  {
    folder: "magnetic-hover-button",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Magnetic Hover Button</title>
<meta name="description" content="Button that magnetically follows the cursor on hover.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<button class="mag-btn" id="magBtn"><span>Attract Me</span></button>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f0f23}
.mag-btn{padding:18px 52px;font-size:1.1rem;border:none;border-radius:50px;
  background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;cursor:pointer;
  font-family:sans-serif;transition:transform .1s ease,box-shadow .3s;
  box-shadow:0 8px 32px #667eea55;letter-spacing:.05em}
.mag-btn:hover{box-shadow:0 12px 40px #667eea88}`,
      "script.js": `const btn = document.getElementById('magBtn');
btn.addEventListener('mousemove', e => {
  const r = btn.getBoundingClientRect();
  const x = e.clientX - r.left - r.width/2;
  const y = e.clientY - r.top - r.height/2;
  btn.style.transform = \`translate(\${x*.3}px,\${y*.3}px)\`;
});
btn.addEventListener('mouseleave', () => {
  btn.style.transform = '';
});`
    }
  },

  {
    folder: "countdown-submit-button",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Countdown Submit Button</title>
<meta name="description" content="Submit button with animated countdown progress arc before submission.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<button class="cd-btn" id="cdBtn">
  <svg class="cd-ring" viewBox="0 0 48 48">
    <circle class="track" cx="24" cy="24" r="20"/>
    <circle class="arc" cx="24" cy="24" r="20" id="arc"/>
  </svg>
  <span id="cdLabel">Hold to Submit</span>
</button>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.cd-btn{position:relative;padding:18px 52px;font-size:1rem;border:2px solid #3b82f6;
  border-radius:50px;background:transparent;color:#93c5fd;cursor:pointer;overflow:visible}
.cd-ring{position:absolute;inset:-10px;width:calc(100% + 20px);height:calc(100% + 20px);
  transform:rotate(-90deg);pointer-events:none}
.track{fill:none;stroke:#1e3a5f;stroke-width:3}
.arc{fill:none;stroke:#3b82f6;stroke-width:3;stroke-linecap:round;
  stroke-dasharray:125.6;stroke-dashoffset:125.6;transition:stroke-dashoffset .1s linear}
.cd-btn.done{background:#3b82f6;color:#fff;border-color:#3b82f6}`,
      "script.js": `const btn=document.getElementById('cdBtn');
const arc=document.getElementById('arc');
const lbl=document.getElementById('cdLabel');
const total=125.6;let timer,elapsed=0,raf;
const dur=2000;
btn.addEventListener('mousedown',start);
btn.addEventListener('touchstart',start,{passive:true});
document.addEventListener('mouseup',cancel);
document.addEventListener('touchend',cancel);
function start(){
  elapsed=0;const t0=performance.now();
  raf=requestAnimationFrame(function tick(now){
    elapsed=now-t0;
    const pct=Math.min(elapsed/dur,1);
    arc.style.strokeDashoffset=total*(1-pct);
    const remaining=Math.ceil((dur-elapsed)/1000);
    lbl.textContent=pct<1?'Hold… '+remaining+'s':'✓ Submitted!';
    if(pct<1)raf=requestAnimationFrame(tick);
    else btn.classList.add('done');
  });
}
function cancel(){
  cancelAnimationFrame(raf);
  if(!btn.classList.contains('done')){
    arc.style.strokeDashoffset=total;lbl.textContent='Hold to Submit';
  }
}`
    }
  },

  {
    folder: "liquid-fill-progress-button",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Liquid Fill Progress Button</title>
<meta name="description" content="Button that fills with liquid wave animation on click.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<button class="lf-btn" id="lfBtn"><span id="lfLabel">Upload</span><div class="fill"></div></button>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#111}
.lf-btn{position:relative;padding:16px 56px;font-size:1.1rem;border:2px solid #10b981;
  border-radius:8px;background:transparent;color:#10b981;cursor:pointer;overflow:hidden;z-index:0}
.fill{position:absolute;bottom:0;left:0;width:100%;height:0;
  background:linear-gradient(180deg,#059669 0%,#10b981 100%);
  transition:height 2s cubic-bezier(.4,0,.2,1);z-index:-1}
.lf-btn.loading .fill{height:100%}
.lf-btn.loading{color:#fff;border-color:#10b981}
#lfLabel{position:relative;z-index:1}`,
      "script.js": `const btn=document.getElementById('lfBtn');
const lbl=document.getElementById('lfLabel');
btn.addEventListener('click',()=>{
  if(btn.classList.contains('loading'))return;
  btn.classList.add('loading');lbl.textContent='Uploading…';
  setTimeout(()=>{lbl.textContent='✓ Done!';},2000);
  setTimeout(()=>{btn.classList.remove('loading');lbl.textContent='Upload';},4000);
});`
    }
  },

  {
    folder: "ripple-ink-button",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ripple Ink Button</title>
<meta name="description" content="Material-style ink ripple button with custom origin point.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<button class="ripple-btn" id="rBtn">Click me</button>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#18181b}
.ripple-btn{position:relative;padding:16px 48px;font-size:1rem;letter-spacing:.05em;
  border:none;border-radius:8px;background:#6366f1;color:#fff;cursor:pointer;overflow:hidden;font-family:sans-serif}
.ripple-btn .ripple{position:absolute;border-radius:50%;background:#ffffff55;
  transform:scale(0);animation:ripple .6s linear;pointer-events:none}
@keyframes ripple{to{transform:scale(4);opacity:0}}`,
      "script.js": `document.getElementById('rBtn').addEventListener('click',function(e){
  const r=this.getBoundingClientRect();
  const d=Math.max(this.clientWidth,this.clientHeight)*2;
  const span=document.createElement('span');
  span.className='ripple';
  span.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
  this.appendChild(span);
  setTimeout(()=>span.remove(),600);
});`
    }
  },

  {
    folder: "toggle-3d-button",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Toggle 3D Button</title>
<meta name="description" content="Skeuomorphic 3D push button with pressed depth effect.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<button class="btn3d">Push Me</button>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#1c1c1c}
.btn3d{padding:16px 52px;font-size:1.1rem;font-weight:700;letter-spacing:.08em;
  border:none;border-radius:10px;cursor:pointer;font-family:sans-serif;
  color:#fff;text-shadow:0 -1px 0 #0005;
  background:linear-gradient(180deg,#f59e0b,#d97706);
  box-shadow:0 8px 0 #92400e,0 9px 6px #0008;
  transition:all .1s ease;position:relative;top:0}
.btn3d:active{box-shadow:0 2px 0 #92400e,0 3px 3px #0008;top:6px}
@media(prefers-reduced-motion:reduce){.btn3d{transition:none}}`
    }
  },

  {
    folder: "split-color-hover-button",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Split Color Hover Button</title>
<meta name="description" content="Button split diagonally, revealing contrast color on hover.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<button class="split-btn"><span>Explore</span></button>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f0f0f}
.split-btn{position:relative;padding:16px 56px;font-size:1.1rem;border:2px solid #e11d48;
  background:transparent;color:#e11d48;cursor:pointer;overflow:hidden;font-family:sans-serif;letter-spacing:.05em}
.split-btn::after{content:'';position:absolute;inset:0;
  background:#e11d48;transform:translateX(-101%);transition:transform .4s cubic-bezier(.76,0,.24,1)}
.split-btn:hover::after{transform:translateX(0)}
.split-btn:hover span{color:#fff}
.split-btn span{position:relative;z-index:1;transition:color .4s}
@media(prefers-reduced-motion:reduce){.split-btn::after{transition:none}.split-btn span{transition:none}}`
    }
  },

  {
    folder: "star-rating-button",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Star Rating Button</title>
<meta name="description" content="Interactive animated star rating button component.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="rating" id="rating" aria-label="Star rating">
  ${[1,2,3,4,5].map(i=>`<button class="star" data-v="${i}" aria-label="${i} star">★</button>`).join('')}
</div>
<p class="hint" id="hint">Select a rating</p>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#111;flex-direction:column;gap:16px;font-family:sans-serif}
body{flex-direction:column;display:flex;align-items:center;justify-content:center;gap:20px}
.rating{display:flex;gap:4px}
.star{font-size:2.5rem;background:none;border:none;cursor:pointer;color:#374151;
  transition:transform .2s,color .2s}
.star:hover,.star.active{color:#fbbf24;transform:scale(1.2)}
.hint{color:#9ca3af;font-size:.9rem}
@media(prefers-reduced-motion:reduce){.star{transition:none}}`,
      "script.js": `const stars=document.querySelectorAll('.star');
const hint=document.getElementById('hint');
const msgs=['Terrible','Poor','OK','Good','Excellent'];
stars.forEach(s=>{
  s.addEventListener('click',()=>{
    const v=+s.dataset.v;
    stars.forEach((x,i)=>x.classList.toggle('active',i<v));
    hint.textContent=msgs[v-1]+'! ('+v+'/5)';
  });
});`
    }
  },

  {
    folder: "border-draw-button",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Border Draw Button</title>
<meta name="description" content="Button whose border is drawn around it on hover using SVG stroke dash trick.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<button class="draw-btn">
  <svg class="border-svg" viewBox="0 0 200 56">
    <rect class="border-rect" x="1" y="1" width="198" height="54" rx="6"/>
  </svg>
  <span>Get Started</span>
</button>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a0a}
.draw-btn{position:relative;padding:16px 56px;font-size:1rem;border:none;background:transparent;
  color:#f1f5f9;cursor:pointer;font-family:sans-serif;letter-spacing:.06em}
.border-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.border-rect{fill:none;stroke:#38bdf8;stroke-width:2;
  stroke-dasharray:504;stroke-dashoffset:504;transition:stroke-dashoffset .7s cubic-bezier(.4,0,.2,1)}
.draw-btn:hover .border-rect{stroke-dashoffset:0}
@media(prefers-reduced-motion:reduce){.border-rect{transition:none;stroke-dashoffset:0}}`
    }
  },

  {
    folder: "smoke-particle-button",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Smoke Particle Button</title>
<meta name="description" content="Button that emits canvas smoke particles on click.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="wrap">
  <canvas id="c"></canvas>
  <button class="smoke-btn" id="smokeBtn">Ignite</button>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a0a}
.wrap{position:relative}
#c{position:absolute;inset:0;pointer-events:none;width:300px;height:200px;left:-100px;top:-80px}
.smoke-btn{position:relative;padding:16px 52px;font-size:1.1rem;border:2px solid #f97316;
  background:transparent;color:#f97316;cursor:pointer;border-radius:6px;font-family:sans-serif;z-index:1}
.smoke-btn:hover{background:#f9731622}`,
      "script.js": `const c=document.getElementById('c');const ctx=c.getContext('2d');
c.width=300;c.height=200;
const particles=[];
document.getElementById('smokeBtn').addEventListener('click',e=>{
  const r=e.target.getBoundingClientRect();
  const x=r.left+r.width/2-c.getBoundingClientRect().left;
  const y=r.top-c.getBoundingClientRect().top;
  for(let i=0;i<20;i++){
    particles.push({x,y,vx:(Math.random()-.5)*2,vy:-Math.random()*3-1,
      r:Math.random()*12+4,a:1,color:\`hsl(\${Math.random()*30+10},80%,60%)\`});
  }
});
function draw(){
  ctx.clearRect(0,0,300,200);
  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i];
    p.x+=p.vx;p.y+=p.vy;p.r+=.3;p.a-=.02;
    if(p.a<=0){particles.splice(i,1);continue;}
    ctx.globalAlpha=p.a;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color;ctx.fill();
  }
  ctx.globalAlpha=1;requestAnimationFrame(draw);
}
draw();`
    }
  },

  /* ─────────────────────────────────────────
     CARDS (10)
  ───────────────────────────────────────── */
  {
    folder: "flip-reveal-card",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Flip Reveal Card</title>
<meta name="description" content="3D CSS flip card revealing content on hover.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="flip-card" tabindex="0">
  <div class="inner">
    <div class="front">
      <div class="icon">⚡</div>
      <h2>Hover Me</h2>
      <p>Frontend Developer</p>
    </div>
    <div class="back">
      <h2>Available for work</h2>
      <p>React • CSS • Node.js</p>
      <a class="cta" href="#">Let's Connect</a>
    </div>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.flip-card{width:280px;height:360px;perspective:1000px;cursor:pointer}
.inner{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.4,0,.2,1)}
.flip-card:hover .inner,.flip-card:focus .inner{transform:rotateY(180deg)}
.front,.back{position:absolute;inset:0;border-radius:20px;backface-visibility:hidden;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px}
.front{background:linear-gradient(135deg,#1e3a5f,#1e293b);border:1px solid #334155}
.back{background:linear-gradient(135deg,#6366f1,#4338ca);transform:rotateY(180deg)}
.icon{font-size:3rem}.front h2{color:#f1f5f9;font-size:1.4rem}.front p{color:#94a3b8}
.back h2{color:#fff}.back p{color:#c7d2fe}.cta{margin-top:8px;padding:10px 28px;
  border:2px solid #fff;border-radius:50px;color:#fff;text-decoration:none;font-size:.9rem;
  transition:background .2s}
.cta:hover{background:#fff;color:#4338ca}
@media(prefers-reduced-motion:reduce){.inner{transition:none}}`
    }
  },

  {
    folder: "glassmorphism-product-card",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Glassmorphism Product Card</title>
<meta name="description" content="Frosted glass product card with floating badge and action button.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="bg-blobs">
  <div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>
</div>
<div class="product-card">
  <div class="badge">NEW</div>
  <div class="product-img">🎧</div>
  <div class="product-info">
    <h2>Pro Studio Headphones</h2>
    <p>Immersive sound, zero noise.</p>
    <div class="price-row">
      <span class="price">\$249</span>
      <button class="add-btn">Add to Cart</button>
    </div>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f0c29;overflow:hidden;font-family:sans-serif}
.bg-blobs{position:fixed;inset:0;pointer-events:none}
.blob{position:absolute;border-radius:50%;filter:blur(80px);opacity:.6}
.b1{width:400px;height:400px;background:#7c3aed;top:-100px;left:-100px}
.b2{width:300px;height:300px;background:#2563eb;bottom:-50px;right:0}
.b3{width:250px;height:250px;background:#db2777;top:50%;left:50%}
.product-card{position:relative;background:rgba(255,255,255,.08);backdrop-filter:blur(20px);
  border:1px solid rgba(255,255,255,.15);border-radius:24px;padding:28px;width:300px;color:#fff}
.badge{position:absolute;top:-14px;left:24px;background:#7c3aed;color:#fff;
  padding:4px 14px;border-radius:20px;font-size:.75rem;font-weight:700;letter-spacing:.1em}
.product-img{font-size:5rem;text-align:center;padding:16px 0}
.product-info h2{font-size:1.2rem;margin-bottom:6px}
.product-info p{color:#cbd5e1;font-size:.9rem;margin-bottom:20px}
.price-row{display:flex;align-items:center;justify-content:space-between}
.price{font-size:1.6rem;font-weight:700;color:#a5b4fc}
.add-btn{padding:10px 24px;border:none;border-radius:12px;background:#7c3aed;color:#fff;cursor:pointer;font-size:.9rem;transition:background .2s}
.add-btn:hover{background:#6d28d9}`
    }
  },

  {
    folder: "neon-profile-card",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Neon Profile Card</title>
<meta name="description" content="Cyberpunk neon glow developer profile card with animated border.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="card">
  <div class="avatar">
    <span>AK</span>
    <div class="status-ring"></div>
  </div>
  <h2>Alex Kim</h2>
  <p class="role">Full Stack Engineer</p>
  <div class="tags"><span>React</span><span>Go</span><span>K8s</span></div>
  <div class="stats">
    <div><strong>248</strong><span>commits</span></div>
    <div><strong>42</strong><span>PRs</span></div>
    <div><strong>8</strong><span>repos</span></div>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#050a14;font-family:sans-serif}
.card{background:#0d1b2a;border:1px solid #0ff3;border-radius:20px;padding:32px 28px;
  width:280px;text-align:center;position:relative;
  box-shadow:0 0 0 1px #0ff1,0 0 40px #0ff1,inset 0 0 40px #0002}
.card::before{content:'';position:absolute;inset:-1px;border-radius:20px;
  background:conic-gradient(from 0deg,#0ff,#f0f,#0ff);z-index:-1;animation:spin 4s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.avatar{position:relative;width:80px;height:80px;margin:0 auto 16px;border-radius:50%;
  background:linear-gradient(135deg,#0ff,#f0f);display:grid;place-items:center}
.avatar span{font-size:1.6rem;font-weight:700;color:#050a14}
.status-ring{position:absolute;inset:-4px;border-radius:50%;border:2px solid #22c55e;
  box-shadow:0 0 8px #22c55e;animation:pulse .8s ease-in-out infinite alternate}
@keyframes pulse{to{box-shadow:0 0 16px #22c55e}}
.card h2{color:#e2e8f0;font-size:1.2rem}.role{color:#64748b;font-size:.85rem;margin:4px 0 16px}
.tags{display:flex;gap:6px;justify-content:center;margin-bottom:20px}
.tags span{background:#0ff1;color:#0ff;padding:3px 10px;border-radius:20px;font-size:.75rem;border:1px solid #0ff4}
.stats{display:flex;justify-content:space-around}
.stats div{display:flex;flex-direction:column;gap:2px}
.stats strong{color:#f1f5f9;font-size:1.1rem}
.stats span{color:#64748b;font-size:.7rem}
@media(prefers-reduced-motion:reduce){.card::before,.status-ring{animation:none}}`
    }
  },

  {
    folder: "receipt-ticket-card",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Receipt Ticket Card</title>
<meta name="description" content="Retro receipt-style info card with perforated edge decoration.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="receipt">
  <div class="receipt-top">
    <p class="shop">COMPONENT STORE</p>
    <h2>Order #2047</h2>
    <p class="date">2026-09-26 17:00</p>
  </div>
  <hr class="dashed">
  <ul class="items">
    <li><span>Neon Button ×1</span><span>\$12.00</span></li>
    <li><span>Glass Card ×2</span><span>\$24.00</span></li>
    <li><span>Dark Toggle ×1</span><span>\$8.00</span></li>
  </ul>
  <hr class="dashed">
  <div class="total"><span>TOTAL</span><span>\$44.00</span></div>
  <div class="perforation"></div>
  <p class="thanks">Thank you! ★</p>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#1a1a1a;font-family:'Courier New',monospace}
.receipt{background:#f5f0e8;width:280px;padding:24px 20px 0;color:#1a1a1a;position:relative;
  box-shadow:0 20px 60px #0008,4px 4px 0 #d4c9a8,-4px 4px 0 #d4c9a8}
.shop{font-size:.7rem;letter-spacing:.3em;text-align:center;opacity:.6}
h2{text-align:center;font-size:1.3rem;margin:4px 0}
.date{text-align:center;font-size:.7rem;opacity:.5;margin-bottom:16px}
.dashed{border:none;border-top:2px dashed #888;margin:12px 0}
.items{list-style:none;font-size:.85rem;display:flex;flex-direction:column;gap:6px}
.items li{display:flex;justify-content:space-between}
.total{display:flex;justify-content:space-between;font-weight:700;font-size:1rem;margin:8px 0 16px}
.perforation{display:flex;gap:0;margin:0 -20px;overflow:hidden}
.perforation::before{content:'';display:block;width:100%;height:20px;
  background:radial-gradient(circle at 50% 0,#1a1a1a 10px,#f5f0e8 10px);
  background-size:20px 20px;background-repeat:repeat-x}
.thanks{text-align:center;padding:12px 0 16px;font-size:.8rem;opacity:.6}`
    }
  },

  {
    folder: "spotify-music-card",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Spotify Music Card</title>
<meta name="description" content="Music player card with animated progress bar and controls.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="music-card">
  <div class="album" id="album">🎵</div>
  <div class="info">
    <h2 id="trackName">Midnight Drive</h2>
    <p id="artistName">Neon Horizons</p>
  </div>
  <div class="progress-wrap">
    <div class="bar"><div class="fill" id="fill"></div></div>
    <div class="times"><span id="cur">0:00</span><span>3:42</span></div>
  </div>
  <div class="controls">
    <button id="prev">⏮</button>
    <button id="play" class="play-btn">▶</button>
    <button id="next">⏭</button>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#121212;font-family:sans-serif}
.music-card{background:#1e1e1e;border-radius:24px;padding:28px;width:300px;color:#fff;
  box-shadow:0 20px 60px #000a}
.album{font-size:5rem;text-align:center;background:linear-gradient(135deg,#1db954,#191414);
  border-radius:16px;padding:20px;margin-bottom:20px;transition:transform .3s}
.album.spin{animation:rot 3s linear infinite}
@keyframes rot{to{transform:rotate(360deg)}}
.info h2{font-size:1.1rem;margin-bottom:4px}
.info p{color:#6b7280;font-size:.85rem;margin-bottom:16px}
.bar{height:4px;background:#333;border-radius:2px;cursor:pointer;margin-bottom:4px}
.fill{height:100%;background:#1db954;border-radius:2px;width:0%;transition:width .5s}
.times{display:flex;justify-content:space-between;font-size:.7rem;color:#6b7280}
.controls{display:flex;justify-content:center;align-items:center;gap:16px;margin-top:16px}
.controls button{background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;opacity:.7;transition:opacity .2s}
.controls button:hover{opacity:1}
.play-btn{font-size:2rem;opacity:1!important;background:#1db954!important;
  border-radius:50%;width:48px;height:48px;display:grid;place-items:center;font-size:1.2rem}`,
      "script.js": `const fill=document.getElementById('fill');
const cur=document.getElementById('cur');
const playBtn=document.getElementById('play');
const album=document.getElementById('album');
let playing=false,pct=0,raf;
const duration=222;
playBtn.addEventListener('click',()=>{
  playing=!playing;playBtn.textContent=playing?'⏸':'▶';
  album.classList.toggle('spin',playing);
  if(playing) tick();else cancelAnimationFrame(raf);
});
function tick(){
  pct=Math.min(pct+.02,100);
  fill.style.width=pct+'%';
  const s=Math.round(pct/100*duration);
  cur.textContent=Math.floor(s/60)+':'+(s%60+'').padStart(2,'0');
  if(pct<100)raf=requestAnimationFrame(tick);
  else{playing=false;playBtn.textContent='▶';album.classList.remove('spin');}
}
document.getElementById('prev').addEventListener('click',()=>{pct=0;fill.style.width='0%';cur.textContent='0:00'});
document.getElementById('next').addEventListener('click',()=>{pct=100;fill.style.width='100%'});`
    }
  },

  {
    folder: "neumorphic-stat-card",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Neumorphic Stat Card</title>
<meta name="description" content="Soft neumorphism stats dashboard card with animated counters.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="nm-card">
  <h3 class="nm-title">Dashboard</h3>
  <div class="stats">
    <div class="stat-item">
      <div class="stat-icon">📈</div>
      <div><strong class="count" data-target="12847">0</strong><span>Revenue</span></div>
    </div>
    <div class="stat-item">
      <div class="stat-icon">👥</div>
      <div><strong class="count" data-target="3921">0</strong><span>Users</span></div>
    </div>
    <div class="stat-item">
      <div class="stat-icon">🛒</div>
      <div><strong class="count" data-target="643">0</strong><span>Orders</span></div>
    </div>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#e0e5ec;font-family:sans-serif}
.nm-card{background:#e0e5ec;border-radius:20px;padding:28px;width:320px;
  box-shadow:8px 8px 16px #b8bec7,-8px -8px 16px #ffffff}
.nm-title{font-size:1rem;color:#6b7280;letter-spacing:.1em;text-transform:uppercase;margin-bottom:20px}
.stats{display:flex;flex-direction:column;gap:16px}
.stat-item{display:flex;align-items:center;gap:16px;background:#e0e5ec;border-radius:14px;padding:14px;
  box-shadow:4px 4px 8px #b8bec7,-4px -4px 8px #ffffff}
.stat-icon{font-size:1.8rem;width:48px;height:48px;display:grid;place-items:center;
  border-radius:12px;background:#e0e5ec;box-shadow:3px 3px 6px #b8bec7,-3px -3px 6px #fff}
.stat-item strong{display:block;font-size:1.3rem;color:#1f2937}
.stat-item span{font-size:.75rem;color:#9ca3af}`,
      "script.js": `document.querySelectorAll('.count').forEach(el=>{
  const target=+el.dataset.target;const dur=1500;const start=performance.now();
  requestAnimationFrame(function tick(now){
    const pct=Math.min((now-start)/dur,1);
    el.textContent=Math.floor(pct*target).toLocaleString();
    if(pct<1)requestAnimationFrame(tick);
  });
});`
    }
  },

  {
    folder: "testimonial-quote-card",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Testimonial Quote Card</title>
<meta name="description" content="Elegant animated testimonial quote card with rotating author switcher.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="quote-card">
  <div class="quotemark">"</div>
  <p class="quote-text" id="quoteText"></p>
  <div class="author">
    <div class="avatar" id="authorAvatar"></div>
    <div>
      <strong id="authorName"></strong>
      <span id="authorRole"></span>
    </div>
  </div>
  <div class="dots" id="dots"></div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.quote-card{background:#1e293b;border-radius:20px;padding:36px;max-width:400px;
  border:1px solid #334155;position:relative}
.quotemark{font-size:6rem;line-height:.8;color:#6366f1;margin-bottom:8px}
.quote-text{color:#cbd5e1;line-height:1.6;font-size:1rem;min-height:80px;transition:opacity .3s}
.author{display:flex;align-items:center;gap:14px;margin-top:24px}
.avatar{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;
  font-size:1.1rem;font-weight:700;color:#fff;flex-shrink:0}
.author strong{display:block;color:#f1f5f9;font-size:.95rem}
.author span{color:#64748b;font-size:.8rem}
.dots{display:flex;gap:6px;margin-top:20px}
.dot{width:8px;height:8px;border-radius:50%;background:#334155;cursor:pointer;transition:background .2s}
.dot.active{background:#6366f1}
@media(prefers-reduced-motion:reduce){.quote-text{transition:none}}`,
      "script.js": `const data=[
  {text:'This library saved me 3 weeks of work. The components are clean, accessible, and production-ready.',name:'Sara L.',role:'UI Engineer',color:'#6366f1',initial:'SL'},
  {text:'I copy-paste from here constantly. The CSS quality is exceptional — no bloat, no frameworks.',name:'Marco D.',role:'Frontend Dev',color:'#10b981',initial:'MD'},
  {text:'Finally a library that looks modern without 10MB of JS. Pure CSS genius.',name:'Yuki N.',role:'Design Engineer',color:'#f59e0b',initial:'YN'},
];
let idx=0;
const text=document.getElementById('quoteText');
const name=document.getElementById('authorName');
const role=document.getElementById('authorRole');
const av=document.getElementById('authorAvatar');
const dotsEl=document.getElementById('dots');
data.forEach((_,i)=>{const d=document.createElement('div');d.className='dot';d.addEventListener('click',()=>show(i));dotsEl.appendChild(d);});
function show(i){idx=i;const q=data[i];text.textContent=q.text;name.textContent=q.name;role.textContent=q.role;
  av.style.background=q.color;av.textContent=q.initial;
  document.querySelectorAll('.dot').forEach((d,j)=>d.classList.toggle('active',j===i));}
show(0);setInterval(()=>show((idx+1)%data.length),4000);`
    }
  },

  {
    folder: "expandable-info-card",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Expandable Info Card</title>
<meta name="description" content="Accordion-style expandable card with smooth height animation.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="exp-card" id="card">
  <div class="card-header" id="cardHeader">
    <div class="card-icon">🧠</div>
    <div>
      <h2>AI Model Overview</h2>
      <p>Click to expand details</p>
    </div>
    <span class="chevron" id="chev">▾</span>
  </div>
  <div class="card-body" id="cardBody">
    <div class="body-inner">
      <p>This model was trained on 1T tokens using a distributed pipeline across 512 A100 GPUs.</p>
      <ul><li>Parameters: 70B</li><li>Context: 128K tokens</li><li>Latency: 40ms p50</li></ul>
    </div>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.exp-card{background:#1e293b;border-radius:16px;border:1px solid #334155;width:360px;overflow:hidden}
.card-header{display:flex;align-items:center;gap:14px;padding:20px;cursor:pointer;user-select:none}
.card-icon{font-size:1.8rem;flex-shrink:0}
.card-header h2{color:#f1f5f9;font-size:1rem}
.card-header p{color:#64748b;font-size:.8rem}
.chevron{margin-left:auto;color:#6366f1;font-size:1.4rem;transition:transform .3s}
.exp-card.open .chevron{transform:rotate(180deg)}
.card-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}
.exp-card.open .card-body{grid-template-rows:1fr}
.body-inner{overflow:hidden;padding:0 20px}
.exp-card.open .body-inner{padding:0 20px 20px}
.body-inner p{color:#94a3b8;line-height:1.6;margin-bottom:12px}
.body-inner li{color:#94a3b8;margin-left:18px;font-size:.9rem;line-height:2}
@media(prefers-reduced-motion:reduce){.chevron,.card-body{transition:none}}`,
      "script.js": `document.getElementById('cardHeader').addEventListener('click',()=>{
  document.getElementById('card').classList.toggle('open');
});`
    }
  },

  {
    folder: "weather-forecast-card",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Weather Forecast Card</title>
<meta name="description" content="Beautiful animated weather card with temperature and forecast strip.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="weather-card">
  <div class="weather-main">
    <div class="weather-icon">⛅</div>
    <div class="temp">18°</div>
    <div class="condition">Partly Cloudy</div>
    <div class="location">📍 Madrid, ES</div>
  </div>
  <div class="forecast">
    ${['Mon','Tue','Wed','Thu','Fri'].map((d,i)=>`<div class="day"><span>${d}</span><span>${['☀️','⛅','🌧️','⛅','☀️'][i]}</span><span>${[22,18,15,17,24][i]}°</span></div>`).join('')}
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0c1445;font-family:sans-serif}
.weather-card{background:linear-gradient(160deg,#1a237e,#283593,#1565c0);border-radius:24px;
  width:300px;overflow:hidden;box-shadow:0 20px 60px #0005;color:#fff}
.weather-main{padding:28px;text-align:center}
.weather-icon{font-size:4rem;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.temp{font-size:4rem;font-weight:300;line-height:1}
.condition{font-size:1rem;opacity:.8;margin:4px 0}
.location{font-size:.8rem;opacity:.6}
.forecast{display:flex;background:#ffffff10;backdrop-filter:blur(10px)}
.day{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:14px 0;
  font-size:.75rem;opacity:.8;border-left:1px solid #fff1}
.day:first-child{border-left:none}
.day span:nth-child(3){font-weight:700;opacity:1}
@media(prefers-reduced-motion:reduce){.weather-icon{animation:none}}`
    }
  },

  /* ─────────────────────────────────────────
     NAVIGATION (10)
  ───────────────────────────────────────── */
  {
    folder: "floating-pill-navbar",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Floating Pill Navbar</title>
<meta name="description" content="Floating glassmorphism pill navigation bar with active indicator.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<nav class="pill-nav" id="nav">
  <a class="nav-item active" href="#" data-label="Home">🏠</a>
  <a class="nav-item" href="#" data-label="Search">🔍</a>
  <a class="nav-item" href="#" data-label="Library">📚</a>
  <a class="nav-item" href="#" data-label="Profile">👤</a>
  <div class="indicator" id="ind"></div>
</nav>
<p class="page-label" id="pageLabel">Home</p>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.pill-nav{position:relative;display:flex;gap:4px;background:rgba(255,255,255,.06);
  backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);border-radius:50px;padding:6px}
.nav-item{position:relative;z-index:1;width:52px;height:52px;display:grid;place-items:center;
  font-size:1.4rem;border-radius:50%;text-decoration:none;transition:transform .2s;cursor:pointer}
.nav-item:hover{transform:scale(1.1)}
.indicator{position:absolute;top:6px;left:6px;width:52px;height:52px;border-radius:50%;
  background:linear-gradient(135deg,#6366f1,#8b5cf6);transition:transform .3s cubic-bezier(.34,1.56,.64,1);z-index:0}
.page-label{color:#94a3b8;margin-top:24px;font-size:.9rem}
@media(prefers-reduced-motion:reduce){.indicator,.nav-item{transition:none}}`,
      "script.js": `const items=document.querySelectorAll('.nav-item');
const ind=document.getElementById('ind');
const lbl=document.getElementById('pageLabel');
items.forEach((item,i)=>{
  item.addEventListener('click',e=>{e.preventDefault();
    items.forEach(x=>x.classList.remove('active'));
    item.classList.add('active');
    ind.style.transform='translateX('+i*56+'px)';
    lbl.textContent=item.dataset.label;
  });
});`
    }
  },

  {
    folder: "sidebar-icon-menu",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sidebar Icon Menu</title>
<meta name="description" content="Collapsible icon sidebar navigation with tooltip labels.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<aside class="sidebar" id="sb">
  <button class="toggle-btn" id="togBtn" aria-label="Toggle sidebar">☰</button>
  <nav class="sb-nav">
    <a class="sb-item" href="#"><span class="icon">⚡</span><span class="label">Dashboard</span></a>
    <a class="sb-item" href="#"><span class="icon">📊</span><span class="label">Analytics</span></a>
    <a class="sb-item" href="#"><span class="icon">📁</span><span class="label">Projects</span></a>
    <a class="sb-item" href="#"><span class="icon">💬</span><span class="label">Messages</span></a>
    <a class="sb-item" href="#"><span class="icon">⚙️</span><span class="label">Settings</span></a>
  </nav>
</aside>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:flex;background:#0f172a;font-family:sans-serif}
.sidebar{background:#1e293b;border-right:1px solid #334155;width:64px;
  transition:width .3s ease;overflow:hidden;display:flex;flex-direction:column;padding:12px 0}
.sidebar.open{width:220px}
.toggle-btn{margin:0 10px 16px;padding:10px;background:#334155;border:none;border-radius:8px;
  color:#94a3b8;cursor:pointer;font-size:1.2rem;text-align:left}
.sb-item{display:flex;align-items:center;gap:14px;padding:12px 16px;text-decoration:none;
  color:#94a3b8;border-radius:8px;margin:2px 8px;white-space:nowrap;transition:background .2s,color .2s}
.sb-item:hover{background:#334155;color:#f1f5f9}
.icon{font-size:1.3rem;flex-shrink:0;width:32px;text-align:center}
.label{font-size:.9rem;opacity:0;transition:opacity .2s .1s}
.sidebar.open .label{opacity:1}
@media(prefers-reduced-motion:reduce){.sidebar,.label{transition:none}}`,
      "script.js": `document.getElementById('togBtn').addEventListener('click',()=>{
  document.getElementById('sb').classList.toggle('open');
});`
    }
  },

  {
    folder: "breadcrumb-trail-navigation",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Breadcrumb Trail Navigation</title>
<meta name="description" content="Animated breadcrumb navigation with chevron separators and hover effects.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Library</a></li>
    <li><a href="#">Components</a></li>
    <li><span aria-current="page">Navigation</span></li>
  </ol>
</nav>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.breadcrumbs ol{display:flex;align-items:center;list-style:none;gap:0;
  background:#1e293b;border:1px solid #334155;border-radius:50px;padding:10px 20px}
.breadcrumbs li{display:flex;align-items:center}
.breadcrumbs li+li::before{content:'›';margin:0 8px;color:#475569;font-size:1.2rem}
.breadcrumbs a{color:#94a3b8;text-decoration:none;font-size:.9rem;padding:4px 10px;border-radius:20px;
  transition:background .2s,color .2s}
.breadcrumbs a:hover{background:#334155;color:#f1f5f9}
.breadcrumbs span{color:#6366f1;font-size:.9rem;padding:4px 10px;
  background:#6366f120;border-radius:20px;font-weight:600}
@media(prefers-reduced-motion:reduce){.breadcrumbs a{transition:none}}`
    }
  },

  {
    folder: "tab-menu-neon-underline",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tab Menu Neon Underline</title>
<meta name="description" content="Tab navigation with sliding neon underline indicator.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="tabs-wrap">
  <div class="tabs" id="tabs">
    <button class="tab active" data-tab="overview">Overview</button>
    <button class="tab" data-tab="code">Code</button>
    <button class="tab" data-tab="preview">Preview</button>
    <button class="tab" data-tab="settings">Settings</button>
    <div class="underline" id="ul"></div>
  </div>
  <div class="tab-content" id="tc">Content: Overview</div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif}
.tabs-wrap{width:100%;max-width:480px}
.tabs{position:relative;display:flex;border-bottom:1px solid #1f2937;padding:0 4px}
.tab{background:none;border:none;padding:14px 24px;color:#6b7280;cursor:pointer;font-size:.95rem;
  font-family:sans-serif;transition:color .2s;position:relative;z-index:1}
.tab.active,.tab:hover{color:#f1f5f9}
.underline{position:absolute;bottom:-1px;height:2px;background:#6366f1;box-shadow:0 0 8px #6366f1;
  border-radius:2px 2px 0 0;transition:left .3s cubic-bezier(.34,1.56,.64,1),width .3s}
.tab-content{padding:20px 8px;color:#94a3b8;font-size:.9rem}
@media(prefers-reduced-motion:reduce){.underline{transition:none}}`,
      "script.js": `const tabs=document.querySelectorAll('.tab');
const ul=document.getElementById('ul');
const tc=document.getElementById('tc');
function move(tab){
  ul.style.left=tab.offsetLeft+'px';ul.style.width=tab.offsetWidth+'px';
}
tabs.forEach(t=>{
  t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');
    move(t);tc.textContent='Content: '+t.dataset.tab.charAt(0).toUpperCase()+t.dataset.tab.slice(1);
  });
});
move(document.querySelector('.tab.active'));`
    }
  },

  {
    folder: "dot-step-pagination",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dot Step Pagination</title>
<meta name="description" content="Animated dot stepper pagination with progress fill.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="stepper">
  <div class="steps" id="steps">
    ${[1,2,3,4,5].map(i=>`<div class="step" data-n="${i}"><div class="dot"></div><span>${['Start','Details','Review','Payment','Done'][i-1]}</span></div>`).join('')}
    <div class="progress-line"><div class="progress-fill" id="pf"></div></div>
  </div>
  <div class="step-nav">
    <button id="prev" disabled>← Back</button>
    <button id="next">Next →</button>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#111827;font-family:sans-serif}
.stepper{width:100%;max-width:500px}
.steps{position:relative;display:flex;justify-content:space-between;margin-bottom:32px}
.progress-line{position:absolute;top:16px;left:16px;right:16px;height:2px;background:#1f2937;z-index:0}
.progress-fill{height:100%;background:#6366f1;width:0%;transition:width .4s ease}
.step{display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;z-index:1}
.dot{width:32px;height:32px;border-radius:50%;background:#1f2937;border:2px solid #374151;
  transition:background .3s,border-color .3s}
.step.active .dot{background:#6366f1;border-color:#6366f1;box-shadow:0 0 12px #6366f1}
.step.done .dot{background:#10b981;border-color:#10b981}
.step span{font-size:.7rem;color:#6b7280;white-space:nowrap}
.step.active span{color:#f1f5f9}
.step-nav{display:flex;gap:12px;justify-content:center}
.step-nav button{padding:10px 28px;border:1px solid #374151;background:transparent;
  color:#94a3b8;border-radius:8px;cursor:pointer;font-family:sans-serif;transition:all .2s}
.step-nav button:not(:disabled):hover{background:#374151;color:#f1f5f9}
.step-nav button:disabled{opacity:.3;cursor:not-allowed}
@media(prefers-reduced-motion:reduce){.dot,.progress-fill,.step-nav button{transition:none}}`,
      "script.js": `const steps=document.querySelectorAll('.step');
const pf=document.getElementById('pf');
const prev=document.getElementById('prev');
const next=document.getElementById('next');
let cur=0;
function update(){
  steps.forEach((s,i)=>{
    s.classList.toggle('active',i===cur);
    s.classList.toggle('done',i<cur);
  });
  pf.style.width=(cur/(steps.length-1)*100)+'%';
  prev.disabled=cur===0;next.disabled=cur===steps.length-1;
}
prev.addEventListener('click',()=>{if(cur>0){cur--;update();}});
next.addEventListener('click',()=>{if(cur<steps.length-1){cur++;update();}});
update();`
    }
  },

  {
    folder: "mega-menu-navigation",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mega Menu Navigation</title>
<meta name="description" content="Dropdown mega menu navigation with category columns and hover animation.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<header class="header">
  <nav class="navbar">
    <a class="brand" href="#">⟨/⟩ ComponentField</a>
    <ul class="nav-list">
      <li class="has-mega"><a>Components ▾</a>
        <div class="mega-menu">
          <div class="mega-col"><h4>UI</h4><a href="#">Buttons</a><a href="#">Cards</a><a href="#">Modals</a></div>
          <div class="mega-col"><h4>Forms</h4><a href="#">Inputs</a><a href="#">Selects</a><a href="#">Toggles</a></div>
          <div class="mega-col"><h4>Feedback</h4><a href="#">Alerts</a><a href="#">Toasts</a><a href="#">Badges</a></div>
        </div>
      </li>
      <li><a href="#">Docs</a></li>
      <li><a href="#">GitHub</a></li>
    </ul>
  </nav>
</header>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{background:#0f172a;font-family:sans-serif;min-height:100vh}
.header{border-bottom:1px solid #1e293b}
.navbar{display:flex;align-items:center;padding:0 32px;height:60px;gap:40px}
.brand{color:#f1f5f9;font-size:1rem;text-decoration:none;font-weight:700;font-family:monospace}
.nav-list{display:flex;list-style:none;gap:8px}
.nav-list a{padding:8px 16px;color:#94a3b8;text-decoration:none;border-radius:6px;
  font-size:.9rem;cursor:pointer;transition:color .2s,background .2s;display:block}
.nav-list a:hover{color:#f1f5f9;background:#1e293b}
.has-mega{position:relative}
.mega-menu{position:absolute;top:calc(100% + 12px);left:-40px;
  background:#1e293b;border:1px solid #334155;border-radius:16px;padding:20px;
  display:flex;gap:28px;min-width:360px;
  opacity:0;transform:translateY(-8px);pointer-events:none;
  transition:opacity .2s,transform .2s;z-index:100}
.has-mega:hover .mega-menu{opacity:1;transform:translateY(0);pointer-events:all}
.mega-col h4{color:#6366f1;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px}
.mega-col a{display:block;color:#94a3b8;padding:5px 0;font-size:.875rem;transition:color .15s}
.mega-col a:hover{color:#f1f5f9;background:none}
@media(prefers-reduced-motion:reduce){.mega-menu,.nav-list a{transition:none}}`
    }
  },

  {
    folder: "progress-scroll-navbar",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Progress Scroll Navbar</title>
<meta name="description" content="Navbar with scroll progress bar indicator at the top.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<nav class="scroll-nav">
  <div class="scroll-bar" id="sb"></div>
  <a class="brand" href="#">Scroll Progress</a>
  <div class="links"><a href="#">Home</a><a href="#">About</a><a href="#">Work</a></div>
</nav>
<main class="content">
  ${Array.from({length:20},(_,i)=>`<p>Paragraph ${i+1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`).join('')}
</main>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{background:#0f172a;font-family:sans-serif;color:#94a3b8}
.scroll-nav{position:sticky;top:0;z-index:100;background:#1e293b;
  border-bottom:1px solid #334155;display:flex;align-items:center;
  padding:0 24px;height:56px;gap:32px}
.scroll-bar{position:absolute;top:0;left:0;height:3px;background:#6366f1;
  box-shadow:0 0 8px #6366f1;width:0%;transition:width .1s;border-radius:0 2px 2px 0}
.brand{color:#f1f5f9;font-weight:700;text-decoration:none}
.links{display:flex;gap:4px}
.links a{color:#94a3b8;text-decoration:none;padding:6px 14px;border-radius:6px;font-size:.9rem}
.links a:hover{background:#334155;color:#f1f5f9}
.content{padding:40px 24px;max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:24px;line-height:1.7}
@media(prefers-reduced-motion:reduce){.scroll-bar{transition:none}}`,
      "script.js": `const bar=document.getElementById('sb');
window.addEventListener('scroll',()=>{
  const doc=document.documentElement;
  const pct=doc.scrollTop/(doc.scrollHeight-doc.clientHeight)*100;
  bar.style.width=pct+'%';
});`
    }
  },

  {
    folder: "footer-wave-links",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Footer Wave Links</title>
<meta name="description" content="Site footer with animated CSS wave top edge and link columns.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<footer class="wave-footer">
  <div class="wave-top"><svg viewBox="0 0 1440 60" preserveAspectRatio="none">
    <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#1e293b"/>
  </svg></div>
  <div class="footer-inner">
    <div class="footer-col"><h4>Product</h4><a href="#">Features</a><a href="#">Pricing</a><a href="#">Changelog</a></div>
    <div class="footer-col"><h4>Company</h4><a href="#">About</a><a href="#">Blog</a><a href="#">Careers</a></div>
    <div class="footer-col"><h4>Legal</h4><a href="#">Privacy</a><a href="#">Terms</a><a href="#">License</a></div>
  </div>
  <p class="copyright">© 2026 ComponentField. All rights reserved.</p>
</footer>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;background:#0f172a;font-family:sans-serif;display:flex;flex-direction:column;justify-content:flex-end}
.wave-footer{background:#1e293b;position:relative}
.wave-top{margin-bottom:-1px;line-height:0}
.wave-top svg{width:100%;height:60px;display:block}
.footer-inner{display:flex;gap:48px;padding:40px 48px;justify-content:center}
.footer-col h4{color:#6366f1;font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;margin-bottom:14px}
.footer-col a{display:block;color:#6b7280;text-decoration:none;font-size:.875rem;padding:4px 0;transition:color .2s}
.footer-col a:hover{color:#f1f5f9}
.copyright{text-align:center;color:#374151;font-size:.75rem;padding:0 0 24px}
@media(prefers-reduced-motion:reduce){.footer-col a{transition:none}}`
    }
  },

  {
    folder: "hamburger-morphing-menu",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hamburger Morphing Menu</title>
<meta name="description" content="Hamburger icon that morphs to X and opens a full overlay menu.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<button class="ham" id="ham" aria-label="Toggle menu" aria-expanded="false">
  <span></span><span></span><span></span>
</button>
<div class="overlay" id="overlay">
  <nav><a href="#">Home</a><a href="#">Work</a><a href="#">About</a><a href="#">Contact</a></nav>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;background:#0f172a;font-family:sans-serif}
.ham{position:fixed;top:20px;right:24px;z-index:200;background:none;border:none;
  cursor:pointer;display:flex;flex-direction:column;gap:6px;padding:8px}
.ham span{display:block;width:28px;height:2px;background:#f1f5f9;border-radius:2px;transition:all .35s cubic-bezier(.4,0,.2,1)}
.ham.open span:nth-child(1){transform:translateY(8px) rotate(45deg)}
.ham.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.ham.open span:nth-child(3){transform:translateY(-8px) rotate(-45deg)}
.overlay{position:fixed;inset:0;background:#0f172af0;display:grid;place-items:center;
  clip-path:circle(0% at calc(100% - 44px) 36px);transition:clip-path .5s cubic-bezier(.4,0,.2,1);z-index:100}
.overlay.open{clip-path:circle(150% at calc(100% - 44px) 36px)}
.overlay nav{display:flex;flex-direction:column;gap:8px;text-align:center}
.overlay a{color:#f1f5f9;text-decoration:none;font-size:2.5rem;font-weight:700;
  opacity:0;transform:translateY(20px);transition:opacity .3s,transform .3s,color .2s}
.overlay.open a{opacity:1;transform:none}
.overlay.open a:nth-child(1){transition-delay:.15s}
.overlay.open a:nth-child(2){transition-delay:.22s}
.overlay.open a:nth-child(3){transition-delay:.29s}
.overlay.open a:nth-child(4){transition-delay:.36s}
.overlay a:hover{color:#6366f1}
@media(prefers-reduced-motion:reduce){.ham span,.overlay,.overlay a{transition:none}}`,
      "script.js": `const ham=document.getElementById('ham');
const ov=document.getElementById('overlay');
ham.addEventListener('click',()=>{
  const open=ham.classList.toggle('open');
  ov.classList.toggle('open',open);
  ham.setAttribute('aria-expanded',open);
});`
    }
  },

  {
    folder: "scroll-spy-menu",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Scroll Spy Menu</title>
<meta name="description" content="Fixed side navigation that highlights active section based on scroll position.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<nav class="spy-nav" id="spyNav">
  <a href="#s1" class="spy-link active" data-target="s1">Introduction</a>
  <a href="#s2" class="spy-link" data-target="s2">Features</a>
  <a href="#s3" class="spy-link" data-target="s3">Examples</a>
  <a href="#s4" class="spy-link" data-target="s4">API</a>
</nav>
<main class="spy-content">
  <section id="s1"><h2>Introduction</h2><p>${'Lorem ipsum dolor sit amet. '.repeat(15)}</p></section>
  <section id="s2"><h2>Features</h2><p>${'Consectetur adipiscing elit. '.repeat(15)}</p></section>
  <section id="s3"><h2>Examples</h2><p>${'Sed do eiusmod tempor incididunt. '.repeat(15)}</p></section>
  <section id="s4"><h2>API Reference</h2><p>${'Ut enim ad minim veniam. '.repeat(15)}</p></section>
</main>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;background:#0f172a;font-family:sans-serif;color:#94a3b8;display:flex}
.spy-nav{position:sticky;top:24px;height:max-content;display:flex;flex-direction:column;
  gap:4px;padding:8px;min-width:160px}
.spy-link{padding:8px 14px;text-decoration:none;font-size:.85rem;color:#6b7280;
  border-left:2px solid #1f2937;border-radius:0 6px 6px 0;transition:all .2s}
.spy-link:hover{color:#f1f5f9;border-left-color:#6366f1}
.spy-link.active{color:#6366f1;border-left-color:#6366f1;background:#6366f110;font-weight:600}
.spy-content{flex:1;padding:24px 32px;max-width:700px}
.spy-content section{margin-bottom:80px}
.spy-content h2{color:#f1f5f9;margin-bottom:16px}
.spy-content p{line-height:1.7}
@media(prefers-reduced-motion:reduce){.spy-link{transition:none}}`,
      "script.js": `const links=document.querySelectorAll('.spy-link');
const sections=[...links].map(l=>document.getElementById(l.dataset.target));
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){
    links.forEach(l=>l.classList.toggle('active',l.dataset.target===e.target.id));
  }});
},{rootMargin:'-30% 0px -65% 0px'});
sections.forEach(s=>obs.observe(s));`
    }
  },

  /* ─────────────────────────────────────────
     GALLERIES (10)
  ───────────────────────────────────────── */
  {
    folder: "masonry-photo-gallery",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Masonry Photo Gallery</title>
<meta name="description" content="CSS-only masonry grid photo gallery with hover zoom overlay.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="masonry">
  ${Array.from({length:9},(_,i)=>{const h=[200,280,220,300,180,260,240,200,280][i];const c=['#1a1a2e','#16213e','#0f3460','#1e293b','#111827','#0d1117','#1c1917','#14532d','#1e1b4b'][i];return `<div class="item" style="height:${h}px;background:${c}"><div class="overlay"><span>Photo ${i+1}</span></div></div>`;}).join('')}
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;padding:24px;background:#0a0a0a;font-family:sans-serif}
.masonry{columns:3;column-gap:12px}
@media(max-width:600px){.masonry{columns:2}}
.item{break-inside:avoid;border-radius:12px;margin-bottom:12px;position:relative;
  overflow:hidden;cursor:pointer;transition:transform .3s}
.item:hover{transform:scale(1.02)}
.overlay{position:absolute;inset:0;background:#00000080;opacity:0;display:grid;
  place-items:center;transition:opacity .3s;color:#fff;font-size:.9rem}
.item:hover .overlay{opacity:1}
@media(prefers-reduced-motion:reduce){.item,.overlay{transition:none}}`
    }
  },

  {
    folder: "carousel-fade-gallery",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Carousel Fade Gallery</title>
<meta name="description" content="Auto-advancing image carousel with crossfade transition and dot controls.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="carousel">
  <div class="slides" id="slides">
    ${['🌌 Galaxy','🏔️ Mountains','🌊 Ocean','🌇 City','🌿 Forest'].map((t,i,a)=>`<div class="slide" style="background:${'#1a1a2e,#16213e,#0f3460,#1e293b,#14532d'.split(',')[i]};opacity:${i===0?1:0}" aria-hidden="${i>0}"><span>${t}</span></div>`).join('')}
  </div>
  <div class="dots" id="dots">
    ${[0,1,2,3,4].map(i=>`<button class="cdot${i===0?' active':''}" data-i="${i}"></button>`).join('')}
  </div>
  <button class="arr prev" id="prev">‹</button>
  <button class="arr next" id="next">›</button>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#111;font-family:sans-serif}
.carousel{position:relative;width:500px;height:300px;border-radius:16px;overflow:hidden}
.slides{position:relative;width:100%;height:100%}
.slide{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  font-size:2rem;color:#fff;transition:opacity .7s ease;border-radius:16px}
.dots{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:10}
.cdot{width:8px;height:8px;border-radius:50%;border:none;background:#ffffff55;cursor:pointer;transition:background .3s}
.cdot.active{background:#fff}
.arr{position:absolute;top:50%;transform:translateY(-50%);background:#00000055;border:none;
  color:#fff;font-size:2rem;padding:0 14px;height:100%;cursor:pointer;z-index:10;transition:background .2s}
.arr:hover{background:#00000099}
.prev{left:0;border-radius:16px 0 0 16px}
.next{right:0;border-radius:0 16px 16px 0}
@media(prefers-reduced-motion:reduce){.slide{transition:none}}`,
      "script.js": `const slides=document.querySelectorAll('.slide');
const dots=document.querySelectorAll('.cdot');
let cur=0,timer;
function show(n){slides[cur].style.opacity=0;slides[cur].setAttribute('aria-hidden','true');dots[cur].classList.remove('active');
  cur=(n+slides.length)%slides.length;
  slides[cur].style.opacity=1;slides[cur].removeAttribute('aria-hidden');dots[cur].classList.add('active');}
function auto(){timer=setInterval(()=>show(cur+1),3500);}
auto();
document.getElementById('prev').onclick=()=>{clearInterval(timer);show(cur-1);auto()};
document.getElementById('next').onclick=()=>{clearInterval(timer);show(cur+1);auto()};
dots.forEach(d=>d.addEventListener('click',()=>{clearInterval(timer);show(+d.dataset.i);auto()}));`
    }
  },

  {
    folder: "lightbox-image-slider",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Lightbox Image Slider</title>
<meta name="description" content="Grid gallery that opens items in a full-screen lightbox slider.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="grid" id="grid">
  ${Array.from({length:6},(_,i)=>`<div class="thumb" data-i="${i}" style="background:${'#1a237e,#b71c1c,#1b5e20,#4a148c,#e65100,#006064'.split(',')[i]};"><span>${['🌃','🎨','🌳','💜','🔥','🌊'][i]}</span></div>`).join('')}
</div>
<div class="lightbox" id="lb">
  <button class="lb-close" id="lbClose">✕</button>
  <button class="lb-arr lprev" id="lprev">‹</button>
  <div class="lb-item" id="lbItem"></div>
  <button class="lb-arr lnext" id="lnext">›</button>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;padding:24px;background:#111;font-family:sans-serif}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:500px;margin:0 auto}
.thumb{aspect-ratio:1;border-radius:10px;display:grid;place-items:center;font-size:3rem;cursor:pointer;
  transition:transform .2s,box-shadow .2s}
.thumb:hover{transform:scale(1.05);box-shadow:0 8px 24px #0008}
.lightbox{display:none;position:fixed;inset:0;background:#000d;z-index:200;
  place-items:center}
.lightbox.open{display:grid}
.lb-item{width:400px;height:300px;border-radius:16px;display:grid;place-items:center;font-size:6rem;transition:opacity .3s}
.lb-close{position:absolute;top:20px;right:24px;background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer}
.lb-arr{background:#ffffff15;border:none;color:#fff;font-size:2.5rem;padding:0 20px;height:100%;cursor:pointer;transition:background .2s}
.lb-arr:hover{background:#ffffff25}
.lprev{border-radius:0}
@media(prefers-reduced-motion:reduce){.thumb,.lb-item{transition:none}}`,
      "script.js": `const thumbs=[...document.querySelectorAll('.thumb')];
const lb=document.getElementById('lb');const item=document.getElementById('lbItem');
const data=thumbs.map(t=>({bg:t.style.background,icon:t.querySelector('span').textContent}));
let cur=0;
function open(i){cur=i;lb.classList.add('open');render();}
function render(){item.style.background=data[cur].bg;item.textContent=data[cur].icon;}
thumbs.forEach((t,i)=>t.addEventListener('click',()=>open(i)));
document.getElementById('lbClose').onclick=()=>lb.classList.remove('open');
document.getElementById('lprev').onclick=()=>{cur=(cur-1+data.length)%data.length;render();};
document.getElementById('lnext').onclick=()=>{cur=(cur+1)%data.length;render();};
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open');});`
    }
  },

  {
    folder: "horizontal-scroll-gallery",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Horizontal Scroll Gallery</title>
<meta name="description" content="Horizontal scroll gallery with snap scrolling and keyboard navigation.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="hgal-wrap">
  <div class="hgal" id="hgal">
    ${Array.from({length:8},(_,i)=>`<div class="hcard" style="background:${'#1e1b4b,#1c1917,#14532d,#1c3547,#3b0764,#1a2035,#27272a,#1f1f1f'.split(',')[i]}"><span>${['🪐','🌋','🌲','🐳','🔮','🌌','⚡','🎭'][i]}</span><p>Scene ${i+1}</p></div>`).join('')}
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a0a;font-family:sans-serif}
.hgal-wrap{width:100%;overflow:hidden;padding:24px 0}
.hgal{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;
  scroll-behavior:smooth;padding:0 24px;scrollbar-width:thin;scrollbar-color:#333 transparent}
.hgal::-webkit-scrollbar{height:4px}
.hgal::-webkit-scrollbar-track{background:transparent}
.hgal::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
.hcard{flex:0 0 260px;height:340px;border-radius:20px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:12px;scroll-snap-align:start;
  font-size:4rem;color:#fff;cursor:grab;transition:transform .3s,box-shadow .3s}
.hcard:hover{transform:scale(1.03) translateY(-4px);box-shadow:0 16px 40px #0008}
.hcard p{font-size:.9rem;color:#94a3b8}
@media(prefers-reduced-motion:reduce){.hcard{transition:none}}`
    }
  },

  {
    folder: "zoom-hover-photo-gallery",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Zoom Hover Photo Gallery</title>
<meta name="description" content="Grid gallery with magnetic zoom reveal on hover.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="zoom-grid">
  ${Array.from({length:6},(_,i)=>`<figure class="zfig"><div class="zimg" style="background:${'linear-gradient(135deg,#1a1a2e,#4a0080),linear-gradient(135deg,#002040,#0080ff),linear-gradient(135deg,#1a2e00,#40a000),linear-gradient(135deg,#2e0000,#800000),linear-gradient(135deg,#2e2000,#806000),linear-gradient(135deg,#002e2e,#006060)'.split('),').map((s,j)=>j===i?s+')':null).filter(Boolean)[0]}"></div><figcaption>Image ${i+1}</figcaption></figure>`).join('')}
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;padding:24px;background:#080808;font-family:sans-serif}
.zoom-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;max-width:700px;margin:0 auto}
.zfig{border-radius:12px;overflow:hidden;cursor:pointer;position:relative}
.zimg{height:180px;transition:transform .4s cubic-bezier(.4,0,.2,1),filter .4s}
.zfig:hover .zimg{transform:scale(1.08);filter:brightness(1.2)}
figcaption{background:#111;color:#6b7280;text-align:center;padding:8px;font-size:.8rem;transition:color .3s}
.zfig:hover figcaption{color:#f1f5f9}
@media(prefers-reduced-motion:reduce){.zimg,figcaption{transition:none}}`
    }
  },

  {
    folder: "polaroid-stack-gallery",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Polaroid Stack Gallery</title>
<meta name="description" content="Stacked polaroid photo cards that fan out on hover.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="polaroid-stack">
  ${[{r:-12,z:1,c:'#1a1a2e',i:'🌌'},{r:5,z:2,c:'#1b2a4a',i:'🌊'},{r:-3,z:3,c:'#2d1b1b',i:'🔥'},{r:8,z:4,c:'#1a2e1a',i:'🌿'},{r:0,z:5,c:'#2a1a2e',i:'⭐'}].map(p=>`<div class="polaroid" style="--r:${p.r}deg;z-index:${p.z};background:${p.c}"><div class="pol-img">${p.i}</div><p>Memory</p></div>`).join('')}
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a0a;font-family:sans-serif}
.polaroid-stack{position:relative;width:180px;height:220px}
.polaroid{position:absolute;inset:0;background:#fff;border-radius:4px;padding:12px 12px 32px;
  transform:rotate(var(--r));transform-origin:center bottom;
  transition:transform .4s cubic-bezier(.34,1.56,.64,1);cursor:pointer;
  box-shadow:0 8px 24px #0008}
.polaroid-stack:hover .polaroid:nth-child(1){transform:rotate(-35deg) translateX(-60px)}
.polaroid-stack:hover .polaroid:nth-child(2){transform:rotate(-15deg) translateX(-30px)}
.polaroid-stack:hover .polaroid:nth-child(3){transform:rotate(0deg)}
.polaroid-stack:hover .polaroid:nth-child(4){transform:rotate(15deg) translateX(30px)}
.polaroid-stack:hover .polaroid:nth-child(5){transform:rotate(35deg) translateX(60px)}
.pol-img{width:100%;height:140px;border-radius:2px;display:grid;place-items:center;font-size:3.5rem}
.polaroid p{text-align:center;font-size:.7rem;color:#666;margin-top:6px;font-family:'Courier New',monospace}
@media(prefers-reduced-motion:reduce){.polaroid{transition:none}}`
    }
  },

  {
    folder: "css-infinite-scroll-carousel",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CSS Infinite Scroll Carousel</title>
<meta name="description" content="Pure CSS infinite looping horizontal carousel with pause on hover.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="scroll-track">
  <div class="scroll-inner">
    ${['React','Vue','Angular','Svelte','Next.js','Nuxt','Remix','Astro','SolidJS','Qwik'].map(t=>`<div class="scroll-card"><span>${t}</span></div>`).join('')}
    ${['React','Vue','Angular','Svelte','Next.js','Nuxt','Remix','Astro','SolidJS','Qwik'].map(t=>`<div class="scroll-card" aria-hidden="true"><span>${t}</span></div>`).join('')}
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0f172a;font-family:sans-serif;overflow:hidden}
.scroll-track{width:100%;overflow:hidden;mask:linear-gradient(90deg,transparent,black 15%,black 85%,transparent)}
.scroll-inner{display:flex;gap:12px;animation:scroll 20s linear infinite;width:max-content}
.scroll-track:hover .scroll-inner{animation-play-state:paused}
@keyframes scroll{to{transform:translateX(-50%)}}
.scroll-card{flex:0 0 140px;height:80px;border-radius:12px;background:#1e293b;border:1px solid #334155;
  display:grid;place-items:center}
.scroll-card span{color:#94a3b8;font-size:.9rem;font-weight:600}
@media(prefers-reduced-motion:reduce){.scroll-inner{animation:none}}`
    }
  },

  {
    folder: "grid-image-slider",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Grid Image Slider</title>
<meta name="description" content="3-column CSS grid-based image reveal slider with staggered entry.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="gslider">
  <div class="gtrack" id="gtrack">
    ${Array.from({length:4},(_,slide)=>`<div class="gslide">${Array.from({length:3},(_,j)=>`<div class="gcell" style="background:${'#1e1b4b,#14532d,#1c1917,#1c3547,#3b0764,#1a2035,#7f1d1d,#064e3b,#1e3a5f,#3b1c8c,#065f46,#1e1e1e'.split(',')[slide*3+j]}"><span>${['🪐','🌋','🌲','🌊','⭐','🔥','🌙','🌿','❄️','⚡','🎯','🌌'][slide*3+j]}</span></div>`).join('')}</div>`).join('')}
  </div>
  <div class="gcontrols">
    <button id="gprev">‹</button>
    ${[0,1,2,3].map(i=>`<button class="gdot${i===0?' active':''}" data-i="${i}"></button>`).join('')}
    <button id="gnext">›</button>
  </div>
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0a0a0a;font-family:sans-serif}
.gslider{width:100%;max-width:580px}
.gtrack{display:flex;overflow:hidden;border-radius:16px}
.gslide{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;flex:0 0 100%;transition:transform .5s cubic-bezier(.4,0,.2,1)}
.gcell{height:180px;border-radius:10px;display:grid;place-items:center;font-size:3rem;cursor:pointer;transition:filter .3s}
.gcell:hover{filter:brightness(1.3)}
.gcontrols{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:14px}
.gcontrols button[id]{background:none;border:1px solid #334155;color:#94a3b8;width:36px;height:36px;border-radius:8px;cursor:pointer;font-size:1.2rem;transition:all .2s}
.gcontrols button[id]:hover{background:#334155;color:#fff}
.gdot{width:8px;height:8px;border-radius:50%;border:none;background:#334155;cursor:pointer;transition:background .2s}
.gdot.active{background:#6366f1}
@media(prefers-reduced-motion:reduce){.gslide,.gcell,.gdot{transition:none}}`,
      "script.js": `const slides=document.querySelectorAll('.gslide');
const dots=document.querySelectorAll('.gdot');
let cur=0;
function show(n){cur=(n+slides.length)%slides.length;
  document.getElementById('gtrack').style.transform='translateX(-'+cur*100+'%)';
  dots.forEach((d,i)=>d.classList.toggle('active',i===cur));}
document.getElementById('gprev').onclick=()=>show(cur-1);
document.getElementById('gnext').onclick=()=>show(cur+1);
dots.forEach(d=>d.addEventListener('click',()=>show(+d.dataset.i)));`
    }
  },

  {
    folder: "spotlight-photo-gallery",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Spotlight Photo Gallery</title>
<meta name="description" content="Gallery with mouse-tracking spotlight that follows hover across items.">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<div class="spot-grid" id="spotGrid">
  ${Array.from({length:6},(_,i)=>`<div class="spot-item" style="background:${'#0f172a,#1a1a2e,#1c1917,#14532d,#1c3547,#3b0764'.split(',')[i]}"><span class="spot-icon">${['⚡','🌌','🔥','🌿','🌊','💜'][i]}</span><p class="spot-lbl">Panel ${i+1}</p></div>`).join('')}
</div>
</body>
</html>`,
      "styles.css": `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#050505;font-family:sans-serif;padding:24px}
.spot-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;max-width:560px;border-radius:16px;overflow:hidden}
.spot-item{height:180px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;
  cursor:pointer;position:relative;overflow:hidden}
.spot-item::after{content:'';position:absolute;inset:0;
  background:radial-gradient(circle 100px at var(--mx,50%) var(--my,50%),#ffffff18,transparent 70%);
  opacity:0;transition:opacity .3s}
.spot-item:hover::after{opacity:1}
.spot-icon{font-size:3rem;position:relative;z-index:1}
.spot-lbl{font-size:.75rem;color:#6b7280;position:relative;z-index:1}
@media(prefers-reduced-motion:reduce){.spot-item::after{transition:none}}`,
      "script.js": `document.querySelectorAll('.spot-item').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    el.style.setProperty('--mx',(e.clientX-r.left)+'px');
    el.style.setProperty('--my',(e.clientY-r.top)+'px');
  });
});`
    }
  },

];

let count = 0;
for (const comp of components) {
  await write(comp.folder, comp.files);
  count++;
}
console.log(`Part 1 complete: ${count} components created.`);
