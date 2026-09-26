const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const characters = "0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ";
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }).map(() => Math.floor(Math.random() * -50));

window.addEventListener("resize", () => {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }).map(() => Math.floor(Math.random() * -50));
});

let speedModifier = 1;

canvas.addEventListener("click", () => {
  speedModifier = 4;
  setTimeout(() => { speedModifier = 1; }, 700);
});

function draw() {
  ctx.fillStyle = "rgba(2, 8, 4, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = characters.charAt(Math.floor(Math.random() * characters.length));
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(char, x, y);

    ctx.fillStyle = "#00ff66";
    ctx.shadowColor = "#00ff66";
    ctx.shadowBlur = 8;
    ctx.fillText(char, x, y - fontSize);
    ctx.shadowBlur = 0;

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i] += speedModifier;
  }
  requestAnimationFrame(draw);
}

draw();