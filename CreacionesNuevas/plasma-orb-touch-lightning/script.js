const canvas = document.getElementById("plasmaCanvas");
const ctx = canvas.getContext("2d");
let touch = { x: 110, y: 40 };
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  touch.x = e.clientX - rect.left;
  touch.y = e.clientY - rect.top;
});
function draw() {
  ctx.fillStyle = "rgba(5, 3, 8, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  const segments = 8;
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const px = cx + (touch.x - cx) * t + (Math.random() - 0.5) * 20;
    const py = cy + (touch.y - cy) * t + (Math.random() - 0.5) * 20;
    ctx.lineTo(px, py);
  }
  ctx.strokeStyle = "#ec4899";
  ctx.lineWidth = 2.5;
  ctx.shadowColor = "#f472b6";
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.shadowBlur = 0;
  // Core
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fillStyle = "#a855f7";
  ctx.fill();
  requestAnimationFrame(draw);
}
draw();