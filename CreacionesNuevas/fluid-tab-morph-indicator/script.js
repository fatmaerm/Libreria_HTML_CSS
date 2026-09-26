const tabs = document.querySelectorAll(".tab-btn");
const ind = document.getElementById("tabIndicator");
function move(btn) {
  ind.style.width = `${btn.offsetWidth}px`;
  ind.style.left = `${btn.offsetLeft}px`;
}
move(tabs[0]);
tabs.forEach(t => {
  t.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    t.classList.add("active");
    move(t);
  });
});