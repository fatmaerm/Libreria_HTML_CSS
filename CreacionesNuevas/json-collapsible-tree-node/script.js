const arrow = document.getElementById("toggleObj");
const nested = document.getElementById("nestedContent");
arrow.addEventListener("click", () => {
  arrow.classList.toggle("collapsed");
  nested.classList.toggle("hidden");
});