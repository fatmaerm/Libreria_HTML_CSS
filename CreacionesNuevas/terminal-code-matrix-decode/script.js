const target = document.getElementById("decodeTarget");
const btn = document.getElementById("rerunBtn");
const badge = document.getElementById("statusBadge");

const finalText = target.dataset.text;
const chars = "!@#$%^&*()_+{}[]:;<>?,./~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function runDecode() {
  badge.textContent = "DESCIFRANDO...";
  badge.style.borderColor = "#fbbf24";
  badge.style.color = "#fef08a";

  let iteration = 0;
  clearInterval(target.interval);

  target.interval = setInterval(() => {
    target.innerText = finalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return finalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iteration >= finalText.length) {
      clearInterval(target.interval);
      badge.textContent = "DESCRIPTADO CON ÉXITO";
      badge.style.borderColor = "#00ff66";
      badge.style.color = "#a7f3d0";
    }

    iteration += 1 / 3;
  }, 30);
}

btn.addEventListener("click", runDecode);
runDecode();