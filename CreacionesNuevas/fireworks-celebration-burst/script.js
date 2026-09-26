const canvas = document.getElementById("fwCanvas");
const ctx = canvas.getContext("2d");
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener("resize", resize);
let sparks = [];
canvas.addEventListener("click", (e) => {
  const colors = ["#f43f5e", "#38bdf8", "#facc15", "#4ade80", "#c084fc"];
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 5;
    sparks.push({
      x: e.clientX, y: e.clientY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }
});
function draw() {
  ctx.fillStyle = "rgba(2, 2, 6, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  sparks.forEach((s, idx) => {
    s.x += s.vx; s.y += s.vy; s.vy += 0.05; s.alpha -= 0.015;
    ctx.beginPath();
    ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.globalAlpha = Math.max(0, s.alpha);
    ctx.fill();
    ctx.globalAlpha = 1;
    if (s.alpha <= 0) sparks.splice(idx, 1);
  });
  requestAnimationFrame(draw);
}
draw();