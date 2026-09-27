(function () {
  var key = document.getElementById("key");
  var txt = document.getElementById("txt");
  var caret = document.getElementById("caret");
  var state = document.getElementById("state");
  var prog = document.getElementById("prog");
  var sheen = document.getElementById("sheen");
  var flash = document.getElementById("flash");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var LINE = "deploy --prod --wait";
  var n = 0, phase = 0, timer = 0, runT = -1, down = false;
  var BLINK = 1060;

  function setText() {
    var s = LINE.slice(0, n);
    if (txt.textContent !== s) txt.textContent = s;
  }

  function blink() {
    if (phase === 1 || phase === 3 || runT >= 0) {
      caret.style.opacity = "1";
    } else {
      caret.style.opacity = (Date.now() % BLINK < BLINK * 0.58) ? "1" : "0";
    }
  }

  function type() {
    if (n < LINE.length) {
      n++;
      setText();
      phase = 1;
      state.textContent = "typing";
      key.classList.add("is-live");
      timer = setTimeout(type, 62 + (n % 3) * 26);
    } else {
      phase = 2;
      state.textContent = "armed";
      timer = setTimeout(erase, 1500);
    }
  }

  function erase() {
    if (n > 0) {
      n--;
      setText();
      phase = 3;
      timer = setTimeout(erase, 34 + (n % 4) * 14);
    } else {
      phase = 0;
      state.textContent = "idle";
      key.classList.remove("is-live");
      timer = setTimeout(type, 900);
    }
  }

  function execute() {
    runT = 0;
    key.classList.remove("is-live");
    key.classList.add("is-done");
    state.textContent = "running";
    n = LINE.length;
    setText();
    prog.style.opacity = "1";
  }

  function tick() {
    var now = Date.now();
    blink();
    if (runT >= 0) {
      var e = now - runT;
      var k = Math.min(1, e / 1150);
      prog.style.transform = "scaleX(" + k.toFixed(3) + ")";
      if (e < 900) {
        var f = 0.34 * Math.sin((e / 900) * Math.PI);
        flash.style.opacity = f.toFixed(3);
      }
      if (e > 40 && e < 620) {
        var s = (e - 40) / 580;
        sheen.style.opacity = (Math.sin(s * Math.PI) * 0.9).toFixed(3);
        sheen.style.transform = "translateX(" + (s * 340 - 40).toFixed(1) + "%)";
      } else if (sheen.style.opacity !== "0") {
        sheen.style.opacity = "0";
      }
      if (e >= 1150) {
        runT = -1;
        prog.style.opacity = "0";
        prog.style.transform = "scaleX(0)";
        flash.style.opacity = "0";
        key.classList.remove("is-done");
        state.textContent = "exit 0";
        n = 0;
        setText();
        phase = 0;
        timer = setTimeout(type, 1100);
      }
    }
    setTimeout(tick, 30);
  }

  function press() {
    if (down) return;
    down = true;
    key.classList.add("is-down");
    if (runT >= 0) return;
    clearTimeout(timer);
    execute();
  }

  function release() {
    if (!down) return;
    down = false;
    key.classList.remove("is-down");
  }

  key.addEventListener("pointerdown", press);
  key.addEventListener("pointerup", release);
  key.addEventListener("pointerleave", release);
  key.addEventListener("keydown", function (e) {
    if (e.key === " " || e.key === "Enter") press();
  });
  key.addEventListener("keyup", release);
  key.addEventListener("blur", release);

  if (calm) {
    n = LINE.length;
    setText();
    state.textContent = "ready";
    caret.style.opacity = "1";
  } else {
    setText();
    setTimeout(type, 500);
    setTimeout(tick, 30);
  }
})();
