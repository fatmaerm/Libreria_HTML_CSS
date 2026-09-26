const bg=document.getElementById('lbg');
document.addEventListener('mousemove',e=>{
  const x=(e.clientX/window.innerWidth*100).toFixed(1);
  const y=(e.clientY/window.innerHeight*100).toFixed(1);
  bg.style.setProperty('--mx',x+'%');bg.style.setProperty('--my',y+'%');
});