const root = document.documentElement;
const spine = document.querySelector('.spine');
const swipe = document.querySelector('.swipe--wide');
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

if (spine) {
  const len = spine.getTotalLength();
  root.style.setProperty('--len', len.toFixed(2));
  if (swipe) root.style.setProperty('--len2', swipe.getTotalLength().toFixed(2));
  if (lenOut) lenOut.textContent = Math.round(len) + ' units';
}

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
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) requestAnimationFrame(function (now) { readout(now); });
  });
}
