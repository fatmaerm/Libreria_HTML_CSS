(function () {
  var btn = document.getElementById("charge");
  if (!btn) return;

  var rqV = document.getElementById("rq-v");
  var rqI = document.getElementById("rq-i");
  var rqN = document.getElementById("rq-n");
  var dumps = 0;
  var t0 = 0;

  function txt(n, d) { return n.toFixed(d === undefined ? 2 : d); }

  function tick(ts) {
    if (!t0) t0 = ts;
    var ph = ((ts - t0) / 6400) % 1;
    var v;
    if (ph < 0.62) v = ph / 0.62;
    else if (ph < 0.72) v = 1;
    else v = 1 - (ph - 0.72) / 0.28;
    if (v < 0) v = 0;
    if (v > 1) v = 1;
    if (rqV) rqV.textContent = txt(v * 4.88) + " V";
    if (rqI) rqI.textContent = txt(v * v * 1.86) + " A";
    window.requestAnimationFrame(tick);
  }

  function dump() {
    dumps++;
    if (rqN) rqN.textContent = dumps < 10 ? "0" + dumps : String(dumps);
    btn.classList.add("is-dump");
    clearTimeout(btn.tid);
    btn.tid = setTimeout(function () {
      btn.classList.remove("is-dump");
    }, 1100);
  }

  btn.addEventListener("click", dump);
  btn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") dump();
  });

  window.requestAnimationFrame(tick);
})();
