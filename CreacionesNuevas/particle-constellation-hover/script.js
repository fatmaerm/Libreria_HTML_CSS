const canvas = document.getElementById("constCanvas");
const ctx = canvas.getContext("2d");
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener("resize", resize);
const pts = Array.from({ length: 45 }).map(() => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5), vy: (Math.random() - 0.5) }));
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pts.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); ctx.fillStyle = "#38bdf8"; ctx.fill();
    for (let j = i + 1; j < pts.length; j++) {
      const p2 = pts[j];
      const d = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (d < 100) {
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(56, 189, 248, ${1 - d / 100})`;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(draw);
}
draw();