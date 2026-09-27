(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var caseEl = document.querySelector(".case");
  var field = document.getElementById("field");
  var words = document.querySelector(".words");
  var gCyan = document.querySelector(".g-cyan");
  var gMag = document.querySelector(".g-mag");
  var holo = document.getElementById("holo");
  var dust = document.getElementById("dust");
  var trigger = document.getElementById("trigger");
  var N = 78;
  var nodes = [];
  var life = new Float32Array(N);
  var rise = new Float32Array(N);
  var drift = new Float32Array(N);
  var amp = new Float32Array(N);
  var size = new Float32Array(N);
  var base = new Float32Array(N);
  var amb = new Float32Array(N);
  var phase = new Float32Array(N);
  var i, el;

  for (i = 0; i < N; i++) {
    el = document.createElement("i");
    el.className = "mote";
    amb[i] = Math.random() < 0.18 ? 1 : 0;
    base[i] = (Math.random() * 2 - 1) * (amb[i] ? 30 : 21);
    el.style.left = (50 + base[i]).toFixed(2) + "%";
    el.style.bottom = "0%";
    dust.appendChild(el);
    nodes.push(el);
    life[i] = Math.random();
    rise[i] = 0.042 + Math.random() * 0.05;
    drift[i] = (Math.random() * 2 - 1) * 2.6;
    amp[i] = 5 + Math.random() * 18;
    size[i] = 2.1 + Math.random() * 3.6;
    phase[i] = Math.random() * 6.28;
  }

  var burst = 0;
  var focus = 0;
  var target = 0;
  var raf = 0;
  var t0 = 0;

  function syncMotes(t, h) {
    for (var k = 0; k < N; k++) {
      life[k] += rise[k];
      if (life[k] >= 1) {
        life[k] -= 1;
        amb[k] = Math.random() < 0.18 ? 1 : 0;
        base[k] = (Math.random() * 2 - 1) * (amb[k] ? 30 : 21);
        nodes[k].style.left = (50 + base[k]).toFixed(2) + "%";
        amp[k] = 5 + Math.random() * 18;
        size[k] = 2.1 + Math.random() * 3.6;
      }
      var p = life[k];
      var y = (0.08 + p * 0.9) * h;
      var half = 1.2 + p * 22;
      var off = Math.abs(base[k]) / half;
      var cone = 1 - off * off * 1.15;
      if (cone < 0) cone = 0;
      if (amb[k] === 0) cone *= 1;
      var fade = Math.sin(p * Math.PI);
      var a = fade * cone * (0.78 + 0.4 * focus) * (1 + burst * 1.2);
      if (a > 1) a = 1;
      var x = drift[k] * Math.sin(t * 0.9 + phase[k]) + amp[k] * 0.05 * Math.cos(t * 0.5 + phase[k]);
      var sc = size[k] * (0.66 + 0.55 * fade);
      nodes[k].style.transform = "translate3d(" + x.toFixed(2) + "px," + (-y).toFixed(2) + "px,0) scale(" + sc.toFixed(3) + ")";
      nodes[k].style.opacity = a.toFixed(3);
    }
  }

  function frame() {
    var now = performance.now();
    if (!t0) t0 = now;
    var t = (now - t0) / 1000;
    var h = dust.clientHeight;
    var flick = 0.92 + 0.08 * Math.sin(t * 23.3) * Math.sin(t * 7.7 + 1.3);
    var step = Math.floor(t * 21);
    var n = Math.sin(step * 12.9898) * 43758.5453;
    var jitter = (n - Math.floor(n)) - 0.5;
    if (Math.sin(step * 3.77) > 0.8) flick *= 0.62;
    if (Math.sin(step * 9.13) > 0.95) flick *= 0.72;

    var kx = Math.sin(t * 0.87) * 4.2 + Math.sin(t * 2.31 + 0.6) * 1.5;
    var ky = Math.cos(t * 1.27) * 1.9 + Math.sin(t * 3.7) * 0.6;
    var sx = 1 + Math.sin(t * 1.63) * 0.017 + jitter * 0.02;
    var sy = 1 + Math.cos(t * 2.11) * 0.012;
    var lean = kx * (1 + focus * 1.4);
    field.style.transform =
      "translate(-50%,-50%) perspective(680px) rotateY(" + lean.toFixed(2) +
      "deg) rotateX(" + ky.toFixed(2) + "deg) scaleX(" + sx.toFixed(4) +
      ") scaleY(" + sy.toFixed(4) + ")";
    field.style.filter = "brightness(" + (flick * (1 + focus * 0.16)).toFixed(3) + ")";
    field.style.opacity = (0.94 + focus * 0.06).toFixed(3);

    var jx = (jitter * 4.6 + Math.sin(t * 1.9) * 1.6) * (1 + focus * 0.8);
    var jy = (jitter * 2.6 - Math.sin(t * 2.6) * 1.1) * (1 + focus * 0.6);
    gCyan.style.transform = "translate3d(" + jx.toFixed(2) + "px," + jy.toFixed(2) + "px,0)";
    gMag.style.transform = "translate3d(" + (-jx * 0.9).toFixed(2) + "px," + (-jy * 0.7 + 0.6).toFixed(2) + "px,0)";
    words.style.transform = "translate3d(" + (jx * 0.45).toFixed(2) + "px," + (jitter * 3).toFixed(2) + "px,0)";

    focus += (target - focus) * 0.06;
    if (burst > 0) burst = Math.max(0, burst - 0.012);

    syncMotes(t, h);
    raf = window.requestAnimationFrame(frame);
  }

  function ignite() {
    burst = 1;
    target = 1;
    caseEl.classList.add("burst");
    window.setTimeout(function () {
      caseEl.classList.remove("burst");
    }, 900);
  }

  trigger.addEventListener("pointerenter", function () {
    target = 1;
  });
  trigger.addEventListener("pointerleave", function () {
    target = 0;
  });
  trigger.addEventListener("focus", function () {
    target = 1;
  });
  trigger.addEventListener("blur", function () {
    target = 0;
  });
  trigger.addEventListener("click", ignite);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") ignite();
  });

  if (reduce) {
    for (i = 0; i < N; i++) {
      nodes[i].style.opacity = "0";
      nodes[i].style.display = "none";
    }
    field.style.transform = "translate(-50%,-50%)";
    holo.style.opacity = "1";
    trigger.addEventListener("click", function () {
      caseEl.style.borderColor = "rgba(126,222,244,.5)";
    });
    return;
  }

  if (window.requestAnimationFrame) raf = window.requestAnimationFrame(frame);
  window.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      window.cancelAnimationFrame(raf);
      raf = 0;
    } else if (!raf) {
      t0 = 0;
      raf = window.requestAnimationFrame(frame);
    }
  });
})();
