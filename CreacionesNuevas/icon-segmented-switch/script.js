const btns=document.querySelectorAll('.seg-btn');
const pill=document.getElementById('pill');
function move(btn){
  pill.style.left=(btn.offsetLeft)+'px';pill.style.width=btn.offsetWidth+'px';
  btns.forEach(b=>b.classList.toggle('active',b===btn));
}
btns.forEach(b=>b.addEventListener('click',()=>move(b)));
move(document.querySelector('.seg-btn.active'));