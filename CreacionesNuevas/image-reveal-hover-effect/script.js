const wrap=document.getElementById('rw');
const layer=document.getElementById('lightLayer');
wrap.addEventListener('mousemove',e=>{
  const r=wrap.getBoundingClientRect();
  const x=e.clientX-r.left,y=e.clientY-r.top;
  layer.style.clipPath='circle(80px at '+x+'px '+y+'px)';
});
wrap.addEventListener('mouseleave',()=>{layer.style.clipPath='circle(0px at 50% 50%)';});