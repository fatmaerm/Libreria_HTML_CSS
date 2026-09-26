const wrap = document.getElementById("tiltWrap");
const card = document.getElementById("tiltCard");
wrap.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rx = ((y - rect.height/2) / rect.height) * -15;
  const ry = ((x - rect.width/2) / rect.width) * 15;
  card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  card.style.setProperty("--x", `${(x/rect.width)*100}%`);
  card.style.setProperty("--y", `${(y/rect.height)*100}%`);
});
wrap.addEventListener("mouseleave", () => { card.style.transform = "rotateX(0deg) rotateY(0deg)"; });