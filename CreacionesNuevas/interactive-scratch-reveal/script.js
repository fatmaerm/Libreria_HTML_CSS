const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const hint = document.getElementById("scratchHint");

// Draw metallic foil pattern
const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
grad.addColorStop(0, "#cbd5e1");
grad.addColorStop(0.3, "#94a3b8");
grad.addColorStop(0.5, "#f1f5f9");
grad.addColorStop(0.7, "#64748b");
grad.addColorStop(1, "#cbd5e1");

ctx.fillStyle = grad;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Pattern overlay
ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
for (let i = 0; i < canvas.width; i += 6) {
  ctx.fillRect(i, 0, 3, canvas.height);
}

let isScratching = false;

function scratch(x, y) {
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 18, 0, Math.PI * 2);
  ctx.fill();
  checkProgress();
}

function getCoords(e) {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

canvas.addEventListener("mousedown", (e) => {
  isScratching = true;
  const { x, y } = getCoords(e);
  scratch(x, y);
});

canvas.addEventListener("mousemove", (e) => {
  if (!isScratching) return;
  const { x, y } = getCoords(e);
  scratch(x, y);
});

window.addEventListener("mouseup", () => isScratching = false);

// Touch events
canvas.addEventListener("touchstart", (e) => {
  isScratching = true;
  const { x, y } = getCoords(e);
  scratch(x, y);
}, { passive: true });

canvas.addEventListener("touchmove", (e) => {
  if (!isScratching) return;
  const { x, y } = getCoords(e);
  scratch(x, y);
}, { passive: true });

window.addEventListener("touchend", () => isScratching = false);

let cleared = false;
function checkProgress() {
  if (cleared) return;
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let transparentCount = 0;
  for (let i = 3; i < imgData.data.length; i += 16) {
    if (imgData.data[i] === 0) transparentCount++;
  }
  const total = imgData.data.length / 16;
  if (transparentCount / total > 0.45) {
    cleared = true;
    canvas.style.opacity = "0";
    canvas.style.pointerEvents = "none";
    hint.style.display = "none";
  }
}