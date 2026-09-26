const canvas = document.getElementById("scopeCanvas");
const ctx = canvas.getContext("2d");

let currentMode = "sine";
let t = 0;

document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
  });
});

function draw() {
  ctx.fillStyle = "rgba(2, 18, 8, 0.22)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#39ff84";
  ctx.shadowColor = "#39ff84";
  ctx.shadowBlur = 10;
  ctx.lineWidth = 2.5;
  ctx.beginPath();

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  if (currentMode === "sine") {
    for (let x = 0; x < canvas.width; x += 2) {
      const y = cy + Math.sin(x * 0.04 + t) * 55 * Math.sin(t * 0.5);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  } else if (currentMode === "lissajous") {
    const a = 3;
    const b = 2;
    const delta = t;
    const rX = 110;
    const rY = 75;
    for (let theta = 0; theta < Math.PI * 2; theta += 0.04) {
      const x = cx + rX * Math.sin(a * theta + delta);
      const y = cy + rY * Math.sin(b * theta);
      if (theta === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  } else if (currentMode === "square") {
    for (let x = 0; x < canvas.width; x += 3) {
      const carrier = Math.sin(x * 0.08 + t * 2);
      const mod = Math.sin(x * 0.015);
      const y = cy + (carrier * mod) * 65;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
  ctx.shadowBlur = 0;

  t += 0.04;
  requestAnimationFrame(draw);
}

draw();