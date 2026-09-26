const btn = document.getElementById("copyBtn");
const textSpan = btn.querySelector(".btn-text");
btn.addEventListener("click", () => {
  btn.classList.add("copied");
  textSpan.textContent = "¡Copiado!";
  navigator.clipboard.writeText("npm install @quantum/core --save-prod");
  setTimeout(() => {
    btn.classList.remove("copied");
    textSpan.textContent = "Copiar";
  }, 2000);
});