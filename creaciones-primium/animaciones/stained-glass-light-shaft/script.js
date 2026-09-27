const lumOut = document.getElementById('lumLabel');
const sweepOut = document.getElementById('sweepLabel');
const moteOut = document.getElementById('moteLabel');
const still = window.matchMedia('(prefers-reduced-motion: reduce)');

const BREATH = 11000;
const SWEEP = 19000;
const BASE = 3;
const SPAN = 17;

let last = '';

if (moteOut) {
  const total = document.querySelectorAll('.motes i').length;
  moteOut.textContent = total + ' drifting';
}

if (!still.matches && lumOut && sweepOut) {
  const tick = function (now) {
    const t = now / 1000;
    const rise = 0.5 - 0.5 * Math.cos((2 * Math.PI * t) / (BREATH * 2));
    const swing = 0.5 - 0.5 * Math.cos((2 * Math.PI * t) / (SWEEP * 2));
    const lum = (0.78 + 0.22 * rise).toFixed(2);
    const deg = Math.round(BASE - 8 + SPAN * swing);
    const text = lum + '|' + deg;
    if (text !== last) {
      last = text;
      lumOut.textContent = lum + ' rel';
      sweepOut.textContent = deg + ' deg';
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
} else if (lumOut) {
  lumOut.textContent = '0.89 rel';
  if (sweepOut) sweepOut.textContent = '3 deg';
}
