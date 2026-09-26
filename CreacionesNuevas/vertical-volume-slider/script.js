const fader=document.getElementById('fader');
const bars=document.querySelectorAll('.meter-bar');
const lbl=document.getElementById('volLbl');
function update(){
  const v=+fader.value;lbl.textContent=v;
  const active=Math.round(v/100*12);
  bars.forEach((b,i)=>b.classList.toggle('active',(12-i)<=active));
}
fader.addEventListener('input',update);update();