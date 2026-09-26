const btn = document.getElementById("transBtn");
const trans = document.getElementById("transText");
const msgs = ['"PAZ UNIVERSAL"', '"CONTACTO ESTABLECIDO"', '"VIAJEROS DE LAS ESTRELLAS"'];
let idx = 0;
btn.addEventListener("click", () => {
  idx = (idx + 1) % msgs.length;
  trans.innerText = msgs[idx];
});