(function () {
  var btn = document.getElementById("key");
  var scene = document.getElementById("scene");
  var body = document.body;
  var row = document.querySelector(".key__row");
  var letters = row ? row.children : [];
  var lines = [].slice.call(document.querySelectorAll(".rush i"));
  var clear = 0;
  var clearBurst = 0;

  function fit() {
    if (!letters.length) return;
    var a = letters[0].getBoundingClientRect();
    var b = letters[letters.length - 1].getBoundingClientRect();
    var w = b.right - a.left;
    if (w < 10) return;
    var k = (scene.clientWidth * 0.965) / w;
    scene.style.setProperty("--k", (k < 1 ? k : 1).toFixed(4));
  }

  function slam() {
    body.classList.remove("slam");
    void body.offsetWidth;
    body.classList.add("slam");
    window.clearTimeout(clear);
    clear = window.setTimeout(function () { body.classList.remove("slam"); }, 880);
    for (var i = 0; i < lines.length; i++) {
      lines[i].classList.remove("burst");
    }
    void body.offsetWidth;
    for (var j = 0; j < lines.length; j++) {
      lines[j].classList.add("burst");
    }
    window.clearTimeout(clearBurst);
    clearBurst = window.setTimeout(function () {
      for (var k = 0; k < lines.length; k++) { lines[k].classList.remove("burst"); }
    }, 560);
  }

  btn.addEventListener("click", slam);
  window.addEventListener("resize", fit);
  window.addEventListener("load", fit);
  fit();
})();
