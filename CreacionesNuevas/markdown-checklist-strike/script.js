const items = document.querySelectorAll(".task-item");
const progress = document.getElementById("progressPct");
function update() {
  const checked = document.querySelectorAll(".task-item.checked").length;
  progress.innerText = `${checked} / ${items.length}`;
}
items.forEach(item => {
  const input = item.querySelector("input");
  item.addEventListener("click", () => {
    item.classList.toggle("checked");
    input.checked = item.classList.contains("checked");
    update();
  });
});