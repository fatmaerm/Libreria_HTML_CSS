const canvas = document.getElementById("quantumCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const p1 = { x: canvas.width * 0.35, y: canvas.height * 0.5, color: "#38bdf8", angle: 0 };
const p2 = { x: canvas.width * 0.65, y: canvas.height * 0.5, color: "#ec4899", angle: Math.PI };

let pointer = { x: canvas.width * 0.5, y: canvas.height * 0.5, isDown: false };

canvas.addEventListener("mousemove", (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
});

canvas.addEventListener("mousedown", () => pointer.isDown = true);
canvas.addEventListener("mouseup", () => pointer.isDown = false);

let t = 0;

function animate() {
  ctx.fillStyle = "rgba(3, 2, 8, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  t += 0.03;

  const baseDist = Math.min(canvas.width, canvas.height) * 0.22;
  const cx = pointer.isDown ? pointer.x : canvas.width / 2 + Math.cos(t * 0.5) * 40;
  const cy = pointer.isDown ? pointer.y : canvas.height / 2 + Math.sin(t * 0.5) * 30;

  p1.x = cx + Math.cos(t) * baseDist;
  p1.y = cy + Math.sin(t) * baseDist * 0.6;

  p2.x = cx - Math.cos(t) * baseDist;
  p2.y = cy - Math.sin(t) * baseDist * 0.6;

  // Draw plasma beam between p1 and p2
  const strands = 6;
  for (let s = 0; s < strands; s++) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    const midX = (p1.x + p2.x) / 2 + Math.sin(t * 3 + s) * 35;
    const midY = (p1.y + p2.y) / 2 + Math.cos(t * 3 + s) * 35;
    ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
    ctx.strokeStyle = s % 2 === 0 ? "rgba(56, 189, 248, 0.5)" : "rgba(236, 72, 153, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Draw node 1
  ctx.shadowColor = p1.color;
  ctx.shadowBlur = 25;
  ctx.fillStyle = p1.color;
  ctx.beginPath();
  ctx.arc(p1.x, p1.y, 16, 0, Math.PI * 2);
  ctx.fill();

  // Draw node 2
  ctx.shadowColor = p2.color;
  ctx.shadowBlur = 25;
  ctx.fillStyle = p2.color;
  ctx.beginPath();
  ctx.arc(p2.x, p2.y, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // White cores
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(p1.x, p1.y, 6, 0, Math.PI * 2);
  ctx.arc(p2.x, p2.y, 6, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(animate);
}

animate();