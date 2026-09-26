const needle = document.getElementById("compassNeedle");
window.addEventListener("mousemove", (e) => {
  const rect = needle.getBoundingClientRect();
  const angle = Math.atan2(e.clientY - (rect.top + rect.height/2), e.clientX - (rect.left + rect.width/2)) * (180 / Math.PI) + 90;
  needle.style.transform = `rotate(${angle}deg)`;
});