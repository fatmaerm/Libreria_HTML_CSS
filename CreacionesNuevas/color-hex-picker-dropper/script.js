const preview = document.getElementById("colorPreview");
const hexCode = document.getElementById("hexCode");
document.querySelectorAll(".swatch").forEach(swatch => {
  swatch.addEventListener("click", () => {
    const color = swatch.dataset.hex;
    preview.style.background = color;
    hexCode.innerText = color;
  });
});