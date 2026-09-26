const hint=document.getElementById('kbHint');
document.addEventListener('keydown',e=>{
  document.querySelectorAll('kbd').forEach(k=>{
    if(k.textContent.trim()===e.key||
       (e.key==='Meta'&&k.textContent==='⌘')||
       (e.key==='Shift'&&k.textContent==='⇧')){k.classList.add('active');}
  });
  hint.textContent='Key: '+e.key;
});
document.addEventListener('keyup',()=>{document.querySelectorAll('kbd').forEach(k=>k.classList.remove('active'));});