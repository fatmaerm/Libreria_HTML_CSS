(() => {
  const canvas = document.getElementById('hyper');
  const ctx = canvas.getContext('2d');
  const TAU = Math.PI * 2;
  const PERIOD = 26000;
  const FOCAL = 3.4;

  const V = new Float64Array(64);
  for (let i = 0; i < 16; i++) {
    V[i * 4] = (i & 8) ? 1 : -1;
    V[i * 4 + 1] = (i & 4) ? 1 : -1;
    V[i * 4 + 2] = (i & 2) ? 1 : -1;
    V[i * 4 + 3] = (i & 1) ? 1 : -1;
  }

  const EA = new Int16Array(32);
  const EB = new Int16Array(32);
  let ec = 0;
  for (let i = 0; i < 16; i++) {
    for (let b = 0; b < 4; b++) {
      const j = i ^ (1 << b);
      if (j > i) {
        EA[ec] = i;
        EB[ec] = j;
        ec++;
      }
    }
  }

  const FACES = [
    [0, 1, 3, 2], [4, 5, 7, 6],
    [0, 1, 5, 4], [2, 3, 7, 6],
    [0, 2, 6, 4], [1, 3, 7, 5]
  ];
  const seen = new Set();
  const quads = [];
  for (let p = 0; p < 4; p++) {
    const free = [0, 1, 2, 3].filter((b) => b !== p);
    for (let val = 0; val < 2; val++) {
      const c = new Array(8);
      for (let k = 0; k < 8; k++) {
        let idx = val << p;
        idx |= (k & 1) << free[2];
        idx |= ((k >> 1) & 1) << free[1];
        idx |= ((k >> 2) & 1) << free[0];
        c[k] = idx;
      }
      for (let f = 0; f < 6; f++) {
        const face = FACES[f];
        const key = face.map((j) => c[j]).sort((a, b) => a - b).join(',');
        if (seen.has(key)) continue;
        seen.add(key);
        for (let j = 0; j < 4; j++) quads.push(c[face[j]]);
      }
    }
  }

  const NQ = quads.length / 4;
  const QA = new Int16Array(quads);
  const qOrder = new Int32Array(NQ);
  const qDepth = new Float64Array(NQ);
  const eOrder = new Int32Array(ec);
  const eDepth = new Float64Array(ec);
  for (let i = 0; i < NQ; i++) qOrder[i] = i;
  for (let i = 0; i < ec; i++) eOrder[i] = i;

  const PX = new Float64Array(16);
  const PY = new Float64Array(16);
  const PS = new Float64Array(16);
  const PW = new Float64Array(16);
  const TN = new Float64Array(16);

  const RAMP = [
    [0.00, 20, 82, 122],
    [0.28, 54, 148, 202],
    [0.50, 104, 96, 232],
    [0.74, 188, 118, 242],
    [1.00, 255, 126, 198]
  ];

  const ramp = (t, alpha) => {
    let k = 0;
    while (k < RAMP.length - 2 && t > RAMP[k + 1][0]) k++;
    const a = RAMP[k];
    const b = RAMP[k + 1];
    const f = Math.min(1, Math.max(0, (t - a[0]) / (b[0] - a[0])));
    const r = Math.round(a[1] + (b[1] - a[1]) * f);
    const g = Math.round(a[2] + (b[2] - a[2]) * f);
    const bl = Math.round(a[3] + (b[3] - a[3]) * f);
    return 'rgba(' + r + ',' + g + ',' + bl + ',' + alpha + ')';
  };

  const sprite = document.createElement('canvas');
  sprite.width = 64;
  sprite.height = 64;
  const sctx = sprite.getContext('2d');
  const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.16, 'rgba(224,244,255,0.9)');
  grad.addColorStop(0.42, 'rgba(150,196,255,0.26)');
  grad.addColorStop(1, 'rgba(120,180,255,0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 64, 64);

  let W = 0;
  let H = 0;
  let CX = 0;
  let CY = 0;
  let RAD = 0;
  let HZ = 0;

  const angXw = document.getElementById('angXw');
  const angYw = document.getElementById('angYw');
  const wDepth = document.getElementById('wDepth');
  const wBar = document.getElementById('wBar');
  const fpsOut = document.getElementById('fps');

  const resize = () => {
    const cw = canvas.clientWidth || window.innerWidth;
    const ch = canvas.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(cw * dpr));
    canvas.height = Math.max(1, Math.round(ch * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = cw;
    H = ch;
    CX = cw * 0.5;
    CY = ch * 0.45;
    RAD = Math.max(72, Math.min(cw * 0.2, ch * 0.165));
    HZ = ch * 0.74;
  };

  const project = (t, yaw, pit) => {
    const a = TAU * t + yaw;
    const b = -TAU * t + pit;
    const c = TAU * t + yaw * 0.6;
    const rx = 0.3 * Math.sin(TAU * t) + 0.11 * Math.sin(TAU * 3 * t);
    const rz = 0.09 * Math.sin(TAU * 2 * t);
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    const cb = Math.cos(b);
    const sb = Math.sin(b);
    const cc = Math.cos(c);
    const sc = Math.sin(c);
    const cx = Math.cos(rx);
    const sx = Math.sin(rx);
    const cz = Math.cos(rz);
    const sz = Math.sin(rz);
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i < 16; i++) {
      const x = V[i * 4];
      const y = V[i * 4 + 1];
      const z = V[i * 4 + 2];
      const w = V[i * 4 + 3];
      const xa = x * ca - w * sa;
      const wa = x * sa + w * ca;
      const yb = y * cb - wa * sb;
      const wb = y * sb + wa * cb;
      const xr = xa * cc + z * sc;
      const zr = -xa * sc + z * cc;
      const yr = yb * cx - zr * sx;
      const zf = yb * sx + zr * cx;
      const xf = xr * cz - yr * sz;
      const yf = xr * sz + yr * cz;
      const s = FOCAL / (FOCAL + zf);
      PX[i] = CX + xf * s * RAD;
      PY[i] = CY - yf * s * RAD;
      PS[i] = s;
      PW[i] = wb;
      if (s < lo) lo = s;
      if (s > hi) hi = s;
    }
    const span = hi - lo || 1;
    for (let i = 0; i < 16; i++) {
      const d = (PS[i] - lo) / span;
      const inv = (1 - PW[i]) * 0.5;
      TN[i] = Math.min(1, Math.max(0, d * 0.58 + inv * 0.42));
    }
  };

  const floor = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(120,190,235,0.10)';
    ctx.beginPath();
    for (let i = 1; i <= 13; i++) {
      const f = i / 13;
      const y = HZ + (H - HZ) * f * f * 1.08;
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
    }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(150,200,255,0.07)';
    ctx.beginPath();
    for (let i = -5; i <= 5; i++) {
      ctx.moveTo(CX + i * 26, HZ);
      ctx.lineTo(CX + i * (W * 0.19), H + 10);
    }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(170,220,255,0.16)';
    ctx.beginPath();
    ctx.moveTo(0, HZ);
    ctx.lineTo(W, HZ);
    ctx.stroke();
  };

  const mirror = (i) => HZ + (HZ - PY[i]) * 0.42;

  const draw = (t, yaw, pit) => {
    project(t, yaw, pit);
    ctx.clearRect(0, 0, W, H);
    floor();

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < ec; i++) {
      const a = EA[i];
      const b = EB[i];
      eDepth[i] = (PS[a] + PS[b]) * 0.5;
    }
    eOrder.sort((p, q) => eDepth[p] - eDepth[q]);

    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = 1;
    for (let i = 0; i < ec; i++) {
      const a = EA[eOrder[i]];
      const b = EB[eOrder[i]];
      if (PY[a] > HZ - 4 || PY[b] > HZ - 4) continue;
      const tone = (TN[a] + TN[b]) * 0.5;
      ctx.strokeStyle = ramp(tone * 0.6, 0.05 + 0.07 * tone);
      ctx.beginPath();
      ctx.moveTo(PX[a], mirror(a));
      ctx.lineTo(PX[b], mirror(b));
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';

    for (let i = 0; i < NQ; i++) {
      const o = i * 4;
      qDepth[i] = (PS[QA[o]] + PS[QA[o + 1]] + PS[QA[o + 2]] + PS[QA[o + 3]]) * 0.25;
    }
    qOrder.sort((p, q) => qDepth[p] - qDepth[q]);

    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < NQ; i++) {
      const o = qOrder[i] * 4;
      const a = QA[o];
      const b = QA[o + 1];
      const c = QA[o + 2];
      const d = QA[o + 3];
      const tone = (TN[a] + TN[b] + TN[c] + TN[d]) * 0.25;
      ctx.fillStyle = ramp(0.28 + tone * 0.72, 0.018 + 0.055 * tone);
      ctx.beginPath();
      ctx.moveTo(PX[a], PY[a]);
      ctx.lineTo(PX[b], PY[b]);
      ctx.lineTo(PX[c], PY[c]);
      ctx.lineTo(PX[d], PY[d]);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';

    for (let i = 0; i < ec; i++) {
      const a = EA[eOrder[i]];
      const b = EB[eOrder[i]];
      const tone = (TN[a] + TN[b]) * 0.5;
      const w = 0.55 + 2.5 * Math.pow(tone, 1.55);
      ctx.lineWidth = w;
      ctx.strokeStyle = ramp(0.14 + tone * 0.86, 0.12 + 0.85 * Math.pow(tone, 1.25));
      ctx.beginPath();
      ctx.moveTo(PX[a], PY[a]);
      ctx.lineTo(PX[b], PY[b]);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 16; i++) {
      const tone = TN[i];
      const size = 8 + 40 * tone;
      ctx.globalAlpha = 0.1 + 0.55 * tone * tone;
      ctx.drawImage(sprite, PX[i] - size * 0.5, PY[i] - size * 0.5, size, size);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';

    for (let i = 0; i < 16; i++) {
      const tone = TN[i];
      const r = 0.7 + 2.3 * tone;
      ctx.fillStyle = ramp(0.35 + tone * 0.65, 0.3 + 0.7 * tone);
      ctx.beginPath();
      ctx.arc(PX[i], PY[i], r, 0, TAU);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,' + (0.2 + 0.7 * tone) + ')';
      ctx.beginPath();
      ctx.arc(PX[i], PY[i], r * 0.42, 0, TAU);
      ctx.fill();
    }
  };

  const hud = (t, frames, yaw) => {
    const degX = ((TAU * t + yaw) * 180) / Math.PI % 360;
    const degY = ((-TAU * t + yaw * 0.6) * 180) / Math.PI % 360;
    angXw.textContent = degX.toFixed(1) + '\u00b0';
    angYw.textContent = degY.toFixed(1) + '\u00b0';
    const w = PW[0];
    wDepth.textContent = (w >= 0 ? '+' : '') + w.toFixed(3);
    wBar.style.transform = 'scaleX(' + (0.06 + 0.94 * (w * 0.5 + 0.5)).toFixed(3) + ')';
    fpsOut.textContent = frames < 0 ? 'still' : frames + ' fps';
  };

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let running = false;
  let raf = 0;
  let clock = 0;
  let last = 0;
  let yaw = 0;
  let pit = 0;
  let yawT = 0;
  let pitT = 0;
  let dragging = false;
  let px = 0;
  let py = 0;
  let fpsCount = 0;
  let fpsStamp = 0;

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    if (!last) last = now;
    const dt = Math.min(50, now - last);
    last = now;
    clock += dt;
    yaw += (yawT - yaw) * 0.12;
    pit += (pitT - pit) * 0.12;
    const t = (clock % PERIOD) / PERIOD;
    draw(t, yaw, pit);
    fpsCount++;
    if (now - fpsStamp > 500) {
      hud(t, Math.round((fpsCount * 1000) / (now - fpsStamp)), yaw);
      fpsStamp = now;
      fpsCount = 0;
    }
  };

  const start = () => {
    if (running || motion.matches) return;
    running = true;
    last = 0;
    fpsStamp = performance.now();
    raf = requestAnimationFrame(frame);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const sync = () => {
    if (motion.matches) {
      stop();
      draw(0.19, 0.5, -0.3);
      hud(0.19, -1, 0.5);
    } else {
      start();
    }
  };

  canvas.addEventListener('pointerdown', (e) => {
    dragging = true;
    px = e.clientX;
    py = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    yawT += (e.clientX - px) * 0.0082;
    pitT = Math.max(-1.4, Math.min(1.4, pitT + (e.clientY - py) * 0.0082));
    px = e.clientX;
    py = e.clientY;
  });

  const release = () => {
    dragging = false;
  };

  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('dblclick', () => {
    yawT = 0;
    pitT = 0;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  if (motion.addEventListener) {
    motion.addEventListener('change', sync);
  }

  window.addEventListener('resize', resize);
  resize();
  sync();
})();
