const root = document.documentElement;
const spine = document.querySelector('.spine');
const swipe = document.querySelector('.swipe');
const fine = document.querySelector('.fine');
const tendril = document.querySelector('.wisps path');
const phaseOut = document.getElementById('phaseLabel');
const lenOut = document.getElementById('lenLabel');
const still = window.matchMedia('(prefers-reduced-motion: reduce)');

const CYCLE = 13000;

const STAGES = [
  [0.05, 'rest'],
  [0.2, 'entry'],
  [0.33, 'press'],
  [0.45, 'blot'],
  [0.55, 'gesture'],
  [0.7, 'settling'],
  [0.84, 'rinse'],
  [1.01, 'blank']
];

function setLen(node, name) {
  if (!node || typeof node.getTotalLength !== 'function') return;
  const value = node.getTotalLength();
  if (value > 0) root.style.setProperty(name, value.toFixed(2));
}

setLen(spine, '--len');
setLen(swipe, '--len2');
setLen(fine, '--len3');
setLen(tendril, '--len4');

if (lenOut && spine) lenOut.textContent = Math.round(spine.getTotalLength()) + ' units';

let shown = '';

function readout(now) {
  if (!phaseOut) return;
  const ratio = (now % CYCLE) / CYCLE;
  let name = STAGES[0][1];
  for (let i = 0; i < STAGES.length; i += 1) {
    if (ratio < STAGES[i][0]) {
      name = STAGES[i][1];
      break;
    }
  }
  const text = name + ' ' + Math.round(ratio * 100) + '%';
  if (text !== shown) {
    shown = text;
    phaseOut.textContent = text;
  }
}

if (still.matches) {
  if (phaseOut) phaseOut.textContent = 'held still';
} else {
  const tick = function (now) {
    readout(now);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
