const val = document.getElementById("envVal");
const btn = document.getElementById("eyeBtn");
let revealed = false;
btn.addEventListener("click", () => {
  revealed = !revealed;
  val.innerText = revealed ? "postgres://root:p4ssw0rd@db.internal:5432/main" : "••••••••••••••••••••••••";
});