const container = document.getElementById("diffContainer");
const afterPanel = document.getElementById("afterPanel");
const handle = document.getElementById("sliderHandle");
let isDown = false;
function setPosition(clientX) {
  const rect = container.getBoundingClientRect();
  let pct = ((clientX - rect.left) / rect.width) * 100;
  pct = Math.max(0, Math.min(100, pct));
  afterPanel.style.clipPath = `polygon(${pct}% 0, 100% 0, 100% 100%, ${pct}% 100%)`;
  handle.style.left = `${pct}%`;
}
handle.addEventListener("mousedown", () => isDown = true);
window.addEventListener("mouseup", () => isDown = false);
window.addEventListener("mousemove", (e) => { if (isDown) setPosition(e.clientX); });
handle.addEventListener("touchstart", () => isDown = true, { passive: true });
window.addEventListener("touchend", () => isDown = false);
window.addEventListener("touchmove", (e) => { if (isDown) setPosition(e.touches[0].clientX); }, { passive: true });