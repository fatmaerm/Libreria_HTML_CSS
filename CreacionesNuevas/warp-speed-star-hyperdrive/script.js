const canvas = document.getElementById("warpCanvas");
const ctx = canvas.getContext("2d");
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener("resize", resize);
let speed = 4;
canvas.addEventListener("click", () => {
  speed = 18;
  setTimeout(() => speed = 4, 1200);
});
const stars = Array.from({ length: 140 }).map(() => ({
  x: (Math.random() - 0.5) * canvas.width,
  y: (Math.random() - 0.5) * canvas.height,
  z: Math.random() * canvas.width
}));
function draw() {
  ctx.fillStyle = "rgba(2, 3, 6, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  stars.forEach(s => {
    s.z -= speed;
    if (s.z <= 0) { s.z = canvas.width; s.x = (Math.random() - 0.5) * canvas.width; s.y = (Math.random() - 0.5) * canvas.height; }
    const k = 180 / s.z;
    const px = s.x * k + cx;
    const py = s.y * k + cy;
    ctx.beginPath();
    ctx.arc(px, py, Math.max(0.5, (1 - s.z / canvas.width) * 3), 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();