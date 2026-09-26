const sheet = document.getElementById("twSheet");
document.querySelectorAll(".tw-key").forEach(k => {
  k.addEventListener("click", () => {
    sheet.innerText += k.innerText;
  });
});