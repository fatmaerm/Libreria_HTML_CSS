(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const TAU = Math.PI * 2;
  const PERIOD = 24000;
  const CX = 500;
  const CY = 320;
  const R0 = 176;
  const W0 = 64;
  const FOCAL = 330;
  const N_EDGE = 224;
  const N_SPINE = 140;
  const N_RIB = 60;
  const N_LOBE = 56;
  const A_LOBE = 150;
  const Y_LOBE = 1.72;

  const svg = document.getElementById('mobius');
  const gBack = document.getElementById('lobeBack');
  const gFront = document.getElementById('lobeFront');
  const pBody = document.getElementById('body');
  const pRibsMajor = document.getElementById('ribsMajor');
  const pRibsMinor = document.getElementById('ribsMinor');
  const pEdgeHalo = document.getElementById('edgeHalo');
  const pEdge = document.getElementById('edge');
  const pComet = document.getElementById('comet');
  const pSpineHalo = document.getElementById('spineHalo');
  const pSpine = document.getElementById('spine');
  const pReveal = document.getElementById('reveal');
  const gradSilk = document.getElementById('silkGrad');
  const gradLoop = document.getElementById('loopGrad');
  const revealOut = document.getElementById('revealOut');
  const revealBar = document.getElementById('revealBar');
  const bandOut = document.getElementById('bandOut');

  const lobes = [];
  for (let k = 0; k < 4; k++) {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('class', 'lobe-path');
    lobes.push(p);
  }

  const EX = new Float64Array(N_EDGE);
  const EY = new Float64Array(N_EDGE);
  const SX = new Float64Array(N_SPINE);
  const SY = new Float64Array(N_SPINE);

  const n1 = (v) => Math.round(v * 10) / 10;

  let frontRight = null;
  let scale = 1;

  const layout = () => {
    const narrow = window.innerWidth < 760;
    svg.setAttribute('viewBox', narrow ? '206 112 588 424' : '0 0 1000 640');
    const box = svg.getBoundingClientRect();
    scale = box.width / (narrow ? 588 : 1000) || 1;
    const sw = Math.max(1, Math.min(2.4, 0.92 / scale));
    svg.style.setProperty('--sw', sw.toFixed(3));
  };

  const render = (u, psiOff, phiOff) => {
    const psi = TAU * u * 2 + psiOff;
    const phi = TAU * u * 3 + phiOff;
    const w = W0 * (0.74 + 0.26 * Math.sin(TAU * u));
    const ysq = 0.62 + 0.1 * Math.sin(TAU * 2 * u);
    const cp = Math.cos(psi);
    const sp = Math.sin(psi);
    const cphi = 0.32 + 0.68 * Math.cos(phi);
    const sphi = Math.sin(phi);
    const invF = 1 / FOCAL;

    for (let i = 0; i < N_EDGE; i++) {
      const tt = (i / N_EDGE) * TAU * 2;
      const rho = R0 * (1 + 0.085 * Math.sin(2 * tt) + 0.03 * Math.sin(3 * tt + TAU * u));
      const hw = tt * 0.5;
      const rad = rho + w * Math.cos(hw);
      const sc = 1 / (1 + w * Math.sin(hw) * invF);
      const x = rad * Math.cos(tt) * sc * cphi;
      const y = rad * Math.sin(tt) * ysq * sc;
      EX[i] = CX + x * cp - y * sp;
      EY[i] = CY + x * sp + y * cp;
    }

    for (let i = 0; i < N_SPINE; i++) {
      const tt = (i / N_SPINE) * TAU;
      const rho = R0 * (1 + 0.085 * Math.sin(2 * tt) + 0.03 * Math.sin(3 * tt + TAU * u));
      const x = rho * Math.cos(tt) * cphi;
      const y = rho * Math.sin(tt) * ysq;
      SX[i] = CX + x * cp - y * sp;
      SY[i] = CY + x * sp + y * cp;
    }

    let edgeLen = 0;
    let sEdge = 'M';
    for (let i = 0; i < N_EDGE; i++) {
      const j = i === N_EDGE - 1 ? 0 : i + 1;
      edgeLen += Math.hypot(EX[j] - EX[i], EY[j] - EY[i]);
      sEdge += (i === 0 ? '' : 'L') + n1(EX[i]) + ' ' + n1(EY[i]);
    }

    let spineLen = 0;
    let sSpine = 'M';
    for (let i = 0; i < N_SPINE; i++) {
      const j = i === N_SPINE - 1 ? 0 : i + 1;
      spineLen += Math.hypot(SX[j] - SX[i], SY[j] - SY[i]);
      sSpine += (i === 0 ? '' : 'L') + n1(SX[i]) + ' ' + n1(SY[i]);
    }

    let sRibsMajor = '';
    let sRibsMinor = '';
    for (let k = 0; k < N_RIB; k++) {
      const tt = (k / N_RIB) * TAU;
      const rho = R0 * (1 + 0.085 * Math.sin(2 * tt) + 0.03 * Math.sin(3 * tt + TAU * u));
      const hw = tt * 0.5;
      const cs = Math.cos(hw);
      const sn = Math.sin(hw);
      const c0 = Math.cos(tt);
      const s0 = Math.sin(tt);
      let out = '';
      for (let e = 0; e < 2; e++) {
        const s = e === 0 ? 1 : -1;
        const rad = rho + w * cs * s;
        const sc = 1 / (1 + w * sn * s * invF);
        const x = rad * c0 * sc * cphi;
        const y = rad * s0 * ysq * sc;
        out += (e === 0 ? 'M' : 'L') + n1(CX + x * cp - y * sp) + ' ' + n1(CY + x * sp + y * cp);
      }
      if (k % 5 === 0) {
        sRibsMajor += out;
      } else {
        sRibsMinor += out;
      }
    }

    const hx = R0 * 0.55;
    const hy = R0 * 0.55 * ysq;
    let sHole = 'M';
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * TAU;
      const x = hx * Math.cos(a) * cphi;
      const y = hy * Math.sin(a);
      sHole += (i === 0 ? '' : 'L') + n1(CX + x * cp - y * sp) + ' ' + n1(CY + x * sp + y * cp);
    }

    for (let k = 0; k < 4; k++) {
      let d = 'M';
      for (let j = 0; j <= N_LOBE; j++) {
        const t = (k + j / N_LOBE) * Math.PI * 0.5;
        const sn = Math.sin(t);
        const cs = Math.cos(t);
        const den = 1 + sn * sn;
        const x0 = A_LOBE * cs / den;
        const y0 = A_LOBE * sn * cs / den * Y_LOBE;
        const z = -x0 * sphi;
        const sc = 1 / (1 + z * invF);
        const x = x0 * sc * cphi;
        const y = y0 * sc;
        d += (j === 0 ? '' : 'L') + n1(CX + x * cp - y * sp) + ' ' + n1(CY + x * sp + y * cp);
      }
      lobes[k].setAttribute('d', d);
    }

    const wantRight = !(sphi > 0);
    if (wantRight !== frontRight) {
      frontRight = wantRight;
      const back = frontRight ? [lobes[1], lobes[2]] : [lobes[0], lobes[3]];
      const front = frontRight ? [lobes[0], lobes[3]] : [lobes[1], lobes[2]];
      gBack.replaceChildren(back[0], back[1]);
      gFront.replaceChildren(front[0], front[1]);
    }

    pEdge.setAttribute('d', sEdge);
    pEdgeHalo.setAttribute('d', sEdge);
    pComet.setAttribute('d', sEdge);
    pSpine.setAttribute('d', sSpine);
    pSpineHalo.setAttribute('d', sSpine);
    pReveal.setAttribute('d', sSpine);
    pRibsMajor.setAttribute('d', sRibsMajor);
    pRibsMinor.setAttribute('d', sRibsMinor);
    pBody.setAttribute('d', sEdge + 'Z' + sHole + 'Z');

    const seg = 52;
    const travel = u * (seg + edgeLen);
    pComet.style.strokeDasharray = seg + ' ' + n1(edgeLen);
    pComet.style.strokeDashoffset = n1(-travel);

    const rev = 0.5 - 0.5 * Math.cos(TAU * u);
    pReveal.style.strokeDasharray = n1(rev * spineLen) + ' ' + n1(spineLen + 2);
    pReveal.style.strokeDashoffset = '0';

    const rot = 18 + 360 * u;
    gradSilk.setAttribute('gradientTransform', 'rotate(' + rot.toFixed(1) + ' 500 320)');
    gradLoop.setAttribute('gradientTransform', 'rotate(' + (rot * 1.6).toFixed(1) + ' 500 320)');

    revealOut.textContent = Math.round(rev * 100) + '%';
    revealBar.style.transform = 'scaleX(' + rev.toFixed(3) + ')';
    bandOut.textContent = Math.round(w * 2 * scale) + ' px';
  };

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let running = false;
  let raf = 0;
  let clock = 0;
  let last = 0;
  let psi = 0;
  let phi = 0;
  let psiT = 0;
  let phiT = 0;
  let dragging = false;
  let px = 0;
  let py = 0;

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    if (!last) last = now;
    const dt = Math.min(50, now - last);
    last = now;
    clock += dt;
    psi += (psiT - psi) * 0.1;
    phi += (phiT - phi) * 0.1;
    const u = (clock % PERIOD) / PERIOD;
    render(u, psi, phi);
  };

  const start = () => {
    if (running || motion.matches) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const sync = () => {
    if (motion.matches) {
      stop();
      render(0.2, 0.5, -1.1);
    } else {
      start();
    }
  };

  svg.addEventListener('pointerdown', (e) => {
    dragging = true;
    px = e.clientX;
    py = e.clientY;
    svg.setPointerCapture(e.pointerId);
  });

  svg.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    psiT += (e.clientX - px) * 0.011;
    phiT = Math.max(-3.2, Math.min(3.2, phiT + (e.clientY - py) * 0.011));
    px = e.clientX;
    py = e.clientY;
  });

  const release = () => {
    dragging = false;
  };

  svg.addEventListener('pointerup', release);
  svg.addEventListener('pointercancel', release);
  svg.addEventListener('dblclick', () => {
    psiT = 0;
    phiT = 0;
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

  window.addEventListener('resize', () => {
    layout();
    if (motion.matches) {
      render(0.2, psi, phi);
    }
  });

  layout();
  requestAnimationFrame(layout);
  sync();
})();
