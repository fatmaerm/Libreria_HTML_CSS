const wheel = document.getElementById("dialWheel");
const disp = document.getElementById("numDisplay");
document.querySelectorAll(".hole").forEach(h => {
  h.addEventListener("click", () => {
    const num = h.dataset.num;
    wheel.style.transform = `rotate(${num * 35}deg)`;
    setTimeout(() => { wheel.style.transform = "rotate(0deg)"; }, 400);
    disp.innerText = `NÚMERO: ${num}`;
  });
});