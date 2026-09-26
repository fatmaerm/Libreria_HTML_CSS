const flask = document.getElementById("flaskMix");
const r = document.getElementById("rSlider");
const g = document.getElementById("gSlider");
const b = document.getElementById("bSlider");
function update() {
  const col = `rgb(${r.value}, ${g.value}, ${b.value})`;
  flask.style.background = col;
  flask.style.boxShadow = `0 0 35px ${col}`;
}
r.addEventListener("input", update);
g.addEventListener("input", update);
b.addEventListener("input", update);