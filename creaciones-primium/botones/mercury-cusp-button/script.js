(function () {
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.body;
  var order = ["ph0", "ph1", "ph2", "ph3", "ph4", "ph5"];
  var i = 0;
  var hold = 1450;

  function step() {
    i = (i + 1) % order.length;
    root.className = order[i];
  }

  if (calm) {
    root.className = "ph3";
    return;
  }

  setTimeout(function () {
    root.className = "ph1";
    i = 1;
  }, 40);

  var t = setInterval(function () {
    if (document.hidden) return;
    step();
  }, hold);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      clearInterval(t);
    } else {
      t = setInterval(function () {
        if (!document.hidden) step();
      }, hold);
    }
  });

  root.addEventListener("pointerdown", function () {
    clearInterval(t);
    i = 4;
    root.className = "ph4";
    setTimeout(function () {
      t = setInterval(function () {
        if (!document.hidden) step();
      }, hold);
    }, hold);
  });
})();
