const card=document.getElementById('tc');const shine=document.getElementById('shine');
card.addEventListener('mousemove',e=>{
  const r=card.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  const rx=(y-.5)*20,ry=(x-.5)*-20;
  card.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)';
  shine.style.setProperty('--x',(x*100)+'%');shine.style.setProperty('--y',(y*100)+'%');
});
card.addEventListener('mouseleave',()=>{card.style.transform='';});