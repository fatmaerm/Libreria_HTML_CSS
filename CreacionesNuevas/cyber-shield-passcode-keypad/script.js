const dots = document.querySelectorAll(".dot");
let count = 0;
document.querySelectorAll(".key:not(.clear):not(.enter)").forEach(k => {
  k.addEventListener("click", () => {
    if (count < dots.length) {
      dots[count].classList.add("filled");
      count++;
    }
  });
});
document.getElementById("clearBtn").addEventListener("click", () => {
  dots.forEach(d => d.classList.remove("filled"));
  count = 0;
});
document.getElementById("enterBtn").addEventListener("click", () => {
  if (count === dots.length) {
    dots.forEach(d => d.style.background = "#22c55e");
    setTimeout(() => {
      dots.forEach(d => { d.classList.remove("filled"); d.style.background = ""; });
      count = 0;
    }, 800);
  }
});