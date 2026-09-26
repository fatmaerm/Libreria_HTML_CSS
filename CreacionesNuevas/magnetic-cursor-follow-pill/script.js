const nav = document.getElementById("pillNav");
const pill = document.getElementById("activePill");
const items = nav.querySelectorAll(".nav-item");

function positionPill(target) {
  pill.style.width = `${target.offsetWidth}px`;
  pill.style.left = `${target.offsetLeft}px`;
}

// Initial position
positionPill(items[0]);

items.forEach((item) => {
  item.addEventListener("mouseenter", (e) => {
    positionPill(e.target);
  });

  item.addEventListener("click", (e) => {
    items.forEach((it) => it.classList.remove("active"));
    e.target.classList.add("active");
  });
});

nav.addEventListener("mouseleave", () => {
  const currentActive = nav.querySelector(".nav-item.active");
  if (currentActive) positionPill(currentActive);
});