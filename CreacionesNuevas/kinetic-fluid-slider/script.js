const track = document.getElementById("sliderTrack");
const fill = document.getElementById("trackFill");
const thumb = document.getElementById("fluidThumb");
const display = document.getElementById("valDisplay");

let isDragging = false;

function updateSlider(clientX) {
  const rect = track.getBoundingClientRect();
  let percent = (clientX - rect.left) / rect.width;
  percent = Math.max(0, Math.min(1, percent));
  const rounded = Math.round(percent * 100);

  fill.style.width = `${rounded}%`;
  thumb.style.left = `${rounded}%`;
  display.innerText = `${rounded}%`;
}

track.addEventListener("mousedown", (e) => {
  isDragging = true;
  updateSlider(e.clientX);
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  updateSlider(e.clientX);
});

window.addEventListener("mouseup", () => isDragging = false);

// Touch
track.addEventListener("touchstart", (e) => {
  isDragging = true;
  updateSlider(e.touches[0].clientX);
}, { passive: true });

window.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  updateSlider(e.touches[0].clientX);
}, { passive: true });

window.addEventListener("touchend", () => isDragging = false);