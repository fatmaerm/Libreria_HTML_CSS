const wrap = document.getElementById("cardWrap");
const card = document.getElementById("holoCard");

wrap.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -18;
  const rotateY = ((x - centerX) / centerX) * 18;

  const percentX = (x / rect.width) * 100;
  const percentY = (y / rect.height) * 100;

  card.style.setProperty("--rx", `${rotateX}deg`);
  card.style.setProperty("--ry", `${rotateY}deg`);
  card.style.setProperty("--mx", `${percentX}%`);
  card.style.setProperty("--my", `${percentY}%`);
  card.style.setProperty("--o", "0.95");
});

wrap.addEventListener("mouseleave", () => {
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
  card.style.setProperty("--o", "0");
});