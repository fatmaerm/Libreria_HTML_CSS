const field = document.querySelector('.bloom-field');
const sheet = document.querySelector('.sheet');
const still = window.matchMedia('(prefers-reduced-motion: reduce)');

const pigments = [
  ['rgba(186,97,58,.95)', 'rgba(150,71,50,0)', 'rgba(214,140,96,.9)', 'rgba(214,140,96,0)'],
  ['rgba(74,94,148,.88)', 'rgba(52,68,112,0)', 'rgba(126,146,196,.85)', 'rgba(126,146,196,0)'],
  ['rgba(199,147,58,.92)', 'rgba(160,113,36,0)', 'rgba(226,186,112,.85)', 'rgba(226,186,112,0)'],
  ['rgba(172,74,68,.9)', 'rgba(131,50,50,0)', 'rgba(214,132,124,.85)', 'rgba(214,132,124,0)'],
  ['rgba(114,138,98,.9)', 'rgba(84,106,71,0)', 'rgba(160,182,138,.85)', 'rgba(160,182,138,0)'],
  ['rgba(146,96,140,.82)', 'rgba(108,66,108,0)', 'rgba(190,152,186,.8)', 'rgba(190,152,186,0)']
];

const LIMIT = 6;
let wet = 0;
let dragging = false;

function pigment(index, size, seconds, clientX, clientY) {
  if (!field || still.matches || wet >= LIMIT) return;
  const box = field.getBoundingClientRect();
  if (box.width < 2 || box.height < 2) return;
  const p = pigments[index % pigments.length];
  const node = document.createElement('div');
  node.className = 'bloom bloom--touch';
  node.style.setProperty('--x', (((clientX - box.left) / box.width) * 100).toFixed(2) + '%');
  node.style.setProperty('--y', (((clientY - box.top) / box.height) * 100).toFixed(2) + '%');
  node.style.setProperty('--size', size + '%');
  node.style.setProperty('--c1', p[0]);
  node.style.setProperty('--c2', p[1]);
  node.style.setProperty('--c3', p[2]);
  node.style.setProperty('--c4', p[3]);
  node.style.setProperty('--dur', seconds + 's');
  const form = document.createElement('span');
  form.className = 'bloom-form';
  node.appendChild(form);
  wet += 1;
  const drop = function () {
    wet -= 1;
    if (node.parentNode) node.parentNode.removeChild(node);
  };
  node.addEventListener('animationend', drop, { once: true });
  field.appendChild(node);
}

function wetPaper(event) {
  const roll = Math.random();
  const which = roll < 0.34 ? 0 : roll < 0.52 ? 1 : roll < 0.7 ? 2 : roll < 0.84 ? 3 : roll < 0.94 ? 4 : 5;
  const size = 15 + Math.random() * 17;
  const seconds = 5.4 + Math.random() * 1.8;
  pigment(which, size, seconds, event.clientX, event.clientY);
}

if (sheet) {
  sheet.addEventListener('pointerdown', function (event) {
    if (event.button !== undefined && event.button !== 0) return;
    dragging = true;
    wetPaper(event);
  });
  sheet.addEventListener('pointermove', function (event) {
    if (dragging) wetPaper(event);
  });
}

window.addEventListener('pointerup', function () { dragging = false; });
window.addEventListener('pointercancel', function () { dragging = false; });
window.addEventListener('blur', function () { dragging = false; });
