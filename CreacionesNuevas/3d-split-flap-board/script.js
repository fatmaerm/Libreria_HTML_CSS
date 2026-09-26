const flights = [
  { dest: "PARIS", gate: "G-08", status: "EMBARQUE" },
  { dest: "TOKYO", gate: "B-22", status: "A TIEMPO" },
  { dest: "N.YORK", gate: "A-04", status: "ÚLTIMO AVISO" },
  { dest: "BERLÍN", gate: "C-15", status: "A TIEMPO" },
  { dest: "MADRID", gate: "D-01", status: "DESPEGADO" }
];

let idx = 0;
const destEl = document.getElementById("dest");
const gateEl = document.getElementById("gate");
const statusEl = document.getElementById("status");
const btn = document.getElementById("nextFlightBtn");

function flipTo(el, text) {
  el.style.transform = "rotateX(90deg)";
  el.style.transition = "transform 0.15s ease-in";
  setTimeout(() => {
    el.innerText = text;
    el.style.transform = "rotateX(0deg)";
    el.style.transition = "transform 0.15s ease-out";
  }, 150);
}

btn.addEventListener("click", () => {
  idx = (idx + 1) % flights.length;
  const item = flights[idx];
  flipTo(destEl, item.dest);
  setTimeout(() => flipTo(gateEl, item.gate), 80);
  setTimeout(() => flipTo(statusEl, item.status), 160);
});