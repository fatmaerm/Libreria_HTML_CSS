const canvas = document.getElementById("synapseCanvas");
const ctx = canvas.getContext("2d");
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener("resize", resize);
const nodes = Array.from({ length: 35 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 1.2,
  vy: (Math.random() - 0.5) * 1.2
}));
let pointer = { x: canvas.width / 2, y: canvas.height / 2 };
window.addEventListener("mousemove", (e) => { pointer.x = e.clientX; pointer.y = e.clientY; });
function draw() {
  ctx.fillStyle = "rgba(3, 2, 6, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#e879f9";
    ctx.fill();
    const dPtr = Math.hypot(n.x - pointer.x, n.y - pointer.y);
    if (dPtr < 120) {
      ctx.beginPath();
      ctx.moveTo(n.x, n.y);
      ctx.lineTo(pointer.x, pointer.y);
      ctx.strokeStyle = `rgba(232, 121, 249, ${1 - dPtr / 120})`;
      ctx.stroke();
    }
  });
  requestAnimationFrame(draw);
}
draw();