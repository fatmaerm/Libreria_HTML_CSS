const code=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
const display={'ArrowUp':'↑','ArrowDown':'↓','ArrowLeft':'←','ArrowRight':'→','KeyB':'B','KeyA':'A'};
let pos=0;const hint=document.getElementById('kh');
document.addEventListener('keydown',e=>{
  if(e.code===code[pos]){pos++;hint.textContent=code.slice(0,pos).map(k=>display[k]).join(' ');}
  else{pos=0;hint.textContent='';}
  if(pos===code.length){document.getElementById('unlocked').removeAttribute('hidden');pos=0;hint.textContent='';}
});