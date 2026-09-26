const dots=[];const colors=['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#f0abfc'];
document.addEventListener('mousemove',e=>{
  const d=document.createElement('div');d.className='cursor-dot';
  const size=12;d.style.cssText='width:'+size+'px;height:'+size+'px;background:'+colors[dots.length%5]+';left:'+e.clientX+'px;top:'+e.clientY+'px;box-shadow:0 0 8px currentColor';
  document.body.appendChild(d);dots.push(d);
  if(dots.length>24)dots.shift().remove();
  d.animate([{opacity:1,transform:'translate(-50%,-50%) scale(1)'},{opacity:0,transform:'translate(-50%,-50%) scale(0)'}],{duration:500,easing:'ease-out',fill:'forwards'});
  setTimeout(()=>d.remove(),500);
});