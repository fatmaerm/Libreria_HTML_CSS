const needle = document.getElementById("vuNeedle");
setInterval(() => {
  const deg = -40 + Math.random() * 80;
  needle.style.transform = `rotate(${deg}deg)`;
}, 180);