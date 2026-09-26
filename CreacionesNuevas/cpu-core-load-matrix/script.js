const fills = document.querySelectorAll(".fill");
setInterval(() => {
  fills.forEach(fill => {
    const randomLoad = Math.floor(20 + Math.random() * 75);
    fill.style.height = `${randomLoad}%`;
  });
}, 1200);