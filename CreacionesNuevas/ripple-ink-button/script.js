document.getElementById('rBtn').addEventListener('click',function(e){
  const r=this.getBoundingClientRect();
  const d=Math.max(this.clientWidth,this.clientHeight)*2;
  const span=document.createElement('span');
  span.className='ripple';
  span.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
  this.appendChild(span);
  setTimeout(()=>span.remove(),600);
});