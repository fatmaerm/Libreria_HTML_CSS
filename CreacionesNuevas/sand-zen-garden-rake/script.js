const canvas = document.getElementById("zenCanvas");
const ctx = canvas.getContext("2d");
let isRaking = false;
function drawSand(x, y) {
  ctx.strokeStyle = "#8d6e63";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.stroke();
}
canvas.addEventListener("mousedown", () => isRaking = true);
window.addEventListener("mouseup", () => isRaking = false);
canvas.addEventListener("mousemove", (e) => {
  if (!isRaking) return;
  const rect = canvas.getBoundingClientRect();
  drawSand(e.clientX - rect.left, e.clientY - rect.top);
});