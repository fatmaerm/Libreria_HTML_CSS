const surface = document.getElementById("surface");

function spawnRipple(clientX, clientY) {
  const rect = surface.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${clientX - rect.left - size / 2}px`;
  ripple.style.top = `${clientY - rect.top - size / 2}px`;
  surface.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

surface.addEventListener("pointerdown", (e) => spawnRipple(e.clientX, e.clientY));
surface.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const rect = surface.getBoundingClientRect();
    spawnRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }
});
