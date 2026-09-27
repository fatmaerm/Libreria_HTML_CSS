(function () {
  var btn = document.getElementById("lens");
  var plate = document.getElementById("plate");
  if (!btn || !plate) return;

  var out = document.getElementById("rq-n");
  var cycles = 0;

  function measure() {
    var p = plate.getBoundingClientRect();
    var b = btn.getBoundingClientRect();
    if (!p.width || !p.height) return;
    plate.style.setProperty("--bl", (((b.left - p.left) / p.width) * 100).toFixed(2) + "%");
    plate.style.setProperty("--br", (((b.right - p.left) / p.width) * 100).toFixed(2) + "%");
    plate.style.setProperty("--bt", (((b.top - p.top) / p.height) * 100).toFixed(2) + "%");
    plate.style.setProperty("--bb", (((b.bottom - p.top) / p.height) * 100).toFixed(2) + "%");
  }

  function sink() {
    cycles++;
    if (out) out.textContent = cycles < 10 ? "0" + cycles : String(cycles);
    btn.classList.add("is-sink");
    clearTimeout(btn.tid);
    btn.tid = setTimeout(function () {
      btn.classList.remove("is-sink");
    }, 880);
  }

  btn.addEventListener("click", sink);
  btn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") sink();
  });

  measure();
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  setTimeout(measure, 120);
})();
